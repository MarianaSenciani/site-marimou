"""Build landmark correspondence data for GPU morphing of unmodified PNGs.

No frames are generated or repainted. The original PNGs are copied verbatim;
only mesh coordinates are fitted between manually inspected facial landmarks.
"""
from pathlib import Path
import json
import shutil
import numpy as np
import cv2
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'Assets/memoji'
OUTPUT = ROOT / 'public/assets/memoji/poses'

# Landmarks: each eye outer/top/inner/bottom/iris, then nose, septum,
# mouth left/center/right, lower piercing, chin, brows L/R, forehead, ears L/R.
POSES = [
 ('center', 'Center..png', [0,0], [
  [345,613],[420,568],[486,624],[420,648],[422,607],
  [754,609],[679,564],[612,624],[680,648],[678,607],
  [548,720],[548,759],[466,813],[549,822],[640,813],[549,878],[550,958],
  [411,496],[687,496],[550,331],[268,726],[826,724]]),
 ('right', 'novas/Imagem do ChatGPT 2 de out. de 2026, 15_48_33-3.png', [1,0], [
  [486,613],[570,557],[638,619],[570,645],[588,600],
  [872,585],[820,541],[754,614],[817,627],[824,585],
  [741,699],[741,729],[633,807],[736,814],[806,792],[733,861],[716,951],
  [568,488],[824,474],[670,326],[357,742],[892,702]]),
 ('down-right', 'Bottom right..png', [1,1], [
  [545,527],[620,519],[694,588],[616,600],[649,567],
  [940,612],[883,578],[807,611],[884,650],[891,618],
  [744,690],[741,730],[630,774],[719,799],[806,814],[704,846],[680,918],
  [635,444],[916,493],[739,285],[392,622],[999,661]]),
 ('down', 'Center bottom.png', [0,1], [
  [411,590],[490,592],[567,611],[493,648],[499,625],
  [854,592],[777,592],[702,620],[774,648],[771,626],
  [631,724],[631,763],[537,815],[631,828],[722,812],[631,878],[631,943],
  [481,490],[786,491],[632,314],[333,658],[937,659]]),
 ('down-left', 'Bottom left..png', [-1,1], [
  [348,581],[408,561],[476,601],[412,628],[394,599],
  [727,521],[658,506],[587,558],[650,586],[633,557],
  [523,678],[534,714],[477,773],[551,773],[641,746],[571,822],[597,893],
  [394,477],[632,425],[536,286],[307,663],[894,605]]),
 ('up-left', 'Top left..png', [-1,-1], [
  [267,508],[312,474],[373,572],[316,580],[307,521],
  [617,594],[549,540],[489,585],[549,626],[539,580],
  [381,663],[379,694],[292,738],[365,773],[469,797],[356,831],[441,928],
  [319,432],[558,488],[488,288],[205,756],[757,785]]),
 ('up', 'Center up..png', [0,-1], [
  [417,479],[490,431],[561,480],[490,518],[495,466],
  [841,479],[766,430],[695,484],[766,518],[758,466],
  [627,578],[626,616],[531,688],[626,700],[721,687],[626,746],[635,858],
  [483,365],[778,365],[625,240],[333,647],[920,648]]),
 ('up-right', 'novas/Imagem do ChatGPT 2 de out. de 2026, 15_51_13-3.png', [1,-1], [
  [454,588],[526,530],[601,592],[526,613],[550,570],
  [844,557],[786,506],[721,592],[788,584],[787,551],
  [701,659],[701,698],[607,767],[702,770],[782,749],[711,817],[663,920],
  [516,461],[786,440],[622,313],[330,746],[877,699]]),
]

def kernel(distance2):
    return distance2 * np.log(np.maximum(distance2, 1e-12))

def fit_warp(origin, destination, query):
    count = len(origin)
    distances = ((origin[:, None] - origin[None, :]) ** 2).sum(2)
    affine = np.column_stack([np.ones(count), origin])
    matrix = np.block([[kernel(distances) + np.eye(count)*0.000015, affine],
                       [affine.T, np.zeros((3,3))]])
    weights = np.linalg.solve(matrix, np.vstack([destination, np.zeros((3,2))]))
    query_distances = ((query[:,None] - origin[None,:])**2).sum(2)
    return np.column_stack([kernel(query_distances), np.ones(len(query)), query]) @ weights

def inspect_pose(filename, landmarks):
    image = Image.open(SOURCE / filename).convert('RGBA')
    alpha = np.asarray(image)[:,:,3]
    yy,xx = np.nonzero(alpha>128)
    cx,cy = (xx.min()+xx.max())/2, (yy.min()+yy.max())/2
    scale = min(610/(xx.max()-xx.min()), 692/(yy.max()-yy.min()))
    offset = np.array([320,360]) - np.array([cx,cy])*scale
    points = (np.asarray(landmarks)*scale+offset) / [640,720]
    # Corresponding hair silhouette anchors, sampled clockwise around head.
    edge = []
    for angle in np.linspace(0,2*np.pi,24,endpoint=False):
        radii = np.linspace(0,max(image.size),1600)
        x = np.rint(cx+np.cos(angle)*radii).astype(int)
        y = np.rint(cy+np.sin(angle)*radii).astype(int)
        valid=(x>=0)&(x<image.width)&(y>=0)&(y<image.height)
        x,y=x[valid],y[valid]
        inside=alpha[y,x]>128
        i=np.where(inside)[0][-1]
        edge.append((np.array([x[i],y[i]])*scale+offset)/[640,720])
    return image, scale, offset, np.vstack([points,edge])

def main():
    OUTPUT.mkdir(parents=True,exist_ok=True)
    columns, rows = 48,54
    gx,gy=np.meshgrid(np.linspace(0,1,columns+1),np.linspace(0,1,rows+1))
    grid=np.column_stack([gx.ravel(),gy.ravel()])
    inspected=[inspect_pose(file,points) for _,file,_,points in POSES]
    base=inspected[0][3]
    # Stable canvas boundary prevents movement from causing layout changes.
    boundary=np.array([[0,0],[.5,0],[1,0],[1,.5],[1,1],[.5,1],[0,1],[0,.5]])
    origin=np.vstack([base,boundary])
    analysis_size=(384,432)
    qx,qy=np.meshgrid(np.linspace(0,1,analysis_size[0]),np.linspace(0,1,analysis_size[1]))
    queries=np.column_stack([qx.ravel(),qy.ravel()])
    neutral_image,neutral_scale,neutral_offset,_=inspected[0]
    neutral_uv=(queries*[640,720]-neutral_offset)/neutral_scale
    neutral_pixels=cv2.remap(np.asarray(neutral_image),neutral_uv[:,0].reshape(qx.shape).astype(np.float32),neutral_uv[:,1].reshape(qx.shape).astype(np.float32),cv2.INTER_LINEAR)
    reference=cv2.cvtColor(neutral_pixels[:,:,:3],cv2.COLOR_RGB2GRAY)
    manifest={'columns':columns,'rows':rows,'width':640,'height':720,'poses':[]}
    for index, ((name,file,cursor,_),(image,scale,offset,points)) in enumerate(zip(POSES,inspected)):
        mapped=grid if index==0 else fit_warp(origin,np.vstack([points,boundary]),grid)
        if index:
            # Match hair strands after facial registration. Restrict the dense
            # correction to hair: hand-marked face features remain authoritative.
            query_map=fit_warp(origin,np.vstack([points,boundary]),queries)
            source_map=(query_map*[640,720]-offset)/scale
            registered=cv2.remap(np.asarray(image),source_map[:,0].reshape(qx.shape).astype(np.float32),source_map[:,1].reshape(qx.shape).astype(np.float32),cv2.INTER_LINEAR)
            solver=cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
            solver.setFinestScale(1)
            solver.setVariationalRefinementAlpha(50)
            flow=solver.calc(reference,cv2.cvtColor(registered[:,:,:3],cv2.COLOR_RGB2GRAY),None)
            flow=cv2.GaussianBlur(flow,(11,11),2)
            face_center=(np.array([548,650])*neutral_scale+neutral_offset)/[640,720]
            face_radius=np.array([315,355])*neutral_scale/[640,720]
            radius=((queries-face_center)/face_radius)**2
            hair_weight=np.clip((radius.sum(1)-.8)/.45,0,1).reshape(qx.shape)
            flow*=hair_weight[:,:,None]
            flow=np.clip(flow,-30,30)
            sampled=cv2.remap(flow,(gx*(analysis_size[0]-1)).astype(np.float32),(gy*(analysis_size[1]-1)).astype(np.float32),cv2.INTER_LINEAR).reshape(-1,2)
            mapped=fit_warp(origin,np.vstack([points,boundary]),grid+sampled/analysis_size)
        uv=(mapped*[640,720]-offset)/scale/np.asarray(image.size)
        shutil.copyfile(SOURCE/file,OUTPUT/f'{name}.png')
        manifest['poses'].append({'id':name,'source':file,'cursor':cursor,'src':f'/assets/memoji/poses/{name}.png',
          'positions':np.round(mapped,6).ravel().tolist(),'uv':np.round(uv,6).ravel().tolist(),
          'eyes':(np.array(POSES[index][3])[[4,9]]/np.array(image.size)).ravel().tolist()})
    (OUTPUT/'mesh.json').write_text(json.dumps(manifest,separators=(',',':')),encoding='utf-8')
    print(f'{len(POSES)} unmodified images; {len(grid)} vertices; manifest {(OUTPUT/"mesh.json").stat().st_size} bytes')

if __name__=='__main__': main()
