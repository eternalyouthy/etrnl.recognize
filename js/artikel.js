/* ARTIKEL — German articles & determiner declension: reference page + "Which form?" game.
 * Route: #/articles (reference) · #/articles/play (game). German pack only.
 * Data: data/grammar_artikel.js (GT.ARTIKEL). Answers are computed from the tables below,
 * so a sentence only states family + noun + gender + case + reason.
 * app.js calls GT.artikel.render(sub, api) with api = { page, esc, crumbs, setKeys }. */
(function () {
  'use strict';

  var CASES = ['n', 'a', 'd', 'g'];
  var GENDERS = ['m', 'f', 'n', 'pl'];
  var DEF = {
    n: { m: 'der', f: 'die', n: 'das', pl: 'die' },
    a: { m: 'den', f: 'die', n: 'das', pl: 'die' },
    d: { m: 'dem', f: 'der', n: 'dem', pl: 'den' },
    g: { m: 'des', f: 'der', n: 'des', pl: 'der' }
  };
  // der-words copy the ending of der/die/das; ein-words do the same except in three "gaps".
  var END = { der: 'er', die: 'e', das: 'es', den: 'en', dem: 'em', des: 'es' };
  function ending(c, g) { return END[DEF[c][g]]; }
  function einGap(c, g) { return (c === 'n' && (g === 'm' || g === 'n')) || (c === 'a' && g === 'n'); }

  var FAM = {
    der: { type: 'def' },
    dieser: { type: 'dies', stem: 'dies' },
    jeder: { type: 'dies', stem: 'jed', noPl: true },
    welcher: { type: 'dies', stem: 'welch' },
    ein: { type: 'ein', stem: 'ein', noPl: true },
    kein: { type: 'ein', stem: 'kein' },
    mein: { type: 'ein', stem: 'mein' },
    dein: { type: 'ein', stem: 'dein' },
    sein: { type: 'ein', stem: 'sein' },
    ihr: { type: 'ein', stem: 'ihr' },
    unser: { type: 'ein', stem: 'unser' },
    euer: { type: 'ein', stem: 'euer', short: 'eur' }
  };
  function form(fam, c, g) {
    var F = FAM[fam];
    if (!F) return null;
    if (F.type === 'def') return DEF[c][g];
    if (F.noPl && g === 'pl') return null;
    var end = F.type === 'ein' && einGap(c, g) ? '' : ending(c, g);
    return (end && F.short ? F.short : F.stem) + end;
  }
  function options(fam) {
    var seen = {}, out = [];
    CASES.forEach(function (c) { GENDERS.forEach(function (g) { var f = form(fam, c, g); if (f && !seen[f]) { seen[f] = 1; out.push(f); } }); });
    var order = { der: 0, die: 1, das: 2, den: 3, dem: 4, des: 5 };
    return out.sort(function (a, b) {
      if (fam === 'der') return order[a] - order[b];
      return a.length - b.length || a.localeCompare(b);
    });
  }
  function slotsOf(fam, f) {
    var out = [];
    CASES.forEach(function (c) { GENDERS.forEach(function (g) { if (form(fam, c, g) === f) out.push([c, g]); }); });
    return out;
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------------- texts (known language: ru, otherwise en) ---------------- */
  function ru() { return GT.know === 'ru'; }
  function L(r, e) { return ru() ? r : e; }
  var CASE_NAME = { n: 'Nominativ', a: 'Akkusativ', d: 'Dativ', g: 'Genitiv' };
  var CASE_Q = { n: 'wer? was?', a: 'wen? was?', d: 'wem?', g: 'wessen?' };
  function gName(g) {
    return ru() ? { m: 'мужской род', f: 'женский род', n: 'средний род', pl: 'множественное число' }[g]
      : { m: 'masculine', f: 'feminine', n: 'neuter', pl: 'plural' }[g];
  }
  function gShort(g) { return ru() ? { m: 'м. р.', f: 'ж. р.', n: 'ср. р.', pl: 'мн. ч.' }[g] : { m: 'masc.', f: 'fem.', n: 'neut.', pl: 'plural' }[g]; }
  var PREP = {
    a: ['durch', 'für', 'gegen', 'ohne', 'um'],
    d: ['aus', 'bei', 'mit', 'nach', 'seit', 'von', 'zu', 'gegenüber'],
    g: ['wegen', 'trotz', 'während', 'statt'],
    two: ['an', 'auf', 'hinter', 'in', 'neben', 'über', 'unter', 'vor', 'zwischen']
  };
  function b(s) { return '<b>' + s + '</b>'; }
  function de(s) { return '<em lang="de">' + s + '</em>'; }

  function reasonHTML(r, c) {
    var cn = b(CASE_NAME[c]);
    if (r === 'subj') return L('Это подлежащее — тот, кто действует (' + de('wer? was?') + ') → ' + cn + '.', 'It is the subject — who or what does the action (' + de('wer? was?') + ') → ' + cn + '.');
    if (r === 'pred') return L('После ' + de('sein / werden / bleiben') + ' (' + de('Das ist …') + ') существительное тоже в ' + cn + '.', 'After ' + de('sein / werden / bleiben') + ' (' + de('Das ist …') + ') the noun is ' + cn + ' too.');
    if (r === 'obj') return L('Прямое дополнение — кого? что? (' + de('wen? was?') + ') → ' + cn + '.', 'Direct object — whom? what? (' + de('wen? was?') + ') → ' + cn + '.');
    if (r === 'esgibt') return L(de('es gibt') + ' всегда с ' + cn + '.', de('es gibt') + ' always takes the ' + cn + '.');
    if (r === 'time') return L('Время без предлога (' + de('jeden Tag, diese Woche') + ') → ' + cn + '.', 'A time phrase without a preposition (' + de('jeden Tag, diese Woche') + ') → ' + cn + '.');
    if (r === 'iobj') return L('Адресат — кому? (' + de('wem?') + ') → ' + cn + '. Сама вещь при этом в Akkusativ: ' + de('Ich gebe dem Kollegen den Schlüssel') + '.', 'The person who receives — to whom? (' + de('wem?') + ') → ' + cn + '. The thing itself is Akkusativ: ' + de('Ich gebe dem Kollegen den Schlüssel') + '.');
    if (r === 'gen') return L('Принадлежность — чей? (' + de('wessen?') + ') → ' + cn + '.', 'Possession — whose? (' + de('wessen?') + ') → ' + cn + '.');
    var m = /^(v|vp|p):(.+)$/.exec(r);
    if (!m) return '';
    if (m[1] === 'v') return L('Глагол ' + de(m[2]) + ' всегда требует ' + cn + ' (как ' + de('helfen, danken, gehören, gefallen, glauben, folgen') + ').', 'The verb ' + de(m[2]) + ' always takes the ' + cn + ' (like ' + de('helfen, danken, gehören, gefallen, glauben, folgen') + ').');
    if (m[1] === 'vp') return L('Устойчивое сочетание ' + de(m[2] + ' + ' + CASE_NAME[c]) + ' — его учат целиком.', 'Fixed verb + preposition: ' + de(m[2] + ' + ' + CASE_NAME[c]) + ' — learn it as one block.');
    var pp = m[2].split('+'), p = pp[0], where = pp[1];
    if (where === 'wo') return L(de(p) + ' — двойной предлог. Здесь место (' + de('wo?') + ') → ' + cn + '.', de(p) + ' is a two-way preposition. Here it is a location (' + de('wo?') + ') → ' + cn + '.');
    if (where === 'wohin') return L(de(p) + ' — двойной предлог. Здесь направление, движение куда-то (' + de('wohin?') + ') → ' + cn + '.', de(p) + ' is a two-way preposition. Here it is a direction (' + de('wohin?') + ') → ' + cn + '.');
    var list = PREP[c] ? PREP[c].join(', ') : '';
    return L(de(p) + ' — предлог только с ' + cn + ' (' + de(list) + ').', de(p) + ' always takes the ' + cn + ' (' + de(list) + ').');
  }

  var GROUP_TEXT = {
    days: ['Дни недели — всегда der.', 'Days of the week are always der.'],
    months: ['Месяцы — всегда der.', 'Months are always der.'],
    seasons: ['Времена года — всегда der.', 'Seasons are always der.'],
    weather: ['Погода и осадки (Regen, Schnee, Wind) — der.', 'Weather words (Regen, Schnee, Wind) are der.'],
    infinitive: ['Глагол как существительное (essen → das Essen) — всегда das.', 'A verb used as a noun (essen → das Essen) is always das.'],
    male: ['Мужчина — der: род по смыслу.', 'A male person is der: gender follows meaning.'],
    female: ['Женщина — die: род по смыслу.', 'A female person is die: gender follows meaning.']
  };
  function patternFor(noun, g) {
    var A = GT.ARTIKEL, low = noun.toLowerCase(), hit = null, miss = null;
    (A.groups || []).forEach(function (gr) { if (!hit && gr.words.indexOf(noun) >= 0 && gr.g === g) hit = { group: gr.key }; });
    if (hit) return hit;
    (A.patterns || []).forEach(function (pt) {
      var cands = [];
      if (pt.p && noun.indexOf(pt.p) === 0 && noun.length > pt.p.length + 2) cands.push({ pre: pt.p, strong: false });
      (pt.s || []).forEach(function (s) {
        if (low.length > s.length + 1 && low.slice(-s.length) === s) cands.push({ suf: s, strong: (pt.strong || []).indexOf(s) >= 0 });
      });
      cands.forEach(function (x) {
        x.g = pt.g; x.mostly = !!pt.mostly;
        var len = (x.suf || x.pre).length;
        if (pt.g === g) { if (!hit || len > hit.len) { x.len = len; hit = x; } }
        else if ((x.strong || x.mostly) && (!miss || len > miss.len)) { x.len = len; miss = x; }
      });
    });
    return hit || (miss ? { miss: miss } : null);
  }
  function patternHTML(noun, g) {
    if (g === 'pl') return '';
    var p = patternFor(noun, g);
    if (!p) return '';
    var art = DEF.n[g];
    if (p.group) return GROUP_TEXT[p.group][ru() ? 0 : 1].replace(/\b(der|die|das)\b(?=[\s.:])/, function (x) { return '<b class="a-' + x + '">' + x + '</b>'; });
    if (p.miss) {
      var mk = p.miss.suf ? '-' + p.miss.suf : p.miss.pre + '-', ma = DEF.n[p.miss.g];
      return L('Осторожно: ' + b(mk) + ' обычно ' + b(ma) + ', но это слово — исключение: ' + de(art + ' ' + noun) + '.', 'Careful: ' + b(mk) + ' is usually ' + b(ma) + ', but this word is an exception: ' + de(art + ' ' + noun) + '.');
    }
    var mark = p.suf ? '-' + p.suf : p.pre + '-';
    var how = p.strong ? L('всегда', 'always') : p.mostly ? L('обычно', 'usually') : L('как правило', 'as a rule');
    return L('Закономерность: ' + b(mark) + ' → ' + how + ' <b class="a-' + art + '">' + art + '</b>.', 'Pattern: ' + b(mark) + ' → ' + how + ' <b class="a-' + art + '">' + art + '</b>.');
  }
  function headHTML(noun, g, head) {
    if (!head || g === 'pl') return '';
    var art = DEF.n[g];
    return L('Сложное слово: род даёт последняя часть — ' + de(art + ' ' + head) + ' → ' + de(art + ' ' + noun) + '.', 'Compound noun: the last part decides — ' + de(art + ' ' + head) + ' → ' + de(art + ' ' + noun) + '.');
  }
  function genderHTML(noun, g) {
    if (g === 'pl') return L(b(noun) + ' — множественное число (' + de('die ' + noun) + '). Во мн. ч. у всех родов одни формы.', b(noun) + ' is plural (' + de('die ' + noun) + '). The plural has one set of forms for all genders.');
    return L(b(noun) + ' — ' + gName(g) + ': ' + de(DEF.n[g] + ' ' + noun) + '.', b(noun) + ' is ' + gName(g) + ': ' + de(DEF.n[g] + ' ' + noun) + '.');
  }
  function formHTML(fam, c, g) {
    var F = FAM[fam], ans = form(fam, c, g), cn = CASE_NAME[c], gn = gShort(g), d = DEF[c][g];
    if (F.type === 'def') return L(cn + ' + ' + gn + ' → ' + b(ans) + '.', cn + ' + ' + gn + ' → ' + b(ans) + '.');
    if (F.type === 'ein' && einGap(c, g)) return L(cn + ' + ' + gn + ': у определённого артикля ' + de(d) + ', но у ' + de('ein / kein / mein …') + ' здесь одна из трёх «дыр» — окончания нет → ' + b(ans) + '.', cn + ' + ' + gn + ': the definite article is ' + de(d) + ', but ' + de('ein / kein / mein …') + ' has one of its three gaps here — no ending → ' + b(ans) + '.');
    return L(cn + ' + ' + gn + ' → ' + de(d) + ' → окончание ' + b('-' + ending(c, g)) + ' → ' + b(ans) + '.', cn + ' + ' + gn + ' → ' + de(d) + ' → ending ' + b('-' + ending(c, g)) + ' → ' + b(ans) + '.');
  }
  function extraHTML(c, g) {
    if (c === 'd' && g === 'pl') return L('В Dativ мн. ч. и существительное получает ' + b('-n') + ': ' + de('Kinder → den Kindern') + '.', 'In the Dativ plural the noun adds ' + b('-n') + ' too: ' + de('Kinder → den Kindern') + '.');
    if (c === 'g' && (g === 'm' || g === 'n')) return L('В Genitiv м. и ср. р. существительное получает ' + b('-(e)s') + ': ' + de('des Vaters, des Hauses') + '.', 'In the Genitiv masculine/neuter the noun adds ' + b('-(e)s') + ': ' + de('des Vaters, des Hauses') + '.');
    if (c === 'a' && g === 'm') return L('Akkusativ меняет только мужской род: ' + de('der → den, ein → einen') + '.', 'The Akkusativ changes only the masculine: ' + de('der → den, ein → einen') + '.');
    if (c === 'a') return L('В Akkusativ ж. р., ср. р. и мн. ч. выглядят так же, как в Nominativ.', 'In the Akkusativ, feminine, neuter and plural look exactly like the Nominativ.');
    return '';
  }
  function wrongHTML(fam, chosen) {
    var sl = slotsOf(fam, chosen.toLowerCase());
    if (!sl.length) return '';
    var where = sl.map(function (x) { return CASE_NAME[x[0]] + ' ' + gShort(x[1]); }).join(' · ');
    return L('Вы выбрали ' + b(chosen) + ' — эта форма подходит для: ' + where, 'You picked ' + b(chosen) + ' — that form is for: ' + where).replace(/\.?$/, '.');
  }

  /* ---------------- tables ---------------- */
  function familyTable(fam, esc) {
    var head = ru() ? ['Падеж', 'м. р.', 'ж. р.', 'ср. р.', 'мн. ч.'] : ['Case', 'Masc.', 'Fem.', 'Neut.', 'Plural'];
    return '<div class="table-wrap"><table class="ag-table"><thead><tr>' + head.map(function (x) { return '<th>' + esc(x) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      CASES.map(function (c) {
        return '<tr><td>' + CASE_NAME[c] + ' <span class="ag-q">' + CASE_Q[c] + '</span></td>' + GENDERS.map(function (g) {
          var f = form(fam, c, g);
          var gap = FAM[fam].type === 'ein' && einGap(c, g);
          return '<td class="de' + (gap ? ' ag-gap' : '') + '" lang="de">' + (f ? esc(f) : '—') + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }

  /* ---------------- reference page ---------------- */
  function sectionTitle(t, id) { return '<h3 class="section-title"' + (id ? ' id="ag-' + id + '"' : '') + '>' + t + '</h3>'; }
  // Sections of the reference page (sidebar jump links).
  var SECTIONS = [['der', 'der · die · das'], ['ein', 'ein · mein · kein'], ['dieser', 'dieser · jeder · welcher'], ['poss', 'Possessives'],
    ['forms', 'Form patterns'], ['cases', 'Which case?'], ['gender', 'Gender by ending']];
  function viewReference(api) {
    var esc = api.esc;
    var h = api.crumbs('Language · Articles');
    h += '<header class="page-head"><h1>' + L('Артикли и их формы', 'Articles & their forms') + '</h1><p class="lead">' +
      L('Все формы der / ein / kein / mein / dieser на одной странице, главные закономерности рода и падежа — и игра, где по предложению нужно выбрать правильную форму.',
        'Every form of der / ein / kein / mein / dieser on one page, the main gender and case patterns — and a game where you pick the right form in a real sentence.') +
      '</p></header>';
    h += '<div class="actions-row"><a class="btn primary" href="#/articles/play">' + 'Play · Which form?' + '</a><a class="btn" href="#/grammar/kasus">' + 'Cases lesson' + '</a></div>';

    h += sectionTitle(L('Определённый артикль · der / die / das', 'Definite article · der / die / das'), 'der') + familyTable('der', esc);
    h += sectionTitle(L('ein-слова · ein, kein, mein, dein, sein, ihr, unser, euer', 'ein-words · ein, kein, mein, dein, sein, ihr, unser, euer'), 'ein') + familyTable('mein', esc) +
      '<p class="note muted ag-note">' + L('Так же склоняются ' + de('ein, kein, dein, sein, ihr, unser, euer') + ' (у ' + de('ein') + ' нет мн. ч. — там ' + de('keine / meine') + '). ' + de('euer') + ' теряет -e-: ' + de('eure, eurem') + '. Выделены три «дыры» без окончания.',
        'Same endings for ' + de('ein, kein, dein, sein, ihr, unser, euer') + ' (' + de('ein') + ' has no plural — use ' + de('keine / meine') + '). ' + de('euer') + ' drops its -e-: ' + de('eure, eurem') + '. The three endless "gaps" are highlighted.') + '</p>';
    h += sectionTitle(L('der-слова · dieser, jeder, welcher', 'der-words · dieser, jeder, welcher'), 'dieser') + familyTable('dieser', esc) +
      '<p class="note muted ag-note">' + L('Окончание копирует артикль: ' + de('der → dies<b>er</b>, das → dies<b>es</b>, dem → dies<b>em</b>') + '. ' + de('jeder') + ' — только ед. ч.', 'The ending copies the article: ' + de('der → dies<b>er</b>, das → dies<b>es</b>, dem → dies<b>em</b>') + '. ' + de('jeder') + ' is singular only.') + '</p>';

    var poss = [['ich', 'mein'], ['du', 'dein'], ['er / es', 'sein'], ['sie', 'ihr'], ['wir', 'unser'], ['ihr', 'euer'], ['sie / Sie', 'ihr / Ihr']];
    h += sectionTitle(L('Притяжательные: чей?', 'Possessives: whose?'), 'poss') + '<div class="table-wrap"><table><thead><tr><th>' + L('Лицо', 'Person') + '</th><th>' + L('Слово', 'Word') + '</th><th>' + L('Пример', 'Example') + '</th></tr></thead><tbody>' +
      poss.map(function (p) { return '<tr><td class="de" lang="de">' + p[0] + '</td><td class="de" lang="de">' + p[1] + '</td><td class="de" lang="de">' + esc(cap(p[1].split(' / ')[0]) + 'e Tasche · mit ' + (p[1] === 'euer' ? 'eurem' : p[1].split(' / ')[0] + 'em') + ' Auto') + '</td></tr>'; }).join('') + '</tbody></table></div>';

    var rules = ru() ? [
      'Akkusativ меняет <b>только мужской род</b>: ' + de('der → den, ein → einen') + '. Ж. р., ср. р. и мн. ч. в Akkusativ = Nominativ.',
      'Dativ узнаётся по <b>-m</b> (м./ср. р.), <b>-r</b> (ж. р.) и <b>-n</b> (мн. ч. — и у существительного: ' + de('den Kindern') + ').',
      'Genitiv: <b>-s</b> у м./ср. р. (существительное тоже +(e)s: ' + de('des Vaters') + '), <b>-r</b> у ж. р. и мн. ч.',
      'Ж. р. и мн. ч. выглядят одинаково везде, кроме Dativ: ' + de('der Frau / den Kindern') + '.',
      'der-слова (' + de('dieser, jeder, welcher') + ') копируют окончание артикля: ' + de('der → dieser') + '.',
      'ein-слова = то же самое, но в <b>трёх местах без окончания</b>: Nom. м. р., Nom. и Akk. ср. р. (' + de('ein Mann, ein Kind') + ').',
      'Окончания-подсказки: <b>r · e · s · n · m</b> — запомните их, и таблица не нужна.'
    ] : [
      'The Akkusativ changes <b>only the masculine</b>: ' + de('der → den, ein → einen') + '. Feminine, neuter and plural Akkusativ = Nominativ.',
      'Spot the Dativ by <b>-m</b> (masc./neut.), <b>-r</b> (fem.) and <b>-n</b> (plural — the noun too: ' + de('den Kindern') + ').',
      'Genitiv: <b>-s</b> for masc./neut. (the noun adds -(e)s: ' + de('des Vaters') + '), <b>-r</b> for fem. and plural.',
      'Feminine and plural look the same everywhere except the Dativ: ' + de('der Frau / den Kindern') + '.',
      'der-words (' + de('dieser, jeder, welcher') + ') copy the article’s ending: ' + de('der → dieser') + '.',
      'ein-words do the same but have <b>three places without an ending</b>: masc. Nom., neut. Nom. and Akk. (' + de('ein Mann, ein Kind') + ').',
      'The signal endings are <b>r · e · s · n · m</b> — know them and you rarely need the table.'
    ];
    h += sectionTitle(L('Главные закономерности форм', 'Key patterns of the forms'), 'forms') + '<div class="box prose"><ul>' + rules.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ul></div>';

    var caseRows = ru() ? [
      ['Nominativ', 'wer? was?', 'подлежащее; после sein / werden', 'Mein Bruder ist Arzt.'],
      ['Akkusativ', 'wen? was?', 'прямое дополнение; es gibt; время (jeden Tag); durch, für, gegen, ohne, um; wohin?', 'Ich suche meinen Schlüssel.'],
      ['Dativ', 'wem?', 'адресат; helfen, danken, gehören, gefallen …; aus, bei, mit, nach, seit, von, zu; wo?', 'Ich helfe meinem Bruder.'],
      ['Genitiv', 'wessen?', 'принадлежность; wegen, trotz, während, statt', 'das Auto meines Vaters']
    ] : [
      ['Nominativ', 'wer? was?', 'subject; after sein / werden', 'Mein Bruder ist Arzt.'],
      ['Akkusativ', 'wen? was?', 'direct object; es gibt; time (jeden Tag); durch, für, gegen, ohne, um; wohin?', 'Ich suche meinen Schlüssel.'],
      ['Dativ', 'wem?', 'recipient; helfen, danken, gehören, gefallen …; aus, bei, mit, nach, seit, von, zu; wo?', 'Ich helfe meinem Bruder.'],
      ['Genitiv', 'wessen?', 'possession; wegen, trotz, während, statt', 'das Auto meines Vaters']
    ];
    h += sectionTitle(L('Какой падеж?', 'Which case?'), 'cases') + '<div class="table-wrap"><table><thead><tr><th>' + L('Падеж', 'Case') + '</th><th>' + L('Вопрос', 'Question') + '</th><th>' + L('Когда', 'When') + '</th><th>' + L('Пример', 'Example') + '</th></tr></thead><tbody>' +
      caseRows.map(function (r) { return '<tr><td>' + r[0] + '</td><td class="de" lang="de">' + r[1] + '</td><td>' + esc(r[2]) + '</td><td class="de" lang="de">' + esc(r[3]) + '</td></tr>'; }).join('') + '</tbody></table></div>' +
      '<p class="note muted ag-note">' + L('Двойные предлоги ' + de(PREP.two.join(', ')) + ': место (' + de('wo?') + ') → Dativ, направление (' + de('wohin?') + ') → Akkusativ.', 'Two-way prepositions ' + de(PREP.two.join(', ')) + ': location (' + de('wo?') + ') → Dativ, direction (' + de('wohin?') + ') → Akkusativ.') + '</p>';

    h += sectionTitle(L('Род по окончанию', 'Gender from the ending'), 'gender') + gendersHTML(esc);
    h += '<div class="actions"><a class="btn primary" href="#/articles/play">Try it yourself →</a></div>';
    api.page(h, 'mid');
  }
  function gendersHTML(esc) {
    var h = '';
    var cols = { m: [], f: [], n: [] };
    GT.ARTIKEL.patterns.forEach(function (pt) {
      var marks = pt.p ? [pt.p + '-'] : pt.s.map(function (s) { return '-' + s; });
      cols[pt.g].push('<li><span class="ag-sufs">' + marks.map(function (m) { return '<span class="ag-suf">' + m + '</span>'; }).join(' ') + '</span>' + (pt.mostly ? ' <span class="ag-mostly">' + L('обычно', 'mostly') + '</span>' : '') + '<br><span class="ag-ex" lang="de">' + esc(pt.ex) + '</span></li>');
    });
    var meaning = {
      m: L('Мужчины, дни, месяцы, времена года, погода', 'Male persons, days, months, seasons, weather'),
      f: L('Женщины (-in), большинство слов на -e', 'Female persons (-in), most nouns in -e'),
      n: L('Глагол как существительное (das Essen), -chen/-lein, металлы, цвета', 'Verbs as nouns (das Essen), -chen/-lein, metals, colours')
    };
    h += '<div class="ag-genders">' + ['m', 'f', 'n'].map(function (g) {
      var art = DEF.n[g];
      return '<div class="box ag-gcol"><h4 class="a-' + art + '" lang="de">' + art + '</h4><ul>' + cols[g].join('') + '</ul><p class="note muted">' + esc(meaning[g]) + '</p></div>';
    }).join('') + '</div>' +
      '<div class="box prose ag-tip"><p>' + L('<b>Сложные слова:</b> род даёт последняя часть — ' + de('das Haus + die Tür → die Haustür') + ', ' + de('die Hand + der Schuh → der Handschuh') + '.', '<b>Compounds:</b> the last part decides — ' + de('das Haus + die Tür → die Haustür') + ', ' + de('die Hand + der Schuh → der Handschuh') + '.') +
      '</p><p>' + L('Исключения есть, но редкие — правила выше покрывают большинство слов. Для остальных учите существительное сразу с артиклем.', 'There are exceptions, but they are rare — the rules above cover most words. For the rest, learn every noun together with its article.') + '</p></div>';

    return h;
  }

  /* ---------------- game ---------------- */
  var G = { cur: -1, chosen: null, revealed: false, hc: false, hg: false, forms: false, filter: 'all', recent: [], ok: 0, bad: 0, streak: 0, best: 0 };
  function isEnd() { return G.filter === 'end'; }
  function sent(i) {
    if (isEnd()) { var e = GT.ARTIKEL.endings[i]; return { end: true, noun: e[0], g: e[1] }; }
    var s = GT.ARTIKEL.sentences[i];
    return { text: s[0], fam: s[1], noun: s[2], g: s[3], c: s[4], r: s[5], head: s[6] };
  }
  function nextSentence() {
    var all = isEnd() ? GT.ARTIKEL.endings : GT.ARTIKEL.sentences, pool = [];
    for (var i = 0; i < all.length; i++) if ((isEnd() || G.filter === 'all' || all[i][4] === G.filter) && G.recent.indexOf(i) < 0 && i !== G.cur) pool.push(i);
    if (!pool.length) { G.recent = []; return nextSentence(); }
    G.cur = pool[Math.floor(Math.random() * pool.length)];
    G.recent.push(G.cur);
    if (G.recent.length > Math.min(30, Math.floor(pool.length / 2))) G.recent.shift();
    G.chosen = null; G.revealed = false; G.hc = false; G.hg = false;
  }
  function answerOf(s) { if (s.end) return DEF.n[s.g]; var a = form(s.fam, s.c, s.g); return /^___/.test(s.text) ? cap(a) : a; }

  /* ---- gender-by-ending mode ---- */
  var GROUP_HINT = {
    days: ['день недели', 'a day of the week'], months: ['месяц', 'a month'], seasons: ['время года', 'a season'],
    weather: ['погода', 'weather'], infinitive: ['глагол, ставший существительным', 'a verb used as a noun'],
    male: ['мужчина', 'a male person'], female: ['женщина', 'a female person']
  };
  function markOf(noun, g) {
    var p = patternFor(noun, g);
    if (!p || p.miss) return null;
    if (p.group) return { group: p.group };
    return p.suf ? { suf: p.suf, label: '-' + p.suf } : { pre: p.pre, label: p.pre + '-' };
  }
  function nounMarked(noun, g, esc) {
    var m = markOf(noun, g);
    if (m && m.suf) return esc(noun.slice(0, -m.suf.length)) + '<u class="ag-end">' + esc(noun.slice(-m.suf.length)) + '</u>';
    if (m && m.pre) return '<u class="ag-end">' + esc(noun.slice(0, m.pre.length)) + '</u>' + esc(noun.slice(m.pre.length));
    return esc(noun);
  }
  function similar(noun, g) {
    var m = markOf(noun, g), out = [];
    if (!m) return out;
    GT.ARTIKEL.endings.forEach(function (e) {
      if (e[0] === noun || e[1] !== g || out.length >= 3) return;
      var m2 = markOf(e[0], e[1]);
      if (m2 && (m.group ? m2.group === m.group : m2.label === m.label)) out.push(e[0]);
    });
    return out;
  }
  function endHintHTML(s, esc) {
    var m = markOf(s.noun, s.g), parts = [];
    if (G.hc) parts.push(m && m.group ? L('смотрите на смысл: ', 'look at the meaning: ') + '<b>' + GROUP_HINT[m.group][ru() ? 0 : 1] + '</b>'
      : L('смотрите на окончание ', 'look at the ending ') + '<b>' + (m ? m.label : '') + '</b>');
    if (G.hg) { var sim = similar(s.noun, s.g); parts.push(sim.length ? L('так же: ', 'same as: ') + de(sim.map(esc).join(', ')) : L('других примеров нет', 'no similar words here')); }
    return '<p class="ag-hint">Hint: ' + parts.join(' · ') + '</p>';
  }
  function endExplainHTML(s) {
    var lines = [], m = markOf(s.noun, s.g), art = DEF.n[s.g];
    if (G.chosen && G.chosen !== art) lines.push(L('Вы выбрали ' + b(G.chosen) + ' — это ' + gName({ der: 'm', die: 'f', das: 'n' }[G.chosen]) + '.', 'You picked ' + b(G.chosen) + ' — that is for ' + gName({ der: 'm', die: 'f', das: 'n' }[G.chosen]) + ' nouns.'));
    lines.push(genderHTML(s.noun, s.g));
    lines.push(patternHTML(s.noun, s.g));
    var sim = similar(s.noun, s.g);
    if (sim.length) lines.push(L('Так же: ', 'Same pattern: ') + de(sim.map(function (x) { return art + ' ' + x; }).join(', ')) + '.');
    var pt = m && (m.suf || m.pre) ? GT.ARTIKEL.patterns.filter(function (p) { return p.g === s.g && ((p.s || []).indexOf(m.suf) >= 0 || p.p === m.pre); })[0] : null;
    if (pt && pt.mostly) lines.push(L('У этого правила есть исключения, но их немного.', 'This rule has some exceptions, but not many.'));
    return '<ul class="ag-why">' + lines.filter(Boolean).map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
  }
  function explainHTML(s) {
    var lines = [reasonHTML(s.r, s.c), genderHTML(s.noun, s.g), headHTML(s.noun, s.g, s.head), patternHTML(s.noun, s.g), formHTML(s.fam, s.c, s.g), extraHTML(s.c, s.g)];
    if (G.chosen && G.chosen !== answerOf(s)) lines.unshift(wrongHTML(s.fam, G.chosen));
    return '<ul class="ag-why">' + lines.filter(Boolean).map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
  }
  function gameHTML(api) {
    var esc = api.esc, s = sent(G.cur), ans = answerOf(s), start = /^___/.test(s.text);
    var opts = options(s.fam).map(function (o) { return start ? cap(o) : o; });
    var total = G.ok + G.bad;
    var note = '<p class="mono-muted ag-mode-note">' + (s.end
      ? 'Ending patterns: guess der / die / das from how the noun ends. These words are not part of All cases.'
      : 'All cases covers the four cases. Guessing the gender from a noun’s ending is a separate game: Ending patterns.') + '</p>';
    function tab(o) { return '<button class="seg-tab' + (G.filter === o[0] ? ' active' : '') + '" type="button" data-ag="filter" data-v="' + o[0] + '">' + o[1] + '</button>'; }
    var h = '<div class="ag-modes"><div class="seg-tabs ag-filter" role="tablist" aria-label="Case">' +
      [['all', 'All cases'], ['n', 'Nominativ'], ['a', 'Akkusativ'], ['d', 'Dativ'], ['g', 'Genitiv']].map(tab).join('') + '</div>' +
      '<div class="seg-tabs ag-solo">' + tab(['end', 'Ending patterns']) + '</div></div>' + note;
    if (s.end) return h + endGameHTML(api, s);
    h += '<div class="drill ag-card"><div class="ag-top"><p class="drill-kind">' + 'Pick the form' + ' · ' + esc(s.fam === 'der' ? 'der / die / das' : s.fam) + '</p><p class="drill-kind ag-score">✓ ' + G.ok + ' · ✗ ' + G.bad + (total ? ' · ' + 'streak' + ' ' + G.streak : '') + '</p></div>';
    var shown = G.revealed ? '<mark class="hl">' + esc(ans) + '</mark>' : '<span class="blank">____</span>';
    h += '<p class="drill-q ag-q-text" lang="de">' + esc(s.text).replace('___', shown) + '</p>';
    if ((G.hc || G.hg) && !G.revealed) {
      var parts = [];
      if (G.hc) parts.push('<b>' + CASE_NAME[s.c] + '</b> <span class="ag-q">' + CASE_Q[s.c] + '</span>');
      if (G.hg) parts.push(s.g === 'pl' ? '<b>plural</b>' : de(DEF.n[s.g] + ' ' + esc(s.noun)));
      h += '<p class="ag-hint">Hint: ' + parts.join(' · ') + '</p>';
    }
    h += '<div class="options">' + opts.map(function (o, i) {
      var cls = '';
      if (G.revealed) { if (o === ans) cls = ' ok'; else if (o === G.chosen) cls = ' bad'; }
      return '<button class="opt' + cls + '" data-ag="opt" data-v="' + esc(o) + '"' + (G.revealed ? ' disabled' : '') + ' lang="de"><span class="ag-key">' + (i + 1) + '</span>' + esc(o) + '</button>';
    }).join('') + '</div>';
    if (G.revealed) {
      var verdict = G.chosen === ans ? '✓ ' + 'Correct' : G.chosen ? '✗ ' + 'Not quite' : 'Answer';
      h += '<div class="drill-answer"><div class="a">' + verdict + ' — <span lang="de">' + esc(ans) + '</span></div><div class="x">' + explainHTML(s) + '</div></div>';
    }
    h += '</div>';
    h += '<div class="actions-row ag-actions">';
    if (!G.revealed) {
      h += '<button class="btn small" data-ag="hint"' + (G.hg ? ' disabled' : '') + '>' + (G.hc ? 'More hint · gender' : 'Hint · case') + '</button>' +
        '<button class="btn small" data-ag="show">Show answer</button>';
    }
    h += '<button class="btn small' + (G.forms ? ' active' : '') + '" data-ag="forms" aria-pressed="' + G.forms + '">' + (G.forms ? 'Hide forms' : 'All forms') + '</button>' +
      '<button class="btn small primary" data-ag="next">Next sentence →</button></div>';
    h += '<p class="mono-muted ag-keys">1–' + opts.length + ' · H hint · F forms · Enter next</p>';
    if (G.forms) {
      h += '<div class="ag-forms">' + '<h3 class="section-title">' + esc(s.fam === 'der' ? 'der / die / das' : s.fam + ' · ' + 'all forms') + '</h3>' + familyTable(s.fam, esc);
      if (s.fam !== 'der') h += '<h3 class="section-title">' + 'Compare · der / die / das' + '</h3>' + familyTable('der', esc);
      h += '</div>';
    }
    return h;
  }
  function endGameHTML(api, s) {
    var esc = api.esc, ans = answerOf(s), opts = ['der', 'die', 'das'];
    var h = '<div class="drill ag-card"><div class="ag-top"><p class="drill-kind">Pick the article · by the ending</p><p class="drill-kind ag-score">✓ ' + G.ok + ' · ✗ ' + G.bad + (G.ok + G.bad ? ' · streak ' + G.streak : '') + '</p></div>';
    var shown = G.revealed ? '<mark class="hl">' + ans + '</mark>' : '<span class="blank">____</span>';
    h += '<p class="drill-q ag-q-text ag-end-q" lang="de">' + shown + ' ' + (G.revealed || G.hc ? nounMarked(s.noun, s.g, esc) : esc(s.noun)) + '</p>';
    if ((G.hc || G.hg) && !G.revealed) h += endHintHTML(s, esc);
    h += '<div class="options">' + opts.map(function (o, i) {
      var cls = '';
      if (G.revealed) { if (o === ans) cls = ' ok'; else if (o === G.chosen) cls = ' bad'; }
      return '<button class="opt opt-' + o + cls + '" data-ag="opt" data-v="' + o + '"' + (G.revealed ? ' disabled' : '') + ' lang="de"><span class="ag-key">' + (i + 1) + '</span>' + o + '</button>';
    }).join('') + '</div>';
    if (G.revealed) {
      var verdict = G.chosen === ans ? '✓ Correct' : G.chosen ? '✗ Not quite' : 'Answer';
      h += '<div class="drill-answer"><div class="a">' + verdict + ' — <span lang="de">' + ans + ' ' + esc(s.noun) + '</span></div><div class="x">' + endExplainHTML(s) + '</div></div>';
    }
    h += '</div><div class="actions-row ag-actions">';
    if (!G.revealed) {
      h += '<button class="btn small" data-ag="hint"' + (G.hg ? ' disabled' : '') + '>' + (G.hc ? 'More hint · similar words' : 'Hint · ending') + '</button>' +
        '<button class="btn small" data-ag="show">Show answer</button>';
    }
    h += '<button class="btn small' + (G.forms ? ' active' : '') + '" data-ag="forms" aria-pressed="' + G.forms + '">' + (G.forms ? 'Hide rules' : 'All rules') + '</button>' +
      '<button class="btn small primary" data-ag="next">Next word →</button></div>';
    h += '<p class="mono-muted ag-keys">1–3 · H hint · F rules · Enter next</p>';
    if (G.forms) h += '<div class="ag-forms"><h3 class="section-title">Ending patterns</h3>' + gendersHTML(esc) + '</div>';
    return h;
  }
  var lastApi = null;
  function drawGame() {
    var el = document.getElementById('agGame');
    if (el && lastApi) el.innerHTML = gameHTML(lastApi);
  }
  function viewGame(api) {
    if (G.cur < 0) nextSentence();
    var h = api.crumbs('Language · <a href="#/articles">Articles</a> · Game');
    h += '<header class="page-head"><h1>Which form?</h1><p class="lead">' + L('Вставьте правильную форму артикля или притяжательного слова. Подсказка покажет падеж, а после ответа — почему именно так.', 'Fill in the right form of the article or possessive. The hint shows the case; after you answer you see why.') + '</p></header>';
    h += '<div id="agGame">' + gameHTML(api) + '</div>';
    api.page(h, 'mid');
    api.setKeys(function (e) {
      var k = e.key;
      if (/^[1-6]$/.test(k)) { var bt = document.querySelectorAll('#agGame [data-ag="opt"]')[Number(k) - 1]; if (bt && !G.revealed) { e.preventDefault(); act('opt', bt); } }
      else if (k === 'h' || k === 'H') { e.preventDefault(); act('hint'); }
      else if (k === 'f' || k === 'F') { e.preventDefault(); act('forms'); }
      else if (k === 'Enter' || k === 'n' || k === 'N') { e.preventDefault(); act(G.revealed || k !== 'Enter' ? 'next' : 'show'); }
    });
  }
  function act(name, el) {
    var s = sent(G.cur);
    switch (name) {
      case 'opt':
        if (G.revealed) return;
        G.chosen = el.dataset.v; G.revealed = true;
        if (G.chosen === answerOf(s)) { G.ok++; G.streak++; G.best = Math.max(G.best, G.streak); } else { G.bad++; G.streak = 0; }
        break;
      case 'show': if (G.revealed) return; G.revealed = true; G.bad++; G.streak = 0; break;
      case 'hint': if (G.revealed) return; if (!G.hc) G.hc = true; else G.hg = true; break;
      case 'hint-case': if (G.revealed) return; G.hc = !G.hc; break;
      case 'hint-gender': if (G.revealed) return; G.hg = !G.hg; break;
      case 'forms': G.forms = !G.forms; break;
      case 'next': nextSentence(); break;
      case 'filter': if (G.filter !== el.dataset.v) { G.filter = el.dataset.v; G.cur = -1; G.recent = []; } nextSentence(); break;
      default: return;
    }
    drawGame();
  }
  function jumpTo(id, smooth) {
    var t = document.getElementById('ag-' + id);
    if (t) t.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    return !!t;
  }
  document.addEventListener('click', function (e) {
    var j = e.target.closest('[data-ag-jump]');
    if (j && document.getElementById('ag-' + j.dataset.agJump)) {
      e.preventDefault();
      var scrim = document.getElementById('scrim');
      if (scrim && scrim.classList.contains('open')) scrim.click();
      jumpTo(j.dataset.agJump, true);
      try { history.replaceState(history.state, '', '#/articles?s=' + j.dataset.agJump); } catch (err) {}
      return;
    }
    var el = e.target.closest('[data-ag]');
    if (!el || !document.getElementById('agGame')) return;
    e.preventDefault();
    act(el.dataset.ag, el);
  });

  GT.artikel = {
    sections: SECTIONS,
    render: function (sub, api, params) {
      lastApi = api;
      if (!GT.ARTIKEL) return api.page('<div class="empty-state"><h3>German only</h3><p>This page belongs to the German pack.</p></div>', 'mid');
      if (sub === 'play') return viewGame(api);
      viewReference(api);
      if (params && params.s) setTimeout(function () { jumpTo(params.s, false); }, 40);
    },
    // for console checks: GT.artikel.check() → sentences / ending words that are inconsistent
    check: function () {
      var bad = GT.ARTIKEL.endings.filter(function (e) { return !markOf(e[0], e[1]); }).map(function (e) { return 'ending: ' + e[0]; });
      var seen = {};
      GT.ARTIKEL.endings.forEach(function (e) { if (seen[e[0]]) bad.push('dup ending: ' + e[0]); seen[e[0]] = 1; });
      seen = {};
      GT.ARTIKEL.sentences.forEach(function (s) { if (seen[s[0]]) bad.push('dup sentence: ' + s[0]); seen[s[0]] = 1; });
      return bad.concat(GT.ARTIKEL.sentences.map(function (s, i) {
        var ok = FAM[s[1]] && form(s[1], s[4], s[3]) && (s[0].match(/___/g) || []).length === 1 && CASES.indexOf(s[4]) >= 0;
        var r = s[5], want = { subj: 'n', pred: 'n', obj: 'a', esgibt: 'a', time: 'a', iobj: 'd', gen: 'g' }[r];
        var m = /^p:([^+]+)(?:\+(wo|wohin))?$/.exec(r);
        if (/^v:/.test(r)) want = 'd';
        else if (m && m[2]) want = m[2] === 'wo' ? 'd' : 'a';
        else if (m) want = ['a', 'd', 'g'].filter(function (c) { return PREP[c].indexOf(m[1]) >= 0; })[0] || '?';
        if (want && want !== s[4]) ok = false;
        return ok ? null : i + ': ' + s[0];
      }).filter(Boolean));
    },
    form: form
  };
})();
