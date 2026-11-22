/**
 * ПРОМСПЕЦБУД КРЕМЕНЧУК — ЛЕГКИЙ I18N ДВИЖОК (UA / RU / EN / PL)
 * Переклад спільного "каркаса" сайту (меню, шапка, підвал, UI) зберігається тут.
 * Переклад унікального контенту кожної сторінки зберігається у <script type="application/json" id="i18n-page-dict">.
 */
(function () {
  'use strict';

  var LANGS = ['uk', 'ru', 'en', 'pl'];
  var STORAGE_KEY = 'psb-lang';

  /* ========================================================================
     СПІЛЬНИЙ СЛОВНИК (меню, шапка, підвал, службові елементи інтерфейсу)
     ======================================================================== */
  var SHARED = {
    uk: {
      'brand.desc': 'Пальові фундаменти в Україні',

      'top.location': 'м. Кременчук, Полтавська обл.',
      'top.hours': 'Пн–Сб: 08:00 – 19:00',
      'top.truck': 'Виїзд техніки по всій Україні за 3-4 дні',
      'top.phoneDirector': '+38 (067) 535-02-29 (Директор)',
      'top.phonePto': '+38 (067) 530-50-58 (ПТО)',

      'nav.home': 'Головна',
      'nav.works': 'Види робіт',
      'nav.w1': 'Забивні палі (гідромолоти)',
      'nav.w2': 'Буронабивні палі (RH-25)',
      'nav.w3': 'Буроін\u2019єкційні палі (Bauer CFA)',
      'nav.w4': 'Лідерне буріння свердловин',
      'nav.w5': 'Вдавлювання паль (Fundex / Starke)',
      'nav.w6': 'Статичні та динамічні випробування',
      'nav.w7': 'Стіна в ґрунті та ґрунтові анкери',
      'nav.w8': 'Ростверки та бетонні роботи',
      'nav.tech': 'Техніка',
      'nav.t1': 'Копрові установки (СП-49, ЕО-5111)',
      'nav.t2': 'Бурові машини (Bauer RG-20, RH-25)',
      'nav.t3': 'Гідромолоти (Junttan, Bruce, BSP)',
      'nav.t4': 'Кранове та допоміжне обладнання',
      'nav.t5': 'Продаж неліквідів та техніки',
      'nav.projects': 'Проекти',
      'nav.gallery': 'Фото',
      'nav.video': 'Відео',
      'nav.licenses': 'Ліцензії',
      'nav.contacts': 'Контакти',
      'nav.cta': 'Замовити розрахунок',
      'nav.menu': 'Меню',
      'nav.lang': 'Вибір мови',

      'footer.about': 'ТОВ «Промспецбуд» (м. Кременчук) — лідер пальового фундаментобудування в Україні з 2003 року. Спеціалізуємося на забивних, буронабивних та буроін\u2019єкційних палях для елеваторів, заводів, логістичних хабів та житлових масивів.',
      'footer.badge1': 'Ліцензія ДАБІ',
      'footer.badge2': 'Дозвіл Держгірпромнагляду',
      'footer.col1': 'Види робіт',
      'footer.col2': 'Техніка та проекти',
      'footer.col3': 'Контактний центр',
      'footer.f1': 'Забивні палі (300-400 мм)',
      'footer.f2': 'Буронабивні палі (RH-25)',
      'footer.f3': 'Буроін\u2019єкційні палі (CFA)',
      'footer.f4': 'Лідерне буріння свердловин',
      'footer.f5': 'Статичні випробування',
      'footer.f6': 'Стіна в ґрунті та анкери',
      'footer.f7': 'Монолітні ростверки',
      'footer.g1': 'Гідромолоти Junttan / Bruce',
      'footer.g2': 'Бурові Bauer RG-20 та RH-25',
      'footer.g3': 'Копрові установки СП-49, СП-47',
      'footer.g4': 'Елеватори «Нібулон», «Кернел»',
      'footer.g5': 'ТЦ «Епіцентр», «АрселорМіттал»',
      'footer.g6': 'Фотозвіти з будмайданчиків',
      'footer.g7': 'Відео робіт на об\u2019єктах',
      'footer.director': 'Кузік Віктор Федорович (Директор)',
      'footer.phoneDirector': '+38 (067) 535-02-29 (Директор)',
      'footer.phoneEngineer': '+38 (067) 532-97-90 (Гол. інженер)',
      'footer.phonePto': '+38 (067) 530-50-58 (ПТО)',
      'footer.location': 'м. Кременчук, Полтавська обл., Україна',
      'footer.send': 'Надіслати запит',
      'footer.copyright': '© 2003–2026 ТОВ «Промспецбуд» (м. Кременчук). Всі права захищено.',
      'footer.licensesLink': 'Ліцензії та Дозволи',
      'footer.geoLink': 'Географія робіт',
      'footer.contactsLink': 'Контакти',

      'ui.close': 'Закрити',
      'ui.prev': 'Назад',
      'ui.next': 'Вперед',
      'ui.backTop': 'Вгору',
      'ui.zoom': 'Натисніть для збільшення документа',
      'ui.more': 'Детальніше',

      'form.required': 'Будь ласка, вкажіть ваше ім\u2019я та контактний номер телефону.',
      'form.sending': 'Надсилаємо…',
      'form.success': 'Заявку успішно надіслано!',
      'form.successAlert': 'Дякуємо, {name}! Ваша заявка прийнята. Інженер ТОВ «Промспецбуд» зв\u2019яжеться з вами протягом найближчого часу за номером {phone}.',
      'form.error': 'Помилка надсилання',
      'form.errorAlert': 'На жаль, виникла помилка при відправці. Будь ласка, зателефонуйте нам або надішліть лист на promspecbud5@gmail.com.',
      'client.nibulon': 'ТОВ «НІБУЛОН»',
      'client.epicentr': 'ТЦ «ЕПІЦЕНТР»',
      'client.epicentrK': 'ТЦ «ЕПІЦЕНТР К»',
      'client.arcelor': 'АРСЕЛОРМІТТАЛ',
      'client.arcelorKR': 'ВАТ «АРСЕЛОРМІТТАЛ КРИВИЙ РІГ»',
      'client.arcelorShort': 'ВАТ «АРСЕЛОРМІТТАЛ»',
      'client.ukrtatnafta': 'ПАТ «УКРТАТНАФТА»',
      'client.kernel': 'КЕРНЕЛ ГРУП',
      'client.astarta': 'АСТАРТА-КИЇВ',
      'client.astartaHold': 'ХОЛДИНГ «АСТАРТА-КИЇВ» / РАЙЗ АГРО',
      'client.astartaHoldShort': 'ХОЛДИНГ «АСТАРТА-КИЇВ»',
      'client.kremenchuk': 'КП «КРЕМЕНЧУКНАФТОХІМБУДІНВЕСТ»',
      'client.vorskla': 'ТОВ «ВОРСКЛА-СТАЛЬ»',
      'client.hermes': 'ГЕРМЕС ТРЕЙДІНГ',
      'client.zhytlobud': 'ТОВ МЖК «ЖИТЛОБУДІНВЕСТ»',
      'client.shakhtar': 'СТАДІОН «ШАХТАР»'
    },
    ru: {
      'brand.desc': 'Свайные фундаменты в Украине',

      'top.location': 'г. Кременчуг, Полтавская обл.',
      'top.hours': 'Пн–Сб: 08:00 – 19:00',
      'top.truck': 'Выезд техники по всей Украине за 3-4 дня',
      'top.phoneDirector': '+38 (067) 535-02-29 (Директор)',
      'top.phonePto': '+38 (067) 530-50-58 (ПТО)',

      'nav.home': 'Главная',
      'nav.works': 'Виды работ',
      'nav.w1': 'Забивные сваи (гидромолоты)',
      'nav.w2': 'Буронабивные сваи (RH-25)',
      'nav.w3': 'Буроинъекционные сваи (Bauer CFA)',
      'nav.w4': 'Лидерное бурение скважин',
      'nav.w5': 'Вдавливание свай (Fundex / Starke)',
      'nav.w6': 'Статические и динамические испытания',
      'nav.w7': 'Стена в грунте и грунтовые анкеры',
      'nav.w8': 'Ростверки и бетонные работы',
      'nav.tech': 'Техника',
      'nav.t1': 'Копровые установки (СП-49, ЭО-5111)',
      'nav.t2': 'Буровые машины (Bauer RG-20, RH-25)',
      'nav.t3': 'Гидромолоты (Junttan, Bruce, BSP)',
      'nav.t4': 'Крановое и вспомогательное оборудование',
      'nav.t5': 'Продажа неликвидов и техники',
      'nav.projects': 'Проекты',
      'nav.gallery': 'Фото',
      'nav.video': 'Видео',
      'nav.licenses': 'Лицензии',
      'nav.contacts': 'Контакты',
      'nav.cta': 'Заказать расчёт',
      'nav.menu': 'Меню',
      'nav.lang': 'Выбор языка',

      'footer.about': 'ООО «Промспецбуд» (г. Кременчуг) — лидер свайного фундаментостроения в Украине с 2003 года. Специализируемся на забивных, буронабивных и буроинъекционных сваях для элеваторов, заводов, логистических хабов и жилых массивов.',
      'footer.badge1': 'Лицензия ГАСИ',
      'footer.badge2': 'Разрешение Госгорпромнадзора',
      'footer.col1': 'Виды работ',
      'footer.col2': 'Техника и проекты',
      'footer.col3': 'Контактный центр',
      'footer.f1': 'Забивные сваи (300-400 мм)',
      'footer.f2': 'Буронабивные сваи (RH-25)',
      'footer.f3': 'Буроинъекционные сваи (CFA)',
      'footer.f4': 'Лидерное бурение скважин',
      'footer.f5': 'Статические испытания',
      'footer.f6': 'Стена в грунте и анкеры',
      'footer.f7': 'Монолитные ростверки',
      'footer.g1': 'Гидромолоты Junttan / Bruce',
      'footer.g2': 'Буровые Bauer RG-20 и RH-25',
      'footer.g3': 'Копровые установки СП-49, СП-47',
      'footer.g4': 'Элеваторы «Нибулон», «Кернел»',
      'footer.g5': 'ТЦ «Эпицентр», «АрселорМиттал»',
      'footer.g6': 'Фотоотчёты со стройплощадок',
      'footer.g7': 'Видео работ на объектах',
      'footer.director': 'Кузик Виктор Фёдорович (Директор)',
      'footer.phoneDirector': '+38 (067) 535-02-29 (Директор)',
      'footer.phoneEngineer': '+38 (067) 532-97-90 (Гл. инженер)',
      'footer.phonePto': '+38 (067) 530-50-58 (ПТО)',
      'footer.location': 'г. Кременчуг, Полтавская обл., Украина',
      'footer.send': 'Отправить запрос',
      'footer.copyright': '© 2003–2026 ООО «Промспецбуд» (г. Кременчуг). Все права защищены.',
      'footer.licensesLink': 'Лицензии и Разрешения',
      'footer.geoLink': 'География работ',
      'footer.contactsLink': 'Контакты',

      'ui.close': 'Закрыть',
      'ui.prev': 'Назад',
      'ui.next': 'Вперёд',
      'ui.backTop': 'Вверх',
      'ui.zoom': 'Нажмите для увеличения документа',
      'ui.more': 'Подробнее',

      'form.required': 'Пожалуйста, укажите ваше имя и контактный номер телефона.',
      'form.sending': 'Отправляем…',
      'form.success': 'Заявка успешно отправлена!',
      'form.successAlert': 'Спасибо, {name}! Ваша заявка принята. Инженер ООО «Промспецбуд» свяжется с вами в ближайшее время по номеру {phone}.',
      'form.error': 'Ошибка отправки',
      'form.errorAlert': 'К сожалению, при отправке возникла ошибка. Пожалуйста, позвоните нам или напишите на promspecbud5@gmail.com.',
      'client.nibulon': 'ООО «НИБУЛОН»',
      'client.epicentr': 'ТЦ «ЭПИЦЕНТР»',
      'client.epicentrK': 'ТЦ «ЭПИЦЕНТР К»',
      'client.arcelor': 'АРСЕЛОРМИТТАЛ',
      'client.arcelorKR': 'ОАО «АРСЕЛОРМИТТАЛ КРИВОЙ РОГ»',
      'client.arcelorShort': 'ОАО «АРСЕЛОРМИТТАЛ»',
      'client.ukrtatnafta': 'ПАО «УКРТАТНЕФТЬ»',
      'client.kernel': 'КЕРНЕЛ ГРУПП',
      'client.astarta': 'АСТАРТА-КИЕВ',
      'client.astartaHold': 'ХОЛДИНГ «АСТАРТА-КИЕВ» / РАЙЗ АГРО',
      'client.astartaHoldShort': 'ХОЛДИНГ «АСТАРТА-КИЕВ»',
      'client.kremenchuk': 'КП «КРЕМЕНЧУКНЕФТЕХИМСТРОЙИНВЕСТ»',
      'client.vorskla': 'ООО «ВОРСКЛА-СТАЛЬ»',
      'client.hermes': 'ГЕРМЕС ТРЕЙДИНГ',
      'client.zhytlobud': 'ООО МЖК «ЖИЛСТРОЙИНВЕСТ»',
      'client.shakhtar': 'СТАДИОН «ШАХТЁР»'
    },
    en: {
      'brand.desc': 'Pile foundations in Ukraine',

      'top.location': 'Kremenchuk, Poltava region',
      'top.hours': 'Mon–Sat: 08:00 – 19:00',
      'top.truck': 'Equipment dispatched across Ukraine in 3–4 days',
      'top.phoneDirector': '+38 (067) 535-02-29 (Director)',
      'top.phonePto': '+38 (067) 530-50-58 (Tech. Dept.)',

      'nav.home': 'Home',
      'nav.works': 'Services',
      'nav.w1': 'Driven piles (hydraulic hammers)',
      'nav.w2': 'Bored piles (RH-25)',
      'nav.w3': 'CFA piles (Bauer RG-20)',
      'nav.w4': 'Pre-drilling (leader holes)',
      'nav.w5': 'Pile pressing (Fundex / Starke)',
      'nav.w6': 'Static & dynamic pile tests',
      'nav.w7': 'Diaphragm wall & ground anchors',
      'nav.w8': 'Pile caps & concrete works',
      'nav.tech': 'Equipment',
      'nav.t1': 'Pile drivers (SP-49, EO-5111)',
      'nav.t2': 'Drilling rigs (Bauer RG-20, RH-25)',
      'nav.t3': 'Hydraulic hammers (Junttan, Bruce, BSP)',
      'nav.t4': 'Cranes & auxiliary equipment',
      'nav.t5': 'Equipment & surplus for sale',
      'nav.projects': 'Projects',
      'nav.gallery': 'Gallery',
      'nav.video': 'Video',
      'nav.licenses': 'Licenses',
      'nav.contacts': 'Contacts',
      'nav.cta': 'Request a quote',
      'nav.menu': 'Menu',
      'nav.lang': 'Language',

      'footer.about': 'Promspecbud LLC (Kremenchuk) has been the leader in pile foundation construction in Ukraine since 2003. We specialize in driven, bored and CFA piles for elevators, plants, logistics hubs and residential areas.',
      'footer.badge1': 'State license (DABI)',
      'footer.badge2': 'Industrial-safety permit',
      'footer.col1': 'Services',
      'footer.col2': 'Equipment & projects',
      'footer.col3': 'Contact center',
      'footer.f1': 'Driven piles (300–400 mm)',
      'footer.f2': 'Bored piles (RH-25)',
      'footer.f3': 'CFA piles',
      'footer.f4': 'Pre-drilling (leader holes)',
      'footer.f5': 'Static pile tests',
      'footer.f6': 'Diaphragm wall & anchors',
      'footer.f7': 'Monolithic pile caps',
      'footer.g1': 'Junttan / Bruce hammers',
      'footer.g2': 'Bauer RG-20 & RH-25 rigs',
      'footer.g3': 'SP-49, SP-47 pile drivers',
      'footer.g4': 'Nibulon, Kernel elevators',
      'footer.g5': 'Epicenter, ArcelorMittal',
      'footer.g6': 'Site photo reports',
      'footer.g7': 'Site work videos',
      'footer.director': 'Viktor Kuzik (Director)',
      'footer.phoneDirector': '+38 (067) 535-02-29 (Director)',
      'footer.phoneEngineer': '+38 (067) 532-97-90 (Chief Engineer)',
      'footer.phonePto': '+38 (067) 530-50-58 (Tech. Dept.)',
      'footer.location': 'Kremenchuk, Poltava region, Ukraine',
      'footer.send': 'Send a request',
      'footer.copyright': '© 2003–2026 Promspecbud LLC (Kremenchuk). All rights reserved.',
      'footer.licensesLink': 'Licenses & Permits',
      'footer.geoLink': 'Project geography',
      'footer.contactsLink': 'Contacts',

      'ui.close': 'Close',
      'ui.prev': 'Previous',
      'ui.next': 'Next',
      'ui.backTop': 'Back to top',
      'ui.zoom': 'Click to enlarge document',
      'ui.more': 'More',

      'form.required': 'Please enter your name and contact phone number.',
      'form.sending': 'Sending…',
      'form.success': 'Request sent successfully!',
      'form.successAlert': 'Thank you, {name}! Your request has been received. A Promspecbud LLC engineer will contact you shortly at {phone}.',
      'form.error': 'Sending error',
      'form.errorAlert': 'Unfortunately, an error occurred while sending. Please call us or email promspecbud5@gmail.com.',
      'client.nibulon': 'Nibulon LLC',
      'client.epicentr': 'Epicentr shopping center',
      'client.epicentrK': 'Epicentr K',
      'client.arcelor': 'ArcelorMittal',
      'client.arcelorKR': 'ArcelorMittal Kryvyi Rih',
      'client.arcelorShort': 'ArcelorMittal',
      'client.ukrtatnafta': 'UkrTatNafta PJSC',
      'client.kernel': 'Kernel Group',
      'client.astarta': 'Astarta-Kyiv',
      'client.astartaHold': 'Astarta-Kyiv Holding / Rise Agro',
      'client.astartaHoldShort': 'Astarta-Kyiv Holding',
      'client.kremenchuk': 'KremenchukNaftoKhimBudInvest (municipal enterprise)',
      'client.vorskla': 'Vorskla Steel LLC',
      'client.hermes': 'Hermes Trading',
      'client.zhytlobud': 'MZhK ZhytloBudInvest LLC',
      'client.shakhtar': 'Shakhtar Stadium'
    },
    pl: {
      'brand.desc': 'Fundamenty palowe na Ukrainie',

      'top.location': 'Kremieńczuk, obwód połtawski',
      'top.hours': 'Pn–Sb: 08:00 – 19:00',
      'top.truck': 'Wyjazd sprzętu na terenie całej Ukrainy w 3–4 dni',
      'top.phoneDirector': '+38 (067) 535-02-29 (Dyrektor)',
      'top.phonePto': '+38 (067) 530-50-58 (Dział techn.)',

      'nav.home': 'Strona główna',
      'nav.works': 'Rodzaje prac',
      'nav.w1': 'Pale wbijane (młoty hydrauliczne)',
      'nav.w2': 'Pale wiercone (RH-25)',
      'nav.w3': 'Pale CFA (Bauer RG-20)',
      'nav.w4': 'Wiercenie otworów pilotowych',
      'nav.w5': 'Wciskanie pali (Fundex / Starke)',
      'nav.w6': 'Badania statyczne i dynamiczne pali',
      'nav.w7': 'Ściana szczelinowa i kotwy gruntowe',
      'nav.w8': 'Rostwerki i roboty betonowe',
      'nav.tech': 'Sprzęt',
      'nav.t1': 'Kafary (SP-49, EO-5111)',
      'nav.t2': 'Maszyny wiertnicze (Bauer RG-20, RH-25)',
      'nav.t3': 'Młoty hydrauliczne (Junttan, Bruce, BSP)',
      'nav.t4': 'Sprzęt dźwigowy i pomocniczy',
      'nav.t5': 'Sprzedaż sprzętu i majątku',
      'nav.projects': 'Projekty',
      'nav.gallery': 'Galeria',
      'nav.video': 'Wideo',
      'nav.licenses': 'Licencje',
      'nav.contacts': 'Kontakt',
      'nav.cta': 'Zamów wycenę',
      'nav.menu': 'Menu',
      'nav.lang': 'Wybór języka',

      'footer.about': 'Promspecbud Sp. z o.o. (Kremieńczuk) — lider w budownictwie fundamentów palowych na Ukrainie od 2003 roku. Specjalizujemy się w palach wbijanych, wierconych i CFA dla elewatorów, zakładów, centrów logistycznych i osiedli mieszkaniowych.',
      'footer.badge1': 'Licencja państwowa (DABI)',
      'footer.badge2': 'Zezwolenie dozoru technicznego',
      'footer.col1': 'Rodzaje prac',
      'footer.col2': 'Sprzęt i projekty',
      'footer.col3': 'Centrum kontaktu',
      'footer.f1': 'Pale wbijane (300–400 mm)',
      'footer.f2': 'Pale wiercone (RH-25)',
      'footer.f3': 'Pale CFA',
      'footer.f4': 'Wiercenie otworów pilotowych',
      'footer.f5': 'Badania statyczne pali',
      'footer.f6': 'Ściana szczelinowa i kotwy',
      'footer.f7': 'Rostwerki monolityczne',
      'footer.g1': 'Młoty Junttan / Bruce',
      'footer.g2': 'Wiertnice Bauer RG-20 i RH-25',
      'footer.g3': 'Kafary SP-49, SP-47',
      'footer.g4': 'Elewatory Nibulon, Kernel',
      'footer.g5': 'Epicenter, ArcelorMittal',
      'footer.g6': 'Fotorelacje z budów',
      'footer.g7': 'Filmy z prac na obiektach',
      'footer.director': 'Wiktor Kuzik (Dyrektor)',
      'footer.phoneDirector': '+38 (067) 535-02-29 (Dyrektor)',
      'footer.phoneEngineer': '+38 (067) 532-97-90 (Gł. inżynier)',
      'footer.phonePto': '+38 (067) 530-50-58 (Dział techn.)',
      'footer.location': 'Kremieńczuk, obwód połtawski, Ukraina',
      'footer.send': 'Wyślij zapytanie',
      'footer.copyright': '© 2003–2026 Promspecbud Sp. z o.o. (Kremieńczuk). Wszelkie prawa zastrzeżone.',
      'footer.licensesLink': 'Licencje i zezwolenia',
      'footer.geoLink': 'Geografia prac',
      'footer.contactsLink': 'Kontakt',

      'ui.close': 'Zamknij',
      'ui.prev': 'Poprzedni',
      'ui.next': 'Następny',
      'ui.backTop': 'Do góry',
      'ui.zoom': 'Kliknij, aby powiększyć dokument',
      'ui.more': 'Więcej',

      'form.required': 'Proszę podać imię oraz kontaktowy numer telefonu.',
      'form.sending': 'Wysyłanie…',
      'form.success': 'Zapytanie wysłane pomyślnie!',
      'form.successAlert': 'Dziękujemy, {name}! Twoje zapytanie zostało przyjęte. Inżynier Promspecbud skontaktuje się z Tobą wkrótce pod numerem {phone}.',
      'form.error': 'Błąd wysyłania',
      'form.errorAlert': 'Niestety, podczas wysyłania wystąpił błąd. Prosimy zadzwonić do nas lub napisać na promspecbud5@gmail.com.',
      'client.nibulon': 'Nibulon Sp. z o.o.',
      'client.epicentr': 'Centrum handlowe Epicentr',
      'client.epicentrK': 'Epicentr K',
      'client.arcelor': 'ArcelorMittal',
      'client.arcelorKR': 'ArcelorMittal Krzywy Róg',
      'client.arcelorShort': 'ArcelorMittal',
      'client.ukrtatnafta': 'UkrTatNafta S.A.',
      'client.kernel': 'Kernel Group',
      'client.astarta': 'Astarta-Kyiv',
      'client.astartaHold': 'Holding Astarta-Kyiv / Rise Agro',
      'client.astartaHoldShort': 'Holding Astarta-Kyiv',
      'client.kremenchuk': 'Przedsiębiorstwo komunalne KremenchukNaftoKhimBudInvest',
      'client.vorskla': 'Vorskla Steel Sp. z o.o.',
      'client.hermes': 'Hermes Trading',
      'client.zhytlobud': 'MZhK ZhytloBudInvest Sp. z o.o.',
      'client.shakhtar': 'Stadion Szachtar'
    }
  };

  /* ------------------------------------------------------------------ */
  var pageDict = {};
  var merged = {};

  function loadPageDict() {
    var el = document.getElementById('i18n-page-dict');
    if (!el) return {};
    try {
      var obj = JSON.parse(el.textContent);
      return obj || {};
    } catch (e) {
      console.error('[i18n] page dict parse error', e);
      return {};
    }
  }

  function buildMerged() {
    merged = { uk: {}, ru: {}, en: {}, pl: {} };
    var langs = Object.keys(merged);
    var sources = [SHARED, pageDict];
    sources.forEach(function (src) {
      if (!src) return;
      langs.forEach(function (l) {
        if (src[l]) Object.assign(merged[l], src[l]);
      });
    });
  }

  function t(lang, key) {
    return (merged[lang] && merged[lang][key] !== undefined)
      ? merged[lang][key]
      : (merged.uk && merged.uk[key] !== undefined ? merged.uk[key] : key);
  }

  /* text-node-aware setter: preserves child <i> icons and their position */
  function setText(el, text) {
    var first = null;
    var nodes = Array.prototype.slice.call(el.childNodes);
    nodes.forEach(function (n) {
      if (n.nodeType === Node.TEXT_NODE) {
        if (first === null) first = n;
        else el.removeChild(n);
      }
    });
    if (first) first.nodeValue = text;
    else el.appendChild(document.createTextNode(text));
  }

  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
      var val = t(lang, key);
      if (val === undefined || val === key) {
        // still set uk fallback text if present
        if (!(merged.uk && merged.uk[key] !== undefined)) return;
        val = t(lang, key);
      }

      var attr = el.getAttribute('data-i18n-attr');
      if (attr) {
        attr.split(/\s+/).forEach(function (a) { if (a) el.setAttribute(a, val); });
      }

      if (el.hasAttribute('data-i18n-text')) {
        setText(el, val);
      } else if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = val;
      } else if (el.tagName === 'META') {
        el.setAttribute('content', val);
      } else if (!attr) {
        setText(el, val);
      }
    });

    var titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      var tv = t(lang, titleEl.getAttribute('data-i18n'));
      if (tv) document.title = tv;
    }
  }

  function updateButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function getLang() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved && LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || navigator.userLanguage || 'uk').slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) !== -1 ? nav : 'uk';
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
    updateButtons(lang);
  }

  /* Public helper for main.js (form messages) */
  function tPublic(key, vars) {
    var lang = getLang();
    var s = t(lang, key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.split('{' + k + '}').join(vars[k]);
      });
    }
    return s;
  }

  function init() {
    pageDict = loadPageDict();
    buildMerged();
    var lang = getLang();
    apply(lang);
    updateButtons(lang);

    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.lang-btn') : null;
      if (btn) setLang(btn.getAttribute('data-lang'));
    });

    window.__psbT = tPublic;
    window.__psbSetLang = setLang;
    window.__psbLang = function () { return getLang(); };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
