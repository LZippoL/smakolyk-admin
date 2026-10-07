import React, { useState } from 'react';
import { Plus, Trash2, Clock, Sparkles } from 'lucide-react';
import { Recipe, RecipeIngredient, CookingStep, RecipeCategory, CuisineType, Difficulty } from '../types';
import { CATEGORIES, CUISINES } from '../data/categories';
import { Button } from './Button';
import { Input } from './Input';
import { ImageUpload } from './ImageUpload';

interface AdminRecipeFormProps {
  initialRecipe?: Partial<Recipe>;
  onSubmit: (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewsCount'>) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

export const AdminRecipeForm: React.FC<AdminRecipeFormProps> = ({
  initialRecipe,
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [title, setTitle] = useState(initialRecipe?.title || '');
  const [slug, setSlug] = useState(initialRecipe?.slug || '');
  const [autoSlug, setAutoSlug] = useState(!initialRecipe?.slug);
  const [description, setDescription] = useState(initialRecipe?.description || '');
  const [image, setImage] = useState(initialRecipe?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80');
  const [category, setCategory] = useState<RecipeCategory>(initialRecipe?.category || 'lunch');
  const [cuisine, setCuisine] = useState<CuisineType>(initialRecipe?.cuisine || 'ukrainian');
  const [prepTime, setPrepTime] = useState<number>(initialRecipe?.prepTime || 15);
  const [cookTime, setCookTime] = useState<number>(initialRecipe?.cookTime || 25);
  const [servings, setServings] = useState<number>(initialRecipe?.servings || 4);
  const [difficulty, setDifficulty] = useState<Difficulty>(initialRecipe?.difficulty || 'easy');
  const [calories, setCalories] = useState<number>(initialRecipe?.calories || 320);
  const [tagsInput, setTagsInput] = useState(initialRecipe?.tags?.join(', ') || 'домашнє, смачно');

  // Nutrition
  const [protein, setProtein] = useState<number>(initialRecipe?.nutrition?.protein || 18);
  const [fat, setFat] = useState<number>(initialRecipe?.nutrition?.fat || 12);
  const [carbs, setCarbs] = useState<number>(initialRecipe?.nutrition?.carbs || 30);

  // SEO
  const [seoTitle, setSeoTitle] = useState(initialRecipe?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(initialRecipe?.seoDescription || '');

  // Ingredients builder
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(
    initialRecipe?.ingredients || [
      { id: '1', name: 'Куряче філе', amount: 400, unit: 'г' },
      { id: '2', name: 'Сіль', amount: 1, unit: 'ч. л.', isStaple: true }
    ]
  );

  // Steps builder
  const [instructions, setInstructions] = useState<CookingStep[]>(
    initialRecipe?.instructions || [
      { stepNumber: 1, title: 'Підготовка', instruction: 'Промийте продукти та наріжте однаковими шматочками.', timerMinutes: 5 }
    ]
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate slug from title (transliteration / slugify)
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

  // Ingredient helpers
  const addIngredientRow = () => {
    setIngredients(prev => [
      ...prev,
      { id: Date.now().toString(), name: '', amount: 100, unit: 'г' }
    ]);
  };

  const removeIngredientRow = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const updateIngredientRow = (index: number, field: keyof RecipeIngredient, value: string | number | boolean | undefined) => {
    setIngredients(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  // Step helpers
  const addStepRow = () => {
    setInstructions(prev => [
      ...prev,
      {
        stepNumber: prev.length + 1,
        title: `Крок ${prev.length + 1}`,
        instruction: '',
        timerMinutes: undefined
      }
    ]);
  };

  const removeStepRow = (index: number) => {
    setInstructions(prev =>
      prev
        .filter((_, i) => i !== index)
        .map((step, idx) => ({ ...step, stepNumber: idx + 1 }))
    );
  };

  const updateStepRow = (index: number, field: keyof CookingStep, value: string | number | undefined) => {
    setInstructions(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;

    setIsSubmitting(true);
    try {
      const validIngredients = ingredients.filter(i => i.name.trim().length > 0);
      const validInstructions = instructions.filter(s => s.instruction.trim().length > 0);

      const parsedTags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      await onSubmit({
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        image: image.trim(),
        category,
        cuisine,
        prepTime: Number(prepTime),
        cookTime: Number(cookTime),
        totalTime: Number(prepTime) + Number(cookTime),
        servings: Number(servings),
        difficulty,
        calories: Number(calories),
        nutrition: {
          protein: Number(protein),
          fat: Number(fat),
          carbs: Number(carbs),
          calories: Number(calories)
        },
        tags: parsedTags,
        ingredients: validIngredients,
        instructions: validInstructions,
        author: initialRecipe?.author || { name: 'Шеф-редактор', role: 'Автор рецепту' },
        seoTitle: seoTitle.trim() || `${title.trim()} — покроковий рецепт`,
        seoDescription: seoDescription.trim() || description.trim()
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
          {isEditing ? 'Редагувати рецепт' : 'Створити новий рецепт'}
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          Заповніть форму нижче. Зміни зберігаються у вашій бібліотеці без потреби редагувати код.
        </p>
      </div>

      {/* Main Details */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 border-b pb-2 border-stone-200 dark:border-stone-800">
          Основна інформація
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Назва страви"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Наприклад: Запечена курка з лимоном"
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
              placeholder="baked-lemon-chicken"
              required
              className="w-full h-11 px-4 text-sm bg-white dark:bg-stone-900 border rounded-2xl border-stone-300 dark:border-stone-700 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Категорія
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as RecipeCategory)}
              className="h-11 px-3 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl outline-none"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Cuisine */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Кухня світу
            </label>
            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value as CuisineType)}
              className="h-11 px-3 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl outline-none"
            >
              {CUISINES.map(c => (
                <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Складність
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="h-11 px-3 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl outline-none"
            >
              <option value="easy">Легко</option>
              <option value="medium">Середньо</option>
              <option value="hard">Складно</option>
            </select>
          </div>
        </div>

        <ImageUpload
          label="Головне фото страви"
          value={image}
          onChange={setImage}
          folder="recipes"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            Короткий опис страви
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Апетитний опис смаку та текстури страви..."
            required
            className="w-full p-3 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Metrics & Timing */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 border-b pb-2 border-stone-200 dark:border-stone-800">
          Час, порції та калорійність
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Input
            label="Підготовка (хв)"
            type="number"
            min="0"
            value={prepTime}
            onChange={(e) => setPrepTime(Number(e.target.value))}
            required
          />
          <Input
            label="Приготування (хв)"
            type="number"
            min="1"
            value={cookTime}
            onChange={(e) => setCookTime(Number(e.target.value))}
            required
          />
          <Input
            label="Кількість порцій"
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            required
          />
          <Input
            label="Калорії (ккал)"
            type="number"
            min="0"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            required
          />
        </div>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700">
          <Input
            label="Білки (г)"
            type="number"
            min="0"
            value={protein}
            onChange={(e) => setProtein(Number(e.target.value))}
          />
          <Input
            label="Жири (г)"
            type="number"
            min="0"
            value={fat}
            onChange={(e) => setFat(Number(e.target.value))}
          />
          <Input
            label="Вуглеводи (г)"
            type="number"
            min="0"
            value={carbs}
            onChange={(e) => setCarbs(Number(e.target.value))}
          />
        </div>

        <Input
          label="Теги (через кому)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="вечеря, швидко, курка, запечене"
        />
      </div>

      {/* Ingredients Builder */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2 border-stone-200 dark:border-stone-800">
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            Інгредієнти ({ingredients.length})
          </h3>
          <Button
            type="button"
            size="sm"
            onClick={addIngredientRow}
            variant="outline"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Додати продукт
          </Button>
        </div>

        <div className="space-y-2">
          {ingredients.map((ing, idx) => (
            <div key={ing.id || idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Назва (напр. Сметана)"
                value={ing.name}
                onChange={(e) => updateIngredientRow(idx, 'name', e.target.value)}
                className="flex-1 h-10 px-3 text-sm bg-white dark:bg-stone-900 border rounded-xl border-stone-300 dark:border-stone-700"
                required
              />
              <input
                type="number"
                placeholder="Кількість"
                value={ing.amount}
                onChange={(e) => updateIngredientRow(idx, 'amount', Number(e.target.value))}
                className="w-20 h-10 px-2 text-sm bg-white dark:bg-stone-900 border rounded-xl border-stone-300 dark:border-stone-700"
              />
              <input
                type="text"
                placeholder="Од. (г, мл, шт)"
                value={ing.unit}
                onChange={(e) => updateIngredientRow(idx, 'unit', e.target.value)}
                className="w-20 h-10 px-2 text-sm bg-white dark:bg-stone-900 border rounded-xl border-stone-300 dark:border-stone-700"
              />
              <button
                type="button"
                onClick={() => removeIngredientRow(idx)}
                className="p-2 text-stone-400 hover:text-rose-500 transition-colors"
                aria-label="Видалити інгредієнт"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Steps Builder */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2 border-stone-200 dark:border-stone-800">
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            Етапи приготування ({instructions.length})
          </h3>
          <Button
            type="button"
            size="sm"
            onClick={addStepRow}
            variant="outline"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Додати крок
          </Button>
        </div>

        <div className="space-y-4">
          {instructions.map((step, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-brand-500 text-white">
                  Крок {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeStepRow(idx)}
                  className="text-xs text-rose-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Видалити крок
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <Input
                    label="Заголовок кроку"
                    value={step.title}
                    onChange={(e) => updateStepRow(idx, 'title', e.target.value)}
                    placeholder="Наприклад: Обсмажування цибулі"
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Таймер (хв, необов'язково)"
                    type="number"
                    min="1"
                    icon={<Clock className="w-4 h-4" />}
                    value={step.timerMinutes || ''}
                    onChange={(e) => updateStepRow(idx, 'timerMinutes', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Інструкція кроку
                </label>
                <textarea
                  value={step.instruction}
                  onChange={(e) => updateStepRow(idx, 'instruction', e.target.value)}
                  rows={2}
                  placeholder="Детально опишіть, що потрібно зробити на цьому етапі..."
                  required
                  className="w-full p-2.5 text-sm bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl outline-none focus:border-brand-500"
                />
              </div>

              <Input
                label="Підказка від шефа (необов'язково)"
                icon={<Sparkles className="w-4 h-4" />}
                value={step.tip || ''}
                onChange={(e) => updateStepRow(idx, 'tip', e.target.value)}
                placeholder="Не відкривайте кришку, щоб пара не виходила..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-200 border-b pb-2 border-stone-200 dark:border-stone-800">
          SEO налаштування
        </h3>
        <div className="space-y-3">
          <Input
            label="SEO Title (тег заголовка сторінки)"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder="Запечена курка з часником — Простий рецепт | Смаколик"
          />
          <Input
            label="SEO Description (метаопис для Google)"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            placeholder="Дізнайтеся, як приготувати ніжну та соковиту запечену курку в духовці з хрусткою скоринкою за 45 хвилин."
          />
        </div>
      </div>

      {/* Action buttons */}
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
          className="px-8 shadow-md shadow-brand-500/20"
        >
          {isEditing ? 'Зберегти зміни' : 'Опублікувати рецепт'}
        </Button>
      </div>
    </form>
  );
};
