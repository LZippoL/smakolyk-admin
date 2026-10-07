import { RecipeCategory, CuisineType } from '../types';

export interface CategoryMeta {
  id: RecipeCategory;
  name: string;
  icon: string;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'breakfast',
    name: 'Сніданки',
    icon: '🍳',
    description: 'Ситно, поживно та швидко на початку дня',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'lunch',
    name: 'Обіди',
    icon: '🍲',
    description: 'Повноцінні страви для денного відновлення сил',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dinner',
    name: 'Вечері',
    icon: '🍽️',
    description: 'Затишні вечері для всієї родини або романтичного вечора',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'soup',
    name: 'Супи',
    icon: '🥣',
    description: 'Зігріваючі бульйони, українські борщі та ніжні крем-супи',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'salad',
    name: 'Салати',
    icon: '🥗',
    description: 'Хрусткі свіжі овочі, авторські соуси та заправки',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'appetizer',
    name: 'Закуски',
    icon: '🥪',
    description: 'Брускети, канапки, паштети та легкі закуски',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'meat',
    name: 'М\'ясо',
    icon: '🥩',
    description: 'Соковиті стейки, запечена птиця та ніжне м\'ясо',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'fish',
    name: 'Риба',
    icon: '🐟',
    description: 'Запечений лосось, дорадо, креветки та морепродукти',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'baking',
    name: 'Випічка',
    icon: '🥐',
    description: 'Домашній хліб, пироги, печиво та булочки',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dessert',
    name: 'Десерти',
    icon: '🍰',
    description: 'Ніжні торти, тірамісу, чізкейки та муси',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'drink',
    name: 'Напої',
    icon: '🍹',
    description: 'Освіжаючі лимонади, коктейлі, чай та смузі',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'quick',
    name: 'Швидкі рецепти',
    icon: '⚡',
    description: 'Готові страви за 15-20 хвилин з мінімумом посуду',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'healthy',
    name: 'Здорове харчування',
    icon: '🥑',
    description: 'Збалансований раціон, суперфуди та корисні страви',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'vegetarian',
    name: 'Вегетаріанські',
    icon: '🌱',
    description: 'Смачні страви без м\'яса та риби',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  }
];

export interface CuisineMeta {
  id: CuisineType;
  name: string;
  flag: string;
}

export const CUISINES: CuisineMeta[] = [
  { id: 'ukrainian', name: 'Українська', flag: '🇺🇦' },
  { id: 'italian', name: 'Італійська', flag: '🇮🇹' },
  { id: 'french', name: 'Французька', flag: '🇫🇷' },
  { id: 'asian', name: 'Азійська', flag: '🥢' },
  { id: 'american', name: 'Американська', flag: '🇺🇸' },
  { id: 'mexican', name: 'Мексиканська', flag: '🇲🇽' },
  { id: 'georgian', name: 'Грузинська', flag: '🇬🇪' },
  { id: 'mediterranean', name: 'Середземноморська', flag: '🫒' },
  { id: 'other', name: 'Інша', flag: '🌍' }
];

// Default pantry staples that are assumed to be in every kitchen (multilingual)
export const DEFAULT_STAPLES: string[] = [
  // Ukrainian
  'вода', 'сіль', 'чорний перець', 'перець', 'рослинна олія', 'олія', 'соняшникова олія', 'цукор',
  // English
  'water', 'salt', 'black pepper', 'pepper', 'cooking oil', 'vegetable oil', 'sunflower oil', 'oil', 'sugar',
  // German
  'wasser', 'salz', 'schwarzer pfeffer', 'pfeffer', 'pflanzenöl', 'öl', 'speiseöl', 'zucker',
  // Chinese
  '水', '盐', '食用盐', '黑胡椒', '胡椒', '食用油', '植物油', '油', '白糖', '糖'
];

