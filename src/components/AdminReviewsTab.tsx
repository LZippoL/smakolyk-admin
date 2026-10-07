import React, { useState } from 'react';
import { Star, Trash2, Edit3, MessageSquare, Search } from 'lucide-react';
import { Review, Recipe } from '../types';
import { reviewService } from '../services/reviewService';
import { Button } from './Button';
import { Modal } from './Modal';
import { RatingStars } from './RatingStars';
import { ImageUpload } from './ImageUpload';

interface AdminReviewsTabProps {
  reviews: Review[];
  recipes: Recipe[];
  onReviewsChanged: () => void;
}

export const AdminReviewsTab: React.FC<AdminReviewsTabProps> = ({
  reviews,
  recipes,
  onReviewsChanged
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);



  const recipeTitleMap = new Map(recipes.map(r => [r.id, r.title]));

  const filteredReviews = reviews.filter(r => {
    const q = searchQuery.toLowerCase();
    const recipeTitle = recipeTitleMap.get(r.recipeId) || '';
    return (
      r.userName.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q) ||
      recipeTitle.toLowerCase().includes(q)
    );
  });

  const handleOpenEdit = (review: Review) => {
    setEditingReview(review);
    setEditUserName(review.userName);
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditPhotoUrl(review.photoUrl || '');
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    setIsSaving(true);
    try {
      await reviewService.updateReview(editingReview.id, {
        userName: editUserName.trim(),
        rating: editRating,
        comment: editComment.trim(),
        photoUrl: editPhotoUrl.trim() || undefined
      });
      alert('✓ Відгук оновлено в базі Supabase!');
      setEditingReview(null);
      onReviewsChanged();
    } catch (err: any) {
      alert(err?.message || 'Не вдалося оновити відгук');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (reviewId: string, userName: string) => {
    if (window.confirm(`Видалити відгук користувача "${userName}"?`)) {
      try {
        await reviewService.deleteReview(reviewId);
        alert('✓ Відгук видалено з бази даних');
        onReviewsChanged();
      } catch (err: any) {
        alert(err?.message || 'Не вдалося видалити відгук');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук за автором, текстом або стравою..."
          className="w-full h-10 pl-9 pr-4 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
        />
      </div>

      {/* Reviews Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 font-bold">
              <tr>
                <th className="p-4">Користувач & Рецепт</th>
                <th className="p-4">Оцінка</th>
                <th className="p-4">Коментар</th>
                <th className="p-4 hidden md:table-cell">Фото</th>
                <th className="p-4 hidden sm:table-cell">Дата</th>
                <th className="p-4 text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filteredReviews.length > 0 ? (
                filteredReviews.map(rev => {
                  const recipeTitle = recipeTitleMap.get(rev.recipeId) || 'Рецепт';
                  return (
                    <tr key={rev.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors">
                      <td className="p-4 min-w-[160px]">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {rev.userName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-stone-900 dark:text-stone-100 truncate">
                              {rev.userName}
                            </p>
                            <p className="text-[11px] text-brand-600 dark:text-brand-400 truncate max-w-[140px]">
                              {recipeTitle}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>{rev.rating}</span>
                        </div>
                      </td>

                      <td className="p-4 max-w-xs sm:max-w-md">
                        <p className="text-stone-700 dark:text-stone-300 line-clamp-2 text-xs">
                          {rev.comment}
                        </p>
                      </td>

                      <td className="p-4 hidden md:table-cell">
                        {rev.photoUrl ? (
                          <img
                            src={rev.photoUrl}
                            alt="Фото відгуку"
                            className="w-10 h-10 rounded-xl object-cover border border-stone-200 dark:border-stone-700"
                          />
                        ) : (
                          <span className="text-stone-400 text-xs">—</span>
                        )}
                      </td>

                      <td className="p-4 hidden sm:table-cell text-stone-500 text-xs whitespace-nowrap">
                        {new Date(rev.createdAt).toLocaleDateString('uk-UA', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(rev)}
                            className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-brand-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                            title="Редагувати"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(rev.id, rev.userName)}
                            className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Видалити"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-stone-500 text-sm">
                    <MessageSquare className="w-8 h-8 text-stone-300 dark:text-stone-700 mx-auto mb-2" />
                    Відгуків не знайдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Review Modal */}
      <Modal
        isOpen={Boolean(editingReview)}
        onClose={() => setEditingReview(null)}
        title="Редагування відгуку"
        description="Змініть текст, оцінку або прикріплене фото"
      >
        {editingReview && (
          <form onSubmit={handleSaveEdit} className="space-y-4 pt-2">
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-500 mb-2">
                Оцінка
              </span>
              <RatingStars
                rating={editRating}
                size="lg"
                interactive
                onChange={setEditRating}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Ім'я автора
              </label>
              <input
                type="text"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
                required
                className="w-full h-11 px-4 text-sm bg-white dark:bg-stone-900 border rounded-2xl border-stone-300 dark:border-stone-700 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">
                Текст відгуку
              </label>
              <textarea
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                rows={4}
                required
                className="w-full p-3 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl outline-none"
              />
            </div>

            <ImageUpload
              label="Фото відгуку"
              value={editPhotoUrl}
              onChange={setEditPhotoUrl}
              folder="reviews"
            />

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditingReview(null)}
                className="flex-1"
              >
                Скасувати
              </Button>
              <Button
                type="submit"
                isLoading={isSaving}
                className="flex-1 bg-brand-600 hover:bg-brand-500 font-bold"
              >
                Зберегти
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
