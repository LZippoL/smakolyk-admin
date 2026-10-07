import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gcpqkxahkqkanolrjrhb.supabase.co';
const supabaseKey = 'sb_publishable_WPoUYSE_YVGRzNa-lVZaYw_kEClO01t';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = createClient(supabaseUrl, supabaseKey);
