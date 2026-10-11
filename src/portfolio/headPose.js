// The video's frame 0 is neutral. Every following block contains one angular
// sample, ordered from the smallest to the largest radial displacement.
export function poseFrame(x, y, atlas) {
  const radius = Math.min(1, Math.hypot(x, y));
  const radialIndex = Math.round(radius * atlas.radii);
  if (!radialIndex) return 0;
  const turns = (Math.atan2(y, x) / (2 * Math.PI) + 1) % 1;
  const angularIndex = Math.round(turns * atlas.angles) % atlas.angles;
  return 1 + angularIndex * atlas.radii + radialIndex - 1;
}

export function pointerPose(clientX, clientY, geometry, deadZone = .035) {
  const dx = clientX - geometry.x;
  const dy = clientY - geometry.y;
  const x = dx / Math.max(1, dx < 0 ? geometry.x - geometry.left : geometry.right - geometry.x);
  const y = dy / Math.max(1, dy < 0 ? geometry.y - geometry.top : geometry.bottom - geometry.y);
  const distance = Math.hypot(x, y);
  if (distance <= deadZone) return { x: 0, y: 0 };
  const intensity = Math.min(1, (distance - deadZone) / (1 - deadZone));
  return { x: x / distance * intensity, y: y / distance * intensity };
}
