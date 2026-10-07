import { Article } from '../types';
import { INITIAL_ARTICLES } from '../data/articles/initialArticles';
import { storage } from './storageService';

const STORAGE_KEY = 'smakolyk_articles_custom';
const DELETED_KEY = 'smakolyk_articles_deleted';

export interface IArticleService {
  getAll(): Promise<Article[]>;
  getBySlug(slug: string): Promise<Article | null>;
  getById(id: string): Promise<Article | null>;
  create(article: Omit<Article, 'id' | 'createdAt'>): Promise<Article>;
  update(id: string, updates: Partial<Article>): Promise<Article>;
  delete(id: string): Promise<boolean>;
}

class ArticleService implements IArticleService {
  async getAll(): Promise<Article[]> {
    const customArticles = await storage.get<Article[]>(STORAGE_KEY, []);
    const deletedIds = await storage.get<string[]>(DELETED_KEY, []);

    const activeInitial = INITIAL_ARTICLES.filter(a => !deletedIds.includes(a.id));
    const customMap = new Map(customArticles.map(a => [a.id, a]));
    const result: Article[] = [];

    for (const a of activeInitial) {
      if (customMap.has(a.id)) {
        result.push(customMap.get(a.id)!);
        customMap.delete(a.id);
      } else {
        result.push(a);
      }
    }

    for (const custom of customMap.values()) {
      result.unshift(custom);
    }

    return result;
  }

  async getBySlug(slug: string): Promise<Article | null> {
    const all = await this.getAll();
    return all.find(a => a.slug === slug) || null;
  }

  async getById(id: string): Promise<Article | null> {
    const all = await this.getAll();
    return all.find(a => a.id === id) || null;
  }

  async create(data: Omit<Article, 'id' | 'createdAt'>): Promise<Article> {
    const customArticles = await storage.get<Article[]>(STORAGE_KEY, []);
    const newArticle: Article = {
      ...data,
      id: `art-custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    };

    customArticles.unshift(newArticle);
    await storage.set(STORAGE_KEY, customArticles);
    return newArticle;
  }

  async update(id: string, updates: Partial<Article>): Promise<Article> {
    const all = await this.getAll();
    const existing = all.find(a => a.id === id);
    if (!existing) throw new Error(`Article ${id} not found`);

    const updated: Article = { ...existing, ...updates };
    const customArticles = await storage.get<Article[]>(STORAGE_KEY, []);
    const filtered = customArticles.filter(a => a.id !== id);
    filtered.unshift(updated);
    await storage.set(STORAGE_KEY, filtered);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const customArticles = await storage.get<Article[]>(STORAGE_KEY, []);
    const filtered = customArticles.filter(a => a.id !== id);
    await storage.set(STORAGE_KEY, filtered);

    if (INITIAL_ARTICLES.some(a => a.id === id)) {
      const deletedIds = await storage.get<string[]>(DELETED_KEY, []);
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        await storage.set(DELETED_KEY, deletedIds);
      }
    }
    return true;
  }
}

export const articleService = new ArticleService();
