import { supabase } from './supabaseClient';
import { storage } from './storageService';

export interface UserProfileRecord {
  id: string; // Supabase UUID
  friendlyId: string; // Short ID, e.g. UID-CABB1F3B
  email: string;
  displayName: string;
  createdAt: string;
  lastLoginAt: string;
  isBanned: boolean;
  banReason?: string;
  bannedAt?: string;
  isMuted: boolean;
  muteReason?: string;
  mutedUntil?: string; // ISO timestamp or 'permanent'
  mutedAt?: string;
}

// Remove the legacy cache that contained other users' emails.
void storage.remove('smakolyk_users_db');

export function generateFriendlyId(uuid: string): string {
  if (!uuid) return 'UID-00000000';
  const clean = uuid.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return `UID-${clean.slice(0, 8) || '00000000'}`;
}

export function isUserMutedActive(user: UserProfileRecord | null | undefined): boolean {
  if (!user || !user.isMuted) return false;
  if (!user.mutedUntil || user.mutedUntil === 'permanent') return true;
  const expiry = new Date(user.mutedUntil).getTime();
  return expiry > Date.now();
}

function mapProfile(row: any): UserProfileRecord {
  return { id: row.id, friendlyId: generateFriendlyId(row.id), email: row.email,
    displayName: row.display_name, createdAt: row.created_at, lastLoginAt: row.last_login_at,
    isBanned: row.is_banned || row.is_deleted, banReason: row.ban_reason || undefined,
    bannedAt: row.banned_at || undefined, isMuted: row.is_muted,
    muteReason: row.mute_reason || undefined,
    mutedUntil: row.is_muted ? (row.muted_until || 'permanent') : undefined,
    mutedAt: row.muted_at || undefined };
}

class UserService {
  async getAll(_forceFresh = true): Promise<UserProfileRecord[]> {
    const { data, error } = await supabase.from('user_profiles').select('*').eq('is_deleted', false).order('created_at', { ascending: false });
    if (error) throw new Error('Немає доступу до профілів');
    return (data || []).map(mapProfile);
  }
  private async moderate(id: string, updates: Record<string, unknown>): Promise<UserProfileRecord> {
    const { data, error } = await supabase.from('user_profiles').update(updates).eq('id', id).select().single();
    if (error) throw new Error('Не вдалося змінити обмеження користувача');
    return mapProfile(data);
  }
  banUser(id: string, reason?: string) {
    return this.moderate(id, { is_banned: true, ban_reason: reason?.trim() || 'Порушення правил спільноти', banned_at: new Date().toISOString() });
  }
  unbanUser(id: string) {
    return this.moderate(id, { is_banned: false, ban_reason: null, banned_at: null });
  }
  muteUser(id: string, durationDays = 7, reason?: string) {
    const until = durationDays > 0 ? new Date(Date.now() + durationDays * 86400000).toISOString() : null;
    return this.moderate(id, { is_muted: true, muted_until: until, mute_reason: reason?.trim() || 'Обмеження публікації відгуків', muted_at: new Date().toISOString() });
  }
  unmuteUser(id: string) {
    return this.moderate(id, { is_muted: false, muted_until: null, mute_reason: null, muted_at: null });
  }
}
export const userService = new UserService();
