"""Create labeled contact sheets of the supplied directional recordings."""
from pathlib import Path
import cv2
import numpy as np

source = Path('Assets/memoji/Videos')
output = Path('.local-data/memoji-inspection')
output.mkdir(parents=True, exist_ok=True)
for index, path in enumerate(sorted(source.glob('*.mp4'))):
    cap = cv2.VideoCapture(str(path))
    fps = cap.get(cv2.CAP_PROP_FPS)
    count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = count / fps
    sheet = np.full((5 * 166, 4 * 256, 3), 32, dtype=np.uint8)
    for sample in range(20):
        time = sample * (duration - 1 / fps) / 19
        cap.set(cv2.CAP_PROP_POS_MSEC, time * 1000)
        ok, frame = cap.read()
        if not ok:
            continue
        tile = cv2.resize(frame, (256, 144))
        x, y = (sample % 4) * 256, (sample // 4) * 166
        sheet[y:y+144, x:x+256] = tile
        cv2.putText(sheet, f'{time:.2f}s', (x+8, y+160), cv2.FONT_HERSHEY_SIMPLEX, .45, (255,255,255), 1)
    target = output / f'{index}.jpg'
    cv2.imwrite(str(target), sheet)
    print(f'{index}: {path.name} | {int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))}x{int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))} | {fps}fps | {duration:.3f}s | {target}')
    cap.release()
