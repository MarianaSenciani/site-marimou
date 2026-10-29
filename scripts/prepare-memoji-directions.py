"""Prepare real supplied motion clips for reversible, alpha-video scrubbing.

Run from the project root with OpenCV/NumPy on PYTHONPATH.
The source times below were selected after inspecting each recording. Long
neutral holds, returns and blinks outside the useful movements are omitted.
No mirrored or synthesized directions are produced.
"""
import json
from pathlib import Path
import subprocess
import tempfile

import cv2
import numpy as np

SOURCE = Path('Assets/memoji/Videos')
OUTPUT = Path('public/assets/memoji')
FFMPEG = Path('.tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe')
FPS = 24
CLIPS = [
    ('up-right', 'center-top-right.mp4', -45, [(0, .55), (1, 1.65)]),
    ('up', 'center-top.mp4', -90, [(0, 1.85), (1, 3.35)]),
    ('up-left', 'gerenal.mp4', -135, [(0, 1.125), (1, 1.7)]),
    ('left', 'gerenal.mp4', 180, [(0, 4.1), (1, 4.8)]),
    ('down-left', 'gerenal.mp4', 135, [(0, 4.25), (1, 5.15)]),
    ('down', 'gerenal.mp4', 90, [(0, 6.4), (1, 6.78)]),
    ('down-right', 'Center bottom right, left center.mp4', 45, [(0, 2.6), (1, 3.3)]),
    ('right', 'gerenal.mp4', 0, [(0, 5.75), (1, 6.18)]),
]


def alignment(box):
    x, y, width, height, _ = box
    scale = 640 / height
    return np.float32([[scale, 0, 320 - (x + width / 2) * scale],
                       [0, scale, 360 - (y + height / 2) * scale]])


def read_recording(filename):
    capture = cv2.VideoCapture(str(SOURCE / filename))
    if not capture.isOpened():
        raise RuntimeError(f'Missing/unreadable supplied asset: {filename}')
    source_fps = capture.get(cv2.CAP_PROP_FPS)
    frames = []
    while True:
        ok, frame = capture.read()
        if not ok:
            break
        frames.append(frame)
    capture.release()
    _, box = isolate(frames[0])
    return frames, source_fps, alignment(box)


def isolate(frame):
    # Only dark pixels connected to the outside are backdrop. The eyes and
    # dark internal hair remain opaque, unlike a simple luminance key.
    dark = (np.max(frame, axis=2) <= 25).astype(np.uint8)
    _, labels = cv2.connectedComponents(dark, connectivity=8)
    mask = (labels != labels[0, 0]).astype(np.uint8)
    _, components, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    mask = (components == 1 + np.argmax(stats[1:, 4])).astype(np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    alpha = cv2.GaussianBlur(mask * 255, (3, 3), .6)
    return np.dstack((frame, alpha)), stats[1 + np.argmax(stats[1:, 4])]


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = []
    cache = {name: read_recording(name) for name in {clip[1] for clip in CLIPS}}
    frames, fps, matrix = cache['gerenal.mp4']
    neutral, _ = isolate(frames[round(.5 * fps)])
    neutral = cv2.warpAffine(neutral, matrix, (640, 720), flags=cv2.INTER_LINEAR)
    for direction, filename, angle, anchors in CLIPS:
        frames, source_fps, matrix = cache[filename]
        # One affine alignment per recording, never per pose. All recordings
        # share the same neutral center and height in a fixed 640x720 frame.
        with tempfile.TemporaryDirectory() as temporary:
            folder = Path(temporary)
            for index in range(49):
                time = np.interp(index / 48, *zip(*anchors))
                source_index = min(len(frames)-1, round(time * source_fps))
                rgba, _ = isolate(frames[source_index])
                aligned = cv2.warpAffine(rgba, matrix, (640, 720), flags=cv2.INTER_LINEAR)
                # One actual neutral VIDEO frame shared by every encoded clip.
                # No separate still-image pose is mounted in the application.
                if index == 0:
                    aligned = neutral
                cv2.imwrite(str(folder / f'frame-{index:03d}.png'), aligned)
            subprocess.run([
                str(FFMPEG), '-hide_banner', '-loglevel', 'error', '-y',
                '-framerate', str(FPS), '-i', str(folder / 'frame-%03d.png'),
                '-an', '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p',
                '-b:v', '0', '-crf', '30', '-g', '1', '-keyint_min', '1',
                '-auto-alt-ref', '0', '-deadline', 'good', '-cpu-used', '4',
                str(OUTPUT / f'{direction}.webm'),
            ], check=True)
        manifest.append({'id': direction, 'angle': angle, 'src': f'/assets/memoji/{direction}.webm?v=2',
                         'source': filename, 'sourceTimes': anchors, 'fps': FPS, 'end': 2,
                         'neutralSource': 'gerenal.mp4', 'neutralTime': .5})
        print(f'{direction}: {(OUTPUT / f"{direction}.webm").stat().st_size:,} bytes', flush=True)
    (OUTPUT / 'directions.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
