import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Search, 
  BookOpen, 
  UtensilsCrossed,
  MessageSquare,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Smartphone,
  Filter,
  X
} from 'lucide-react';
import { Recipe, Article, Review } from './types';
import { recipeService } from './services/recipeService';
import { articleService } from './services/articleService';
import { reviewService } from './services/reviewService';
import { supabase } from './services/supabaseClient';
import { CATEGORIES } from './data/categories';
import { AdminRecipeForm } from './components/AdminRecipeForm';
import { AdminArticleForm } from './components/AdminArticleForm';
import { AdminReviewsTab } from './components/AdminReviewsTab';
import { AdminAuthGate } from './components/AdminAuthGate';
import { Button } from './components/Button';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'articles' | 'reviews'>('recipes');

  // Authentication State
  const [session, setSession] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mode: list, create_recipe, edit_recipe, create_article, edit_article
  const [mode, setMode] = useState<'list' | 'create_recipe' | 'edit_recipe' | 'create_article' | 'edit_article'>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // PWA install prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is launched in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('Щоб встановити додаток:\n- На iPhone/iPad: натисніть "Поділитися" -> "На початковий екран"\n- На Android/Chrome: натисніть меню (три крапки) -> "Встановити додаток"');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  // Check Supabase session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthChecking(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadData = () => {
    recipeService.getAll().then(setRecipes);
    articleService.getAll().then(setArticles);
    reviewService.getAll().then(setReviews);
  };

  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session]);

  const handleTabChange = (tab: 'recipes' | 'articles' | 'reviews') => {
    setActiveTab(tab);
    setMode('list');
    setSearchQuery('');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // Recipe actions
  const handleSaveRecipe = async (data: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewsCount'>) => {
    try {
      if (mode === 'edit_recipe' && selectedRecipe) {
        await recipeService.update(selectedRecipe.id, data);
        alert(`✓ Рецепт "${data.title}" успішно оновлено!`);
      } else {
        await recipeService.create(data);
        alert(`✓ Рецепт "${data.title}" успішно створено!`);
      }
      setMode('list');
      setSelectedRecipe(null);
      loadData();
    } catch (e: any) {
      alert(`Помилка: ${e?.message || 'Не вдалося зберегти рецепт'}`);
    }
  };

  const handleDeleteRecipe = async (id: string, title: string) => {
    if (window.confirm(`Ви дійсно бажаєте видалити рецепт "${title}"?`)) {
      await recipeService.delete(id);
      alert(`✓ Рецепт "${title}" видалено`);
      loadData();
    }
  };

  // Article actions
  const handleSaveArticle = async (data: Omit<Article, 'id' | 'createdAt'>) => {
    try {
      if (mode === 'edit_article' && selectedArticle) {
        await articleService.update(selectedArticle.id, data);
        alert(`✓ Статтю "${data.title}" успішно оновлено!`);
      } else {
        await articleService.create(data);
        alert(`✓ Статтю "${data.title}" успішно створено!`);
      }
      setMode('list');
      setSelectedArticle(null);
      loadData();
    } catch (e: any) {
      alert(`Помилка: ${e?.message || 'Не вдалося зберегти статтю'}`);
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (window.confirm(`Ви дійсно бажаєте видалити статтю "${title}"?`)) {
      await articleService.delete(id);
      alert(`✓ Статтю "${title}" видалено`);
      loadData();
    }
  };

  // Export
  const handleExportRecipesJson = async () => {
    const jsonStr = await recipeService.exportAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smakolyk-recipes-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Loading state while checking authentication
  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-900 text-stone-100">
        <div className="w-9 h-9 rounded-full border-3 border-brand-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // If not logged in -> Show Supabase Auth Gate
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-950 p-4">
        <AdminAuthGate onAuthenticated={() => loadData()} />
      </div>
    );
  }

  // Filter recipes by search query and category
  const filteredRecipes = recipes.filter(r => {
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.slug && r.slug.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white font-black flex items-center justify-center shadow-md shadow-brand-500/20 text-lg">
            С
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight">Смаколик CMS</h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <ShieldCheck className="w-3 h-3" />
                Supabase
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-medium">
              {session.user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Install PWA Button */}
          {!isInstalled && (
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-300/80 dark:border-amber-800/80 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors shadow-sm"
              title="Встановити панель як додаток на екран"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Встановити додаток</span>
            </button>
          )}

          <a
            href="https://lzippol.github.io/ReceptSite/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Сайт
          </a>

          <Button
            onClick={handleExportRecipesJson}
            variant="outline"
            size="sm"
            className="rounded-xl"
            title="Експорт бази рецептів"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span className="hidden xs:inline">Експорт</span>
          </Button>

          <Button
            onClick={handleLogout}
            variant="secondary"
            size="sm"
            className="rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            Вийти
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* Mode Switches */}
        {mode === 'create_recipe' && (
          <AdminRecipeForm
            onSubmit={handleSaveRecipe}
            onCancel={() => setMode('list')}
          />
        )}

        {mode === 'edit_recipe' && selectedRecipe && (
          <AdminRecipeForm
            initialRecipe={selectedRecipe}
            isEditing
            onSubmit={handleSaveRecipe}
            onCancel={() => {
              setMode('list');
              setSelectedRecipe(null);
            }}
          />
        )}

        {mode === 'create_article' && (
          <AdminArticleForm
            onSubmit={handleSaveArticle}
            onCancel={() => setMode('list')}
          />
        )}

        {mode === 'edit_article' && selectedArticle && (
          <AdminArticleForm
            initialArticle={selectedArticle}
            isEditing
            onSubmit={handleSaveArticle}
            onCancel={() => {
              setMode('list');
              setSelectedArticle(null);
            }}
          />
        )}

        {/* Main List Mode */}
        {mode === 'list' && (
          <div className="space-y-6">
            {/* Ergonomic Section Navigation Segmented Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white dark:bg-stone-900 p-2 sm:p-2.5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
              <nav className="grid grid-cols-3 gap-1.5 sm:gap-2 flex-1 max-w-xl">
                {/* Recipes Tab Button */}
                <button
                  type="button"
                  onClick={() => handleTabChange('recipes')}
                  className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                    activeTab === 'recipes'
                      ? 'bg-gradient-to-r from-brand-600 to-amber-600 text-white shadow-md shadow-brand-500/25 scale-[1.02]'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <UtensilsCrossed className="w-4 h-4 shrink-0" />
                  <span>Рецепти</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                    activeTab === 'recipes'
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}>
                    {recipes.length}
                  </span>
                </button>

                {/* Reviews Tab Button */}
                <button
                  type="button"
                  onClick={() => handleTabChange('reviews')}
                  className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                    activeTab === 'reviews'
                      ? 'bg-gradient-to-r from-brand-600 to-amber-600 text-white shadow-md shadow-brand-500/25 scale-[1.02]'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Відгуки</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                    activeTab === 'reviews'
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}>
                    {reviews.length}
                  </span>
                </button>

                {/* Articles Tab Button */}
                <button
                  type="button"
                  onClick={() => handleTabChange('articles')}
                  className={`flex items-center justify-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                    activeTab === 'articles'
                      ? 'bg-gradient-to-r from-brand-600 to-amber-600 text-white shadow-md shadow-brand-500/25 scale-[1.02]'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>Статті</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                    activeTab === 'articles'
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}>
                    {articles.length}
                  </span>
                </button>
              </nav>

              {/* Action Button */}
              {activeTab !== 'reviews' && (
                <Button
                  onClick={() => setMode(activeTab === 'recipes' ? 'create_recipe' : 'create_article')}
                  size="md"
                  className="rounded-2xl shrink-0 bg-brand-600 hover:bg-brand-500 font-bold shadow-md shadow-brand-500/20 py-2.5"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  {activeTab === 'recipes' ? 'Новий рецепт' : 'Нова стаття'}
                </Button>
              )}
            </div>

            {/* Reviews Tab View */}
            {activeTab === 'reviews' && (
              <AdminReviewsTab
                reviews={reviews}
                recipes={recipes}
                onReviewsChanged={loadData}
              />
            )}

            {/* Recipes List Table */}
            {activeTab === 'recipes' && (
              <div className="space-y-4">
                {/* Search & Category Filter Section */}
                <div className="space-y-3 bg-white dark:bg-stone-900 p-4 sm:p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Пошук рецептів за назвою, категорією або посиланням..."
                        className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl outline-none focus:border-brand-500 transition-colors"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Filter className="w-3.5 h-3.5" />
                      <span>Знайдено: <strong>{filteredRecipes.length}</strong> з {recipes.length}</span>
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-0.5">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        selectedCategory === 'all'
                          ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                      }`}
                    >
                      Всі категорії ({recipes.length})
                    </button>
                    {CATEGORIES.map(cat => {
                      const count = recipes.filter(r => r.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                            selectedCategory === cat.id
                              ? 'bg-brand-600 text-white font-bold shadow-sm shadow-brand-500/20'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-card">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 font-bold">
                        <tr>
                          <th className="p-4">Рецепт</th>
                          <th className="p-4 hidden sm:table-cell">Категорія</th>
                          <th className="p-4 hidden md:table-cell">Час</th>
                          <th className="p-4 hidden md:table-cell">Складність</th>
                          <th className="p-4">Рейтинг</th>
                          <th className="p-4 text-right">Дії</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                        {filteredRecipes.length > 0 ? (
                          filteredRecipes.map(recipe => {
                            const catMeta = CATEGORIES.find(c => c.id === recipe.category);
                            return (
                              <tr key={recipe.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors">
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={recipe.image}
                                      alt={recipe.title}
                                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200 dark:border-stone-800"
                                    />
                                    <div>
                                      <p className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                                        {recipe.title}
                                      </p>
                                      <p className="text-xs text-stone-400 font-mono">
                                        /{recipe.slug}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 hidden sm:table-cell">
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-xs text-stone-700 dark:text-stone-300">
                                    <span>{catMeta?.icon || '🍽️'}</span>
                                    <span>{catMeta?.name || recipe.category}</span>
                                  </span>
                                </td>
                                <td className="p-4 hidden md:table-cell text-stone-500">
                                  {recipe.totalTime} хв
                                </td>
                                <td className="p-4 hidden md:table-cell">
                                  <span className="capitalize text-stone-600 dark:text-stone-400">{recipe.difficulty}</span>
                                </td>
                                <td className="p-4 font-bold text-amber-500 whitespace-nowrap">
                                  ★ {recipe.rating} <span className="text-xs text-stone-400 font-normal">({recipe.reviewsCount})</span>
                                </td>
                                <td className="p-4 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end gap-1">
                                    <button
                                      onClick={() => {
                                        setSelectedRecipe(recipe);
                                        setMode('edit_recipe');
                                      }}
                                      className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-brand-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                                      title="Редагувати"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
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
                              Рецептів за обраними критеріями не знайдено
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Articles List Table */}
            {activeTab === 'articles' && (
              <div className="space-y-4">
                <div className="relative max-w-sm">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Пошук статей за назвою або категорією..."
                    className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl outline-none"
                  />
                </div>

                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-card">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 font-bold">
                        <tr>
                          <th className="p-4">Стаття</th>
                          <th className="p-4 hidden sm:table-cell">Категорія</th>
                          <th className="p-4 hidden md:table-cell">Час читання</th>
                          <th className="p-4 text-right">Дії</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                        {filteredArticles.length > 0 ? (
                          filteredArticles.map(article => (
                            <tr key={article.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200 dark:border-stone-800"
                                  />
                                  <div>
                                    <p className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                                      {article.title}
                                    </p>
                                    <p className="text-xs text-stone-400 font-mono">
                                      /{article.slug}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 hidden sm:table-cell">
                                <span className="px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-stone-800 font-semibold text-xs text-stone-700 dark:text-stone-300">
                                  {article.category}
                                </span>
                              </td>
                              <td className="p-4 hidden md:table-cell text-stone-500">
                                {article.readTime} хв
                              </td>
                              <td className="p-4 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => {
                                      setSelectedArticle(article);
                                      setMode('edit_article');
                                    }}
                                    className="p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-brand-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                                    title="Редагувати"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteArticle(article.id, article.title)}
                                    className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                    title="Видалити"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="text-center py-10 text-stone-500 text-sm">
                              Статей не знайдено
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
