/* ENGLISH · Expressions → Slang: American street slang, much of it from African American English (AAE) and
 * hip-hop. Four categories (topics slang-crew / slang-react / slang-people / slang-life, see GT.EXP_SECTIONS in
 * js/core.js). Glosses ru + de inline, notes { ru, de }. Examples written for ETRNL. register: 'slang'. */
(function () {
  'use strict';
  function S(id, topic, t, ru, de, ex, note) {
    return { id: 'en:slang:' + id, topic: topic, type: 'chunk', pos: 'chunk', register: 'slang', learnable: true,
      t: t, ru: ru, de: de, examples: [{ t: ex[0], ru: ex[1], de: ex[2] }], note: { ru: note[0], de: note[1] } };
  }
  GT.register({ tab: 'expressions', type: 'chunk', items: [
    // ---- Greetings & Crew ----
    S('whats-good', 'slang-crew', 'What’s good?', 'как оно?, чё как?', 'Was geht?',
      ['Yo, [[what’s good]]? Haven’t seen you in a minute.', 'Йоу, чё как? Сто лет тебя не видел.', 'Yo, was geht? Hab dich ewig nicht gesehen.'],
      ['Приветствие из афроамериканского английского. Ответ: «Nothing much, you?» Также «What up?», «Wassup?».', 'Begrüßung aus dem afroamerikanischen Englisch. Antwort: „Nothing much, you?“ Auch „What up?“, „Wassup?“.']),
    S('homie', 'slang-crew', 'homie', 'кореш, близкий друг', 'Kumpel, Homie',
      ['This is my [[homie]] from the block.', 'Это мой кореш с района.', 'Das ist mein Kumpel aus dem Viertel.'],
      ['От «homeboy» (парень из твоего района). Также «homegirl».', 'Von „homeboy“ (Junge aus deinem Viertel). Auch „homegirl“.']),
    S('fam', 'slang-crew', 'fam', 'братва, свои (о близких друзьях)', 'Familie, Bruder (enge Freunde)',
      ['Thanks for pulling up, [[fam]].', 'Спасибо, что подтянулись, братва.', 'Danke, dass ihr gekommen seid, Leute.'],
      ['От «family»: друзья, которые как семья. Обращение к одному человеку или группе.', 'Von „family“: Freunde, die wie Familie sind. Anrede an eine Person oder Gruppe.']),
    S('bruh', 'slang-crew', 'bruh', 'брат, чувак; ну ты чего (досада)', 'Bruder, Alter (auch genervt)',
      ['[[Bruh]], you forgot the keys again?', 'Чувак, ты опять забыл ключи?', 'Alter, du hast schon wieder die Schlüssel vergessen?'],
      ['От «brother». С протяжной интонацией выражает досаду или неверие.', 'Von „brother“. Gedehnt gesagt drückt es Frust oder Unglauben aus.']),
    S('dawg', 'slang-crew', 'dawg', 'братан, друг', 'Digga, Alter',
      ['You good, [[dawg]]?', 'Ты в порядке, братан?', 'Alles gut, Digga?'],
      ['Вариант «dog» в значении «верный друг». Дружеское мужское обращение.', 'Variante von „dog“ im Sinne von „treuer Freund“. Freundschaftliche Anrede unter Männern.']),
    S('squad', 'slang-crew', 'the squad', 'наша банда, компания друзей', 'die Crew, die Clique',
      ['The whole [[squad]] is coming tonight.', 'Вся наша банда придёт сегодня.', 'Die ganze Crew kommt heute Abend.'],
      ['Компания друзей, с которыми всё делаешь вместе. Также «crew», «gang».', 'Freundesgruppe, mit der man alles zusammen macht. Auch „crew“, „gang“.']),

    // ---- Reactions & Hype ----
    S('bet', 'slang-react', 'Bet.', 'Договорились., Замётано.', 'Abgemacht., Geht klar.',
      ['— Meet at six? — [[Bet]].', '— Встречаемся в шесть? — Замётано.', '— Treffen um sechs? — Geht klar.'],
      ['Из афроамериканского английского: короткое «да, договорились». Иронично: «Bet» = «ну-ну, посмотрим».', 'Aus dem afroamerikanischen Englisch: kurzes „ja, abgemacht“. Ironisch: „Bet“ = „na, mal sehen“.']),
    S('no-cap', 'slang-react', 'no cap', 'без шуток, отвечаю', 'ohne Scheiß, ich schwör',
      ['That was the best burger I ever had, [[no cap]].', 'Это был лучший бургер в моей жизни, отвечаю.', 'Das war der beste Burger meines Lebens, ich schwör.'],
      ['«Cap» = враньё, «no cap» = правда. Пришло из рэпа Атланты. «That’s cap» = это враньё.', '„Cap“ = Lüge, „no cap“ = ehrlich. Aus dem Atlanta-Rap. „That’s cap“ = das ist gelogen.']),
    S('lit', 'slang-react', 'It’s lit!', 'Это огонь!, Тут жара!', 'Der Hammer!, Hier geht’s ab!',
      ['The party last night [[was lit]]!', 'Вечеринка вчера была огонь!', 'Die Party gestern war der Hammer!'],
      ['Буквально «зажжённый». О вечеринке, концерте, атмосфере. Старое значение — «пьяный».', 'Wörtlich „angezündet“. Über Party, Konzert, Stimmung. Alte Bedeutung: „betrunken“.']),
    S('sheesh', 'slang-react', 'Sheesh!', 'Ого-го!, Ничего себе!', 'Boah!, Krass!',
      ['[[Sheesh]], look at that car!', 'Ого-го, ты глянь на эту тачку!', 'Boah, guck dir das Auto an!'],
      ['Удивление или восхищение, часто с протяжным «sheeeesh». Без этого — лёгкая досада.', 'Staunen oder Bewunderung, oft gedehnt „sheeeesh“. Kurz gesagt: leichter Ärger.']),
    S('bussin', 'slang-react', 'bussin’', 'офигенно вкусно, огонь', 'mega lecker, der Hammer',
      ['Your mom’s mac and cheese is [[bussin’]].', 'Мак-энд-чиз твоей мамы — просто огонь.', 'Die Mac and Cheese von deiner Mama sind mega lecker.'],
      ['Из афроамериканского английского, в основном о еде. Иногда — о чём-то очень крутом.', 'Aus dem afroamerikanischen Englisch, meist über Essen. Manchmal allgemein „richtig gut“.']),
    S('deadass', 'slang-react', 'deadass', 'серьёзно, на полном серьёзе', 'im Ernst, ohne Witz',
      ['I’m [[deadass]] moving to LA next month.', 'Я на полном серьёзе переезжаю в Лос-Анджелес в следующем месяце.', 'Ich zieh im Ernst nächsten Monat nach LA.'],
      ['Нью-йоркский сленг. Как вопрос: «Deadass?» = «Серьёзно?». Грубоватое, только между друзьями.', 'New Yorker Slang. Als Frage: „Deadass?“ = „Im Ernst?“. Etwas derb, nur unter Freunden.']),

    // ---- People & Attitude ----
    S('salty', 'slang-people', 'salty', 'обиженный, злой (из-за мелочи)', 'eingeschnappt, angepisst',
      ['He’s still [[salty]] about losing the game.', 'Он всё ещё злится, что проиграл.', 'Er ist immer noch angepisst, weil er verloren hat.'],
      ['Буквально «солёный». О мелкой обиде, зависти, раздражении.', 'Wörtlich „salzig“. Über kleinen Ärger, Neid, Gekränktheit.']),
    S('extra', 'slang-people', 'extra', 'слишком, перебор (о поведении)', 'too much, übertrieben',
      ['A limo for a picnic? That’s so [[extra]].', 'Лимузин на пикник? Это перебор.', 'Eine Limo fürs Picknick? Total übertrieben.'],
      ['О человеке или поступке, который слишком драматичен или напоказ.', 'Über eine Person oder Aktion, die zu dramatisch oder zu sehr auf Show ist.']),
    S('flex', 'slang-people', 'flex', 'понтоваться, хвастаться', 'angeben, flexen',
      ['He’s always [[flexing]] his new sneakers.', 'Он вечно понтуется своими новыми кроссами.', 'Er flext ständig mit seinen neuen Sneakers.'],
      ['Из хип-хопа: «напрягать мышцы» напоказ. «Weird flex but OK» — странный повод хвастаться.', 'Aus dem Hip-Hop: Muskeln zeigen. „Weird flex but OK“ — seltsamer Grund zum Angeben.']),
    S('bougie', 'slang-people', 'bougie', 'пафосный, косит под богатого', 'snobistisch, schickimicki',
      ['She only drinks oat-milk lattes, so [[bougie]].', 'Она пьёт только латте на овсяном, такая пафосная.', 'Sie trinkt nur Hafermilch-Latte, so schickimicki.'],
      ['От «bourgeois». Часто шутливо, без злобы.', 'Von „bourgeois“. Oft scherzhaft, ohne Bosheit.']),
    S('og', 'slang-people', 'OG', 'старая гвардия; настоящий, легенда', 'Urgestein, Legende',
      ['My grandpa is the [[OG]] of this block.', 'Мой дед — легенда этого района.', 'Mein Opa ist das Urgestein hier im Viertel.'],
      ['Изначально «Original Gangster»; сейчас — уважительно о том, кто был первым или давно в теме.', 'Ursprünglich „Original Gangster“; heute respektvoll für jemanden, der zuerst da war.']),
    S('throw-shade', 'slang-people', 'throw shade', 'язвить, исподтишка поддеть', 'jemanden dissen, sticheln',
      ['Was that a compliment or are you [[throwing shade]]?', 'Это был комплимент или ты меня подкалываешь?', 'War das ein Kompliment oder stichelst du?'],
      ['Из афроамериканской ЛГБТ-культуры балов в Нью-Йорке. Тонкое, но заметное презрение.', 'Aus der afroamerikanischen LGBTQ-Ballkultur in New York. Feine, aber spürbare Verachtung.']),

    // ---- Money, Chilling & Street ----
    S('bread', 'slang-life', 'bread', 'бабки, бабло', 'Kohle, Knete',
      ['I gotta work this weekend, I need the [[bread]].', 'В выходные надо работать, мне нужны бабки.', 'Ich muss am Wochenende arbeiten, ich brauch die Kohle.'],
      ['Буквально «хлеб». Синонимы: «guap», «cheddar», «bands» (пачки по $1000).', 'Wörtlich „Brot“. Synonyme: „guap“, „cheddar“, „bands“ (Bündel zu $1000).']),
    S('crib', 'slang-life', 'the crib', 'хата, дом', 'die Bude, mein Zuhause',
      ['Come chill at my [[crib]] after school.', 'Приходи после школы потусить ко мне на хату.', 'Komm nach der Schule zu mir in die Bude.'],
      ['Буквально «детская кроватка». Известно по шоу «MTV Cribs».', 'Wörtlich „Kinderbett“. Bekannt aus der Show „MTV Cribs“.']),
    S('chillin', 'slang-life', 'just chillin’', 'просто отдыхаю, ничего не делаю', 'nur am Chillen',
      ['— What you doing? — Nothing, [[just chillin’]].', '— Чем занят? — Ничем, просто чилю.', '— Was machst du? — Nix, nur am Chillen.'],
      ['Типичный ответ на «What’s good?». Окончание -in’ вместо -ing — норма разговорной речи.', 'Typische Antwort auf „What’s good?“. -in’ statt -ing ist in der gesprochenen Sprache normal.']),
    S('slide-through', 'slang-life', 'slide through', 'заскочить, заглянуть', 'vorbeikommen, vorbeischauen',
      ['We’re at the park, [[slide through]] later.', 'Мы в парке, заскакивай попозже.', 'Wir sind im Park, komm später vorbei.'],
      ['Неформальное приглашение. Также «pull up» — подъехать, прийти.', 'Lockere Einladung. Auch „pull up“ — vorbeikommen, auftauchen.']),
    S('dip', 'slang-life', 'dip', 'свалить, смыться', 'abhauen, sich verziehen',
      ['This party’s dead, let’s [[dip]].', 'Тут скукота, давай свалим.', 'Die Party ist tot, lass uns abhauen.'],
      ['Короткое «уйти». «I’m about to dip» = я сейчас сваливаю.', 'Kurz für „gehen“. „I’m about to dip“ = ich hau gleich ab.']),
    S('finna', 'slang-life', 'finna', 'собираюсь, вот-вот (= going to)', 'gleich, ich werd (= going to)',
      ['I’m [[finna]] grab some food, you want something?', 'Я собираюсь взять поесть, тебе что-нибудь надо?', 'Ich hol mir gleich was zu essen, willst du was?'],
      ['Из «fixing to» в афроамериканском и южном английском. Только в речи, не в письме на работе.', 'Von „fixing to“ im afroamerikanischen und Südstaaten-Englisch. Nur gesprochen, nicht in Arbeitsmails.'])
  ] });
})();
