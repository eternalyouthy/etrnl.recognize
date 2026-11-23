/* Read the same catalogue as the preview, without the DOM application. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ localStorage: { getItem: () => null, setItem: () => {} } });
const html = fs.readFileSync(path.join(root, 'standalone.html'), 'utf8');
for (const [, script] of html.matchAll(/<script defer src="([^"]+)"/g)) {
  if (script !== 'js/app.js') vm.runInContext(fs.readFileSync(path.join(root, script), 'utf8'), context, { filename: script });
}
const E = context.ETEnglish, entries = Object.values(E.entries);
console.log(JSON.stringify({ ...E.contentSummary(), families: E.families.length,
  familySenses: E.families.reduce((count, f) => count + f.entryIds.length, 0),
  grammarTopics: E.grammar.length, grammarQuestions: E.grammar.reduce((n, g) => n + (g.production ? 2 : 1), 0),
  sections: E.sections.map(s => ({ id: s.id, topics: s.topics.length, uniqueEntries: E.sectionEntries(s.id).length })),
  levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => ({ level,
    sense: entries.filter(w => w.cefr.level === level && w.cefr.scope === 'sense').length,
    wordPOS: entries.filter(w => w.cefr.level === level && w.cefr.scope === 'lexeme-pos').length }))
}, null, 2));
