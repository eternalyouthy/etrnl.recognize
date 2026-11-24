/* GERMAN · Expressions → Slang: Berlin street and youth slang (Kiezdeutsch, Jugendsprache).
 * Four categories (topics slang-crew / slang-react / slang-people / slang-life, see GT.EXP_SECTIONS in js/core.js).
 * Glosses ru + en inline, notes { ru, en }. Examples written for ETRNL. register: 'slang'. */
(function () {
  'use strict';
  function S(id, topic, de, ru, en, ex, note) {
    return { id: 'exp-slang-' + id, topic: topic, type: 'chunk', register: 'slang', de: de, ru: ru, en: en,
      examples: [{ de: ex[0], ru: ex[1], en: ex[2] }], note: { ru: note[0], en: note[1] } };
  }
  GT.register({ tab: 'expressions', type: 'chunk', items: [
    // ---- Greetings & Crew ----
    S('digga', 'slang-crew', 'Digga', 'братан, чувак (обращение к другу)', 'bro, dude (addressing a friend)',
      ['[[Digga]], wo bist du? Wir warten am Späti.', 'Братан, ты где? Мы ждём у Шпети.', 'Bro, where are you? We’re waiting at the Späti.'],
      ['Самое типичное обращение берлинской и гамбургской молодёжи; от «Dicker» (толстяк), но давно без обидного смысла. Также удивление: «Digga, was?!»', 'The classic address among young people in Berlin and Hamburg; from “Dicker” (fatty) but no longer insulting. Also surprise: “Digga, was?!”']),
    S('alter', 'slang-crew', 'Alter!', 'чувак!; блин! (обращение или удивление)', 'dude!; man! (address or surprise)',
      ['[[Alter]], hast du das gesehen?', 'Чувак, ты это видел?', 'Dude, did you see that?'],
      ['Буквально «старик». Может быть обращением к другу или просто восклицанием: «Alter, ist das teuer!»', 'Literally “old one”. Either an address or a pure exclamation: “Alter, ist das teuer!”']),
    S('atze', 'slang-crew', 'Atze', 'кореш, приятель (берлинское)', 'mate, buddy (Berlin)',
      ['Das ist mein [[Atze]] aus der Schule.', 'Это мой кореш со школы.', 'That’s my buddy from school.'],
      ['Чисто берлинское слово: друг, брат. Известно по берлинскому рэпу и комикам.', 'A typically Berlin word for friend or brother, known from Berlin rap and comedians.']),
    S('was-geht', 'slang-crew', 'Was geht (ab)?', 'как дела?; чё как?', 'what’s up?',
      ['Ey, [[was geht]]? Lange nicht gesehen!', 'Эй, чё как? Давно не виделись!', 'Hey, what’s up? Long time no see!'],
      ['Неформальное приветствие вместо «Wie geht’s?». Ответ: «Nix, chillen.» или «Alles gut, bei dir?»', 'Casual greeting instead of “Wie geht’s?”. Answer: “Nix, chillen.” or “Alles gut, bei dir?”']),
    S('bruder', 'slang-crew', 'Bruder / Bro', 'брат, братан', 'bro, brother',
      ['[[Bruder]], du bist der Beste.', 'Брат, ты лучший.', 'Bro, you’re the best.'],
      ['Обращение к близкому другу; в Кицдойче часто «Bra» или «Brudi».', 'Address for a close friend; in Kiezdeutsch often “Bra” or “Brudi”.']),
    S('wallah', 'slang-crew', 'Wallah! / Ich schwör!', 'клянусь!, честно!', 'I swear!, for real!',
      ['[[Wallah]], ich war das nicht!', 'Клянусь, это не я!', 'I swear, it wasn’t me!'],
      ['«Wallah» — из арабского («клянусь Богом»), вошло в немецкий уличный язык через Кицдойч. «Ich schwör» — то же по-немецки.', '“Wallah” comes from Arabic (“by God”) and entered German street language via Kiezdeutsch. “Ich schwör” is the German version.']),

    // ---- Reactions & Hype ----
    S('krass', 'slang-react', 'Krass!', 'жесть!; офигеть! (и о хорошем, и о плохом)', 'crazy!, wow! (good or bad)',
      ['Du hast den Job? [[Krass]]!', 'Ты получил работу? Офигеть!', 'You got the job? Crazy!'],
      ['Самая частая реакция у молодёжи. Усиление: «voll krass», «krass gut».', 'The most common youth reaction. Stronger: “voll krass”, “krass gut”.']),
    S('laeuft', 'slang-react', 'Läuft bei dir!', 'у тебя всё в шоколаде!; круто устроился!', 'you’re killing it!, nice going!',
      ['Neue Wohnung, neuer Job – [[läuft bei dir]]!', 'Новая квартира, новая работа — у тебя всё в шоколаде!', 'New flat, new job — you’re killing it!'],
      ['Было молодёжным словом года 2014. Часто иронично, когда у кого-то что-то не получилось.', 'Youth word of the year 2014. Often ironic when something went wrong for someone.']),
    S('isso', 'slang-react', 'Isso.', 'так и есть; факт', 'that’s how it is; facts',
      ['– Montags ist die U-Bahn immer voll. – [[Isso]].', '— По понедельникам метро всегда забито. — Факт.', '— The U-Bahn is always packed on Mondays. — Facts.'],
      ['Сокращение от «ist so». Короткое согласие без обсуждения.', 'Short for “ist so”. Quick agreement, end of discussion.']),
    S('safe', 'slang-react', 'Safe!', 'точно!, стопудово!', 'for sure!, definitely!',
      ['– Kommst du heute Abend? – [[Safe]]!', '— Придёшь сегодня вечером? — Стопудово!', '— Are you coming tonight? — For sure!'],
      ['Произносится по-английски. Значит «sicher», «на сто процентов».', 'Pronounced as in English. Means “sicher”, a hundred percent.']),
    S('goenn-dir', 'slang-react', 'Gönn dir!', 'балуй себя!, давай, ты заслужил!', 'treat yourself!, go for it!',
      ['Noch ein Döner? [[Gönn dir]]!', 'Ещё один дёнер? Давай, ты заслужил!', 'Another döner? Treat yourself!'],
      ['От «gönnen» (не жалеть, позволить). Бывает иронично: «Ehrenmann, gönn dir».', 'From “gönnen” (to grant, not begrudge). Can be ironic.']),
    S('cringe', 'slang-react', 'Das ist so cringe.', 'это такой кринж', 'that’s so cringe',
      ['Er hat im Bus laut gesungen – [[so cringe]].', 'Он громко пел в автобусе — такой кринж.', 'He sang loudly on the bus — so cringe.'],
      ['Молодёжное слово года 2021. Неловко, стыдно за кого-то.', 'Youth word of the year 2021. Awkward, second-hand embarrassment.']),

    // ---- People & Attitude ----
    S('ehrenmann', 'slang-people', 'Ehrenmann / Ehrenfrau', 'человек чести; красавчик (за добрый поступок)', 'a real one, a legend (for a kind act)',
      ['Er hat mir sein letztes Ticket gegeben – [[Ehrenmann]]!', 'Он отдал мне свой последний билет — красавчик!', 'He gave me his last ticket — a real one!'],
      ['Молодёжное слово года 2018. Похвала за порядочный, щедрый поступок.', 'Youth word of the year 2018. Praise for someone who did something decent or generous.']),
    S('lauch', 'slang-people', 'Lauch', 'дрищ, слабак', 'weakling, noodle (skinny guy)',
      ['Der [[Lauch]] kann nicht mal die Kiste tragen.', 'Этот дрищ даже ящик донести не может.', 'That noodle can’t even carry the crate.'],
      ['Буквально «лук-порей». Насмешка над худым, слабым человеком; между друзьями шутливо.', 'Literally “leek”. Mocks a skinny, weak person; teasing among friends.']),
    S('lost', 'slang-people', 'lost sein', 'не в теме, потерянный, не врубаться', 'be clueless, be lost',
      ['In Mathe bin ich komplett [[lost]].', 'В математике я вообще не врубаюсь.', 'I’m completely lost in maths.'],
      ['Молодёжное слово года 2020. О человеке, который не понимает, что происходит.', 'Youth word of the year 2020. Someone who has no idea what’s going on.']),
    S('babo', 'slang-people', 'Babo', 'босс, главный', 'the boss, the big man',
      ['Im Kiez ist er der [[Babo]].', 'В районе он главный.', 'In the neighbourhood he’s the boss.'],
      ['Из турецкого «baba» (отец); популярно с песни Хафтбефеля «Chabos wissen, wer der Babo ist» (молодёжное слово 2013).', 'From Turkish “baba” (father); famous from Haftbefehl’s “Chabos wissen, wer der Babo ist” (youth word 2013).']),
    S('dicke-hose', 'slang-people', 'auf dicke Hose machen', 'понтоваться, выпендриваться', 'show off, act big',
      ['Mit seinem Auto [[macht]] er immer [[auf dicke Hose]].', 'Со своей тачкой он вечно понтуется.', 'He always shows off with his car.'],
      ['Буквально «делать вид, что штаны толстые» (от денег в кармане).', 'Literally “acting like your trousers are fat” (with money in the pockets).']),
    S('stress-machen', 'slang-people', 'Mach keinen Stress!', 'не нарывайся!; не устраивай разборок!', 'don’t start trouble!, chill!',
      ['Ey, [[mach keinen Stress]], wir wollen nur feiern.', 'Эй, не нарывайся, мы просто хотим потусить.', 'Hey, don’t start trouble, we just want to party.'],
      ['«Stress machen / Stress schieben» на улице значит искать конфликт, драку.', 'On the street “Stress machen / schieben” means picking a fight.']),

    // ---- Money, Chilling & Street ----
    S('para', 'slang-life', 'Para / Kohle', 'бабки, деньги', 'cash, dough',
      ['Ich hab keine [[Para]] mehr, Digga.', 'У меня бабок больше нет, братан.', 'I’m out of cash, bro.'],
      ['«Para» — из турецкого (деньги), уличное. «Kohle» (уголь) — разговорное по всей Германии.', '“Para” is from Turkish (money), street usage. “Kohle” (coal) is colloquial everywhere in Germany.']),
    S('chillen', 'slang-life', 'chillen', 'чилить, отдыхать, ничего не делать', 'chill, hang out',
      ['Heute wird nur [[gechillt]].', 'Сегодня только чилим.', 'Today we’re just chilling.'],
      ['Обычный немецкий глагол: ich chille, gechillt. «Chill mal!» — «Успокойся!»', 'A regular German verb: ich chille, gechillt. “Chill mal!” — “Calm down!”']),
    S('spaeti', 'slang-life', 'der Späti', 'круглосуточный магазинчик (Берлин)', 'late-night corner shop (Berlin)',
      ['Wir holen noch zwei Mate vom [[Späti]].', 'Возьмём ещё две мате в Шпети.', 'Let’s grab two more Mates from the Späti.'],
      ['Сокращение от «Spätkauf». Центр уличной жизни Берлина: напитки, снеки, посиделки у входа.', 'Short for “Spätkauf”. The hub of Berlin street life: drinks, snacks, sitting outside.']),
    S('bock', 'slang-life', '(keinen) Bock haben', '(не) иметь охоты, (не) хотеть', 'be (not) up for it',
      ['Ich hab heute [[keinen Bock]] auf Uni.', 'Мне сегодня неохота в универ.', 'I can’t be bothered with uni today.'],
      ['«Hast du Bock auf Kino?» — «Хочешь в кино?». Очень разговорное, но не грубое.', '“Hast du Bock auf Kino?” — “Fancy the cinema?”. Very colloquial but not rude.']),
    S('biege', 'slang-life', 'die Biege machen', 'свалить, смыться', 'bounce, take off',
      ['Die Party ist langweilig, lass uns [[die Biege machen]].', 'Вечеринка скучная, давай свалим.', 'The party’s boring, let’s bounce.'],
      ['Буквально «сделать изгиб». Синонимы: «abhauen», «sich verpissen» (грубо).', 'Literally “make a bend”. Synonyms: “abhauen”, “sich verpissen” (rude).']),
    S('abhaengen', 'slang-life', 'abhängen', 'тусоваться, зависать', 'hang out',
      ['Wir [[hängen]] am Kanal [[ab]].', 'Мы зависаем на канале.', 'We’re hanging out by the canal.'],
      ['Отделяемая приставка: ich hänge ab, abgehangen. «Wo hängt ihr ab?» — «Где вы тусите?»', 'Separable verb: ich hänge ab, abgehangen. “Wo hängt ihr ab?” — “Where are you hanging out?”'])
  ] });
})();
