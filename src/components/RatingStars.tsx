import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../utils/cn';

interface RatingStarsProps {
  rating: number; // 0 to 5
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showScore?: boolean;
  reviewsCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
  showScore = false,
  reviewsCount
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  const currentVal = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="inline-flex items-center gap-1.5 select-none">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const starValue = i + 1;
          const isFilled = currentVal >= starValue;
          const isPartiallyFilled = !isFilled && currentVal > i && currentVal < starValue;

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={cn(
                'transition-transform',
                interactive && 'cursor-pointer hover:scale-125 focus-visible:outline-none focus-visible:scale-125',
                !interactive && 'cursor-default'
              )}
              aria-label={`Оцінити на ${starValue} з ${max}`}
            >
              <Star
                className={cn(
                  starSizes[size],
                  isFilled
                    ? 'fill-amber-400 text-amber-400 drop-shadow-[0_1px_4px_rgba(251,191,36,0.4)]'
                    : isPartiallyFilled
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'text-stone-300 dark:text-stone-600'
                )}
              />
            </button>
          );
        })}
      </div>
      {showScore && (
        <span className="text-xs font-bold text-stone-900 dark:text-stone-100 ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className="text-xs text-stone-500 dark:text-stone-400">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};
