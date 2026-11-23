You are continuing work on my personal German vocabulary app **ETRNL / DEUTSCH**.
Project folder: `C:\Users\rando\Desktop\german train`. Before changing anything, read `README.md`, `index.html`, everything in `js/`, `css/app.css`, `data/manifest.js` and at least one file of each data type (`words_health.js`, `it_security_2.js`, `chunks_sample.js`, `grammar_passiv.js`, `roots_bauen.js`, `prefixes.js`). Then summarise what you found in 5–8 lines and wait for my go before building.

## About me
- Native Russian speaker living in Germany, level B1 (passed DTZ; reading/listening strong, active vocabulary fragmented).
- I work in IT as a SOC analyst and talk to non-technical colleagues all over the office.
- I practise speaking separately with an AI chat. This app is my knowledge base + spaced repetition, not a chatbot.

## Hard rules
- **Learning content in Russian** (meanings, example translations, notes, morpheme meanings, grammar explanations, pitfalls, drill explanations, WHY? notes). No English translations in data.
- **Interface in English** (tabs, buttons, labels like KNOW IT / REVIEW / DUE TODAY / WHY?).
- Runs by double-clicking `index.html` (file://) AND as a static site (Netlify Drop). No build step, no server, no fetch for data: data files are JS (`GT.register(...)` etc.) listed in `data/manifest.js` and loaded via script tags.
- Vanilla HTML/CSS/JS. Progress in localStorage + Export/Import JSON. PWA (manifest + `sw.js`, network-first; bump `VERSION` in `sw.js` after changing files).
- Design concept (keep it): void black `#04060A`, deep navy `#0B1A33`, ice-blue accent `#8CCBFF`, text `#EEF2F7`, muted `#9AA6B8`; der/die/das tags `#7FB2FF` / `#FF8FA3` / `#E9E4D8`; Space Grotesk (display), Inter (body), JetBrains Mono (uppercase letter-spaced labels and numbers); square 1px lines; constellation background; mobile bottom nav + slide-out sidebar.
- Data quality: correct articles, plurals, verb forms (Präsens 3rd person · Präteritum · Perfekt with haben/sein); natural B1 example sentences (mix of everyday and IT/work) with the target wrapped in `[[…]]` for cloze (separable verbs: mark both parts, e.g. `[[ruhen]] Sie sich [[aus]]`).
- B1 words come ONLY from the Goethe-Zertifikat B1 Wortliste (I have it as a PDF; ask me for it if you need to check a word). Skip obvious A1/A2 basics. Mark Austrian/Swiss-only entries with `region`. B2 themes and IT terms are curated (no official list).
- Russian connection (`ru_link`) only if well established: types `loan_in_russian`, `internationalism`, `shared_ancient_root`, `false_friend`; otherwise `null`.
- **Etymology (WHY?) rules, strict:** only DWDS/Pfeifer, Wiktionary or Vasmer-level facts. If uncertain, write «Происхождение спорное» or omit `why`. Never invent a story. Popular calque stories must say «часто приводят как кальку» unless clearly established. 2–6 short sentences. Every `why` has `confidence: 'high' | 'medium'`, a `source` and an `evidence` note (see "Semantic accuracy" below); only `high` is shown by default (Settings toggle shows medium).
- Work in phases: build, let me check, then continue in batches (~75–100 entries per batch, split into files of ~25). Don't regenerate existing entries; ids are permanent (progress is stored by id).

## Architecture (current)
- `js/core.js`: `GT.register({tab, topic, items})`, `GT.registerGrammar(page)`, `GT.registerRoot(root)`, `GT.registerPrefix(p)`.
- `js/topics.js`: tabs (Words, IT & Security, Chunks, Grammar, Roots, Review, Stats), topics with Russian `scenario` for the practice prompt, `GT.ROOT_PLAN`, `GT.PREFIX_PLAN`.
- `js/fsrs.js`: FSRS-5 scheduler. `js/store.js`: progress/settings/export. `js/app.js`: router (hash routes), all views, learn/review sessions, practice prompt (Russian; the AI speaks German, corrections in Russian at the end of each exchange), stats, settings, Roots tab, WHY? sheet.
- "Know it" = marked known, never reviewed. Review modes: Russian meaning → German, cloze, optional typing.

## Data schemas (see existing files for exact style)
- Word: `id, pos, de, article, plural, forms{praes,praet,perf}, gov, ru, examples[{de,ru}], morph, root, parts[[morpheme, ru]], family[], note, why{confidence,text,source,evidence,root?}, ru_link` (+ `transparency` on derived words after step 0). Currently `why` has no `source`/`evidence` yet and roots use the boolean `lost`; step 0 migrates both. IT words also `usage{says:'english'|'german'|'both', note}`. B2 words `level:'b2'`.
- Chunk: `id, topic(function), topics[situation ids], de (with [X] slots), register, ru, examples[{de,ru}], variations[], note`.
- Grammar page: `id, title, summary, explanation(html), tables, examples, pitfalls[{title,html}], drills[{id,kind:'gap'|'choice'|'reorder',…,explain}]`.
- Root: `GT.registerRoot({id, verb, ru, words:[word + base|prefix|sep:'trennbar'|'untrennbar'|stress|parallel|lost→transparency|core|drill{ru,de}], pairs:[{a:{stress,sep,ru,ex},b:{…}}]})`.
- Prefix: `GT.registerPrefix({id, label, sep, stress, ru, meanings:[{ru, ruPrefix, note?, examples:[{de,ru}]}], match(html), grammar(html)})`.

## Current state
- Words: Health & Doctor 85 (complete B1 batch), Work 8, Everyday 3, B2 Career Paths 8.
- IT & Security: Cybersecurity 94 (complete batch, SOC-weighted), Workplace Communication 5, Dev 3, Infra 3.
- Chunks 25. Grammar: Konjunktiv II, Nebensätze, Passiv (8 drills each).
- Roots: BAUEN, STELLEN, ZIEHEN complete; prefixes ab-, auf-, an-, ver-; prefix drill.
- WHY?: notes on the original sample words, root words and some Cybersecurity terms. Missing on Health batches 2–4 and most Cybersecurity terms.

## ROOTS tab + WHY? spec (my original request, phase 1 already approved)

### 1. Top tab ROOTS
A reference + trainer for word roots and prefixes, the biggest vocabulary gap between A2 and B1.
Left sidebar, two sections:
- ROOTS: 50–80 core roots, e.g. stellen, setzen, legen, ziehen, nehmen, geben, halten, kommen, gehen, schlagen, sprechen, sehen, bauen, fallen, stehen, tragen, führen, schreiben, brechen, laufen.
- PREFIXES: auf-, ab-, an-, aus-, ein-, mit-, nach-, vor-, zu-, um-, über-, durch-, ver-, be-, er-, ent-, zer-, ge-, miss-.

Root page (e.g. BAUEN):
- Base verb in the center, with a Russian meaning.
- A "map" of derived words drawn with thin 1px lines (constellation style): aufbauen, abbauen, anbauen, ausbauen, umbauen, einbauen, verbauen, bebauen + key nouns (der Bau, der Aufbau, das Gebäude, der Ausbau).
- For each derived word: Russian meaning, one B1 example sentence with Russian translation, and the Russian prefix parallel when one really exists (umbauen → ПЕРЕстраивать, anbauen → ПРИстраивать, abbauen → РАЗбирать / сокращать).
- Mark clearly when the meaning became figurative and the link to the root is lost: label "СМЫСЛ УШЁЛ" (aufhören has nothing to do with «слушать»; verstehen nothing to do with «стоять»). Don't invent logic to connect them.
- Mark each verb trennbar/untrennbar and show stress-based pairs (úmfahren — сбить / umfáhren — объехать; übersétzen — переводить / ǘbersetzen — переправлять).
- Every derived word can be added to Review with one tap.

Prefix page (e.g. AB-):
- Typical meanings in Russian (ab- = от-, с-, раз-: прочь, вниз, отделение, уменьшение), each with 3–4 example verbs from different roots.
- Russian prefix equivalents and where they match / don't match.
- Separable or not; behaviour in Perfekt (abgebaut) and in subordinate clauses.

Drill mode inside ROOTS: show the root + a Russian meaning; I pick or type the correct prefix verb (e.g. «сокращать рабочие места» → Stellen ___bauen → ab).

### 2. WHY? button on every word card
A small mono "WHY?" button on each word card in all tabs. It opens a side panel / bottom sheet «Почему так» in Russian, 3–6 sentences:
- Where the word comes from and how its meaning developed (short historical note).
- How the parts produce the meaning (e.g. Über-weis-ung: «направлять на ту сторону» → направление к врачу / перевод денег).
- If relevant: a calque or parallel in Russian, or the same Latin/Greek model behind both words (e.g. Gegenstand and «предмет» both copy Latin ob-iectum, «брошенное перед»).
- If the root exists in the ROOTS tab, a link "→ open root BAUEN".

### Data
- Separate files: `data/roots_*.js`, `data/prefixes.js`, plus a `why` field in word entries.
- Phased: phase 1 (3 roots, 4 prefixes, WHY? for sample words) is done; the rest goes in batches after my approval.

## Semantic accuracy and active recall (new rules, apply to all data and features)
- Distinguish morphological composition, historical etymology, and modern semantic transparency. Never present a mnemonic analogy as a historical fact.
- Every WHY entry must include a source reference and a short evidence note. Omit claims that cannot be verified.
- Analyze compounds at correct morpheme boundaries (e.g. Sprechstunde = Sprech- + Stunde).
- Mark derived words as transparent, figurative, or opaque. Semantic opacity does not imply absence of etymological relation.
- Add bidirectional drills: Russian meaning → German word, and German sentence → explain prefix choice.
- Use contextual examples to disambiguate polysemous verbs.
- Prioritize high-frequency B1 vocabulary, not maximum family size.
- Track recognition and production separately in Review.
- Show 6–8 common derivatives by default, with the rest expandable.

How this changes the current code and data (do this as step 0, before new batches; show me the plan first):
- **WHY schema:** extend `why` to `{ confidence, text, source, evidence, root? }`. `source` = short reference (e.g. "DWDS (Pfeifer), s.v. Erfahrung", "Wiktionary: erfahren", "Vasmer: касса"); `evidence` = one line on what the source actually says. Show the source in the WHY? panel. Existing `why` entries have no source/evidence: verify each one; add source + evidence where verifiable, otherwise rewrite or remove the claim. In `text`, keep three things visibly separate: how the word is built today (morphology), where it historically comes from (etymology), how transparent the meaning is now. Label any memory aid explicitly as «мнемоника, не этимология».
- **Morpheme boundaries:** fix `parts` that split stems wrongly. E.g. Sprechstunde is currently `sprech / stund / -e`; it should be `Sprech- + Stunde`. Split at real boundaries (prefix, stem, linking element, suffix, compound members), not by syllable. Review all existing `parts`.
- **Transparency:** replace the boolean `lost` with `transparency: 'transparent' | 'figurative' | 'opaque'` on every derived word (roots tab and words with `parts`). Show it as a tag. "СМЫСЛ УШЁЛ" becomes the label for `opaque`; `figurative` gets its own label (e.g. «ПЕРЕНОСНОЕ»). Opaque does NOT mean unrelated: if the etymological link to the root exists, the WHY? note may say so (with source), while the tag stays opaque.
- **Polysemous verbs:** each meaning of a polysemous verb (einstellen, abnehmen, anstellen, ausbauen, beziehen, …) gets its own example sentence that makes that meaning unambiguous; label the meaning next to the example. Cloze/recall must use the example tied to the meaning being asked.
- **Root pages:** show 6–8 high-frequency derivatives on the map by default (add a `freq`/`core: true` marker in data), the rest behind a "Show all (N)" expander. When choosing derivatives, prefer common B1 words over completeness.
- **Drills (both directions):** (a) Russian meaning → German word (pick or type the prefixed verb, as now); (b) German sentence with the verb → explain the prefix choice: pick which meaning of the prefix applies (options from the prefix's `meanings`), then see the explanation. Both can be added to Review.
- **Review: recognition vs production.** Track two separate FSRS cards per item: recognition (German → Russian meaning) and production (Russian meaning / cloze → German). Store them as `<id>#rec` and `<id>#prod` (migrate existing progress: current cards become `#prod`; keep "Know it" behaviour for both). Stats show both counts. Review filters can choose recognition, production or both.

## Next steps (in this order, one batch per turn, ask me before each)
0. Apply "Semantic accuracy and active recall" to the existing code and data (see above).
1. Roots batch 2: setzen, legen, nehmen, geben, halten (same depth as bauen/stellen/ziehen: 8–12 derived verbs + 3–6 nouns, stress pairs where they exist).
2. Prefixes batch 2: aus-, ein-, um-, über-, vor-, zu-.
3. WHY? for Health batches 2–4 and the Cybersecurity terms (strict rules; omit when unsure).
4. Remaining roots (kommen, gehen, schlagen, sprechen, sehen, fallen, stehen, tragen, führen, schreiben, brechen, laufen, then more up to 50–80) and remaining prefixes (mit-, nach-, durch-, be-, er-, ent-, zer-, ge-, miss-).
5. Next Words topics from the Goethe list (Work & Career full batch, then Authorities, Home, …) and Grammar pages still marked "soon".

## How to check your work
- Add every new data file to `data/manifest.js`. Bump `VERSION` in `sw.js`.
- Serve the folder (`python -m http.server 8765`) and open it. In the browser console check that `GT.loadErrors` and `GT.duplicates` are empty, every item has `ru`, every example has `ru` and `[[`, nouns have `article`, verbs have `forms`, every `why` has a valid `confidence`. No console errors.
- Also open `index.html` directly (file://) once to confirm it still works without a server.
