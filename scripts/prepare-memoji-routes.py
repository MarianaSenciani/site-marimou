"""Extract the seven source recordings and build paths of real video frames.

Originals are never modified. All frames are archived locally as JPEGs;
only inspected, useful sections become transparent WebP sprite pages.
"""
from pathlib import Path
import importlib.util
import json
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'Assets/memoji/Videos'
OUT = ROOT / 'public/assets/memoji/routes'
LOCAL = ROOT / '.local-data/memoji-video-frames'
spec = importlib.util.spec_from_file_location('keying', ROOT/'scripts/prepare-memoji-directions.py')
keying = importlib.util.module_from_spec(spec)
spec.loader.exec_module(keying)
W, H = 384, 432
# Screen directions, not anatomical left/right. Times verified on contact sheets.
ROUTES = [
 ('up', 'center-top.mp4', [0,-1], 1.85,3.35),
 ('up-right','center-top-right.mp4',[1,-1],.55,1.65),
 ('right','gerenal.mp4',[1,0],5.625,6.18),
 ('down-right','Center bottom right, left center.mp4',[1,1],2.67,3.3),
 ('down','Center-bottom.mp4',[0,1],5.5,4.5),
 ('down-left','gerenal.mp4',[-1,1],4.25,5.15),
 ('left','Center bottom left..mp4',[-1,0],1.8,3.75),
 ('up-left','gerenal.mp4',[-1,-1],1.125,1.7),
]

def main():
 OUT.mkdir(parents=True,exist_ok=True)
 LOCAL.mkdir(parents=True,exist_ok=True)
 recordings={}
 inventory=[]
 for path in sorted(SOURCE.glob('*.mp4')):
  folder=LOCAL/path.stem
  folder.mkdir(exist_ok=True)
  cap=cv2.VideoCapture(str(path)); fps=cap.get(cv2.CAP_PROP_FPS)
  count=0
  while True:
   ok,frame=cap.read()
   if not ok: break
   target=folder/f'{count:04d}.jpg'
   if not target.exists(): cv2.imwrite(str(target),frame,[cv2.IMWRITE_JPEG_QUALITY,96])
   count+=1
  cap.release()
  recordings[path.name]=(folder,fps,count)
  inventory.append({'source':path.name,'fps':fps,'frames':count,'duration':count/fps})
  print(f'Extracted {path.name}: {count} frames',flush=True)
 (LOCAL/'inventory.json').write_text(json.dumps(inventory,indent=2))
 rasters=[]; nodes=[]; routes=[]
 for name,filename,direction,start,end in ROUTES:
  folder,fps,count=recordings[filename]
  # Preserve every source frame in the chosen motion, capped at 48 samples.
  samples=np.unique(np.rint(np.linspace(min(start,end)*fps,max(start,end)*fps,min(48,round(abs(end-start)*fps)+1))).astype(int))
  if end<start: samples=samples[::-1]
  first=cv2.imread(str(folder/f'{samples[0]:04d}.jpg'))
  _,box=keying.isolate(first)
  matrix=keying.alignment(box)*.6
  ids=[]
  for j,sample in enumerate(samples):
   frame=cv2.imread(str(folder/f'{sample:04d}.jpg'))
   rgba,_=keying.isolate(frame)
   aligned=cv2.warpAffine(rgba,matrix,(W,H),flags=cv2.INTER_AREA)
   aligned=cv2.cvtColor(aligned,cv2.COLOR_BGRA2RGBA)
   ids.append(len(nodes)); rasters.append(aligned)
   progress=j/(len(samples)-1)
   nodes.append({'route':name,'source':filename,'frame':int(sample),'time':round(sample/fps,5),
     'pose':[round(direction[0]*progress,5),round(direction[1]*progress,5)]})
  routes.append({'id':name,'direction':direction,'nodes':ids,'source':filename,'range':[start,end]})
 # Build reversible temporal edges and only short, visually close bridges.
 edges=[{} for _ in nodes]
 def connect(a,b,cost,duration):
  edges[a][b]=[round(cost,5),duration]; edges[b][a]=[round(cost,5),duration]
 for route in routes:
  for a,b in zip(route['nodes'],route['nodes'][1:]): connect(a,b,1,1/60)
 features=[]
 for pixels in rasters:
  # The face dominates bridge matching; hair still contributes.
  rgb=pixels[:,:,:3].astype(np.float32)/255*pixels[:,:,3:4]/255
  whole=cv2.resize(rgb,(24,27)).ravel()
  face=cv2.resize(rgb[100:300,90:300],(24,24)).ravel()
  features.append(np.concatenate([whole,face*2]))
 features=np.array(features)
 bridges=0
 for a in range(len(nodes)):
  distances=np.sqrt(((features-features[a])**2).mean(1))
  for b in np.argsort(distances):
   if nodes[b]['route']==nodes[a]['route']: continue
   if distances[b]>.045: break
   if np.linalg.norm(np.array(nodes[a]['pose'])-nodes[b]['pose'])>.45: continue
   connect(a,int(b),2+distances[b]*60,.05); bridges+=1
   break
 # Neutral frames may differ slightly between generated recordings. These
 # short bridges are explicit; never jump across unrelated extreme poses.
 roots=[r['nodes'][0] for r in routes]
 for a in roots:
  for b in roots:
   if a<b: connect(a,b,4,.09)
 pages=[]
 for begin in range(0,len(rasters),20):
  page=Image.new('RGBA',(W*5,H*4))
  for slot,pixels in enumerate(rasters[begin:begin+20]):
   page.paste(Image.fromarray(pixels),(slot%5*W,slot//5*H))
   nodes[begin+slot]['page']=len(pages); nodes[begin+slot]['slot']=slot
  filename=f'page-{len(pages):02d}.webp'
  page.save(OUT/filename,quality=88,method=4)
  pages.append('/assets/memoji/routes/'+filename)
 Image.fromarray(rasters[roots[1]]).save(OUT/'neutral.png')
 manifest={'width':W,'height':H,'columns':5,'pages':pages,'neutral':roots[1],
  'routes':routes,'nodes':nodes,'edges':[[[b,*value] for b,value in links.items()] for links in edges]}
 (OUT/'routes.json').write_text(json.dumps(manifest,separators=(',',':')))
 print(f'{len(nodes)} selected frames, {len(pages)} pages, {bridges} close-pose bridges',flush=True)

if __name__=='__main__': main()
