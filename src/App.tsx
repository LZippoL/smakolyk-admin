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
  ExternalLink
} from 'lucide-react';
import { Recipe, Article, Review } from './types';
import { recipeService } from './services/recipeService';
import { articleService } from './services/articleService';
import { reviewService } from './services/reviewService';
import { supabase } from './services/supabaseClient';
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

  // Mode: list, create_recipe, edit_recipe, create_article, edit_article
  const [mode, setMode] = useState<'list' | 'create_recipe' | 'edit_recipe' | 'create_article' | 'edit_article'>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

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

  // Filtered lists
  const filteredRecipes = recipes.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 text-white font-black flex items-center justify-center shadow-md shadow-brand-500/20 text-lg">
            С
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg">Смаколик CMS</h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <ShieldCheck className="w-3 h-3" />
                Supabase
              </span>
            </div>
            <p className="text-[11px] text-stone-400">
              {session.user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://lzippol.github.io/ReceptSite/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Відкрити сайт
          </a>

          <Button
            onClick={handleExportRecipesJson}
            variant="outline"
            size="sm"
            className="rounded-xl"
            title="Експорт бази"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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
            {/* Tabs: Recipes vs Articles vs Reviews */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-px">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => handleTabChange('recipes')}
                  className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors border-b-2 -mb-px shrink-0 ${
                    activeTab === 'recipes'
                      ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  Рецепти ({recipes.length})
                </button>
                <button
                  onClick={() => handleTabChange('articles')}
                  className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors border-b-2 -mb-px shrink-0 ${
                    activeTab === 'articles'
                      ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Статті ({articles.length})
                </button>
                <button
                  onClick={() => handleTabChange('reviews')}
                  className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors border-b-2 -mb-px shrink-0 ${
                    activeTab === 'reviews'
                      ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Відгуки ({reviews.length})
                </button>
              </div>

              {activeTab !== 'reviews' && (
                <Button
                  onClick={() => setMode(activeTab === 'recipes' ? 'create_recipe' : 'create_article')}
                  size="sm"
                  className="rounded-xl mb-2 shrink-0 bg-brand-600 hover:bg-brand-500 font-bold"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  {activeTab === 'recipes' ? 'Додати рецепт' : 'Додати статтю'}
                </Button>
              )}
            </div>

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <AdminReviewsTab
                reviews={reviews}
                recipes={recipes}
                onReviewsChanged={loadData}
              />
            )}

            {/* Recipes List Table */}
            {activeTab === 'recipes' && (
              <>
                <div className="relative max-w-sm">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Пошук рецептів..."
                    className="w-full h-10 pl-9 pr-4 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
                  />
                </div>

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
                        {filteredRecipes.map(recipe => (
                          <tr key={recipe.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={recipe.image}
                                  alt={recipe.title}
                                  className="w-12 h-12 rounded-xl object-cover shrink-0"
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
                              <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 font-semibold text-xs text-stone-700 dark:text-stone-300">
                                {recipe.category}
                              </span>
                            </td>
                            <td className="p-4 hidden md:table-cell text-stone-500">
                              {recipe.totalTime} хв
                            </td>
                            <td className="p-4 hidden md:table-cell">
                              <span className="capitalize text-stone-600 dark:text-stone-400">{recipe.difficulty}</span>
                            </td>
                            <td className="p-4 font-bold text-amber-500">
                              ★ {recipe.rating} <span className="text-xs text-stone-400 font-normal">({recipe.reviewsCount})</span>
                            </td>
                            <td className="p-4 text-right">
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Articles List Table */}
            {activeTab === 'articles' && (
              <>
                <div className="relative max-w-sm">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Пошук статей..."
                    className="w-full h-10 pl-9 pr-4 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl outline-none"
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
                        {filteredArticles.map(article => (
                          <tr key={article.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={article.image}
                                  alt={article.title}
                                  className="w-12 h-12 rounded-xl object-cover shrink-0"
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
                              <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 font-semibold text-xs text-stone-700 dark:text-stone-300">
                                {article.category}
                              </span>
                            </td>
                            <td className="p-4 hidden md:table-cell text-stone-500">
                              {article.readTime} хв
                            </td>
                            <td className="p-4 text-right">
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
