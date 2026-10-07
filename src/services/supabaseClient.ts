import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://gcpqkxahkqkanolrjrhb.supabase.co';
export const supabaseAnonKey = 'sb_publishable_WPoUYSE_YVGRzNa-lVZaYw_kEClO01t';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Standard Supabase client (used for auth / login and all database operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
