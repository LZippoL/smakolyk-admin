export type Difficulty = 'easy' | 'medium' | 'hard';

export type RecipeCategory = 
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'soup'
  | 'salad'
  | 'appetizer'
  | 'meat'
  | 'fish'
  | 'baking'
  | 'dessert'
  | 'drink'
  | 'quick'
  | 'healthy'
  | 'vegetarian';

export type CuisineType =
  | 'ukrainian'
  | 'italian'
  | 'french'
  | 'asian'
  | 'american'
  | 'mexican'
  | 'georgian'
  | 'mediterranean'
  | 'other';

export interface NutritionInfo {
  calories?: number;
  protein: number; // in grams
  fat: number;     // in grams
  carbs: number;   // in grams
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  notes?: string;
  isStaple?: boolean;
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  timerMinutes?: number;
  tip?: string;
  image?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: RecipeCategory;
  cuisine: CuisineType;
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  servings: number;
  difficulty: Difficulty;
  calories: number;
  nutrition?: NutritionInfo;
  tags: string[];
  dietary?: {
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
    lactoseFree?: boolean;
  };
  ingredients: RecipeIngredient[];
  instructions: CookingStep[];
  rating: number;
  reviewsCount: number;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  quick20?: boolean;
  budget?: boolean;
  season?: 'spring' | 'summer' | 'autumn' | 'winter' | 'all';
  seoTitle?: string;
  seoDescription?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // HTML or Markdown
  image: string;
  category: string;
  readTime: number; // minutes
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  createdAt: string;
  tags: string[];
  relatedRecipeSlugs?: string[];
}

export interface Review {
  id: string;
  recipeId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  photoUrl?: string;
  likes: number;
}

export interface UserCollection {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  recipeIds: string[];
  createdAt: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  amount: string;
  category?: string;
  completed: boolean;
  recipeTitle?: string;
  recipeId?: string;
  createdAt: string;
}

export interface IngredientMatchResult {
  recipe: Recipe;
  matchScore: number; // 0 to 1
  matchedIngredients: string[];
  missingIngredients: string[];
  matchType: 'ready_now' | 'almost_ready' | 'partial';
  totalNonStapleCount: number;
}

export interface FilterState {
  query: string;
  category: string;
  cuisine: string;
  maxTime: number | null;
  difficulty: string;
  dietary: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    lactoseFree: boolean;
  };
  sortBy: 'popularity' | 'rating' | 'newest' | 'cookTime' | 'match';
}
