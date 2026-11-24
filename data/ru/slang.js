/* RUSSIAN · Expressions → Slang: youth and street slang. Four categories (topics slang-crew / slang-react /
 * slang-people / slang-life, see GT.EXP_SECTIONS in js/core.js). Glosses en + de, notes { en, de }.
 * Stress: + before the stressed vowel in headwords. Examples written for ETRNL. register: 'slang'. */
(function () {
  'use strict';
  function S(id, topic, t, en, de, ex, note) {
    return { id: 'ru-slang-' + id, topic: topic, type: 'chunk', register: 'slang', t: t, en: en, de: de,
      examples: [{ t: ex[0], en: ex[1], de: ex[2] }], note: { en: note[0], de: note[1] } };
  }
  GT.register({ tab: 'expressions', type: 'chunk', items: [
    // ---- Greetings & Crew ----
    S('zdarova', 'slang-crew', 'Здар+ова!', 'Hey!, Yo! (greeting)', 'Hi!, Na? (Begrüßung)',
      ['[[Здарова]], давно не виделись!', 'Yo, long time no see!', 'Hey, lange nicht gesehen!'],
      ['From «здорово» (be healthy). Only with friends; to strangers say «здравствуйте».', 'Von «здорово» (sei gesund). Nur unter Freunden; zu Fremden «здравствуйте».']),
    S('che-kak', 'slang-crew', 'Чё как?', 'What’s up?, How’s it going?', 'Was geht?, Wie läuft’s?',
      ['Привет, [[чё как]]? Всё норм?', 'Hi, what’s up? All good?', 'Hi, was geht? Alles gut?'],
      ['«Чё» is the colloquial form of «что». Answer: «Норм», «Да ничё».', '«Чё» ist die umgangssprachliche Form von «что». Antwort: «Норм», «Да ничё».']),
    S('bratan', 'slang-crew', 'брат+ан', 'bro, brother (address)', 'Bruder, Digga (Anrede)',
      ['[[Братан]], выручи, а?', 'Bro, help me out, will you?', 'Bruder, hilf mir mal, ja?'],
      ['Friendly address between young men. Also «бро», «братишка».', 'Freundschaftliche Anrede unter jungen Männern. Auch «бро», «братишка».']),
    S('chuvak', 'slang-crew', 'чув+ак', 'dude, guy', 'Typ, Alter',
      ['Слушай, [[чувак]], ты гений!', 'Listen, dude, you’re a genius!', 'Hör mal, Alter, du bist ein Genie!'],
      ['Both an address and “some guy”: «Там какой-то чувак тебя ищет». Female: «чувиха» (dated).', 'Anrede und „irgendein Typ“: «Там какой-то чувак тебя ищет». Weiblich: «чувиха» (veraltet).']),
    S('koresh', 'slang-crew', 'к+ореш', 'mate, buddy', 'Kumpel, Atze',
      ['Это мой [[кореш]] со двора.', 'That’s my buddy from the block.', 'Das ist mein Kumpel aus dem Hof.'],
      ['A close friend, often from the same courtyard or school. Plural «кореша».', 'Ein enger Freund, oft aus demselben Hof oder derselben Schule. Plural «кореша».']),
    S('go', 'slang-crew', 'Го!', 'Let’s go!, Come on!', 'Los!, Komm, lass uns!',
      ['[[Го]] в кино вечером?', 'Up for the cinema tonight?', 'Lust auf Kino heute Abend?'],
      ['From English “go”, via gaming. «Го в …» = let’s go to … . Also «погнали».', 'Vom englischen „go“, über Gaming. «Го в …» = lass uns … . Auch «погнали».']),

    // ---- Reactions & Hype ----
    S('zhiza', 'slang-react', 'жиз+а', 'so relatable, that’s life', 'so wahr, kenn ich',
      ['Понедельник, кофе не помогает… [[жиза]].', 'Monday, coffee isn’t helping… so relatable.', 'Montag, Kaffee hilft nicht… kenn ich.'],
      ['From «жизненно» (true to life). Said about memes and situations you recognise.', 'Von «жизненно» (lebensnah). Über Memes und Situationen, die man kennt.']),
    S('kringe', 'slang-react', 'кр+индж', 'cringe, embarrassing', 'cringe, peinlich',
      ['Он пел в метро? Какой [[кринж]]!', 'He sang in the metro? So cringe!', 'Er hat in der U-Bahn gesungen? Wie cringe!'],
      ['From English “cringe”. Adjective «кринжовый», verb «кринжевать».', 'Vom englischen „cringe“. Adjektiv «кринжовый», Verb «кринжевать».']),
    S('ogon', 'slang-react', 'Ог+онь!', 'It’s fire!, Awesome!', 'Der Hammer!, Mega!',
      ['Новый трек — просто [[огонь]]!', 'The new track is pure fire!', 'Der neue Track ist der Hammer!'],
      ['Literally “fire”. Highest praise for music, food, clothes.', 'Wörtlich „Feuer“. Höchstes Lob für Musik, Essen, Kleidung.']),
    S('zhest', 'slang-react', 'Жесть!', 'Brutal!, Crazy! (shock)', 'Krass!, Heftig!',
      ['Он упал с велика прямо в лужу? [[Жесть]]!', 'He fell off his bike right into a puddle? Brutal!', 'Er ist vom Fahrrad direkt in die Pfütze gefallen? Heftig!'],
      ['Literally “tin”. Usually about something shocking or extreme; sometimes positive.', 'Wörtlich „Blech“. Meist über etwas Schockierendes oder Extremes; manchmal positiv.']),
    S('kapets', 'slang-react', 'Кап+ец!', 'Damn!, That’s a disaster!', 'Mist!, Krass!',
      ['Я опоздал на последний автобус. [[Капец]]!', 'I missed the last bus. Damn!', 'Ich habe den letzten Bus verpasst. So ein Mist!'],
      ['A softened swear word. Can also be an intensifier: «капец как холодно» (so cold).', 'Ein abgeschwächtes Schimpfwort. Auch Verstärker: «капец как холодно» (mega kalt).']),
    S('norm', 'slang-react', 'Норм.', 'Fine., OK.', 'Passt., Okay.',
      ['— Как фильм? — [[Норм]].', '— How was the film? — Fine.', '— Wie war der Film? — Passt.'],
      ['Short for «нормально». The default neutral answer among friends.', 'Kurz für «нормально». Die neutrale Standardantwort unter Freunden.']),

    // ---- People & Attitude ----
    S('krash', 'slang-people', 'краш', 'crush (person you like)', 'Schwarm, Crush',
      ['Он мой [[краш]] с первого курса.', 'He’s been my crush since first year.', 'Er ist mein Schwarm seit dem ersten Semester.'],
      ['From English “crush”. Also «крашиться по кому-то».', 'Vom englischen „crush“. Auch «крашиться по кому-то» (auf jemanden stehen).']),
    S('dushnila', 'slang-people', 'душн+ила', 'buzzkill, nitpicker, bore', 'Spaßbremse, Klugscheißer',
      ['Не будь [[душнилой]], это просто шутка.', 'Don’t be a buzzkill, it’s just a joke.', 'Sei keine Spaßbremse, das ist nur ein Witz.'],
      ['From «душно» (stuffy): someone who makes the air heavy with pedantry. Verb «душнить».', 'Von «душно» (stickig): jemand, der mit Pedanterie die Luft schwer macht. Verb «душнить».']),
    S('pontovatsya', 'slang-people', 'понтов+аться', 'to show off, to flex', 'angeben, auf dicke Hose machen',
      ['Хватит [[понтоваться]] своим айфоном.', 'Stop flexing with your iPhone.', 'Hör auf, mit deinem iPhone anzugeben.'],
      ['Noun «понты» (showing off): «Это всё понты».', 'Substantiv «понты» (Angeberei): «Это всё понты».']),
    S('mazhor', 'slang-people', 'маж+ор', 'rich kid, spoilt kid of rich parents', 'reiches Söhnchen, Bonzenkind',
      ['Этот [[мажор]] приехал на папиной машине.', 'That rich kid came in his dad’s car.', 'Das Bonzenkind kam mit Papas Auto.'],
      ['Ironic or critical. Feminine «мажорка».', 'Ironisch oder kritisch. Weiblich «мажорка».']),
    S('gopnik', 'slang-people', 'г+опник', 'street thug, chav', 'Proll, Assi',
      ['Вечером у подъезда опять [[гопники]].', 'The thugs are at the entrance again tonight.', 'Abends hängen wieder die Prolls vor dem Hauseingang.'],
      ['Stereotype: tracksuit, squatting, sunflower seeds. Disparaging; «гопота» = a group of them.', 'Klischee: Trainingsanzug, Hocke, Sonnenblumenkerne. Abwertend; «гопота» = eine Gruppe davon.']),
    S('ne-goni', 'slang-people', 'Не гон+и!', 'Stop talking nonsense!, No way!', 'Laber nicht!, Erzähl keinen Quatsch!',
      ['— Я выиграл миллион. — [[Не гони]]!', '— I won a million. — Stop talking nonsense!', '— Ich habe eine Million gewonnen. — Laber nicht!'],
      ['«Гнать» in slang = to talk rubbish, to lie. Also «Не гони, успокойся» = don’t panic.', '«Гнать» im Slang = Unsinn reden, lügen. Auch «Не гони» = reg dich ab.']),

    // ---- Money, Chilling & Street ----
    S('babki', 'slang-life', 'б+абки', 'cash, dough', 'Kohle, Knete',
      ['У меня [[бабок]] до зарплаты не хватит.', 'I won’t have enough cash till payday.', 'Meine Kohle reicht nicht bis zum Gehalt.'],
      ['Plural only. Also «бабло», «лавэ». A thousand roubles = «косарь».', 'Nur Plural. Auch «бабло», «лавэ». Tausend Rubel = «косарь».']),
    S('tusit', 'slang-life', 'тус+ить', 'to party, to hang out', 'feiern, abhängen',
      ['Мы всю ночь [[тусили]] у друзей.', 'We partied all night at our friends’ place.', 'Wir haben die ganze Nacht bei Freunden gefeiert.'],
      ['Noun «тусовка» (party; also a scene: «IT-тусовка»).', 'Substantiv «тусовка» (Party; auch Szene: «IT-тусовка»).']),
    S('chilit', 'slang-life', 'ч+илить', 'to chill', 'chillen',
      ['В субботу просто [[чилим]] дома.', 'On Saturday we’re just chilling at home.', 'Am Samstag chillen wir einfach zu Hause.'],
      ['From English “chill”, conjugated like a Russian verb: я чилю, ты чилишь.', 'Vom englischen „chill“, russisch konjugiert: я чилю, ты чилишь.']),
    S('hata', 'slang-life', 'х+ата', 'pad, place (flat)', 'Bude, Wohnung',
      ['Родители уехали, [[хата]] свободна!', 'My parents are away, the place is free!', 'Die Eltern sind weg, sturmfreie Bude!'],
      ['«Свободная хата» = parents away, so you can have a party.', '«Свободная хата» = sturmfreie Bude.']),
    S('svalit', 'slang-life', 'свал+ить', 'to bounce, to clear off', 'abhauen, die Biege machen',
      ['Тут скучно, давай [[свалим]].', 'It’s boring here, let’s bounce.', 'Hier ist es langweilig, lass uns abhauen.'],
      ['Perfective. Also «свалить за границу» = emigrate. Imperfective «сваливать».', 'Vollendeter Aspekt. Auch «свалить за границу» = auswandern. Unvollendet «сваливать».']),
    S('na-meli', 'slang-life', 'на мел+и', 'broke', 'pleite, blank',
      ['Не могу пойти, я [[на мели]].', 'Can’t go, I’m broke.', 'Ich kann nicht mitkommen, ich bin pleite.'],
      ['Literally “run aground” (a ship). Also «без копейки».', 'Wörtlich „auf Grund gelaufen“ (Schiff). Auch «без копейки».'])
  ] });
})();
