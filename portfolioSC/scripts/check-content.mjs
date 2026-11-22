import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = file => readFileSync(new URL(file, import.meta.url), 'utf8');
const es = JSON.parse(read('../src/locales/es.json'));
const en = JSON.parse(read('../src/locales/en.json'));
function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, shape(val)]));
  return typeof value;
}
assert.deepEqual(shape(es), shape(en), 'ES/EN dictionaries must have the same structure');
for (const [id,n] of [['1',6],['2',5]]) {
  assert.equal(es.projects[id].gallery.length,n);
  assert.equal(en.projects[id].gallery.length,n);
}
for (const file of ['SantiagoCalderonCV.pdf','SantiLogo.svg']) assert.ok(existsSync(new URL(`../public/${file}`,import.meta.url)),file);
for (const match of read('../src/data/site.js').matchAll(/from ['"]\.\.\/assets\/([^'"]+)['"]/g)) assert.ok(existsSync(new URL(`../src/assets/${match[1]}`,import.meta.url)), match[1]);
assert.ok(existsSync(new URL('../src/assets/yo.webp',import.meta.url)));
assert.ok(existsSync(new URL('../src/assets/iTEPC.png',import.meta.url)));
console.log('OK: ES/EN, project galleries, project assets, CV, logo, portrait and certificate.');
