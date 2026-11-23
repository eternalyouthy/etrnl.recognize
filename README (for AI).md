# ETRNL — multilingual vocabulary trainer

One website for learning **German, English and Russian**, from **Russian, English or German**.
Words (A2–B2 topics), Professional/IT, Chunks, Idioms, Everyday Phrases, Grammar, Roots (word families,
prefixes, suffixes, classical roots), Practice Studio, FSRS-5 Review and Stats.
No server, no build step: works by double-clicking `index.html` and as a static site (Netlify Drop).

The interface is always English. Learning content (meanings, translations, explanations, hints, role-play
prompts) follows the **I know** language.

**BYS** (the question mark beside the ETRNL logo) opens **Before You Start**, the project philosophy page. The article is always in the **I know** language. The **Русский**, **English** and **Deutsch** buttons set **I know** (and changing **I know** switches the article). A shared link such as `#/start?lang=en` shows that article language without changing the reader's settings.

## Language pair
Top-right globe button (`RU → DE`) opens a small popup with two dropdowns:
- **I know** — Russian (default), English, German
- **I learn** — German (default), English, Russian

All six directions work. Changing a dropdown re-renders the current screen in place: no reload, no
navigation (unless the current item doesn't exist in the new language — then the nearest section opens),
open Learn/Review/Practice sessions are kept and resumed when you switch back. The pair is saved.
Both dropdowns are also in **Settings → Languages**.

Where a translation into the known language is missing, the original (usually Russian) is shown with a small
dashed `RU` marker; the popup shows how much of the current pack is covered.

Every vocabulary entry and its main examples have glosses and translations in both supported known languages. The German and English overlays also cover grammar, topic scenarios and many reference fields. Some optional notes still use their original language and some screens render those notes without a fallback marker.

The German B1 expansion adds 117 cards and brings 18 existing cards into the new or expanded topics with their original progress. People, Home, Food, Authorities, Travel, Leisure, Society and Everyday have 16 entries each. Work has 18. Code comments give the printed page for each headword. The examples and translations were written for ETRNL. [Goethe-Zertifikat B1 Wortliste](https://www.goethe.de/de/spr/prf/ueb/pb1.html)

German B2 has 112 cards across eight curated topics. Changing World of Work and Media & Digital Life have 16 cards each. Wellbeing, Environment, Economy, Society and Education have 12 each, and Career Paths has 20. The new cards cover common combinations and give Russian and English translations. The seven updated role-plays practise comparing options, weighing evidence and explaining decisions. [CEFR B2 descriptors](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4) · [Goethe B2 speaking model](https://bfu.goethe.de/b2_mod_2MX6/sprechen.php)

German B1 has five grammar lessons and 40 exercises. The Wortstellung and Perfekt lessons cover verb placement, the sentence bracket, auxiliary choice and past-tense usage in conversation and written accounts. They include Russian and English explanations and link to the existing Nebensätze lesson. [Sentence bracket](https://grammis.ids-mannheim.de/systematische-grammatik/1241) · [Auxiliary choice](https://grammis.ids-mannheim.de/progr%40mm/5316) · [Past tenses in context](https://lernplattform.goethe.de/pluginfile.php/1534641/mod_folder/content/0/DTonlineA2_K10_GR-RM_Rueckschau_EN.pdf)

The Russian pack has 278 entries, nine word families, and eight grammar pages with 64 exercises. People, Home, Food and Travel contain 16 entries each. Russian content includes English and German translations in the pack files.

## Open it
- **Locally:** double-click `index.html`.
- **Hosted:** drag the whole folder onto https://app.netlify.com/drop. On the phone: Add to Home Screen.

Progress lives in the browser and per address; move or sync it in **User → Sync & Backup** (`#/user`, also in **Settings → Sync & Backup**): manual Export / non-destructive **Import & merge**, **Google Drive (Cloud OAuth · `appDataFolder`)** sync across desktop and mobile, or auto-sync to a local JSON file inside a **Google Drive Desktop / OneDrive** folder via File System Access API on desktop Chrome/Edge.

## Architecture
```
index.html            shell (topbar, globe popup, sidebar, bottom nav) — static script tags only
css/app.css           the ETRNL design (void black, ice blue, 1px lines, constellation)
js/core.js            pack registry, GT.register* API, membership index, localisation helpers GT.gl / GT.lx
js/i18n.js            GT.LANGS (names, speech locales, voice heuristics) + GT.HINTS (learning hints per known language)
js/topics.js          German pack config (nav, topics, root & prefix plans) — unchanged ids
js/loader.js          GT.loadPack(lang): loads a pack's files on demand via <script> (works from file://)
js/validate.js        GT.validatePack: data checks, shown in Settings → Data
js/fsrs.js            FSRS-5 scheduler (shared)
js/store.js           progress per learned language + global settings, export/import
js/app.js             all views (language-neutral), router, language switching
js/packs/en.js        adapter: the English catalogue (english/) → shared engine
data/manifest.js      GT_DATA_FILES (German, as before) + GT_PACKS (every language, in load order)
data/*.js             German pack (unchanged files)
data/i18n/*.js        overlays: de.en*.js — full English for the German pack (meanings, examples, notes, WHY?,
                      affixes, classical roots, grammar, scenarios); en.de*.js — full German for the English pack
                      (meanings, examples, notes, variations, families, affixes, classical roots, grammar, scenarios)
data/links/*.js       always-loaded curated sense-level links across packs (GT.link → "In other languages")
data/about.js         shared project philosophy in Russian, English and German
data/ru/*.js          Russian pack (written natively for the engine)
english/              the English catalogue (data reused as-is) + tests; english/index.html now forwards to the
                      unified site with "I learn: English"; the old standalone app is english/standalone.html
sw.js                 offline cache of the shell and all packs (bump VERSION after changes)
```
- **Shared once:** interface, views, scheduler, storage, speech, practice logic. A language is only data + a
  small config. `GT.items`, `GT.TOPICS`, `GT.roots` … are getters on the **active pack**, so views never branch
  on language; pack differences are config flags (`features.prefixDrill`, `features.rootMapVerbs`,
  `features.goetheB1`, `nounHint`, `intro`, `NAV`, `PRO_SUBS`, `ROOT_PLAN`, `PREFIX_PLAN`).
- **Packs load lazily** (German 70 files, English 26, Russian 25) — only the learned language is loaded.

## Data model (any pack)
| Field | Meaning |
|---|---|
| `t` | target-language text. Legacy German files write `de`; it is aliased to `t` on load (`targetKey: 'de'`). |
| `ru` / `en` / `de` | short meaning (gloss) in that known language — `GT.gl(obj)` picks the right one |
| `note`, `sense`, `explain`, `meaningExplanation`, grammar `explanation` … | a string in the pack's base language (`baseKnown`: `ru` for German/English, `en` for Russian), or `{ en: '…', de: '…' }`; overlays add `obj.i18n[lang][field]` — `GT.lx(obj, field)` |
| `examples: [{ t, ru/en/de, sense? }]` | `[[target]]` marks the cloze answer |
| `alsoIn: [['it','security']]` | extra topic membership (one card, shared progress) |
| `rootId`, `prefix`, `prefixDrill`, `core`, `transparency`, `meaningType`, `why` | as in the German handoff |
| Russian extras | `gender: 'm'|'f'|'n'|'pl'`, `aspect: 'impf'|'pf'`, stress written with `+` before the vowel (`говор+ить`) |

Entry ids are permanent. Progress keys are `<id>#rec` / `<id>#prod` (drills: `<id>`).

## Progress & storage
- German progress keeps its key `gt.progress.v1` (untouched format). English: `etrnl.progress.en.v1`.
  Russian: `etrnl.progress.ru.v1`. Settings (incl. the language pair): `etrnl.settings.v1`.
- The "I know" language never affects progress. "Reset progress" resets only the learned language.
- The old standalone English app's progress (`etrnl.english.progress.v1`, simple interval scheduler) is
  converted once into FSRS cards the first time English is opened; the legacy key is left untouched.
  Grammar `grammar:x#rec` → drill `grammar:x`, `#prod` → `grammar:x~prod`; affixes `affix:x#rec` → `affix:x`.
- Export writes all languages in one file. Import accepts that file, old ETRNL/DEUTSCH exports and old
  English exports. By default (`Import & merge`), cards are merged non-destructively (Known is never lost; fresher review by `last` / `reps` / `due` wins; `later` and `log` are merged). `Replace from file` overwrites.
- Folder sync (`GT.store.sync`): connects an existing or new `.json` file inside a synced desktop folder (OneDrive / Google Drive Desktop) via the File System Access API, persists the `FileSystemFileHandle` in IndexedDB (`etrnl.fs.v1`), and auto-merges + saves on changes and tab focus.

## Parallel work by several agents (no shared-code duplication)
Each language is owned by its files; agents working on different languages never touch the same file.
- **German content:** `data/*.js` + `GT_DATA_FILES` in `data/manifest.js` (workflow unchanged).
- **English content:** `english/data/*.js` (workflow unchanged); mapping lives in `js/packs/en.js`.
- **Russian content:** `data/ru/*.js` + `GT_PACKS.ru.files`.
- **Translations for another known language:** `data/i18n/<learn>.<know>.js` with `GT.localize(lang, {...})`.
- **Cross-language links:** `data/links/*.js` with `GT.link([{ de: [id, text], en: [id, text], ru: [id, text], note? }, ...])`.
- **Engine/UI:** `js/*.js`, `css/app.css` — one agent at a time.
Always bump `VERSION` in `sw.js` after changing files, and check Settings → Data (validation warnings).

## Add a language (e.g. French)
1. `js/i18n.js`: add `GT.LANGS.fr` (names, speech locale, voice regexes) and, if it should be a known
   language, `GT.HINTS.fr`; add it to `KNOW_ORDER` / `LEARN_ORDER`.
2. `data/fr/config.js`: `GT.definePack('fr', { baseKnown, TOPICS, NAV, PRO_SUBS, ROOT_PLAN, PREFIX_PLAN, features, intro })`
   (copy `data/ru/config.js`).
3. Content files with `GT.register / registerRoot / registerPrefix / registerSuffix / registerClassical / registerGrammar`.
4. List them in `GT_PACKS.fr` in `data/manifest.js`; bump `sw.js`.

## Checks
Serve the workspace root with a local static server such as `py -m http.server 8765` if Python is installed. Open `http://localhost:8765/`. Check **Settings → Data** or inspect `GT.pack.validation`, `GT.loadErrors`, and `GT.pack.duplicates` in the console. `GT.setLanguages('learn', 'ru')` switches to Russian. Run `node --test english/tests/validate.cjs` for the standalone English catalogue tests.

## Keyboard (desktop)
Learn: `1` Know it · `2` Learn it · `3` Later · `P` pronounce · `Esc` end
Review: `Space` show answer · `1–4` Again / Hard / Good / Easy
