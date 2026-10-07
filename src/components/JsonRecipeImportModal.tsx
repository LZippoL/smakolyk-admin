import React, { useState } from 'react';
import { Sparkles, Copy, Check, Bot, AlertCircle, FileJson } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { RecipeIngredient, CookingStep, RecipeCategory, CuisineType, Difficulty } from '../types';

interface JsonRecipeImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyRecipe: (data: {
    title?: string;
    slug?: string;
    description?: string;
    image?: string;
    category?: RecipeCategory;
    cuisine?: CuisineType;
    prepTime?: number;
    cookTime?: number;
    servings?: number;
    difficulty?: Difficulty;
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
    tags?: string[];
    ingredients?: RecipeIngredient[];
    instructions?: CookingStep[];
    seoTitle?: string;
    seoDescription?: string;
  }) => void;
}

const CATEGORY_MAP: Record<string, RecipeCategory> = {
  'сніданок': 'breakfast',
  'сніданки': 'breakfast',
  'breakfast': 'breakfast',
  'обід': 'lunch',
  'обіди': 'lunch',
  'lunch': 'lunch',
  'вечеря': 'dinner',
  'вечері': 'dinner',
  'dinner': 'dinner',
  'суп': 'soup',
  'супи': 'soup',
  'перші страви': 'soup',
  'soup': 'soup',
  'салат': 'salad',
  'салати': 'salad',
  'salad': 'salad',
  'закуска': 'appetizer',
  'закуски': 'appetizer',
  'appetizer': 'appetizer',
  'м\'ясо': 'meat',
  'мясо': 'meat',
  'м’ясо': 'meat',
  'meat': 'meat',
  'риба': 'fish',
  'риба та морепродукти': 'fish',
  'морепродукти': 'fish',
  'fish': 'fish',
  'випічка': 'baking',
  'хліб': 'baking',
  'baking': 'baking',
  'десерт': 'dessert',
  'десерти': 'dessert',
  'солодощі': 'dessert',
  'dessert': 'dessert',
  'напій': 'drink',
  'напої': 'drink',
  'коктейлі': 'drink',
  'drink': 'drink',
  'drinks': 'drink',
  'швидко': 'quick',
  'швидкі': 'quick',
  'швидкі рецепти': 'quick',
  'quick': 'quick',
  'здорове': 'healthy',
  'здорове харчування': 'healthy',
  'корисне': 'healthy',
  'healthy': 'healthy',
  'вегетаріанське': 'vegetarian',
  'вегетаріанські': 'vegetarian',
  'vegetarian': 'vegetarian'
};

const CUISINE_MAP: Record<string, CuisineType> = {
  'українська': 'ukrainian',
  'ukrainian': 'ukrainian',
  'італійська': 'italian',
  'итальянская': 'italian',
  'italian': 'italian',
  'французька': 'french',
  'french': 'french',
  'азійська': 'asian',
  'asian': 'asian',
  'американська': 'american',
  'american': 'american',
  'мексиканська': 'mexican',
  'mexican': 'mexican',
  'грузинська': 'georgian',
  'georgian': 'georgian',
  'середземноморська': 'mediterranean',
  'mediterranean': 'mediterranean',
  'інша': 'other',
  'other': 'other'
};

const DIFFICULTY_MAP: Record<string, Difficulty> = {
  'легко': 'easy',
  'просто': 'easy',
  'easy': 'easy',
  'середня': 'medium',
  'середнє': 'medium',
  'medium': 'medium',
  'складно': 'hard',
  'важко': 'hard',
  'hard': 'hard'
};

const CHATGPT_PROMPT_TEMPLATE = `Створи повноцінний кулінарний рецепт у форматі JSON. Відповідай ВИКЛЮЧНО валідним JSON-кодом (без вступних слів і без привітань).

Схема JSON:
{
  "title": "Назва страви",
  "description": "Апетитний короткий опис страви (2-3 речення)",
  "category": "lunch",
  "cuisine": "ukrainian",
  "prepTime": 15,
  "cookTime": 30,
  "servings": 4,
  "difficulty": "easy",
  "calories": 380,
  "nutrition": {
    "protein": 24,
    "fat": 14,
    "carbs": 38
  },
  "tags": ["домашнє", "смачно", "обід"],
  "ingredients": [
    { "name": "Куряче філе", "amount": 500, "unit": "г" },
    { "name": "Цибуля ріпчаста", "amount": 1, "unit": "шт" },
    { "name": "Сіль", "amount": 1, "unit": "ч. л.", "isStaple": true }
  ],
  "instructions": [
    { "stepNumber": 1, "title": "Підготовка інгредієнтів", "instruction": "Промийте куряче філе, обсушіть паперовим рушником та наріжте середніми шматочками.", "timerMinutes": 5 },
    { "stepNumber": 2, "title": "Обсмажування", "instruction": "Розігрійте пательню з олією та обсмажте м'ясо з цибулею до золотистої скоринки.", "timerMinutes": 15 }
  ]
}

Доступні значення для "category":
breakfast (сніданки), lunch (обіди), dinner (вечері), soup (супи), salad (салати), appetizer (закуски), meat (м'ясо), fish (риба), baking (випічка), dessert (десерти), drink (напої), quick (швидкі), healthy (здорове), vegetarian (вегетаріанське).

Доступні значення для "cuisine":
ukrainian, italian, french, asian, american, mexican, georgian, mediterranean, other.

Доступні значення для "difficulty": easy, medium, hard.`;

function parseIngredientItem(item: any, idx: number): RecipeIngredient {
  if (typeof item === 'string') {
    const trimmed = item.trim();
    // Pattern: 500 г куряче філе or 2 шт яєць
    const matchStart = trimmed.match(/^([0-9]+(?:[.,][0-9]+)?)\s*([а-яА-Яa-zA-Z./°]{1,10})?\s+(.+)$/);
    if (matchStart) {
      const amt = parseFloat(matchStart[1].replace(',', '.'));
      const unit = (matchStart[2] || 'шт').trim();
      const name = matchStart[3].trim();
      return { id: String(Date.now() + idx), name, amount: isNaN(amt) ? 1 : amt, unit };
    }
    // Pattern: Куряче філе - 500 г
    const matchEnd = trimmed.match(/^(.+?)\s*[-–:]\s*([0-9]+(?:[.,][0-9]+)?)\s*([а-яА-Яa-zA-Z./°]{1,10})?$/);
    if (matchEnd) {
      const name = matchEnd[1].trim();
      const amt = parseFloat(matchEnd[2].replace(',', '.'));
      const unit = (matchEnd[3] || 'г').trim();
      return { id: String(Date.now() + idx), name, amount: isNaN(amt) ? 1 : amt, unit };
    }
    return { id: String(Date.now() + idx), name: trimmed, amount: 1, unit: 'шт' };
  }

  const name = item.name || item.title || item.ingredient || item.item || '';
  const rawAmt = item.amount ?? item.quantity ?? item.qty ?? 1;
  const parsedAmt = typeof rawAmt === 'string' ? parseFloat(rawAmt.replace(',', '.')) : Number(rawAmt);
  const unit = item.unit || item.measure || 'г';

  return {
    id: item.id || String(Date.now() + idx),
    name: String(name).trim(),
    amount: isNaN(parsedAmt) ? 1 : parsedAmt,
    unit: String(unit).trim(),
    notes: item.notes || item.comment || undefined,
    isStaple: Boolean(item.isStaple || item.staple)
  };
}

function parseInstructionItem(item: any, idx: number): CookingStep {
  if (typeof item === 'string') {
    const cleaned = item.replace(/^Крок\s*\d+[:.-]?\s*/i, '').replace(/^Step\s*\d+[:.-]?\s*/i, '').trim();
    return {
      stepNumber: idx + 1,
      title: `Крок ${idx + 1}`,
      instruction: cleaned,
      timerMinutes: undefined
    };
  }

  const instructionText = item.instruction || item.description || item.text || item.desc || item.action || '';
  const timer = item.timerMinutes ?? item.timer_minutes ?? item.timer ?? undefined;
  const parsedTimer = timer !== undefined && !isNaN(Number(timer)) ? Number(timer) : undefined;

  return {
    stepNumber: Number(item.stepNumber || item.step || idx + 1),
    title: String(item.title || `Крок ${idx + 1}`).trim(),
    instruction: String(instructionText).trim(),
    timerMinutes: parsedTimer,
    tip: item.tip || undefined,
    image: item.image || undefined
  };
}

export const JsonRecipeImportModal: React.FC<JsonRecipeImportModalProps> = ({
  isOpen,
  onClose,
  onApplyRecipe
}) => {
  const [jsonInput, setJsonInput] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(CHATGPT_PROMPT_TEMPLATE);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    } catch {
      // Fallback
      alert('Скопіюйте шаблон з тексту нижче вручну');
    }
  };

  const handleApply = () => {
    setErrorMessage(null);
    const trimmed = jsonInput.trim();

    if (!trimmed) {
      setErrorMessage('Будь ласка, вставте JSON у поле вводу');
      return;
    }

    try {
      let cleaned = trimmed;
      // Strip markdown ```json ... ``` or ``` ... ```
      const codeBlockMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
      if (codeBlockMatch) {
        cleaned = codeBlockMatch[1].trim();
      } else {
        // Extract substring between first { and last }
        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
          cleaned = cleaned.substring(firstBrace, lastBrace + 1);
        }
      }

      const parsed = JSON.parse(cleaned);

      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Очікувався JSON-об\'єкт з даними рецепту');
      }

      // Map Category
      let cat: RecipeCategory | undefined = undefined;
      const rawCat = String(parsed.category || '').toLowerCase().trim();
      if (rawCat && CATEGORY_MAP[rawCat]) {
        cat = CATEGORY_MAP[rawCat];
      }

      // Map Cuisine
      let cui: CuisineType | undefined = undefined;
      const rawCui = String(parsed.cuisine || '').toLowerCase().trim();
      if (rawCui && CUISINE_MAP[rawCui]) {
        cui = CUISINE_MAP[rawCui];
      }

      // Map Difficulty
      let diff: Difficulty | undefined = undefined;
      const rawDiff = String(parsed.difficulty || '').toLowerCase().trim();
      if (rawDiff && DIFFICULTY_MAP[rawDiff]) {
        diff = DIFFICULTY_MAP[rawDiff];
      }

      // Map Tags
      let tags: string[] | undefined = undefined;
      if (Array.isArray(parsed.tags)) {
        tags = parsed.tags.map((t: any) => String(t).trim()).filter(Boolean);
      } else if (typeof parsed.tags === 'string') {
        tags = parsed.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
      }

      // Map Ingredients
      let ingredients: RecipeIngredient[] | undefined = undefined;
      if (Array.isArray(parsed.ingredients)) {
        ingredients = parsed.ingredients
          .map((item: any, idx: number) => parseIngredientItem(item, idx))
          .filter((i: RecipeIngredient) => i.name.length > 0);
      }

      // Map Instructions
      let instructions: CookingStep[] | undefined = undefined;
      if (Array.isArray(parsed.instructions)) {
        instructions = parsed.instructions
          .map((item: any, idx: number) => parseInstructionItem(item, idx))
          .filter((s: CookingStep) => s.instruction.length > 0);
      } else if (Array.isArray(parsed.steps)) {
        instructions = parsed.steps
          .map((item: any, idx: number) => parseInstructionItem(item, idx))
          .filter((s: CookingStep) => s.instruction.length > 0);
      }

      // Time fields
      const prepTime = parsed.prepTime ?? parsed.prep_time ?? parsed.prep;
      const cookTime = parsed.cookTime ?? parsed.cook_time ?? parsed.cook;
      const servings = parsed.servings ?? parsed.servingsCount ?? parsed.portions;
      const calories = parsed.calories ?? parsed.nutrition?.calories;

      // Nutrition
      const protein = parsed.nutrition?.protein ?? parsed.protein;
      const fat = parsed.nutrition?.fat ?? parsed.fat;
      const carbs = parsed.nutrition?.carbs ?? parsed.carbs;

      onApplyRecipe({
        title: parsed.title,
        slug: parsed.slug,
        description: parsed.description,
        image: parsed.image,
        category: cat,
        cuisine: cui,
        prepTime: prepTime !== undefined && !isNaN(Number(prepTime)) ? Number(prepTime) : undefined,
        cookTime: cookTime !== undefined && !isNaN(Number(cookTime)) ? Number(cookTime) : undefined,
        servings: servings !== undefined && !isNaN(Number(servings)) ? Number(servings) : undefined,
        difficulty: diff,
        calories: calories !== undefined && !isNaN(Number(calories)) ? Number(calories) : undefined,
        protein: protein !== undefined && !isNaN(Number(protein)) ? Number(protein) : undefined,
        fat: fat !== undefined && !isNaN(Number(fat)) ? Number(fat) : undefined,
        carbs: carbs !== undefined && !isNaN(Number(carbs)) ? Number(carbs) : undefined,
        tags,
        ingredients,
        instructions,
        seoTitle: parsed.seoTitle ?? parsed.seo_title,
        seoDescription: parsed.seoDescription ?? parsed.seo_description
      });

      setJsonInput('');
      onClose();
    } catch (err: any) {
      setErrorMessage(`Помилка розбору JSON: ${err?.message || 'Невалідний синтаксис'}. Переконайтеся, що ви скопіювали JSON повністю від { до }.`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Імпорт рецепту з ChatGPT / JSON"
      description="Швидко заповніть усі поля форми за одну секунду з готового тексту ChatGPT або JSON файлу"
      maxWidth="2xl"
    >
      <div className="space-y-6 pt-2 pb-1">
        {/* Step 1: Copy Prompt */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-purple-600 text-white text-xs font-bold">1</span>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Скопіюйте готовий запит для ChatGPT
              </h4>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 pl-7">
              Вставте його у ChatGPT, вкажіть бажану страву — і він видасть ідеальний JSON з категоріями, часом, інгредієнтами та кроками.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyPrompt}
            className="w-full sm:w-auto shrink-0 bg-white dark:bg-stone-900 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/40 rounded-xl"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                Скопійовано!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                Скопіювати промпт
              </>
            )}
          </Button>
        </div>

        {/* Step 2: Paste JSON */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-600 text-white text-xs font-bold">2</span>
              <label className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <FileJson className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Вставте отриманий JSON сюди
              </label>
            </div>
            {jsonInput && (
              <button
                type="button"
                onClick={() => setJsonInput('')}
                className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              >
                Очистити
              </button>
            )}
          </div>

          <textarea
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder={`{\n  "title": "Український борщ",\n  "description": "Класичний ароматний борщ...",\n  "category": "soup",\n  "cuisine": "ukrainian",\n  "prepTime": 20,\n  "cookTime": 60,\n  "servings": 6,\n  "difficulty": "medium",\n  "calories": 320,\n  "ingredients": [...],\n  "instructions": [...]\n}`}
            className="w-full h-56 p-4 text-xs font-mono bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl focus:border-brand-500 dark:focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none resize-none transition-all"
            spellCheck={false}
          />
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl"
          >
            Скасувати
          </Button>

          <Button
            type="button"
            onClick={handleApply}
            className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-amber-600 hover:from-brand-700 hover:to-amber-700 text-white rounded-xl shadow-lg shadow-brand-500/20"
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            Заповнити поля форми
          </Button>
        </div>
      </div>
    </Modal>
  );
};
