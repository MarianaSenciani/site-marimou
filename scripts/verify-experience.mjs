import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync } from 'node:fs';

const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch({ headless: true, ...(existsSync(edge) ? { executablePath: edge } : {}) });
const base = process.env.PREVIEW_URL || 'http://localhost:3000';
mkdirSync('tmp/experience-qa', { recursive: true });
const errors = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('favicon')) errors.push(message.text()); });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('#hero-heading').waitFor();
  for (const [i, label] of [[1, '01 · Editorial'], [2, '02 · Decisões'], [3, '03 · Perfil']]) {
    await page.locator('.hero-selector summary').click();
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForTimeout(1000);
    assert.equal(await page.locator('h1').count(), 1, 'One primary heading');
    assert.equal(await page.locator(`.hero-option-${i}`).count(), 1);
    assert.equal(await page.locator('.mari-chat-launch').getAttribute('aria-hidden'), 'true', 'Chat launcher waits until the hero exits');
    await page.screenshot({ path: `tmp/experience-qa/hero-${i}-desktop.png` });
  }
  await page.locator('.hero-selector summary').click();
  await page.getByRole('button', { name: '01 · Editorial', exact: true }).click();
  await page.locator('.character-trigger').hover();
  await page.locator('.tool-model canvas').first().waitFor({ timeout: 20000 });
  await page.waitForTimeout(500);
  assert.equal(await page.locator('.tools-orbit [tabindex="0"]').count(), 5);
  await page.getByRole('button', { name: 'Figma: criação e organização de componentes', exact: false }).hover();
  await page.getByRole('tooltip').waitFor();
  await page.screenshot({ path: 'tmp/experience-qa/tools-desktop.png' });
  await page.getByRole('button', { name: 'Ativar tema claro', exact: true }).click();
  assert.equal(await page.locator('.experience-site').getAttribute('data-theme'), 'light');
  await page.screenshot({ path: 'tmp/experience-qa/hero-1-light.png' });
  await page.getByRole('button', { name: 'Ativar tema escuro', exact: true }).click();
  await page.locator('.language-selector summary').click();
  await page.getByRole('button', { name: '🇬🇧 English', exact: true }).click();
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.match(await page.locator('#hero-heading').getAttribute('aria-label'), /Hi, I’m Mari/);
  await page.locator('.language-selector summary').click();
  await page.getByRole('button', { name: '🇧🇷 Português', exact: true }).click();
  assert.equal(await page.locator('#projetos a.curated-case').count(), 3, 'Three fully clickable featured cards');
  assert.equal(await page.locator('.process-stage').count(), 6, 'All six process details from the wireframe');
  assert.equal(await page.locator('.recommendation-card').count(), 2, 'Two recommendation spaces');
  assert.equal(await page.locator('.experience-site').evaluate(el => getComputedStyle(el).backgroundSize), '54px 54px, 54px 54px', 'Original grid background');
  await page.locator('.physical-badge').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  await page.screenshot({ path: 'tmp/experience-qa/badge-before.png' });
  const badge = page.locator('.physical-badge-card');
  for (let i = 0; i < 2; i++) {
    const rect = await badge.boundingBox();
    await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
    await page.mouse.down(); await page.mouse.move(rect.x + rect.width / 2 + 35, rect.y + rect.height / 2 + 65, { steps: 12 }); await page.mouse.up();
    await page.waitForTimeout(850);
  }
  assert.equal(await badge.getAttribute('aria-expanded'), 'true', 'Two pulls reveal contact card');
  await page.screenshot({ path: 'tmp/experience-qa/badge-open.png' });
  await page.locator('.restored-footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator('.physical-badge').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1400);
  assert.equal(await badge.getAttribute('aria-expanded'), 'false', 'Re-entry resets badge');
  await page.getByRole('button', { name: 'Pergunte à Mari', exact: true }).click();
  await page.getByRole('dialog').waitFor();
  assert.equal(await page.locator('.chat-questions button').count(), 3);
  assert.equal(await page.locator('.chat-topics button').count(), 4);
  await page.getByRole('button', { name: 'Em que você atua?', exact: true }).click();
  await page.waitForTimeout(1600);
  assert.match(await page.locator('.chat-exchange').textContent(), /Product Ownership/);
  await page.getByRole('button', { name: 'Ampliar chat' }).click();
  assert.ok((await page.getByRole('dialog').boundingBox()).width > 600);
  await page.screenshot({ path: 'tmp/experience-qa/chat.png' });
  await page.keyboard.press('Escape');
  await page.goto(`${base}/sobre`, { waitUntil: 'networkidle' });
  await page.locator('.photo-story-stack').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const stack = page.locator('.photo-story-stack');
  for (const direction of [-1, 1]) {
    const rect = await stack.boundingBox(); const x = rect.x + rect.width / 2, y = rect.y + 140;
    await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x + direction * 130, y + 5, { steps: 14 }); await page.mouse.up(); await page.waitForTimeout(600);
    assert.match(await page.locator('.story-index').textContent(), direction < 0 ? /02 \/ 05/ : /01 \/ 05/);
  }
  await page.screenshot({ path: 'tmp/experience-qa/story.png' });
  for (const route of ['/projetos', '/projetos/sicredi', '/projetos/lwsa', '/projetos/livo']) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('h1').count(), 1, route);
    if (route !== '/projetos') assert.equal(await page.locator('.case-highlights > div').count(), 3, 'Three opening highlights');
  }
  for (const width of [390, 320]) {
    const mobile = await browser.newContext({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
    const tab = await mobile.newPage(); tab.on('pageerror', error => errors.push(error.message));
    await tab.goto(base, { waitUntil: 'networkidle' });
    for (const [i, label] of [[1, '01 · Editorial'], [2, '02 · Decisões'], [3, '03 · Perfil']]) {
      await tab.locator('.hero-selector summary').click(); await tab.getByRole('button', { name: label, exact: true }).click(); await tab.waitForTimeout(850);
      assert.ok(await tab.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Hero ${i}: no overflow at ${width}px`);
      await tab.screenshot({ path: `tmp/experience-qa/hero-${i}-${width}.png`, fullPage: false });
    }
    await tab.locator('.character-trigger').tap();
    await tab.waitForTimeout(400);
    assert.equal(await tab.locator('.character-trigger').getAttribute('aria-expanded'), 'true');
    await mobile.close();
  }
  const reduced = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } });
  const tab = await reduced.newPage(); await tab.goto(base, { waitUntil: 'networkidle' });
  assert.equal(await tab.locator('.experience-site.motion-paused').count(), 1);
  assert.equal(await tab.locator('.experience-ribbon-track').first().evaluate(el => getComputedStyle(el).animationName), 'none');
  await reduced.close(); await context.close();
  assert.deepEqual(errors, [], 'Browser console and runtime errors');
  console.log('PASS: 3 heroes; 3D orbit/tooltip; theme/language; badge pulls/re-entry; chat; bidirectional photo drag; case routes; 390/320px; reduced motion.');
} finally { await browser.close(); }
