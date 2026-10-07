import React, { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { Button } from './Button';
import { Input } from './Input';

interface AdminAuthGateProps {
  onAuthenticated: () => void;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        setErrorMessage(error.message || 'Невірний логін або пароль');
      } else if (data.session) {
        onAuthenticated();
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Помилка авторизації через Supabase');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-scale-up">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100">
            Вхід в Адмін-панель
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Введіть облікові дані адміністратора Supabase
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 flex items-start gap-2.5 text-rose-700 dark:text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
            autoComplete="email"
          />

          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full rounded-2xl bg-brand-600 hover:bg-brand-500 font-bold shadow-lg shadow-brand-500/20"
          >
            Увійти
          </Button>
        </form>

        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-center">
          <p className="text-[11px] text-stone-400">
            Обліковий запис керується через вкладку <strong>Authentication</strong> у вашій панелі Supabase.
          </p>
        </div>
      </div>
    </div>
  );
};
