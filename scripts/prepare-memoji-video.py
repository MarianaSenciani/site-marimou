"""Remove the black backdrop from the supplied Memoji recording.

Usage: python scripts/prepare-memoji-video.py SOURCE.mp4 OUTPUT.webm FFMPEG.exe
Requires OpenCV and NumPy. Every encoded frame is a keyframe so the resulting
video can be scrubbed in either direction by the cursor.
"""

import argparse
from pathlib import Path
import subprocess
import tempfile

import cv2
import numpy as np


# Keep the neutral opening and the three actual directional movements.
SEGMENTS = ((0.0, 1.5), (2.2, 3.0), (5.75, 6.5))


def isolate_head(frame):
    crop = frame[:, 320:960]
    dark = (np.max(crop, axis=2) <= 25).astype(np.uint8)
    _, labels = cv2.connectedComponents(dark, connectivity=8)
    foreground = (labels != labels[0, 0]).astype(np.uint8)
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
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("ffmpeg", type=Path)
    args = parser.parse_args()
    args.output.parent.mkdir(parents=True, exist_ok=True)

    capture = cv2.VideoCapture(str(args.source))
    fps = capture.get(cv2.CAP_PROP_FPS)
    if not capture.isOpened() or fps <= 0:
        raise RuntimeError("Could not read supplied Memoji recording")

    with tempfile.TemporaryDirectory() as temporary:
        folder = Path(temporary)
        frame_count = 0
        source_index = 0
        ranges = [(round(start * fps), round(end * fps)) for start, end in SEGMENTS]
        while source_index <= ranges[-1][1]:
            ok, frame = capture.read()
            if not ok:
                break
            if any(start <= source_index <= end for start, end in ranges):
                cv2.imwrite(str(folder / f"frame-{frame_count:04d}.png"), isolate_head(frame))
                frame_count += 1
            source_index += 1
        capture.release()
        if frame_count < 12:
            raise RuntimeError(f"Too few frames: {frame_count}")

        subprocess.run([
            str(args.ffmpeg), "-hide_banner", "-loglevel", "error", "-y",
            "-framerate", str(fps), "-i", str(folder / "frame-%04d.png"),
            "-an", "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p",
            "-b:v", "0", "-crf", "29", "-g", "1", "-keyint_min", "1",
            "-auto-alt-ref", "0", "-deadline", "good", "-cpu-used", "2",
            str(args.output),
        ], check=True)
        print(f"{frame_count} frames, {frame_count / fps:.3f}s")


if __name__ == "__main__":
    main()
