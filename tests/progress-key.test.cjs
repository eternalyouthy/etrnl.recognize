/* Run: node tests/progress-key.test.cjs
 * Requires Playwright and Chrome (or its bundled Chromium). No app dependencies.
 * Uses isolated browser profiles and a temporary localhost server; never uses real progress.
 * PLAYWRIGHT_MODULE_PATH / CHROME_PATH can point to an existing test runtime.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const zlib = require('node:zlib');
let playwright;
try { playwright = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright'); }
catch (_) { playwright = require(path.resolve(path.dirname(process.execPath), '../node_modules/playwright')); }
const root = path.resolve(__dirname, '..');
const swSource = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const swCache = 'etrnl-recognize-' + /CACHE_PREFIX \+ '(\d+)'/.exec(swSource)[1];
// --sandbox serves local assets through Playwright interception, with no network/socket access.
// Service-worker networking must be checked separately when a localhost server is permitted.
const sandbox = process.argv.includes('--sandbox');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
  if (!file.startsWith(root + path.sep) || !mime[path.extname(file)]) { res.writeHead(404); res.end(); return; }
  fs.readFile(file, (error, bytes) => {
    res.writeHead(error ? 404 : 200, { 'Content-Type': mime[path.extname(file)], 'Cache-Control': 'no-store' });
    res.end(error ? '' : bytes);
  });
});
const T = 1795608034567, DAY = 86400000;
function envelope(version, lang, payload) {
  const body = Buffer.concat([Buffer.from([version]), lang === 'all' ? Buffer.alloc(2) : Buffer.from(lang), zlib.deflateRawSync(payload)]);
  let crc = 0xffffffff;
  for (const byte of body) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  const check = Buffer.alloc(4); check.writeUInt32LE((crc ^ 0xffffffff) >>> 0);
  return 'RECGZ' + version + '-' + lang + '-' + Buffer.concat([body, check]).toString('base64url');
}
function bundlePayload(entries) {
  const parts = [Buffer.from([entries.length])];
  for (const [lang, bytes] of entries) {
    const length = []; let n = bytes.length;
    do { const b = n % 128; n = Math.floor(n / 128); length.push(b + (n ? 128 : 0)); } while (n);
    parts.push(Buffer.from(lang), Buffer.from(length), bytes);
  }
  return Buffer.concat(parts);
}
function fresh(lang = 'de') {
  return { version: 2, language: lang, created: T - 100 * DAY, cards: {}, later: {}, deleted: {}, resetAt: 0, log: {}, lastPractice: null, lastExport: null };
}
function sample() {
  const d = fresh();
  d.cards = {
    'future-unknown-drill': { state: 'review', s: 3.173, d: 7.1949, due: T + DAY, last: T, added: T - DAY, reps: 4, lapses: 1, future: { label: 'ä / русский / 😀', nested: [1, null] } },
    'new#prod': { state: 'new', due: T, added: T, reps: 0, lapses: 0 },
    'known#rec': { state: 'known', known: T + 1, last: T + 1, added: T },
    'lernen#rec': { state: 'learning', s: 0.40255, d: 5.214568912345, due: T + 60000, last: T - 1, added: T - 2, reps: 2, lapses: 0 },
    'lernen#prod': { state: 'relearning', s: 8.5, d: 5, due: T + 120000, last: T, added: T - 100, reps: 10, lapses: 3 },
    'слово😀#rec': { state: 'review', s: 123456.789, d: 6.33, due: T + 10 * DAY, last: T, added: T - 999, reps: 9999, lapses: 19 },
    'слово😁#prod': { state: 'review', s: 2 ** -24, d: 1, due: T, last: T, added: T, reps: 1, lapses: 0 }
  };
  d.later = { 'future-waiting': T + 2, 'ещё': T + 3 };
  d.deleted = { 'removed#rec': T + 4 };
  d.log = { '2026-11-24': { reviews: 20, learned: 10, extra: { minutes: 12 } }, '2026-11-25': { reviews: 30, learned: 8 } };
  d.lastPractice = T + 5; d.lastExport = T - 6;
  d.futureRoot = { note: 'must survive an older client', version: 3 };
  return d;
}
async function main() {
  if (!sandbox) await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + (sandbox ? 8765 : server.address().port);
  const chrome = process.env.CHROME_PATH || (process.platform === 'win32' ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' : undefined);
  const browser = await playwright.chromium.launch({ headless: true, ...(chrome && fs.existsSync(chrome) ? { executablePath: chrome } : {}) });
  const errors = [], results = []; let deviceCount = 0;
  async function device(data, viewport = { width: 1280, height: 900 }, sw = 'block') {
    const context = await browser.newContext({ viewport, serviceWorkers: sw, timezoneId: deviceCount++ % 2 ? 'Asia/Tokyo' : 'America/Los_Angeles' });
    await context.route('**/*', async route => {
      if (!route.request().url().startsWith(origin + '/')) return route.abort();
      if (!sandbox) return route.continue();
      const name = decodeURIComponent(new URL(route.request().url()).pathname);
      const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
      if (!file.startsWith(root + path.sep) || !mime[path.extname(file)] || !fs.existsSync(file)) return route.fulfill({ status: 404, body: '' });
      return route.fulfill({ contentType: mime[path.extname(file)], body: await fs.promises.readFile(file) });
    });
    await context.addInitScript(data => {
      if (localStorage.getItem('test.initialized')) return;
      localStorage.setItem('test.initialized', '1');
      localStorage.setItem('etrnl.settings.v1', JSON.stringify({ knowLang: 'ru', learnLang: 'de' }));
      localStorage.setItem('gt.progress.v1', JSON.stringify(data));
      localStorage.setItem('etrnl.clock.v1', JSON.stringify({ offset: 120000 }));
    }, data);
    const page = await context.newPage();
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(origin + '/#/user');
    await page.waitForSelector('[data-act="key-generate"]');
    return page;
  }
  const data = sample();
  let a, b;
  const snapshot = page => page.evaluate(() => JSON.parse(JSON.stringify(GT.store.data)));
  const storage = page => page.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map(k => [k, localStorage.getItem(k)])));
  const key = page => page.evaluate(() => GT.store.generateProgressKey());
  const add = (page, value) => page.evaluate(value => GT.store.addProgressKey(value), value);
  const seed = (page, value) => page.evaluate(value => GT.store.importJSON(JSON.stringify({ app: 'etrnl', progress: { [value.language]: value } }), { replace: true, keepSettings: true }), value);
  try {
    a = await device(data); b = await device(fresh());
    const buttonPositions = await a.evaluate(() => {
      var box = document.querySelector('#progressKeyBox'), reset = box.querySelector('[data-act="reset-all"]'), actions = box.querySelector('.progress-key-actions');
      return { firstBox: document.querySelector('#main .box') === box, lastAction: actions.lastElementChild === reset,
        resetRight: reset.getBoundingClientRect().right, actionsRight: actions.getBoundingClientRect().right };
    });
    assert(buttonPositions.firstBox && buttonPositions.lastAction);
    assert(Math.abs(buttonPositions.resetRight - buttonPositions.actionsRight) < 1);
    const fixture = require('./fixtures/progress-key-v1.json');
    assert.deepEqual(await a.evaluate(k => GT.progressKey.decode(k), fixture.key), fixture.data);
    const fixtureV2 = require('./fixtures/progress-key-v2.json');
    assert.deepEqual(await a.evaluate(k => GT.progressKey.decode(k), fixtureV2.key), fixtureV2.data);
    results.push('Frozen v1 and v2 compatibility fixtures decode exactly (keep these fixtures unchanged for future codec versions).');
    const original = await snapshot(a), beforeGenerate = await storage(a), ka = await key(a);
    assert.match(ka, /^RECGZ2-all-[A-Za-z0-9_-]+$/);
    assert.deepEqual(await a.evaluate(k => GT.progressKey.decode(k), ka), { progress: { de: original } });
    assert.deepEqual(await storage(a), beforeGenerate);
    assert.equal(await a.evaluate(() => GT.now() - Date.now()), 120000);
    const splitKey = ka.match(/.{1,61}/g).join(' \r\n\t');
    assert.deepEqual(await a.evaluate(k => GT.progressKey.decode(k), splitKey), { progress: { de: original } });
    const added = await add(b, splitKey);
    assert.equal(added.added, Object.keys(data.cards).length);
    assert.equal(added.updated, 0);
    assert.deepEqual(await snapshot(b), original);
    results.push('a) Exact round-trip: cards/later/deleted/log and all metadata, arbitrary string ids, UTF-8 extras, millisecond timestamps, full FSRS precision; split messages accepted.');

    // Same-time conflicts are deliberate: the old merge selected the incoming side.
    const da = sample(), db = sample();
    db.cards['lernen#rec'].s = 19.3723456789;
    db.cards['lernen#rec'].d = 6.7890123456;
    db.cards['lernen#prod'].last += 8000; db.cards['lernen#prod'].reps++;
    db.cards['only-b#rec'] = { state: 'known', known: T + 20, last: T + 20, added: T + 20 };
    db.cards['removed#rec'] = { state: 'new', due: T, added: T + 3 };
    db.deleted['new#prod'] = T + 1;
    db.later['future-waiting'] += 1000;
    db.log['2026-11-24'].reviews = 35;
    db.log['2026-11-25'].learned = 19;
    db.lastPractice += 1000;
    db.futureRoot = { note: 'different future metadata' };
    await seed(a, da); await seed(b, db);
    const [ak, bk] = await Promise.all([key(a), key(b)]);
    await add(a, bk); await add(b, ak);
    assert.deepEqual(await snapshot(a), await snapshot(b));
    const merged = await snapshot(a);
    assert(!merged.cards['new#prod']); assert(!merged.cards['removed#rec']);
    assert(merged.cards['future-unknown-drill']); assert(merged.cards['only-b#rec']);
    results.push('b) Independent browser profiles converge in both directions, including full ties, deletion at +1 ms, later/log and unknown metadata.');
    const once = await storage(a);
    assert.deepEqual(await add(a, bk), { languages: ['de'], added: 0, updated: 0 });
    assert.deepEqual(await storage(a), once);
    const finalKey = await key(a);
    await add(b, finalKey);
    assert.deepEqual(await snapshot(a), await snapshot(b));
    results.push('c) Repeated key is a no-op, including persisted storage and +0/0 summary.');

    const newCards = await a.evaluate(() => {
      var a = { state: 'new', due: 1000, added: 1000, reps: 0, lapses: 0 };
      var b = { state: 'new', due: 2000, added: 500, reps: 0, lapses: 0 };
      var once = GT.store.mergeCard(a, b);
      return { once: once, twice: GT.store.mergeCard(once, b), reverse: GT.store.mergeCard(b, a) };
    });
    assert.deepEqual(newCards.once, newCards.twice); assert.deepEqual(newCards.once, newCards.reverse);
    assert.equal(newCards.once.due, 1000); assert.equal(newCards.once.last, 1000); assert.equal(newCards.once.added, 500);
    results.push('New cards without a first review retain their last-change timestamp when merging the earliest added date.');

    // Corruption cannot touch ANY storage key (including metadata/settings/clock).
    const corrupt = finalKey.slice(0, 30) + (finalKey[30] === 'A' ? 'B' : 'A') + finalKey.slice(31);
    for (const bad of [corrupt, finalKey.slice(0, -1), finalKey.slice(0, -14), finalKey.replace('-all-', '-de-'), '', finalKey + '!']) {
      const before = await storage(a);
      const error = await a.evaluate(async value => { try { await GT.store.addProgressKey(value); return ''; } catch (e) { return e.message; } }, bad);
      assert.equal(error, 'Key is damaged or incomplete — copy it again');
      assert.deepEqual(await storage(a), before);
    }
    results.push('d) Altered character, truncations, mismatched language and invalid text reject with the requested error; storage untouched.');
    const validBytes = Buffer.from(fixture.key.slice('RECGZ1-en-'.length), 'base64url');
    const payload = zlib.inflateRawSync(validBytes.subarray(3, -4));
    for (const malformed of [envelope(1, 'en', payload.subarray(0, -1)), envelope(1, 'en', Buffer.concat([payload, Buffer.from([0])])), envelope(1, 'en', Buffer.alloc(20000001))]) {
      const before = await storage(a);
      const message = await a.evaluate(async k => { try { await GT.store.addProgressKey(k); return ''; } catch (e) { return e.message; } }, malformed);
      assert.equal(message, 'Key is damaged or incomplete — copy it again'); assert.deepEqual(await storage(a), before);
    }
    const futureMessage = await a.evaluate(async k => { try { await GT.store.addProgressKey(k); return ''; } catch (e) { return e.message; } }, envelope(3, 'all', payload));
    assert.match(futureMessage, /newer version of RECGZ/);
    results.push('Valid-CRC malformed/trailing payload and oversized inflation reject; future format requests an update.');

    // Reset stays local: an old key restores it, and post-reset learning adds to the other device.
    await seed(a, sample()); await seed(b, sample());
    const originalBeforeReset = await snapshot(a), oldKey = await key(b);
    await a.evaluate(() => GT.store.reset());
    assert.equal((await snapshot(a)).resetAt, 0);
    const resetOnlyKey = await key(a);
    assert.deepEqual(await a.evaluate(k => GT.progressKey.decode(k), resetOnlyKey), { progress: {} });
    const untouchedB = await storage(b);
    assert.deepEqual(await add(b, resetOnlyKey), { languages: [], added: 0, updated: 0 });
    assert.deepEqual(await storage(b), untouchedB);
    await a.reload(); await a.waitForSelector('#progressKeyBox');
    await add(a, oldKey);
    assert.deepEqual(await snapshot(a), originalBeforeReset);
    await a.evaluate(() => { GT.store.reset(); GT.store.setItemKnown('phone-after-reset', GT.now()); });
    const postResetKey = await key(a), postResetPayload = await a.evaluate(k => GT.progressKey.decode(k), postResetKey);
    assert.equal(postResetPayload.progress.de.resetAt, 0);
    const addedAfterReset = await add(b, postResetKey);
    assert.deepEqual(addedAfterReset, { languages: ['de'], added: 2, updated: 0 });
    const bAfterNewTopics = await snapshot(b);
    for (const id of Object.keys(originalBeforeReset.cards)) assert.deepEqual(bAfterNewTopics.cards[id], originalBeforeReset.cards[id]);
    assert.equal(Object.keys(bAfterNewTopics.cards).length, Object.keys(originalBeforeReset.cards).length + 2);
    await add(a, oldKey);
    assert.deepEqual(await snapshot(a), await snapshot(b));
    const afterBothKeys = await storage(b);
    assert.deepEqual(await add(b, postResetKey), { languages: ['de'], added: 0, updated: 0 });
    assert.deepEqual(await storage(b), afterBothKeys);
    results.push('Reset is local and absent from generated keys: a saved key restores after reload; new post-reset topics add to the other device without losing any previous cards; repeats remain no-ops.');

    // Old apps emitted reset barriers. Neither an incoming nor a local legacy barrier may erase key progress.
    const resetMarker = fresh(); resetMarker.resetAt = T + 100 * DAY;
    for (const format of [1, 2]) {
      const legacyResetKey = await a.evaluate(({ data, format }) => format === 1 ? GT.progressKey.encode(data, 'de') : GT.progressKey.encodeAll({ de: data }), { data: resetMarker, format });
      const beforeLegacyReset = await snapshot(b);
      await add(b, legacyResetKey);
      assert.deepEqual(await snapshot(b), beforeLegacyReset);
      await seed(a, resetMarker);
      await a.reload(); await a.waitForSelector('#progressKeyBox');
      await add(a, oldKey);
      assert.deepEqual((await snapshot(a)).cards, originalBeforeReset.cards);
      assert.equal((await snapshot(a)).resetAt, 0);
    }
    await add(a, postResetKey);
    assert.deepEqual(await snapshot(a), await snapshot(b));
    results.push('Legacy v1/v2 reset markers are ignored on both sides of key import; saved progress can restore even a device reset by an older app.');
    for (const lang of ['en', 'ru']) {
      const foreign = sample(); foreign.language = lang;
      const beforeDE = await snapshot(a);
      const foreignKey = await a.evaluate(d => GT.progressKey.encode(d, d.language), foreign);
      await add(a, foreignKey);
      assert.deepEqual(await snapshot(a), beforeDE);
      assert.deepEqual(await a.evaluate(l => GT.store.dataFor(l), lang), foreign);
    }
    await a.reload(); await a.waitForSelector('[data-act="key-generate"]');
    assert(await a.evaluate(() => !!GT.store.dataFor('ru').cards['future-unknown-drill']));
    results.push('EN/RU keys preserve DE and survive reload, including new drill ids.');
    const reset = fresh(); reset.resetAt = Date.UTC(2026, 10, 25, 0, 30);
    const logs = fresh(); logs.log = { '2026-11-24': { reviews: 2, learned: 1 }, '2026-11-25': { reviews: 3, learned: 1 } };
    const resetMerge = (page, x, y) => page.evaluate(([x, y]) => GT.store.mergeLangData(x, y, 'de'), [x, y]);
    const resetA = await resetMerge(a, reset, logs), resetB = await resetMerge(b, logs, reset);
    assert.deepEqual(resetA, resetB); assert(!resetA.log['2026-11-24']);
    results.push('The existing file/sync reset merge still converges across Los Angeles and Tokyo time zones.');

    // A stale Later key must not undo the later learn -> remove sequence.
    const waiting = fresh(), learned = fresh(), removed = fresh(), postponedAgain = fresh();
    waiting.later.x = T;
    learned.cards['x#rec'] = { state: 'new', added: T + 1, due: T + 1, reps: 0, lapses: 0 };
    removed.deleted['x#rec'] = T + 2;
    postponedAgain.later.x = T + 3;
    const learnThenRemove = await resetMerge(a, learned, removed);
    const laterResult = await resetMerge(a, waiting, learnThenRemove);
    assert.deepEqual(laterResult, await resetMerge(a, await resetMerge(a, waiting, learned), removed));
    assert.deepEqual(laterResult.later, {});
    assert.equal((await resetMerge(a, postponedAgain, learnThenRemove)).later.x, T + 3);
    const opaque = fresh();
    opaque.later.toString = T; opaque.deleted.hasOwnProperty = T + 1;
    assert.deepEqual(await resetMerge(a, fresh(), opaque), await resetMerge(a, opaque, fresh()));
    assert.equal((await resetMerge(a, fresh(), opaque)).later.toString, T);
    assert.equal((await resetMerge(a, fresh(), opaque)).deleted.hasOwnProperty, T + 1);
    results.push('Old Later keys stay cancelled after learn/remove; a later explicit postponement survives; opaque string ids merge in either direction.');

    const algebra = await a.evaluate(() => {
      var seed = 74649, t = 1795608034567;
      function rand(n) { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed % n; }
      function canonical(v) {
        if (v === null || typeof v !== 'object') return JSON.stringify(v);
        if (Array.isArray(v)) return '[' + v.map(canonical).join(',') + ']';
        return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canonical(v[k])).join(',') + '}';
      }
      function randomProgress() {
        var d = { version: 2, language: 'de', created: t - 8640000000, cards: {}, later: {}, deleted: {}, resetAt: rand(5) ? 0 : t, log: {}, lastPractice: null, lastExport: null };
        for (var i = 0; i < 5; i++) {
          var time = t + rand(5), id = 'random-' + i;
          switch (rand(5)) {
            case 0:
              var card = GT.fsrs.newCard(time); card.added = time;
              for (var j = 0, n = rand(6); j < n; j++) card = GT.fsrs.rate(card, 1 + rand(4), time += rand(4), 0.9);
              d.cards[id + '#rec'] = card; break;
            case 1: d.later[id] = time; break;
            case 2: d.deleted[id + '#rec'] = time; break;
            case 3: d.cards[id + '#rec'] = { state: 'known', known: time, last: time, added: time }; break;
          }
        }
        d.log['2026-11-25'] = { reviews: rand(20), learned: rand(10) };
        return d;
      }
      for (var i = 0; i < 2000; i++) {
        var a = randomProgress(), b = randomProgress(), ab = GT.store.mergeLangData(a, b, 'de');
        var reverse = GT.store.mergeLangData(b, a, 'de');
        var againA = GT.store.mergeLangData(ab, a, 'de'), againB = GT.store.mergeLangData(ab, b, 'de');
        if (canonical(ab) !== canonical(reverse) || canonical(ab) !== canonical(againA) || canonical(ab) !== canonical(againB)) return { failed: i, a, b, ab, reverse, againA, againB };
      }
      return { cases: 2000 };
    });
    assert.deepEqual(algebra, { cases: 2000 });
    results.push('2,000 deterministic random pairs with real FSRS cards pass commutativity and repeating either key.');

    // Real scheduler output + varied times rather than highly repetitive zero cards.
    const lengths = await a.evaluate(async () => {
      var out = {}, seed = 1977, t = 1795608034567;
      function rand(n) { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed % n; }
      for (var count of [100, 500, 1000]) {
        var d = { version: 2, language: 'de', created: t - 180 * 86400000, cards: {}, later: {}, deleted: {}, resetAt: 0, log: {}, lastPractice: t, lastExport: null };
        for (var i = 0; i < count; i++) {
          var id = GT.items[i % GT.items.length].id + (i % 2 ? '#prod' : '#rec');
          var time = d.created + rand(90 * 86400000), c = GT.fsrs.newCard(time); c.added = time;
          for (var j = 0, n = 1 + rand(12); j < n; j++) { time += rand(14 * 86400000); c = GT.fsrs.rate(c, 1 + rand(4), time, 0.9); }
          if (i % 9 === 0) c = { state: 'known', known: time, last: time, added: c.added };
          d.cards[id] = c;
          if (i % 12 === 0) d.later['waiting-' + i] = time;
          if (i % 30 === 0) d.deleted['deleted-' + i + '#rec'] = time;
        }
        for (var day = 1; day <= 28; day++) d.log['2026-10-' + String(day).padStart(2, '0')] = { reviews: rand(100), learned: rand(30) };
        var key = await GT.progressKey.encodeAll({ de: d }), decoded = await GT.progressKey.decode(key);
        if (GT.store.progressPrint({ de: d }) !== GT.store.progressPrint(decoded.progress)) throw new Error('Large round-trip failed');
        out[count] = { characters: key.length, cards: Object.keys(d.cards).length };
      }
      return out;
    });
    results.push('e) Key lengths with real FSRS output: ' + JSON.stringify(lengths));

    // File import uses the same merge and legacy v1 still migrates.
    await seed(a, da); await seed(b, da);
    await add(a, await b.evaluate(d => GT.progressKey.encode(d, 'de'), db));
    await b.evaluate(d => GT.store.importJSON(JSON.stringify({ app: 'etrnl', progress: { de: d } }), { keepSettings: true }), db);
    assert.deepEqual(await snapshot(a), await snapshot(b));
    const legacy = await a.evaluate(() => GT.store.mergeLangData({}, { version: 1, created: 1, cards: { legacy: { state: 'known', known: 10 } } }, 'de'));
    assert(legacy.cards['legacy#rec']); assert(legacy.cards['legacy#prod']);
    results.push('Key and JSON imports produce identical merges; old v1 file migration still works.');

    const unsupported = await a.evaluate(async () => {
      var original = window.CompressionStream;
      window.CompressionStream = undefined;
      try { await GT.store.generateProgressKey(); return ''; } catch (e) { return e.message; }
      finally { window.CompressionStream = original; }
    });
    assert.match(unsupported, /browser is too old/);
    const unsupportedFormat = await a.evaluate(async () => {
      var original = window.DecompressionStream;
      window.DecompressionStream = function () { throw new TypeError('Unsupported format'); };
      try { await GT.store.generateProgressKey(); return ''; } catch (e) { return e.message; }
      finally { window.DecompressionStream = original; }
    });
    assert.match(unsupportedFormat, /browser is too old/);
    const quota = await a.evaluate(async k => {
      var original = Storage.prototype.setItem, before = JSON.stringify(GT.store.data);
      Storage.prototype.setItem = function () { throw new DOMException('Full', 'QuotaExceededError'); };
      try { await GT.store.addProgressKey(k); return false; }
      catch (e) { return /Could not save/.test(e.message) && before === JSON.stringify(GT.store.data); }
      finally { Storage.prototype.setItem = original; }
    }, ka);
    assert(quota);
    results.push('Missing compression and full storage report clear errors; failed save leaves in-memory progress unchanged.');

    // Exercise the actual UI at 375px with long keys and expanded instructions.
    await a.setViewportSize({ width: 375, height: 812 });
    await a.reload(); await a.waitForSelector('[data-act="key-generate"]');
    await a.locator('[data-act="key-generate"]').click();
    await a.waitForSelector('#progressKeyOutput');
    await a.locator('.progress-key-help summary').click();
    assert.match(await a.locator('.progress-key-help li').first().innerText(), /^Keys add up\./);
    await a.locator('[data-act="key-open"]').click();
    await a.locator('#progressKeyInput').fill(splitKey);
    await a.locator('[data-act="key-add"]').click();
    await a.waitForFunction(() => /cards added/.test(document.querySelector('.progress-key-status').textContent));
    const status = await a.locator('.progress-key-status').innerText();
    assert.match(status, /^\+\d+ cards added, \d+ updated \(DE\)$/);
    const beforeUIError = await storage(a);
    await a.locator('#progressKeyInput').fill(corrupt);
    await a.locator('[data-act="key-add"]').click();
    await a.waitForFunction(() => document.querySelector('.progress-key-error'));
    assert.equal(await a.locator('.progress-key-error').innerText(), 'Key is damaged or incomplete — copy it again');
    assert.deepEqual(await storage(a), beforeUIError);
    await a.locator('[data-act="key-generate"]').click(); await a.waitForSelector('#progressKeyOutput');
    const layout = await a.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth,
      inputFont: getComputedStyle(document.querySelector('#progressKeyInput')).fontSize,
      outputFont: getComputedStyle(document.querySelector('#progressKeyOutput')).fontSize,
      readonly: document.querySelector('#progressKeyOutput').readOnly }));
    assert.equal(layout.viewport, 375); assert.equal(layout.page, 375);
    assert(parseFloat(layout.inputFont) >= 16 && parseFloat(layout.outputFont) >= 16 && layout.readonly);
    await a.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('Denied')) } });
      document.execCommand = () => false;
    });
    await a.locator('[data-act="key-copy"]').click();
    await a.waitForFunction(() => document.activeElement.id === 'progressKeyOutput');
    assert(await a.evaluate(() => { var t = document.querySelector('#progressKeyOutput'); return t.selectionStart === 0 && t.selectionEnd === t.value.length; }));
    await a.evaluate(() => { navigator.clipboard.writeText = value => { window.testClipboard = value; return Promise.resolve(); }; });
    await a.locator('[data-act="key-copy"]').click();
    assert(await a.evaluate(() => window.testClipboard === document.querySelector('#progressKeyOutput').value));
    const screenshot = process.env.PROGRESS_KEY_SCREENSHOT;
    if (screenshot) { await a.locator('#progressKeyBox').screenshot({ path: screenshot }); console.log('Screenshot: ' + screenshot); }
    results.push('375px UI: no horizontal overflow, 16px textareas, instructions, generate/add/error/count and denied-clipboard selection fallback all pass.');

    // A key generated before another session/reset must not be offered as current progress.
    await a.evaluate(() => { GT.store.markLater('new-session'); location.hash = '#/stats'; });
    await a.waitForFunction(() => location.hash === '#/stats' && !document.querySelector('#progressKeyBox'));
    await a.evaluate(() => { location.hash = '#/user'; }); await a.waitForSelector('#progressKeyBox');
    assert.equal(await a.locator('#progressKeyOutput').count(), 0);
    assert.equal(await a.locator('.progress-key-status').innerText(), 'Progress changed. Generate a fresh key.');
    await a.locator('[data-act="key-generate"]').click(); await a.waitForSelector('#progressKeyOutput');
    await a.evaluate(() => { GT.store.reset(); location.hash = '#/stats'; });
    await a.waitForFunction(() => !document.querySelector('#progressKeyBox'));
    await a.evaluate(() => { location.hash = '#/user'; }); await a.waitForSelector('#progressKeyBox');
    assert.equal(await a.locator('#progressKeyOutput').count(), 0);
    await a.locator('[data-act="key-generate"]').click(); await a.waitForSelector('#progressKeyOutput');
    const resetKeyData = await a.evaluate(() => GT.progressKey.decode(document.querySelector('#progressKeyOutput').value));
    assert(!resetKeyData.progress.de);
    results.push('Navigating back after learning or reset discards the old generated key; the fresh key omits the locally cleared language.');
    await a.evaluate(() => GT.store.markLater('changed-while-panel-open'));
    await a.locator('[data-act="key-copy"]').click();
    assert.equal(await a.locator('#progressKeyOutput').count(), 0);
    assert.equal(await a.locator('.progress-key-status').innerText(), 'Progress changed. Generate a fresh key.');

    // Exercise the retained JSON-file UI and legacy export name too.
    const downloadPromise = a.waitForEvent('download');
    await a.locator('[data-act="export"]').click();
    const download = await downloadPromise;
    assert.match(download.suggestedFilename(), /^etrnl-progress-\d{4}-\d{2}-\d{2}\.json$/);
    const exportStream = await download.createReadStream(), chunks = [];
    for await (const chunk of exportStream) chunks.push(chunk);
    const exportedFile = Buffer.concat(chunks), exported = JSON.parse(exportedFile);
    assert.equal(exported.app, 'etrnl'); assert(exported.progress.de && exported.progress.en && exported.progress.ru);
    await a.evaluate(() => GT.store.setItemKnown('local-since-file-export', GT.now()));
    await a.locator('#importFile').setInputFiles({ name: 'progress.json', mimeType: 'application/json', buffer: exportedFile });
    await a.waitForFunction(() => /merged/.test(document.querySelector('#toast').textContent));
    assert(await a.evaluate(() => !!GT.store.data.cards['local-since-file-export#rec']));
    assert.equal(await a.locator('#importReplaceFile').count(), 1);
    results.push('Existing file export/download and Import & merge work through the UI, retaining newer local cards and legacy export names.');

    // Full multi-language exchange uses independent storage and the same ids in different packs.
    const c = await device(fresh()), d = await device(fresh());
    const seedAll = (page, progress) => page.evaluate(progress => GT.store.importJSON(JSON.stringify({ app: 'etrnl', progress }), { replace: true, keepSettings: true }), progress);
    const allProgress = page => page.evaluate(() => JSON.parse(JSON.stringify(GT.store.buildKeyProgress())));
    const ma = {}, mb = {};
    for (const [index, lang] of ['de', 'en', 'ru'].entries()) {
      ma[lang] = sample(); ma[lang].language = lang;
      ma[lang].cards['same-id#rec'] = { state: 'review', s: index + 2, d: index + 4, due: T + (index + 1) * DAY, last: T + index, added: T - DAY, reps: 3, lapses: 1 };
      mb[lang] = JSON.parse(JSON.stringify(ma[lang]));
    }
    ma.de.cards['only-de-a#rec'] = { state: 'known', known: T + 1, last: T + 1, added: T + 1 };
    mb.de.cards['same-id#rec'].last = T + 10; mb.de.cards['same-id#rec'].s = 10;
    mb.ru.cards['only-ru-b#prod'] = { state: 'known', known: T + 2, last: T + 2, added: T + 2 };
    mb.en = fresh('en'); mb.en.resetAt = T + 100;
    await seedAll(c, ma);
    await c.evaluate(() => { GT.store.setSetting('theme', 'light'); GT.store.setSetting('speechRate', 0.75); });
    await d.evaluate(() => { GT.store.setSetting('theme', 'nord'); GT.store.setSetting('speechRate', 1); });
    const settingsFor = page => page.evaluate(() => JSON.stringify({ settings: GT.store.settings, clock: localStorage.getItem('etrnl.clock.v1'), theme: localStorage.getItem('gt.theme'), lang: GT.store.lang }));
    const settingsC = await settingsFor(c), settingsD = await settingsFor(d), ck = await key(c);
    assert.deepEqual(await c.evaluate(k => GT.progressKey.decode(k), ck), { progress: ma });
    assert.equal(await c.evaluate(progress => GT.progressKey.encodeAll({ ru: progress.ru, en: progress.en, de: progress.de }), ma), ck);
    const initialAdd = await add(d, ck);
    assert.deepEqual(initialAdd, { languages: ['de', 'en', 'ru'], added: Object.values(ma).reduce((n, p) => n + Object.keys(p.cards).length, 0), updated: 0 });
    assert.deepEqual(await allProgress(d), ma);
    await seedAll(d, mb);
    const dk = await key(d);
    assert(!(await d.evaluate(k => GT.progressKey.decode(k), dk)).progress.en);
    await add(c, dk); await add(d, ck);
    assert.deepEqual(await allProgress(c), await allProgress(d));
    const allMerged = await allProgress(c);
    assert.deepEqual(allMerged.en.cards, ma.en.cards);
    assert.equal(allMerged.en.resetAt, 0);
    assert.equal(await d.evaluate(() => GT.store.dataFor('en').resetAt), 0);
    assert(allMerged.de.cards['only-de-a#rec'] && allMerged.ru.cards['only-ru-b#prod']);
    assert.equal(allMerged.de.cards['same-id#rec'].s, 10);
    assert.equal(allMerged.ru.cards['same-id#rec'].s, 4);
    assert.equal(await settingsFor(c), settingsC); assert.equal(await settingsFor(d), settingsD);
    const onceAll = await storage(c);
    assert.deepEqual(await add(c, dk), { languages: ['de', 'ru'], added: 0, updated: 0 });
    assert.deepEqual(await storage(c), onceAll);
    const bundleKey = await key(c);
    await c.reload(); await c.waitForSelector('#progressKeyBox');
    assert.deepEqual(await allProgress(c), allMerged);
    results.push('All-language keys converge across two profiles; locally cleared EN is restored without erasing the other copy, ids stay in their language, repeats are no-ops, settings/clock stay local, and reload preserves all languages.');

    // A malformed final language cannot apply the earlier valid language.
    const malformedBundles = [
      bundlePayload([['de', payload], ['en', payload.subarray(0, -1)]]),
      bundlePayload([['de', payload], ['de', payload]]),
      bundlePayload([['en', payload], ['de', payload]]),
      bundlePayload([['d1', payload]]),
      Buffer.concat([bundlePayload([['de', payload]]), Buffer.from([0])])
    ];
    for (const bad of malformedBundles.map(bytes => envelope(2, 'all', bytes)).concat(bundleKey.slice(0, -8))) {
      const before = await storage(c);
      const message = await c.evaluate(async k => { try { await GT.store.addProgressKey(k); return ''; } catch (e) { return e.message; } }, bad);
      assert.equal(message, 'Key is damaged or incomplete — copy it again');
      assert.deepEqual(await storage(c), before);
    }
    const emptyKey = await c.evaluate(() => GT.progressKey.encodeAll({})), beforeEmpty = await storage(c);
    assert.deepEqual(await c.evaluate(k => GT.progressKey.decode(k), emptyKey), { progress: {} });
    assert.deepEqual(await add(c, emptyKey), { languages: [], added: 0, updated: 0 });
    assert.deepEqual(await storage(c), beforeEmpty);
    results.push('A damaged final language, duplicate/unsorted language codes and truncated bundle leave every language untouched; empty bundle is a no-op.');

    // Existing v1 single-language keys must still import and affect only that language.
    await seedAll(c, ma);
    const othersBeforeV1 = await c.evaluate(() => JSON.stringify([GT.store.dataFor('de'), GT.store.dataFor('ru')]));
    const v1Result = await add(c, fixture.key);
    assert.deepEqual(v1Result.languages, ['en']);
    assert(await c.evaluate(() => !!GT.store.dataFor('en').cards['future-drill']));
    assert.equal(await c.evaluate(() => JSON.stringify([GT.store.dataFor('de'), GT.store.dataFor('ru')])), othersBeforeV1);
    await seedAll(c, ma);
    const subsetKey = await c.evaluate(p => GT.progressKey.encodeAll({ de: p }), ma.de);
    const othersBeforeSubset = await c.evaluate(() => JSON.stringify([GT.store.dataFor('en'), GT.store.dataFor('ru')]));
    await add(c, subsetKey);
    assert.equal(await c.evaluate(() => JSON.stringify([GT.store.dataFor('en'), GT.store.dataFor('ru')])), othersBeforeSubset);
    const beforeQuotaAll = await storage(c), progressBeforeQuotaAll = await allProgress(c);
    const quotaAll = await c.evaluate(async key => {
      var original = Storage.prototype.setItem, failed = false;
      Storage.prototype.setItem = function (name, value) {
        if (name === 'etrnl.progress.ru.v1' && !failed) { failed = true; throw new DOMException('Full', 'QuotaExceededError'); }
        return original.call(this, name, value);
      };
      try { await GT.store.addProgressKey(key); return ''; }
      catch (e) { return e.message; }
      finally { Storage.prototype.setItem = original; }
    }, dk);
    assert.match(quotaAll, /Could not save progress/);
    assert.deepEqual(await storage(c), beforeQuotaAll); assert.deepEqual(await allProgress(c), progressBeforeQuotaAll);
    await add(c, dk);
    assert.deepEqual(await allProgress(c), allMerged);
    results.push('Legacy v1 import and bundles with omitted languages preserve other progress; failure writing the second language rolls back the first and leaves memory unchanged; retry succeeds.');

    // An inactive language is also part of the generated key's freshness check.
    await c.locator('[data-act="key-generate"]').click(); await c.waitForSelector('#progressKeyOutput');
    await c.evaluate(() => { GT.store.dataFor('ru').lastPractice = GT.now(); });
    await c.locator('[data-act="key-copy"]').click();
    assert.equal(await c.locator('#progressKeyOutput').count(), 0);
    await c.locator('[data-act="key-generate"]').click(); await c.waitForSelector('#progressKeyOutput');
    const shownKey = await c.locator('#progressKeyOutput').inputValue();
    await c.evaluate(() => GT.setLanguages('learn', 'en'));
    assert.equal(await c.locator('#progressKeyOutput').inputValue(), shownKey);
    await c.locator('[data-act="key-open"]').click(); await c.locator('#progressKeyInput').fill(bundleKey);
    await c.locator('[data-act="key-add"]').click();
    await c.waitForFunction(() => /\(DE, EN, RU\)/.test(document.querySelector('.progress-key-status').textContent));
    assert.equal(await c.evaluate(() => GT.store.lang), 'en');
    assert.equal(await c.locator('#progressKeyBox .tag').textContent(), 'All languages');
    results.push('The shared key survives language switches, detects changes in inactive languages, and UI import reports all affected languages without changing the active one.');

    for (const lang of ['en', 'ru', 'de']) {
      await a.evaluate(lang => GT.setLanguages('learn', lang), lang);
      await a.waitForSelector('[data-act="key-generate"]');
      await a.locator('[data-act="key-generate"]').click();
      await a.waitForFunction(() => !document.querySelector('[data-act="key-generate"]').disabled && document.querySelector('#progressKeyOutput')?.value.startsWith('RECGZ2-all-'));
      assert.equal(await a.evaluate(() => GT.store.lang), lang);
      assert.equal(await a.evaluate(() => document.documentElement.scrollWidth), 375);
    }
    results.push('All three real language packs load at 375px and generate the all-language key without mixing progress.');

    const beforeCancel = await storage(a); let resetPrompt = '';
    a.once('dialog', async dialog => { resetPrompt = dialog.message(); await dialog.dismiss(); });
    await a.locator('#progressKeyBox [data-act="reset-all"]').click();
    assert.match(resetPrompt, /^Reset all German progress on this device\?/);
    assert.match(resetPrompt, /restore this progress with a key saved before resetting/);
    assert.deepEqual(await storage(a), beforeCancel);
    const otherLanguages = await a.evaluate(() => JSON.stringify([GT.store.dataFor('en'), GT.store.dataFor('ru')]));
    const resetDialogs = [];
    const acceptReset = async dialog => { resetDialogs.push(dialog.message()); await dialog.accept(); };
    a.on('dialog', acceptReset);
    await a.locator('#progressKeyBox [data-act="reset-all"]').click();
    a.off('dialog', acceptReset);
    assert.equal(resetDialogs.length, 1);
    const resetProgress = await snapshot(a);
    assert.equal(resetProgress.resetAt, 0);
    for (const field of ['cards', 'later', 'deleted', 'log']) assert.deepEqual(resetProgress[field], {});
    assert.equal(await a.evaluate(() => JSON.stringify([GT.store.dataFor('en'), GT.store.dataFor('ru')])), otherLanguages);
    assert.equal(await a.locator('#progressKeyOutput').count(), 0);
    assert.equal(await a.locator('#progressKeyInput').inputValue(), '');
    await a.reload(); await a.waitForSelector('#progressKeyBox');
    assert.equal((await snapshot(a)).resetAt, resetProgress.resetAt);
    assert.equal(await a.evaluate(() => document.documentElement.scrollWidth), 375);
    results.push('Progress key is above file exchange, Reset all is last/rightmost; Cancel keeps storage unchanged, one confirmation resets only the current language and clears old key fields.');

    // PWA shell actually includes the codec and remains usable offline.
    if (!sandbox) {
    const offline = await device(sample(), { width: 1280, height: 900 }, 'allow');
    await offline.evaluate(async () => {
      await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller) await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }));
    });
    assert(await offline.evaluate(async name => { var cache = await caches.open(name); return !!(await cache.match('js/progress-key.js')); }, swCache));
    await offline.context().setOffline(true); await offline.reload();
    await offline.waitForSelector('[data-act="key-generate"]');
    assert.match(await key(offline), /^RECGZ2-all-/);
    results.push('Service worker ' + swCache + ' caches the codec; offline reload and key generation pass.');
    } else {
      assert(swSource.includes("'js/progress-key.js'"));
      results.push('Service worker: cache version/list checked statically; offline reload NOT tested in network-free sandbox.');
    }
    assert.deepEqual(errors, []);
    console.log(results.join('\n'));
    console.log('PASS — browser ' + browser.version());
  } finally { await browser.close(); }
}
main().catch(err => { console.error(err); process.exitCode = 1; }).finally(() => server.close());
