import React, { useState } from 'react';
import { Article } from '../types';
import { Button } from './Button';
import { Input } from './Input';
import { RichTextEditor } from './editor/RichTextEditor';

interface AdminArticleFormProps {
  initialArticle?: Partial<Article>;
  onSubmit: (articleData: Omit<Article, 'id' | 'createdAt'>) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

export const AdminArticleForm: React.FC<AdminArticleFormProps> = ({
  initialArticle,
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [title, setTitle] = useState(initialArticle?.title || '');
  const [slug, setSlug] = useState(initialArticle?.slug || '');
  const [autoSlug, setAutoSlug] = useState(!initialArticle?.slug);
  const [summary, setSummary] = useState(initialArticle?.summary || '');
  const [content, setContent] = useState(initialArticle?.content || '<h2>Вступ</h2>\n<p>Текст статті...</p>');
  const [category, setCategory] = useState(initialArticle?.category || 'Техніки приготування');
  const [image, setImage] = useState(initialArticle?.image || 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=1000&q=80');
  const [readTime, setReadTime] = useState(initialArticle?.readTime || 5);
  const [tagsInput, setTagsInput] = useState(initialArticle?.tags?.join(', ') || 'кулінарія, поради');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateSlug = (text: string) => {
    const cyrToLatMap: Record<string, string> = {
      а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ye', ж: 'zh',
      з: 'z', и: 'y', і: 'i', ї: 'yi', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
      о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
      ч: 'ch', ш: 'sh', щ: 'shch', ь: '', ю: 'yu', я: 'ya'
    };
    return text
      .toLowerCase()
      .split('')
      .map(char => cyrToLatMap[char] || char)
      .join('')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) {
      setSlug(generateSlug(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;

    setIsSubmitting(true);
    try {
      const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      await onSubmit({
        title: title.trim(),
        slug: slug.trim(),
        summary: summary.trim(),
        content: content.trim(),
        category,
        image: image.trim(),
        readTime: Number(readTime),
        tags: parsedTags,
        author: initialArticle?.author || { name: 'Шеф-редактор', role: 'Кулінарний експерт' }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
          {isEditing ? 'Редагувати статтю' : 'Написати нову статтю'}
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          Створюйте цікаві кулінарні посібники, огляди та поради з форматуванням тексту і фотографіями.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Заголовок статті"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Наприклад: Як правильно варити рис"
            required
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                URL-ідентифікатор (Slug)
              </label>
              <button
                type="button"
                onClick={() => setAutoSlug(!autoSlug)}
                className="text-[11px] text-brand-600 hover:underline"
              >
                {autoSlug ? 'Вручну' : 'Автоматично'}
              </button>
            </div>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setAutoSlug(false);
                setSlug(e.target.value);
              }}
              placeholder="how-to-cook-rice"
              required
              className="w-full h-11 px-4 text-sm bg-white dark:bg-stone-900 border rounded-2xl border-stone-300 dark:border-stone-700 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Категорія статті"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Техніки приготування / Поради"
            required
          />
          <Input
            label="Час читання (хв)"
            type="number"
            min="1"
            value={readTime}
            onChange={(e) => setReadTime(Number(e.target.value))}
            required
          />
        </div>

        <Input
          label="Посилання на головне фото (URL)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          required
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            Короткий анонс статті (summary)
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            placeholder="Одне-два речення про головну ідею статті для списку та соцмереж..."
            required
            className="w-full p-3 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl outline-none focus:border-brand-500"
          />
        </div>

        <Input
          label="Теги (через кому)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="рис, лайфхаки, базові техніки"
        />

        {/* Rich Text Editor */}
        <RichTextEditor
          label="Основний текст статті"
          value={content}
          onChange={setContent}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Скасувати
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="px-8"
        >
          {isEditing ? 'Зберегти статтю' : 'Опублікувати статтю'}
        </Button>
      </div>
    </form>
  );
};
