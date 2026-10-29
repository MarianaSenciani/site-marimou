import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRoutePlayer, distancesTo } from '../src/portfolio/frameRoutes.js';

const manifest = JSON.parse(readFileSync('public/assets/memoji/routes/routes.json','utf8'));
assert.equal(manifest.routes.length,8);
for (const page of manifest.pages) assert.ok(existsSync(`public${page}`),page);
for (const route of manifest.routes) {
  assert.ok(existsSync(`Assets/memoji/Videos/${route.source}`));
  assert.ok(route.nodes.length>10);
}
for (let a=0;a<manifest.edges.length;a++) for(const [b,cost,duration] of manifest.edges[a]) {
  assert.ok(cost>0 && duration>0);
  assert.ok(manifest.edges[b].some(([node,reverseCost])=>node===a && reverseCost===cost));
}
assert.ok([...distancesTo(manifest.neutral,manifest.edges)].every(Number.isFinite));

for (const rate of [60,90,120,144]) {
  const player=createRoutePlayer(manifest);
  let previous=player.advance(0);
  for (const [x,y] of [[0,0],[.5,0],[1,0],[1,-1],[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[0,0]]) {
    player.target(x,y);
    for (let frame=0;frame<rate*3;frame++) {
      const pose=player.advance(1/rate);
      assert.ok(pose.mix>=0 && pose.mix<=1);
      if(pose.a!==pose.b) assert.ok(manifest.edges[pose.a].some(([b])=>b===pose.b) || manifest.nodes[pose.a].route!==manifest.nodes[pose.b].route,'Blend consecutive frames or a directional fade');
      if(previous.goal===pose.goal && previous.a!==pose.a) {
        const costs=distancesTo(pose.goal,manifest.edges);
        assert.ok(costs[pose.a]<=costs[previous.a],'Route must advance toward the latest target');
      }
      previous=pose;
    }
    assert.equal(previous.a,previous.goal,'Must arrive and hold target');
    assert.equal(previous.b,previous.goal);
    assert.deepEqual(player.advance(1/rate),previous,'Stationary cursor must hold');
  }
  assert.equal(previous.a,manifest.neutral);
}
// Reversing input midway through an edge keeps the same image pair and pose.
const player=createRoutePlayer(manifest);
player.target(1,0);
const before=player.advance(.01);
player.target(0,0);
const after=player.advance(0);
const contribution=pose=>new Map([[pose.a,1-pose.mix],[pose.b,pose.mix]]);
const weights=contribution(before);
for(const [frame,weight] of contribution(after)) assert.ok(Math.abs(weight-weights.get(frame))<1e-9);
console.log(`OK ${manifest.nodes.length} real frames: graph connectivity, reversible edges, hold, return, 60–144 Hz, continuous retargeting`);

const crossing=createRoutePlayer(manifest);
crossing.target(1,0);
for(let i=0;i<180;i++) crossing.advance(1/60);
crossing.target(-1,0);
const middle=crossing.advance(.04);
const halfway=crossing.advance(.04);
assert.notEqual(middle.a,middle.b);
assert.ok(Math.abs(halfway.mix-.5)<1e-8,'Directional fade must retain its 160 ms duration');
assert.ok(Math.hypot(...manifest.nodes[halfway.a].pose)>.9 && Math.hypot(...manifest.nodes[halfway.b].pose)>.9,'Sector crossing must not reset to neutral');
console.log('OK fixed-duration directional fade without a center detour');
