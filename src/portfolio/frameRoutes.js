// Shortest paths use reversible, consecutive video frames and inspected
// close-pose bridges. No frame index is jumped to when the cursor changes.
export function distancesTo(goal, edges) {
  const distances = new Float64Array(edges.length).fill(Infinity);
  const visited = new Uint8Array(edges.length);
  distances[goal] = 0;
  for (let step = 0; step < edges.length; step++) {
    let node = -1;
    for (let i = 0; i < edges.length; i++) {
      if (!visited[i] && (node < 0 || distances[i] < distances[node])) node = i;
    }
    if (node < 0 || !Number.isFinite(distances[node])) break;
    visited[node] = 1;
    for (const [neighbor, cost] of edges[node]) {
      distances[neighbor] = Math.min(distances[neighbor], distances[node] + cost);
    }
  }
  return distances;
}

export function createRoutePlayer(manifest) {
  let node = manifest.neutral;
  let goal = node;
  let edge = null;
  let distance = distancesTo(goal, manifest.edges);
  let direction = 1;
  let speed = 1;
  const angleDistance = (a, b) => Math.abs(Math.atan2(Math.sin(a-b), Math.cos(a-b)));
  return {
    target(x, y) {
      const intensity = Math.min(1, Math.max(Math.abs(x), Math.abs(y)));
      let next = manifest.neutral;
      if (intensity > .035) {
        const angle = Math.atan2(y, x);
        const errors = manifest.routes.map(route => angleDistance(angle, Math.atan2(route.direction[1], route.direction[0])));
        const best = errors.indexOf(Math.min(...errors));
        // Five degrees of hysteresis prevents direction chatter.
        if (errors[best] + .085 < errors[direction]) direction = best;
        const nodes = manifest.routes[direction].nodes;
        next = nodes[Math.round((intensity-.035)/.965*(nodes.length-1))];
      }
      if (next === goal) return;
      goal = next;
      distance = distancesTo(goal, manifest.edges);
      if (edge && distance[edge.a]+edge.cost*edge.t < distance[edge.b]+edge.cost*(1-edge.t)) {
        [edge.a, edge.b] = [edge.b, edge.a];
        edge.t = 1-edge.t;
      }
      // Large changes traverse the same route faster; they must not queue a
      // second-long turn behind the current pointer position.
      const remaining = edge ? distance[edge.b]+edge.cost*(1-edge.t) : distance[node];
      speed = Math.min(2, Math.max(1, remaining/24));
    },
    advance(delta) {
      let remaining = Math.min(.05, Math.max(0, delta));
      while (remaining > 0) {
        if (!edge) {
          if (node === goal) break;
          let next = null;
          const currentPose = manifest.nodes[node];
          const targetPose = manifest.nodes[goal];
          if (currentPose.route !== targetPose.route &&
              Math.hypot(...currentPose.pose) > .08 && Math.hypot(...targetPose.pose) > .08) {
            // A cursor crossing sectors should not make the head dip back to
            // center. Fade directly to the already-loaded matching target.
            next = [goal, 4, .16];
          } else {
            for (const candidate of manifest.edges[node]) {
              if (!next || candidate[1]+distance[candidate[0]] < next[1]+distance[next[0]]) next = candidate;
            }
          }
          if (!next) break;
          const bridge = manifest.nodes[node].route !== manifest.nodes[next[0]].route;
          edge = { a: node, b: next[0], cost: next[1], duration: next[2], bridge, t: 0 };
        }
        // A bridge always gets a perceptible fade, even during a fast turn.
        const duration = edge.bridge ? .16 : Math.max(.018, edge.duration/speed);
        const time = (1-edge.t)*duration;
        if (remaining < time) { edge.t += remaining/duration; break; }
        remaining -= time;
        node = edge.b;
        edge = null;
      }
      const mix = edge?.bridge ? edge.t*edge.t*(3-2*edge.t) : edge?.t;
      return edge ? { a: edge.a, b: edge.b, mix, goal } : { a: node, b: node, mix: 0, goal };
    },
  };
}
