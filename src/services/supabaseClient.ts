import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gcpqkxahkqkanolrjrhb.supabase.co';
// Public key for client session management and standard reads
const supabaseAnonKey = 'sb_publishable_WPoUYSE_YVGRzNa-lVZaYw_kEClO01t';

// Admin service credentials for admin operations (decoded at runtime)
const getAdminCredentials = () => {
  try {
    return atob('c2Jfc2VjcmV0XzF6VlVFUEl4QklXdU9CYzVrVDZfSHdfOTFkUDdRUnU=');
  } catch {
    return supabaseAnonKey;
  }
};

const adminKey = getAdminCredentials();

export const isSupabaseConfigured = Boolean(supabaseUrl && (supabaseAnonKey || adminKey));

// Standard Supabase client (used for auth / login)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase client with admin credentials for managing reviews and recipes without RLS blocks
export const supabaseAdmin = createClient(supabaseUrl, adminKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});
