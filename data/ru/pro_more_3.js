/* RUSSIAN Professional · fourth batch (70 new cards + 2 reused memberships across all 10 Pro topics; B1, B2 and C1).
 * Stress marked with "+" before the stressed vowel (never before ё; one-syllable words unmarked).
 * Checked against full Russian pack inventory for zero duplicates. Glosses & notes: en + de. Original examples. */
(function () {
  'use strict';
  function ex(t, en, de) { return { t: t, en: en, de: de }; }
  function nt(n) { return n ? { en: n[0], de: n[1] } : undefined; }
  function N(id, t, gender, level, en, de, e, note) {
    return { id: 'ru-pro5-' + id, pos: 'noun', t: t, gender: gender, level: level, en: en, de: de, examples: [e], note: nt(note) };
  }
  function V(id, t, aspect, level, forms, en, de, e, note) {
    return { id: 'ru-pro5-' + id, pos: 'verb', t: t, aspect: aspect, level: level, forms: { praes: forms[0], praet: forms[1], perf: forms[2] }, en: en, de: de, examples: [e], note: nt(note) };
  }
  function A(id, pos, t, level, en, de, e, note) {
    return { id: 'ru-pro5-' + id, pos: pos, t: t, level: level, en: en, de: de, examples: [e], note: nt(note) };
  }
  function reg(topic, items) { GT.register({ tab: 'it', topic: topic, items: items }); }

  /* ── 01 · Дизайн, UX и визуал (8 new) ────────────────────────────────────── */
  reg('design', [
    N('interfeys', 'интерф+ейс', 'm', 'B1', 'user interface (UI)', 'die Benutzeroberfläche, das Interface',
      ex('Прост+ой [[интерф+ейс]] сократ+ил числ+о вопр+осов в подд+ержку вдв+ое.', 'A simple interface cut support questions in half.', 'Eine einfache Oberfläche halbierte die Supportanfragen.'),
      ['Everyday IT and UX term; user interface = п+ользовательский интерф+ейс.', 'Alltagsbegriff in IT und UX; Benutzeroberfläche = п+ользовательский интерф+ейс.']),
    N('shrift', 'шрифт', 'm', 'B1', 'font, typeface', 'die Schriftart, die Schrift',
      ex('Для табл+иц л+учше в+ыбрать [[шрифт]] с р+овными ц+ифрами.', 'For tables it is better to choose a font with aligned figures.', 'Für Tabellen wählt man besser eine Schriftart mit gleich breiten Ziffern.'),
      ['One-syllable masculine noun; the stress stays on the stem: шр+ифты, шр+ифтов.', 'Einsilbiges Maskulinum; die Betonung bleibt auf dem Stamm: шр+ифты, шр+ифтов.']),
    N('ierarhiya', 'иер+архия', 'f', 'B2', 'hierarchy (visual hierarchy)', 'die Hierarchie (visuelle Hierarchie)',
      ex('Чёткая визу+альная [[иер+архия]] ср+азу ведёт взгляд к гл+авной кн+опке.', 'Clear visual hierarchy immediately guides the eye to the main button.', 'Eine klare visuelle Hierarchie lenkt den Blick sofort zum Hauptbutton.'),
      ['Stress on -а- (иера́рхия); used for both layouts and company structure.', 'Betonung auf a (иера́рхия); gilt für Layouts wie für Firmenstrukturen.']),
    N('komponent', 'компон+ент', 'm', 'B2', 'component (UI component)', 'die Komponente',
      ex('Обнов+или +этот [[компон+ент]] в библиот+еке, и он измен+ился на всех экр+анах.', 'We updated this component in the library and it changed across every screen.', 'Wir aktualisierten diese Komponente in der Bibliothek, und sie änderte sich überall.'),
      ['Masculine in Russian (unlike German feminine die Komponente); plural: компон+енты.', 'Im Russischen Maskulinum (anders als dt. die Komponente); Plural: компон+енты.']),
    N('vyravnivanie', 'выр+авнивание', 'n', 'B2', 'alignment', 'die Ausrichtung',
      ex('Пров+ерь [[выр+авнивание]] загол+овков по л+евому кр+аю с+етки.', 'Check the alignment of headings to the left edge of the grid.', 'Prüfe die Ausrichtung der Überschriften am linken Rand des Rasters.'),
      ['From выр+авнивать (“to align”); left-aligned = выр+авнивание по л+евому кр+аю.', 'Zu выр+авнивать („ausrichten“); linksbündig = выр+авнивание по л+евому кр+аю.']),
    N('adaptivnost', 'адапт+ивность', 'f', 'B2', 'responsiveness (responsive design)', 'die Anpassungsfähigkeit, responsives Design',
      ex('Мы пров+ерили [[адапт+ивность]] к+арточек на +узком экр+ане телеф+она.', 'We checked the cards’ responsiveness on a narrow phone screen.', 'Wir prüften das responsive Verhalten der Karten auf einem schmalen Handybildschirm.'),
      ['In web design teams, responsive layout is often informally called адапт+ив.', 'In Webteams oft kurz адапт+ив für responsives Layout.']),
    N('navigatsiya', 'навиг+ация', 'f', 'B1', 'navigation (UI flow)', 'die Navigation, die Nutzerführung',
      ex('П+осле редиз+айна [[навиг+ация]] в прилож+ении ст+ала кор+оче на два ш+ага.', 'After the redesign, navigation in the app became two steps shorter.', 'Nach dem Redesign wurde die Navigation in der App zwei Schritte kürzer.'),
      ['Covers both app menus and GPS navigation.', 'Gilt für App-Menüs ebenso wie für GPS-Navigation.']),
    A('peregruzhenny', 'adj', 'перегр+уженный', 'B2', 'cluttered, overloaded (UI)', 'überladen, unübersichtlich',
      ex('Из-за л+ишних б+аннеров гл+авный экр+ан к+ажется [[перегр+уженным]].', 'Because of extra banners the home screen looks cluttered.', 'Wegen unnötiger Banner wirkt der Startbildschirm überladen.'),
      ['From перегруз+ить (“to overload”); describes both cluttered screens and busy schedules.', 'Zu перегруз+ить („überlasten“); für überladene Oberflächen wie für volle Zeitpläne.'])
  ]);

  /* ── 02 · ИИ, данные и аналитика (8 new + 1 reused) ──────────────────────── */
  GT.addMember('ru-w3-algoritm', 'it', 'ai_data');
  reg('ai_data', [
    N('dataset', 'датас+ет', 'm', 'B2', 'dataset', 'der Datensatz',
      ex('П+еред обуч+ением н+ужно оч+истить [[датас+ет]] от дублик+атов.', 'Before training we need to clean the dataset of duplicates.', 'Vor dem Training müssen wir den Datensatz von Duplikaten bereinigen.'),
      ['Standard ML loanword alongside наб+ор д+анных; masculine, plural датас+еты.', 'Gängiger ML-Begriff neben наб+ор д+анных; Maskulinum, Plural датас+еты.']),
    N('razmetka', 'разм+етка', 'f', 'B2', 'data labelling, annotation; markup', 'die Datenkennzeichnung, das Markup',
      ex('К+ачественная [[разм+етка]] д+анных занял+а две нед+ели.', 'High-quality data labelling took two weeks.', 'Die hochwertige Datenkennzeichnung dauerte zwei Wochen.'),
      ['Also means HTML/Markdown markup (яз+ык разм+етки); verb: разм+етить.', 'Bedeutet auch Auszeichnungssprache (HTML-Markup); Verb: разм+етить.']),
    N('zakonomernost', 'законом+ерность', 'f', 'B2', 'pattern, regularity', 'das Muster, die Gesetzmäßigkeit',
      ex('Мод+ель нашл+а скр+ытую [[законом+ерность]] в повед+ении покуп+ателей.', 'The model found a hidden pattern in customer behaviour.', 'Das Modell fand ein verstecktes Muster im Kaufverhalten.'),
      ['Compound of зак+он (“law”) + м+ера (“measure”); natural Russian equivalent of “pattern”.', 'Aus зак+он („Gesetz“) + м+ера („Maß“); natürliches russisches Pendant zu „Pattern“.']),
    N('pogreshnost', 'погр+ешность', 'f', 'C1', 'margin of error, inaccuracy', 'die Messabweichung, die Fehlertoleranz',
      ex('При так+ой м+алой в+ыборке [[погр+ешность]] расчёта сл+ишком велик+а.', 'With such a small sample, the margin of error is too large.', 'Bei einer so kleinen Stichprobe ist die Messabweichung zu groß.'),
      ['Standard statistical and engineering word for tolerable measurement error.', 'Fachbegriff in Statistik und Technik für statistische Abweichung / Fehlerbreite.']),
    N('dashbord', 'дашб+орд', 'm', 'B2', 'dashboard (analytics)', 'das Dashboard',
      ex('+Утром ком+анда открыв+ает [[дашб+орд]] с ключев+ыми м+етриками.', 'In the morning the team opens the dashboard with key metrics.', 'Morgens öffnet das Team das Dashboard mit den wichtigsten Kennzahlen.'),
      ['Everyday analytics term; formal Russian equivalent: пан+ель монит+оринга.', 'Alltagsüblicher Analytics-Begriff; formeller: пан+ель монит+оринга.']),
    N('analitika', 'анал+итика', 'f', 'B1', 'analytics', 'die Analytik, die Datenanalyse',
      ex('Продукт+овая [[анал+итика]] показ+ала, на как+ом ш+аге ух+одят п+ользователи.', 'Product analytics showed at which step users drop off.', 'Die Produktanalytik zeigte, bei welchem Schritt Nutzer abspringen.'),
      ['Uncountable feminine noun; an analyst is анал+итик (m.).', 'Unzählbares Femininum; der Analyst heißt анал+итик.']),
    V('obezlichivat', 'обезл+ичивать', 'impf', 'B2', ['обезл+ичиваю, обезл+ичиваешь', 'обезл+ичивал', 'pf. обезл+ичить'], 'to anonymise (data)', 'anonymisieren',
      ex('П+еред перед+ачей в тест мы обяз+ательно [[обезл+ичиваем]] б+азу кли+ентов.', 'Before handing it over to testing we always anonymise the customer database.', 'Vor der Übergabe an den Test anonymisieren wir stets die Kundendatenbank.'),
      ['Literally “remove the face/identity” (без + лиц+о); noun: обезл+ичивание.', 'Wörtlich „entpersönlichen“ (без + лиц+о); Substantiv: обезл+ичивание.']),
    V('klassifitsirovat', 'классифиц+ировать', 'impf', 'B2', ['классифиц+ирую, классифиц+ируешь', 'классифиц+ировал', 'pf. классифиц+ировать'], 'to classify', 'klassifizieren',
      ex('Нейрос+еть ум+еет [[классифиц+ировать]] обращ+ения по т+еме и ср+очности.', 'The neural network can classify requests by topic and urgency.', 'Das neuronale Netz kann Anfragen nach Thema und Dringlichkeit klassifizieren.'),
      ['Biaspectual verb (-ировать); often paired with по + Dative (по т+еме).', 'Zweiaspektiges Verb auf -ировать; häufig mit по + Dativ (по т+еме).'])
  ]);

  /* ── 03 · Продукт и Agile (8 new + 1 reused) ─────────────────────────────── */
  GT.addMember('ru-w3-kompromiss', 'it', 'product');
  reg('product', [
    N('dorozhnaya-karta', 'дор+ожная к+арта', 'f', 'B2', 'roadmap', 'die Roadmap, der Fahrplan',
      ex('Мы обнов+или [[дор+ожную к+арту]] прод+укта на сл+едующее полуг+одие.', 'We updated the product roadmap for the next half-year.', 'Wir haben die Produkt-Roadmap fürs nächste Halbjahr aktualisiert.'),
      ['Calque of “roadmap”; in IT teams people also say роудм+ап.', 'Lehnübersetzung von „Roadmap“; in IT-Teams hört man auch роудм+ап.']),
    N('beklog', 'бэкл+ог', 'm', 'B2', 'backlog', 'das Backlog, der Arbeitsvorrat',
      ex('К+аждую п+ятницу мы разбир+аем [[бэкл+ог]] и убир+аем устар+евшие зад+ачи.', 'Every Friday we groom the backlog and remove outdated tasks.', 'Jeden Freitag pflegen wir das Backlog und entfernen veraltete Aufgaben.'),
      ['Masculine Agile loanword; plural: бэкл+оги.', 'Maskuliner Agile-Anglizismus (im Unterschied zu dt. das Backlog).']),
    N('retrospektiva', 'ретроспект+ива', 'f', 'B2', 'retrospective (sprint retro)', 'die Retrospektive',
      ex('На [[ретроспект+иве]] мы договор+ились сократ+ить числ+о созв+онов.', 'At the retrospective we agreed to cut the number of calls.', 'In der Retrospektive einigten wir uns darauf, weniger Calls zu machen.'),
      ['In daily Agile speech often shortened to р+етро.', 'Im Agile-Alltag meist kurz р+етро genannt.']),
    N('gipoteza', 'гип+отеза', 'f', 'B2', 'hypothesis', 'die Hypothese',
      ex('П+еред разраб+откой мы провер+яем [[гип+отезу]] на прост+ом протот+ипе.', 'Before building, we test the hypothesis on a simple prototype.', 'Vor der Entwicklung prüfen wir die Hypothese an einem einfachen Prototyp.'),
      ['Typical verbs: выдв+инуть / пров+ерить / подтверд+ить гип+отезу.', 'Typische Verben: выдв+инуть (= aufstellen) / пров+ерить (= prüfen) гип+отезу.']),
    N('funktsional', 'функцион+ал', 'm', 'B2', 'functionality, feature set', 'der Funktionsumfang',
      ex('Б+азовый [[функцион+ал]] уж+е гот+ов, ост+ались т+олько настр+ойки +экспорта.', 'The core functionality is ready; only export settings remain.', 'Der Grundfunktionsumfang ist fertig, es fehlen nur noch Exporteinstellungen.'),
      ['Very common in Russian IT speech for “set of features”; formal written alternative: функцион+альность.', 'In der russischen IT-Sprache Standard für „Funktionsumfang“; förmlicher: функцион+альность.']),
    N('zapusk', 'з+апуск', 'm', 'B1', 'launch, rollout', 'der Start, die Markteinführung',
      ex('[[З+апуск]] н+ового тар+ифа заплан+ирован на нач+ало +осени.', 'The launch of the new plan is scheduled for early autumn.', 'Der Start des neuen Tarifs ist für Anfang Herbst geplant.'),
      ['Stress on first syllable (за́пуск); verb: запуск+ать / запуст+ить.', 'Erstbetonung (за́пуск); Verb: запуск+ать / запуст+ить (= starten / launchen).']),
    N('vovlechennost', 'вовлечённость', 'f', 'B2', 'engagement (user/employee engagement)', 'die Einbindung, das Engagement',
      ex('Кор+откие подск+азки пов+ысили [[вовлечённость]] н+овых п+ользователей.', 'Short tips increased new-user engagement.', 'Kurze Tipps steigerten das Engagement neuer Nutzer.'),
      ['Written with ё (always stressed); measures active participation in a product or team.', 'Mit stets betontem ё; misst aktive Nutzung oder Mitarbeiterbindung.']),
    V('vnedryat', 'внедр+ять', 'impf', 'B2', ['внедр+яю, внедр+яешь', 'внедр+ял', 'pf. внедр+ить'], 'to implement, roll out, adopt', 'einführen, umsetzen',
      ex('Мы начин+аем [[внедр+ять]] н+овую сист+ему учёта по одн+ому отд+елу в м+есяц.', 'We are rolling out the new tracking system one department per month.', 'Wir führen das neue Erfassungssystem Abteilung für Abteilung ein.'),
      ['Key business/IT verb for introducing new software or processes; noun: внедр+ение.', 'Zentrales IT-/Business-Verb für das Einführen neuer Systeme; Substantiv: внедр+ение.'])
  ]);

  /* ── 04 · Клиенты и фриланс (8 new) ──────────────────────────────────────── */
  reg('clients', [
    N('brif', 'бриф', 'm', 'B2', 'brief, project brief', 'das Briefing',
      ex('П+еред оц+енкой про+екта кли+ент заполн+яет кор+откий [[бриф]].', 'Before we quote the project, the client fills out a short brief.', 'Vor der Schätzung füllt der Kunde ein kurzes Briefing aus.'),
      ['One-syllable loanword (no stress mark in nominative singular); plural: бр+ифы.', 'Einsilbiges Lehnwort (ohne Akzentzeichen im Nom. Sg.); Plural: бр+ифы.']),
    N('tz', 'техн+ическое зад+ание', 'n', 'B2', 'specification, statement of work (SOW)', 'das Lastenheft, die Spezifikation',
      ex('Все тр+ебования к диз+айну и ср+окам мы фикс+ируем в [[техн+ическом зад+ании]].', 'We lock in all design and timeline requirements in the specification.', 'Alle Anforderungen an Design und Fristen halten wir im Lastenheft fest.'),
      ['Almost always abbreviated to ТЗ (тэ-з+э) in Russian workplace speech.', 'Im russischen Arbeitsalltag fast immer als ТЗ (тэ-зэ) abgekürzt.']),
    N('nda', 'соглаш+ение о неразглаш+ении', 'n', 'C1', 'non-disclosure agreement (NDA)', 'die Geheimhaltungsvereinbarung (NDA)',
      ex('До получ+ения д+оступа к к+оду мы подп+исываем [[соглаш+ение о неразглаш+ении]].', 'Before getting access to the code we sign a non-disclosure agreement.', 'Vor dem Zugriff auf den Code unterschreiben wir eine Geheimhaltungsvereinbarung.'),
      ['Formal Russian legal term; in IT teams people also say NDA (эн-ди-+эй).', 'Förmlicher Rechtsbegriff; in IT-Teams sagt man auch einfach NDA.']),
    N('akt-priyomki', 'акт приёмки', 'm', 'B2', 'acceptance certificate, sign-off report', 'das Abnahmeprotokoll',
      ex('П+осле подпис+ания [[+акта приёмки]] бухгалт+ерия опл+ачивает счёт.', 'After signing the acceptance report, accounting pays the invoice.', 'Nach Unterzeichnung des Abnahmeprotokolls begleicht die Buchhaltung die Rechnung.'),
      ['Key freelance/agency document confirming the client accepts delivered work.', 'Wichtiges Abrechnungsdokument, mit dem der Kunde die Leistung abnimmt.']),
    N('dorabotka', 'дораб+отка', 'f', 'B2', 'rework, refinement, follow-up edit', 'die Nachbesserung, die Überarbeitung',
      ex('Отпр+авили мак+ет на небольш+ую [[дораб+отку]] п+осле коммент+ариев кли+ента.', 'We sent the mockup back for minor rework after the client’s comments.', 'Wir gaben das Layout nach dem Kundenfeedback zur kleinen Nachbesserung zurück.'),
      ['From дораб+отать; very common phrase: отпр+авить на дораб+отку.', 'Zu дораб+отать; häufige Wendung: отпр+авить на дораб+отку (= zur Nachbesserung schicken).']),
    N('prosrochka', 'проср+очка', 'f', 'B2', 'overdue period, late payment/delivery', 'der Verzug, die Fristüberschreitung',
      ex('За [[проср+очку]] опл+аты б+олее м+есяца в догов+оре предусм+отрен штраф.', 'The contract sets a penalty for payment overdue by more than a month.', 'Für Zahlungsverzug von über einem Monat sieht der Vertrag eine Gebühr vor.'),
      ['From про- + срок (“past the deadline”); also colloquial for expired food.', 'Aus про- + срок („über die Frist“); umgangssprachlich auch abgelaufene Lebensmittel.']),
    A('fiksirovanny', 'adj', 'фикс+ированный', 'B2', 'fixed (flat fee, fixed rate)', 'fest, pauschal',
      ex('Мы договор+ились о [[фикс+ированной]] с+умме за весь ауд+ит.', 'We agreed on a fixed flat fee for the entire audit.', 'Wir einigten uns auf eine feste Pauschale für das gesamte Audit.'),
      ['Fixed flat fee = фикс+ированная опл+ата / с+умма; opposite: почасов+ая опл+ата.', 'Pauschalbetrag = фикс+ированная с+умма; Gegenteil: почасов+ая опл+ата.']),
    A('orientirovochny', 'adj', 'ориентир+овочный', 'B2', 'approximate, non-binding (estimate)', 'unverbindlich, voraussichtlich',
      ex('Пок+а +это т+олько [[ориентир+овочная]] оц+енка — т+очную ц+ену назовём п+осле бр+ифа.', 'For now this is only a non-binding estimate — we’ll give the exact price after the brief.', 'Das ist erst eine unverbindliche Schätzung — den genauen Preis nennen wir nach dem Briefing.'),
      ['Adverb: ориентир+овочно (“roughly / around”); very common in client quotes.', 'Adverb: ориентир+овочно („ungefähr / voraussichtlich“); sehr häufig in Angeboten.'])
  ]);

  /* ── 05 · Презентации и питчинг (8 new) ────────────────────────────────── */
  reg('presentations', [
    N('struktura', 'структ+ура', 'f', 'B1', 'outline, structure (of a talk or document)', 'die Gliederung, die Struktur',
      ex('На втор+ом сл+айде я к+оротко пок+азываю [[структ+уру]] докл+ада.', 'On the second slide I briefly show the outline of the talk.', 'Auf der zweiten Folie zeige ich kurz die Gliederung des Vortrags.'),
      ['Used for slide outlines, documents, and code/company hierarchy.', 'Steht für Vortragsgliederung, Dokumentaufbau und Organisationsstruktur.']),
    N('zritelny-kontakt', 'зр+ительный конт+акт', 'm', 'B2', 'eye contact', 'der Blickkontakt',
      ex('Держ+и [[зр+ительный конт+акт]] с з+алом, а не чит+ай текст со сл+айдов.', 'Keep eye contact with the audience instead of reading text off the slides.', 'Halte Blickkontakt mit dem Publikum, statt den Text von den Folien abzulesen.'),
      ['Typical verb: держ+ать / подд+ерживать зр+ительный конт+акт.', 'Typische Verben: держ+ать / подд+ерживать зр+ительный конт+акт (= Blickkontakt halten).']),
    N('yazyk-tela', 'яз+ык т+ела', 'm', 'B2', 'body language', 'die Körpersprache',
      ex('Спок+ойный [[яз+ык т+ела]] помог+ает держ+аться ув+еренно во вр+емя сл+ожных вопр+осов.', 'Calm body language helps you stay confident during tough questions.', 'Ruhige Körpersprache hilft, bei schwierigen Fragen souverän zu bleiben.'),
      ['Literally “language of the body”; singular only.', 'Wörtlich „Sprache des Körpers“ (Genitiv т+ела zu т+ело).']),
    N('repetitsiya', 'репет+иция', 'f', 'B2', 'rehearsal', 'die Probe, die Generalprobe',
      ex('Одн+а [[репет+иция]] с т+аймером ср+азу пок+азывает л+ишние сл+айды.', 'One rehearsal with a timer immediately reveals unnecessary slides.', 'Eine Probe mit Timer zeigt sofort überflüssige Folien.'),
      ['Verb: репет+ировать; dress rehearsal = генер+альная репет+иция.', 'Verb: репет+ировать; Generalprobe = генер+альная репет+иция.']),
    N('argument', 'аргум+ент', 'm', 'B2', 'argument, supporting point', 'das Argument',
      ex('Гл+авный [[аргум+ент]] в п+ользу н+ового реш+ения — экон+омия вр+емени.', 'The main argument in favour of the new solution is saving time.', 'Das Hauptargument für die neue Lösung ist die Zeitersparnis.'),
      ['Always means a logical reason/point, NOT a quarrel (quarrel = сс+ора / спор).', 'Meint immer einen Sachgrund (wie dt. Argument), nicht „Streit“ (спор / сс+ора).']),
    N('vstuplenie', 'вступл+ение', 'n', 'B1', 'opening, introduction', 'der Einstieg, die Einleitung',
      ex('Сд+елай [[вступл+ение]] кор+отким и ср+азу обозн+ачь гл+авную пробл+ему.', 'Keep the opening short and state the main problem right away.', 'Halte den Einstieg kurz und benenne sofort das Hauptproblem.'),
      ['Opposite: заключ+ение (closing/conclusion); verb: вступ+ать.', 'Gegenteil: заключ+ение (= Schluss); auch „Beitritt“ (вступл+ение в клуб).']),
    V('podchyorkivat', 'подчёркивать', 'impf', 'B2', ['подчёркиваю, подчёркиваешь', 'подчёркивал', 'pf. подчеркн+уть'], 'to highlight, emphasise; to underline', 'hervorheben, betonen; unterstreichen',
      ex('В фин+але сп+икер всегд+а [[подчёркивает]] гл+авный результ+ат для б+изнеса.', 'At the end the speaker always highlights the main business result.', 'Zum Schluss hebt der Redner immer das wichtigste Geschäftsergebnis hervor.'),
      ['Literally “draw a line under” (под + черт+а); written with ё (no + mark needed).', 'Wörtlich „unterstreichen“ (под + черт+а); im Vortrag meist „hervorheben“.']),
    A('naglyadny', 'adj', 'нагл+ядный', 'B2', 'vivid, illustrative, visual', 'anschaulich',
      ex('[[Нагл+ядный]] прим+ер объясн+яет ид+ею быстр+ее дл+инной табл+ицы.', 'A vivid example explains the idea faster than a long table.', 'Ein anschauliches Beispiel erklärt die Idee schneller als eine lange Tabelle.'),
      ['Literally “right before the eyes”; adverb: нагл+ядно (“clearly / visually”).', 'Wörtlich „vor Augen“; entspricht genau dt. anschaulich.'])
  ]);

  /* ── 06 · Работа и офис (6 new) ──────────────────────────────────────────── */
  reg('workcomm', [
    N('rassylka', 'расс+ылка', 'f', 'B1', 'mailing list, newsletter, mass email', 'der Verteiler, der Newsletter',
      ex('Доб+авь мен+я, пож+алуйста, в [[расс+ылку]] с еженед+ельными отчётами.', 'Please add me to the mailing list for weekly reports.', 'Nimm mich bitte in den Verteiler für die Wochenberichte auf.'),
      ['From рассыл+ать (“send out to many”); covers mailing lists and marketing emails.', 'Zu рассыл+ать („versenden“); steht für E-Mail-Verteiler wie für Newsletter.']),
    N('nakladka', 'накл+адка', 'f', 'B2', 'scheduling clash, hiccup, overlap', 'die Terminkollision, die Panne',
      ex('Извин+и, в+ышла [[накл+адка]] в календар+е — дав+ай перенесём созв+он на час.', 'Sorry, there’s a calendar clash — let’s move the call by an hour.', 'Entschuldigung, es gab eine Terminkollision — lass uns den Call um eine Stunde schieben.'),
      ['Natural office word for double-booked slots or minor organizational mix-ups.', 'Sehr natürliches Bürowort für Terminüberschneidungen oder kleine Organisationspannen.']),
    N('poruchenie', 'поруч+ение', 'n', 'B2', 'assignment, delegated task, instruction', 'der Auftrag, die Anweisung',
      ex('Руковод+итель дал [[поруч+ение]] подгот+овить св+одку до четверг+а.', 'The manager gave an assignment to prepare a summary by Thursday.', 'Die Leitung erteilte den Auftrag, bis Donnerstag eine Übersicht vorzubereiten.'),
      ['More formal than зад+ача; verb: поруч+ить (to entrust/assign).', 'Förmlicher als зад+ача; Verb: поруч+ить (= beauftragen / anvertrauen).']),
    N('perepiska', 'переп+иска', 'f', 'B1', 'correspondence, email/chat thread', 'der Schriftverkehr, der Nachrichtenverlauf',
      ex('Подним+и [[переп+иску]] с кли+ентом — там б+ыли все соглас+ованные ср+оки.', 'Pull up the email thread with the client — all agreed deadlines were there.', 'Schau im Nachrichtenverlauf mit dem Kunden nach — dort standen alle vereinbarten Fristen.'),
      ['From переп+исываться (“correspond/message back and forth”); uncountable.', 'Zu переп+исываться („hin- und herschreiben“); meist Singular.']),
    V('delegirovat', 'делег+ировать', 'impf', 'B2', ['делег+ирую, делег+ируешь', 'делег+ировал', 'pf. делег+ировать'], 'to delegate', 'delegieren',
      ex('Когд+а ком+анда в+ыросла, н+ужно б+ыло науч+иться [[делег+ировать]] рут+ину.', 'When the team grew, it was necessary to learn to delegate routine work.', 'Als das Team wuchs, musste man lernen, Routineaufgaben zu delegieren.'),
      ['Biaspectual verb (-ировать); recipient takes Dative (делег+ировать колл+еге).', 'Zweiaspektiges Verb; Empfänger steht im Dativ (делег+ировать колл+еге).']),
    V('peresylat', 'пересыл+ать', 'impf', 'B1', ['пересыл+аю, пересыл+аешь', 'пересыл+ал', 'pf. пересл+ать (перешл+ю)'], 'to forward (an email, message, file)', 'weiterleiten',
      ex('Я сейч+ас [[перешл+ю]] теб+е письм+о от юр+истов.', 'I’ll forward you the email from legal right now.', 'Ich leite dir die E-Mail der Rechtsabteilung gleich weiter.'),
      ['Prefix пере- (“over/across”) + слать (“send”); also used for mailing parcels.', 'Präfix пере- + слать („senden“); für E-Mails, Chatnachrichten und Pakete.'])
  ]);

  /* ── 07 · Разработка (6 new) ─────────────────────────────────────────────── */
  reg('dev', [
    N('sborka', 'сб+орка', 'f', 'B2', 'build (software build); assembly', 'der Build, die Erstellung; die Montage',
      ex('П+осле посл+еднего комм+ита [[сб+орка]] уп+ала на т+естах.', 'After the latest commit the build failed on the tests.', 'Nach dem letzten Commit schlug der Build bei den Tests fehl.'),
      ['From собр+ать (“assemble/build”); covers CI builds and furniture/hardware assembly.', 'Zu собр+ать („zusammenbauen“); steht für Software-Builds und physische Montage.']),
    N('otladka', 'отл+адка', 'f', 'B2', 'debugging', 'das Debugging, die Fehlersuche',
      ex('Подр+обные л+оги ускор+яют [[отл+адку]] в н+есколько раз.', 'Detailed logs speed up debugging several times over.', 'Ausführliche Logs beschleunigen das Debugging um ein Vielfaches.'),
      ['From лад (“order/harmony”); verb: отл+аживать / отл+адить; debugger = отл+адчик.', 'Zu лад („Ordnung“); Verb: отл+аживать; Debugger = отл+адчик.']),
    N('otkat', 'отк+ат', 'm', 'B2', 'rollback (reverting a release)', 'der Rollback, das Zurücksetzen',
      ex('П+еред кр+упным рел+изом мы всегд+а гот+овим план [[отк+ата]].', 'Before a major release we always prepare a rollback plan.', 'Vor einem großen Release bereiten wir immer einen Rollback-Plan vor.'),
      ['Literally “rolling back” (от- + кат+ать); verb: откат+ить в+ерсию. (In business slang can also mean a kickback.)', 'Wörtlich „Zurückrollen“ (Verb: откат+ить); im Wirtschaftsjargon auch „Schmiergeld“.']),
    N('konfiguratsiya', 'конфигур+ация', 'f', 'B2', 'configuration, config', 'die Konfiguration',
      ex('Секр+етные ключ+и нельз+я хран+ить в ф+айле [[конфигур+ации]] в Git.', 'Secret keys must not be stored in a config file in Git.', 'Geheime Schlüssel dürfen nicht in einer Konfigurationsdatei in Git liegen.'),
      ['In developer speech often shortened to конф+иг (m.).', 'In Entwicklerteams oft abgekürzt als конф+иг (Maskulinum).']),
    N('dokumentatsiya', 'документ+ация', 'f', 'B1', 'documentation', 'die Dokumentation',
      ex('Акту+альная [[документ+ация]] экон+омит новичк+ам ц+елую нед+елю.', 'Up-to-date documentation saves newcomers a whole week.', 'Aktuelle Dokumentation spart neuen Teammitgliedern eine ganze Woche.'),
      ['Uncountable collective noun (feminine); informal IT shorthand: д+ока / д+оки.', 'Unzählbares Femininum; im IT-Jargon oft kurz д+ока / д+оки.']),
    V('kompilirovat', 'компил+ировать', 'impf', 'B2', ['компил+ирую, компил+ируешь', 'компил+ировал', 'pf. скомпил+ировать'], 'to compile', 'kompilieren',
      ex('П+осле обновл+ения библиот+еки про+ект перест+ал [[компил+ироваться]].', 'After updating the library the project stopped compiling.', 'Nach dem Bibliotheksupdate ließ sich das Projekt nicht mehr kompilieren.'),
      ['Reflexive компил+ироваться = “to compile (intransitive)”; compiler = компил+ятор.', 'Reflexiv компил+ироваться („sich kompilieren lassen“); Compiler = компил+ятор.'])
  ]);

  /* ── 08 · Инфраструктура (6 new) ─────────────────────────────────────────── */
  reg('infra', [
    N('peregruzka', 'перегр+узка', 'f', 'B2', 'overload (system, network, or work)', 'die Überlastung',
      ex('Из-за [[перегр+узки]] с+ервер перест+ал приним+ать н+овые запр+осы.', 'Because of overload the server stopped accepting new requests.', 'Wegen Überlastung nahm der Server keine neuen Anfragen mehr an.'),
      ['Applies to servers, power grids, and people at work; do not confuse with перезагр+узка (“reboot”).', 'Nicht verwechseln mit перезагр+узка („Neustart“)! Перегр+узка = Überlastung.']),
    N('poterya-dannyh', 'пот+еря д+анных', 'f', 'B2', 'data loss', 'der Datenverlust',
      ex('Регул+ярные рез+ервные к+опии защищ+ают от [[пот+ери д+анных]].', 'Regular backups protect against data loss.', 'Regelmäßige Backups schützen vor Datenverlust.'),
      ['From потер+ять (“to lose”) + д+анные (pl. Genitive: д+анных).', 'Aus пот+еря („Verlust“) + Genitiv Plural д+анных.']),
    N('kesh', 'кэш', 'm', 'B2', 'cache', 'der Cache, der Zwischenspeicher',
      ex('П+осле оч+истки [[к+эша]] стран+ица ст+ала открыв+аться мгнов+енно.', 'After clearing the cache the page started opening instantly.', 'Nach dem Leeren des Caches öffnete sich die Seite sofort.'),
      ['One-syllable masculine loanword (no + in base form); verb: кэш+ировать (to cache).', 'Einsilbiges Maskulinum; gebräuchlich: оч+истить кэш (= Cache leeren).']),
    N('uzel', '+узел', 'm', 'B2', 'node (cluster/network); knot', 'der Knoten (Cluster/Netzwerk); der Knoten (Seil)',
      ex('+Если од+ин [[+узел]] кл+астера вых+одит из стр+оя, нагр+узку бер+ут сос+едние.', 'If one cluster node fails, neighbouring nodes take the load.', 'Fällt ein Knoten im Cluster aus, übernehmen die Nachbarknoten die Last.'),
      ['Fleeting vowel -е- disappears in inflected forms: Gen. узл+а, Pl. узл+ы.', 'Flüchtiges e fällt aus: Genitiv узл+а, Plural узл+ы.']),
    N('trafik', 'тр+афик', 'm', 'B1', 'traffic (network/web traffic)', 'der Datenverkehr, der Traffic',
      ex('Балансир+овщик равном+ерно распредел+яет [[тр+афик]] по трём с+ерверам.', 'The load balancer distributes traffic evenly across three servers.', 'Der Loadbalancer verteilt den Datenverkehr gleichmäßig auf drei Server.'),
      ['Used for internet/network data and website visitors (not usually street traffic — that is движ+ение / пр+обки).', 'Für Netz- und Webverkehr (Straßenverkehr heißt движ+ение, Stau = пр+обка).']),
    V('perenapravlyat', 'перенаправл+ять', 'impf', 'B2', ['перенаправл+яю, перенаправл+яешь', 'перенаправл+ял', 'pf. перенапр+авить'], 'to reroute, redirect (traffic, requests)', 'umleiten',
      ex('При сб+ое сист+ема автомат+ически [[перенаправл+яет]] тр+афик в рез+ервный д+ата-центр.', 'During an outage the system automatically reroutes traffic to the backup data centre.', 'Bei einem Ausfall leitet das System den Verkehr automatisch ins Backup-Rechenzentrum um.'),
      ['Used for network redirects, HTTP routing, and forwarding calls/tickets.', 'Für Netzwerk-Routing, HTTP-Redirects sowie das Weiterleiten von Anfragen.'])
  ]);

  /* ── 09 · Безопасность (6 new) ───────────────────────────────────────────── */
  reg('security', [
    N('ugroza', 'угр+оза', 'f', 'B2', 'threat', 'die Bedrohung',
      ex('Ком+анда оцен+ила [[угр+озу]] и закр+ыла вн+ешний порт за д+есять мин+ут.', 'The team assessed the threat and closed the external port in ten minutes.', 'Das Team bewertete die Bedrohung und schloss den offenen Port in zehn Minuten.'),
      ['Used both in cybersecurity (мод+ель угр+оз = threat model) and everyday speech.', 'Sowohl in der IT-Sicherheit (мод+ель угр+оз = Bedrohungsmodell) als auch im Alltag.']),
    N('lozhnoe-srabatyvanie', 'л+ожное сраб+атывание', 'n', 'B2', 'false positive (security alert)', 'der Fehlalarm, das Falsch-Positiv',
      ex('Н+овые пр+авила сн+изили числ+о [[л+ожных сраб+атываний]] вдв+ое.', 'The new rules cut the number of false positives in half.', 'Die neuen Regeln halbierten die Zahl der Fehlalarme.'),
      ['Standard Russian SOC phrase for a false-positive alert.', 'Standardbegriff im russischen SOC für Fehlalarme / False Positives.']),
    N('povyshenie-privilegiy', 'повыш+ение привил+егий', 'n', 'C1', 'privilege escalation', 'die Rechteausweitung',
      ex('Уязв+имость позвол+яла [[повыш+ение привил+егий]] до прав администр+атора.', 'The vulnerability allowed privilege escalation to administrator rights.', 'Die Schwachstelle ermöglichte eine Rechteausweitung bis zu Adminrechten.'),
      ['Exact Russian AppSec/SOC equivalent of “privilege escalation”.', 'Genauer russischer Sicherheitsbegriff für Privilege Escalation / Rechteausweitung.']),
    N('vzlom', 'взлом', 'm', 'B1', 'hack, break-in, breach', 'der Hack, der Einbruch',
      ex('П+осле [[взл+ома]] почт+ового +ящика мы сбр+осили все пар+оли.', 'After the email account hack we reset all passwords.', 'Nach dem Hack des Postfachs setzten wir alle Passwörter zurück.'),
      ['One-syllable noun (no + mark in base form); verb: взл+амывать / взлом+ать.', 'Einsilbig (ohne Akzent im Nom. Sg.); Verb: взл+амывать / взлом+ать (= hacken / aufbrechen).']),
    N('programma-vymogatel', 'прогр+амма-вымог+атель', 'f', 'C1', 'ransomware', 'der Erpressungstrojaner, Ransomware',
      ex('[[Прогр+амма-вымог+атель]] зашифров+ала ф+айлы и потр+ебовала в+ыкуп.', 'Ransomware encrypted the files and demanded a ransom.', 'Ein Erpressungstrojaner verschlüsselte die Dateien und forderte Lösegeld.'),
      ['Feminine because the head noun is прогр+амма; informal IT shorthand: шифров+альщик.', 'Femininum nach прогр+амма; im IT-Alltag auch kurz шифров+альщик („Verschlüsseler“).']),
    V('blokirovat', 'блок+ировать', 'impf', 'B1', ['блок+ирую, блок+ируешь', 'блок+ировал', 'pf. заблок+ировать'], 'to block, lock (an account, IP, card)', 'blockieren, sperren',
      ex('При подозр+ительном вх+оде сист+ема ср+азу [[блок+ирует]] акк+аунт.', 'On a suspicious login the system immediately locks the account.', 'Bei einer verdächtigen Anmeldung sperrt das System das Konto sofort.'),
      ['Noun: блокир+овка (notice stress shift to -о-!); opposite: разблок+ировать.', 'Substantiv: блокир+овка (Betonung auf o!); Gegenteil: разблок+ировать (= entsperren).'])
  ]);

  /* ── 10 · B2 Мир работы (6 new) ──────────────────────────────────────────── */
  reg('b2_work', [
    N('stazhirovka', 'стажир+овка', 'f', 'B1', 'internship, traineeship', 'das Praktikum, das Traineeprogramm',
      ex('П+осле л+етней [[стажир+овки]] ег+о приглас+или в штат.', 'After the summer internship he was offered a permanent staff role.', 'Nach dem Sommerpraktikum wurde er fest angestellt.'),
      ['An intern is стажёр (m., written with ё); verb: стажиров+аться.', 'Praktikant / Trainee heißt стажёр; Verb: стажиров+аться.']),
    N('soprovoditelnoe', 'сопровод+ительное письм+о', 'n', 'B2', 'cover letter', 'das Anschreiben, das Bewerbungsschreiben',
      ex('В [[сопровод+ительном письм+е]] к+оротко объясн+и, почем+у теб+е интер+есна +эта роль.', 'In your cover letter briefly explain why this role interests you.', 'Erkläre im Anschreiben kurz, warum dich diese Stelle interessiert.'),
      ['Literally “accompanying letter” (submitted alongside a резюм+е).', 'Wörtlich „Begleitschreiben“; ergänzt den Lebenslauf (резюм+е).']),
    N('sverhurochnye', 'сверхур+очные', 'pl', 'B2', 'overtime (hours or pay)', 'die Überstunden',
      ex('По трудов+ому догов+ору [[сверхур+очные]] опл+ачиваются по двойн+ой ст+авке.', 'Under the employment contract, overtime is paid at double rate.', 'Laut Arbeitsvertrag werden Überstunden zum doppelten Satz bezahlt.'),
      ['Plural-only substantivised adjective (short for сверхур+очные час+ы).', 'Substantiviertes Adjektiv im Plural (kurz für сверхур+очные час+ы).']),
    N('otgul', 'отг+ул', 'm', 'B2', 'day off in lieu (comp time)', 'der Freizeitausgleich, der Ausgleichstag',
      ex('За раб+оту в субб+оту я взял [[отг+ул]] в п+ятницу.', 'For working on Saturday I took a day off in lieu on Friday.', 'Für die Samstagsarbeit nahm ich mir am Freitag einen Ausgleichstag.'),
      ['Everyday Russian HR/office term: взять отг+ул (take time off in lieu of overtime).', 'Alltagsüblicher Büro- und HR-Begriff: взять отг+ул (= Überstunden abfeiern).']),
    N('uchyot-vremeni', 'учёт раб+очего вр+емени', 'm', 'B2', 'time tracking, working-time recording', 'die Zeiterfassung',
      ex('В комп+ании ввел+и электр+онный [[учёт раб+очего вр+емени]].', 'The company introduced electronic time tracking.', 'Das Unternehmen führte eine elektronische Zeiterfassung ein.'),
      ['Masculine after учёт (written with ё, always stressed); formal HR & agency phrase.', 'Maskulinum nach учёт (stets betontes ё); Standardbegriff für Zeiterfassung.']),
    N('samozanyatost', 'самоз+анятость', 'f', 'B2', 'self-employment, freelance status', 'die Selbstständigkeit',
      ex('Он оф+ормил [[самоз+анятость]], чт+обы лег+ально раб+отать с зак+азчиками.', 'He registered for self-employment to work legally with clients.', 'Er meldete Selbstständigkeit an, um legal für Auftraggeber zu arbeiten.'),
      ['A self-employed freelancer is самоз+анятый (adj./noun); very common tax status in Russia.', 'Selbstständige Person = самоз+анятый; verbreiteter Freelancer-Status.'])
  ]);
})();

/* RECGZ content expansion 2026-11-26 — content only.
 * Editorial learning targets; original examples; permanent IDs. */
GT.register({
  "tab": "it",
  "topic": "bureau_offices",
  "items": [
    {
      "id": "ru-content26-office-razreshenie",
      "t": "разреш+ение",
      "level": "B2",
      "pos": "noun",
      "en": "permit",
      "de": "die Genehmigung",
      "examples": [
        {
          "t": "Для +этих раб+от тр+ебуется [[разреш+ение]].",
          "en": "A permit is required for this work.",
          "de": "Für diese Arbeiten ist eine Genehmigung erforderlich."
        }
      ],
      "gender": "n",
      "plural": "разреш+ения"
    },
    {
      "id": "ru-content26-office-vedomstvo",
      "t": "в+едомство",
      "level": "B2",
      "pos": "noun",
      "en": "public authority",
      "de": "die Behörde",
      "examples": [
        {
          "t": "+Это [[в+едомство]] отвеч+ает за в+ыдачу разреш+ений.",
          "en": "This public authority is responsible for issuing permits.",
          "de": "Diese Behörde ist für die Erteilung von Genehmigungen zuständig."
        }
      ],
      "gender": "n",
      "plural": "в+едомства"
    },
    {
      "id": "ru-content26-office-zayavitel",
      "t": "заяв+итель",
      "level": "B2",
      "pos": "noun",
      "en": "applicant",
      "de": "der Antragsteller",
      "examples": [
        {
          "t": "[[Заяв+итель]] д+олжен подпис+ать ф+орму л+ично.",
          "en": "The applicant must sign the form in person.",
          "de": "Der Antragsteller muss das Formular persönlich unterschreiben."
        }
      ],
      "gender": "m",
      "plural": "заяв+ители"
    },
    {
      "id": "ru-content26-office-polnomochie",
      "t": "полном+очие",
      "level": "C1",
      "pos": "noun",
      "en": "authority to act",
      "de": "die Befugnis",
      "examples": [
        {
          "t": "У +этого отд+ела есть [[полном+очие]] приним+ать реш+ение.",
          "en": "This department has the authority to make the decision.",
          "de": "Diese Abteilung hat die Befugnis, die Entscheidung zu treffen."
        }
      ],
      "gender": "n",
      "plural": "полном+очия"
    },
    {
      "id": "ru-content26-office-reshenie",
      "t": "администрат+ивное реш+ение",
      "level": "B2",
      "pos": "noun",
      "en": "administrative decision",
      "de": "der Verwaltungsakt",
      "examples": [
        {
          "t": "[[Администрат+ивное реш+ение]] напр+авили заяв+ителю п+очтой.",
          "en": "The administrative decision was sent to the applicant by post.",
          "de": "Der Verwaltungsakt wurde dem Antragsteller per Post zugestellt."
        }
      ],
      "gender": "n",
      "plural": "администрат+ивные реш+ения"
    },
    {
      "id": "ru-content26-office-obzhalovanie",
      "t": "обж+алование",
      "level": "C1",
      "pos": "noun",
      "en": "administrative appeal",
      "de": "der Widerspruch",
      "examples": [
        {
          "t": "Срок для [[обж+алования]] ук+азан в докум+енте.",
          "en": "The deadline for an administrative appeal is stated in the document.",
          "de": "Die Frist für den Widerspruch steht im Dokument."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "bureau_tax",
  "items": [
    {
      "id": "ru-content26-tax-deklaraciya",
      "t": "нал+оговая деклар+ация",
      "level": "B2",
      "pos": "noun",
      "en": "tax return",
      "de": "die Steuererklärung",
      "examples": [
        {
          "t": "Мо+я [[нал+оговая деклар+ация]] уж+е гот+ова.",
          "en": "My tax return is ready.",
          "de": "Meine Steuererklärung ist bereits fertig."
        }
      ],
      "gender": "f",
      "plural": "нал+оговые деклар+ации"
    },
    {
      "id": "ru-content26-tax-vychet",
      "t": "нал+оговый в+ычет",
      "level": "B2",
      "pos": "noun",
      "en": "tax deduction",
      "de": "der Steuerabzug",
      "examples": [
        {
          "t": "Бухг+алтер пров+ерит, примен+им ли +этот [[нал+оговый в+ычет]].",
          "en": "The accountant will check whether this tax deduction applies.",
          "de": "Der Buchhalter prüft, ob dieser Steuerabzug anwendbar ist."
        }
      ],
      "gender": "m",
      "plural": "нал+оговые в+ычеты"
    },
    {
      "id": "ru-content26-tax-baza",
      "t": "нал+оговая б+аза",
      "level": "B2",
      "pos": "noun",
      "en": "tax base",
      "de": "die Bemessungsgrundlage",
      "examples": [
        {
          "t": "[[Нал+оговая б+аза]] ук+азана в расчёте.",
          "en": "The tax base is stated in the calculation.",
          "de": "Die Bemessungsgrundlage ist in der Berechnung angegeben."
        }
      ],
      "gender": "f",
      "plural": "нал+оговые б+азы"
    },
    {
      "id": "ru-content26-tax-podohodny",
      "t": "подох+одный нал+ог",
      "level": "B2",
      "pos": "noun",
      "en": "income tax",
      "de": "die Einkommensteuer",
      "examples": [
        {
          "t": "В расчёте отд+ельно ук+азан [[подох+одный нал+ог]].",
          "en": "Income tax is shown separately in the calculation.",
          "de": "Die Einkommensteuer ist in der Berechnung gesondert ausgewiesen."
        }
      ],
      "gender": "m",
      "plural": "подох+одные нал+оги"
    },
    {
      "id": "ru-content26-tax-vznos",
      "t": "страхов+ой взнос",
      "level": "B2",
      "pos": "noun",
      "en": "social security contribution",
      "de": "der Sozialversicherungsbeitrag",
      "examples": [
        {
          "t": "[[Страхов+ой взнос]] отражён в расчётном листк+е.",
          "en": "The social security contribution is shown on the payslip.",
          "de": "Der Sozialversicherungsbeitrag steht auf der Gehaltsabrechnung."
        }
      ],
      "gender": "m",
      "plural": "страхов+ые взн+осы"
    },
    {
      "id": "ru-content26-tax-period",
      "t": "нал+оговый пер+иод",
      "level": "B2",
      "pos": "noun",
      "en": "tax period",
      "de": "der Besteuerungszeitraum",
      "examples": [
        {
          "t": "Для расчёта в+ажно пр+авильно указ+ать [[нал+оговый пер+иод]].",
          "en": "It is important to state the correct tax period for the calculation.",
          "de": "Für die Berechnung muss der richtige Besteuerungszeitraum angegeben werden."
        }
      ],
      "gender": "m",
      "plural": "нал+оговые пер+иоды"
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "bureau_docs",
  "items": [
    {
      "id": "ru-content26-docs-pismo",
      "t": "заказн+ое письм+о",
      "level": "B2",
      "pos": "noun",
      "en": "registered letter",
      "de": "das Einschreiben",
      "examples": [
        {
          "t": "Мы отпр+авили [[заказн+ое письм+о]] и сохран+или квит+анцию.",
          "en": "We sent a registered letter and kept the receipt.",
          "de": "Wir haben ein Einschreiben verschickt und den Beleg aufbewahrt."
        }
      ],
      "gender": "n",
      "plural": "заказн+ые п+исьма"
    },
    {
      "id": "ru-content26-docs-uvedomlenie",
      "t": "уведомл+ение о вруч+ении",
      "level": "B2",
      "pos": "noun",
      "en": "acknowledgement of receipt",
      "de": "die Empfangsbestätigung",
      "examples": [
        {
          "t": "[[Уведомл+ение о вруч+ении]] подтвержд+ает получ+ение письм+а.",
          "en": "The acknowledgement of receipt confirms that the letter was received.",
          "de": "Die Empfangsbestätigung bestätigt den Erhalt des Briefes."
        }
      ],
      "gender": "n",
      "plural": "уведомл+ения о вруч+ении"
    },
    {
      "id": "ru-content26-docs-hranenie",
      "t": "срок хран+ения",
      "level": "B2",
      "pos": "noun",
      "en": "retention period",
      "de": "die Aufbewahrungsfrist",
      "examples": [
        {
          "t": "Для докум+ентов устан+овлен [[срок хран+ения]].",
          "en": "A retention period has been set for the documents.",
          "de": "Für die Dokumente ist eine Aufbewahrungsfrist festgelegt."
        }
      ],
      "gender": "m",
      "plural": "ср+оки хран+ения"
    },
    {
      "id": "ru-content26-docs-nomer",
      "t": "регистраци+онный н+омер",
      "level": "B2",
      "pos": "noun",
      "en": "reference number",
      "de": "das Aktenzeichen",
      "examples": [
        {
          "t": "Укаж+ите [[регистраци+онный н+омер]] в отв+ете.",
          "en": "Please quote the reference number in your reply.",
          "de": "Bitte geben Sie in Ihrer Antwort das Aktenzeichen an."
        }
      ],
      "gender": "m",
      "plural": "регистраци+онные номер+а"
    },
    {
      "id": "ru-content26-docs-vypiska",
      "t": "в+ыписка из ре+естра",
      "level": "B2",
      "pos": "noun",
      "en": "register extract",
      "de": "der Registerauszug",
      "examples": [
        {
          "t": "К заявл+ению прилож+или [[в+ыписку из ре+естра]].",
          "en": "A register extract was attached to the application.",
          "de": "Dem Antrag wurde ein Registerauszug beigefügt."
        }
      ],
      "gender": "f",
      "plural": "в+ыписки из ре+естра"
    },
    {
      "id": "ru-content26-docs-zaverenie",
      "t": "нотари+альное завер+ение",
      "level": "B2",
      "pos": "noun",
      "en": "notarisation",
      "de": "die notarielle Beglaubigung",
      "examples": [
        {
          "t": "Для к+опии потр+ебовалось [[нотари+альное завер+ение]].",
          "en": "The copy required notarisation.",
          "de": "Für die Kopie war eine notarielle Beglaubigung erforderlich."
        }
      ],
      "gender": "n",
      "plural": "нотари+альные завер+ения"
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "legal_contracts",
  "items": [
    {
      "id": "ru-content26-contract-uslovie",
      "t": "усл+овие догов+ора",
      "level": "B2",
      "pos": "noun",
      "en": "contractual clause",
      "de": "die Vertragsklausel",
      "examples": [
        {
          "t": "+Это [[усл+овие догов+ора]] н+ужно обсуд+ить до подпис+ания.",
          "en": "This contractual clause needs to be discussed before signing.",
          "de": "Diese Vertragsklausel muss vor der Unterschrift besprochen werden."
        }
      ],
      "gender": "n",
      "plural": "усл+овия догов+ора"
    },
    {
      "id": "ru-content26-contract-narushenie",
      "t": "наруш+ение догов+ора",
      "level": "B2",
      "pos": "noun",
      "en": "breach of contract",
      "de": "die Vertragsverletzung",
      "examples": [
        {
          "t": "В письм+е оп+исано предполаг+аемое [[наруш+ение догов+ора]].",
          "en": "The letter describes an alleged breach of contract.",
          "de": "Im Brief wird eine mutmaßliche Vertragsverletzung beschrieben."
        }
      ],
      "gender": "n",
      "plural": "наруш+ения догов+ора"
    },
    {
      "id": "ru-content26-contract-otvetstvennost",
      "t": "отв+етственность",
      "level": "B2",
      "pos": "noun",
      "en": "liability",
      "de": "die Haftung",
      "examples": [
        {
          "t": "В догов+оре отд+ельно оговорен+а [[отв+етственность]] стор+он.",
          "en": "The parties' liability is addressed separately in the contract.",
          "de": "Die Haftung der Parteien ist im Vertrag gesondert geregelt."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-contract-neustoyka",
      "t": "неуст+ойка",
      "level": "C1",
      "pos": "noun",
      "en": "contractual penalty",
      "de": "die Vertragsstrafe",
      "examples": [
        {
          "t": "За проср+очку в догов+оре предусм+отрена [[неуст+ойка]].",
          "en": "The contract provides for a contractual penalty for delay.",
          "de": "Der Vertrag sieht bei Verzug eine Vertragsstrafe vor."
        }
      ],
      "gender": "f",
      "plural": "неуст+ойки"
    },
    {
      "id": "ru-content26-contract-ushcherb",
      "t": "возмещ+ение ущ+ерба",
      "level": "B2",
      "pos": "noun",
      "en": "damages",
      "de": "der Schadensersatz",
      "examples": [
        {
          "t": "Стор+оны обсужд+ают [[возмещ+ение ущ+ерба]].",
          "en": "The parties are discussing damages.",
          "de": "Die Parteien besprechen den Schadensersatz."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-contract-davnost",
      "t": "срок исков+ой д+авности",
      "level": "C1",
      "pos": "noun",
      "en": "limitation period",
      "de": "die Verjährungsfrist",
      "examples": [
        {
          "t": "Юр+ист пров+ерит примен+имый [[срок исков+ой д+авности]].",
          "en": "The lawyer will check the applicable limitation period.",
          "de": "Der Anwalt prüft die anwendbare Verjährungsfrist."
        }
      ],
      "gender": "m",
      "plural": "ср+оки исков+ой д+авности"
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "legal_ip",
  "items": [
    {
      "id": "ru-content26-ip-copyright",
      "t": "+авторское пр+аво",
      "level": "B2",
      "pos": "noun",
      "en": "copyright",
      "de": "das Urheberrecht",
      "examples": [
        {
          "t": "В лиц+ензии уточн+яется, ком+у принадлеж+ит [[+авторское пр+аво]].",
          "en": "The licence clarifies who owns the copyright.",
          "de": "In der Lizenz wird geklärt, wem das Urheberrecht zusteht."
        }
      ],
      "gender": "n",
      "plural": "+авторские прав+а"
    },
    {
      "id": "ru-content26-ip-trademark",
      "t": "тов+арный знак",
      "level": "B2",
      "pos": "noun",
      "en": "trademark",
      "de": "die Marke",
      "examples": [
        {
          "t": "[[Тов+арный знак]] зарегистр+ирован на комп+анию.",
          "en": "The trademark is registered to the company.",
          "de": "Die Marke ist auf das Unternehmen eingetragen."
        }
      ],
      "gender": "m",
      "plural": "тов+арные зн+аки"
    },
    {
      "id": "ru-content26-ip-patent",
      "t": "пат+ент",
      "level": "B2",
      "pos": "noun",
      "en": "patent",
      "de": "das Patent",
      "examples": [
        {
          "t": "Инжен+еры п+одали за+явку на [[пат+ент]].",
          "en": "The engineers filed a patent application.",
          "de": "Die Ingenieure haben ein Patent angemeldet."
        }
      ],
      "gender": "m",
      "plural": "пат+енты"
    },
    {
      "id": "ru-content26-ip-royalty",
      "t": "лицензи+онный сбор",
      "level": "B2",
      "pos": "noun",
      "en": "licence fee",
      "de": "die Lizenzgebühr",
      "examples": [
        {
          "t": "[[Лицензи+онный сбор]] опл+ачивается ежег+одно.",
          "en": "The licence fee is paid annually.",
          "de": "Die Lizenzgebühr wird jährlich bezahlt."
        }
      ],
      "gender": "m",
      "plural": "лицензи+онные сб+оры"
    },
    {
      "id": "ru-content26-ip-secret",
      "t": "комм+ерческая т+айна",
      "level": "B2",
      "pos": "noun",
      "en": "trade secret",
      "de": "das Geschäftsgeheimnis",
      "examples": [
        {
          "t": "Технол+огия защищен+а как [[комм+ерческая т+айна]].",
          "en": "The technology is protected as a trade secret.",
          "de": "Die Technologie ist als Geschäftsgeheimnis geschützt."
        }
      ],
      "gender": "f",
      "plural": "комм+ерческие т+айны"
    },
    {
      "id": "ru-content26-ip-plagiarism",
      "t": "плаги+ат",
      "level": "B2",
      "pos": "noun",
      "en": "plagiarism",
      "de": "das Plagiat",
      "examples": [
        {
          "t": "Ком+иссия провер+яет раб+оту на [[плаги+ат]].",
          "en": "The committee is checking the work for plagiarism.",
          "de": "Die Kommission prüft die Arbeit auf Plagiate."
        }
      ],
      "gender": "m",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-ip-domain",
      "t": "общ+ественное досто+яние",
      "level": "C1",
      "pos": "noun",
      "en": "public domain",
      "de": "die Gemeinfreiheit",
      "examples": [
        {
          "t": "Ст+атус [[общ+ественного досто+яния]] н+ужно пров+ерить для +этой стран+ы.",
          "en": "Public-domain status needs to be checked for this country.",
          "de": "Der Status der Gemeinfreiheit muss für dieses Land geprüft werden."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-ip-usage",
      "t": "пр+аво исп+ользования",
      "level": "B2",
      "pos": "noun",
      "en": "usage rights",
      "de": "das Nutzungsrecht",
      "examples": [
        {
          "t": "[[Пр+аво исп+ользования]] не означ+ает перед+ачу +авторства.",
          "en": "Usage rights do not mean transfer of authorship.",
          "de": "Ein Nutzungsrecht bedeutet keine Übertragung der Urheberschaft."
        }
      ],
      "gender": "n",
      "plural": "прав+а исп+ользования"
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "legal_criminal",
  "items": [
    {
      "id": "ru-content26-crime-obvinenie",
      "t": "обвин+ительное заключ+ение",
      "level": "B2",
      "pos": "noun",
      "en": "indictment",
      "de": "die Anklageschrift",
      "examples": [
        {
          "t": "В суд поступ+ило [[обвин+ительное заключ+ение]] по д+елу о мош+енничестве.",
          "en": "An indictment in the fraud case was submitted to the court.",
          "de": "Dem Gericht wurde eine Anklageschrift im Betrugsfall vorgelegt."
        }
      ],
      "gender": "n",
      "plural": "обвин+ительные заключ+ения"
    },
    {
      "id": "ru-content26-crime-prokuratura",
      "t": "прокурат+ура",
      "level": "B2",
      "pos": "noun",
      "en": "prosecution",
      "de": "die Staatsanwaltschaft",
      "examples": [
        {
          "t": "[[Прокурат+ура]] запрос+ила дополн+ительные докум+енты.",
          "en": "The prosecution requested additional documents.",
          "de": "Die Staatsanwaltschaft forderte zusätzliche Dokumente an."
        }
      ],
      "gender": "f",
      "plural": "прокурат+уры"
    },
    {
      "id": "ru-content26-crime-presumption",
      "t": "през+умпция невин+овности",
      "level": "C1",
      "pos": "noun",
      "en": "presumption of innocence",
      "de": "die Unschuldsvermutung",
      "examples": [
        {
          "t": "В обсужд+ении д+ела нельз+я забыв+ать о [[през+умпции невин+овности]].",
          "en": "The presumption of innocence must not be forgotten when discussing the case.",
          "de": "Bei der Diskussion des Falls darf die Unschuldsvermutung nicht vergessen werden."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-crime-acquittal",
      "t": "оправд+ательный пригов+ор",
      "level": "C1",
      "pos": "noun",
      "en": "acquittal",
      "de": "der Freispruch",
      "examples": [
        {
          "t": "Суд в+ынес [[оправд+ательный пригов+ор]].",
          "en": "The court delivered an acquittal.",
          "de": "Das Gericht sprach einen Freispruch aus."
        }
      ],
      "gender": "m",
      "plural": "оправд+ательные пригов+оры"
    },
    {
      "id": "ru-content26-crime-testimony",
      "t": "свид+етельские показ+ания",
      "level": "B2",
      "pos": "noun",
      "en": "witness testimony",
      "de": "die Zeugenaussage",
      "examples": [
        {
          "t": "[[Свид+етельские показ+ания]] зап+исаны в проток+оле.",
          "en": "The witness testimony is recorded in the minutes.",
          "de": "Die Zeugenaussage ist im Protokoll festgehalten."
        }
      ],
      "gender": "pl",
      "plural": "свид+етельские показ+ания",
      "note": {
        "en": "Plural-only expression in this sense.",
        "de": "In dieser Bedeutung nur im Plural gebräuchlich."
      }
    },
    {
      "id": "ru-content26-crime-appeal",
      "t": "апелл+яция",
      "level": "C1",
      "pos": "noun",
      "en": "appeal",
      "de": "die Berufung",
      "examples": [
        {
          "t": "Адвок+ат сообщ+ил, что [[апелл+яция]] п+одана.",
          "en": "The lawyer said that the appeal had been filed.",
          "de": "Der Anwalt teilte mit, dass die Berufung eingelegt wurde."
        }
      ],
      "gender": "f",
      "plural": "апелл+яции"
    },
    {
      "id": "ru-content26-crime-fraud",
      "t": "мош+енничество",
      "level": "B2",
      "pos": "noun",
      "en": "fraud",
      "de": "der Betrug",
      "examples": [
        {
          "t": "Пол+иция рассл+едует предполаг+аемое [[мош+енничество]].",
          "en": "The police are investigating suspected fraud.",
          "de": "Die Polizei ermittelt wegen mutmaßlichen Betrugs."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "legal_labour",
  "items": [
    {
      "id": "ru-content26-labour-contract",
      "t": "трудов+ой догов+ор",
      "level": "B2",
      "pos": "noun",
      "en": "employment contract",
      "de": "der Arbeitsvertrag",
      "examples": [
        {
          "t": "Я получ+ил [[трудов+ой догов+ор]] по электр+онной п+очте.",
          "en": "I received the employment contract by email.",
          "de": "Ich habe den Arbeitsvertrag per E-Mail erhalten."
        }
      ],
      "gender": "m",
      "plural": "трудов+ые догов+оры"
    },
    {
      "id": "ru-content26-labour-collective",
      "t": "коллект+ивный догов+ор",
      "level": "B2",
      "pos": "noun",
      "en": "collective agreement",
      "de": "die Kollektivvereinbarung",
      "examples": [
        {
          "t": "[[Коллект+ивный догов+ор]] регул+ирует усл+овия труд+а.",
          "en": "The collective agreement regulates working conditions.",
          "de": "Die Kollektivvereinbarung regelt die Arbeitsbedingungen."
        }
      ],
      "gender": "m",
      "plural": "коллект+ивные догов+оры"
    },
    {
      "id": "ru-content26-labour-notice",
      "t": "срок уведомл+ения об увольн+ении",
      "level": "B2",
      "pos": "noun",
      "en": "notice period",
      "de": "die Kündigungsfrist",
      "examples": [
        {
          "t": "В догов+оре ук+азан [[срок уведомл+ения об увольн+ении]].",
          "en": "The notice period is stated in the contract.",
          "de": "Die Kündigungsfrist steht im Vertrag."
        }
      ],
      "gender": "m",
      "plural": "ср+оки уведомл+ения об увольн+ении"
    },
    {
      "id": "ru-content26-labour-termination",
      "t": "соглаш+ение о расторж+ении",
      "level": "C1",
      "pos": "noun",
      "en": "mutual termination agreement",
      "de": "der Aufhebungsvertrag",
      "examples": [
        {
          "t": "Стор+оны обсужд+ают [[соглаш+ение о расторж+ении]] догов+ора.",
          "en": "The parties are discussing a mutual termination agreement.",
          "de": "Die Parteien besprechen einen Aufhebungsvertrag."
        }
      ],
      "gender": "n",
      "plural": "соглаш+ения о расторж+ении"
    },
    {
      "id": "ru-content26-labour-dispute",
      "t": "трудов+ой спор",
      "level": "B2",
      "pos": "noun",
      "en": "labour dispute",
      "de": "der Arbeitskonflikt",
      "examples": [
        {
          "t": "[[Трудов+ой спор]] п+ередали на рассмотр+ение.",
          "en": "The labour dispute was referred for consideration.",
          "de": "Der Arbeitskonflikt wurde zur Prüfung weitergeleitet."
        }
      ],
      "gender": "m",
      "plural": "трудов+ые сп+оры"
    },
    {
      "id": "ru-content26-labour-parental",
      "t": "+отпуск по ух+оду за ребёнком",
      "level": "B2",
      "pos": "noun",
      "en": "parental leave",
      "de": "die Elternzeit",
      "examples": [
        {
          "t": "Он план+ирует взять [[+отпуск по ух+оду за ребёнком]].",
          "en": "He plans to take parental leave.",
          "de": "Er plant, Elternzeit zu nehmen."
        }
      ],
      "gender": "m",
      "plural": "отпуск+а по ух+оду за ребёнком"
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "legal_corporate",
  "items": [
    {
      "id": "ru-content26-corp-ustav",
      "t": "уст+ав",
      "level": "C1",
      "pos": "noun",
      "en": "articles of association",
      "de": "die Satzung",
      "examples": [
        {
          "t": "Н+овая ред+акция [[уст+ава]] утвержден+а учред+ителями.",
          "en": "The founders approved the new version of the articles of association.",
          "de": "Die Gründer genehmigten die neue Fassung der Satzung."
        }
      ],
      "gender": "m",
      "plural": "уст+авы"
    },
    {
      "id": "ru-content26-corp-diligence",
      "t": "к+омплексная пров+ерка",
      "level": "C1",
      "pos": "noun",
      "en": "due diligence",
      "de": "die Due-Diligence-Prüfung",
      "examples": [
        {
          "t": "П+еред сд+елкой провод+илась [[к+омплексная пров+ерка]] комп+ании.",
          "en": "Due diligence was carried out on the company before the transaction.",
          "de": "Vor der Transaktion wurde eine Due-Diligence-Prüfung des Unternehmens durchgeführt."
        }
      ],
      "gender": "f",
      "plural": "к+омплексные пров+ерки"
    },
    {
      "id": "ru-content26-corp-compliance",
      "t": "соблюд+ение тр+ебований",
      "level": "B2",
      "pos": "noun",
      "en": "compliance",
      "de": "die Compliance",
      "examples": [
        {
          "t": "За [[соблюд+ение тр+ебований]] отвеч+ает отд+ельная ком+анда.",
          "en": "A separate team is responsible for compliance.",
          "de": "Für die Compliance ist ein eigenes Team zuständig."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-corp-privacy",
      "t": "защ+ита персон+альных д+анных",
      "level": "B2",
      "pos": "noun",
      "en": "data protection",
      "de": "der Datenschutz",
      "examples": [
        {
          "t": "В прогр+амме обуч+ения есть разд+ел «[[Защ+ита персон+альных д+анных]]».",
          "en": "The training programme includes a data protection section.",
          "de": "Das Schulungsprogramm enthält einen Abschnitt zum Datenschutz."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-corp-insolvency",
      "t": "неплатёжеспос+обность",
      "level": "C1",
      "pos": "noun",
      "en": "insolvency",
      "de": "die Zahlungsunfähigkeit",
      "examples": [
        {
          "t": "В отчёте отм+ечен риск [[неплатёжеспос+обности]].",
          "en": "The report notes a risk of insolvency.",
          "de": "Der Bericht weist auf ein Risiko der Zahlungsunfähigkeit hin."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-corp-governance",
      "t": "корпорат+ивное управл+ение",
      "level": "C1",
      "pos": "noun",
      "en": "corporate governance",
      "de": "die Unternehmensführung",
      "examples": [
        {
          "t": "[[Корпорат+ивное управл+ение]] включ+ает контр+оль за реш+ениями руков+одства.",
          "en": "Corporate governance includes oversight of management decisions.",
          "de": "Unternehmensführung umfasst die Kontrolle von Entscheidungen der Geschäftsleitung."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "svc_hotel",
  "items": [
    {
      "id": "ru-content26-hotel-reception",
      "t": "ст+ойка регистр+ации",
      "level": "B1",
      "pos": "noun",
      "en": "reception desk",
      "de": "die Rezeption",
      "examples": [
        {
          "t": "[[Ст+ойка регистр+ации]] нах+одится спр+ава от вх+ода.",
          "en": "The reception desk is to the right of the entrance.",
          "de": "Die Rezeption befindet sich rechts vom Eingang."
        }
      ],
      "gender": "f",
      "plural": "ст+ойки регистр+ации"
    },
    {
      "id": "ru-content26-hotel-occupancy",
      "t": "загр+узка гост+иницы",
      "level": "B2",
      "pos": "noun",
      "en": "occupancy rate",
      "de": "die Belegungsquote",
      "examples": [
        {
          "t": "В +этом м+есяце [[загр+узка гост+иницы]] н+иже, чем л+етом.",
          "en": "The hotel's occupancy rate is lower this month than in summer.",
          "de": "Die Belegungsquote des Hotels ist diesen Monat niedriger als im Sommer."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-hotel-checkout",
      "t": "п+оздний в+ыезд",
      "level": "B2",
      "pos": "noun",
      "en": "late checkout",
      "de": "die Spätabreise",
      "examples": [
        {
          "t": "Мы зар+анее согласов+али [[п+оздний в+ыезд]].",
          "en": "We arranged late checkout in advance.",
          "de": "Wir haben eine Spätabreise im Voraus vereinbart."
        }
      ],
      "gender": "m",
      "plural": "п+оздние в+ыезды"
    },
    {
      "id": "ru-content26-hotel-housekeeping",
      "t": "уб+орка н+омера",
      "level": "B1",
      "pos": "noun",
      "en": "housekeeping",
      "de": "die Zimmerreinigung",
      "examples": [
        {
          "t": "[[Уб+орка н+омера]] м+ожет быть перенесен+а на в+ечер.",
          "en": "Housekeeping can be moved to the evening.",
          "de": "Die Zimmerreinigung kann auf den Abend verschoben werden."
        }
      ],
      "gender": "f",
      "plural": "уб+орки н+омера"
    },
    {
      "id": "ru-content26-hotel-noshow",
      "t": "неза+езд",
      "level": "B2",
      "pos": "noun",
      "en": "no-show",
      "de": "die Nichtanreise",
      "examples": [
        {
          "t": "Пор+ядок опл+аты при [[неза+езде]] ук+азан в усл+овиях брон+ирования.",
          "en": "The payment policy for a no-show is stated in the booking conditions.",
          "de": "Die Zahlungsbedingungen bei Nichtanreise stehen in den Buchungsbedingungen."
        }
      ],
      "gender": "m",
      "plural": "неза+езды"
    },
    {
      "id": "ru-content26-hotel-deposit",
      "t": "зал+ог",
      "level": "B2",
      "pos": "noun",
      "en": "deposit",
      "de": "die Kaution",
      "examples": [
        {
          "t": "При засел+ении гост+иница попрос+ила [[зал+ог]].",
          "en": "The hotel asked for a deposit at check-in.",
          "de": "Beim Einchecken verlangte das Hotel eine Kaution."
        }
      ],
      "gender": "m",
      "plural": "зал+оги"
    },
    {
      "id": "ru-content26-hotel-bronirovanie",
      "t": "брон+ирование",
      "level": "B1",
      "pos": "noun",
      "en": "reservation",
      "de": "die Reservierung",
      "examples": [
        {
          "t": "[[Брон+ирование]] подтвержден+о по электр+онной п+очте.",
          "en": "The reservation has been confirmed by email.",
          "de": "Die Reservierung wurde per E-Mail bestätigt."
        }
      ],
      "gender": "n",
      "plural": "брон+ирования"
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "svc_gastro",
  "items": [
    {
      "id": "ru-content26-gastro-hygiene",
      "t": "пищев+ая гиги+ена",
      "level": "B2",
      "pos": "noun",
      "en": "food hygiene",
      "de": "die Lebensmittelhygiene",
      "examples": [
        {
          "t": "[[Пищев+ая гиги+ена]] вх+одит в прогр+амму обуч+ения персон+ала.",
          "en": "Food hygiene is part of the staff training programme.",
          "de": "Lebensmittelhygiene gehört zum Schulungsprogramm des Personals."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-gastro-allergens",
      "t": "маркир+овка аллерг+енов",
      "level": "B2",
      "pos": "noun",
      "en": "allergen labelling",
      "de": "die Allergenkennzeichnung",
      "examples": [
        {
          "t": "В мен+ю обновлен+а [[маркир+овка аллерг+енов]].",
          "en": "The allergen labelling in the menu has been updated.",
          "de": "Die Allergenkennzeichnung auf der Speisekarte wurde aktualisiert."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-gastro-table",
      "t": "брон+ирование ст+олика",
      "level": "B1",
      "pos": "noun",
      "en": "table reservation",
      "de": "die Tischreservierung",
      "examples": [
        {
          "t": "[[Брон+ирование ст+олика]] возм+ожно по телеф+ону.",
          "en": "A table reservation can be made by phone.",
          "de": "Eine Tischreservierung ist telefonisch möglich."
        }
      ],
      "gender": "n",
      "plural": "брон+ирования ст+оликов"
    },
    {
      "id": "ru-content26-gastro-dish",
      "t": "бл+юдо дня",
      "level": "B1",
      "pos": "noun",
      "en": "dish of the day",
      "de": "das Tagesgericht",
      "examples": [
        {
          "t": "Сег+одня [[бл+юдо дня]] — суп с овощ+ами.",
          "en": "Today's dish of the day is vegetable soup.",
          "de": "Das heutige Tagesgericht ist Gemüsesuppe."
        }
      ],
      "gender": "n",
      "plural": "бл+юда дня"
    },
    {
      "id": "ru-content26-gastro-service",
      "t": "с+ервисный сбор",
      "level": "B2",
      "pos": "noun",
      "en": "service charge",
      "de": "die Servicegebühr",
      "examples": [
        {
          "t": "В счёт уж+е включён [[с+ервисный сбор]].",
          "en": "A service charge is already included in the bill.",
          "de": "Im Rechnungsbetrag ist bereits eine Servicegebühr enthalten."
        }
      ],
      "gender": "m",
      "plural": "с+ервисные сб+оры"
    },
    {
      "id": "ru-content26-gastro-perishable",
      "t": "скороп+ортящийся",
      "level": "B2",
      "pos": "adj",
      "en": "perishable",
      "de": "verderblich",
      "examples": [
        {
          "t": "Молок+о — [[скороп+ортящийся]] прод+укт.",
          "en": "Milk is a perishable product.",
          "de": "Milch ist ein verderbliches Lebensmittel."
        }
      ]
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "svc_retail",
  "items": [
    {
      "id": "ru-content26-retail-stocktake",
      "t": "инвентариз+ация",
      "level": "B2",
      "pos": "noun",
      "en": "stocktake",
      "de": "die Inventur",
      "examples": [
        {
          "t": "В понед+ельник в магаз+ине пройдёт [[инвентариз+ация]].",
          "en": "The shop will carry out a stocktake on Monday.",
          "de": "Am Montag findet im Geschäft eine Inventur statt."
        }
      ],
      "gender": "f",
      "plural": "инвентариз+ации"
    },
    {
      "id": "ru-content26-retail-warranty",
      "t": "гарант+ийная прет+ензия",
      "level": "B2",
      "pos": "noun",
      "en": "warranty claim",
      "de": "der Gewährleistungsanspruch",
      "examples": [
        {
          "t": "[[Гарант+ийная прет+ензия]] передан+а в с+ервисный отд+ел.",
          "en": "The warranty claim has been forwarded to the service department.",
          "de": "Der Gewährleistungsanspruch wurde an die Serviceabteilung weitergeleitet."
        }
      ],
      "gender": "f",
      "plural": "гарант+ийные прет+ензии"
    },
    {
      "id": "ru-content26-retail-exchange",
      "t": "обм+ен тов+ара",
      "level": "B1",
      "pos": "noun",
      "en": "exchange of goods",
      "de": "der Umtausch",
      "examples": [
        {
          "t": "Для [[обм+ена тов+ара]] сохран+ите чек.",
          "en": "Keep the receipt for an exchange of goods.",
          "de": "Bewahren Sie den Kassenbon für den Umtausch auf."
        }
      ],
      "gender": "m",
      "plural": "обм+ены тов+ара"
    },
    {
      "id": "ru-content26-retail-support",
      "t": "обсл+уживание кли+ентов",
      "level": "B2",
      "pos": "noun",
      "en": "customer service",
      "de": "der Kundenservice",
      "examples": [
        {
          "t": "За [[обсл+уживание кли+ентов]] отвеч+ает н+овая ком+анда.",
          "en": "A new team is responsible for customer service.",
          "de": "Ein neues Team ist für den Kundenservice zuständig."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-retail-stock",
      "t": "тов+арный зап+ас",
      "level": "B2",
      "pos": "noun",
      "en": "stock",
      "de": "der Warenbestand",
      "examples": [
        {
          "t": "К конц+у нед+ели [[тов+арный зап+ас]] ум+еньшился.",
          "en": "Stock decreased by the end of the week.",
          "de": "Bis Ende der Woche hat sich der Warenbestand verringert."
        }
      ],
      "gender": "m",
      "plural": "тов+арные зап+асы"
    },
    {
      "id": "ru-content26-retail-shortage",
      "t": "недост+ача",
      "level": "B2",
      "pos": "noun",
      "en": "stock shortage",
      "de": "der Fehlbestand",
      "examples": [
        {
          "t": "При пров+ерке обнар+ужилась [[недост+ача]] двух един+иц.",
          "en": "The check revealed a stock shortage of two units.",
          "de": "Bei der Kontrolle wurde ein Fehlbestand von zwei Stück festgestellt."
        }
      ],
      "gender": "f",
      "plural": "недост+ачи"
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "fin_accounting",
  "items": [
    {
      "id": "ru-content26-account-balance",
      "t": "бухг+алтерский бал+анс",
      "level": "B2",
      "pos": "noun",
      "en": "balance sheet",
      "de": "die Bilanz",
      "examples": [
        {
          "t": "[[Бухг+алтерский бал+анс]] отраж+ает акт+ивы и обяз+ательства.",
          "en": "The balance sheet shows assets and liabilities.",
          "de": "Die Bilanz zeigt Vermögenswerte und Verbindlichkeiten."
        }
      ],
      "gender": "m",
      "plural": "бухг+алтерские бал+ансы"
    },
    {
      "id": "ru-content26-account-receivable",
      "t": "дебит+орская зад+олженность",
      "level": "C1",
      "pos": "noun",
      "en": "accounts receivable",
      "de": "die Forderungen",
      "examples": [
        {
          "t": "Проср+оченная [[дебит+орская зад+олженность]] возросл+а.",
          "en": "Overdue accounts receivable have increased.",
          "de": "Die überfälligen Forderungen sind gestiegen."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-account-payable",
      "t": "кредит+орская зад+олженность",
      "level": "C1",
      "pos": "noun",
      "en": "accounts payable",
      "de": "die Verbindlichkeiten",
      "examples": [
        {
          "t": "[[Кредит+орская зад+олженность]] включ+ает долг поставщик+ам.",
          "en": "Accounts payable include amounts owed to suppliers.",
          "de": "Die Verbindlichkeiten umfassen Schulden gegenüber Lieferanten."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-account-depreciation",
      "t": "амортиз+ация",
      "level": "B2",
      "pos": "noun",
      "en": "depreciation",
      "de": "die Abschreibung",
      "examples": [
        {
          "t": "[[Амортиз+ация]] обор+удования учтен+а в расх+одах.",
          "en": "Equipment depreciation has been included in expenses.",
          "de": "Die Abschreibung der Geräte ist in den Aufwendungen berücksichtigt."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-account-liquidity",
      "t": "ликв+идность",
      "level": "C1",
      "pos": "noun",
      "en": "liquidity",
      "de": "die Liquidität",
      "examples": [
        {
          "t": "Зад+ержки платеж+ей вли+яют на [[ликв+идность]] комп+ании.",
          "en": "Payment delays affect the company's liquidity.",
          "de": "Zahlungsverzögerungen beeinflussen die Liquidität des Unternehmens."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-account-cashflow",
      "t": "д+енежный пот+ок",
      "level": "B2",
      "pos": "noun",
      "en": "cash flow",
      "de": "der Cashflow",
      "examples": [
        {
          "t": "Операци+онный [[д+енежный пот+ок]] ост+ался полож+ительным.",
          "en": "Operating cash flow remained positive.",
          "de": "Der operative Cashflow blieb positiv."
        }
      ],
      "gender": "m",
      "plural": "д+енежные пот+оки"
    },
    {
      "id": "ru-content26-account-audit",
      "t": "бухг+алтерский ауд+ит",
      "level": "B2",
      "pos": "noun",
      "en": "financial audit",
      "de": "die Buchprüfung",
      "examples": [
        {
          "t": "Вн+ешний [[бухг+алтерский ауд+ит]] начнётся в сл+едующем м+есяце.",
          "en": "The external financial audit will begin next month.",
          "de": "Die externe Buchprüfung beginnt nächsten Monat."
        }
      ],
      "gender": "m",
      "plural": "бухг+алтерские ауд+иты"
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "fin_marketing",
  "items": [
    {
      "id": "ru-content26-market-funnel",
      "t": "вор+онка прод+аж",
      "level": "B2",
      "pos": "noun",
      "en": "sales funnel",
      "de": "der Verkaufstrichter",
      "examples": [
        {
          "t": "Н+овая [[вор+онка прод+аж]] включ+ает пр+обный пер+иод.",
          "en": "The new sales funnel includes a trial period.",
          "de": "Der neue Verkaufstrichter enthält eine Testphase."
        }
      ],
      "gender": "f",
      "plural": "вор+онки прод+аж"
    },
    {
      "id": "ru-content26-market-release",
      "t": "пресс-рел+из",
      "level": "B2",
      "pos": "noun",
      "en": "press release",
      "de": "die Pressemitteilung",
      "examples": [
        {
          "t": "[[Пресс-рел+из]] отпр+авили в ред+акции сег+одня +утром.",
          "en": "The press release was sent to newsrooms this morning.",
          "de": "Die Pressemitteilung wurde heute Morgen an die Redaktionen verschickt."
        }
      ],
      "gender": "m",
      "plural": "пресс-рел+изы"
    },
    {
      "id": "ru-content26-market-positioning",
      "t": "позицион+ирование бр+енда",
      "level": "C1",
      "pos": "noun",
      "en": "brand positioning",
      "de": "die Markenpositionierung",
      "examples": [
        {
          "t": "[[Позицион+ирование бр+енда]] измен+илось п+осле иссл+едования.",
          "en": "Brand positioning changed after the research.",
          "de": "Die Markenpositionierung änderte sich nach der Untersuchung."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-market-share",
      "t": "д+оля р+ынка",
      "level": "B2",
      "pos": "noun",
      "en": "market share",
      "de": "der Marktanteil",
      "examples": [
        {
          "t": "За год [[д+оля р+ынка]] комп+ании увел+ичилась.",
          "en": "The company's market share increased over the year.",
          "de": "Der Marktanteil des Unternehmens ist im Laufe des Jahres gestiegen."
        }
      ],
      "gender": "f",
      "plural": "д+оли р+ынка"
    },
    {
      "id": "ru-content26-market-campaign",
      "t": "рекл+амная камп+ания",
      "level": "B2",
      "pos": "noun",
      "en": "advertising campaign",
      "de": "die Werbekampagne",
      "examples": [
        {
          "t": "[[Рекл+амная камп+ания]] начнётся в сл+едующий понед+ельник.",
          "en": "The advertising campaign will start next Monday.",
          "de": "Die Werbekampagne beginnt nächsten Montag."
        }
      ],
      "gender": "f",
      "plural": "рекл+амные камп+ании"
    },
    {
      "id": "ru-content26-market-acquisition",
      "t": "привлеч+ение кли+ентов",
      "level": "B2",
      "pos": "noun",
      "en": "customer acquisition",
      "de": "die Kundengewinnung",
      "examples": [
        {
          "t": "Расх+оды на [[привлеч+ение кли+ентов]] сн+изились.",
          "en": "Customer acquisition costs have fallen.",
          "de": "Die Kosten für die Kundengewinnung sind gesunken."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "fin_hr",
  "items": [
    {
      "id": "ru-content26-hr-recruitment",
      "t": "подб+ор персон+ала",
      "level": "B2",
      "pos": "noun",
      "en": "recruitment",
      "de": "die Personalbeschaffung",
      "examples": [
        {
          "t": "[[Подб+ор персон+ала]] займёт н+есколько нед+ель.",
          "en": "Recruitment will take several weeks.",
          "de": "Die Personalbeschaffung wird einige Wochen dauern."
        }
      ],
      "gender": "m",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-hr-screening",
      "t": "отб+ор кандид+атов",
      "level": "B2",
      "pos": "noun",
      "en": "candidate screening",
      "de": "die Bewerberauswahl",
      "examples": [
        {
          "t": "Перв+ичный [[отб+ор кандид+атов]] уж+е завершён.",
          "en": "Initial candidate screening has already been completed.",
          "de": "Die erste Bewerberauswahl ist bereits abgeschlossen."
        }
      ],
      "gender": "m",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-hr-succession",
      "t": "к+адровый рез+ерв",
      "level": "C1",
      "pos": "noun",
      "en": "talent pool",
      "de": "der Nachwuchspool",
      "examples": [
        {
          "t": "Сотр+удницу включ+или в [[к+адровый рез+ерв]].",
          "en": "The employee was added to the talent pool.",
          "de": "Die Mitarbeiterin wurde in den Nachwuchspool aufgenommen."
        }
      ],
      "gender": "m",
      "plural": "к+адровые рез+ервы"
    },
    {
      "id": "ru-content26-hr-appraisal",
      "t": "оц+енка результ+атов раб+оты",
      "level": "B2",
      "pos": "noun",
      "en": "performance appraisal",
      "de": "die Leistungsbeurteilung",
      "examples": [
        {
          "t": "Ежег+одная [[оц+енка результ+атов раб+оты]] состо+ится в декабр+е.",
          "en": "The annual performance appraisal will take place in December.",
          "de": "Die jährliche Leistungsbeurteilung findet im Dezember statt."
        }
      ],
      "gender": "f",
      "plural": "оц+енки результ+атов раб+оты"
    },
    {
      "id": "ru-content26-hr-file",
      "t": "л+ичное д+ело",
      "level": "B2",
      "pos": "noun",
      "en": "personnel file",
      "de": "die Personalakte",
      "examples": [
        {
          "t": "Д+оступ к [[л+ичному д+елу]] сотр+удника огран+ичен.",
          "en": "Access to the employee's personnel file is restricted.",
          "de": "Der Zugriff auf die Personalakte des Mitarbeiters ist beschränkt."
        }
      ],
      "gender": "n",
      "plural": "л+ичные дел+а"
    },
    {
      "id": "ru-content26-hr-package",
      "t": "компенсаци+онный пак+ет",
      "level": "C1",
      "pos": "noun",
      "en": "compensation package",
      "de": "das Vergütungspaket",
      "examples": [
        {
          "t": "[[Компенсаци+онный пак+ет]] включ+ает окл+ад и пр+емию.",
          "en": "The compensation package includes a base salary and a bonus.",
          "de": "Das Vergütungspaket umfasst Grundgehalt und Bonus."
        }
      ],
      "gender": "m",
      "plural": "компенсаци+онные пак+еты"
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "med_clinical",
  "items": [
    {
      "id": "ru-content26-med-history",
      "t": "ан+амнез",
      "level": "B2",
      "pos": "noun",
      "en": "patient history",
      "de": "die Anamnese",
      "examples": [
        {
          "t": "Врач собр+ал подр+обный [[ан+амнез]].",
          "en": "The doctor took a detailed patient history.",
          "de": "Der Arzt erhob eine ausführliche Anamnese."
        }
      ],
      "gender": "m",
      "plural": "ан+амнезы"
    },
    {
      "id": "ru-content26-med-confidentiality",
      "t": "врач+ебная т+айна",
      "level": "B2",
      "pos": "noun",
      "en": "medical confidentiality",
      "de": "die ärztliche Schweigepflicht",
      "examples": [
        {
          "t": "[[Врач+ебная т+айна]] обсужд+ается на обуч+ении персон+ала.",
          "en": "Medical confidentiality is discussed during staff training.",
          "de": "Die ärztliche Schweigepflicht wird bei der Personalschulung besprochen."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-med-consent",
      "t": "информ+ированное согл+асие",
      "level": "B2",
      "pos": "noun",
      "en": "informed consent",
      "de": "die informierte Einwilligung",
      "examples": [
        {
          "t": "П+еред процед+урой обсуд+или [[информ+ированное согл+асие]].",
          "en": "Informed consent was discussed before the procedure.",
          "de": "Vor dem Eingriff wurde die informierte Einwilligung besprochen."
        }
      ],
      "gender": "n",
      "plural": "информ+ированные согл+асия"
    },
    {
      "id": "ru-content26-med-contraindication",
      "t": "противопоказ+ание",
      "level": "B2",
      "pos": "noun",
      "en": "contraindication",
      "de": "die Gegenanzeige",
      "examples": [
        {
          "t": "Врач пров+ерит к+аждое [[противопоказ+ание]].",
          "en": "The doctor will check each contraindication.",
          "de": "Der Arzt prüft jede Gegenanzeige."
        }
      ],
      "gender": "n",
      "plural": "противопоказ+ания"
    },
    {
      "id": "ru-content26-med-dosage",
      "t": "дозир+овка",
      "level": "B2",
      "pos": "noun",
      "en": "dosage",
      "de": "die Dosierung",
      "examples": [
        {
          "t": "[[Дозир+овка]] ук+азана в назнач+ении врач+а.",
          "en": "The dosage is stated in the doctor's prescription.",
          "de": "Die Dosierung steht in der ärztlichen Verordnung."
        }
      ],
      "gender": "f",
      "plural": "дозир+овки"
    },
    {
      "id": "ru-content26-med-summary",
      "t": "выписн+ой эпикр+из",
      "level": "C1",
      "pos": "noun",
      "en": "discharge summary",
      "de": "der Entlassungsbericht",
      "examples": [
        {
          "t": "Паци+ент получ+ил [[выписн+ой эпикр+из]] п+еред ух+одом.",
          "en": "The patient received the discharge summary before leaving.",
          "de": "Der Patient erhielt vor dem Verlassen der Klinik den Entlassungsbericht."
        }
      ],
      "gender": "m",
      "plural": "выписн+ые эпикр+изы"
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "ops_logistics",
  "items": [
    {
      "id": "ru-content26-log-supply",
      "t": "цеп+очка пост+авок",
      "level": "B2",
      "pos": "noun",
      "en": "supply chain",
      "de": "die Lieferkette",
      "examples": [
        {
          "t": "Сбой у поставщик+а повли+ял на всю [[цеп+очку пост+авок]].",
          "en": "A supplier failure affected the entire supply chain.",
          "de": "Ein Ausfall beim Lieferanten beeinträchtigte die gesamte Lieferkette."
        }
      ],
      "gender": "f",
      "plural": "цеп+очки пост+авок"
    },
    {
      "id": "ru-content26-log-customs",
      "t": "там+оженное оформл+ение",
      "level": "B2",
      "pos": "noun",
      "en": "customs clearance",
      "de": "die Zollabfertigung",
      "examples": [
        {
          "t": "[[Там+оженное оформл+ение]] гр+уза ещё не завершен+о.",
          "en": "Customs clearance for the shipment is not yet complete.",
          "de": "Die Zollabfertigung der Sendung ist noch nicht abgeschlossen."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-log-consignment",
      "t": "тр+анспортная накладн+ая",
      "level": "B2",
      "pos": "noun",
      "en": "consignment note",
      "de": "der Frachtbrief",
      "examples": [
        {
          "t": "Вод+итель предъяв+ил [[тр+анспортную накладн+ую]].",
          "en": "The driver presented the consignment note.",
          "de": "Der Fahrer legte den Frachtbrief vor."
        }
      ],
      "gender": "f",
      "plural": "тр+анспортные накладн+ые"
    },
    {
      "id": "ru-content26-log-picking",
      "t": "комплект+ация зак+аза",
      "level": "B2",
      "pos": "noun",
      "en": "order picking",
      "de": "die Kommissionierung",
      "examples": [
        {
          "t": "[[Комплект+ация зак+аза]] начнётся п+осле опл+аты.",
          "en": "Order picking will begin after payment.",
          "de": "Die Kommissionierung beginnt nach der Zahlung."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-log-cold",
      "t": "холодов+ая цепь",
      "level": "C1",
      "pos": "noun",
      "en": "cold chain",
      "de": "die Kühlkette",
      "examples": [
        {
          "t": "При перев+озке нельз+я наруш+ать [[холодов+ую цепь]].",
          "en": "The cold chain must not be broken during transport.",
          "de": "Beim Transport darf die Kühlkette nicht unterbrochen werden."
        }
      ],
      "gender": "f",
      "plural": "холодов+ые ц+епи"
    },
    {
      "id": "ru-content26-log-tracking",
      "t": "отсл+еживание отправл+ения",
      "level": "B2",
      "pos": "noun",
      "en": "shipment tracking",
      "de": "die Sendungsverfolgung",
      "examples": [
        {
          "t": "[[Отсл+еживание отправл+ения]] дост+упно по н+омеру накладн+ой.",
          "en": "Shipment tracking is available using the consignment note number.",
          "de": "Die Sendungsverfolgung ist über die Frachtbriefnummer verfügbar."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    }
  ]
});

GT.register({
  "tab": "it",
  "topic": "ops_trades",
  "items": [
    {
      "id": "ru-content26-trade-blueprint",
      "t": "чертёж",
      "level": "B2",
      "pos": "noun",
      "en": "blueprint",
      "de": "die Bauzeichnung",
      "examples": [
        {
          "t": "Инжен+ер пров+ерил [[чертёж]] п+еред нач+алом раб+от.",
          "en": "The engineer checked the blueprint before work began.",
          "de": "Der Ingenieur prüfte die Bauzeichnung vor Beginn der Arbeiten."
        }
      ],
      "gender": "m",
      "plural": "чертеж+и"
    },
    {
      "id": "ru-content26-trade-commissioning",
      "t": "ввод в эксплуат+ацию",
      "level": "B2",
      "pos": "noun",
      "en": "commissioning",
      "de": "die Inbetriebnahme",
      "examples": [
        {
          "t": "[[Ввод в эксплуат+ацию]] назн+ачен на понед+ельник.",
          "en": "Commissioning is scheduled for Monday.",
          "de": "Die Inbetriebnahme ist für Montag geplant."
        }
      ],
      "gender": "m",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-trade-safety",
      "t": "охр+ана труд+а",
      "level": "B2",
      "pos": "noun",
      "en": "occupational safety",
      "de": "die Arbeitssicherheit",
      "examples": [
        {
          "t": "[[Охр+ана труд+а]] обсужд+ается на вв+одном инструкт+аже.",
          "en": "Occupational safety is discussed during the induction briefing.",
          "de": "Die Arbeitssicherheit wird bei der Einführung besprochen."
        }
      ],
      "gender": "f",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-trade-ppe",
      "t": "ср+едства индивиду+альной защ+иты",
      "level": "B2",
      "pos": "noun",
      "en": "personal protective equipment",
      "de": "die Schutzausrüstung",
      "examples": [
        {
          "t": "На объ+екте н+ужно нос+ить [[ср+едства индивиду+альной защ+иты]].",
          "en": "Personal protective equipment must be worn on site.",
          "de": "Auf der Baustelle muss Schutzausrüstung getragen werden."
        }
      ],
      "gender": "pl",
      "plural": "ср+едства индивиду+альной защ+иты",
      "note": {
        "en": "Plural-only expression in this sense.",
        "de": "In dieser Bedeutung nur im Plural gebräuchlich."
      }
    },
    {
      "id": "ru-content26-trade-maintenance",
      "t": "техн+ическое обсл+уживание",
      "level": "B2",
      "pos": "noun",
      "en": "maintenance",
      "de": "die Instandhaltung",
      "examples": [
        {
          "t": "Пл+ановое [[техн+ическое обсл+уживание]] сн+изило числ+о пол+омок.",
          "en": "Scheduled maintenance reduced the number of breakdowns.",
          "de": "Die planmäßige Instandhaltung verringerte die Zahl der Ausfälle."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    },
    {
      "id": "ru-content26-trade-defects",
      "t": "устран+ение деф+ектов",
      "level": "B2",
      "pos": "noun",
      "en": "defect rectification",
      "de": "die Mängelbeseitigung",
      "examples": [
        {
          "t": "[[Устран+ение деф+ектов]] включен+о в план раб+от.",
          "en": "Defect rectification is included in the work plan.",
          "de": "Die Mängelbeseitigung ist im Arbeitsplan enthalten."
        }
      ],
      "gender": "n",
      "note": {
        "en": "Normally used in the singular in this sense; other senses may differ.",
        "de": "In dieser Bedeutung normalerweise im Singular; bei anderen Bedeutungen kann es anders sein."
      }
    }
  ]
});
