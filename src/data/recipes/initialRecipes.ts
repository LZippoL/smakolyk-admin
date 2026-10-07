import { Recipe } from '../../types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    slug: 'ukrainian-red-borscht',
    title: 'Український червоний борщ з яловичиною та пампушками',
    description: 'Легендарний традиційний український борщ насиченого рубінового кольору на наваристому яловичому бульйоні зі свіжою зеленню та сметаною.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
    category: 'soup',
    cuisine: 'ukrainian',
    prepTime: 30,
    cookTime: 90,
    totalTime: 120,
    servings: 6,
    difficulty: 'medium',
    calories: 320,
    nutrition: { protein: 22, fat: 14, carbs: 26 },
    tags: ['борщ', 'українська кухня', 'суп', 'традиційне', 'обід'],
    dietary: { vegetarian: false, vegan: false, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i1', name: 'Яловичина на кістці', amount: 600, unit: 'г' },
      { id: 'i2', name: 'Буряк', amount: 2, unit: 'шт', notes: 'середнього розміру' },
      { id: 'i3', name: 'Картопля', amount: 4, unit: 'шт' },
      { id: 'i4', name: 'Капуста білокачанна', amount: 300, unit: 'г', notes: 'тонко нашаткована' },
      { id: 'i5', name: 'Морква', amount: 1, unit: 'шт' },
      { id: 'i6', name: 'Цибуля ріпчаста', amount: 1, unit: 'шт' },
      { id: 'i7', name: 'Томатна паста', amount: 2, unit: 'ст. л.' },
      { id: 'i8', name: 'Часник', amount: 4, unit: 'зубчики' },
      { id: 'i9', name: 'Лимонний сік', amount: 1, unit: 'ст. л.', notes: 'для збереження яскравого кольору' },
      { id: 'i10', name: 'Свіжий кріп та петрушка', amount: 1, unit: 'пучок' },
      { id: 'i11', name: 'Вода', amount: 3, unit: 'л', isStaple: true },
      { id: 'i12', name: 'Сіль', amount: 1, unit: 'ст. л.', isStaple: true },
      { id: 'i13', name: 'Чорний перець', amount: 0.5, unit: 'ч. л.', isStaple: true },
      { id: 'i14', name: 'Рослинна олія', amount: 2, unit: 'ст. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Приготування бульйону',
        instruction: 'М\'ясо ретельно промийте, залийте холодною водою в каструлі. Доведіть до кипіння, зніміть піну і варіть на повільному вогні 1.5 години до м\'якості.',
        timerMinutes: 90,
        tip: 'Варіть на найменшому вогні без сильного кипіння, щоб бульйон вийшов кришталево прозорим.'
      },
      {
        stepNumber: 2,
        title: 'Підготовка засмажки з буряка',
        instruction: 'Буряк натріть на грубій тертці або наріжте тонкою соломкою. Розігрійте пательню з олією, викладіть буряк, збризніть лимонним соком, додайте томатну пасту та 3 ложки бульйону. Тушкуйте 15 хвилин.',
        timerMinutes: 15,
        tip: 'Кислота лимонного соку закріплює яскравий бордовий пігмент буряка.'
      },
      {
        stepNumber: 3,
        title: 'Пасерування цибулі та моркви',
        instruction: 'Дрібно наріжте цибулю, моркву натріть на тертці. Обсмажте на окремій пательні до золотистого кольору 7-10 хвилин.',
        timerMinutes: 10
      },
      {
        stepNumber: 4,
        title: 'Закладка овочів',
        instruction: 'З бульйону дістаньте м\'ясо, наріжте порційними шматочками і поверніть назад. Додайте нарізану кубиками картоплю, варіть 10 хвилин. Потім додайте нашатковану капусту і варіть ще 5 хвилин.',
        timerMinutes: 15
      },
      {
        stepNumber: 5,
        title: 'З\'єднання та настоювання',
        instruction: 'Додайте тушкований буряк та морквяно-цибулеву засмажку. Посоліть, поперчіть. Проваріть 5 хвилин на тихому вогні. Наприкінці додайте подрібнений часник та посічену зелень, вимкніть вогонь і залиште настоюватися під кришкою 20 хвилин.',
        timerMinutes: 20,
        tip: 'Борщ стає ще смачнішим на наступний день, коли всі інгредієнти обміняються ароматами.'
      }
    ],
    rating: 4.9,
    reviewsCount: 48,
    author: { name: 'Оксана Мельник', role: 'Шеф української кухні' },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-01T12:00:00Z',
    featured: true,
    budget: false
  },
  {
    id: 'rec-2',
    slug: 'fluffy-syrnyky',
    title: 'Ніжні пишні сирники з ваніллю та родзинками',
    description: 'Ідеальні домашні сирники з рум\'яною скоринкою та ніжною кремовою текстурою всередині. Чудово тримають форму і не розпливаються.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80',
    category: 'breakfast',
    cuisine: 'ukrainian',
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 4,
    difficulty: 'easy',
    calories: 280,
    nutrition: { protein: 20, fat: 10, carbs: 24 },
    tags: ['сирники', 'сніданок', 'десерт', 'дітям', 'швидко'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i21', name: 'Кисломолочний сир 9%', amount: 500, unit: 'г', notes: 'віджатий від зайвої сироватки' },
      { id: 'i22', name: 'Яйця', amount: 1, unit: 'шт', notes: 'або 2 жовтки' },
      { id: 'i23', name: 'Борошно пшеничне', amount: 3, unit: 'ст. л.', notes: '+ для обвалювання' },
      { id: 'i24', name: 'Цукор', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i25', name: 'Ванільний цукор', amount: 1, unit: 'ч. л.' },
      { id: 'i26', name: 'Родзинки', amount: 40, unit: 'г', notes: 'попередньо замочені у гарячій воді' },
      { id: 'i27', name: 'Сіль', amount: 1, unit: 'дрібка', isStaple: true },
      { id: 'i28', name: 'Вершкове масло', amount: 20, unit: 'г' },
      { id: 'i29', name: 'Рослинна олія', amount: 1, unit: 'ст. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Підготовка сирної маси',
        instruction: 'Кисломолочний сир перетріть через сито або розімніть виделкою. Додайте яйце, дрібку солі, цукор та ванільний цукор. Перемішайте до однорідності.',
        tip: 'Не кладіть занадто багато цукру в тісто, інакше сирники почнуть підгоряти на пательні.'
      },
      {
        stepNumber: 2,
        title: 'Додавання борошна та родзинок',
        instruction: 'Всипте просіяне борошно та обсушені паперовим рушником родзинки. Замісіть м\'яке тісто, яке злегка липне до рук.'
      },
      {
        stepNumber: 3,
        title: 'Формування сирників',
        instruction: 'Припиліть дошку борошном. Сформуйте ковбаску і наріжте на рівні шайбочки. За допомогою склянки або широкого ножа надайте кожному сирнику ідеально круглу форму.'
      },
      {
        stepNumber: 4,
        title: 'Обсмажування',
        instruction: 'Розігрійте пательню з сумішшю рослинної олії та вершкового масла. Смажте сирники на середньому вогні по 3-4 хвилини з кожного боку до красивої золотистої скоринки.',
        timerMinutes: 8,
        tip: 'Накрийте пательню кришкою на останні 3 хвилини, щоб сирники пропарились і стали високими.'
      }
    ],
    rating: 4.95,
    reviewsCount: 62,
    author: { name: 'Марія Коваль', role: 'Кондитер-аматор' },
    createdAt: '2024-01-18T08:30:00Z',
    updatedAt: '2024-02-05T09:00:00Z',
    featured: true,
    quick20: true,
    budget: true
  },
  {
    id: 'rec-3',
    slug: 'crispy-potato-deruny',
    title: 'Хрусткі картопляні деруни з часником та сметаною',
    description: 'Золотисті, хрусткі ззовні та ніжні всередині українські деруни за бабусиним рецептом. Справжня домашня класика.',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=1000&q=80',
    category: 'lunch',
    cuisine: 'ukrainian',
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 4,
    difficulty: 'easy',
    calories: 260,
    nutrition: { protein: 5, fat: 12, carbs: 32 },
    tags: ['деруни', 'картопля', 'українське', 'бюджетно', 'швидко'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i31', name: 'Картопля', amount: 800, unit: 'г' },
      { id: 'i32', name: 'Цибуля ріпчаста', amount: 1, unit: 'шт' },
      { id: 'i33', name: 'Яйця', amount: 1, unit: 'шт' },
      { id: 'i34', name: 'Борошно пшеничне', amount: 2, unit: 'ст. л.' },
      { id: 'i35', name: 'Часник', amount: 2, unit: 'зубчики' },
      { id: 'i36', name: 'Сметана 20%', amount: 1, unit: 'ст. л.', notes: '+ для подачі' },
      { id: 'i37', name: 'Сіль', amount: 1, unit: 'ч. л.', isStaple: true },
      { id: 'i38', name: 'Чорний перець', amount: 0.5, unit: 'ч. л.', isStaple: true },
      { id: 'i39', name: 'Рослинна олія', amount: 4, unit: 'ст. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Натирання картоплі та цибулі',
        instruction: 'Картоплю почистіть. Натріть на дрібній колючій тертці, чергуючи з цибулею. Цибуля не дасть картоплі потемніти!',
        tip: 'Терта цибуля зберігає гарний світлий колір сирої картопляної маси.'
      },
      {
        stepNumber: 2,
        title: 'Видалення зайвої рідини',
        instruction: 'Злегка відіжміть картопляну масу руками через сито, зливши надлишок соку, але не висушуйте надто сильно.'
      },
      {
        stepNumber: 3,
        title: 'Замішування маси',
        instruction: 'Додайте яйце, подрібнений часник, столову ложку сметани, борошно, сіль та перець. Ретельно перемішайте.'
      },
      {
        stepNumber: 4,
        title: 'Смаження',
        instruction: 'Розігрійте рослинну олію на пательні. Викладайте масу столовою ложкою і смажте на середньому вогні по 3-4 хвилини з кожного боку до рум\'яної скоринки.',
        timerMinutes: 8
      }
    ],
    rating: 4.88,
    reviewsCount: 39,
    author: { name: 'Тарас Бондар', role: 'Кулінарний блогер' },
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-02-02T10:00:00Z',
    budget: true,
    quick20: false
  },
  {
    id: 'rec-4',
    slug: 'varenyky-potato-onion',
    title: 'Вареники з картоплею та смаженою цибулею',
    description: 'Традиційні українські вареники на ніжному заварному тісті з ароматною картопляною начинкою та золотистою засмажкою.',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=1000&q=80',
    category: 'dinner',
    cuisine: 'ukrainian',
    prepTime: 40,
    cookTime: 15,
    totalTime: 55,
    servings: 5,
    difficulty: 'medium',
    calories: 340,
    nutrition: { protein: 9, fat: 11, carbs: 54 },
    tags: ['вареники', 'картопля', 'українське', 'традиційне', 'вечеря'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i41', name: 'Борошно пшеничне', amount: 450, unit: 'г' },
      { id: 'i42', name: 'Вода', amount: 200, unit: 'мл', notes: 'окріп для заварного тіста', isStaple: true },
      { id: 'i43', name: 'Картопля', amount: 700, unit: 'г' },
      { id: 'i44', name: 'Цибуля ріпчаста', amount: 2, unit: 'шт' },
      { id: 'i45', name: 'Вершкове масло', amount: 50, unit: 'г' },
      { id: 'i46', name: 'Рослинна олія', amount: 3, unit: 'ст. л.', isStaple: true },
      { id: 'i47', name: 'Сіль', amount: 1, unit: 'ч. л.', isStaple: true },
      { id: 'i48', name: 'Чорний перець', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Приготування начинки',
        instruction: 'Відваріть картоплю в підсоленій воді до готовності. Потовчіть у пюре з вершковим маслом. Цибулю наріжте кубиками та обсмажте до глибокого золотистого кольору. Половину цибулі вмішайте в пюре, посоліть і поперчіть.',
        timerMinutes: 25
      },
      {
        stepNumber: 2,
        title: 'Заміс заварного тіста',
        instruction: 'Борошно просійте, додайте чайну ложку солі, влийте окріп та рослинну олію. Швидко замісіть еластичне м\'яке тісто. Загорніть у плівку і дайте відпочити 20 хвилин.',
        timerMinutes: 20,
        tip: 'Заварне тісто виходить надзвичайно слухняним, тонко розкачується і ніколи не рветься при варінні.'
      },
      {
        stepNumber: 3,
        title: 'Ліплення вареників',
        instruction: 'Тонко розкачайте тісто, склянкою виріжте кружечки. У центр кожного покладіть чайну ложку начинки і міцно защипніть краї косичкою.'
      },
      {
        stepNumber: 4,
        title: 'Варіння та подача',
        instruction: 'Опустіть вареники в киплячу підсолену воду. Після спливання варіть 3-4 хвилини. Вийміть шумівкою, змастіть маслом і посипте залишками смаженої цибулі.',
        timerMinutes: 4
      }
    ],
    rating: 4.92,
    reviewsCount: 54,
    author: { name: 'Оксана Мельник', role: 'Шеф української кухні' },
    createdAt: '2024-01-22T14:00:00Z',
    updatedAt: '2024-02-03T11:00:00Z',
    budget: true
  },
  {
    id: 'rec-5',
    slug: 'varenyky-with-cherries',
    title: 'Пишні вареники з вишнею на кефірі',
    description: 'Справжні полтавські парові вареники з соковитою стиглою вишнею. Пухке повітряне тісто, що тане в роті.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80',
    category: 'dessert',
    cuisine: 'ukrainian',
    prepTime: 30,
    cookTime: 15,
    totalTime: 45,
    servings: 4,
    difficulty: 'medium',
    calories: 290,
    nutrition: { protein: 7, fat: 4, carbs: 56 },
    tags: ['вареники', 'вишня', 'десерт', 'українське', 'сезонне'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i51', name: 'Борошно пшеничне', amount: 400, unit: 'г' },
      { id: 'i52', name: 'Кефір 2.5%', amount: 250, unit: 'мл' },
      { id: 'i53', name: 'Сода харчова', amount: 0.5, unit: 'ч. л.' },
      { id: 'i54', name: 'Вишня без кісточок', amount: 400, unit: 'г' },
      { id: 'i55', name: 'Цукор', amount: 4, unit: 'ст. л.', isStaple: true },
      { id: 'i56', name: 'Крохмаль кукурудзяний', amount: 1, unit: 'ст. л.' },
      { id: 'i57', name: 'Сіль', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Заміс тіста на кефірі',
        instruction: 'У миску влийте кефір кімнатної температури, додайте соду та сіль. Поступово всипайте борошно, замішуючи дуже м\'яке ніжне тісто.'
      },
      {
        stepNumber: 2,
        title: 'Підготовка вишні',
        instruction: 'З вишень злийте зайвий сік, змішайте з крохмалем (це не дасть соку витікати під час варіння).'
      },
      {
        stepNumber: 3,
        title: 'Формування вареників',
        instruction: 'Розкачайте тісто товщиною приблизно 4-5 мм. На кожен кружечок покладіть 3-4 вишні і пів чайної ложки цукру. Щільно зліпіть краї.'
      },
      {
        stepNumber: 4,
        title: 'Варіння на пару',
        instruction: 'Готуйте вареники у пароварці або над каструлею з марлею рівно 5-6 хвилин під кришкою. Подавайте зі сметаною або вершковим маслом.',
        timerMinutes: 6,
        tip: 'Не перетримуйте на пару довше 6 хвилин, щоб тісто залишалося пухким і не осіло.'
      }
    ],
    rating: 4.96,
    reviewsCount: 31,
    author: { name: 'Оксана Мельник', role: 'Шеф української кухні' },
    createdAt: '2024-01-25T16:00:00Z',
    updatedAt: '2024-02-04T12:00:00Z'
  },
  {
    id: 'rec-6',
    slug: 'authentic-pasta-carbonara',
    title: 'Автентична римська паста Карбонара',
    description: 'Класична італійська карбонара без жодних вершків: тільки хрусткий бекон/гуанчале, яєчні жовтки, ароматний сир пекоріно та свіжомелений чорний перець.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1000&q=80',
    category: 'dinner',
    cuisine: 'italian',
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 2,
    difficulty: 'medium',
    calories: 520,
    nutrition: { protein: 24, fat: 28, carbs: 48 },
    tags: ['паста', 'італійська кухня', 'карбонара', 'швидка вечеря'],
    dietary: { vegetarian: false, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i61', name: 'Спагеті', amount: 200, unit: 'г' },
      { id: 'i62', name: 'Бекон або гуанчале', amount: 120, unit: 'г', notes: 'нарізаний брусочками' },
      { id: 'i63', name: 'Яєчні жовтки', amount: 3, unit: 'шт' },
      { id: 'i64', name: 'Яйця цілі', amount: 1, unit: 'шт' },
      { id: 'i65', name: 'Сир пармезан або пекоріно', amount: 60, unit: 'г', notes: 'дрібно натертий' },
      { id: 'i66', name: 'Чорний перець', amount: 1, unit: 'ч. л.', notes: 'свіжозмелений', isStaple: true },
      { id: 'i67', name: 'Сіль', amount: 1, unit: 'ст. л.', notes: 'для води на пасту', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Обсмажування бекону',
        instruction: 'Викладіть нарізаний бекон на холодну суху пательню. Увімкніть середній вогонь і витоплюйте жир до хрусткої рум\'яної скоринки 7-8 хвилин. Зніміть з вогню.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        title: 'Приготування яєчно-сирного соусу',
        instruction: 'У глибокій мисці збийте вінчиком 3 жовтки, 1 ціле яйце, більшу частину натертого сиру та щедру порцію свіжозмеленого чорного перцю до стану густої пасти.'
      },
      {
        stepNumber: 3,
        title: 'Варіння спагеті',
        instruction: 'Відваріть спагеті у великій кількості підсоленої води до стану al dente (на 1-2 хвилини менше, ніж вказано на упаковці). Збережіть пів склянки крохмальної води з-під пасти!',
        timerMinutes: 8
      },
      {
        stepNumber: 4,
        title: 'Створення шовковистої емульсії',
        instruction: 'Перекладіть гарячу пасту на пательню до бекону. Влийте яєчно-сирну суміш і 3-4 ложки гарячої води з-під пасти. Швидко й енергійно перемішуйте щипцями поза вогнем. Залишкове тепло перетворить яйця на ніжний глянцевий соус без згортання!',
        tip: 'Ніколи не додавайте соус на включену конфорку, інакше замість шовковистого соусу вийде омлет.'
      }
    ],
    rating: 4.97,
    reviewsCount: 84,
    author: { name: 'Марко Россі', role: 'Шеф-кухар' },
    createdAt: '2024-01-28T18:00:00Z',
    updatedAt: '2024-02-06T15:00:00Z',
    featured: true,
    quick20: false
  },
  {
    id: 'rec-7',
    slug: 'classic-pasta-bolognese',
    title: 'Класична паста Болоньєзе з соковитим м\'ясним рагу',
    description: 'Насичене ароматне італійське рагу з яловичини, томатів та овочів, що повільно тушкувалося для розкриття найглибшого смаку.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80',
    category: 'dinner',
    cuisine: 'italian',
    prepTime: 20,
    cookTime: 60,
    totalTime: 80,
    servings: 4,
    difficulty: 'medium',
    calories: 540,
    nutrition: { protein: 32, fat: 18, carbs: 58 },
    tags: ['болоньєзе', 'італійська кухня', 'паста', 'м\'ясо'],
    dietary: { vegetarian: false, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i71', name: 'Паста тальятеле або спагеті', amount: 350, unit: 'г' },
      { id: 'i72', name: 'Яловичий фарш', amount: 500, unit: 'г' },
      { id: 'i73', name: 'Цибуля ріпчаста', amount: 1, unit: 'шт' },
      { id: 'i74', name: 'Морква', amount: 1, unit: 'шт' },
      { id: 'i75', name: 'Стебло селери', amount: 1, unit: 'шт' },
      { id: 'i76', name: 'Томати у власному соку', amount: 400, unit: 'г' },
      { id: 'i77', name: 'Часник', amount: 3, unit: 'зубчики' },
      { id: 'i78', name: 'Пармезан', amount: 50, unit: 'г' },
      { id: 'i79', name: 'Оливкова олія', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i710', name: 'Сіль', amount: 1, unit: 'ч. л.', isStaple: true },
      { id: 'i711', name: 'Чорний перець', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Пасерування софрітто',
        instruction: 'Дрібно наріжте цибулю, моркву та селеру. Обсмажте на оливковій олії в товстостінному сотейнику 8 хвилин до м\'якості.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        title: 'Обсмажування фаршу',
        instruction: 'Додайте яловичий фарш, подрібнений часник. Обсмажуйте, розбиваючи грудочки лопаткою, поки м\'ясо не змінить колір (10 хвилин).'
      },
      {
        stepNumber: 3,
        title: 'Повільне тушкування',
        instruction: 'Додайте розім\'яті томати у власному соку, сіль і перець. Зменшіть вогонь до мінімуму, накрийте кришкою і тушкуйте не менше 45-60 хвилин, періодично помішуючи.',
        timerMinutes: 50,
        tip: 'Чим довше тушкується соус болоньєзе на тихому вогні, тим ніжнішим стає м\'ясо і глибшим смак.'
      },
      {
        stepNumber: 4,
        title: 'Подача з пастою',
        instruction: 'Відваріть пасту al dente. Змішайте з гарячим рагу і подавайте з великою кількістю натертого пармезану.'
      }
    ],
    rating: 4.89,
    reviewsCount: 42,
    author: { name: 'Марко Россі', role: 'Шеф-кухар' },
    createdAt: '2024-01-29T11:00:00Z',
    updatedAt: '2024-02-07T14:00:00Z'
  },
  {
    id: 'rec-8',
    slug: 'margherita-pizza',
    title: 'Домашня піца Маргарита на тонкому тісті',
    description: 'Неймовірно хрустка ароматна піца з соковитими томатами, ніжною моцарелою та свіжим базиліком, немов із дров\'яної печі Неаполя.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1000&q=80',
    category: 'dinner',
    cuisine: 'italian',
    prepTime: 25,
    cookTime: 12,
    totalTime: 37,
    servings: 3,
    difficulty: 'medium',
    calories: 410,
    nutrition: { protein: 18, fat: 14, carbs: 52 },
    tags: ['піца', 'італійська кухня', 'випічка', 'вегетаріанське'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i81', name: 'Борошно пшеничне', amount: 300, unit: 'г' },
      { id: 'i82', name: 'Вода тепла', amount: 180, unit: 'мл', isStaple: true },
      { id: 'i83', name: 'Дріжджі сухі', amount: 5, unit: 'г' },
      { id: 'i84', name: 'Сир моцарела', amount: 200, unit: 'г' },
      { id: 'i85', name: 'Томати протерті (пассата)', amount: 150, unit: 'мл' },
      { id: 'i86', name: 'Свіжий базилік', amount: 10, unit: 'листків' },
      { id: 'i87', name: 'Оливкова олія', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i88', name: 'Сіль', amount: 1, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Заміс тіста',
        instruction: 'У теплій воді розчиніть дріжджі та чайну ложку олії. Всипте борошно з сіллю, замісіть гладке тісто. Дайте підійти в теплі 40-60 хвилин.',
        timerMinutes: 45
      },
      {
        stepNumber: 2,
        title: 'Формування основи',
        instruction: 'Руками розтягніть тісто від центру до країв у тонке коло з бортиками. Не використовуйте качалку, щоб зберегти бульбашки повітря!'
      },
      {
        stepNumber: 3,
        title: 'Начинка',
        instruction: 'Змастіть основу томатною пассатою, посипте дрібкою солі. Розкладіть шматочки свіжої моцарели.'
      },
      {
        stepNumber: 4,
        title: 'Випікання при максимальній температурі',
        instruction: 'Розігрійте духовку на максимум (250°C або більше). Випікайте піцу на розпеченому деку 8-10 хвилин до золотистих бортиків. Прикрасьте свіжим базиліком перед подачею.',
        timerMinutes: 9
      }
    ],
    rating: 4.93,
    reviewsCount: 37,
    author: { name: 'Марко Россі', role: 'Шеф-кухар' },
    createdAt: '2024-02-01T15:00:00Z',
    updatedAt: '2024-02-08T10:00:00Z'
  },
  {
    id: 'rec-9',
    slug: 'traditional-lasagna',
    title: 'Справжня італійська лазанья з соусом бешамель',
    description: 'Багатошарова лазанья з ніжними листами пасти, ситним м\'ясним рагу болоньєзе, вершковим бешамелем та запеченою скоринкою пармезану.',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=1000&q=80',
    category: 'dinner',
    cuisine: 'italian',
    prepTime: 40,
    cookTime: 40,
    totalTime: 80,
    servings: 6,
    difficulty: 'hard',
    calories: 590,
    nutrition: { protein: 35, fat: 26, carbs: 54 },
    tags: ['лазанья', 'італійське', 'вечеря', 'свято'],
    dietary: { vegetarian: false, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i91', name: 'Листи для лазаньї', amount: 12, unit: 'шт' },
      { id: 'i92', name: 'М\'ясний фарш асорті', amount: 600, unit: 'г' },
      { id: 'i93', name: 'Томати у власному соку', amount: 500, unit: 'г' },
      { id: 'i94', name: 'Цибуля ріпчаста', amount: 1, unit: 'шт' },
      { id: 'i95', name: 'Молоко', amount: 600, unit: 'мл' },
      { id: 'i96', name: 'Вершкове масло', amount: 50, unit: 'г' },
      { id: 'i97', name: 'Борошно пшеничне', amount: 50, unit: 'г' },
      { id: 'i98', name: 'Мускатний горіх', amount: 0.5, unit: 'ч. л.' },
      { id: 'i99', name: 'Сир моцарела та пармезан', amount: 250, unit: 'г' },
      { id: 'i910', name: 'Сіль та перець', amount: 1, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Приготування м\'ясного соусу',
        instruction: 'Обсмажте цибулю з фаршем, додайте томати, сіль, перець та тушкуйте 30 хвилин до густоти.',
        timerMinutes: 30
      },
      {
        stepNumber: 2,
        title: 'Приготування соусу бешамель',
        instruction: 'Розтопіть вершкове масло в сотейнику, додайте борошно і обсмажте 1 хвилину. Тонкою цівкою вливайте тепле молоко, активно збиваючи вінчиком. Варіть до загустіння, додайте мускатний горіх.',
        timerMinutes: 8
      },
      {
        stepNumber: 3,
        title: 'Збирання лазаньї',
        instruction: 'У прямокутну форму викладіть трохи бешамелю, шар листів пасти, м\'ясний соус, бешамель і посипте сиром. Повторіть 3-4 шари. Верх щедро покрийте бешамелем та моцарелою.'
      },
      {
        stepNumber: 4,
        title: 'Випікання',
        instruction: 'Випікайте при 180°C 35-40 хвилин до золотистої скоринки. Дайте постояти 10 хвилин перед нарізанням.',
        timerMinutes: 40
      }
    ],
    rating: 4.94,
    reviewsCount: 29,
    author: { name: 'Марко Россі', role: 'Шеф-кухар' },
    createdAt: '2024-02-03T18:00:00Z',
    updatedAt: '2024-02-09T13:00:00Z'
  },
  {
    id: 'rec-10',
    slug: 'aromatic-shakshuka',
    title: 'Ароматна східна шакшука з томатами та сиром фета',
    description: 'Яскрава сковорідка яєць, запечених у пряному густому соусі з солодкого перцю, томатів, зіри та кінзи. Ідеальний пізній сніданок.',
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1000&q=80',
    category: 'breakfast',
    cuisine: 'mediterranean',
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 2,
    difficulty: 'easy',
    calories: 270,
    nutrition: { protein: 16, fat: 18, carbs: 12 },
    tags: ['шакшука', 'яйця', 'сніданок', 'томати', 'швидко'],
    dietary: { vegetarian: true, vegan: false, glutenFree: true, lactoseFree: false },
    ingredients: [
      { id: 'i101', name: 'Яйця', amount: 4, unit: 'шт' },
      { id: 'i102', name: 'Помідори стиглі', amount: 3, unit: 'шт', notes: 'або 300г подрібнених томатів' },
      { id: 'i103', name: 'Перець болгарський солодкий', amount: 1, unit: 'шт' },
      { id: 'i104', name: 'Цибуля ріпчаста', amount: 1, unit: 'шт' },
      { id: 'i105', name: 'Часник', amount: 2, unit: 'зубчики' },
      { id: 'i106', name: 'Сир фета', amount: 60, unit: 'г' },
      { id: 'i107', name: 'Зіра (кумин) та паприка', amount: 1, unit: 'ч. л.' },
      { id: 'i108', name: 'Оливкова олія', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i109', name: 'Сіль та перець', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Обсмажування овочів',
        instruction: 'На оливковій олії обсмажте нарізану кубиками цибулю та солодкий перець до м\'якості (6-8 хвилин). Додайте подрібнений часник, зіру та паприку, прогрійте 1 хвилину до появи аромату.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        title: 'Приготування соусу матбуха',
        instruction: 'Додайте нарізані помідори, посоліть. Тушкуйте соус на середньому вогні 8 хвилин, поки він не загусне.'
      },
      {
        stepNumber: 3,
        title: 'Додавання яєць',
        instruction: 'Ложкою зробіть у томатному соусі 4 поглиблення. Акуратно вбийте в кожне яйце, намагаючись зберегти жовток цілим.'
      },
      {
        stepNumber: 4,
        title: 'Доведення до готовності',
        instruction: 'Зменшіть вогонь, накрийте кришкою і готуйте 5-6 хвилин, поки білок не схопиться, а жовток залишиться рідким. Посипте подрібненою фетою та свіжою зеленню.',
        timerMinutes: 6,
        tip: 'Подавайте просто в пательні з теплим багетом або лавашем, щоб вмочати в рідкий жовток і томатний соус.'
      }
    ],
    rating: 4.95,
    reviewsCount: 52,
    author: { name: 'Аліна Савчук', role: 'Фуд-стиліст' },
    createdAt: '2024-02-04T09:00:00Z',
    updatedAt: '2024-02-10T11:00:00Z',
    featured: true,
    quick20: false
  },
  {
    id: 'rec-11',
    slug: 'french-herb-omelette',
    title: 'Французький ніжний омлет з травами та сиром',
    description: 'Шовковистий класичний омлет за французькою технікою: надзвичайно ніжна серединка без найменшої коричневої скоринки.',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=1000&q=80',
    category: 'breakfast',
    cuisine: 'french',
    prepTime: 5,
    cookTime: 5,
    totalTime: 10,
    servings: 1,
    difficulty: 'medium',
    calories: 240,
    nutrition: { protein: 17, fat: 19, carbs: 2 },
    tags: ['омлет', 'яйця', 'сніданок', 'швидко', 'французька кухня'],
    dietary: { vegetarian: true, vegan: false, glutenFree: true, lactoseFree: false },
    ingredients: [
      { id: 'i111', name: 'Яйця', amount: 3, unit: 'шт' },
      { id: 'i112', name: 'Вершкове масло', amount: 20, unit: 'г' },
      { id: 'i113', name: 'Сир пармезан або грюєр', amount: 30, unit: 'г', notes: 'натертий' },
      { id: 'i114', name: 'Свіжий шніт-лук або кріп', amount: 1, unit: 'ст. л.' },
      { id: 'i115', name: 'Сіль та білий перець', amount: 1, unit: 'дрібка', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Збивання яєць',
        instruction: 'Яйця ретельно збийте виделкою з сіллю та перцем до однорідного стану без піни.'
      },
      {
        stepNumber: 2,
        title: 'Швидке приготування на пательні',
        instruction: 'Розтопіть вершкове масло на пательні на середньому вогні. Вилийте яйця і постійно енергійно помішуйте лопаткою, водночас рухаючи пательню колами.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        title: 'Згортання рулетом',
        instruction: 'Коли маса схопиться у ніжний крем, посипте сиром і зеленню, зніміть з вогню і згорніть акуратним щільним рулетом. Змастіть зверху шматочком вершкового масла для блиску.'
      }
    ],
    rating: 4.87,
    reviewsCount: 26,
    author: { name: 'Аліна Савчук', role: 'Фуд-стиліст' },
    createdAt: '2024-02-05T08:00:00Z',
    updatedAt: '2024-02-11T09:00:00Z',
    quick20: true
  },
  {
    id: 'rec-12',
    slug: 'french-toast-cinnamon',
    title: 'Золотисті французькі тости з корицею та ягодами',
    description: 'Ароматні бріош-тости, просочені ванільно-молочною сумішшю і обсмажені на вершковому маслі до карамельної скоринки.',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1000&q=80',
    category: 'breakfast',
    cuisine: 'french',
    prepTime: 5,
    cookTime: 10,
    totalTime: 15,
    servings: 2,
    difficulty: 'easy',
    calories: 310,
    nutrition: { protein: 9, fat: 12, carbs: 42 },
    tags: ['тости', 'солодке', 'сніданок', 'ягоди', 'швидко'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i121', name: 'Хліб тостовий або бріош', amount: 4, unit: 'скибочки' },
      { id: 'i122', name: 'Яйця', amount: 2, unit: 'шт' },
      { id: 'i123', name: 'Молоко', amount: 80, unit: 'мл' },
      { id: 'i124', name: 'Кориця мелена', amount: 0.5, unit: 'ч. л.' },
      { id: 'i125', name: 'Цукор або мед', amount: 1, unit: 'ст. л.', isStaple: true },
      { id: 'i126', name: 'Вершкове масло', amount: 25, unit: 'г' },
      { id: 'i127', name: 'Свіжі ягоди (полуниця, лохина)', amount: 50, unit: 'г' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Суміш для просочування',
        instruction: 'Збийте яйця з молоком, корицею та цукром у неглибокій мисці.'
      },
      {
        stepNumber: 2,
        title: 'Замочування та смаження',
        instruction: 'Занурте скибочки хліба у яєчну суміш на 20 секунд з кожного боку. Обсмажте на вершковому маслі по 3 хвилини з кожного боку до рум\'яного кольору.',
        timerMinutes: 6
      },
      {
        stepNumber: 3,
        title: 'Подача',
        instruction: 'Викладіть на тарілку, полийте медом і прикрасьте свіжими ягодами.'
      }
    ],
    rating: 4.91,
    reviewsCount: 33,
    author: { name: 'Марія Коваль', role: 'Кондитер-аматор' },
    createdAt: '2024-02-06T08:15:00Z',
    updatedAt: '2024-02-12T10:00:00Z',
    quick20: true,
    budget: true
  },
  {
    id: 'rec-13',
    slug: 'creamy-apple-oatmeal',
    title: 'Кремова вівсянка з карамелізованими яблуками та горіхами',
    description: 'Тепла збалансована вівсяна каша з ніжними карамельними яблуками, корицею та хрусткими волоськими горіхами.',
    image: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=1000&q=80',
    category: 'healthy',
    cuisine: 'other',
    prepTime: 5,
    cookTime: 12,
    totalTime: 17,
    servings: 2,
    difficulty: 'easy',
    calories: 290,
    nutrition: { protein: 8, fat: 9, carbs: 45 },
    tags: ['вівсянка', 'корисно', 'яблука', 'сніданок', 'швидко'],
    dietary: { vegetarian: true, vegan: false, glutenFree: true, lactoseFree: false },
    ingredients: [
      { id: 'i131', name: 'Вівсяні пластівці цільнозернові', amount: 100, unit: 'г' },
      { id: 'i132', name: 'Молоко або рослинне молоко', amount: 300, unit: 'мл' },
      { id: 'i133', name: 'Вода', amount: 150, unit: 'мл', isStaple: true },
      { id: 'i134', name: 'Яблуко', amount: 1, unit: 'шт' },
      { id: 'i135', name: 'Мед', amount: 1, unit: 'ст. л.' },
      { id: 'i136', name: 'Вершкове масло', amount: 15, unit: 'г' },
      { id: 'i137', name: 'Волоські горіхи', amount: 20, unit: 'г' },
      { id: 'i138', name: 'Кориця', amount: 0.5, unit: 'ч. л.' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Варіння вівсянки',
        instruction: 'У сотейнику змішайте пластівці, молоко та воду з дрібкою солі. Варіть на повільному вогні 8-10 хвилин до кремової текстури.',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        title: 'Карамелізація яблук',
        instruction: 'Яблуко наріжте кубиками. На сковороді з шматочком вершкового масла обсмажте яблука з медом і корицею 4 хвилини до м\'якості.',
        timerMinutes: 4
      },
      {
        stepNumber: 3,
        title: 'Подача',
        instruction: 'Розкладіть вівсянку по тарілках, зверху викладіть карамельні яблука та підсмажені волоські горіхи.'
      }
    ],
    rating: 4.86,
    reviewsCount: 19,
    author: { name: 'Ірина Мельник', role: 'Нутриціолог' },
    createdAt: '2024-02-07T07:45:00Z',
    updatedAt: '2024-02-13T09:30:00Z',
    quick20: true,
    budget: true
  },
  {
    id: 'rec-14',
    slug: 'caesar-salad-chicken',
    title: 'Класичний салат Цезар з курячим філе та хрусткими сухариками',
    description: 'Популярний свіжий салат з листям ромен, ніжним соковитим філе на грилі, хрусткими часниковими крутонами та справжнім соусом Цезар з пармезаном.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=1000&q=80',
    category: 'salad',
    cuisine: 'american',
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 2,
    difficulty: 'easy',
    calories: 380,
    nutrition: { protein: 32, fat: 22, carbs: 14 },
    tags: ['салат', 'цезар', 'курка', 'вечеря'],
    dietary: { vegetarian: false, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i141', name: 'Куряче філе', amount: 300, unit: 'г' },
      { id: 'i142', name: 'Салат ромен або айсберг', amount: 150, unit: 'г' },
      { id: 'i143', name: 'Помідори чері', amount: 6, unit: 'шт' },
      { id: 'i144', name: 'Білий хліб або багет', amount: 80, unit: 'г', notes: 'для сухариків' },
      { id: 'i145', name: 'Сир пармезан', amount: 40, unit: 'г' },
      { id: 'i146', name: 'Майонез або йогурт', amount: 3, unit: 'ст. л.' },
      { id: 'i147', name: 'Гірчиця діжонська', amount: 1, unit: 'ч. л.' },
      { id: 'i148', name: 'Часник', amount: 2, unit: 'зубчики' },
      { id: 'i149', name: 'Оливкова олія', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i1410', name: 'Сіль та перець', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Приготування курячого філе',
        instruction: 'Куряче філе натріть сіллю, перцем, олією та зубчиком часнику. Обсмажте на сковороді по 6 хвилин з кожного боку до золотистої скоринки і соковитості всередині.',
        timerMinutes: 12
      },
      {
        stepNumber: 2,
        title: 'Часникові сухарики',
        instruction: 'Хліб наріжте кубиками, збризніть олією, посипте сухим часником. Підсушіть на сухій пательні або в духовці 5-7 хвилин до хрускоту.',
        timerMinutes: 6
      },
      {
        stepNumber: 3,
        title: 'Соус та збирання салату',
        instruction: 'Змішайте соус: майонез, гірчицю, тертий пармезан, ложку лимонного соку та подрібнений часник. Листя салату порвіть руками, перемішайте з соусом. Зверху викладіть нарізане тепле філе, половинки чері, сухарики та пелюстки пармезану.'
      }
    ],
    rating: 4.93,
    reviewsCount: 46,
    author: { name: 'Тарас Бондар', role: 'Кулінарний блогер' },
    createdAt: '2024-02-08T12:00:00Z',
    updatedAt: '2024-02-14T11:00:00Z',
    featured: true
  },
  {
    id: 'rec-15',
    slug: 'authentic-greek-salad',
    title: 'Свіжий грецький салат з фетою та оливками каламата',
    description: 'Яскравий середземноморський салат зі стиглими томатами, хрусткими огірками, солодким перцем, справжнім сиром фета та запашним орегано.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    category: 'salad',
    cuisine: 'mediterranean',
    prepTime: 12,
    cookTime: 0,
    totalTime: 12,
    servings: 2,
    difficulty: 'easy',
    calories: 220,
    nutrition: { protein: 6, fat: 17, carbs: 9 },
    tags: ['грецький салат', 'овочі', 'фета', 'здорове харчування', 'швидко'],
    dietary: { vegetarian: true, vegan: false, glutenFree: true, lactoseFree: false },
    ingredients: [
      { id: 'i151', name: 'Помідори стиглі', amount: 3, unit: 'шт' },
      { id: 'i152', name: 'Огірки свіжі', amount: 2, unit: 'шт' },
      { id: 'i153', name: 'Перець болгарський', amount: 1, unit: 'шт' },
      { id: 'i154', name: 'Сир фета', amount: 150, unit: 'г' },
      { id: 'i155', name: 'Оливки або маслини', amount: 10, unit: 'шт' },
      { id: 'i156', name: 'Цибуля червона', amount: 0.5, unit: 'шт' },
      { id: 'i157', name: 'Оливкова олія Extra Virgin', amount: 3, unit: 'ст. л.', isStaple: true },
      { id: 'i158', name: 'Орегано сушений', amount: 1, unit: 'ч. л.' },
      { id: 'i159', name: 'Сіль', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Нарізання овочів',
        instruction: 'Помідори та огірки наріжте великими шматочками. Болгарський перець — соломкою, а червону цибулю — тонкими півкільцями.'
      },
      {
        stepNumber: 2,
        title: 'Поєднання та подача',
        instruction: 'Викладіть овочі у салатник, додайте оливки. Зверху викладіть цілий пласт або великі кубики фети. Щедро полийте якісною оливковою олією, посипте сухим орегано та сіллю.'
      }
    ],
    rating: 4.89,
    reviewsCount: 30,
    author: { name: 'Ірина Мельник', role: 'Нутриціолог' },
    createdAt: '2024-02-09T13:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
    quick20: true
  },
  {
    id: 'rec-16',
    slug: 'tuna-egg-cucumber-salad',
    title: 'Білкова закуска: салат з тунцем, яйцем та огірком',
    description: 'Легкий, ситний та багатий на білок салат з консервованого тунця у власному соку, відварених яєць, хрусткого огірка та свіжої зелені.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    category: 'salad',
    cuisine: 'mediterranean',
    prepTime: 15,
    cookTime: 0,
    totalTime: 15,
    servings: 2,
    difficulty: 'easy',
    calories: 230,
    nutrition: { protein: 26, fat: 11, carbs: 5 },
    tags: ['тунець', 'салат', 'білок', 'фітнес', 'швидко'],
    dietary: { vegetarian: false, vegan: false, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i161', name: 'Тунець у власному соку', amount: 180, unit: 'г' },
      { id: 'i162', name: 'Яйця варені', amount: 2, unit: 'шт' },
      { id: 'i163', name: 'Огірки свіжі', amount: 2, unit: 'шт' },
      { id: 'i164', name: 'Зелена цибуля та кріп', amount: 1, unit: 'пучок' },
      { id: 'i165', name: 'Оливкова олія або грецький йогурт', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i166', name: 'Сіль та перець', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Підготовка інгредієнтів',
        instruction: 'З тунця злийте рідину та розімніть виделкою. Яйця та огірки наріжте кубиками, зелень подрібніть.'
      },
      {
        stepNumber: 2,
        title: 'Заправка',
        instruction: 'Змішайте всі інгредієнти, заправте оливковою олією або йогуртом, приправте сіллю та перцем.'
      }
    ],
    rating: 4.82,
    reviewsCount: 22,
    author: { name: 'Ірина Мельник', role: 'Нутриціолог' },
    createdAt: '2024-02-10T11:00:00Z',
    updatedAt: '2024-02-16T09:00:00Z',
    quick20: true,
    budget: true
  },
  {
    id: 'rec-17',
    slug: 'homemade-chicken-noodle-soup',
    title: 'Домашній курячий суп з яєчною локшиною',
    description: 'Цілющий прозорий бульйон на домашній курочці з тонкою яєчною локшиною, солодкуватою морквою та свіжою петрушкою.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80',
    category: 'soup',
    cuisine: 'ukrainian',
    prepTime: 15,
    cookTime: 45,
    totalTime: 60,
    servings: 4,
    difficulty: 'easy',
    calories: 210,
    nutrition: { protein: 18, fat: 6, carbs: 22 },
    tags: ['суп', 'курка', 'локшина', 'комфортна їжа', 'обід'],
    dietary: { vegetarian: false, vegan: false, glutenFree: false, lactoseFree: true },
    ingredients: [
      { id: 'i171', name: 'Курячі стегна або гомілки', amount: 500, unit: 'г' },
      { id: 'i172', name: 'Яєчна локшина', amount: 100, unit: 'г' },
      { id: 'i173', name: 'Морква', amount: 1, unit: 'шт' },
      { id: 'i174', name: 'Цибуля ріпчаста', amount: 1, unit: 'шт' },
      { id: 'i175', name: 'Картопля', amount: 2, unit: 'шт' },
      { id: 'i176', name: 'Лавровий лист', amount: 2, unit: 'шт' },
      { id: 'i177', name: 'Свіжий кріп', amount: 0.5, unit: 'пучка' },
      { id: 'i178', name: 'Вода', amount: 2, unit: 'л', isStaple: true },
      { id: 'i179', name: 'Сіль та перець горошком', amount: 1, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Варка бульйону',
        instruction: 'Курку залийте холодною водою, додайте цілу очищену цибулину, лавровий лист і перець горошком. Доведіть до кипіння, зніміть піну і варіть 35 хвилин на слабкому вогні.',
        timerMinutes: 35
      },
      {
        stepNumber: 2,
        title: 'Додавання овочів',
        instruction: 'Вийміть цибулину. Додайте нарізану кубиками картоплю та моркву кружальцями. Варіть 10 хвилин.',
        timerMinutes: 10
      },
      {
        stepNumber: 3,
        title: 'Локшина та фінал',
        instruction: 'Всипте локшину, посоліть, проваріть 4 хвилини. Вимкніть вогонь, додайте посічений кріп і дайте постояти 5 хвилин.',
        timerMinutes: 4
      }
    ],
    rating: 4.91,
    reviewsCount: 35,
    author: { name: 'Оксана Мельник', role: 'Шеф української кухні' },
    createdAt: '2024-02-11T12:00:00Z',
    updatedAt: '2024-02-17T11:00:00Z',
    budget: true
  },
  {
    id: 'rec-18',
    slug: 'creamy-mushroom-soup',
    title: 'Оксамитовий крем-суп з печериць та вершків',
    description: 'Ніжний кремовий суп з обсмажених печериць, вершкового масла, часнику та вершків. Подається з хрусткими сухариками.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
    category: 'soup',
    cuisine: 'french',
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 3,
    difficulty: 'easy',
    calories: 260,
    nutrition: { protein: 6, fat: 19, carbs: 14 },
    tags: ['крем-суп', 'гриби', 'вершки', 'вегетаріанське', 'обід'],
    dietary: { vegetarian: true, vegan: false, glutenFree: true, lactoseFree: false },
    ingredients: [
      { id: 'i181', name: 'Печериці свіжі', amount: 500, unit: 'г' },
      { id: 'i182', name: 'Цибуля ріпчаста', amount: 1, unit: 'шт' },
      { id: 'i183', name: 'Картопля', amount: 1, unit: 'шт' },
      { id: 'i184', name: 'Вершки 20%', amount: 150, unit: 'мл' },
      { id: 'i185', name: 'Вершкове масло', amount: 30, unit: 'г' },
      { id: 'i186', name: 'Часник', amount: 2, unit: 'зубчики' },
      { id: 'i187', name: 'Вода або овочевий бульйон', amount: 500, unit: 'мл', isStaple: true },
      { id: 'i188', name: 'Сіль та мускатний горіх', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Обсмажування грибів',
        instruction: 'Наріжте печериці та цибулю. Обсмажте на вершковому маслі з часником 10 хвилин до карамельного аромату.',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        title: 'Варка картоплі',
        instruction: 'Додайте нарізану дрібно картоплю, залийте гарячою водою і варіть 12 хвилин до повної м\'якості.',
        timerMinutes: 12
      },
      {
        stepNumber: 3,
        title: 'Блендерування та вершки',
        instruction: 'Збийте суп занурювальним блендером до шовковистої гладкості. Влийте теплі вершки, додайте сіль і мускатний горіх, прогрійте 2 хвилини без кипіння.'
      }
    ],
    rating: 4.88,
    reviewsCount: 28,
    author: { name: 'Аліна Савчук', role: 'Фуд-стиліст' },
    createdAt: '2024-02-12T13:00:00Z',
    updatedAt: '2024-02-18T10:00:00Z'
  },
  {
    id: 'rec-19',
    slug: 'pumpkin-soup-seeds',
    title: 'Зігріваючий гарбузовий крем-суп з імбиром та насінням',
    description: 'Яскравий сонячний крем-суп з запеченого гарбуза з нотками імбиру, кокосового молока або вершків та хрустким гарбузовим насінням.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80',
    category: 'healthy',
    cuisine: 'other',
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 3,
    difficulty: 'easy',
    calories: 190,
    nutrition: { protein: 4, fat: 10, carbs: 22 },
    tags: ['гарбуз', 'суп', 'корисне', 'вегетаріанське', 'осіннє'],
    dietary: { vegetarian: true, vegan: true, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i191', name: 'Гарбуз очищений', amount: 600, unit: 'г' },
      { id: 'i192', name: 'Морква', amount: 1, unit: 'шт' },
      { id: 'i193', name: 'Цибуля ріпчаста', amount: 1, unit: 'шт' },
      { id: 'i194', name: 'Свіжий імбир тертий', amount: 1, unit: 'ч. л.' },
      { id: 'i195', name: 'Кокосове або звичайне молоко', amount: 150, unit: 'мл' },
      { id: 'i196', name: 'Гарбузове насіння', amount: 30, unit: 'г' },
      { id: 'i197', name: 'Оливкова олія', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i198', name: 'Сіль та карі', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Обсмажування та варіння овочів',
        instruction: 'Обсмажте цибулю, моркву та нарізаний кубиками гарбуз на оливковій олії 5 хвилин. Додайте імбир та карі, залийте водою (близько 400 мл) і варіть 20 хвилин до м\'якості.',
        timerMinutes: 20
      },
      {
        stepNumber: 2,
        title: 'Блендерування',
        instruction: 'Подрібніть овочі блендером, влийте кокосове молоко, посоліть за смаком.'
      },
      {
        stepNumber: 3,
        title: 'Подача',
        instruction: 'Подавайте з підсушеним на сковороді гарбузовим насінням і краплею олії.'
      }
    ],
    rating: 4.87,
    reviewsCount: 20,
    author: { name: 'Ірина Мельник', role: 'Нутриціолог' },
    createdAt: '2024-02-13T10:00:00Z',
    updatedAt: '2024-02-19T09:00:00Z'
  },
  {
    id: 'rec-20',
    slug: 'crispy-baked-chicken-garlic',
    title: 'Соковита запечена курка з часником, лимоном та розмарином',
    description: 'Ідеальна курка в духовці з хрусткою золотистою скоринкою та неймовірно ніжним і соковитим м\'ясом, просоченим пряними травами.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=80',
    category: 'meat',
    cuisine: 'ukrainian',
    prepTime: 15,
    cookTime: 50,
    totalTime: 65,
    servings: 4,
    difficulty: 'easy',
    calories: 380,
    nutrition: { protein: 36, fat: 24, carbs: 2 },
    tags: ['курка', 'запечене', 'вечеря', 'м\'ясо'],
    dietary: { vegetarian: false, vegan: false, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i201', name: 'Курячі стегна або ціла курка', amount: 800, unit: 'г' },
      { id: 'i202', name: 'Часник', amount: 5, unit: 'зубчики' },
      { id: 'i203', name: 'Лимон', amount: 0.5, unit: 'шт' },
      { id: 'i204', name: 'Розмарин або чебрець', amount: 2, unit: 'гілочки' },
      { id: 'i205', name: 'Оливкова або рослинна олія', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i206', name: 'Солодка паприка', amount: 1, unit: 'ч. л.' },
      { id: 'i207', name: 'Сіль та чорний перець', amount: 1, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Маринування',
        instruction: 'Змішайте олію, паприку, подрібнений часник, сіль, перець і сік лимона. Ретельно натріть курку маринадом і залиште на 15 хвилин.'
      },
      {
        stepNumber: 2,
        title: 'Запікання',
        instruction: 'Викладіть у форму для запікання разом з гілочками розмарину. Запікайте при 200°C 45-50 хвилин до появи яскравої хрусткої скоринки.',
        timerMinutes: 48,
        tip: 'Поливайте курку соком з дна форми кожні 15 хвилин для отримання супер-глянцевої скоринки.'
      }
    ],
    rating: 4.96,
    reviewsCount: 41,
    author: { name: 'Тарас Бондар', role: 'Кулінарний блогер' },
    createdAt: '2024-02-14T17:00:00Z',
    updatedAt: '2024-02-20T14:00:00Z',
    featured: true
  },
  {
    id: 'rec-21',
    slug: 'crispy-bbq-chicken-wings',
    title: 'Хрусткі курячі крильця в соусі барбекю',
    description: 'Липкі, пікантні, надзвичайно хрусткі крильця з легким димним соусом BBQ. Найкраща закуска до перегляду фільмів.',
    image: 'https://images.unsplash.com/photo-1527477378393-2747d95955a9?auto=format&fit=crop&w=1000&q=80',
    category: 'appetizer',
    cuisine: 'american',
    prepTime: 10,
    cookTime: 35,
    totalTime: 45,
    servings: 3,
    difficulty: 'easy',
    calories: 420,
    nutrition: { protein: 30, fat: 28, carbs: 12 },
    tags: ['крильця', 'закуска', 'барбекю', 'курка'],
    dietary: { vegetarian: false, vegan: false, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i211', name: 'Курячі крильця', amount: 800, unit: 'г' },
      { id: 'i212', name: 'Соус барбекю (BBQ)', amount: 100, unit: 'мл' },
      { id: 'i213', name: 'Мед', amount: 1, unit: 'ст. л.' },
      { id: 'i214', name: 'Часник сушений', amount: 1, unit: 'ч. л.' },
      { id: 'i215', name: 'Паприка копчена', amount: 1, unit: 'ч. л.' },
      { id: 'i216', name: 'Рослинна олія', amount: 1, unit: 'ст. л.', isStaple: true },
      { id: 'i217', name: 'Сіль', amount: 1, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Підготовка крилець',
        instruction: 'Крильця розріжте по суглобах (кінчики видаліть). Обсушіть паперовим рушником. Змішайте з сіллю, паприкою, сухим часником та олією.'
      },
      {
        stepNumber: 2,
        title: 'Випікання до хрускоту',
        instruction: 'Викладіть на деко з пергаментом і випікайте при 210°C 25 хвилин.',
        timerMinutes: 25
      },
      {
        stepNumber: 3,
        title: 'Глазурування',
        instruction: 'Змішайте соус барбекю з медом. Змастіть крильця і поверніть у духовку ще на 8-10 хвилин для карамелізації.',
        timerMinutes: 9
      }
    ],
    rating: 4.92,
    reviewsCount: 38,
    author: { name: 'Тарас Бондар', role: 'Кулінарний блогер' },
    createdAt: '2024-02-15T18:00:00Z',
    updatedAt: '2024-02-21T12:00:00Z'
  },
  {
    id: 'rec-22',
    slug: 'perfect-ribeye-steak',
    title: 'Ідеальний яловичий стейк Рібай з вершковим маслом та розмарином',
    description: 'Соковитий мармуровий стейк середнього просмаження medium-rare, приготований за ресторанною технікою з ароматним часниковим маслом.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    category: 'meat',
    cuisine: 'american',
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    servings: 1,
    difficulty: 'medium',
    calories: 580,
    nutrition: { protein: 44, fat: 42, carbs: 1 },
    tags: ['стейк', 'яловичина', 'м\'ясо', 'вечеря'],
    dietary: { vegetarian: false, vegan: false, glutenFree: true, lactoseFree: false },
    ingredients: [
      { id: 'i221', name: 'Стейк Рібай (яловичина)', amount: 350, unit: 'г', notes: 'кімнатної температури' },
      { id: 'i222', name: 'Вершкове масло', amount: 30, unit: 'г' },
      { id: 'i223', name: 'Часник', amount: 3, unit: 'зубчики', notes: 'роздавлені ножем' },
      { id: 'i224', name: 'Свіжий розмарин та чебрець', amount: 2, unit: 'гілочки' },
      { id: 'i225', name: 'Оливкова або рослинна олія', amount: 1, unit: 'ст. л.', isStaple: true },
      { id: 'i226', name: 'Морська сіль крупна', amount: 1, unit: 'ч. л.', isStaple: true },
      { id: 'i227', name: 'Чорний перець грубого помелу', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Підготовка м\'яса',
        instruction: 'Дістаньте стейк з холодильника за 30 хвилин до смаження. Обсушіть серветкою, змастіть олією, щедро посипте крупною сіллю та перцем.',
        tip: 'Стейк кімнатної температури просмажується рівномірно без холодної середини.'
      },
      {
        stepNumber: 2,
        title: 'Обсмажування на розпеченій пательні',
        instruction: 'Розігрійте чавунну сковороду до появи легкого димку. Викладіть стейк і смажте по 2.5 хвилини з кожного боку.',
        timerMinutes: 5
      },
      {
        stepNumber: 3,
        title: 'Бастінг (поливання маслом)',
        instruction: 'Зменшіть вогонь, додайте вершкове масло, часник і розмарин. Нахиліть пательню і ложкою безперервно поливайте стейк пінистим гарячим маслом ще 2 хвилини.',
        timerMinutes: 2
      },
      {
        stepNumber: 4,
        title: 'Відпочинок м\'яса',
        instruction: 'Перекладіть стейк на теплу тарілку або дошку і залиште відпочити на 5 хвилин. М\'ясні соки рівномірно розподіляться по волокнах.',
        timerMinutes: 5
      }
    ],
    rating: 4.98,
    reviewsCount: 57,
    author: { name: 'Тарас Бондар', role: 'Кулінарний блогер' },
    createdAt: '2024-02-16T19:00:00Z',
    updatedAt: '2024-02-22T13:00:00Z',
    featured: true,
    quick20: true
  },
  {
    id: 'rec-23',
    slug: 'homemade-juicy-cutlets',
    title: 'Домашні соковиті котлети зі змішаного фаршу',
    description: 'Улюблені котлети з дитинства: соковиті, м\'які, з хрусткою скоринкою, приготовані з яловичини та свинини з цибулею.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1000&q=80',
    category: 'meat',
    cuisine: 'ukrainian',
    prepTime: 20,
    cookTime: 20,
    totalTime: 40,
    servings: 4,
    difficulty: 'easy',
    calories: 330,
    nutrition: { protein: 24, fat: 22, carbs: 10 },
    tags: ['котлети', 'фарш', 'домашнє', 'обід'],
    dietary: { vegetarian: false, vegan: false, glutenFree: false, lactoseFree: true },
    ingredients: [
      { id: 'i231', name: 'Фарш (свинина + яловичина)', amount: 600, unit: 'г' },
      { id: 'i232', name: 'Цибуля ріпчаста', amount: 1, unit: 'шт' },
      { id: 'i233', name: 'Хліб білий або батон', amount: 80, unit: 'г', notes: 'розмочений у воді або молоці' },
      { id: 'i234', name: 'Яйця', amount: 1, unit: 'шт' },
      { id: 'i235', name: 'Часник', amount: 2, unit: 'зубчики' },
      { id: 'i236', name: 'Панірувальні сухарі або борошно', amount: 4, unit: 'ст. л.' },
      { id: 'i237', name: 'Рослинна олія', amount: 3, unit: 'ст. л.', isStaple: true },
      { id: 'i238', name: 'Сіль та перець', amount: 1, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Заміс фаршу',
        instruction: 'Цибулю подрібніть, хліб відіжміть. Змішайте фарш з цибулею, хлібом, яйцем, часником, сіллю та перцем. Відбийте фарш об миску кілька разів для щільності.'
      },
      {
        stepNumber: 2,
        title: 'Формування та панірування',
        instruction: 'Вологими руками сформуйте акуратні овальні котлети. Обваляйте у панірувальних сухарях.'
      },
      {
        stepNumber: 3,
        title: 'Смаження',
        instruction: 'Смажте на олії по 5 хвилин з кожного боку. Потім накрийте кришкою і протушкуйте на слабкому вогні ще 7 хвилин.',
        timerMinutes: 12
      }
    ],
    rating: 4.88,
    reviewsCount: 34,
    author: { name: 'Оксана Мельник', role: 'Шеф української кухні' },
    createdAt: '2024-02-17T11:00:00Z',
    updatedAt: '2024-02-23T10:00:00Z',
    budget: true
  },
  {
    id: 'rec-24',
    slug: 'honey-mustard-pork-ribs',
    title: 'Свинячі реберця в медово-гірчичній глазурі',
    description: 'Неймовірно м\'які та ніжні запечені реберця, м\'ясо яких саме спадає з кістки, вкриті липкою карамельною глазур\'ю.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    category: 'meat',
    cuisine: 'ukrainian',
    prepTime: 20,
    cookTime: 90,
    totalTime: 110,
    servings: 4,
    difficulty: 'medium',
    calories: 490,
    nutrition: { protein: 32, fat: 34, carbs: 16 },
    tags: ['реберця', 'свинина', 'запечене', 'свято'],
    dietary: { vegetarian: false, vegan: false, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i241', name: 'Свинячі ребра', amount: 1000, unit: 'г' },
      { id: 'i242', name: 'Мед', amount: 2, unit: 'ст. л.' },
      { id: 'i243', name: 'Гірчиця французька або діжонська', amount: 2, unit: 'ст. л.' },
      { id: 'i244', name: 'Соєвий соус', amount: 3, unit: 'ст. л.' },
      { id: 'i245', name: 'Часник', amount: 4, unit: 'зубчики' },
      { id: 'i246', name: 'Паприка копчена', amount: 1, unit: 'ч. л.' },
      { id: 'i247', name: 'Сіль та перець', amount: 1, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Маринування та запікання у фользі',
        instruction: 'Змішайте мед, гірчицю, соєвий соус, подрібнений часник і спеції. Натріть ребра. Загорніть у два шари фольги і запікайте при 160°C 75 хвилин.',
        timerMinutes: 75
      },
      {
        stepNumber: 2,
        title: 'Глазурування під грилем',
        instruction: 'Розкрийте фольгу, змастіть соками, що виділилися, та запікайте при 210°C 15 хвилин до глянцевої скоринки.',
        timerMinutes: 15
      }
    ],
    rating: 4.95,
    reviewsCount: 39,
    author: { name: 'Тарас Бондар', role: 'Кулінарний блогер' },
    createdAt: '2024-02-18T17:00:00Z',
    updatedAt: '2024-02-24T12:00:00Z'
  },
  {
    id: 'rec-25',
    slug: 'baked-salmon-lemon-dill',
    title: 'Запечений лосось з лимоном, вершковим маслом та кропом',
    description: 'Ніжне філе лосося, запечене в духовці за 15 хвилин: залишається соковитим, рожевим та тане у роті.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    category: 'fish',
    cuisine: 'mediterranean',
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 2,
    difficulty: 'easy',
    calories: 360,
    nutrition: { protein: 34, fat: 24, carbs: 1 },
    tags: ['лосось', 'риба', 'здорове харчування', 'швидко', 'вечеря'],
    dietary: { vegetarian: false, vegan: false, glutenFree: true, lactoseFree: false },
    ingredients: [
      { id: 'i251', name: 'Стейк або філе лосося', amount: 400, unit: 'г' },
      { id: 'i252', name: 'Лимон', amount: 1, unit: 'шт' },
      { id: 'i253', name: 'Вершкове масло', amount: 25, unit: 'г' },
      { id: 'i254', name: 'Свіжий кріп', amount: 0.5, unit: 'пучка' },
      { id: 'i255', name: 'Часник', amount: 1, unit: 'зубчик' },
      { id: 'i256', name: 'Сіль та білий перець', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Підготовка риби',
        instruction: 'Лосось викладіть у форму для запікання. Посоліть, поперчіть. Зверху викладіть тонкі кружальця лимона, подрібнений часник і шматочки масла.'
      },
      {
        stepNumber: 2,
        title: 'Запікання',
        instruction: 'Запікайте при 190°C рівно 12-15 хвилин. Не пересушуйте! Посипте свіжим кропом.',
        timerMinutes: 14
      }
    ],
    rating: 4.96,
    reviewsCount: 44,
    author: { name: 'Ірина Мельник', role: 'Нутриціолог' },
    createdAt: '2024-02-19T14:00:00Z',
    updatedAt: '2024-02-25T11:00:00Z',
    featured: true
  },
  {
    id: 'rec-26',
    slug: 'mediterranean-baked-dorado',
    title: 'Запечена дорадо з розмарином та овочами',
    description: 'Ціла дорадо, запечена з томатами чері, оливками та свіжим розмарином. Елегантна ресторанна страва в домашніх умовах.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80',
    category: 'fish',
    cuisine: 'mediterranean',
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 2,
    difficulty: 'easy',
    calories: 280,
    nutrition: { protein: 32, fat: 14, carbs: 4 },
    tags: ['дорадо', 'риба', 'середземноморська кухня', 'вечеря'],
    dietary: { vegetarian: false, vegan: false, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i261', name: 'Дорадо ціла (почищена)', amount: 2, unit: 'шт' },
      { id: 'i262', name: 'Помідори чері', amount: 8, unit: 'шт' },
      { id: 'i263', name: 'Оливки', amount: 8, unit: 'шт' },
      { id: 'i264', name: 'Лимон', amount: 1, unit: 'шт' },
      { id: 'i265', name: 'Гілочки розмарину', amount: 2, unit: 'шт' },
      { id: 'i266', name: 'Оливкова олія', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i267', name: 'Сіль та перець', amount: 1, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Фарширування риби',
        instruction: 'Зробіть неглибокі косі надрізи на шкірі дорадо. Всередину черевця вкладіть кружальця лимона та гілочку розмарину.'
      },
      {
        stepNumber: 2,
        title: 'Запікання',
        instruction: 'Викладіть рибу на деко з чері та оливками, збризніть оливковою олією. Запікайте при 200°C 20-25 хвилин.',
        timerMinutes: 22
      }
    ],
    rating: 4.89,
    reviewsCount: 23,
    author: { name: 'Марко Россі', role: 'Шеф-кухар' },
    createdAt: '2024-02-20T15:00:00Z',
    updatedAt: '2024-02-26T12:00:00Z'
  },
  {
    id: 'rec-27',
    slug: 'tender-fish-cutlets',
    title: 'Ніжні рибні котлети з білої риби',
    description: 'Легкі та повітряні котлетки з хека або тріски з вершковим маслом, які сподобаються навіть тим, хто зазвичай не любить рибу.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1000&q=80',
    category: 'fish',
    cuisine: 'ukrainian',
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 4,
    difficulty: 'easy',
    calories: 210,
    nutrition: { protein: 22, fat: 9, carbs: 8 },
    tags: ['риба', 'котлети', 'обід', 'дієтичне'],
    dietary: { vegetarian: false, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i271', name: 'Філе білої риби (хек/минтай)', amount: 600, unit: 'г' },
      { id: 'i272', name: 'Цибуля ріпчаста', amount: 1, unit: 'шт' },
      { id: 'i273', name: 'Яйця', amount: 1, unit: 'шт' },
      { id: 'i274', name: 'Вершкове масло', amount: 30, unit: 'г' },
      { id: 'i275', name: 'Манна крупа або хліб', amount: 2, unit: 'ст. л.' },
      { id: 'i276', name: 'Рослинна олія', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i277', name: 'Сіль та кріп', amount: 1, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Приготування фаршу',
        instruction: 'Перекрутіть філе риби з цибулею та холодним вершковим маслом. Додайте яйце, манку, посічений кріп і сіль. Дайте постояти 10 хвилин.'
      },
      {
        stepNumber: 2,
        title: 'Смаження',
        instruction: 'Сформуйте котлетки та смажте по 4-5 хвилин з кожного боку до готовності.',
        timerMinutes: 10
      }
    ],
    rating: 4.81,
    reviewsCount: 18,
    author: { name: 'Оксана Мельник', role: 'Шеф української кухні' },
    createdAt: '2024-02-21T10:00:00Z',
    updatedAt: '2024-02-27T10:00:00Z',
    budget: true
  },
  {
    id: 'rec-28',
    slug: 'village-garlic-potatoes',
    title: 'Золотиста картопля по-селянськи з часником та паприкою',
    description: 'Руді ароматні картопляні скибочки з хрусткою скоринкою та м\'якою розсипчастою серединкою, запечені у травах.',
    image: 'https://images.unsplash.com/photo-1518013034458-30b0ee243591?auto=format&fit=crop&w=1000&q=80',
    category: 'appetizer',
    cuisine: 'ukrainian',
    prepTime: 10,
    cookTime: 30,
    totalTime: 40,
    servings: 4,
    difficulty: 'easy',
    calories: 230,
    nutrition: { protein: 4, fat: 8, carbs: 36 },
    tags: ['картопля', 'по-селянськи', 'гарнір', 'бюджетно', 'пісне'],
    dietary: { vegetarian: true, vegan: true, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i281', name: 'Картопля', amount: 800, unit: 'г', notes: 'ретельно вимита зі шкіркою' },
      { id: 'i282', name: 'Часник', amount: 4, unit: 'зубчики' },
      { id: 'i283', name: 'Солодка паприка', amount: 1, unit: 'ст. л.' },
      { id: 'i284', name: 'Орегано або чебрець', amount: 1, unit: 'ч. л.' },
      { id: 'i285', name: 'Рослинна олія', amount: 3, unit: 'ст. л.', isStaple: true },
      { id: 'i286', name: 'Сіль', amount: 1, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Нарізання та приправи',
        instruction: 'Картоплю наріжте поздовжніми скибочками. Змішайте з олією, подрібненим часником, паприкою, травами та сіллю.'
      },
      {
        stepNumber: 2,
        title: 'Запікання',
        instruction: 'Викладіть шкіркою вниз на деко в один шар. Запікайте при 210°C 30 хвилин до хрусткої золотистої скоринки.',
        timerMinutes: 30
      }
    ],
    rating: 4.94,
    reviewsCount: 51,
    author: { name: 'Тарас Бондар', role: 'Кулінарний блогер' },
    createdAt: '2024-02-22T13:00:00Z',
    updatedAt: '2024-02-28T09:00:00Z',
    budget: true,
    featured: true
  },
  {
    id: 'rec-29',
    slug: 'traditional-uzbek-plov',
    title: 'Ароматний розсипчастий плов з яловичиною та барбарисом',
    description: 'Класичний східний плов у казані: насичений зірвак, ніжне м\'ясо, соковита солодка морква та рисинка до рисинки.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    category: 'dinner',
    cuisine: 'asian',
    prepTime: 25,
    cookTime: 55,
    totalTime: 80,
    servings: 6,
    difficulty: 'medium',
    calories: 460,
    nutrition: { protein: 26, fat: 18, carbs: 50 },
    tags: ['плов', 'рис', 'яловичина', 'вечеря', 'східне'],
    dietary: { vegetarian: false, vegan: false, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i291', name: 'Рис довгозернистий (басматі/девзіра)', amount: 450, unit: 'г' },
      { id: 'i292', name: 'Яловичина м\'якоть', amount: 600, unit: 'г' },
      { id: 'i293', name: 'Морква соковита', amount: 500, unit: 'г', notes: 'нарізана брусочками' },
      { id: 'i294', name: 'Цибуля ріпчаста', amount: 2, unit: 'шт' },
      { id: 'i295', name: 'Часник ціла головка', amount: 2, unit: 'шт' },
      { id: 'i296', name: 'Зіра (кумин)', amount: 1, unit: 'ст. л.' },
      { id: 'i297', name: 'Рослинна олія', amount: 100, unit: 'мл', isStaple: true },
      { id: 'i298', name: 'Сіль та перець', amount: 1.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Приготування зірвака',
        instruction: 'У казані добре розігрійте олію. Обсмажте нарізане великими шматками м\'ясо до рум\'яної скоринки 10 хвилин. Додайте цибулю, потім соломку моркви і смажте ще 10 хвилин.',
        timerMinutes: 20
      },
      {
        stepNumber: 2,
        title: 'Тушкування з прянощами',
        instruction: 'Додайте зіру, сіль, залийте гарячою водою, вставте цілі вимиті головки часнику і тушкуйте на тихому вогні 25 хвилин.',
        timerMinutes: 25
      },
      {
        stepNumber: 3,
        title: 'Закладка рису',
        instruction: 'Промитий до прозорості рис викладіть рівним шаром поверх м\'яса (не перемішуючи!). Долийте води на 1 см вище рівня рису. Готуйте до випаровування води, потім зберіть рис гіркою, накрийте кришкою і млійте 20 хвилин на мінімальному вогні.',
        timerMinutes: 20
      }
    ],
    rating: 4.97,
    reviewsCount: 47,
    author: { name: 'Тарас Бондар', role: 'Кулінарний блогер' },
    createdAt: '2024-02-23T15:00:00Z',
    updatedAt: '2024-03-01T11:00:00Z'
  },
  {
    id: 'rec-30',
    slug: 'egg-fried-rice-veggies',
    title: 'Швидкий азійський смажений рис з яйцем та овочами',
    description: 'Супер-швидка та смачна страва за 15 хвилин: розсипчастий рис, обсмажений у воку з яйцем, соєвим соусом, зеленою цибулею та імбиром.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80',
    category: 'quick',
    cuisine: 'asian',
    prepTime: 5,
    cookTime: 12,
    totalTime: 17,
    servings: 2,
    difficulty: 'easy',
    calories: 320,
    nutrition: { protein: 11, fat: 10, carbs: 46 },
    tags: ['рис', 'азійське', 'швидко', 'вегетаріанське', 'вечеря'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: true },
    ingredients: [
      { id: 'i301', name: 'Рис відварений охолоджений', amount: 300, unit: 'г' },
      { id: 'i302', name: 'Яйця', amount: 2, unit: 'шт' },
      { id: 'i303', name: 'Зелений горошок або кукурудза', amount: 50, unit: 'г' },
      { id: 'i304', name: 'Соєвий соус', amount: 2, unit: 'ст. л.' },
      { id: 'i305', name: 'Зелена цибуля', amount: 1, unit: 'пучок' },
      { id: 'i306', name: 'Часник', amount: 1, unit: 'зубчик' },
      { id: 'i307', name: 'Рослинна олія', amount: 2, unit: 'ст. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Смаження яєць',
        instruction: 'На розігрітій пательні з олією швидко обсмажте збиті яйця, помішуючи лопаткою 1 хвилину, щоб вийшов скрамбл. Перекладіть на тарілку.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        title: 'Обсмажування рису',
        instruction: 'Додайте ще ложку олії, часник і рис. Смажте на високому вогні 4 хвилини, постійно перемішуючи. Додайте соєвий соус, овочі, поверніть яйця і посипте зеленою цибулею.',
        timerMinutes: 5
      }
    ],
    rating: 4.85,
    reviewsCount: 27,
    author: { name: 'Тарас Бондар', role: 'Кулінарний блогер' },
    createdAt: '2024-02-24T12:00:00Z',
    updatedAt: '2024-03-02T10:00:00Z',
    quick20: true,
    budget: true
  },
  {
    id: 'rec-31',
    slug: 'thin-crepes-mlyntsi',
    title: 'Тонкі мереживні українські млинці на молоці',
    description: 'Бездоганні тоненькі еластичні млинці з золотистими дірочками. Ідеально підходять як для солодких, так і для солоних начинок.',
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1000&q=80',
    category: 'baking',
    cuisine: 'ukrainian',
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 4,
    difficulty: 'easy',
    calories: 210,
    nutrition: { protein: 6, fat: 8, carbs: 28 },
    tags: ['млинці', 'сніданок', 'випічка', 'дітям', 'бюджетно'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i311', name: 'Молоко', amount: 500, unit: 'мл' },
      { id: 'i312', name: 'Борошно пшеничне', amount: 200, unit: 'г' },
      { id: 'i313', name: 'Яйця', amount: 3, unit: 'шт' },
      { id: 'i314', name: 'Цукор', amount: 1.5, unit: 'ст. л.', isStaple: true },
      { id: 'i315', name: 'Вершкове масло розтоплене', amount: 30, unit: 'г' },
      { id: 'i316', name: 'Рослинна олія', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i317', name: 'Сіль', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Замішування тіста без грудочок',
        instruction: 'Збийте яйця з сіллю та цукром. Додайте половину молока та все борошно, вимішайте густу однорідну масу. Потім влийте залишок молока, масло та олію. Залиште на 10 хвилин.'
      },
      {
        stepNumber: 2,
        title: 'Випікання',
        instruction: 'Добре розігрійте пательню. Наливайте тонкий шар тіста ополоником, обертаючи пательню. Смажте по 1 хвилині з одного боку і 30 секунд з іншого.',
        timerMinutes: 15
      }
    ],
    rating: 4.96,
    reviewsCount: 63,
    author: { name: 'Марія Коваль', role: 'Кондитер-аматор' },
    createdAt: '2024-02-25T09:00:00Z',
    updatedAt: '2024-03-03T11:00:00Z',
    featured: true,
    budget: true
  },
  {
    id: 'rec-32',
    slug: 'fluffy-american-pancakes',
    title: 'Пишні американські панкейки на кефірі або молоці',
    description: 'Високі, м\'якенькі немов подушечки панкейки. Подавайте стосиком з шматочком вершкового масла та кленовим сиропом або медом.',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1000&q=80',
    category: 'breakfast',
    cuisine: 'american',
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    servings: 3,
    difficulty: 'easy',
    calories: 270,
    nutrition: { protein: 7, fat: 8, carbs: 42 },
    tags: ['панкейки', 'сніданок', 'випічка', 'дітям'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i321', name: 'Борошно пшеничне', amount: 200, unit: 'г' },
      { id: 'i322', name: 'Кефір або молоко', amount: 220, unit: 'мл' },
      { id: 'i323', name: 'Яйця', amount: 1, unit: 'шт' },
      { id: 'i324', name: 'Цукор', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i325', name: 'Розпушувач для тіста', amount: 1, unit: 'ч. л.' },
      { id: 'i326', name: 'Вершкове масло розтоплене', amount: 30, unit: 'г' },
      { id: 'i327', name: 'Сіль', amount: 1, unit: 'дрібка', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Заміс тіста',
        instruction: 'Змішайте окремо сухі та вологі інгредієнти, потім з\'єднайте їх разом. Не вимішуйте занадто довго — кілька дрібних грудочок збережуть пишність!'
      },
      {
        stepNumber: 2,
        title: 'Випікання на сухій пательні',
        instruction: 'Випікайте на сухій розігрітій антипригарній пательні. Коли на поверхні з\'являться бульбашки (через 2 хвилини), переверніть і смажте ще 1 хвилину.',
        timerMinutes: 6
      }
    ],
    rating: 4.89,
    reviewsCount: 37,
    author: { name: 'Марія Коваль', role: 'Кондитер-аматор' },
    createdAt: '2024-02-26T08:30:00Z',
    updatedAt: '2024-03-04T09:00:00Z',
    quick20: true
  },
  {
    id: 'rec-33',
    slug: 'basque-burnt-cheesecake',
    title: 'Ніжний баскський спалений чізкейк Сан-Себастьян',
    description: 'Знаменитий десерт з карамелізованою темною верхівкою та неймовірно кремовою, ледь тремтячою серцевиною.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=80',
    category: 'dessert',
    cuisine: 'other',
    prepTime: 15,
    cookTime: 35,
    totalTime: 50,
    servings: 8,
    difficulty: 'medium',
    calories: 420,
    nutrition: { protein: 8, fat: 32, carbs: 26 },
    tags: ['чізкейк', 'десерт', 'випічка', 'свято'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i331', name: 'Крем-сир (Філадельфія)', amount: 600, unit: 'г' },
      { id: 'i332', name: 'Цукор', amount: 150, unit: 'г', isStaple: true },
      { id: 'i333', name: 'Яйця', amount: 4, unit: 'шт' },
      { id: 'i334', name: 'Вершки 33%', amount: 250, unit: 'мл' },
      { id: 'i335', name: 'Борошно пшеничне', amount: 20, unit: 'г' },
      { id: 'i336', name: 'Ванільний екстракт', amount: 1, unit: 'ч. л.' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Змішування інгредієнтів',
        instruction: 'Крем-сир збийте з цукром до гладкості. По одному введіть яйця, потім вершки, ваніль та просіяне борошно.'
      },
      {
        stepNumber: 2,
        title: 'Випікання при високій температурі',
        instruction: 'Форму застеліть пом\'ятим пергаментом. Вилийте масу і випікайте при 220°C 30-35 хвилин. Верх має потемніти, а центр злегка тремтіти.',
        timerMinutes: 35
      },
      {
        stepNumber: 3,
        title: 'Охолодження',
        instruction: 'Повністю охолодіть при кімнатній температурі, потім поставте в холодильник мінімум на 4 години.'
      }
    ],
    rating: 4.98,
    reviewsCount: 55,
    author: { name: 'Марія Коваль', role: 'Кондитер-аматор' },
    createdAt: '2024-02-27T14:00:00Z',
    updatedAt: '2024-03-05T12:00:00Z',
    featured: true
  },
  {
    id: 'rec-34',
    slug: 'authentic-tiramisu',
    title: 'Автентичне італійське тірамісу з маскарпоне',
    description: 'Легендарний кавовий десерт без випікання: повітряне печиво савоярді, просочене міцним еспресо, та ніжний крем з сиру маскарпоне.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=80',
    category: 'dessert',
    cuisine: 'italian',
    prepTime: 25,
    cookTime: 0,
    totalTime: 25,
    servings: 6,
    difficulty: 'medium',
    calories: 380,
    nutrition: { protein: 7, fat: 26, carbs: 30 },
    tags: ['тірамісу', 'десерт', 'італійське', 'кава', 'без випічки'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i341', name: 'Сир маскарпоне', amount: 500, unit: 'г' },
      { id: 'i342', name: 'Печиво Савоярді', amount: 250, unit: 'г' },
      { id: 'i343', name: 'Яйця свіжі', amount: 4, unit: 'шт' },
      { id: 'i344', name: 'Цукор', amount: 100, unit: 'г', isStaple: true },
      { id: 'i345', name: 'Кава еспресо охолоджена', amount: 250, unit: 'мл' },
      { id: 'i346', name: 'Какао-порошок', amount: 2, unit: 'ст. л.' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Крем з маскарпоне',
        instruction: 'Жовтки збийте з цукром до білої піни, вмішайте маскарпоне. Окремо збийте білки до стійких піків і обережно введіть у крем.'
      },
      {
        stepNumber: 2,
        title: 'Збирання десерту',
        instruction: 'Швидко вмочайте савоярді в каву (на 1 секунду) і викладайте у форму шаром. Покрийте кремом. Повторіть шар печива і крему.'
      },
      {
        stepNumber: 3,
        title: 'Охолодження та какао',
        instruction: 'Поставте в холодильник на 4-6 годин. Перед подачею рясно посипте какао через ситечко.'
      }
    ],
    rating: 4.97,
    reviewsCount: 68,
    author: { name: 'Марко Россі', role: 'Шеф-кухар' },
    createdAt: '2024-02-28T16:00:00Z',
    updatedAt: '2024-03-06T15:00:00Z',
    featured: true
  },
  {
    id: 'rec-35',
    slug: 'chocolate-lava-cake',
    title: 'Вологий шоколадний фондан з рідким центром',
    description: 'Вишуканий французький шоколадний кекс з тонкою хрусткою скоринкою та гарячим шоколадним серцем, що витікає на тарілку.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    category: 'dessert',
    cuisine: 'french',
    prepTime: 12,
    cookTime: 10,
    totalTime: 22,
    servings: 2,
    difficulty: 'medium',
    calories: 390,
    nutrition: { protein: 6, fat: 26, carbs: 32 },
    tags: ['шоколад', 'фондан', 'десерт', 'французьке'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i351', name: 'Шоколад чорний 70%', amount: 100, unit: 'г' },
      { id: 'i352', name: 'Вершкове масло', amount: 70, unit: 'г' },
      { id: 'i353', name: 'Яйця', amount: 2, unit: 'шт' },
      { id: 'i354', name: 'Цукор', amount: 50, unit: 'г', isStaple: true },
      { id: 'i355', name: 'Борошно пшеничне', amount: 30, unit: 'г' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Розтоплення шоколаду',
        instruction: 'Розтопіть шоколад разом з вершковим маслом на водяній бані або імпульсами в мікрохвильовці.'
      },
      {
        stepNumber: 2,
        title: 'Заміс тіста',
        instruction: 'Яйця збийте з цукром до піни. Введіть теплий шоколад та борошно, перемішайте.'
      },
      {
        stepNumber: 3,
        title: 'Випікання',
        instruction: 'Змастіть формочки маслом і присипте какао. Розлийте тісто і випікайте при 200°C рівно 8-9 хвилин. Подавайте відразу з кулькою морозива.',
        timerMinutes: 9
      }
    ],
    rating: 4.93,
    reviewsCount: 36,
    author: { name: 'Марія Коваль', role: 'Кондитер-аматор' },
    createdAt: '2024-03-01T15:00:00Z',
    updatedAt: '2024-03-07T11:00:00Z'
  },
  {
    id: 'rec-36',
    slug: 'apple-pie-sharlotka',
    title: 'Ароматний яблучний пиріг Шарлотка',
    description: 'Найпростіший і найсмачніший домашній яблучний пиріг: багато соковитих кисло-солодких яблук і ніжний бісквіт з хрусткою цукровою скоринкою.',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=1000&q=80',
    category: 'baking',
    cuisine: 'ukrainian',
    prepTime: 15,
    cookTime: 35,
    totalTime: 50,
    servings: 6,
    difficulty: 'easy',
    calories: 230,
    nutrition: { protein: 5, fat: 4, carbs: 44 },
    tags: ['шарлотка', 'яблука', 'пиріг', 'випічка', 'до чаю'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: true },
    ingredients: [
      { id: 'i361', name: 'Яблука кислі (семеренко)', amount: 4, unit: 'шт' },
      { id: 'i362', name: 'Яйця', amount: 4, unit: 'шт' },
      { id: 'i363', name: 'Цукор', amount: 150, unit: 'г', isStaple: true },
      { id: 'i364', name: 'Борошно пшеничне', amount: 150, unit: 'г' },
      { id: 'i365', name: 'Кориця', amount: 1, unit: 'ч. л.' },
      { id: 'i366', name: 'Вершкове масло', amount: 10, unit: 'г', notes: 'для змащування форми' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Підготовка яблук',
        instruction: 'Яблука очистіть від серцевини, наріжте скибочками і посипте корицею. Викладіть у змащену форму.'
      },
      {
        stepNumber: 2,
        title: 'Бісквітне тісто',
        instruction: 'Яйця з цукром збивайте міксером 7-8 хвилин до густої білої пишної піни. Акуратно лопаткою вмішайте просіяне борошно.',
        timerMinutes: 8
      },
      {
        stepNumber: 3,
        title: 'Випікання',
        instruction: 'Залийте яблука тістом. Випікайте при 180°C 35-40 хвилин до сухої шпажки.',
        timerMinutes: 38
      }
    ],
    rating: 4.91,
    reviewsCount: 43,
    author: { name: 'Марія Коваль', role: 'Кондитер-аматор' },
    createdAt: '2024-03-02T13:00:00Z',
    updatedAt: '2024-03-08T10:00:00Z',
    budget: true
  },
  {
    id: 'rec-37',
    slug: 'homemade-oatmeal-cookies',
    title: 'Хрустке домашнє вівсяне печиво з шоколадними дропсами',
    description: 'Неймовірно запашне вівсяне печиво з хрусткими краєчками та жувальною м\'якою серединкою, корицею та шматочками шоколаду.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=80',
    category: 'baking',
    cuisine: 'american',
    prepTime: 15,
    cookTime: 12,
    totalTime: 27,
    servings: 6,
    difficulty: 'easy',
    calories: 190,
    nutrition: { protein: 4, fat: 8, carbs: 26 },
    tags: ['печиво', 'вівсянка', 'випічка', 'до чаю'],
    dietary: { vegetarian: true, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i371', name: 'Вівсяні пластівці', amount: 150, unit: 'г' },
      { id: 'i372', name: 'Борошно пшеничне', amount: 100, unit: 'г' },
      { id: 'i373', name: 'Вершкове масло м\'яке', amount: 90, unit: 'г' },
      { id: 'i374', name: 'Цукор', amount: 70, unit: 'г', isStaple: true },
      { id: 'i375', name: 'Яйця', amount: 1, unit: 'шт' },
      { id: 'i376', name: 'Шоколадні дропси', amount: 50, unit: 'г' },
      { id: 'i377', name: 'Кориця та розпушувач', amount: 0.5, unit: 'ч. л.' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Заміс тіста',
        instruction: 'Масло збийте з цукром і яйцем. Вмішайте сухі інгредієнти та шматочки шоколаду.'
      },
      {
        stepNumber: 2,
        title: 'Випікання',
        instruction: 'Сформуйте кульки, притисніть на деку і випікайте при 180°C 10-12 хвилин до золотистих країв.',
        timerMinutes: 12
      }
    ],
    rating: 4.86,
    reviewsCount: 25,
    author: { name: 'Марія Коваль', role: 'Кондитер-аматор' },
    createdAt: '2024-03-03T11:00:00Z',
    updatedAt: '2024-03-09T09:00:00Z',
    budget: true
  },
  {
    id: 'rec-38',
    slug: 'traditional-uzvar',
    title: 'Традиційний український узвар із сухофруктів з медом',
    description: 'Насичений, бурштиновий солодкий напій з сушених яблук, груш, чорносливу та кураги з запашним медом.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=80',
    category: 'drink',
    cuisine: 'ukrainian',
    prepTime: 10,
    cookTime: 25,
    totalTime: 35,
    servings: 6,
    difficulty: 'easy',
    calories: 90,
    nutrition: { protein: 1, fat: 0, carbs: 22 },
    tags: ['узвар', 'напої', 'традиційне', 'мед', 'корисно'],
    dietary: { vegetarian: true, vegan: false, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i381', name: 'Сухофрукти (яблука, груші, чорнослив)', amount: 350, unit: 'г' },
      { id: 'i382', name: 'Вода', amount: 2.5, unit: 'л', isStaple: true },
      { id: 'i383', name: 'Мед натуральний', amount: 3, unit: 'ст. л.' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Промивання сухофруктів',
        instruction: 'Ретельно промийте сухофрукти теплою водою кілька разів.'
      },
      {
        stepNumber: 2,
        title: 'Варка та настоювання',
        instruction: 'Залийте водою, доведіть до кипіння і варіть на повільному вогні 20 хвилин. Вимкніть, дайте охолонути до теплого стану, додайте мед і залиште настоюватися під кришкою 2 години.',
        timerMinutes: 20
      }
    ],
    rating: 4.95,
    reviewsCount: 32,
    author: { name: 'Оксана Мельник', role: 'Шеф української кухні' },
    createdAt: '2024-03-04T10:00:00Z',
    updatedAt: '2024-03-10T12:00:00Z',
    budget: true
  },
  {
    id: 'rec-39',
    slug: 'fresh-strawberry-lemonade',
    title: 'Освіжаючий домашній полуничний лимонад з м\'ятою',
    description: 'Натуральний прохолодний літній напій зі свіжої полуниці, свіжовичавленого соку лимонів, м\'яти та льоду.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    category: 'drink',
    cuisine: 'other',
    prepTime: 10,
    cookTime: 0,
    totalTime: 10,
    servings: 4,
    difficulty: 'easy',
    calories: 85,
    nutrition: { protein: 1, fat: 0, carbs: 20 },
    tags: ['лимонад', 'напій', 'полуниця', 'літо', 'швидко'],
    dietary: { vegetarian: true, vegan: true, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i391', name: 'Полуниця свіжа або заморожена', amount: 250, unit: 'г' },
      { id: 'i392', name: 'Лимони', amount: 3, unit: 'шт' },
      { id: 'i393', name: 'Свіжа м\'ята', amount: 1, unit: 'пучок' },
      { id: 'i394', name: 'Цукор або сироп', amount: 3, unit: 'ст. л.', isStaple: true },
      { id: 'i395', name: 'Вода газована або столова', amount: 1, unit: 'л', isStaple: true },
      { id: 'i396', name: 'Кубики льоду', amount: 1, unit: 'склянка' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Приготування полуничного пюре',
        instruction: 'Полуницю подрібніть блендером разом з цукром до стану пюре.'
      },
      {
        stepNumber: 2,
        title: 'Змішування',
        instruction: 'У глечик вичавіть сік 3 лимонів, додайте полуничне пюре, листочки м\'яти, лід та залийте холодною водою. Перемішайте.'
      }
    ],
    rating: 4.92,
    reviewsCount: 29,
    author: { name: 'Аліна Савчук', role: 'Фуд-стиліст' },
    createdAt: '2024-03-05T12:00:00Z',
    updatedAt: '2024-03-11T14:00:00Z',
    quick20: true
  },
  {
    id: 'rec-40',
    slug: 'green-energy-smoothie',
    title: 'Зелений енергетичний детокс-смузі з шпинатом та бананом',
    description: 'Заряд вітамінів та бадьорості за 5 хвилин: свіже листя шпинату, солодкий банан, яблуко та насіння чіа.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    category: 'healthy',
    cuisine: 'other',
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    servings: 1,
    difficulty: 'easy',
    calories: 180,
    nutrition: { protein: 4, fat: 2, carbs: 38 },
    tags: ['смузі', 'зелений смузі', 'шпинат', 'детокс', 'корисно'],
    dietary: { vegetarian: true, vegan: true, glutenFree: true, lactoseFree: true },
    ingredients: [
      { id: 'i401', name: 'Шпинат свіжий', amount: 50, unit: 'г' },
      { id: 'i402', name: 'Банан стиглий', amount: 1, unit: 'шт' },
      { id: 'i403', name: 'Яблуко зелене', amount: 1, unit: 'шт' },
      { id: 'i404', name: 'Вода або мигдальне молоко', amount: 200, unit: 'мл', isStaple: true },
      { id: 'i405', name: 'Насіння чіа або льону', amount: 1, unit: 'ч. л.' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Збивання в блендері',
        instruction: 'Викладіть у чашу блендера шпинат, шматочки банана, очищене яблуко, насіння чіа та влийте рідину. Збивайте на високій швидкості 60 секунд до абсолютно гладкого стану.'
      }
    ],
    rating: 4.88,
    reviewsCount: 16,
    author: { name: 'Ірина Мельник', role: 'Нутриціолог' },
    createdAt: '2024-03-06T08:00:00Z',
    updatedAt: '2024-03-12T09:00:00Z',
    quick20: true
  },
  {
    id: 'rec-41',
    slug: 'quick-chicken-cheese-quesadilla',
    title: 'Швидка кесадилья з куркою та тягучим сиром',
    description: 'Гаряча хрустка мексиканська тортилья з соковитою куркою, розплавленим сиром, солодким перцем та кукурудзою за 10 хвилин.',
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=1000&q=80',
    category: 'quick',
    cuisine: 'mexican',
    prepTime: 5,
    cookTime: 8,
    totalTime: 13,
    servings: 2,
    difficulty: 'easy',
    calories: 360,
    nutrition: { protein: 26, fat: 16, carbs: 28 },
    tags: ['кесадилья', 'мексиканська кухня', 'сир', 'курка', 'перекус'],
    dietary: { vegetarian: false, vegan: false, glutenFree: false, lactoseFree: false },
    ingredients: [
      { id: 'i411', name: 'Тортильї (лаваш)', amount: 2, unit: 'шт' },
      { id: 'i412', name: 'Куряче філе готове (запечене/варене)', amount: 150, unit: 'г' },
      { id: 'i413', name: 'Сир твердий або моцарела', amount: 100, unit: 'г' },
      { id: 'i414', name: 'Кукурудза консервована', amount: 2, unit: 'ст. л.' },
      { id: 'i415', name: 'Соус сальса або томатний', amount: 2, unit: 'ст. л.' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Начинення тортильї',
        instruction: 'Половину тортильї змастіть сальсою, викладіть шматочки курки, кукурудзу та щедрий шар натертого сиру. Складіть навпіл.'
      },
      {
        stepNumber: 2,
        title: 'Обсмажування до хрускоту',
        instruction: 'Обсмажте на сухій гарячій пательні по 3 хвилини з кожного боку, поки сир не розплавиться, а тортилья не стане хрусткою.',
        timerMinutes: 6
      }
    ],
    rating: 4.93,
    reviewsCount: 31,
    author: { name: 'Тарас Бондар', role: 'Кулінарний блогер' },
    createdAt: '2024-03-07T12:00:00Z',
    updatedAt: '2024-03-13T10:00:00Z',
    quick20: true
  },
  {
    id: 'rec-42',
    slug: 'tomato-basil-bruschetta',
    title: 'Хрусткі італійські брускети з томатами та базиліком',
    description: 'Підсмажені скибочки чіабати, натерті свіжим часником, з соковитими томатами, ароматним базиліком та оливковою олією Extra Virgin.',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=1000&q=80',
    category: 'appetizer',
    cuisine: 'italian',
    prepTime: 10,
    cookTime: 5,
    totalTime: 15,
    servings: 3,
    difficulty: 'easy',
    calories: 160,
    nutrition: { protein: 4, fat: 6, carbs: 22 },
    tags: ['брускета', 'закуска', 'томати', 'італійське', 'швидко'],
    dietary: { vegetarian: true, vegan: true, glutenFree: false, lactoseFree: true },
    ingredients: [
      { id: 'i421', name: 'Чіабата або багет', amount: 6, unit: 'скибочок' },
      { id: 'i422', name: 'Помідори стиглі', amount: 3, unit: 'шт' },
      { id: 'i423', name: 'Часник', amount: 2, unit: 'зубчики' },
      { id: 'i424', name: 'Свіжий базилік', amount: 8, unit: 'листочків' },
      { id: 'i425', name: 'Оливкова олія Extra Virgin', amount: 2, unit: 'ст. л.', isStaple: true },
      { id: 'i426', name: 'Сіль та перець', amount: 0.5, unit: 'ч. л.', isStaple: true }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Підготовка начинки',
        instruction: 'Помідори наріжте дрібними кубиками, видаливши насіння із зайвим соком. Змішайте з подрібненим базиліком, ложкою олії, сіллю та перцем.'
      },
      {
        stepNumber: 2,
        title: 'Підсушування хліба',
        instruction: 'Скибочки хліба підсушіть на сухій пательні до хрускоту (2-3 хвилини). Натріть теплий хліб зубчиком часнику.'
      },
      {
        stepNumber: 3,
        title: 'Подача',
        instruction: 'Викладіть томатну начинку на хліб безпосередньо перед подачею, щоб скибочки залишалися хрусткими.'
      }
    ],
    rating: 4.9,
    reviewsCount: 24,
    author: { name: 'Марко Россі', role: 'Шеф-кухар' },
    createdAt: '2024-03-08T14:00:00Z',
    updatedAt: '2024-03-14T11:00:00Z',
    quick20: true
  }
];
