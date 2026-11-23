You are continuing work on my personal German vocabulary app **ETRNL / DEUTSCH**.
Project folder: `C:\Users\rando\Desktop\german train`.

Before changing anything, read `README.md`, `index.html`, everything in `js/`, `css/app.css`, `data/manifest.js`, `sw.js`, and at least one file of each data type (`words_health.js`, `it_security_2.js`, `expressions_idioms.js`, `grammar_passiv.js`, `roots_stehen.js`, `prefixes.js`, `suffixes.js`, `classical_roots.js`). Then summarise what you found in 5–8 lines and wait for my go before building.

---

## About me
- Native Russian speaker living in Germany, level B1 (passed DTZ; reading/listening strong, active vocabulary fragmented).
- I work in IT as a SOC analyst and talk to non-technical colleagues all over the office.
- I practise speaking separately with an AI chat. This app is my knowledge base + spaced repetition + Practice Studio trainer, not a chatbot.

---

## Hard rules
1. **Languages**:
   - **Learning content strictly in Russian** (meanings, example translations, notes, morpheme meanings, grammar explanations, pitfalls, drill explanations, `WHY?` notes, meaning-category tooltip explanations/examples, Russian role-play prompts). No English translations in data.
   - **Interface strictly in English** (tabs, dropdowns, buttons, labels like `KNOW IT` / `REVIEW` / `DUE TODAY` / `WHY?` / `PRACTICE`), except existing Russian vocabulary badges (`МНОГОЗНАЧНОЕ`, `ПЕРЕНОСНОЕ`, `РАЗГОВОРНОЕ`, `СМЫСЛ УШЁЛ`).
2. **Zero build, zero server**:
   - Must work both by double-clicking `index.html` (`file://`) AND hosted as a static site (Netlify Drop).
   - No build step, no server requirement, no `fetch` for data: data files are plain JS (`GT.register(...)`, `GT.registerRoot(...)`, etc.) listed in `data/manifest.js` and loaded via `<script>` tags.
   - Vanilla HTML/CSS/JS. Progress in `localStorage` (schema v2) + Export/Import JSON. PWA (`manifest.webmanifest` + `sw.js`, network-first; **always bump `VERSION` in `sw.js`** after changing files — currently `'etrnl-v20'`).
3. **Design concept (keep intact, do not redesign)**:
   - Void black `#04060A`, deep navy `#0B1A33`, ice-blue accent `#8CCBFF`, text `#EEF2F7`, muted `#9AA6B8`; `der`/`die`/`das` tags `#7FB2FF` / `#FF8FA3` / `#E9E4D8`.
   - Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (uppercase letter-spaced labels and numbers).
   - Square 1px lines, constellation background, mobile bottom nav + slide-out sidebar, slide-over Settings overlay drawer (preserves current page/scroll/session — never navigate away on Settings click).
   - `C:\Users\rando\Desktop\german train\english\` is an independent English ETRNL app (used only as a functional reference for German Roots & Practice Studio) — do not modify or break it.
4. **TTS / Speech Synthesis (do NOT break)**:
   - Keep the exact original `pickVoice()` selection heuristic (`/natural|online|google|premium|enhanced/i`) intact so cloud voices (`Google Deutsch` / `Microsoft ... Online (Natural)`) win automatically in Chrome/Edge. Never replace `pickVoice()` with custom local-voice scoring.
   - Keep `#voiceSelect` in Settings (`Auto` = original `pickVoice()`), play/stop toggle on `Test` (`Test` ↔ `Stop`) and all `.speak` buttons, and speaker buttons across Browse rows, Word family chips, Roots stress pairs, and Prefix example chips.
5. **Data quality & permanent IDs**:
   - Entry `id`s are **permanent** (progress is stored by `id`, split into `<id>#rec` and `<id>#prod`). Never rename/regenerate existing `id`s or reset user progress.
   - Note on umlauts in root IDs: `GT.ROOT_PLAN` uses German spelling with umlaut (`'führen'`, matching `'über'` in `GT.PREFIX_PLAN`). Root `id` in `GT.registerRoot` MUST match `GT.ROOT_PLAN` exactly (`id: 'führen'`), while word IDs stay ASCII (`r-fuehren-*`).
   - Correct articles, plurals, verb forms (`Präsens` 3rd person · `Präteritum` · `Perfekt` with `haben`/`sein`); natural B1/B2 example sentences (mix of everyday and IT/work) with the target wrapped in `[[…]]` for cloze (separable verbs: mark both parts, e.g. `[[führen]] wir ... [[durch]]`).
   - **B1 words come ONLY from the Goethe-Zertifikat B1 Wortliste** (I have it as a PDF; **ask me for it** before creating new B1 Words topic batches). Skip obvious A1/A2 basics. Mark Austrian/Swiss-only entries with `region`. B2 themes, Professional/IT, Idioms, and Everyday Phrases are curated.
   - **Russian connection (`ru_link`)**: only if well established (`loan_in_russian`, `internationalism`, `shared_ancient_root`, `false_friend`); otherwise `null`.
6. **Semantic accuracy, Meaning Badges & `WHY?` rules (strict)**:
   - **Distinguish morphological composition, historical etymology, modern semantic transparency, and lexical meaning category.** Never present a mnemonic analogy as etymology (label mnemonics explicitly as `Мнемоника (не этимология):`).
   - **Morpheme boundaries**: split `parts` at real linguistic boundaries (`Sprech- + Stunde`), not by syllable.
   - **Every `why` entry** must have `{ confidence: 'high' | 'medium', text, source, evidence, root? }`. Only DWDS/Pfeifer, Wiktionary, Duden Redewendungen, OED, or Vasmer-level facts. Omit `why` if uncertain. Only `high` is shown by default (Settings toggle enables `medium`).
   - **Meaning-category badges** (curated metadata, NEVER hardcoded in UI or auto-generated at runtime):
     - `meaningType: 'polysemous'` → `МНОГОЗНАЧНОЕ` (multiple established dictionary meanings — e.g. `Untersuchung`, `behandeln`, `führen`). **Do NOT label polysemous words as `ПЕРЕНОСНОЕ`.**
     - `meaningType: 'figurative'` → `ПЕРЕНОСНОЕ` (genuinely figurative/metaphorical usage or idiom).
     - `meaningType: 'colloquial'` → `РАЗГОВОРНОЕ` (informal/colloquial usage).
     - Every item with `meaningType` MUST also include word-specific `meaningExplanation` (Russian) and `meaningExamples: [{ de, ru }, ...]` (2–3 concrete examples). If classification is uncertain, omit `meaningType`.
     - Tooltips open on hover, focus, and tap; close via `×`, second tap, or `Escape` (`.dismissed`); `positionTooltip()` keeps 0px overlap with `.hw-row`.
   - **Morphological transparency** (`transparency: 'transparent' | 'figurative' | 'opaque'` on derived words):
     - `opaque` renders `СМЫСЛ УШЁЛ` on root cards (e.g. `verstehen`, `aufhören`) with its own tooltip.
     - `transparency: 'figurative'` does **NOT** render a `ПЕРЕНОСНОЕ` badge by itself — only curated `meaningType` drives the lexical badge.
   - **Polysemous verbs**: give each major sense its own example with `sense: '...'` so cloze/recall disambiguates which meaning is being asked.
7. **Batch workflow**:
   - Work in batches (~40–80 entries per batch, split into logical files), validate with `validate.py` + live browser QA on `http://localhost:8765/`, bump `sw.js`, report concisely in Russian, and wait for my go before the next batch.

---

## Architecture (current — `etrnl-v20`)

### Core JS & CSS
- `js/core.js`: `GT.register({tab, topic, items})`, `GT.registerGrammar(page)`, `GT.registerRoot(root)`, `GT.registerPrefix(p)`, `GT.registerSuffix(s)`, `GT.registerClassical(c)`; `GT.MEANING_CATEGORIES`, `GT.OPAQUE_ROOT_META`, `GT.meaningInfo(it)`; `GT.parseCardKey` / `GT.cardKey` (`<id>#rec`, `<id>#prod`).
- `js/topics.js`:
  - `GT.NAV`: 3 hover/tap dropdown menus + 3 standalone top-level tabs:
    - **LANGUAGE**: Words (`#/words`), Grammar (`#/grammar`), Roots (`#/roots`)
    - **PROFESSIONAL**: Work & Office (`#/it/workcomm`), IT & Development (`#/it/dev`), Infrastructure (`#/it/infra`), Security (`#/it/security`), B2 Beruf (`#/words/b2_beruf`)
    - **EXPRESSIONS**: Chunks (`#/chunks`), Idioms (`#/expressions/idioms`), Everyday Phrases (`#/expressions/everyday`)
    - Standalone: **PRACTICE** (`#/practice`), **REVIEW** (`#/review`), **STATS** (`#/stats`)
  - `GT.PRO_SUBS`, `GT.TOPICS` (`words`, `it`, `expressions`, `chunks`, `grammar`, `roots`), `GT.ROOT_PLAN` (20 core verbs), `GT.PREFIX_PLAN` (19 prefixes).
- `js/fsrs.js`: FSRS-5 scheduler.
- `js/store.js`: `localStorage` schema v2 (`#rec` + `#prod` cards, `settings.speechVoice`, `settings.hideSidePractice`, `settings.reviewDirection`, `settings.showMediumWhy`, Export/Import JSON).
- `js/app.js`: Hash router, topbar dropdowns, sidebar (including closable `Practice now` widget), Learn/Review sessions (separate `#rec` / `#prod`), **Practice / Learning Studio (`#/practice`)** with 7 modes (`mixed`, `recognition`, `translation`, `derivative`, `cloze`, `affix`, `grammar`) integrated with FSRS-5, **Roots** 4 sub-tabs (`Word Families`, `Prefixes`, `Suffixes`, `Classical Roots`) + bidirectional Prefix Drill, `WHY?` sheet, meaning-category tooltips, slide-over Settings overlay drawer, TTS play/stop toggle.
- `css/app.css`: Dark/light theme tokens, constellation SVG, responsive topbar breakpoints (`<= 1360px`, `<= 1200px`, `<= 1100px`), `.mtag-wrap`/`.mtag-tip` tooltips, `.sheet-wide` Settings drawer, Practice Studio layout.

### Data schemas (follow existing files for exact style)
- **Word**: `{ id, pos, de, article?, plural?, forms?: { praes, praet, perf }, gov?, ru, examples: [{ de, ru, sense? }], morph?, root?, parts?: [[morpheme, ru]], family?: [], note?, why?: { confidence, text, source, evidence, root? }, ru_link?, transparency?: 'transparent'|'figurative'|'opaque', meaningType?: 'polysemous'|'figurative'|'colloquial', meaningExplanation?, meaningExamples?: [{ de, ru }], usage?: { says: 'english'|'german'|'both', note }, level?: 'b2', region? }`
- **Chunk / Idiom / Everyday Phrase**: `{ id, topic, topics?: [], de, register, ru, examples: [{ de, ru }], variations?: [], note?, why?, meaningType?, meaningExplanation?, meaningExamples? }`
- **Root**: `GT.registerRoot({ id, verb, ru, words: [word + base|prefix|sep:'trennbar'|'untrennbar'|stress|parallel|transparency|core|drill:{ru,de}|prefixDrill:{ex,meaning,explain}], pairs?: [{ a: { stress, sep, ru, ex }, b: { ... } }] })`
  - Show 6–8 high-frequency derivatives by default (`core: true`); rest behind `Show all (N)`.
- **Prefix**: `GT.registerPrefix({ id, label, sep, stress, ru, meanings: [{ ru, ruPrefix, note?, examples: [{ de, ru }] }], match, grammar })`
- **Suffix**: `GT.registerSuffix({ id, label, gender, posChange, ru, note, examples: [{ de, ru }], practice: [{ prompt, answer, options, explain }] })`
- **Classical Root**: `GT.registerClassical({ id, label, origin, meaning, ru, note, examples: [{ de, ru }], pitfalls?: [str], why })`
- **Grammar page**: `{ id, title, summary, explanation(html), tables, examples, pitfalls: [{ title, html }], drills: [{ id, kind: 'gap'|'choice'|'reorder', ..., explain }] }`

### Prefix meaning indices in `data/prefixes.js` (for `prefixDrill.meaning`)
- `ab`: 0 от/прочь · 1 вниз/снятие · 2 уменьшение/отмена · 3 завершение
- `auf`: 0 вверх · 1 открытие · 2 начало · 3 до конца
- `an`: 0 к/при · 1 включение · 2 начало · 3 направленность к собеседнику
- `ver`: 0 ошибка/мимо · 1 расходование/исчезновение · 2 изменение/закрытие · 3 результат
- `aus`: 0 наружу · 1 выключение · 2 до конца · 3 выбор
- `ein`: 0 внутрь · 1 привыкание/настройка · 2 включение/сокращение
- `mit`: 0 совместное действие · 1 с собой · 2 передача информации
- `nach`: 0 по образцу · 1 проверка/уточнение · 2 позже/дослать · 3 вдогонку/уступка
- `vor`: 0 предъявление · 1 заранее · 2 образец · 3 вперёд/план
- `zu`: 0 закрытие · 1 направление/доставка · 2 рост · 3 согласие
- `um`: 0 переделка (отд.) · 1 вокруг/обход (неотд.) · 2 падение/переворот (отд.)
- `über`: 0 перенос (неотд.) · 1 превышение (неотд.) · 2 контроль (неотд.) · 3 поверх (отд.)
- `durch`: 0 до конца (отд.) · 1 сквозь (отд.) · 2 сплошной поиск (неотд.)
- `be`: 0 переходность (+ Akk.) · 1 охват поверхности/места · 2 воздействие/обработка
- `er`: 0 достижение результата · 1 получение/выработка/замена · 2 переход в состояние
- `ent`: 0 удаление/лишение · 1 освобождение · 2 возникновение/развитие
- `zer`: 0 разрушение на части · 1 распад
- `ge`: 0 глаголы целиком · 1 собирательные существительные (`das`)
- `miss`: 0 ошибка/неудача · 1 противоположность/злоупотребление

---

## Current state (verified at `etrnl-v20`)
**42 data files loaded · 546 words & chunks · 3 grammar pages (24 drills) · 286 `WHY?` notes · 119 `core` root derivatives · 102 `prefixDrill` items · 231 curated meaning badges (`183` `МНОГОЗНАЧНОЕ` / `32` `ПЕРЕНОСНОЕ` / `16` `РАЗГОВОРНОЕ`) · 0 errors.**

- **Words (B1 Goethe)**: Health & Doctor `85` (complete), Work `8`, Everyday Core `3`. (Topics still empty: `people`, `home`, `food`, `authorities`, `travel`, `leisure`, `society`.)
- **Words (B2 themes)**: Career Paths / B2 Beruf `20` (`words_b2_beruf.js` + `words_b2_beruf_2.js`). (Other 7 B2 themes still empty.)
- **Professional / IT**: Security `94` (complete SOC-weighted batch), Work & Office `19` (`it_workcomm.js` + `pro_work_office.js`), IT & Development `3`, Infrastructure `3`.
- **Expressions**: Chunks `25` (`chunks_sample.js`), Idioms `15` (`expressions_idioms.js`), Everyday Phrases `15` (`expressions_everyday.js`).
- **Roots — Word Families (`17/20` complete, `256` words)**:
  - Done: `bauen` (15), `stellen` (17), `ziehen` (17), `setzen` (16), `legen` (15), `nehmen` (15), `geben` (16), `halten` (16), `kommen` (15), `gehen` (14), `schlagen` (14), `sprechen` (15), `sehen` (15), `fallen` (14), `stehen` (14), `tragen` (14), `führen` (14).
  - Remaining in `GT.ROOT_PLAN` (3): `schreiben`, `brechen`, `laufen`.
- **Roots — Prefixes (`19/19` complete)**: `ab-`, `auf-`, `an-`, `ver-`, `aus-`, `ein-`, `mit-`, `nach-`, `vor-`, `zu-`, `um-`, `über-`, `durch-`, `be-`, `er-`, `ent-`, `zer-`, `ge-`, `miss-`.
- **Roots — Suffixes (`14` complete)**: `data/suffixes.js`.
- **Roots — Classical Roots (`10` complete)**: `data/classical_roots.js`.
- **Grammar (`3/11` complete)**: `Konjunktiv II`, `Nebensätze`, `Passiv` (8 drills each).
  - Still marked "soon" (8): `perfekt`, `wortstellung`, `relativsaetze`, `konnektoren`, `adjektive`, `kasus`, `verben_praep`, `infinitiv`.

---

## Next steps (in order, one batch per turn, ask me before each)
1. **Roots batch 5 (closes 20/20 planned roots)**: `schreiben`, `brechen`, `laufen` (`data/roots_schreiben.js`, `data/roots_brechen.js`, `data/roots_laufen.js`) — same depth as batches 2–4 (14–15 words, 7 `core`, stress pairs where applicable, `prefixDrill`, curated `meaningType` + tooltips, strict `why` with DWDS/Pfeifer `source` & `evidence`).
2. **Grammar batch 2**: `Perfekt vs Präteritum` (`grammar_perfekt.js`), `Word order` (`grammar_wortstellung.js`), `Relative clauses` (`grammar_relativsaetze.js`) — each with Russian explanation, tables, pitfalls, and 8 drills (automatically picked up by Review & Practice Studio).
3. **Grammar batch 3**: `Two-part connectors` (`konnektoren`), `Adjective declension` (`adjektive`), `Cases & prepositions` (`kasus`), `Verbs + prepositions / da-/wo-` (`verben_praep`), `zu-infinitive / lassen / reflexive / n-declension / Futur I` (`infinitiv`).
4. **Words (B1 Goethe) batches**: **Ask me for the Goethe-Zertifikat B1 Wortliste PDF first**, then build full B1 batches for `Work & Career`, `Authorities & Bureaucracy`, `Home & Living`, `Food & Shopping`, `Travel`, `People`, `Leisure`, `Society`.
5. **Professional & Expressions expansion** (optional / on demand): expand `IT & Development`, `Infrastructure`, `Idioms` (+15–20), `Everyday Phrases` (+15–20), and `Roots` beyond the core 20 (up to 50–80 roots).

---

## How to check your work (Windows environment notes)
- On this Windows machine, use `py` (Python Launcher), not `python`/`python3`; `node` is not installed. Avoid complex nested-quote inline `py -c` in PowerShell — write small `.py` helper scripts instead.
- Add every new data file to `data/manifest.js` and bump `VERSION` in `sw.js`.
- Run a data validation check confirming: every file in `manifest.js` exists, 0 duplicate IDs, every word/chunk has `ru`, every noun has `article`, every verb has `forms`, every example has `[[` and `ru`, every `why` has valid `confidence` + `source` + `evidence`, every `meaningType` (`polysemous` | `figurative` | `colloquial`) has `meaningExplanation` + `meaningExamples`, and every `prefixDrill.meaning` index is in range for `data/prefixes.js`.
- Serve the folder (`py -m http.server 8765 --directory "C:\Users\rando\Desktop\german train"`), hard-reload `http://localhost:8765/`, verify 0 console/runtime errors, `GT.loadErrors` and `GT.duplicates` empty, Settings → Data count matches, new views/tooltips/Practice Studio work cleanly, and confirm `index.html` still works directly via `file://`.
