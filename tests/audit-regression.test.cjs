/* Run: node tests/audit-regression.test.cjs
 * Pure Node.js regression & security test suite (zero external dependencies).
 * Tests Progress Key codec/security/merge algebra, FSRS edge cases, Store persistence/rollback,
 * all 3 language packs (de/en/ru), WhichForm across all 6 language pairs, app.js adversarial routes
 * & Practice Studio modes, and Service Worker manifest completeness. */
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const zlib = require('node:zlib');

const root = path.resolve(__dirname, '..');
const T = 1795608034567;
const DAY = 86400000;
const unrealm = v => v === undefined ? undefined : JSON.parse(JSON.stringify(v));

function envelope(version, lang, payload) {
  const body = Buffer.concat([
    Buffer.from([version]),
    lang === 'all' ? Buffer.alloc(2) : Buffer.from(lang),
    zlib.deflateRawSync(payload)
  ]);
  let crc = 0xffffffff;
  for (const byte of body) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  const check = Buffer.alloc(4);
  check.writeUInt32LE((crc ^ 0xffffffff) >>> 0);
  return 'RECGZ' + version + '-' + lang + '-' + Buffer.concat([body, check]).toString('base64url');
}

function varuint(n) {
  const out = [];
  do {
    const b = n % 128;
    n = Math.floor(n / 128);
    out.push(b + (n ? 128 : 0));
  } while (n);
  return Buffer.from(out);
}

function makeMockStorage() {
  const map = Object.create(null);
  return {
    _map: map,
    get length() { return Object.keys(map).length; },
    key(i) { return Object.keys(map)[i] || null; },
    getItem(k) { return Object.prototype.hasOwnProperty.call(map, k) ? map[k] : null; },
    setItem(k, v) { map[k] = String(v); },
    removeItem(k) { delete map[k]; },
    clear() { Object.keys(map).forEach(k => delete map[k]); }
  };
}

function makeEl(tag, id, elements) {
  const classes = new Set();
  const attrs = Object.create(null);
  const el = {
    tagName: (tag || 'DIV').toUpperCase(),
    id: id || '',
    innerHTML: '',
    textContent: '',
    value: '',
    hidden: false,
    disabled: false,
    isConnected: true,
    dataset: {},
    style: { setProperty() {}, removeProperty() {} },
    classList: {
      add(...c) { c.forEach(x => classes.add(x)); },
      remove(...c) { c.forEach(x => classes.delete(x)); },
      toggle(x, f) { if (f === undefined) { if (classes.has(x)) classes.delete(x); else classes.add(x); } else if (f) classes.add(x); else classes.delete(x); },
      contains(x) { return classes.has(x); }
    },
    setAttribute(k, v) { attrs[k] = String(v); },
    getAttribute(k) { return k in attrs ? attrs[k] : null; },
    removeAttribute(k) { delete attrs[k]; },
    hasAttribute(k) { return k in attrs; },
    addEventListener() {},
    removeEventListener() {},
    appendChild(c) { return c; },
    insertAdjacentHTML() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    closest() { return null; },
    contains() { return false; },
    focus() {},
    blur() {},
    remove() {},
    getBoundingClientRect() { return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 }; }
  };
  if (id && elements) elements[id] = el;
  return el;
}

function createHarness(opts = {}) {
  const elements = Object.create(null);
  ['app', 'menuBtn', 'tabs', 'langBtn', 'langPair', 'langPop', 'userBtn', 'settingsBtn',
    'sidebar', 'sideToggle', 'scrim', 'main', 'bottomnav', 'toast'].forEach(id => makeEl('div', id, elements));
  const brand = makeEl('a');
  const logoLang = makeEl('span');
  const logoCode = makeEl('span');
  const docEl = makeEl('html');
  const bodyEl = makeEl('body');
  const headEl = makeEl('head');
  const winListeners = Object.create(null);
  const localStorage = opts.localStorage || makeMockStorage();

  const ctx = {
    console, setTimeout: () => 1, clearTimeout() {}, setInterval: () => 1, clearInterval() {},
    requestAnimationFrame: () => {},
    Date, Math, Object, Array, String, Number, Boolean, RegExp, Error, TypeError, RangeError,
    JSON, Promise, Map, Set, Uint8Array, DataView, Blob, TextEncoder, TextDecoder,
    CompressionStream, DecompressionStream,
    atob: globalThis.atob, btoa: globalThis.btoa,
    CSS: { escape: s => String(s) },
    localStorage,
    history: {
      state: null,
      replaceState(s, _t, u) {
        this.state = s;
        if (typeof u === 'string' && u.includes('#')) ctx.location.hash = u.slice(u.indexOf('#'));
      }
    },
    location: { protocol: 'http:', origin: 'http://localhost:8765', pathname: '/', search: '', hash: '#/start', replace(h) { this.hash = h; } },
    navigator: { clipboard: { writeText: () => Promise.resolve() } },
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    scrollTo() {},
    confirm: () => true,
    alert: () => {},
    addEventListener(ev, fn) { (winListeners[ev] || (winListeners[ev] = [])).push(fn); },
    removeEventListener() {},
    document: {
      documentElement: docEl, body: bodyEl, head: headEl, title: '', activeElement: null, visibilityState: 'visible',
      addEventListener(ev, fn) { (winListeners['doc:' + ev] || (winListeners['doc:' + ev] = [])).push(fn); },
      removeEventListener() {},
      createElement: tag => makeEl(tag),
      getElementById: id => elements[id] || null,
      querySelector(sel) {
        if (sel.startsWith('#')) return elements[sel.slice(1)] || null;
        if (sel === '.brand') return brand;
        if (sel === '.logo-lang') return logoLang;
        if (sel === '.logo-code') return logoCode;
        return null;
      },
      querySelectorAll() { return []; }
    },
    window: null, self: null, globalThis: null
  };
  ctx.window = ctx.self = ctx.globalThis = ctx;
  vm.createContext(ctx);

  const run = f => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
  const boot = [
    'js/core.js', 'js/i18n.js', 'js/topics.js', 'data/about.js', 'data/manifest.js',
    'data/links/cross.js', 'data/links/families.js', 'data/links/forms_cross.js',
    'js/loader.js', 'js/validate.js', 'js/fsrs.js', 'js/store.js',
    'js/progress-key.js', 'js/whichform.js', 'js/roulette.js', 'js/forms/de.js', 'js/forms/en.js', 'js/forms/ru.js'
  ];
  boot.forEach(run);

  if (opts.loadPacks) {
    const GT = ctx.GT;
    for (const lang of Object.keys(ctx.GT_PACKS)) {
      const pack = GT.packs[lang] || GT.definePack(lang, {});
      GT._target = pack;
      const p = ctx.GT_PACKS[lang];
      for (const f of p.files) run((p.dir || '') + f);
      GT._target = null;
      pack.loaded = true;
      GT.setupExpressions(pack);
      GT.setupGrammarLevels(pack);
      GT.validatePack(pack);
      (pack.config.afterLoad || []).forEach(fn => fn(pack));
    }
    GT.loadPack = lang => Promise.resolve(GT.packs[lang]);
  }
  if (opts.loadApp) run('js/app.js');

  return { ctx, GT: ctx.GT, elements, winListeners, localStorage, run };
}

function fresh(lang = 'de') {
  return { version: 2, language: lang, created: T - 100 * DAY, cards: {}, later: {}, deleted: {}, resetAt: 0, log: {}, lastPractice: null, lastExport: null };
}

async function testProgressKey() {
  const { GT } = createHarness();
  const DAMAGED = 'Key is damaged or incomplete — copy it again';

  // 1. Frozen v1 & v2 compatibility fixtures
  const f1 = require('./fixtures/progress-key-v1.json');
  const f2 = require('./fixtures/progress-key-v2.json');
  assert.deepEqual(unrealm(await GT.progressKey.decode(f1.key)), f1.data);
  assert.deepEqual(unrealm(await GT.progressKey.decode(f2.key)), f2.data);

  // 2. Version 0 rejected as DAMAGED (not "newer version")
  await assert.rejects(() => GT.progressKey.decode(envelope(0, 'all', Buffer.from([0]))), { message: DAMAGED });

  // 3. Future version still asks for site update
  const validBytes = Buffer.from(f1.key.slice('RECGZ1-en-'.length), 'base64url');
  const payload = zlib.inflateRawSync(validBytes.subarray(3, -4));
  await assert.rejects(() => GT.progressKey.decode(envelope(3, 'all', payload)), /newer version of RECGZ/);

  // 4. encode(null, 'de') rejects cleanly without TypeError
  await assert.rejects(() => GT.progressKey.encode(null, 'de'), { message: 'Unknown progress language.' });

  // 5. __proto__ in record extra JSON is rejected
  {
    const extra = Buffer.from('{"__proto__":{"polluted":true}}');
    const keyBytes = Buffer.from('a#rec');
    const p = Buffer.concat([
      varuint(0),
      varuint(3), varuint(2), varuint(0), varuint(0), varuint(0),
      varuint(1),
      varuint(0), varuint(keyBytes.length), keyBytes,
      varuint(0), varuint(extra.length), extra,
      varuint(0), varuint(0), varuint(0)
    ]);
    await assert.rejects(() => GT.progressKey.decode(envelope(1, 'de', p)), { message: DAMAGED });
  }

  // 6. __proto__ nested inside map tag=1 extra JSON is rejected
  {
    const keyBytes = Buffer.from('k1');
    const valJson = Buffer.from('{"nested":{"constructor":{"polluted":true}}}');
    const p = Buffer.concat([
      varuint(0),
      varuint(3), varuint(2), varuint(0), varuint(0), varuint(0),
      varuint(0),
      varuint(1), varuint(0), varuint(keyBytes.length), keyBytes, Buffer.from([1]), varuint(valJson.length), valJson,
      varuint(0), varuint(0)
    ]);
    await assert.rejects(() => GT.progressKey.decode(envelope(1, 'de', p)), { message: DAMAGED });
  }

  // 7. Quadratic prefix-compression memory bomb is rejected
  {
    const prefix = Buffer.alloc(50000, 97);
    const parts = [
      varuint(0),
      varuint(3), varuint(2), varuint(0), varuint(0), varuint(0),
      varuint(0),
      varuint(500)
    ];
    for (let i = 0; i < 500; i++) {
      const suf = Buffer.from(String(i).padStart(4, '0'));
      if (i === 0) parts.push(varuint(0), varuint(prefix.length + suf.length), prefix, suf);
      else parts.push(varuint(prefix.length), varuint(suf.length), suf);
      parts.push(Buffer.from([0]), varuint(0), varuint(0));
    }
    parts.push(varuint(0), varuint(0));
    await assert.rejects(() => GT.progressKey.decode(envelope(1, 'de', Buffer.concat(parts))), { message: DAMAGED });
  }

  // 8. Round-trip + opaque keys (toString, hasOwnProperty) + 2,000-pair commutativity/idempotence
  const d = fresh();
  d.cards['w1#rec'] = { state: 'review', s: 3.173, d: 7.1949, due: T + DAY, last: T, added: T - DAY, reps: 4, lapses: 1 };
  d.later.toString = T + 1;
  d.deleted.hasOwnProperty = T + 2;
  d.log['2026-11-26'] = { reviews: 12, learned: 4 };
  const k = await GT.progressKey.encodeAll({ de: d });
  assert.deepEqual(unrealm(await GT.progressKey.decode(k)), { progress: { de: d } });

  let seed = 74649;
  const rand = n => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed % n; };
  const canonical = v => {
    if (v === null || typeof v !== 'object') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(canonical).join(',') + ']';
    return '{' + Object.keys(v).sort().map(key => JSON.stringify(key) + ':' + canonical(v[key])).join(',') + '}';
  };
  for (let i = 0; i < 2000; i++) {
    const mk = () => {
      const p = fresh();
      p.resetAt = rand(5) ? 0 : T;
      for (let j = 0; j < 5; j++) {
        let time = T + rand(5);
        const id = 'random-' + j;
        switch (rand(5)) {
          case 0: {
            let card = GT.fsrs.newCard(time);
            card.added = time;
            for (let r = 0, n = rand(6); r < n; r++) card = GT.fsrs.rate(card, 1 + rand(4), time += rand(4), 0.9);
            p.cards[id + '#rec'] = card;
            break;
          }
          case 1: p.later[id] = time; break;
          case 2: p.deleted[id + '#rec'] = time; break;
          case 3: p.cards[id + '#rec'] = { state: 'known', known: time, last: time, added: time }; break;
        }
      }
      p.log['2026-11-25'] = { reviews: rand(20), learned: rand(10) };
      return p;
    };
    const a = mk(), b = mk();
    const ab = GT.store.mergeLangData(a, b, 'de');
    const ba = GT.store.mergeLangData(b, a, 'de');
    assert.equal(canonical(ab), canonical(ba));
    assert.equal(canonical(ab), canonical(GT.store.mergeLangData(ab, a, 'de')));
    assert.equal(canonical(ab), canonical(GT.store.mergeLangData(ab, b, 'de')));
  }
}

function testFSRS() {
  const { GT } = createHarness();
  for (const badCard of [
    { state: 'review', s: 0, d: 5, last: 1000, due: 1000, reps: 1, lapses: 0 },
    { state: 'review', s: -1, d: 0, last: 1000, due: 1000, reps: 1, lapses: 0 },
    { state: 'review', s: NaN, d: Infinity, last: NaN, due: 1000, reps: -5, lapses: NaN },
    { state: 'known', known: T, last: T, added: T }
  ]) {
    for (const g of [1, 2, 3, 4]) {
      const out = GT.fsrs.rate(badCard, g, T, NaN);
      assert(Number.isFinite(out.s) && out.s > 0, 'FSRS s must stay finite > 0');
      assert(Number.isFinite(out.d) && out.d >= 1 && out.d <= 10, 'FSRS d must stay in [1,10]');
      assert(Number.isFinite(out.due) && out.due > T, 'FSRS due must stay finite');
      assert(Number.isInteger(out.reps) && out.reps >= 1);
      assert(Number.isInteger(out.lapses) && out.lapses >= 0);
      assert.equal(out.known, undefined);
    }
  }
}

function testStore() {
  // 1. Tombstone clearing on re-learn / re-know / markLater
  {
    const { GT } = createHarness();
    const S = GT.store;
    const t = GT.now();
    S.setItemKnown('w1', t);
    S.removeItem('w1');
    S.setItemKnown('w1', t);
    assert(S.data.cards['w1#rec'] && S.data.cards['w1#prod']);
    assert(!S.data.deleted['w1#rec'] && !S.data.deleted['w1#prod']);
    let merged = S.mergeLangData(S.data, S.data, 'de');
    assert(merged.cards['w1#rec'] && merged.cards['w1#prod']);

    S.removeItem('w1');
    S.addItemToReview('w1', t, ['rec']);
    assert(S.data.cards['w1#rec'] && !S.data.deleted['w1#rec']);
    merged = S.mergeLangData(S.data, S.data, 'de');
    assert(merged.cards['w1#rec']);

    S.removeItem('w1');
    S.markLater('w1');
    merged = S.mergeLangData(S.data, S.data, 'de');
    assert(merged.later.w1 > 0);
  }

  // 2. Malformed JSON import & array cards rejected cleanly
  {
    const { GT } = createHarness();
    const S = GT.store;
    assert.throws(() => S.importJSON(JSON.stringify({ app: 'etrnl', progress: { de: { version: 2, cards: [1, 2, 3] } } })));
    S.importJSON(JSON.stringify({
      app: 'etrnl',
      progress: { de: { version: 2, cards: { 'x#rec': null, 'y#rec': 'str' }, later: { z: 'bad' }, log: { '2026-11-26': 'bad' } } }
    }));
    assert.deepEqual(unrealm(S.data.cards), {});
    assert.deepEqual(unrealm(S.data.later), {});
    assert.equal(S.data.log['2026-11-26'], undefined);
  }

  // 3. Corrupt localStorage key does not poison storageOk
  {
    const storage = makeMockStorage();
    storage.setItem('etrnl.progress.en.v1', '{corrupt json');
    const { GT } = createHarness({ localStorage: storage });
    GT.store.dataFor('en');
    assert.equal(GT.store.storageOk(), true);
  }

  // 4. Persisted unknown future language (fr) survives reload in knownLangs()
  {
    const storage = makeMockStorage();
    const frData = fresh('fr');
    frData.cards['bonjour#rec'] = { state: 'known', known: T, last: T, added: T };
    storage.setItem('etrnl.progress.fr.v1', JSON.stringify(frData));
    const { GT } = createHarness({ localStorage: storage });
    assert(GT.store.buildKeyProgress().fr);
    assert(GT.store.buildPayload(false).progress.fr);
    GT.store.resetAll();
    assert.deepEqual(unrealm(GT.store.dataFor('fr').cards), {});
  }

  // 5. importJSON rolls back all languages on QuotaExceededError
  {
    const storage = makeMockStorage();
    const { GT } = createHarness({ localStorage: storage });
    const S = GT.store;
    const origDe = fresh('de');
    origDe.cards['keep#rec'] = { state: 'known', known: T, last: T, added: T };
    S.importJSON(JSON.stringify({ app: 'etrnl', progress: { de: origDe } }), { replace: true, keepSettings: true });
    const beforeStorage = Object.assign({}, storage._map);

    const origSet = storage.setItem.bind(storage);
    let fail = false;
    storage.setItem = (k, v) => {
      if (k === 'etrnl.progress.ru.v1' && !fail) {
        fail = true;
        throw new Error('QuotaExceededError');
      }
      return origSet(k, v);
    };
    const incDe = fresh('de'); incDe.cards['new#rec'] = { state: 'known', known: T + 1, last: T + 1, added: T + 1 };
    const incRu = fresh('ru'); incRu.cards['ru#rec'] = { state: 'known', known: T + 1, last: T + 1, added: T + 1 };
    assert.throws(() => S.importJSON(JSON.stringify({ app: 'etrnl', progress: { de: incDe, ru: incRu } }), { keepSettings: true }), /Could not save progress/);
    assert.deepEqual(unrealm(storage._map), beforeStorage);
    assert(!S.dataFor('de').cards['new#rec']);
  }
}

function testPacksAndWhichForm() {
  const { ctx, GT } = createHarness({ loadPacks: true });
  for (const lang of ['de', 'en', 'ru']) {
    const p = GT.packs[lang];
    assert.deepEqual(unrealm(p.loadErrors), [], lang + ' loadErrors');
    assert.deepEqual(unrealm(p.duplicates), [], lang + ' duplicates');
    assert.deepEqual(unrealm(p.missingOverlay || []), [], lang + ' missingOverlay');
    assert.deepEqual(unrealm(p.validation || []), [], lang + ' validation');
  }
  assert.deepEqual(unrealm(GT.whichForm.check()), []);
  if (ctx.ETEnglish) assert.deepEqual(unrealm(ctx.ETEnglish.errors), []);

  // Cross-language links
  (GT.links || []).forEach((g, idx) => {
    assert(g.langs && g.langs.length >= 2, 'link #' + idx);
    g.langs.forEach(l => {
      const e = g.entries[l], pk = GT.packs[l];
      assert(pk && pk.byId[e.id] && pk.byId[e.id].type !== 'drill', 'link #' + idx + ' ' + l);
    });
  });

  // WhichForm across all 6 language pairs
  const api = { page() {}, esc: s => String(s == null ? '' : s), crumbs: s => s, setKeys() {} };
  for (const learn of ['de', 'en', 'ru']) {
    for (const know of ['ru', 'en', 'de']) {
      if (learn === know) continue;
      GT.setActive(learn);
      GT.know = know;
      const d = GT.whichForm.active();
      const ref = d.reference(api);
      assert(!/\bundefined\b/.test(ref), `ref undefined ${know}->${learn}`);
      const cases = GT.FORMS_CROSS.casesPage(api);
      assert(!/\bundefined\b/.test(cases), `cases undefined ${know}->${learn}`);
      const modes = typeof d.modes === 'function' ? d.modes() : d.modes;
      for (const m of modes) {
        const gm = d.games[m.game];
        const items = gm.items().filter(it => !gm.match || gm.match(it, m.id));
        assert(items.length > 0, `empty mode ${know}->${learn} ${m.id}`);
        for (const raw of items) {
          const t = gm.task(raw);
          const ans = gm.answer(t);
          const opts = gm.options(t);
          assert(opts.includes(ans), `ans missing from opts ${know}->${learn} ${m.id}`);
          gm.question(t, { revealed: false, hint: 1, ans, esc: api.esc, blank: '___' });
          gm.hint(t, 1, api.esc);
          gm.hint(t, 2, api.esc);
          gm.explain(t, opts.find(o => o !== ans));
          if (gm.forms) gm.forms.html(t, api.esc);
        }
      }
    }
  }
}

async function testAppAndSW() {
  const { ctx, GT, elements, winListeners } = createHarness({ loadPacks: true, loadApp: true });
  await new Promise(r => setImmediate(r));
  const triggerHash = h => {
    ctx.location.hash = h;
    (winListeners.hashchange || []).forEach(fn => fn());
  };

  // Adversarial routes: no crashes, no raw HTML injection
  const xssHash = '#/roots/drill/%22%3E%3Cimg%20src=x%20onerror=alert(1)%3E';
  for (const h of [
    '#/item/toString', '#/item/__proto__', '#/item/nonexistent',
    '#/roots/toString', '#/roots/p-toString', '#/roots/s-toString', '#/roots/c-toString',
    xssHash, '#/practice?kind=toString&scope=root:toString', '#/practice?level=constructor',
    '#/review/toString', '#/grammar/toString', '#/words/toString'
  ]) {
    triggerHash(h);
    assert(!elements.main.innerHTML.includes('<img src=x onerror'), 'XSS payload leaked in ' + h);
  }

  // Verify Practice Studio modes across all 3 languages
  const modes = ['mixed', 'cloze', 'translation', 'recognition', 'derivative', 'builder', 'duel', 'family', 'match', 'odd', 'blitz', 'gender', 'affix', 'grammar'];
  const submitFns = winListeners['doc:submit'] || [];
  for (const lang of ['de', 'en', 'ru']) {
    await GT.setLanguages('learn', lang);
    for (const kind of modes) {
      const fakeForm = {
        dataset: { act: 'studio-start' },
        elements: {
          kind: { value: kind }, level: { value: 'all' }, section: { value: 'all' },
          topic: { value: '', disabled: true }, limit: { value: '12' }, studied: { checked: false }
        }
      };
      submitFns.forEach(fn => fn({ target: fakeForm, preventDefault() {} }));
      const st = GT.studioState();
      if (lang === 'en' && kind === 'gender') continue;
      assert(st && st.questions.length > 0, `empty studio ${lang} ${kind}`);
    }
  }

  // Root roulette renders build & same modes (translation + base root -> prefix/particle options) across all 3 languages without touching Review store
  const clickFns = winListeners['doc:click'] || [];
  for (const lang of ['de', 'en', 'ru']) {
    await GT.setLanguages('learn', lang);
    const knowLang = lang === 'ru' ? 'en' : 'ru';
    await GT.setLanguages('know', knowLang);
    const beforeCards = JSON.stringify(GT.store.data.cards);
    triggerHash('#/roots/roulette');
    const st = GT.roulette.state();
    assert.equal(st.mode, 'build', `roulette default mode not build in ${lang}`);
    assert(elements.main.innerHTML.includes('id="rrGame"'), `roulette missing in ${lang}`);
    assert(elements.main.innerHTML.includes('class="drill ag-card"'), `roulette card missing in ${lang}`);
    assert(elements.main.innerHTML.includes('class="rr-prompt-mean"'), `roulette translation prompt missing in ${lang}`);
    assert(elements.main.innerHTML.includes('class="rr-base"'), `roulette base root missing in ${lang}`);
    assert(elements.main.innerHTML.includes('rr-opts-pfx'), `roulette prefix options missing in ${lang}`);
    assert(!elements.main.innerHTML.includes('class="rr-base-gl"'), `roulette spoiled base gloss before reveal in ${lang}`);
    assert(elements.main.innerHTML.includes('1–6 · H hint'), `roulette 6-option key hint missing in ${lang}`);
    assert(!elements.main.innerHTML.includes('rr-opts-mean'), `roulette old meaning options still rendered in ${lang}`);
    assert(!elements.main.innerHTML.includes('Guess the meaning'), `roulette old mode tab still rendered in ${lang}`);
    assert(elements.main.innerHTML.includes(`lang="${knowLang}"`), `roulette translation missing known lang ${knowLang} for ${lang}`);
    assert.equal(st.cur.optPfx.length, 6, `roulette expected 6 options in ${lang}`);
    assert.equal(new Set(st.cur.optPfx.map(s => s.toLowerCase())).size, 6, `roulette options not distinct in ${lang}`);
    assert.equal(st.cur.optPfx[5], '—', `roulette missing dash option in slot 6 for ${lang}`);
    assert(st.cur.optPfx.includes(st.cur.pfxDisplay), `roulette answer missing from options in ${lang}`);
    elements.rrGame = { innerHTML: '' };
    try {
      const modeBtn = { dataset: { rr: 'mode', v: 'same' } };
      clickFns.forEach(fn => fn({ target: { closest: s => (s === '[data-rr]' ? modeBtn : null) }, preventDefault() {} }));
      const sameSt = GT.roulette.state();
      assert.equal(sameSt.mode, 'same', `roulette failed to switch to same mode in ${lang}`);
      assert.equal(sameSt.cur.optPfx.length, 6, `same mode expected 6 options in ${lang}`);
      assert.equal(sameSt.cur.optPfx[5], '—', `same mode missing dash option in ${lang}`);
      assert(elements.rrGame.innerHTML.includes('class="rr-prompt-mean"'), `same mode missing translation prompt in ${lang}`);
      assert(elements.rrGame.innerHTML.includes('rr-opts-pfx'), `same mode missing prefix options in ${lang}`);
      assert(elements.rrGame.innerHTML.includes('Switch root'), `same mode missing Switch root button in ${lang}`);
      assert(!elements.rrGame.innerHTML.includes('class="rr-base-gl"'), `same mode spoiled base gloss before reveal in ${lang}`);
      assert(!elements.rrGame.innerHTML.includes('rr-opts-mean'), `same mode rendered old meaning options in ${lang}`);
      const optBtn = { dataset: { rr: 'opt', v: sameSt.cur.pfxDisplay } };
      clickFns.forEach(fn => fn({ target: { closest: s => (s === '[data-rr]' ? optBtn : null) }, preventDefault() {} }));
      assert(elements.rrGame.innerHTML.includes('class="drill-answer"'), `roulette failed to reveal answer in ${lang}`);
      const backBtn = { dataset: { rr: 'mode', v: 'build' } };
      clickFns.forEach(fn => fn({ target: { closest: s => (s === '[data-rr]' ? backBtn : null) }, preventDefault() {} }));
    } finally {
      delete elements.rrGame;
    }
    assert.equal(JSON.stringify(GT.store.data.cards), beforeCards, `roulette mutated store in ${lang}`);
    triggerHash('#/practice');
    assert(elements.main.innerHTML.includes('Root roulette'), `practice Games missing Root roulette in ${lang}`);
    assert(!elements.main.innerHTML.includes('guess the meaning or build the word'), `practice card still has old roulette desc in ${lang}`);
  }

  // Feature flag OFF hides Root roulette entry points and redirects #/roots/roulette -> #/roots
  await GT.setLanguages('learn', 'de');
  GT.pack.config.features.rootRoulette = false;
  try {
    triggerHash('#/roots');
    assert(!elements.main.innerHTML.includes('Play Root roulette'), 'roots button shown when flag off');
    assert(!elements.sidebar.innerHTML.includes('#/roots/roulette'), 'sidebar link shown when flag off');
    triggerHash('#/practice');
    assert(!elements.main.innerHTML.includes('#/roots/roulette'), 'practice card shown when flag off');
    triggerHash('#/roots/roulette');
    assert.equal(ctx.location.hash, '#/roots', 'disabled roulette did not redirect to #/roots');
  } finally {
    GT.pack.config.features.rootRoulette = true;
  }

  // Review landing respects filter for "next card"
  await GT.setLanguages('learn', 'de');
  const deWords = GT.items.find(x => x.tab === 'words');
  const deIt = GT.items.find(x => x.tab === 'it');
  const futureCard = { state: 'review', s: 5, d: 5, due: Date.now() + 5 * DAY, last: Date.now(), added: Date.now(), reps: 1, lapses: 0 };
  GT.store.setCard(deWords.id + '#rec', futureCard);
  triggerHash('#/review/it.' + deIt.topic);
  assert(elements.main.innerHTML.includes('No cards in this filter yet'), 'Review next card leaked from another filter');

  // Service worker SHELL completeness
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scriptTags = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m => m[1]);
  const swCtx = { self: null, importScripts(f) { vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), swCtx); }, addEventListener() {} };
  swCtx.self = swCtx;
  vm.createContext(swCtx);
  vm.runInContext(sw, swCtx);
  for (const u of swCtx.SHELL) {
    if (u !== './') assert(fs.existsSync(path.join(root, u)), 'Missing SW shell file on disk: ' + u);
  }
  for (const s of scriptTags) assert(swCtx.SHELL.includes(s), 'index.html script missing from SW SHELL: ' + s);
}

(async () => {
  await testProgressKey();
  testFSRS();
  testStore();
  testPacksAndWhichForm();
  await testAppAndSW();
  console.log('PASS — audit-regression suite (Progress Key, FSRS, Store, 3 Packs, WhichForm, App, SW)');
})();
