import { spawn } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const port = Number(process.env.TEST_PORT || 3100);
const child = spawn(process.execPath, ['dist/server.cjs', '--production'], {
  env: { ...process.env, PORT: String(port) }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
});
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Production server startup timeout')), 15000);
    child.once('error', e => { clearTimeout(timer); reject(e); });
    child.once('exit', code => { clearTimeout(timer); reject(new Error(`Server exited: ${code}`)); });
    child.stdout.on('data', data => { if (data.toString().includes('Server running')) { clearTimeout(timer); resolve(); } });
    child.stderr.on('data', data => process.stderr.write(data));
  });
  for (const path of [
    '/', '/sobre', '/projetos', '/projetos/sicredi', '/projetos/lwsa', '/projetos/livo',
    '/assets/memoji-neutral.png', '/assets/badge/front.svg', '/assets/badge/contact.svg',
    '/assets/badge/cord.svg', '/assets/badge/clip.svg',
    '/assets/tools-3d/claude_logo_3d.obj', '/assets/tools-3d/github_logo_3d.obj',
    '/assets/tools-3d/claude_logo_3d.mtl', '/assets/tools-3d/github_logo_3d.mtl',
    '/favicon.svg', '/Mariana-Senciani.pdf',
  ]) {
    const response = await fetch(`http://localhost:${port}${path}`);
    assert.equal(response.status, 200, path);
    if (path.endsWith('.png')) assert.match(response.headers.get('content-type'), /image\/png/);
    if (path.endsWith('.svg')) assert.match(response.headers.get('content-type'), /image\/svg/);
    if (path.endsWith('.obj')) assert.match(await response.text(), /\nv /);
    if (path.endsWith('.mtl')) assert.match(await response.text(), /newmtl/);
    if (path.endsWith('.webp')) assert.match(response.headers.get('content-type'), /image\/webp/);
    if (path.endsWith('/routes.json')) assert.ok((await response.json()).nodes.length>100);
    if (path.split('?')[0].endsWith('.webm')) assert.match(response.headers.get('content-type'), /video\/webm/);
    if (path.endsWith('.pdf')) {
      assert.match(response.headers.get('content-type'), /application\/pdf/);
      assert.equal(Buffer.from(await response.arrayBuffer()).subarray(0, 5).toString(), '%PDF-');
    }
    console.log(`OK ${path}`);
  }
  const blocked = await fetch(`http://localhost:${port}/api/translate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
  assert.equal(blocked.status, 403);
  const assets = readdirSync('dist/assets');
  assert.ok(!assets.some(name => name.startsWith('AdminApp')), 'Admin must be excluded from production bundles');
  const bundle = assets.filter(name => name.endsWith('.js')).map(name => readFileSync(`dist/assets/${name}`, 'utf8')).join('');
  assert.ok(!bundle.includes('Abrir painel local'), 'Local editor login should not ship');
  console.log('OK production: editor excluded, editing API blocked');
} finally {
  child.kill();
}
