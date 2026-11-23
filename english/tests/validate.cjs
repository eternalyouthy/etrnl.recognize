/* Run with: node --test english/tests/validate.cjs. No dependencies. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const scripts = ['js/catalog.js', 'data/families-01.js', 'data/families-02.js', 'data/curriculum.js', 'data/grammar-expanded.js', 'data/reference.js', 'data/evidence.js', 'data/dictionary-lookups.js', 'data/oxford-ratings.js', 'data/reviewed-content.js', 'data/additional-senses.js', 'data/topics-vocabulary.js', 'data/topics-chunks.js', 'data/topics.js', 'data/expressions-professional.js', 'data/content-expansion-01.js', 'data/families-grammar-03.js', 'js/learning.js'];
function create(options = {}) {
  const disk = new Map(), writes = [];
  const context = vm.createContext({ localStorage: { getItem: key => { if (options.storageFails) throw Error('Storage disabled'); return disk.get(key) || null; }, setItem: (key, value) => { if (options.storageFails) throw Error('Quota exceeded'); disk.set(key, value); writes.push(key); } } });
  for (const script of scripts.filter(s => !options.skipExpansion || !['data/content-expansion-01.js', 'data/families-grammar-03.js'].includes(s))) vm.runInContext(fs.readFileSync(path.join(root, script), 'utf8'), context, { filename: script });
  return { E: context.ETEnglish, context, disk, writes };
}
test('Independent scripts compile and all static references exist', () => {
  const html = fs.readFileSync(path.join(root, 'standalone.html'), 'utf8');
  const loaded = [...html.matchAll(/<script defer src="([^"]+)"/g)].map(m => m[1]);
  assert.deepEqual(loaded.slice(0, -1), scripts);
  for (const file of loaded) new vm.Script(fs.readFileSync(path.join(root, file), 'utf8'), { filename: file });
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    if (!/^(?:https?:|data:)/.test(match[1])) assert.ok(fs.existsSync(path.join(root, match[1])), match[1]);
  }
  assert.ok(!loaded.some(file => file.includes('..')));
});
test('Milestone batches, references, meanings, examples and stable IDs are internally consistent', () => {
  const { E } = create();
  assert.deepEqual(Array.from(E.validate()), []);
  assert.equal(E.families.length, 45);
  assert.equal(E.batches.length, 3);
  assert.deepEqual(Array.from(E.batches, b => b.families), [20, 20, 5]);
  for (const kind of ['prefix', 'suffix']) assert.ok(E.affixes.filter(a => a.kind === kind).length >= 15 && E.affixes.filter(a => a.kind === kind).length <= 20);
  assert.ok(E.classical.length >= 9);
  assert.equal(E.categories.length, 6);
  for (const c of E.categories) assert.ok(E.categoryEntries(c.id).length >= 15, c.id);
  assert.equal(E.grammar.length, 30);
  for (const w of Object.values(E.entries)) {
    assert.equal(w.id, E.id(w.headword, w.pos, w.sense));
    assert.match(w.ru, /[а-яё]/i);
    assert.match(w.examples[0].ru, /[а-яё]/i);
    assert.equal(E.answers(w.examples[0].en).length, 1);
    if (w.morphology.parentId) {
      const visited = new Set([w.id]); let p = E.entries[w.morphology.parentId];
      while (p) { assert.ok(!visited.has(p.id), 'Family graph cycle: ' + w.id); visited.add(p.id); p = E.entries[p.morphology.parentId]; }
    }
  }
});
test('CEFR distinguishes sense evidence, word/POS ratings, unrated entries and source disagreement', () => {
  const { E } = create();
  assert.equal(E.entries[E.id('connection', 'n')].cefr.level, 'B1');
  assert.equal(E.entries[E.id('connection', 'n', 'relation')].cefr.level, 'B2');
  assert.equal(E.entries[E.id('perform', 'v')].cefr.level, 'B2');
  assert.equal(E.entries[E.id('perform', 'v', 'stage')].cefr.level, 'B1');
  assert.equal(E.entries[E.id('form', 'v')].cefr.level, 'B2');
  assert.equal(E.entries[E.id('form', 'n', 'document')].cefr.level, 'A2');
  assert.equal(E.entries[E.id('apply', 'v', 'relevance')].cefr.level, 'B2');
  assert.equal(E.entries[E.id('comfort', 'v', 'verb')].cefr.level, 'C2');
  assert.ok(Object.values(E.entries).some(w => w.cefr.status === 'unrated'));
  assert.equal(Object.values(E.entries).some(w => w.cefr.status === 'estimate'), false);
  assert.equal(E.entries[E.id('interaction', 'n')].cefr.level, 'C1');
  assert.ok(E.entries[E.id('interaction', 'n')].cefr.ratings.some(r => r.provider === 'Oxford' && r.level === 'B2' && r.scope === 'lexeme-pos'));
  assert.equal(E.entries[E.id('interaction', 'n')].cefr.conflict, true);
  for (const w of Object.values(E.entries).filter(w => w.cefr.status === 'unrated')) assert.equal(w.cefr.level, null);
  for (const w of Object.values(E.entries).filter(w => w.cefr.status === 'referenced')) assert.ok(w.cefr.source.evidence && w.cefr.source.url.startsWith('https://'));
});
test('Morphological segmentation reconstructs spelling and keeps lexical alternation separate', () => {
  const { E } = create(), norm = s => s.replace(/[-\s]/g, '').toLowerCase();
  for (const w of Object.values(E.entries)) assert.equal(norm(w.morphology.parts.join('')), norm(w.headword), w.id);
  assert.deepEqual(Array.from(E.entries[E.id('response', 'n')].morphology.parts), ['response']);
  assert.deepEqual(Array.from(E.entries[E.id('responsibility', 'n')].morphology.parts), ['responsibil-', '-ity']);
  assert.equal(E.entries[E.id('explained', 'adj')].entryKind, 'inflected-form');
});
test('Every vocabulary question has a valid exact contextual answer and Russian explanation', () => {
  const { E } = create();
  for (const w of Object.values(E.entries)) {
    for (const kind of ['recognition', 'translation', 'derivative', 'cloze']) {
      const q = E.question(w, kind);
      assert.ok(E.checkAnswer(q, q.answer), w.id);
      assert.match(q.explain, /[а-яё]/i);
      if (q.options) { assert.equal(new Set(q.options).size, q.options.length); assert.equal(q.options.filter(o => E.checkAnswer(q, o)).length, 1); }
      else { assert.ok(!q.context.includes('[[')); assert.ok(q.context.includes('________')); }
    }
  }
  const prepared = E.question(E.entries[E.id('prepared', 'adj')], 'cloze');
  assert.ok(E.checkAnswer(prepared, 'prepared'));
  assert.ok(!E.checkAnswer(prepared, 'prepare'));
  assert.ok(E.checkAnswer(E.question(E.entries[E.id('organization', 'n')], 'translation'), 'organisation'));
});
test('All affix and grammar questions are answerable and explain the correct choice', () => {
  const { E } = create();
  for (const item of E.affixes.concat(E.grammar)) {
    const q = E.referenceQuestion(item);
    assert.equal(q.direction, 'rec'); assert.ok(q.options.includes(q.answer)); assert.match(q.explain, /[а-яё]/i);
  }
  for (const g of E.grammar) {
    const q = E.referenceQuestion(g, 'prod');
    assert.equal(q.direction, 'prod'); assert.equal(q.options, null);
    assert.equal(q.cardKey, g.id + '#prod'); assert.ok(E.checkAnswer(q, q.answer));
    assert.match(q.explain, /[а-яё]/i);
    assert.equal(g.levelScope, 'editorial-study-target');
  }
});
test('Recognition and production persist independently; checking alone never schedules a card', () => {
  const { E, writes } = create();
  const id = E.id('connection', 'n');
  const q = E.question(E.entries[id], 'recognition'); E.checkAnswer(q, q.answer);
  assert.equal(Object.keys(E.store.data.cards).length, 0);
  E.store.enroll(id); assert.equal(E.store.stats().rec, 1); assert.equal(E.store.stats().prod, 1);
  const production = JSON.stringify(E.store.data.cards[id + '#prod']);
  E.store.grade(id + '#rec', 3);
  assert.equal(JSON.stringify(E.store.data.cards[id + '#prod']), production);
  assert.equal(E.store.data.cards[id + '#rec'].reps, 1);
  assert.ok(writes.every(key => key === 'etrnl.english.progress.v1'));
  assert.equal(E.store.stats().dueProd, 1);
  assert.equal(E.store.stats().dueRec, 0);
});
test('Due queues include enrolled affixes and grammar; default study excludes known C1/C2 extensions', () => {
  const { E } = create();
  const a = E.affixes[0], g = E.grammar[0], w = E.entries[E.id('connection', 'n')];
  E.store.enroll(a.id); E.store.enroll(g.id); E.store.enroll(w.id);
  const due = E.makePool({ dueOnly: true, limit: 50 });
  assert.equal(due.length, 5);
  assert.ok(due.some(q => q.id === a.id)); assert.ok(due.some(q => q.id === g.id));
  const prod = E.makePool({ dueOnly: true, direction: 'prod', limit: 50 });
  assert.equal(prod.length, 2); assert.ok(prod.some(q => q.entryId === w.id)); assert.ok(prod.some(q => q.id === g.id));
  for (let i = 0; i < 15; i++) for (const q of E.makePool({ limit: 50 })) assert.ok(!['C1', 'C2'].includes(E.entries[q.entryId].cefr.level));
  assert.equal(E.makePool({ family: 'act', kind: 'derivative', limit: 50 }).some(q => !E.entries[q.entryId].morphology.parentId), false);
});
test('Export/import round-trip is language-scoped, rejects corrupt data atomically and ignores extra fields', () => {
  const { E } = create(), id = E.id('employee', 'n');
  E.store.grade(id + '#prod', 4); const before = E.store.export();
  const other = create(); other.E.store.import(before); assert.deepEqual(JSON.parse(other.E.store.export()), JSON.parse(before));
  for (const bad of [ '{}', '{', JSON.stringify({ ...JSON.parse(before), language: 'de' }), JSON.stringify({ ...JSON.parse(before), cards: { 'gt:german#rec': { due: 1 } } }), JSON.stringify({ ...JSON.parse(before), cards: { [id + '#prod']: { due: -1 } } }), 'x'.repeat(2000001) ]) {
    assert.throws(() => E.store.import(bad)); assert.equal(E.store.export(), before);
  }
  const extended = JSON.parse(before); extended.injected = '<script>'; extended.cards[id + '#prod'].html = '<img onerror=alert(1)>';
  E.store.import(JSON.stringify(extended)); assert.deepEqual(JSON.parse(E.store.export()), JSON.parse(before));
});
test('Storage errors preserve an in-memory session and export remains available', () => {
  const { E } = create({ storageFails: true });
  E.store.grade(E.id('employee', 'n') + '#rec', 1);
  assert.equal(E.store.persistent, false); assert.ok(E.store.warning); assert.equal(JSON.parse(E.store.export()).completed, 1);
});
test('German-equivalent English sections are populated and preserve the original categories and tools', () => {
  const { E } = create();
  assert.deepEqual(Array.from(E.sections, s => [s.id, s.topics.length]), [['words', 18], ['it', 4], ['chunks', 13], ['professional', 5], ['idioms', 3], ['everyday-phrases', 2]]);
  assert.equal(E.categories.length, 6); assert.equal(E.families.length, 45); assert.equal(E.grammar.length, 30);
  for (const section of E.sections) for (const t of section.topics) {
    assert.ok(t.entryIds.length >= 4, t.key);
    assert.ok(E.topicEntries(t.key).filter(E.isCoreLevel).length >= 4, t.key);
    assert.equal(new Set(t.entryIds).size, t.entryIds.length);
    assert.match(t.description, /[а-яё]/i); assert.match(t.scenario, /[а-яё]/i);
    assert.ok(E.speakingPrompt(t.key).includes(t.scenario));
  }
  assert.equal(E.entries[E.id('deposit', 'n', 'rent')].cefr.level, null);
  assert.equal(E.entries[E.id('permit', 'n')].cefr.level, 'C1');
  assert.equal(E.entries[E.id('release', 'n', 'software')].cefr.level, null);
  assert.ok(E.checkAnswer(E.question(E.entries[E.id('neighbour', 'n')], 'translation'), 'neighbor'));
});
test('Topic practice stays in scope and shared senses keep exactly one pair of review cards', () => {
  const { E } = create(), t = E.topicByKey('words:health'), allowed = new Set(t.entryIds);
  const questions = E.makePool({ topic: t.key, limit: 50 });
  assert.ok(questions.length >= 8); assert.ok(questions.every(q => allowed.has(q.id)));
  assert.equal(E.makePool({ topic: 'words:missing' }).length, 0);
  const id = E.id('privacy', 'n');
  for (const key of ['words:digital-life', 'it:security']) {
    assert.ok(E.topicByKey(key).entryIds.includes(id)); E.store.enroll(id);
  }
  assert.equal(Object.keys(E.store.data.cards).length, 2);
  E.store.enroll(t.entryIds[0]); E.store.enroll(E.affixes[0].id); E.store.enroll(E.grammar[0].id);
  const due = E.makePool({ topic: t.key, dueOnly: true, limit: 50 });
  assert.equal(due.length, 2); assert.ok(due.every(q => allowed.has(q.id)));
  assert.equal(E.makePool({ topic: t.key, direction: 'prod', limit: 50 }).some(q => q.direction !== 'prod'), false);
});
test('Legacy grammar backups retain their IDs and can add independent production without enabling affix production', () => {
  const { E } = create(), id = 'grammar:perfect', affix = E.affixes[0].id;
  const legacy = { schemaVersion: 1, language: 'en', completed: 1, cards: {
    [id + '#rec']: { due: 1000, interval: 3, reps: 1, lapses: 0, grade: 3 }
  } };
  E.store.import(JSON.stringify(legacy));
  assert.equal(E.store.stats().prod, 0);
  const oldRecognition = JSON.stringify(E.store.data.cards[id + '#rec']);
  E.store.enroll(id); E.store.grade(id + '#prod', 3);
  assert.equal(JSON.stringify(E.store.data.cards[id + '#rec']), oldRecognition);
  const copy = create(); copy.E.store.import(E.store.export());
  assert.equal(copy.E.store.data.cards[id + '#prod'].reps, 1);
  assert.throws(() => E.store.grade(affix + '#prod', 3));
  assert.throws(() => E.store.enroll(affix, 'prod'));
  const before = E.store.export(), invalid = JSON.parse(before);
  invalid.cards[affix + '#prod'] = legacy.cards[id + '#rec'];
  assert.throws(() => E.store.import(JSON.stringify(invalid)));
  assert.equal(E.store.export(), before);
});

test('Expressions contain 25 idioms and reusable conversational phrases with scoped practice and review', () => {
  const { E } = create();
  const idioms = E.sectionEntries('idioms'), phrases = E.sectionEntries('everyday-phrases');
  assert.equal(idioms.length, 25); assert.equal(phrases.length, 22);
  for (const w of [...idioms, ...phrases]) {
    assert.equal(w.pos, 'chunk'); assert.match(w.why, /[а-яё]/i);
    assert.ok(w.variations.length); assert.match(w.variations[0].ru, /[а-яё]/i);
    assert.equal(w.cefr.level, null); assert.equal(w.sources[0].status, 'reference-link');
    assert.equal(E.checkAnswer(E.question(w, 'cloze'), E.answers(w.examples[0].en)[0]), true);
  }
  for (const section of ['idioms', 'everyday-phrases', 'professional']) {
    for (const t of E.sections.find(s => s.id === section).topics) {
      const allowed = new Set(t.entryIds);
      for (const kind of ['mixed', 'recognition', 'translation', 'cloze']) {
        const pool = E.makePool({ topic: t.key, kind, limit: 50 });
        assert.ok(pool.length); assert.ok(pool.every(q => allowed.has(q.id)));
      }
      E.store.enroll(t.entryIds[0]);
      const due = E.makePool({ topic: t.key, dueOnly: true, limit: 50 });
      assert.ok(due.some(q => q.id === t.entryIds[0] && q.direction === 'prod'));
      assert.ok(due.every(q => allowed.has(q.id)));
    }
  }
  const q = E.question(E.entries[E.id("we'll figure it out", 'chunk')], 'translation');
  assert.ok(E.checkAnswer(q, 'we will figure it out'));
  const copy = create(); copy.E.store.import(E.store.export());
  assert.equal(copy.E.store.export(), E.store.export());
});

test('Professional reuses every legacy IT item and preserves existing progress byte for byte', () => {
  const { E } = create(), legacy = E.sections.find(s => s.id === 'it');
  for (const [oldTopic, newTopic] of [['workcomm', 'work'], ['dev', 'dev'], ['infra', 'infra'], ['security', 'security']]) {
    const target = new Set(E.topicByKey('professional:' + newTopic).entryIds);
    for (const id of legacy.topics.find(t => t.id === oldTopic).entryIds) assert.ok(target.has(id), id);
  }
  const id = E.topicByKey('it:security').entryIds[0];
  E.store.grade(id + '#rec', 3, 123456789);
  const before = E.store.export();
  E.store.enroll(id, 'rec'); assert.equal(E.store.export(), before);
  const originalScripts = scripts.filter(s => !['data/expressions-professional.js', 'data/content-expansion-01.js', 'data/families-grammar-03.js', 'js/learning.js'].includes(s));
  const context = vm.createContext({});
  for (const script of originalScripts) vm.runInContext(fs.readFileSync(path.join(root, script), 'utf8'), context);
  for (const [key, original] of Object.entries(context.ETEnglish.entries)) {
    assert.equal(JSON.stringify(E.entries[key]), JSON.stringify(original), key);
  }
  assert.equal(E.store.key, 'etrnl.english.progress.v1');
  assert.ok(!E.navigationSections().some(s => s.id === 'it'));
  assert.ok(E.topicByKey('chunks:it-bug'));
});
test('Registry supports 200 families without changes to application limits', () => {
  const context = vm.createContext({}); vm.runInContext(fs.readFileSync(path.join(root, 'js/catalog.js'), 'utf8'), context);
  const E = context.ETEnglish; E.categories = [{ id: 'test' }];
  for (let i = 0; i < 200; i++) E.family({ id: `fixture-${i}`, label: `FIXTURE ${i}`, ru: 'Тестовая основа', related: [], categories: ['test'] }, `fixture${i}|n|B1|тестовая основа|A [[fixture${i}]] exists.|Тестовый пример.|fixture${i}||Только технические тестовые данные.`);
  assert.equal(E.families.length, 200); assert.deepEqual(Array.from(E.validate()), []);
});

test('Learn decisions distinguish known, learning and later without inventing review grades', () => {
  const { E } = create(), key = 'words:health', ids = E.learnQueue(key);
  assert.equal(ids.length, 10);
  const before = E.store.data.completed;
  E.store.markKnown(ids[0]); E.store.enroll(ids[1]); E.store.defer(ids[2]);
  assert.equal(E.itemState(ids[0]), 'known'); assert.equal(E.itemState(ids[1]), 'learning'); assert.equal(E.itemState(ids[2]), 'new');
  assert.equal(E.store.data.completed, before);
  assert.equal(E.store.data.cards[ids[0] + '#rec'].reps, 0);
  assert.equal(E.store.data.cards[ids[2] + '#rec'], undefined);
  const stats = E.topicStats(key);
  assert.equal(stats.known, 1); assert.equal(stats.learning, 1); assert.equal(stats.due, 1);
  assert.equal(stats.new + stats.learning + stats.known, stats.total);
  assert.ok(!E.learnQueue(key).includes(ids[0])); assert.ok(!E.learnQueue(key).includes(ids[1]));
  const due = E.makePool({ topic: key, dueOnly: true, limit: 50 });
  assert.equal(due.length, 2); assert.ok(due.every(q => q.id === ids[1]));
  const queue = E.learnQueue(key, 50);
  assert.equal(queue[queue.length - 1], ids[2]);
  assert.ok(queue.every(id => E.isCoreLevel(E.entries[id])));
  E.store.enroll(ids[0]); assert.equal(E.itemState(ids[0]), 'learning');
  assert.equal(E.topicStats(key).due, 2);
});

test('Balanced expansion adds 128 reachable items and preserves every previous record and backup', () => {
  const baseline = create({ skipExpansion: true }).E, { E } = create();
  assert.equal(Object.keys(baseline.entries).length, 613);
  const added = Object.values(E.entries).filter(w => !baseline.entries[w.id]);
  assert.equal(added.length, 128);
  for (const [id, original] of Object.entries(baseline.entries)) assert.equal(JSON.stringify(E.entries[id]), JSON.stringify(original), id);
  for (const f of baseline.families) assert.equal(JSON.stringify(E.families.find(x => x.id === f.id)), JSON.stringify(f));
  for (const g of baseline.grammar) assert.equal(JSON.stringify(E.grammar.find(x => x.id === g.id)), JSON.stringify(g));
  const reachable = new Set(E.sections.flatMap(s => s.topics.flatMap(t => t.entryIds)));
  for (const w of added) {
    assert.ok(reachable.has(w.id), w.id); assert.equal(w.cefr.level, null);
    assert.equal(w.sources[0].status, 'reference-link');
    assert.ok(E.isCoreLevel(w));
    if (w.pos === 'chunk') { assert.match(w.why, /[а-яё]/i); assert.ok(w.variations[0].en && w.variations[0].ru); }
  }
  for (const section of E.sections.filter(s => s.id !== 'it')) {
    assert.ok(E.sectionEntries(section.id).length > baseline.sectionEntries(section.id).length, section.id);
  }
  for (const old of baseline.sections.flatMap(s => s.topics)) {
    const updated = E.topicByKey(old.key);
    assert.deepEqual(Array.from(updated.entryIds).slice(0, old.entryIds.length), Array.from(old.entryIds), old.key);
  }
  const id = baseline.id('symptom', 'n'); baseline.store.markKnown(id);
  baseline.store.defer(baseline.id('prescription', 'n'));
  E.store.import(baseline.store.export());
  assert.deepEqual(JSON.parse(E.store.export()), JSON.parse(baseline.store.export()));
});

test('New families and grammar share the existing practice, due and import mechanics', () => {
  const { E } = create();
  for (const id of ['observe', 'compare', 'predict', 'maintain', 'adapt']) {
    const f = E.families.find(f => f.id === id); assert.ok(f.entryIds.length >= 5);
    const pool = E.makePool({ family: id, kind: 'derivative', limit: 50 });
    assert.equal(pool.length, f.entryIds.length - 1);
    assert.ok(pool.every(q => f.entryIds.includes(q.id) && q.direction === 'prod'));
    E.store.enroll(f.base.entryId);
    assert.equal(E.makePool({ family: id, dueOnly: true, limit: 50 }).length, 2);
  }
  const baseline = create({ skipExpansion: true }).E;
  const grammar = E.grammar.filter(g => !baseline.grammar.some(x => x.id === g.id));
  assert.equal(grammar.length, 6);
  grammar.forEach(g => E.store.enroll(g.id));
  const questions = E.makePool({ kind: 'grammar', dueOnly: true, limit: 50 });
  assert.equal(questions.length, 12);
  assert.ok(questions.every(q => grammar.some(g => g.id === q.id)));
  const copy = create(); copy.E.store.import(E.store.export());
  assert.deepEqual(JSON.parse(copy.E.store.export()), JSON.parse(E.store.export()));
});

test('Known and deferred choices survive backups; legacy version-one files remain importable', () => {
  const { E } = create(), ids = E.learnQueue('professional:security');
  E.store.grade(ids[0] + '#rec', 3, 1000);
  const graded = { ...E.store.data.cards[ids[0] + '#rec'] };
  E.store.markKnown(ids[0]); E.store.defer(ids[1]);
  const copy = create(); copy.E.store.import(E.store.export());
  assert.deepEqual(JSON.parse(copy.E.store.export()), JSON.parse(E.store.export()));
  assert.equal(copy.E.itemState(ids[0]), 'known');
  assert.equal(copy.E.store.data.cards[ids[0] + '#rec'].reps, graded.reps);
  assert.equal(copy.E.store.data.cards[ids[0] + '#rec'].due, graded.due);
  assert.ok(copy.E.store.data.later[ids[1]]);
  E.store.import(JSON.stringify({ schemaVersion: 1, language: 'en', completed: 1, cards: { [ids[0] + '#rec']: graded } }));
  assert.equal(E.itemState(ids[0]), 'learning'); assert.equal(Object.keys(E.store.data.later).length, 0);
  const before = E.store.export();
  for (const extra of [{ later: { 'unknown-id': 5 } }, { later: [] }, { later: { [ids[1]]: -1 } }, { cards: { [ids[0] + '#rec']: { ...graded, known: 'yes' } } }]) {
    assert.throws(() => E.store.import(JSON.stringify({ ...JSON.parse(before), ...extra })));
    assert.equal(E.store.export(), before);
  }
});
test('Escaping protects rendered data; parent-file drift is reported without changing shared files', t => {
  const { E } = create(); assert.equal(E.escape('<img src=x onerror="x">&'), '&lt;img src=x onerror=&quot;x&quot;&gt;&amp;');
  const snapshot = JSON.parse(fs.readFileSync(path.join(__dirname, 'parent-baseline.json'), 'utf8').replace(/^\uFEFF/, ''));
  const changed = snapshot.filter(row => !fs.existsSync(row.path) || crypto.createHash('sha256').update(fs.readFileSync(row.path)).digest('hex').toUpperCase() !== row.hash);
  t.diagnostic(changed.length ? 'Concurrent parent-file changes observed: ' + changed.map(row => path.relative(root, row.path)).join(', ') : 'All parent hashes match the initial snapshot.');
  assert.ok(snapshot.every(row => !path.relative(root, row.path).startsWith('tests')));
});
