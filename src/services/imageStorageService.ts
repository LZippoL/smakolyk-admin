import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface UploadResult {
  url: string;
  path: string;
}

export const storageService = {
  /**
   * Upload an image file to Supabase Storage 'recipe-images' bucket
   * @param file File object from <input type="file">
   * @param folder optional folder prefix, e.g. 'recipes', 'reviews', 'articles'
   */
  async uploadImage(file: File, folder: 'recipes' | 'reviews' | 'articles' = 'recipes'): Promise<UploadResult> {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured');
    }

    // Generate safe unique filename
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${folder}/${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('recipe-images')
      .upload(filePath, file, {
        cacheControl: '3600',
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
      path: filePath
    };
  }
};
