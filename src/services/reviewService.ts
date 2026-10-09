import { Review } from '../types';
import { supabase } from './supabaseClient';

function mapDbToReview(row: any): Review {
  return { id: row.id, recipeId: row.recipe_id, userName: row.user_name, rating: row.rating,
    comment: row.comment, photoUrl: row.photo_url || undefined, likes: row.likes || 0, createdAt: row.created_at };
}
class ReviewService {
  async getAll(): Promise<Review[]> {
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (error) throw new Error('Не вдалося завантажити відгуки');
    return (data || []).filter(r => !r.user_name?.startsWith('[DELETED]')).map(mapDbToReview);
  }
  async getByRecipeId(recipeId: string): Promise<Review[]> {
    const { data, error } = await supabase.from('reviews').select('*').eq('recipe_id', recipeId).order('created_at', { ascending: false });
    if (error) throw new Error('Не вдалося завантажити відгуки');
    return (data || []).filter(r => !r.user_name?.startsWith('[DELETED]')).map(mapDbToReview);
  }
  async addReview(review: Omit<Review, 'id' | 'createdAt' | 'likes'>): Promise<Review> {
    const { data, error } = await supabase.from('reviews').insert({ recipe_id: review.recipeId,
      user_name: review.userName, rating: review.rating, comment: review.comment, photo_url: review.photoUrl || null }).select().single();
    if (error) throw new Error('Не вдалося опублікувати відгук. Перевірте вхід та обмеження акаунта.');
    return mapDbToReview(data);
  }
  async updateReview(id: string, updates: Partial<Pick<Review, 'userName' | 'rating' | 'comment' | 'photoUrl'>>): Promise<Review> {
    const fields: Record<string, unknown> = {};
    if (updates.userName !== undefined) fields.user_name = updates.userName;
    if (updates.rating !== undefined) fields.rating = updates.rating;
    if (updates.comment !== undefined) fields.comment = updates.comment;
    if (updates.photoUrl !== undefined) fields.photo_url = updates.photoUrl || null;
    const { data, error } = await supabase.from('reviews').update(fields).eq('id', id).select().single();
    if (error) throw new Error('Не вдалося змінити відгук: перевірте права доступу');
    return mapDbToReview(data);
  }
  async deleteReview(id: string): Promise<boolean> {
    const { data, error } = await supabase.from('reviews').delete().eq('id', id).select('id');
    if (error || !data?.length) throw new Error('Не вдалося видалити відгук: перевірте права доступу');
    return true;
  }
  async likeReview(id: string): Promise<number> {
    const { data, error } = await supabase.rpc('toggle_review_like', { target: id });
    if (error) throw new Error('Увійдіть з активним акаунтом, щоб оцінити відгук');
    return Number(data);
  }
}
export const reviewService = new ReviewService();
