import React, { useRef, useState } from 'react';
import { Upload, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { storageService } from '../services/imageStorageService';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: 'recipes' | 'reviews' | 'articles';
  label?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  folder = 'recipes',
  label = 'Фото страви'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (allow original files up to 15MB since we compress client-side)
    if (file.size > 15 * 1024 * 1024) {
      alert('Файл занадто великий. Максимальний розмір 15 МБ.');
      return;
    }

    // Check mime type
    if (!file.type.startsWith('image/')) {
      alert('Будь ласка, оберіть файл зображення (PNG, JPG, WEBP).');
      return;
    }

    setIsUploading(true);
    setUploadMessage(null);
    try {
      const result = await storageService.uploadImage(file, folder);
      onChange(result.url);
      
      const stats = result.originalSizeKb && result.compressedSizeKb
        ? ` (${result.originalSizeKb}КБ ➔ ${result.compressedSizeKb}КБ WebP)`
        : '';
      setUploadMessage(`✓ Фото оптимізовано${stats}`);
      setTimeout(() => setUploadMessage(null), 4500);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Не вдалося завантажити фото');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {uploadMessage && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {uploadMessage}
            </span>
          )}
          <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
            {label}
          </label>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Завантаження в базу...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              <span>Завантажити з пристрою</span>
            </>
          )}
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* URL Input & Preview Container */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... або натисніть 'Завантажити з пристрою'"
            className="w-full h-11 pl-4 pr-10 text-xs sm:text-sm bg-white dark:bg-stone-900 border rounded-2xl border-stone-300 dark:border-stone-700 outline-none focus:border-brand-500 font-mono"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              title="Очистити"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live preview */}
        {value && (
          <div className="relative w-full max-w-xs h-36 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-850 group">
            <img
              src={value}
              alt="Попередній перегляд"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495195129352-aeb325a55b65?auto=format&fit=crop&w=600&q=80';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
              <ImageIcon className="w-4 h-4 mr-1.5" />
              Попередній перегляд
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
