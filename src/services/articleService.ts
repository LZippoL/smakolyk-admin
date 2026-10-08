import { Article } from '../types';
import { INITIAL_ARTICLES } from '../data/articles/initialArticles';
import { storage } from './storageService';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY = 'smakolyk_articles_custom';
const DELETED_KEY = 'smakolyk_articles_deleted';
// The public site excludes drafts; the admin service sets this to true.
const INCLUDE_DRAFTS = true;

type ArticleRow = Article & { read_time: number; created_at: string; related_recipe_slugs?: string[]; is_deleted?: boolean };
function fromDb(row: ArticleRow): Article {
  return {
    id: row.id, slug: row.slug, title: row.title, summary: row.summary, content: row.content,
    image: row.image, category: row.category, readTime: row.read_time,
    author: row.author, tags: row.tags || [], createdAt: row.created_at,
    relatedRecipeSlugs: row.related_recipe_slugs || [],
    status: row.status || 'published', isDraft: row.status === 'draft'
  };
}
function toDb(article: Article, deleted = false) {
  return {
    id: article.id, slug: article.slug, title: article.title, summary: article.summary,
    content: article.content, image: article.image, category: article.category,
    read_time: article.readTime, author: article.author, tags: article.tags,
    related_recipe_slugs: article.relatedRecipeSlugs || [], created_at: article.createdAt,
    updated_at: new Date().toISOString(), is_deleted: deleted,
    status: deleted ? 'published' : (article.status || (article.isDraft ? 'draft' : 'published'))
  };
}

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
    const custom = await storage.get<Article[]>(STORAGE_KEY, []);
    const deletedIds = await storage.get<string[]>(DELETED_KEY, []);
    const merged = new Map(INITIAL_ARTICLES.filter(a => !deletedIds.includes(a.id)).map(a => [a.id, a]));
    for (const article of custom) merged.set(article.id, article);
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
      if (error) {
        console.warn('Articles database unavailable; showing existing local content:', error.code);
      } else {
        const rows = (data || []) as ArticleRow[];
        // A remote record is authoritative over a local/seed record with the same ID or slug.
        const remoteIds = new Set(rows.map(row => row.id));
        const remoteSlugs = new Set(rows.map(row => row.slug));
        for (const [id, article] of merged) {
          if (remoteIds.has(id) || remoteSlugs.has(article.slug)) merged.delete(id);
        }
        for (const row of rows) {
          if (!row.is_deleted) merged.set(row.id, fromDb(row));
        }
      }
    }
    return [...merged.values()]
      .filter(article => INCLUDE_DRAFTS || !(article.isDraft || article.status === 'draft'))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  async getBySlug(slug: string): Promise<Article | null> {
    return (await this.getAll()).find(article => article.slug === slug) || null;
  }
  async getById(id: string): Promise<Article | null> {
    return (await this.getAll()).find(article => article.id === id) || null;
  }
  private async save(article: Article, mode: 'insert' | 'update', deleted = false): Promise<void> {
    if (!isSupabaseConfigured) throw new Error('Для публікації статей налаштуйте Supabase.');
    const row = toDb(article, deleted);
    // Upsert also allows editing/importing a built-in article into the shared database.
    const { error } = mode === 'insert'
      ? await supabase.from('articles').insert(row)
      : await supabase.from('articles').upsert(row, { onConflict: 'id' });
    if (error) throw new Error(`Не вдалося зберегти статтю (${error.code}). Перевірте міграцію articles та права content_editors.`);
    // Remove obsolete local copies only after the database write succeeded.
    const custom = await storage.get<Article[]>(STORAGE_KEY, []);
    await storage.set(STORAGE_KEY, custom.filter(a => a.id !== article.id && a.slug !== article.slug));
  }
  async create(data: Omit<Article, 'id' | 'createdAt'>): Promise<Article> {
    const status = data.status || (data.isDraft ? 'draft' : 'published');
    const article: Article = { ...data, status, isDraft: status === 'draft', id: `art-custom-${crypto.randomUUID()}`, createdAt: new Date().toISOString() };
    await this.save(article, 'insert');
    return article;
  }
  async update(id: string, updates: Partial<Article>): Promise<Article> {
    const existing = await this.getById(id);
    if (!existing) throw new Error(`Article ${id} not found`);
    const status = updates.status ?? (updates.isDraft !== undefined ? (updates.isDraft ? 'draft' : 'published') : existing.status || 'published');
    const article: Article = { ...existing, ...updates, id: existing.id, createdAt: existing.createdAt, status, isDraft: status === 'draft' };
    await this.save(article, 'update');
    return article;
  }
  async delete(id: string): Promise<boolean> {
    const article = await this.getById(id);
    if (!article) throw new Error(`Article ${id} not found`);
    await this.save(article, 'update', true);
    return true;
  }
}
export const articleService = new ArticleService();

