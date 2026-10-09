import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface UploadResult {
  url: string;
  path: string;
  originalSizeKb?: number;
  compressedSizeKb?: number;
}

/**
 * Resizes and compresses an image in browser using HTML5 Canvas.
 * Outputs optimized WebP (or JPEG if WebP unsupported).
 */
async function compressImage(file: File, maxWidth = 1280, quality = 0.82): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Не вдалося прочитати файл зображення'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Не вдалося завантажити зображення'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Downscale while preserving aspect ratio if larger than maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context unavailable'));
          return;
        }

        // Draw image with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP format with quality 0.82
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              // Fallback to jpeg if webp export fails
              canvas.toBlob(
                (fallbackBlob) => {
                  if (fallbackBlob) resolve(fallbackBlob);
                  else reject(new Error('Не вдалося стиснути зображення'));
                },
                'image/jpeg',
                quality
              );
            }
          },
          'image/webp',
          quality
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export const storageService = {
  /**
   * Upload an image file to Supabase Storage 'recipe-images' bucket
   * Automatically optimizes and compresses to WebP before upload.
   * @param file File object from <input type="file">
   * @param folder optional folder prefix, e.g. 'recipes', 'reviews', 'articles'
   */
  async uploadImage(file: File, folder: 'recipes' | 'reviews' | 'articles' = 'recipes'): Promise<UploadResult> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error('Увійдіть, щоб завантажити фото');
    const extensions: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif' };
    if (!extensions[file.type]) throw new Error('Оберіть зображення JPEG, PNG, WebP, AVIF або GIF');

    const originalSizeKb = Math.round(file.size / 1024);

    // Compress client-side to WebP (max 1280px, quality 82%)
    let uploadBlob: Blob;
    let fileExt = 'webp';
    let contentType = 'image/webp';

    try {
      uploadBlob = await compressImage(file, 1280, 0.82);
    } catch (compressionErr) {
      console.warn('Image compression fallback to original:', compressionErr);
      uploadBlob = file;
      contentType = file.type;
    }

    const compressedSizeKb = Math.round(uploadBlob.size / 1024);

    contentType = uploadBlob.type || contentType;
    fileExt = extensions[contentType];
    if (!fileExt || uploadBlob.size > 5 * 1024 * 1024) throw new Error('Зображення має бути до 5 МБ у дозволеному форматі');
    const cleanFileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = folder === 'reviews' ? `reviews/${user.id}/${cleanFileName}` : `${folder}/${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('recipe-images')
      .upload(filePath, uploadBlob, {
        cacheControl: '31536000', // 1 year cache for static assets
        contentType,
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    const { data: publicData } = supabase.storage
      .from('recipe-images')
      .getPublicUrl(filePath);

    return {
      url: publicData.publicUrl,
      path: filePath,
      originalSizeKb,
      compressedSizeKb
    };
  }
};
