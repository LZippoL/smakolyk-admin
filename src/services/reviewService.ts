import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data/reviews/initialReviews';
import { storage } from './storageService';
import { recipeService } from './recipeService';
import { supabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY = 'smakolyk_reviews_custom';
const DELETED_KEY = 'smakolyk_reviews_deleted';

export interface IReviewService {
  getAll(): Promise<Review[]>;
  getByRecipeId(recipeId: string): Promise<Review[]>;
  addReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'likes'>): Promise<Review>;
  updateReview(reviewId: string, updates: Partial<Pick<Review, 'userName' | 'rating' | 'comment' | 'photoUrl'>>): Promise<Review>;
  deleteReview(reviewId: string): Promise<boolean>;
  likeReview(reviewId: string): Promise<number>;
}

function mapDbToReview(row: any): Review {
  return {
    id: row.id,
    recipeId: row.recipe_id,
    userName: row.user_name,
    rating: row.rating,
    comment: row.comment,
    photoUrl: row.photo_url || undefined,
    likes: row.likes || 0,
    createdAt: row.created_at
  };
}

class ReviewService implements IReviewService {
  async getAll(): Promise<Review[]> {
    const deletedIds = await storage.get<string[]>(DELETED_KEY, []);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          // Filter out any review marked as [DELETED] in DB or tracked locally in deletedIds
          return data
            .filter(r => !r.user_name?.startsWith('[DELETED]') && !deletedIds.includes(r.id))
            .map(mapDbToReview);
        }
      } catch (err) {
        console.warn('Supabase fetch reviews failed:', err);
      }
    }

    const custom = await storage.get<Review[]>(STORAGE_KEY, []);
    const activeInitial = INITIAL_REVIEWS.filter(r => !deletedIds.includes(r.id));
    return [...custom, ...activeInitial];
  }

  async getByRecipeId(recipeId: string): Promise<Review[]> {
    const deletedIds = await storage.get<string[]>(DELETED_KEY, []);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('recipe_id', recipeId)
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data
            .filter(r => !r.user_name?.startsWith('[DELETED]') && !deletedIds.includes(r.id))
            .map(mapDbToReview);
        }
      } catch (err) {
        console.warn('Supabase fetch reviews by recipe failed:', err);
      }
    }

    const all = await this.getAll();
    return all.filter(r => r.recipeId === recipeId);
  }

  async addReview(data: Omit<Review, 'id' | 'createdAt' | 'likes'>): Promise<Review> {
    if (isSupabaseConfigured) {
      try {
        const { data: inserted, error } = await supabase
          .from('reviews')
          .insert({
            recipe_id: data.recipeId,
            user_name: data.userName,
            rating: data.rating,
            comment: data.comment,
            photo_url: data.photoUrl || null,
            likes: 0
          })
          .select()
          .single();

        if (!error && inserted) {
          const newReview = mapDbToReview(inserted);

          // Update recipe average rating
          const recipeReviews = await this.getByRecipeId(data.recipeId);
          const totalScore = recipeReviews.reduce((acc, r) => acc + r.rating, 0);
          const newRating = Number((totalScore / recipeReviews.length).toFixed(1));
          await recipeService.update(data.recipeId, {
            rating: newRating,
            reviewsCount: recipeReviews.length
          });

          return newReview;
        }
      } catch (err) {
        console.warn('Supabase addReview failed, saving to local:', err);
      }
    }

    // Local fallback
    const custom = await storage.get<Review[]>(STORAGE_KEY, []);
    const newReview: Review = {
      ...data,
      id: `rev-custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      likes: 0
    };

    custom.unshift(newReview);
    await storage.set(STORAGE_KEY, custom);

    try {
      const allReviewsForRecipe = await this.getByRecipeId(data.recipeId);
      const totalScore = allReviewsForRecipe.reduce((acc, r) => acc + r.rating, 0);
      const newRating = Number((totalScore / allReviewsForRecipe.length).toFixed(1));
      await recipeService.update(data.recipeId, {
        rating: newRating,
        reviewsCount: allReviewsForRecipe.length
      });
    } catch (e) {
      console.warn('Could not update recipe rating after review:', e);
    }

    return newReview;
  }

  async updateReview(
    reviewId: string, 
    updates: Partial<Pick<Review, 'userName' | 'rating' | 'comment' | 'photoUrl'>>
  ): Promise<Review> {
    if (isSupabaseConfigured) {
      try {
        const dbUpdates: any = {};
        if (updates.userName !== undefined) dbUpdates.user_name = updates.userName;
        if (updates.rating !== undefined) dbUpdates.rating = updates.rating;
        if (updates.comment !== undefined) dbUpdates.comment = updates.comment;
        if (updates.photoUrl !== undefined) dbUpdates.photo_url = updates.photoUrl;

        const { data: updated, error } = await supabase
          .from('reviews')
          .update(dbUpdates)
          .eq('id', reviewId)
          .select()
          .single();

        if (!error && updated) {
          const result = mapDbToReview(updated);
          // Recalculate recipe average rating
          const recipeReviews = await this.getByRecipeId(result.recipeId);
          if (recipeReviews.length > 0) {
            const totalScore = recipeReviews.reduce((acc, r) => acc + r.rating, 0);
            const newRating = Number((totalScore / recipeReviews.length).toFixed(1));
            await recipeService.update(result.recipeId, {
              rating: newRating,
              reviewsCount: recipeReviews.length
            });
          }
          return result;
        }
      } catch (err) {
        console.warn('Supabase updateReview failed:', err);
      }
    }

    // Local fallback
    const custom = await storage.get<Review[]>(STORAGE_KEY, []);
    const idx = custom.findIndex(r => r.id === reviewId);
    if (idx !== -1) {
      const updated = { ...custom[idx], ...updates };
      custom[idx] = updated;
      await storage.set(STORAGE_KEY, custom);
      return updated;
    }
    throw new Error('Review not found');
  }

  async deleteReview(reviewId: string): Promise<boolean> {
    let recipeId: string | null = null;

    if (isSupabaseConfigured) {
      try {
        const { data: rev } = await supabase
          .from('reviews')
          .select('recipe_id, user_name')
          .eq('id', reviewId)
          .maybeSingle();

        if (rev) recipeId = rev.recipe_id;

        // Mark the review as deleted in Supabase (fully allowed by Supabase UPDATE RLS policy without secret key)
        const { error: updateError } = await supabase
          .from('reviews')
          .update({
            user_name: `[DELETED]_${Date.now()}`,
            comment: '[DELETED]'
          })
          .eq('id', reviewId);

        if (updateError) {
          console.warn('Supabase mark deleted error:', updateError);
        }

        // Also attempt standard delete just in case
        await supabase
          .from('reviews')
          .delete()
          .eq('id', reviewId);

        if (recipeId) {
          const remaining = await this.getByRecipeId(recipeId);
          const newRating = remaining.length > 0
            ? Number((remaining.reduce((acc, r) => acc + r.rating, 0) / remaining.length).toFixed(1))
            : 5.0;
          await recipeService.update(recipeId, {
            rating: newRating,
            reviewsCount: remaining.length
          });
        }

        // Track deleted ID in local storage to prevent initial fallback resurrection
        const deletedIds = await storage.get<string[]>(DELETED_KEY, []);
        if (!deletedIds.includes(reviewId)) {
          deletedIds.push(reviewId);
          await storage.set(DELETED_KEY, deletedIds);
        }

        const custom = await storage.get<Review[]>(STORAGE_KEY, []);
        const filtered = custom.filter(r => r.id !== reviewId);
        await storage.set(STORAGE_KEY, filtered);

        return true;
      } catch (err) {
        console.warn('Supabase deleteReview failed:', err);
      }
    }

    // Local fallback
    const custom = await storage.get<Review[]>(STORAGE_KEY, []);
    const filtered = custom.filter(r => r.id !== reviewId);
    await storage.set(STORAGE_KEY, filtered);

    const deletedIds = await storage.get<string[]>(DELETED_KEY, []);
    if (!deletedIds.includes(reviewId)) {
      deletedIds.push(reviewId);
      await storage.set(DELETED_KEY, deletedIds);
    }

    return true;
  }

  async likeReview(reviewId: string): Promise<number> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('likes')
          .eq('id', reviewId)
          .maybeSingle();

        if (!error && data) {
          const newLikes = (data.likes || 0) + 1;
          await supabase
            .from('reviews')
            .update({ likes: newLikes })
            .eq('id', reviewId);
          return newLikes;
        }
      } catch (err) {
        console.warn('Supabase likeReview failed:', err);
      }
    }

    const custom = await storage.get<Review[]>(STORAGE_KEY, []);
    const target = custom.find(r => r.id === reviewId);
    if (target) {
      target.likes += 1;
      await storage.set(STORAGE_KEY, custom);
      return target.likes;
    }
    const initial = INITIAL_REVIEWS.find(r => r.id === reviewId);
    if (initial) {
      initial.likes += 1;
      return initial.likes;
    }
    return 0;
  }
}

export const reviewService = new ReviewService();
