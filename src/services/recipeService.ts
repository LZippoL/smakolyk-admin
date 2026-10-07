import { Recipe } from '../types';
import { INITIAL_RECIPES } from '../data/recipes/initialRecipes';
import { storage } from './storageService';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY = 'smakolyk_recipes_custom';
const DELETED_KEY = 'smakolyk_recipes_deleted';

export interface IRecipeService {
  getAll(): Promise<Recipe[]>;
  getBySlug(slug: string): Promise<Recipe | null>;
  getById(id: string): Promise<Recipe | null>;
  getFeatured(): Promise<Recipe[]>;
  getQuick20(): Promise<Recipe[]>;
  getTopRated(): Promise<Recipe[]>;
  getBudget(): Promise<Recipe[]>;
  create(recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewsCount'>): Promise<Recipe>;
  update(id: string, updates: Partial<Recipe>): Promise<Recipe>;
  delete(id: string): Promise<boolean>;
  resetToDefault(): Promise<void>;
  exportAsJson(): Promise<string>;
  importFromJson(jsonStr: string): Promise<number>;
}

// Convert database snake_case to frontend Recipe camelCase
function mapDbToRecipe(row: any): Recipe {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    cuisine: row.cuisine,
    difficulty: row.difficulty,
    prepTime: row.prep_time ?? row.prepTime,
    cookTime: row.cook_time ?? row.cookTime,
    totalTime: row.total_time ?? row.totalTime,
    servings: row.servings,
    calories: row.calories,
    image: row.image,
    rating: row.rating !== undefined && row.rating !== null ? Number(row.rating) : 0,
    reviewsCount: row.reviews_count ?? row.reviewsCount ?? 0,
    dietary: row.dietary || {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      isLowCarb: false
    },
    ingredients: row.ingredients || [],
    instructions: row.instructions || [],
    tags: row.tags || [],
    author: row.author || { name: 'Шеф Смаколик' },
    nutrition: row.nutrition || undefined,
    featured: row.featured,
    budget: row.budget,
    quick20: row.quick20,
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt
  };
}

class RecipeService implements IRecipeService {
  private cache: Recipe[] | null = null;
  private lastFetchTime = 0;
  private readonly CACHE_TTL_MS = 60_000; // 1 minute cache in-memory

  async getAll(): Promise<Recipe[]> {
    if (this.cache && Date.now() - this.lastFetchTime < this.CACHE_TTL_MS) {
      return this.cache;
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map(mapDbToRecipe);
          this.cache = mapped;
          this.lastFetchTime = Date.now();
          return mapped;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local data:', err);
      }
    }

    // Fallback to local storage / initial dataset
    const customRecipes = await storage.get<Recipe[]>(STORAGE_KEY, []);
    const deletedIds = await storage.get<string[]>(DELETED_KEY, []);

    const activeInitial = INITIAL_RECIPES.filter(r => !deletedIds.includes(r.id));
    const customMap = new Map(customRecipes.map(r => [r.id, r]));
    const result: Recipe[] = [];

    for (const r of activeInitial) {
      if (customMap.has(r.id)) {
        result.push(customMap.get(r.id)!);
        customMap.delete(r.id);
      } else {
        result.push(r);
      }
    }

    for (const custom of customMap.values()) {
      result.unshift(custom);
    }

    this.cache = result;
    this.lastFetchTime = Date.now();
    return result;
  }

  async getBySlug(slug: string): Promise<Recipe | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (!error && data) {
          return mapDbToRecipe(data);
        }
      } catch (err) {
        console.warn('Supabase fetch by slug failed:', err);
      }
    }

    const all = await this.getAll();
    return all.find(r => r.slug === slug) || null;
  }

  async getById(id: string): Promise<Recipe | null> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!error && data) {
          return mapDbToRecipe(data);
        }
      } catch (err) {
        console.warn('Supabase fetch by id failed:', err);
      }
    }

    const all = await this.getAll();
    return all.find(r => r.id === id) || null;
  }

  async getFeatured(): Promise<Recipe[]> {
    const all = await this.getAll();
    return all.filter(r => r.featured);
  }

  async getQuick20(): Promise<Recipe[]> {
    const all = await this.getAll();
    return all.filter(r => r.totalTime <= 20 || r.quick20);
  }

  async getTopRated(): Promise<Recipe[]> {
    const all = await this.getAll();
    return [...all].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }

  async getBudget(): Promise<Recipe[]> {
    const all = await this.getAll();
    return all.filter(r => r.budget);
  }

  async create(recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewsCount'>): Promise<Recipe> {
    const now = new Date().toISOString();
    const id = `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newRecipe: Recipe = {
      ...recipeData,
      id,
      createdAt: now,
      updatedAt: now,
      rating: 5.0,
      reviewsCount: 0
    };

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('recipes').insert({
          id: newRecipe.id,
          slug: newRecipe.slug,
          title: newRecipe.title,
          description: newRecipe.description,
          category: newRecipe.category,
          cuisine: newRecipe.cuisine,
          difficulty: newRecipe.difficulty,
          prep_time: newRecipe.prepTime,
          cook_time: newRecipe.cookTime,
          total_time: newRecipe.totalTime,
          servings: newRecipe.servings,
          calories: newRecipe.calories,
          image: newRecipe.image,
          rating: newRecipe.rating,
          reviews_count: newRecipe.reviewsCount,
          dietary: newRecipe.dietary,
          ingredients: newRecipe.ingredients,
          instructions: newRecipe.instructions,
          tags: newRecipe.tags,
          author: newRecipe.author,
          nutrition: newRecipe.nutrition || null,
          created_at: newRecipe.createdAt,
          updated_at: newRecipe.updatedAt
        });

        if (!error) {
          this.cache = null; // Invalidate cache
          return newRecipe;
        }
      } catch (err) {
        console.warn('Supabase create failed, saving to local storage:', err);
      }
    }

    // Local fallback
    const customRecipes = await storage.get<Recipe[]>(STORAGE_KEY, []);
    customRecipes.unshift(newRecipe);
    await storage.set(STORAGE_KEY, customRecipes);
    this.cache = null;
    return newRecipe;
  }

  async update(id: string, updates: Partial<Recipe>): Promise<Recipe> {
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error(`Recipe with ID ${id} not found`);
    }

    const updatedRecipe: Recipe = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        const dbUpdates: any = {
          updated_at: updatedRecipe.updatedAt
        };
        if (updates.title !== undefined) dbUpdates.title = updates.title;
        if (updates.description !== undefined) dbUpdates.description = updates.description;
        if (updates.category !== undefined) dbUpdates.category = updates.category;
        if (updates.cuisine !== undefined) dbUpdates.cuisine = updates.cuisine;
        if (updates.difficulty !== undefined) dbUpdates.difficulty = updates.difficulty;
        if (updates.prepTime !== undefined) dbUpdates.prep_time = updates.prepTime;
        if (updates.cookTime !== undefined) dbUpdates.cook_time = updates.cookTime;
        if (updates.totalTime !== undefined) dbUpdates.total_time = updates.totalTime;
        if (updates.servings !== undefined) dbUpdates.servings = updates.servings;
        if (updates.calories !== undefined) dbUpdates.calories = updates.calories;
        if (updates.image !== undefined) dbUpdates.image = updates.image;
        if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
        if (updates.reviewsCount !== undefined) dbUpdates.reviews_count = updates.reviewsCount;
        if (updates.dietary !== undefined) dbUpdates.dietary = updates.dietary;
        if (updates.ingredients !== undefined) dbUpdates.ingredients = updates.ingredients;
        if (updates.instructions !== undefined) dbUpdates.instructions = updates.instructions;
        if (updates.tags !== undefined) dbUpdates.tags = updates.tags;

        const { error } = await supabase
          .from('recipes')
          .update(dbUpdates)
          .eq('id', id);

        if (!error) {
          this.cache = null;
          return updatedRecipe;
        }
      } catch (err) {
        console.warn('Supabase update failed:', err);
      }
    }

    // Local fallback
    const customRecipes = await storage.get<Recipe[]>(STORAGE_KEY, []);
    const filtered = customRecipes.filter(r => r.id !== id);
    filtered.unshift(updatedRecipe);
    await storage.set(STORAGE_KEY, filtered);
    this.cache = null;

    return updatedRecipe;
  }

  async delete(id: string): Promise<boolean> {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('recipes').delete().eq('id', id);
        if (!error) {
          this.cache = null;
          return true;
        }
      } catch (err) {
        console.warn('Supabase delete failed:', err);
      }
    }

    const customRecipes = await storage.get<Recipe[]>(STORAGE_KEY, []);
    const filtered = customRecipes.filter(r => r.id !== id);
    await storage.set(STORAGE_KEY, filtered);

    if (INITIAL_RECIPES.some(r => r.id === id)) {
      const deletedIds = await storage.get<string[]>(DELETED_KEY, []);
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        await storage.set(DELETED_KEY, deletedIds);
      }
    }

    this.cache = null;
    return true;
  }

  async resetToDefault(): Promise<void> {
    this.cache = null;
    await storage.remove(STORAGE_KEY);
    await storage.remove(DELETED_KEY);
  }

  async exportAsJson(): Promise<string> {
    const all = await this.getAll();
    return JSON.stringify(all, null, 2);
  }

  async importFromJson(jsonStr: string): Promise<number> {
    const parsed = JSON.parse(jsonStr) as Recipe[];
    if (!Array.isArray(parsed)) throw new Error('Invalid recipe JSON structure');
    await storage.set(STORAGE_KEY, parsed);
    this.cache = null;
    return parsed.length;
  }
}

export const recipeService = new RecipeService();
