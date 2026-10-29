"""Use only real frames from gerenal.mp4, without synthesized or mirrored poses."""
import importlib.util
from pathlib import Path
import json

spec = importlib.util.spec_from_file_location('directions', Path(__file__).with_name('prepare-memoji-directions.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

# Reverse the real return-to-neutral segments where that gives a cleaner
# center-to-edge movement. There is no upper-right pose in this recording.
module.CLIPS = [
    ('general-up', 'gerenal.mp4', -90, [(0, 4.25), (1, 3.5)]),
    ('general-up-left', 'gerenal.mp4', -135, [(0, 1.125), (1, 1.7)]),
    ('general-left', 'gerenal.mp4', 180, [(0, 1.125), (.6, 1.7), (1, 2.75)]),
    ('general-down-left', 'gerenal.mp4', 135, [(0, 4.25), (1, 5.15)]),
    ('general-down', 'gerenal.mp4', 90, [(0, 7.75), (.3, 7.5), (.35, 7.25), (1, 6.78)]),
    ('general-right', 'gerenal.mp4', 0, [(0, 5.625), (1, 6.18)]),
]

if __name__ == '__main__':
    module.main()
    manifest = module.OUTPUT / 'directions.json'
    clips = json.loads(manifest.read_text(encoding='utf-8'))
    for clip in clips:
        clip['src'] = clip['src'].replace('?v=2', '?v=general1')
    manifest.write_text(json.dumps(clips, indent=2) + '\n', encoding='utf-8')
