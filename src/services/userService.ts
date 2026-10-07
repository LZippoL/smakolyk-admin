import { supabase, isSupabaseConfigured } from './supabaseClient';
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

const STORAGE_KEY = 'smakolyk_users_db';
const SYSTEM_STORE_ID = '__SYSTEM_USERS__';

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

class UserService {
  private memoryCache: UserProfileRecord[] | null = null;
  private lastFetch = 0;
  private readonly CACHE_TTL = 10_000; // 10 seconds

  async getAll(): Promise<UserProfileRecord[]> {
    if (this.memoryCache && Date.now() - this.lastFetch < this.CACHE_TTL) {
      return this.memoryCache;
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('description')
          .eq('id', SYSTEM_STORE_ID)
          .maybeSingle();

        if (!error && data?.description) {
          try {
            const parsed = JSON.parse(data.description) as UserProfileRecord[];
            if (Array.isArray(parsed)) {
              this.memoryCache = parsed;
              this.lastFetch = Date.now();
              await storage.set(STORAGE_KEY, parsed);
              return parsed;
            }
          } catch (e) {
            console.warn('Failed to parse users JSON from DB:', e);
          }
        }
      } catch (err) {
        console.warn('Supabase fetch users failed:', err);
      }
    }

    const local = await storage.get<UserProfileRecord[]>(STORAGE_KEY, []);
    this.memoryCache = local;
    return local;
  }

  async getById(idOrFriendlyIdOrEmail: string): Promise<UserProfileRecord | null> {
    if (!idOrFriendlyIdOrEmail) return null;
    const users = await this.getAll();
    const query = idOrFriendlyIdOrEmail.toLowerCase().trim();
    return (
      users.find(
        (u) =>
          u.id.toLowerCase() === query ||
          u.friendlyId.toLowerCase() === query ||
          u.email.toLowerCase() === query
      ) || null
    );
  }

  async saveAll(users: UserProfileRecord[]): Promise<void> {
    this.memoryCache = users;
    this.lastFetch = Date.now();
    await storage.set(STORAGE_KEY, users);

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('recipes')
          .upsert({
            id: SYSTEM_STORE_ID,
            slug: '__system_users__',
            title: 'System Users Store',
            description: JSON.stringify(users),
            category: 'system',
            cuisine: 'system',
            difficulty: 'easy',
            prep_time: 0,
            cook_time: 0,
            total_time: 0,
            servings: 1,
            calories: 0,
            image: '',
            rating: 0,
            reviews_count: 0,
            dietary: {},
            ingredients: [],
            instructions: [],
            tags: ['system'],
            author: { name: 'system' }
          });
      } catch (err) {
        console.error('Failed to sync users to Supabase:', err);
      }
    }
  }

  async banUser(userId: string, reason?: string): Promise<UserProfileRecord> {
    const users = await this.getAll();
    const idx = users.findIndex((u) => u.id === userId || u.friendlyId === userId);
    if (idx === -1) throw new Error('Користувача не знайдено');

    users[idx] = {
      ...users[idx],
      isBanned: true,
      banReason: reason?.trim() || 'Порушення правил спільноти',
      bannedAt: new Date().toISOString(),
    };
    await this.saveAll(users);
    return users[idx];
  }

  async unbanUser(userId: string): Promise<UserProfileRecord> {
    const users = await this.getAll();
    const idx = users.findIndex((u) => u.id === userId || u.friendlyId === userId);
    if (idx === -1) throw new Error('Користувача не знайдено');

    users[idx] = {
      ...users[idx],
      isBanned: false,
      banReason: undefined,
      bannedAt: undefined,
    };
    await this.saveAll(users);
    return users[idx];
  }

  async muteUser(
    userId: string,
    durationDays: number = 7,
    reason?: string
  ): Promise<UserProfileRecord> {
    const users = await this.getAll();
    const idx = users.findIndex((u) => u.id === userId || u.friendlyId === userId);
    if (idx === -1) throw new Error('Користувача не знайдено');

    let mutedUntil: string;
    if (durationDays <= 0) {
      mutedUntil = 'permanent';
    } else {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + durationDays);
      mutedUntil = expiry.toISOString();
    }

    users[idx] = {
      ...users[idx],
      isMuted: true,
      muteReason: reason?.trim() || 'Тимчасове обмеження публікації відгуків',
      mutedUntil,
      mutedAt: new Date().toISOString(),
    };
    await this.saveAll(users);
    return users[idx];
  }

  async unmuteUser(userId: string): Promise<UserProfileRecord> {
    const users = await this.getAll();
    const idx = users.findIndex((u) => u.id === userId || u.friendlyId === userId);
    if (idx === -1) throw new Error('Користувача не знайдено');

    users[idx] = {
      ...users[idx],
      isMuted: false,
      muteReason: undefined,
      mutedUntil: undefined,
      mutedAt: undefined,
    };
    await this.saveAll(users);
    return users[idx];
  }

  async deleteUser(userId: string): Promise<void> {
    const users = await this.getAll();
    const filtered = users.filter((u) => u.id !== userId && u.friendlyId !== userId);
    await this.saveAll(filtered);
  }
}

export const userService = new UserService();
