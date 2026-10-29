"""Prepare the supplied black-background Memoji clip for frame-accurate web scrubbing.

Requires opencv-python-headless and numpy. Pass the source MP4, output WebM,
poster PNG, and an ffmpeg executable. The motion is between 1.2s and 3.0s.
"""

import argparse
from pathlib import Path
import subprocess
import tempfile

import cv2
import numpy as np


def isolate_head(frame):
    crop = frame[:, 320:960]
    dark = (np.max(crop, axis=2) <= 25).astype(np.uint8)
    _, labels = cv2.connectedComponents(dark, connectivity=8)
    exterior = labels == labels[0, 0]
    foreground = (~exterior).astype(np.uint8)
    count, components = cv2.connectedComponents(foreground, connectivity=8)
    if count > 2:
        sizes = np.bincount(components.ravel())
        sizes[0] = 0
        foreground = (components == np.argmax(sizes)).astype(np.uint8)
    foreground = cv2.morphologyEx(foreground, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    alpha = cv2.GaussianBlur(foreground * 255, (3, 3), 0.6)
    return np.dstack((crop, alpha))


def main():
    parser = argparse.ArgumentParser()
    for name in ("source", "video", "poster", "ffmpeg"):
        parser.add_argument(name, type=Path)
    args = parser.parse_args()
    capture = cv2.VideoCapture(str(args.source))
    fps = capture.get(cv2.CAP_PROP_FPS)
    if not capture.isOpened() or fps <= 0:
        raise RuntimeError("Could not read supplied video")
    first, last = round(1.2 * fps), round(3.0 * fps)
    args.video.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as directory:
        frames = Path(directory)
        written = 0
        for index in range(last + 1):
            ok, frame = capture.read()
            if not ok:
                break
            if index < first:
                continue
            result = isolate_head(frame)
            if written == 0:
                cv2.imwrite(str(args.poster), result)
            cv2.imwrite(str(frames / f"frame-{written:03d}.png"), result)
            written += 1
        capture.release()
        if written < 20:
            raise RuntimeError(f"Only {written} usable frames")
        subprocess.run([
            str(args.ffmpeg), "-hide_banner", "-loglevel", "error", "-y",
            "-framerate", str(fps), "-i", str(frames / "frame-%03d.png"),
            "-an", "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p",
            "-b:v", "0", "-crf", "27", "-g", "1", "-keyint_min", "1",
            "-auto-alt-ref", "0", "-deadline", "good", "-cpu-used", "2",
            str(args.video),
        ], check=True)
    print(f"Prepared {written} frames at {fps:g} fps ({written / fps:.3f}s)")


if __name__ == "__main__":
    main()
