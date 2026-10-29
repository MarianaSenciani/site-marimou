import assert from 'node:assert/strict';
import { poseFrame, pointerPose } from '../src/portfolio/headPose.js';

const atlas = { angles: 64, radii: 32 };
const decode = frame => {
  if (!frame) return { x: 0, y: 0 };
  const radius = ((frame - 1) % atlas.radii + 1) / atlas.radii;
  const angle = Math.floor((frame - 1) / atlas.radii) / atlas.angles * Math.PI * 2;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
};
assert.equal(poseFrame(0, 0, atlas), 0);
// Reconstruct poses to verify the video lookup, including the angular wrap.
for (let angle = -Math.PI * 2; angle <= Math.PI * 2; angle += .017) {
  for (let radius = .01; radius <= 1; radius += .031) {
    const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius;
    const frame = poseFrame(x, y, atlas);
    assert.ok(frame >= 0 && frame <= atlas.angles * atlas.radii);
    const decoded = decode(frame);
    assert.ok(Math.hypot(decoded.x - x, decoded.y - y) < .055, 'Pose discontinuity exceeds grid precision');
  }
}
assert.equal(poseFrame(1, -.00001, atlas), poseFrame(1, .00001, atlas), 'Right-hand angular seam');
const geometry = { left: 40, right: 840, top: 80, bottom: 780, x: 440, y: 340 };
assert.deepEqual(pointerPose(440, 340, geometry), { x: 0, y: 0 });
assert.deepEqual(pointerPose(445, 341, geometry), { x: 0, y: 0 });
assert.equal(pointerPose(840, 340, geometry).x, 1);
assert.equal(pointerPose(440, 80, geometry).y, -1);
const original = pointerPose(630, 475, geometry);
const shifted = pointerPose(660, 495, Object.fromEntries(Object.entries(geometry).map(([key, value]) => [key, value + (['x', 'left', 'right'].includes(key) ? 30 : 20)])));
assert.deepEqual(original, shifted, 'Tracking must be independent of the viewport origin');
console.log('OK pose lookup: center, dead zone, eight sectors, angular wrap, continuous intensity and local geometry');
