# ETRNL — handoff 6

Project state on **23 November 2026**. Offline cache version: **`etrnl-v55`**.

Start with this file and [README.md](README.md). [Handoff 5](handoff_5.md) describes the state before this session; [handoff 4](handoff_4.md) and [handoff 3](handoff_3.md) keep the history of the move to one multilingual app. The [German handoff](handoff_de%202.md) holds the editing rules for German learning content. The English catalogue's history and sources are in [english/README.md](english/README.md) and [english/SOURCES.md](english/SOURCES.md).

## What the project is

**ETRNL** is a static app for learning German, English and Russian. It runs from [index.html](index.html) over `file://` and on static hosting. There is no build step and no backend. Over HTTP(S) a service worker caches the shell, shared data and all language packs; over `file://` files load directly.

The user picks **I know** and **I learn**; all six directions work, default **RU → DE**. The UI is English; meanings, example translations, notes and hints follow **I know**. Speech follows the language of the spoken text.

The user communicates in Russian (often casually). Reply in Russian; code, comments and this handoff are in English.

## What changed in this session

### Navigation and layout
- **Start page.** The logo now opens `#/start` (`viewStart` in `js/app.js`). Left: the BYS article (Before You Start), left-aligned, max 68ch. Right: the **I know / I learn** selectors and links to every section, each with a one-sentence description. On narrow screens the panel comes first, then the article. The old BYS header button is gone; `#/about` redirects to `#/start`.
- **B2 placement.** Work-related B2 topics moved from Language → Words to **Professional** (a "B2" group in the Pro sidebar): German `b2_beruf` ("B2 Career Paths") and `b2_arbeitswelt` ("B2 World of Work"), English `career-paths` / `world-of-work`, Russian `b2_work`. Non-work B2 stays in Words. Old `#/words/…` links for these topics redirect to `#/it/…`.
- **Topic pages** (`viewTopic`). Left-aligned regular-size buttons on top — **Start in order →** (was the big "Learn 10 new"), **Review N due**, **Practice now** — plus one line of counts. Below: a search box and the whole topic as a **tile grid** (`tilesHTML`): number + state (`new / learning / review / known`), headword, gloss, progress line; known tiles are dimmed. `#/…/browse` still shows the row list.
- **Expressions landing.** Next to **Practice Expressions →** there are two random-pick buttons: **Glück! · Idioms & phrases** and **Glück! · Chunks** (labels per learned language: `de` *Glück!*, `en` *Feeling lucky*, `ru` *Наудачу*; see `LUCKY` / `luckyBtn` / `expressionPool(kind)`). Below the topic tiles: **Your phrases** (already in the deck) and then **New phrases**, both as tile grids.

### Roots
- **English roots rebuilt** on the German model: base verb + particles. 20 verb families (`data/en/verbs_families.js`, `verbs_families_2.js`; ids `vf-<verb>`, items `en:vf:*`) and 11 particle pages (`data/en/verbs_particles.js`: `pv-up`, `pv-down`, … `pv-around`, `pv-through`) with meanings, Russian/German parallels and drills.
- **Russian roots** extended: new families ЕЗДИТЬ/ЕХАТЬ, СМОТРЕТЬ, КЛАСТЬ/ПОЛОЖИТЬ, ГОВОРИТЬ, ДЕЛАТЬ (14 families, 16 prefixes); `data/ru/roots_layout.js` sets verb titles, aspect pairs and prefix drills.
- **Constellation map** shows a short gloss under each node (`nodeGloss`), one node per headword; extra senses appear under "Other senses" in the detail panel.
- **New drill mode "Gap → verb"** (`Gap → phrasal verb` in English): a sentence with a gap and a choice of verbs from the same family (take up / take on / take over). Works in all packs. Distractors are prefixed siblings only (`clozeSiblings`), never the bare base verb.
- **Cross-language family links**: `data/links/families.js` (≈70 groups) links the verb families: nehmen ↔ take ↔ брать, legen ↔ put ↔ класть, aufgeben ↔ give up, unterschreiben ↔ подписывать, etc. Link files must be listed both in `GT_LINK_FILES` (`data/manifest.js`) **and** as `<script>` tags in `index.html`.

### Content
- **German**
  - B1: `words_b1_more.js` (70 cards). Page numbers checked against the Goethe B1 Wortliste PDF (`E:\Goethe-Zertifikat_B1_Wortliste.pdf`; printed page = PDF page). Six lemmas are not in the Wortliste and are marked as a B1+ supplement in comments.
  - B2: new group **B2 everyday topics** (`set: 'everyday'`): Wohnen, Beziehungen, Wissenschaft, Recht, Gesundheit, Reisen, Kultur — 16 each. B2 themes got 4 more each (`words_b2_more.js`).
  - Grammar: new lessons **Kasus** (`grammar_kasus.js`) and **Adjektivdeklination** (`grammar_adjektive.js`), ru + en, 8 drills each. Now 7 lessons / 56 drills.
  - Expressions: idioms 30, everyday phrases 30 (`expressions_more.js`), chunks 50 (`chunks_more.js`).
  - Professional: IT & Development and Infrastructure 12 each (`it_dev_infra_2.js`).
  - `data/memberships.js` is loaded **last** in the German manifest and adds topic memberships for cards that live in late-loading files (roots).
- **English**: `words_more.js`, `words_more_2.js` (thin topics to 16–20), `expressions_more.js` (+4 per idiom/phrase sub-topic, chunks to 6–8 per function, career themes to 16).
- **Russian**:
  - B1 topics 16 each (`words_more.js`).
  - New **B2 everyday topics** (Housing, Relationships, Health, Travel) in `words_b2_everyday.js` + `words_more_2.js`, with `set: 'everyday'` in `data/ru/config.js`.
  - Idioms 20, everyday phrases 20, chunks 44 (`expressions_more.js`), with 8 new chunk functions added to the config (complain, problem, appointments, email, smalltalk, it_bug, it_help, it_meeting).
  - Professional topics 12–14 each.

## Current size

Counted from the loaded packs (`GT.items`; grammar drills counted separately).

| Pack | Manifest files | Cards | Chunks / expressions | Root families | Prefixes / suffixes / classical | Grammar lessons / drills |
|---|---:|---:|---:|---:|---:|---:|
| German (`de`) | 86 | 1068 | 50 / 60 | 20 | 19 / 14 / 10 | 7 / 56 |
| English (`en`) | 32 | 990 | 75 / 67 | 65 | 30 / 19 / 9 | 30 / 60 |
| Russian (`ru`) | 35 | 494 | 44 / 40 | 14 | 16 / 6 / 3 | 8 / 64 |

Cross-language links: 289 groups, 51 of them in all three languages.

## Where to edit

| Path | Purpose |
|---|---|
| `index.html`, `css/app.css`, `js/app.js` | Shell, styles, routes, views (start page, topic tiles, Expressions landing, roots map and drills). |
| `js/core.js`, `js/i18n.js`, `js/loader.js`, `js/validate.js` | Registry (`GT.register`, `registerRoot`, `registerPrefix`, `addMember`, `link`, `localize`), localisation helpers, lazy loading, validators. |
| `js/topics.js`, `data/manifest.js`, `data/*.js` | German topics/scenarios, load order, German data. |
| `data/ru/config.js`, `data/ru/*.js` | Russian topics, chunk functions, data, stress conversion. |
| `english/data/`, `js/packs/en.js`, `data/en/*.js` | English catalogue, its adapter, and the new English batches registered after the adapter. |
| `data/links/cross.js`, `data/links/families.js` | Always-loaded cross-language links. |
| `data/i18n/*.js` | English overlays for German, German overlays for English. |
| `js/fsrs.js`, `js/store.js`, `sw.js` | Spaced repetition, storage and sync, offline cache. |

## Data rules learned the hard way

- **Never duplicate a headword or an id.** Before adding a word, check the whole pack (roots and other topics too). If the word exists, add the existing card to the topic with `GT.addMember(id, tab, topic)` or `alsoIn` — one card, shared progress. `GT.register` silently keeps the first item when an id repeats, so a duplicate id is easy to miss; grep the id across `data/` first.
- `GT.addMember` only works for ids that are already loaded. For cards defined in later files (roots), put the call in a file loaded afterwards (German: `data/memberships.js`).
- `meaningType` requires both `meaningExplanation` and `meaningExamples`, otherwise the validator warns. If you only have a literal explanation, put it in `note`.
- Inline English is fine for new German items: `en` gloss, `examples[i].en`, and `i18n: { en: { note } }`.
- Russian: `+` before the stressed vowel in `t` and in examples, never before `ё`. Check stress carefully (common slips this session: теперь, проект, успею, можно, хотят).
- After changing files, bump `VERSION` in `sw.js` (read the current value first: a parallel session may bump it too) and tell the user to press **Ctrl+F5**.
- Keep the English UI, the dark palette with the ice-blue accent, the mobile navigation and the **User** tab structure.

## Verification

- Preview server: `wortschatz` in `.claude/launch.json` (Python `http.server`, port 8765). A parallel session uses `wortschatz-2` on port 8790 — do not touch its changes (it edited `js/store.js`).
- Python: `C:/Users/rando/AppData/Local/Programs/Python/Python314/python.exe` (the `python` alias hits the Windows Store stub). Node.js is **not** available. Write multi-line patch scripts to a file in the scratchpad instead of using heredocs with nested quotes. When a Python string contains `\u0000`, write it as `\\u0000`, or a real NUL byte ends up in the JS.
- In the browser: unregister the SW and clear caches. The browser HTTP cache can serve stale data files, so `fetch(file, {cache: 'reload'})` the changed files before reloading. Then load all packs and run `GT.validatePack(GT.packs[l])` for each pack and `await GT.validateLinks()`; both should return empty lists. Also check for duplicate headwords.
- Final state of this session: 0 validation warnings in all three packs, 0 link errors. Known pre-existing duplicate headwords that are intentional or older: English `comfortable`, `support` and several catalogue sense entries; Russian `расписание`, `подъезд`, `дело`.
- A `SyntaxError: Unexpected token '{'` shown in the browser console came from an earlier debug snippet, not from the app; every app script parses cleanly.

## What next

1. **German grammar.** Still empty: `verben_praep`, `relativsaetze`, `konnektoren`, `infinitiv`. Same format as `grammar_kasus.js` (ru + en, tables, pitfalls, 8 drills).
2. **Russian volume.** The Russian pack is still about half the size of the others: B2 themes (media, society) have 12 cards, B2 everyday 11–12, chunks 3–4 per function. Roots could get more families (e.g. ПРОСИТЬ, ЖИТЬ, БИТЬ).
3. **More cross-language links** for the new expressions (e.g. *Ich verstehe nur Bahnhof* ↔ *it's all Greek to me* ↔ *китайская грамота*; *zwei Fliegen mit einer Klappe* ↔ *kill two birds* ↔ *убить двух зайцев*).
4. **UI checks.** Check the Adjektive lesson and the Russian Gap → verb drill in the browser, and test the topic tile grid on a phone width.
