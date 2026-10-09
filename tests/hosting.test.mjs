import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { generateKeyPair, exportJWK, createLocalJWKSet, SignJWT } from 'jose';
import { createAdminWorker, ADMIN_HOST, ACCESS_ISSUER, ACCESS_AUDIENCE } from '../public/_worker.js';

const { publicKey, privateKey } = await generateKeyPair('RS256');
const jwk = { ...await exportJWK(publicKey), kid: 'test', alg: 'RS256', use: 'sig' };
const worker = createAdminWorker(createLocalJWKSet({ keys: [jwk] }));
let assetCalls = 0;
const env = { ASSETS: { fetch: async () => { assetCalls++; return new Response('admin shell'); } } };
const request = (token, host = ADMIN_HOST, path = '/') => new Request(`https://${host}${path}`, {
  headers: token ? { 'Cf-Access-Jwt-Assertion': token } : {},
});
async function token(overrides = {}, key = privateKey) {
  return new SignJWT({ type: 'app', ...overrides })
    .setProtectedHeader({ alg: 'RS256', kid: 'test' })
    .setIssuer(overrides.iss ?? ACCESS_ISSUER)
    .setAudience(overrides.aud ?? ACCESS_AUDIENCE)
    .setSubject('test-owner').setIssuedAt()
    .setExpirationTime(overrides.exp ?? '5m').sign(key);
}

test('production, deployment and preview aliases redirect every asset to the protected domain', async () => {
  for (const host of ['culinorium-admin.pages.dev', 'abc.culinorium-admin.pages.dev', 'preview.culinorium-admin.pages.dev']) {
    const response = await worker.fetch(request('forged', host, '/assets/app.js?version=1'), env);
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('location'), `https://${ADMIN_HOST}/assets/app.js?version=1`);
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
  }
  assert.equal(assetCalls, 0);
});

test('missing, forged, expired, wrong-audience and wrong-issuer tokens never reach assets', async () => {
  const other = await generateKeyPair('RS256');
  for (const value of [undefined, 'forged', await token({ exp: 1 }), await token({ aud: 'another-app' }),
    await token({ iss: 'https://another.cloudflareaccess.com' }), await token({}, other.privateKey), await token({ type: 'service' })]) {
    const response = await worker.fetch(request(value), env);
    assert.equal(response.status, 403);
  }
  assert.equal(assetCalls, 0);
});

test('valid signed Access token serves assets without browser caching or indexing', async () => {
  const response = await worker.fetch(request(await token()), env);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), 'admin shell');
  assert.equal(assetCalls, 1);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
});

test('production assets use root paths and all routes are covered by the guard', async () => {
  const base = new URL('../output/cloudflare/build/', import.meta.url);
  const html = await readFile(new URL('index.html', base), 'utf8');
  assert.doesNotMatch(html, /\/smakolyk-admin\//);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]+)"/g)) {
    await readFile(new URL(match[1].slice(1), base));
  }
  const manifest = JSON.parse(await readFile(new URL('manifest.json', base), 'utf8'));
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  for (const icon of manifest.icons) await readFile(new URL(icon.src.slice(1), base));
  const routes = JSON.parse(await readFile(new URL('_routes.json', base), 'utf8'));
  assert.deepEqual(routes.include, ['/*']);
  assert.deepEqual(routes.exclude, []);
  const sw = await readFile(new URL('sw.js', base), 'utf8');
  assert.doesNotMatch(sw, /caches\.match|cache\.put|addEventListener\(['"]fetch/);
});
