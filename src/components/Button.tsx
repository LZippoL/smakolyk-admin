import React from 'react';
import { cn } from '../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-600/30 active:bg-brand-800',
    secondary: 'bg-stone-100 hover:bg-stone-200 text-stone-900 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-100',
    outline: 'border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100',
    ghost: 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/30'
  };

  const sizes = {
    sm: 'text-xs h-9 px-3 rounded-xl gap-1.5',
    md: 'text-sm h-11 px-4 rounded-2xl gap-2 min-h-[44px]',
    lg: 'text-base h-13 px-6 rounded-2xl gap-2.5 min-h-[48px]',
    icon: 'h-11 w-11 rounded-2xl p-0 min-h-[44px] min-w-[44px]'
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          <span>{children}</span>
        </>
      ) : children}
    </button>
  );
});

Button.displayName = 'Button';
