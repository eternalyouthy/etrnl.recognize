# Preview validation — 2026-11-23

## Balanced content expansion

- **741 canonical vocabulary/expression records**, **45 families / 353 family senses**, **30 grammar topics / 60 grammar questions**. Words has 219 unique items, Professional 217, Chunks 66, Idioms 25 and Everyday Phrases 22. Shared references are counted separately by section but remain one canonical record.
- Added 128 vocabulary records: 20 everyday words, 50 professional items, 10 chunks, 10 idioms, 10 everyday phrases and 28 senses in five families (OBSERVE, COMPARE, PREDICT, MAINTAIN, ADAPT). Added six grammar lessons with recognition and typed production.
- `node --test english/tests/validate.cjs`: **21 passed, 0 failed**. All 613 previous vocabulary records, all previous families and grammar records are compared byte-for-byte with the pre-expansion load. Every new record is reachable from a topic, and old topic rosters remain an unchanged prefix of the expanded rosters. No existing card IDs or saved learner records are migrated.
- Existing tests validate every contextual answer, morphological spelling, topic references and graph links. New tests exercise family derivative/due queues, the 12 new grammar questions in due review, new-data export/import and old known/deferred backups.
- Separate hidden-browser QA at port 8768 verified the new Home & Living count and a search for utility bill. Its detail card displayed its Russian meaning, example and note; Learn it enrolled it successfully. The new MAINTAIN graph rendered all five senses.
- The new idiom a blessing in disguise displayed its example, Russian note and variation. A full Polite indirect questions session accepted recognition and typed production answers, finished 2/2 and scheduled both cards. Browser error/warning inspection returned none. Only the isolated QA origin received test progress; the user's Chrome was not used.
- New vocabulary labels remain explicitly CEFR-unrated with editorial study targets. Structural/software checks do not independently certify linguistic completeness. Previous validation sections below are historical snapshots with their then-current counts.

## German-style topic and Learn workflow

- Added topic-only sidebars, the New / Learning / Known / Due overview, compact Browse lists, individual item routes and one-word Learn sessions. Existing Roots, Grammar and Learning Studio views remain available.
- Automated checks: **19 passed, 0 failed**. New tests cover known/deferred choices, unchanged rating counts, due-queue exclusion, re-enrolment, saved choices, old version-one imports and atomic rejection of invalid status/deferred data.
- Browser QA used a separate hidden in-app browser at `127.0.0.1:8768`; its learner cards are isolated from the existing `8765`, `8766` and direct-file origins. The user's Chrome is no longer used for QA.
- Health overview and Learn opened. WHY? expanded and collapsed. Know it, Learn it and Later advanced to the next word; the overview then showed 9 New / 1 Learning / 1 Known / 1 Due. Reload preserved these choices.
- Topic Review produced exactly two directions for treatment; symptom, marked known, was excluded. Browse showed known/learning/new statuses and opened the standalone symptom card.
- At 1920px, the topic panel measured 960px and began at x=630, matching the reference alignment. At 375px, there was no horizontal overflow. Mobile topic navigation opened, selected Travel & Transport, closed and focused the main content. Its Learn card rendered without overflow. Escape ended the lesson.
- Keyboard dropdown navigation opened Professional → Security and Language → Roots. Roots restored its original reference sidebar. Browser console inspection returned no errors or warnings. Temporary viewport overrides were reset.
- Reference files `../index.html`, `../css/app.css`, `../js/app.js` and `../js/store.js` matched the hashes captured before this change. German source was only read.
- Speech controls rendered; actual speech playback was not verified. Exhaustive interaction across every word remains outside this check.

## Navigation and content update

- `node --test english/tests/validate.cjs`: **17 passed, 0 failed** after the content/navigation update.
- 613 canonical records: 15 new idioms, 12 everyday phrases and 39 professional items; 244 records are CEFR-unrated. Existing entries are compared against the original load order and remain unchanged.
- All legacy IT topic items are included in their corresponding Professional contexts. New recognition, translation, cloze, mixed and due-only topic pools remain scoped. New cards round-trip through the existing progress export/import format.
- Desktop navigation is centered on the header midpoint. Narrow layouts retain a separate navigation row and the existing sidebar toggle.
- Current browser QA was not completed: the sandbox loopback connection was inaccessible and the subsequent Chrome check was stopped with the physical Escape key. Dropdown hover/touch behavior, responsive centering and speech playback still need live verification. The browser evidence below describes the previous application version.

## Completed

- `node --test english/tests/validate.cjs`: **15 passed, 0 failed**.
- Same-load-order script compilation; no duplicate IDs, broken references, family graph cycles or catalogue validation errors.
- Final catalogue: 40 families, 325 family senses, 120 original curriculum entries, 64 new topical word/senses and 38 new chunks, 19 prefixes, 19 suffixes, 9 classical roots, 24 grammar topics / 48 grammar questions.
- Source scopes: 344 sense-level primary labels, 25 word/POS primary labels, 178 unrated entries; 131 sense-rated B2 entries. `node english/tests/summarize.cjs` reproduces the counts. No final entry keeps a guessed CEFR label.
- All 547 vocabulary entries generate valid contextual answers in four vocabulary modes. All affix recognition and grammar recognition/production questions are answerable. Morphological spelling parts reconstruct every headword.
- Progress isolation, scheduling only after grading, due queues, legacy grammar-backup compatibility, rejection of affix production, atomic import validation, storage failure and escaping passed.
- A synthetic registry loaded 200 families without a runtime maximum.
- HTTP readiness: index, stylesheet, 16 application/data scripts and five documents returned nonempty HTTP 200 responses (23 paths).

## Browser checks completed

The in-app browser successfully reached the loopback server after it was started outside sandbox network isolation. Earlier access failures are superseded for HTTP verification.

- ROOTS landing and ACT family opened; Show all displayed all 17 then-current ACT senses and collapsed back to core. Subsequent appended senses loaded with final catalogue counts.
- FORM displayed its distinct document/grammar/style meanings and expanded source-scope information.
- Vocabulary B2 filter plus `connection` search returned only the relation sense, excluding its B1 joining sense.
- All 24 grammar topics rendered. A two-question grammar session checked recognition, wrong-answer feedback, disabled Good/Easy after error, typed production, correct-answer feedback and completion.
- Recognition and production showed separate persisted cards after reload. Export downloaded English JSON; browser import of that export succeeded with the visible confirmation. The initial loopback origin had no learner cards; QA added one recognition and one production card for `grammar:perfect`.
- Affix list rendered 19 prefix practice controls; exhaustive affix interaction was not performed.
- Desktop rendering was inspected with full-page screenshots. Console error/warning inspection returned no messages during the checked flows.
- Practice centering fix: `.study-layout` has automatic inline margins. At viewport 1920px, the 900px panel had equal 340px gaps within the main area. At 375px, it measured 335px wide with 20px left padding and no page overflow. Screenshots: `tests/centered-practice.jpg`, `tests/mobile-practice.jpg`, `tests/grammar-feedback.jpg`.
- Temporary viewport overrides were reset.

## Thematic expansion browser checks

- Default Words landing rendered all 18 topic cards. IT rendered 4; Chunks rendered 13. Original vocabulary categories, ROOTS, grammar, review and progress routes remain present.
- Health & Doctor rendered its 11 canonical items; Practise this topic preselected `words:health`. A recognition session contained 10 in-scope senses, excluding the known C1 extension; a correct infection answer showed feedback without grading or enrolling it.
- Explaining a bug opened its own speaking scenario and generated vocabulary list. Copying showed the browser confirmation. The read-only prompt contents were inspected; no external chat submission was made.
- Typed production for the IT chunk accepted American `behavior` for British `behaviour`.
- Infrastructure search for bandwidth returned one scoped entry with a null CEFR label and separate B2 study target.
- Mobile topic navigation/search selected Software Development and closed the menu. At 375px, the page had no horizontal overflow. The Stats alias rendered its table within the mobile content width.
- Desktop Words at 1440px showed all top navigation sections without page overflow. Console error/warning inspection returned none; viewport overrides were reset.
- Screenshots: `tests/sections-words.jpg`, `tests/sections-mobile.jpg`. Earlier screenshots document the preceding centering/grammar pass.
- New tests verify populated section counts, reference integrity, topic-only/due-only pools, shared canonical progress and the new sense/spelling distinctions.

## Not established

- Actual `file://` execution: the browser tool allows only HTTP/HTTPS and rejected the file protocol. No workaround or alternative browser route was attempted. The module is implemented with local classic scripts and no runtime fetch, but direct-file execution remains unverified here.
- Exhaustive interaction across every practice mode, category, affix and all responsive routes/breakpoints.
- Full linguistic/curricular completeness or learner proficiency. Reference/editorial review and software tests do not establish a complete B2 course. Family coverage, individual affix exceptions/productivity and independent language review remain open; see SOURCES.md and COVERAGE.md.

## Concurrent German development

`tests/parent-baseline.json` records the initial shared-file hashes. Subsequent tests observed German and shared-file changes by the concurrent task and reported them without reverting them. All writes by this task were inside `english/`. The English module did not change host navigation, German progress, shared CSS or the shared service worker.
