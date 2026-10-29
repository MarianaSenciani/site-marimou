"""Generate a continuous field of video poses using bidirectional optical flow.

The source recordings remain untouched. The output is one short-GOP alpha WebM:
frame 0 is neutral, followed by radial poses for each angular sample. This is a
seekable pose atlas, not a movie intended for sequential playback.
"""
import argparse
import importlib.util
import hashlib
import json
from pathlib import Path
import subprocess
import time

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('direction_tools', ROOT / 'scripts/prepare-memoji-directions.py')
direction_tools = importlib.util.module_from_spec(spec)
spec.loader.exec_module(direction_tools)


def source_pose(filename, seconds, size):
    capture = cv2.VideoCapture(str(ROOT / 'Assets/memoji/Videos' / filename))
    ok, first = capture.read()
    if not ok:
        raise RuntimeError(f'Cannot decode {filename}')
    _, box = direction_tools.isolate(first)
    capture.set(cv2.CAP_PROP_POS_MSEC, seconds * 1000)
    ok, frame = capture.read()
    capture.release()
    if not ok:
        raise RuntimeError(f'Cannot decode {filename} at {seconds}')
    rgba, _ = direction_tools.isolate(frame)
    normalized = cv2.warpAffine(rgba, direction_tools.alignment(box), (640, 720))
    return cv2.resize(normalized, size, interpolation=cv2.INTER_AREA)


class Morph:
    def __init__(self, first, second):
        self.first = first.astype(np.float32) / 255
        self.second = second.astype(np.float32) / 255
        self.first[:, :, :3] *= self.first[:, :, 3:4]
        self.second[:, :, :3] *= self.second[:, :, 3:4]
        height, width = first.shape[:2]
        self.grid_x, self.grid_y = np.meshgrid(np.arange(width, dtype=np.float32), np.arange(height, dtype=np.float32))
        gray_a = cv2.cvtColor(first[:, :, :3], cv2.COLOR_BGR2GRAY)
        gray_b = cv2.cvtColor(second[:, :, :3], cv2.COLOR_BGR2GRAY)
        solver = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
        solver.setFinestScale(1)
        solver.setVariationalRefinementIterations(8)
        solver.setVariationalRefinementAlpha(50)
        # Regularize the displacement field so small hair/eyebrow textures
        # cannot fold the face while passing between two poses.
        self.forward = cv2.GaussianBlur(solver.calc(gray_a, gray_b, None), (15, 15), 3)
        self.backward = cv2.GaussianBlur(solver.calc(gray_b, gray_a, None), (15, 15), 3)

    def warp(self, image, flow, amount):
        # Invert the displacement rather than fading two unaligned faces.
        map_x = self.grid_x - amount * flow[:, :, 0]
        map_y = self.grid_y - amount * flow[:, :, 1]
        for _ in range(2):
            sampled = cv2.remap(flow, map_x, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REPLICATE)
            map_x = self.grid_x - amount * sampled[:, :, 0]
            map_y = self.grid_y - amount * sampled[:, :, 1]
        return cv2.remap(image, map_x, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT)

    def at(self, progress):
        if progress <= 0:
            mixed = self.first.copy()
        elif progress >= 1:
            mixed = self.second.copy()
        else:
            first = self.warp(self.first, self.forward, progress)
            second = self.warp(self.second, self.backward, 1 - progress)
            mixed = first * (1 - progress) + second * progress
        alpha = mixed[:, :, 3:4]
        mixed[:, :, :3] /= np.maximum(alpha, 1 / 255)
        return np.clip(mixed * 255 + .5, 0, 255).astype(np.uint8)


def composite(image):
    alpha = image[:, :, 3:4].astype(np.float32) / 255
    return (image[:, :, :3] * alpha + np.array([21, 29, 27]) * (1 - alpha)).astype(np.uint8)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--preview-only', action='store_true')
    parser.add_argument('--width', type=int, default=448)
    parser.add_argument('--angles', type=int, default=64)
    parser.add_argument('--radii', type=int, default=32)
    parser.add_argument('--gop', type=int, default=4)
    args = parser.parse_args()
    cv2.setNumThreads(4)
    size = (args.width, args.width * 9 // 8)
    folder = ROOT / '.local-data/memoji-interpolation'
    folder.mkdir(parents=True, exist_ok=True)
    neutral = source_pose('gerenal.mp4', .5, size)
    definitions = sorted(direction_tools.CLIPS, key=lambda clip: clip[2] % 360)
    # These gentler poses share the neutral recording's facial geometry.
    # The older upward take changes chin/forehead shape too much to interpolate.
    overrides = {'up': ('gerenal.mp4', 3.5), 'down-right': ('gerenal.mp4', 6.33)}
    definitions = [(clip[0], overrides[clip[0]][0], clip[2], [(1, overrides[clip[0]][1])])
                   if clip[0] in overrides else clip for clip in definitions]
    poses = [source_pose(clip[1], clip[3][-1][1], size) for clip in definitions]

    if args.preview_only:
        rows = []
        for index, pose in enumerate(poses):
            morph = Morph(neutral, pose)
            tiles = []
            for p in (0, .25, .5, .75, 1):
                tiles.append(cv2.resize(composite(morph.at(p)), (192, 216)))
            row = np.vstack((np.hstack(tiles), np.full((26, 960, 3), 24, np.uint8)))
            cv2.putText(row, definitions[index][0] + '  |  0% / 25% / 50% / 75% / 100%', (10, 234), cv2.FONT_HERSHEY_SIMPLEX, .45, (255, 255, 255), 1)
            rows.append(row)
            print(f'Preview {definitions[index][0]}', flush=True)
        cv2.imwrite(str(folder / 'radial-preview.jpg'), np.vstack(rows))
        # Check adjacent directions too: those are the original hard boundaries.
        rows = []
        for index in range(8):
            morph = Morph(poses[index], poses[(index+1) % 8])
            rows.append(np.hstack([cv2.resize(composite(morph.at(p)), (192, 216)) for p in (0, .25, .5, .75, 1)]))
        cv2.imwrite(str(folder / 'angular-preview.jpg'), np.vstack(rows))
        return

    output = ROOT / 'public/assets/memoji/motion-atlas-v3.webm'
    encoder = subprocess.Popen([
        str(ROOT / direction_tools.FFMPEG), '-hide_banner', '-loglevel', 'error', '-y',
        '-f', 'rawvideo', '-pix_fmt', 'bgra', '-s', f'{size[0]}x{size[1]}', '-r', '60', '-i', '-',
        '-an', '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', '33',
        '-g', str(args.gop), '-keyint_min', str(args.gop), '-auto-alt-ref', '0', '-deadline', 'good', '-cpu-used', '5',
        '-row-mt', '1', '-threads', '4', str(output),
    ], stdin=subprocess.PIPE)
    started = time.perf_counter()
    encoder.stdin.write(neutral.tobytes())
    try:
        for sector in range(8):
            adjacent = Morph(poses[sector], poses[(sector+1) % 8])
            for step in range(args.angles // 8):
                angular_pose = adjacent.at(step / (args.angles // 8))
                radial = Morph(neutral, angular_pose)
                for level in range(1, args.radii + 1):
                    encoder.stdin.write(radial.at(level / args.radii).tobytes())
            print(f'{sector+1}/8 sectors generated, {time.perf_counter()-started:.1f}s', flush=True)
        encoder.stdin.close()
        if encoder.wait() != 0:
            raise RuntimeError('VP9 encoder failed')
    except BaseException:
        encoder.kill()
        raise
    digest = hashlib.sha256(output.read_bytes()).hexdigest()[:12]
    metadata = {
        'src': f'/assets/memoji/motion-atlas-v3.webm?v={digest}', 'fps': 60, 'gop': args.gop,
        'angles': args.angles, 'radii': args.radii, 'frames': 1 + args.angles * args.radii,
        'width': size[0], 'height': size[1], 'layout': 'neutral-then-angle-major',
        'interpolation': 'bidirectional DIS optical flow, inverse warping in premultiplied alpha',
        'neutral': {'source': 'gerenal.mp4', 'time': .5},
        'anchors': [{'id': clip[0], 'angle': clip[2] % 360, 'source': clip[1], 'time': clip[3][-1][1]} for clip in definitions],
    }
    (output.parent / 'motion-atlas.json').write_text(json.dumps(metadata, indent=2) + '\n', encoding='utf-8')
    print(f'{metadata["frames"]} generated poses, {output.stat().st_size / 1024**2:.2f} MiB', flush=True)


if __name__ == '__main__':
    main()
