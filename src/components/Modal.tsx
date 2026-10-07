import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  asBottomSheetOnMobile?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
  asBottomSheetOnMobile = true
}) => {
  // Swipe to dismiss state for mobile bottom sheets
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const currentDrag = useRef<number>(0);
  const sheetContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Lock scrolling on both body and html so mobile background cannot scroll
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Reset drag offset when opened
    setDragOffset(0);
    setIsDragging(false);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-5xl'
  };

  // Touch handlers for swipe down to dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!asBottomSheetOnMobile) return;
    // Only allow swipe down if content is scrolled near top (<= 5px)
    if (sheetContentRef.current && sheetContentRef.current.scrollTop > 5) {
      return;
    }
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;

    // Only allow dragging downwards
    if (deltaY > 0) {
      currentDrag.current = deltaY;
      setDragOffset(deltaY);
    } else {
      currentDrag.current = 0;
      setDragOffset(0);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY.current === null) return;
    const finalDelta = currentDrag.current;
    touchStartY.current = null;
    currentDrag.current = 0;
    setIsDragging(false);

    if (finalDelta > 80) {
      // Swiped down sufficiently -> dismiss
      onClose();
    } else {
      // Snap back
      setDragOffset(0);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Backdrop: clicking outside triggers onClose */}
      <div
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog / Mobile Bottom Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={(e) => e.stopPropagation()}
        style={
          dragOffset > 0
            ? {
                transform: `translateY(${dragOffset}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
              }
            : undefined
        }
        className={cn(
          'relative w-full bg-white dark:bg-stone-900 shadow-2xl z-10 border border-stone-200 dark:border-stone-800 transition-all overflow-hidden flex flex-col',
          asBottomSheetOnMobile
            ? 'rounded-t-[2.5rem] sm:rounded-3xl max-h-[92vh] sm:max-h-[85vh] animate-slide-up sm:animate-scale-up pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]'
            : 'rounded-3xl max-h-[85vh] animate-scale-up',
          maxWidths[maxWidth]
        )}
      >
        {/* Mobile handle indicator with touch drag detection */}
        {asBottomSheetOnMobile && (
          <div
            className="sm:hidden flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 transition-colors" />
          </div>
        )}

        {/* Header */}
        {(title || description) && (
          <div
            className="flex items-start justify-between p-5 sm:p-6 pb-3 sm:pb-4 border-b border-stone-100 dark:border-stone-800 shrink-0 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="pr-2">
              {title && (
                <h3 id="modal-title" className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 -mt-1 rounded-2xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
              aria-label="Закрити"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content body */}
        <div
          ref={sheetContentRef}
          className="p-5 sm:p-6 overflow-y-auto overscroll-contain max-h-[calc(90vh-90px)]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
