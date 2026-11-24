# ETRNL Project Hand-off (`hand-off gemini`)

- **Author:** Gemini session (`hand-off gemini`)
- **Timestamp:** 2026-11-24
- **Workspace root:** `c:\Users\rando\Desktop\german train`
- **Git `HEAD`:** `a8ff219` (clean baseline before this multi-chat cycle; **ALL changes from Gemini Batches 1–7, ChatGPT's handoff, and Gemini's security/content audit are currently uncommitted and unpushed in the working tree**)
- **Service Worker version (`sw.js`):** `VERSION = 'etrnl-v118'`
- **Preview server:** `http://localhost:8775/` (`python.exe -m http.server 8775`)
- **Python runtime:** `C:/Users/rando/AppData/Local/Programs/Python/Python314/python.exe` (Node.js is NOT installed in this environment)

---

## 1. Verified Pack Counts & Section State (As-Is)

Measured live via browser UI (`Settings → Data`, loading `de` → `en` → `ru` after reload on `etrnl-v117`):

| Pack | Files loaded | Words & chunks | Grammar pages | Word families | Cross-language links | Validation (`GT.validatePack`) | `#/professional` status |
|---|---:|---:|---:|---:|---:|---|---|
| **`de` (German)** | 109 | **1740** | 14 | 20 | 584 | `0 data warnings.` | **28/28 topics populated (`0` `"soon"` tiles)** |
| **`en` (English)** | 48 | **1677** | 33 | 65 | 584 | `0 data warnings.` | **29/29 topics populated (`0` `"soon"` tiles)** |
| **`ru` (Russian)** | 52 | **916** | 11 | 17 | 584 | `0 data warnings.` | **10/27 topics populated (`17` `"soon"` tiles)** |

### `#/professional` 7-Track Structure & German Topic Counts (Batch 7 Result)
Track definitions live symmetrically across `js/topics.js` (`de`), `js/packs/en.js` (`en`), and `data/ru/config.js` (`ru`):
- Track 1: `for-everyone` (`01 · For Everyone`, badge: `Start here`) — universal workplace core (`workcomm`, `clients`, `presentations`, B2 career/work, B1 `work`)
- Track 2: `it` (`02 · IT Professions`) — `dev`, `infra`, `security`, `design`, `ai_data`, `product`
- Tracks 3–7 (17 new topic IDs created across all 3 packs; `en` filled in Batch 6; `de` filled in Batch 7; **`ru` still empty/`soon` → next priority Batch 8**):
  - `bureaucracy`: `bureau_offices` (DE 14: 10+4), `bureau_tax` (DE 10), `bureau_docs` (DE 15: 10+5)
  - `legal`: `legal_contracts` (DE 12: 10+2), `legal_ip` (DE 10), `legal_criminal` (DE 11: 10+1), `legal_labour` (DE 16: 10+6), `legal_corporate` (DE 12: 10+2)
  - `service`: `svc_hotel` (DE 11: 10+1), `svc_gastro` (DE 10), `svc_retail` (DE 12: 10+2)
  - `business`: `fin_accounting` (DE 10), `fin_marketing` (DE 13: 10+3), `fin_hr` (DE 15: 10+5)
  - `operations`: `med_clinical` (DE 11: 10+1), `ops_logistics` (DE 11: 10+1), `ops_trades` (DE 11: 10+1)
  - Total new DE Batch 7 cards: **170** (`80` in `pro_bureau_legal.js` + `90` in `pro_service_ops.js`) + **34** `GT.addMember` reuses in `memberships.js` = 204 topic slots populated across the 17 German tracks.

---

## 2. File Inventory of Uncommitted Working Tree

### A. Gemini Batches 1–7
- **Batch 1 (`de` Professional):** `data/it_pro_more_3.js` (+70 cards, `pro-m4-*`), `data/memberships.js` (+2 pre-existing reuses)
- **Batch 2 (`en` Professional):** `data/en/it_more_3.js` (+72 cards, `en:it4:*`)
- **Batch 3 (`ru` Professional):** `data/ru/pro_more_3.js` (+70 cards, `ru-pro5-*`)
- **Batch 4 (Cross-links):** `data/links/cross.js` (+79 links / 3 triplet upgrades → 584 total)
- **Batch 5 (`Hide basic words` feature):** `js/store.js` (`hideBasics: false`), `js/app.js` (`isBasicItem`, `rawItemsFor`, `itemsFor`, `basicsToggleHTML`, `studioItems` filtering, Settings checkbox), `data/basics.js` (239 IDs), `data/en/basics.js` (248 IDs), `data/ru/basics.js` (116 IDs)
- **Batch 6 (7-track `#/professional` + `en` 170 cards):** `js/topics.js`, `js/packs/en.js`, `data/ru/config.js`, `js/app.js` (`proGroups()`, `#/professional` landing + "Start here" box + jump chips), `data/en/pro_bureau_legal.js` (+80 cards, `en:pro5:*` + 8 `GT.addMember`), `data/en/pro_service_ops.js` (+90 cards, `en:pro6:*` + 7 `GT.addMember`)
- **Batch 7 (`de` 170 cards + 34 reuses):**
  - `data/pro_bureau_legal.js` (+80 B2–C2 cards, `pro-b5-*`)
  - `data/pro_service_ops.js` (+90 B2–C2 cards, `pro-b6-*`)
  - `data/memberships.js` (38 total `GT.addMember` calls: 4 pre-existing + 34 Batch 7 reuses)
  - `data/manifest.js` (wired Batch 1–7 files in `GT_DATA_FILES` and `GT_PACKS.en` / `GT_PACKS.ru`)
  - `sw.js` (`VERSION = 'etrnl-v117'`)

### B. ChatGPT Work (`handoff 24-11-2026-17-20 by chatgpt.md`)
- **Grammar pages + i18n overlays:** `data/grammar_practice.js` (`de-g-*`), `data/i18n/de.en.grammar_practice.js`, `data/en/grammar_practice.js` (`en-g-*`), `data/i18n/en.de.grammar_practice.js`, `data/ru/grammar_practice.js` (`ru-g-*`), `data/i18n/ru.de.grammar_practice.js`
- **`Which form?` engine, styles & data:** `css/app.css`, `js/whichform.js`, `js/forms/de.js`, `js/forms/en.js`, `js/forms/ru.js`, `data/grammar_artikel.js`, `data/en/grammar_articles.js`, `data/ru/grammar_endings.js`, `data/links/forms_cross.js`
- **Roots & phrasal families:** `data/roots_geben.js`, `data/roots_schreiben.js`, `data/roots_sprechen.js`, `data/en/verbs_families_2.js`, `data/ru/roots_govor.js`, `data/ru/roots_smotr.js`, `data/ru/roots_zhiv.js`

---

## 3. Security, Logic & Content Audit Log (Found & Fixed)

All items below were audited across both ChatGPT's files and Gemini's Batches 1–6 and have **already been patched** in the working tree:

### Code & Data-Corruption Bugs (HIGH)
1. **`js/store.js` — `isDrillKey(k)` silently corrupted new `de-g-*` and `en-g-*` drill keys:**
   - **Root cause:** Fallback regex in `isDrillKey` was `/^(g-|grammar:|affix:|ru-g-|ru-sf-)/`. When `store.js` ran `normalize()` / `migrateCards()` during startup, language switching, sync, or `importJSON` before the target pack was loaded in `GT.byId`, ChatGPT's 23 `de-g-*` (`data/grammar_practice.js`) and 42 `en-g-*` (`data/en/grammar_practice.js`) drills failed `isDrillKey(k)` and were rewritten into `<id>#prod` keys, corrupting saved drill state.
   - **Fix applied:** Extended `isDrillKey(k)` to search `GT.packs[l].byId` across all loaded packs and updated fallback regex to `/^(g-|de-g-|en-g-|grammar:|affix:|ru-g-|ru-sf-)/`.
2. **`js/whichform.js` — Hardcoded `"Ending patterns"` broke English solo mode label:**
   - **Root cause:** ChatGPT replaced `solo.map(tab)` with a button hardcoding literal text `'Ending patterns'`. In English (`js/forms/en.js`), that solo button is `'a or an'` (and its `modeNote` explicitly refers to `"a or an"`).
   - **Fix applied:** Changed line 107 to `esc(patterns.label)` (`a or an` for EN, `Ending patterns` for DE/RU).
3. **`js/app.js` — Uncaught `URIError` crash on malformed `%` hashes + `reset-drills` + `Hide basics` `"soon"` mislabel:**
   - **Root cause:** Raw `decodeURIComponent` in 7 places (`renderNav`, `refreshChrome`, `hideSidePractice` handler, `parseQuery`, `route`, `curPath`) threw uncaught `URIError` on malformed hashes like `#/words/100%`. Also `reset-drills` used `location.hash.split('/')[2]` (breaking when `?` params existed), and `Hide basics` hiding 100% of a topic made `tile` / `viewProfessionalLanding` display `'soon'`.
   - **Fix applied:** Added `safeDecode`, switched `reset-drills` to `curPath()[1]`, and updated `viewProfessionalLanding` / `tile` to show `'hidden'` (without `.empty`) when `rawItemsFor(...).length > 0 && c.total === 0`.

### Security & Input Hardening (MEDIUM)
4. **`js/store.js` — Prototype pollution & untrusted settings poisoning via JSON import / sync:**
   - Added `safeKey(k)` filtering out `__proto__`, `constructor`, `prototype` in `migrateCards`, `normalize` (`cards`, `later`, `deleted`, `log`), `mergeLangData`, and `convertLegacyEnglish`.
   - Added `sanitizeSettings(src, allowClientId)` used on startup and `importJSON`. Imported JSON files (`allowClientId = false`) are blocked from injecting/overwriting `gdriveClientId` (which would redirect OAuth client identity), bounded for numeric settings (`newPerSession` `1..50`, `retention` `0.7..0.99`, `speechRate` `0.5..2`), type-checked for booleans/enums/voice strings, and disallowed from setting `knowLang === learnLang`.
5. **`js/app.js` (`parseQuery` & `c.sources`) + `js/packs/en.js` (`g.source`):**
   - `parseQuery` now initializes `Object.create(null)`.
   - External URLs in `c.sources` (`js/app.js`) and `g.source` (`js/packs/en.js`) are gated via `/^https?:\/\//i` (`safeHref`) with `rel="noopener noreferrer"` (blocks `javascript:` / `data:` URIs if malformed data were introduced).
6. **`js/whichform.js` + `js/forms/{de,en,ru}.js` — Defense-in-depth HTML/URL escaping:**
   - `js/whichform.js`: sanitized `sectionTitle` `id` (`[^a-zA-Z0-9_-]`), escaped `mo.id` in `data-v`, validated `act('mode')` via `modeOf(d, el.dataset.v)`, and wrapped `j.dataset.agJump` in `encodeURIComponent(...)` before `history.replaceState`.
   - Added `escHTML` around `chosen` in `js/forms/de.js` (`wrongHTML`, `endExplainHTML`, `trapGame.explain`), `js/forms/en.js` (`explainHTML`, `aanGame.explain`), and `js/forms/ru.js` (`wrongHTML`, `gExplain`).

### Content & Russian Stress Fixes
7. **Ambiguous Dativ sentence (`data/grammar_artikel.js:324`):**
   - Changed `"Diesmal glaube ich ___ Zeugen."` (ambiguous sg. `dem Zeugen` vs pl. `den Zeugen`, noted in ChatGPT handoff) to `"Nur ein Mann hat den Unfall gesehen. Diesmal glaube ich ___ Zeugen."` (`forms_cross.js` has no `t:` key for it).
8. **Russian `+` stress & pre-existing/overlay fixes:**
   - `data/ru/grammar_endings.js` & `js/forms/ru.js`: `сл+оварь` → `слов+арь` (ChatGPT item); `х+ороший` → `хор+оший` (synced across both files so declension & lookup match); `доех+ать` → `до+ехать`; `тр+амвай` → `трамв+ай`; `нет мол+ока` → `нет молок+а`; `Мне двадц+ать лет` → `Мне дв+адцать лет`.
   - `data/links/forms_cross.js:87`: `Мне двадц+ать лет` → `Мне дв+адцать лет`.
   - `data/ru/grammar_practice.js:142` & `data/i18n/ru.de.grammar_practice.js:24`: `<b>Если бы</b>` → `<b>+Если бы</b>` (verified rendered as `Е́сли бы` in both `EN → RU` and `DE → RU` via `config.js` `stressDeep`).
   - `data/ru/roots_govor.js`: `в с+убботу` → `в субб+оту`; `подп+исанием` → `подпис+анием`.
   - `data/ru/roots_smotr.js:26`: `з+аявку` → `за+явку`.
   - `data/ru/pro_more_3.js` (Gemini Batch 3): `монитор+инга` → `монит+оринга`; `кл+уб` → `клуб` (1-syllable); `д+ока / док+и` → `д+ока / д+оки`.
   - `data/links/cross.js:321`: replaced raw `+` inside `note` (`батар+ея` → `батаре́я`), because `GT.link` ONLY runs `normLinkStress` on `v[1]` display text, NOT on `note`.

---

## 4. Critical Architecture Invariants & Gotchas for Next Agent

1. **IDs are permanent (localStorage/sync FSRS progress is keyed by `id`).** Never delete or rename existing IDs. Always grep the entire pack (`headword` AND `id`) before adding entries; reuse existing cards across topics via `alsoIn` or `GT.addMember(id, tab, topic)` in `data/memberships.js` (or end of data file).
2. **`isDrillKey(k)` prefix contract (`js/store.js`):** Every reviewable drill ID MUST start with `g-`, `de-g-`, `en-g-`, `ru-g-`, `ru-sf-`, `grammar:`, or `affix:` — otherwise pre-load `normalize()` can misclassify it as `#prod`.
3. **Pack data schema differences:**
   - **German (`de`):** `pos: 'noun'|'verb'|'adj'|...`, `de` (aliased to `t`), `article` (`der`/`die`/`das`), `plural` (`''` if uncountable/singular-only, `'nur Plural'` if plural-only), verbs need `forms: { praes, praet, perf }` + optional `gov`. Inline glosses `ru` + `en`; `note` is RU string with `i18n: { en: { note: '...' } }`. Lowercase `level` (`'b1'`, `'b2'`, `'c1'`, `'c2'`). Separable verbs in `examples[].de` MUST wrap BOTH parts in `[[...]]` (e.g. `[[ficht]] ... [[an]]`).
   - **English (`en`):** `t`, `pos`, `level` (uppercase `'B2'`/`'C1'`/`'C2'`), `ru` + `de`, `examples: [{ t, ru, de }]`, `note: { ru, de }`. Check existing `en/pro_bureau_legal.js` for helper template.
   - **Russian (`ru`):** `t`, `pos`, `gender: 'm'|'f'|'n'|'pl'` (nouns), `aspect: 'impf'|'pf'` + `forms: { praes, praet, perf }` (verbs), `level` (uppercase), `en` + `de`, `note: { en, de }`. Stress rule: `+` immediately BEFORE stressed vowel; **NEVER before `ё`**; **NEVER on one-syllable words** (`p:в+где` style keys excluded).
4. **Cross-language links (`data/links/cross.js`):** Use `+` in `[id, displayText]` for Russian display text (`GT.link` calls `normLinkStress` on `v[1]`), **NEVER** leave raw `+` in `note` objects — use actual Unicode combining acute `́` (`\u0301`) in `note`. Link only true sense-level matches (`de ↔ en ↔ ru`).
5. **Parallel edits guard:** Always re-read `data/manifest.js` and `sw.js` immediately before editing. Bump `VERSION` in `sw.js` (`etrnl-v117` → `etrnl-v118`+) whenever files change. Never commit/push unless the user explicitly asks.
6. **Tooling constraints in this environment:**
   - Browser subagent (`webview_browser`) blocks `page.evaluate` (`EVALUATE_UNSUPPORTED_IN_WEBVIEW_BROWSER`). Verify runtime data packs via UI reloads + `Settings → Data` for all 3 packs (`de`, `en`, `ru`), test routes/buttons via DOM clicks, check mobile `375×812` via `boundingBox()` + `mouse.wheel`, and run local Python verification scripts to check JSON/stress/duplicates/`forms_cross` consistency.
   - Minor observed UI quirk: resizing a live desktop session directly down to `375×812` without reload can briefly leave a ~25px drawer strip from the previous layout; loading fresh at `375×812` renders cleanly (`main` width 360px, `horizontalScrollDelta = 0`).

---

## 5. Verification Status (Last Run on Current Working Tree)

- **Python static verification (`scratch/verify_b7_audit.py`):** exit code `0`. Verified 80 + 90 = 170 new German cards across all 17 topics, 0 ID/headword collisions against full DE pack, 38 `GT.addMember` IDs in `data/memberships.js` resolved, 0 stray `+` in `data/links/cross.js` `note` fields, 0 fixed Russian stress defects remaining, all `data/links/forms_cross.js` `t:` keys match existing sentences, and all core security patches present.
- **Browser UI verification (`http://localhost:8775/`, `etrnl-v117`):**
  - Sequential `Settings → Data` load (`de` → `en` → `ru`): all 3 reported `Validation: 0 data warnings.`, `584 cross-language links`, 0 missing files.
  - Verified DE `#/professional` (`0` `"soon"` tiles), new DE topics (`bureau_offices`, `legal_ip`, `legal_criminal`, `svc_gastro`, `med_clinical`) and card detail in `RU → DE` & `EN → DE`.
  - Verified EN `#/articles/play` renders `"a or an"` solo button, DE `#/articles/play` renders `"Ending patterns"`, `#/roots/geben` + `#/roots/vf-set` + `#/roots/говор`, `#/grammar/zeit-seit-vor`, `#/endings` (`хоро́ший` via `<span class="stress">`), `#/grammar/uslovie-by` (`Е́сли бы` in both `EN → RU` and `DE → RU` with zero raw `+`), malformed hash `#/words/100%` (graceful `Not found`), and `375×812` mobile viewport (`horizontalScrollDelta = 0` on fresh load).
  - **Limitation:** Direct console execution of `await GT.validateLinks()` / `GT.whichForm.check()` was not callable via `page.evaluate` due to `webview_browser` policy; per-pack `GT.validatePack` ran in-browser (`Settings → Data`), and cross-file/link/forms invariants were verified via Python.

---

## 6. Ordered Roadmap for Next Session

1. **Batch 8 — Russian (`ru`) Professional expansion (17 empty `#/professional` topics):**
   - Create `data/ru/pro_bureau_legal.js` (8 topics: `bureau_offices`, `bureau_tax`, `bureau_docs`, `legal_contracts`, `legal_ip`, `legal_criminal`, `legal_labour`, `legal_corporate`) and `data/ru/pro_service_ops.js` (9 topics: `svc_hotel`, `svc_gastro`, `svc_retail`, `fin_accounting`, `fin_marketing`, `fin_hr`, `med_clinical`, `ops_logistics`, `ops_trades`), aiming for ~10 curated B2–C2 cards per topic + `GT.addMember` reuses from existing RU cards (grep full `data/ru/` for headwords & IDs first!).
   - Wire into `GT_PACKS.ru` in `data/manifest.js` (before `basics.js`), bump `sw.js`, verify via Python + browser UI (`0` `"soon"` tiles in Russian!).
2. **Batch 9 — Cross-language links (`data/links/cross.js`):**
   - Connect real sense-level equivalents across `de ↔ en ↔ ru` for the newly added Bureaucracy, Legal, Service/HoReCa, Finance, HR, Clinical, Logistics, and Trades topics (using `en:pro5:*` / `en:pro6:*`, `pro-b5-*` / `pro-b6-*`, and the new Batch 8 RU IDs). Verify all links load cleanly with 0 warnings across all 3 packs.
3. **Words B2–C1 & Contemporary Expressions (`chunks` / `idioms` / `everyday`):**
   - Expand B2–C1 vocabulary across `de`, `en`, `ru` (remember German B1 needs Goethe Wortliste or higher-level `Berufswege`/B2–C1 curated words per user instruction), then natural contemporary chunks/idioms/everyday phrases classified in each pack's `expressions_cats.js`, plus cross-links.

*hand-off gemini*
