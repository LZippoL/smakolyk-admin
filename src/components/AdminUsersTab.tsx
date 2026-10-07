import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Ban, 
  MessageSquareOff, 
  MessageSquare, 
  Copy, 
  Check, 
  Clock, 
  AlertTriangle, 
  RefreshCw,
  Mail,
  UserCheck
} from 'lucide-react';
import { UserProfileRecord, userService, isUserMutedActive } from '../services/userService';
import { Button } from './Button';
import { Modal } from './Modal';

export const AdminUsersTab: React.FC = () => {
  const [users, setUsers] = useState<UserProfileRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'banned' | 'muted'>('all');
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Ban Modal State
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [selectedUserForBan, setSelectedUserForBan] = useState<UserProfileRecord | null>(null);
  const [banReason, setBanReason] = useState('');

  // Mute Modal State
  const [muteModalOpen, setMuteModalOpen] = useState(false);
  const [selectedUserForMute, setSelectedUserForMute] = useState<UserProfileRecord | null>(null);
  const [muteDurationDays, setMuteDurationDays] = useState<number>(7);
  const [muteReason, setMuteReason] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    try {
      const list = await userService.getAll();
      setUsers(list);
    } catch (e) {
      console.error('Failed to load users:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenBanModal = (user: UserProfileRecord) => {
    setSelectedUserForBan(user);
    setBanReason(user.banReason || 'Порушення правил спільноти');
    setBanModalOpen(true);
  };

  const handleConfirmBan = async () => {
    if (!selectedUserForBan) return;
    try {
      if (selectedUserForBan.isBanned) {
        await userService.unbanUser(selectedUserForBan.id);
        alert('✓ Акаунт успішно розблоковано!');
      } else {
        await userService.banUser(selectedUserForBan.id, banReason);
        alert('✓ Акаунт успішно заблоковано!');
      }
      setBanModalOpen(false);
      setSelectedUserForBan(null);
      await loadUsers();
    } catch (e: any) {
      alert(`Помилка при зміні статусу бану: ${e?.message || 'Не вдалося зберегти'}`);
    }
  };

  const handleOpenMuteModal = (user: UserProfileRecord) => {
    setSelectedUserForMute(user);
    setMuteDurationDays(7);
    setMuteReason(user.muteReason || 'Порушення правил спілкування у коментарях');
    setMuteModalOpen(true);
  };

  const handleConfirmMute = async () => {
    if (!selectedUserForMute) return;
    try {
      if (isUserMutedActive(selectedUserForMute)) {
        await userService.unmuteUser(selectedUserForMute.id);
        alert('✓ Обмеження на коментарі знято!');
      } else {
        await userService.muteUser(selectedUserForMute.id, muteDurationDays, muteReason);
        alert('✓ Обмеження на публікацію коментарів успішно застосовано!');
      }
      setMuteModalOpen(false);
      setSelectedUserForMute(null);
      await loadUsers();
    } catch (e: any) {
      alert(`Помилка при зміні обмеження на коментарі: ${e?.message || 'Не вдалося зберегти'}`);
    }
  };

  // Filter users
  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      u.id.toLowerCase().includes(q) ||
      u.friendlyId.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.displayName.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    const isMuted = isUserMutedActive(u);
    if (statusFilter === 'banned') return u.isBanned;
    if (statusFilter === 'muted') return isMuted && !u.isBanned;
    if (statusFilter === 'active') return !u.isBanned && !isMuted;
    return true;
  });

  const bannedCount = users.filter((u) => u.isBanned).length;
  const mutedCount = users.filter((u) => isUserMutedActive(u) && !u.isBanned).length;
  const activeCount = users.filter((u) => !u.isBanned && !isUserMutedActive(u)).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black">{users.length}</div>
            <div className="text-xs text-stone-500 font-semibold">Всього користувачів</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{activeCount}</div>
            <div className="text-xs text-stone-500 font-semibold">Активні без обмежень</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <MessageSquareOff className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{mutedCount}</div>
            <div className="text-xs text-stone-500 font-semibold">Обмежено коментарі</div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <Ban className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-rose-600 dark:text-rose-400">{bannedCount}</div>
            <div className="text-xs text-stone-500 font-semibold">Заблоковано (Бан)</div>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-stone-900 p-4 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search by ID, Email, Name */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пошук за унікальним ID (UID-XXXX... або UUID), email чи імʼям..."
              className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl outline-none focus:border-brand-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>

          <Button
            onClick={loadUsers}
            variant="outline"
            size="sm"
            className="rounded-2xl shrink-0"
            title="Оновити список"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Оновити</span>
          </Button>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-100 dark:border-stone-800">
          <span className="text-xs font-semibold text-stone-500 mr-1">Фільтр:</span>
          {[
            { id: 'all', label: 'Всі акаунти', count: users.length },
            { id: 'active', label: 'Активні', count: activeCount },
            { id: 'muted', label: 'Обмежені в коментарях', count: mutedCount },
            { id: 'banned', label: 'Заблоковані (Бан)', count: bannedCount }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                statusFilter === f.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <span>{f.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                statusFilter === f.id ? 'bg-white/20 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
              }`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Users List / Cards */}
      {filteredUsers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            {searchQuery ? 'Користувачів за таким запитом не знайдено' : 'Немає користувачів у списку'}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {searchQuery
              ? 'Спробуйте перевірити правильність введеного ID чи email.'
              : 'Користувачі зʼявлятимуться тут автоматично при реєстрації чи вході на сайті.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredUsers.map((u) => {
            const isMuted = isUserMutedActive(u);
            const friendlyId = u.friendlyId;

            return (
              <div
                key={u.id}
                className={`p-5 rounded-3xl bg-white dark:bg-stone-900 border transition-all duration-200 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
                  u.isBanned
                    ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10'
                    : isMuted
                    ? 'border-amber-300 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10'
                    : 'border-stone-200/90 dark:border-stone-800 hover:border-brand-500/40'
                }`}
              >
                {/* User Info */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-sm ${
                    u.isBanned
                      ? 'bg-rose-600'
                      : isMuted
                      ? 'bg-amber-600'
                      : 'bg-gradient-to-tr from-brand-600 to-amber-500'
                  }`}>
                    {u.displayName ? u.displayName[0].toUpperCase() : 'U'}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100 truncate">
                        {u.displayName}
                      </h4>

                      {/* Status Badges */}
                      {u.isBanned ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                          <Ban className="w-3 h-3" />
                          ЗАБЛОКОВАНО
                        </span>
                      ) : isMuted ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          <MessageSquareOff className="w-3 h-3" />
                          КОМЕНТАРІ ОБМЕЖЕНО
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          <ShieldCheck className="w-3 h-3" />
                          Активний
                        </span>
                      )}
                    </div>

                    {/* Email and Identifiers */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-stone-400" />
                        <span className="font-medium text-stone-700 dark:text-stone-300">{u.email}</span>
                      </span>

                      {/* Unique Friendly ID with Copy Button */}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-[11px] font-mono font-bold text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700">
                        <span>ID: {friendlyId}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyId(friendlyId)}
                          className="hover:text-brand-600 transition-colors ml-0.5"
                          title="Скопіювати короткий ID"
                        >
                          {copiedId === friendlyId ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3 text-stone-400" />
                          )}
                        </button>
                      </span>

                      {/* UUID preview */}
                      <span
                        className="hidden sm:inline font-mono text-[10px] text-stone-400 hover:text-stone-600 cursor-pointer truncate max-w-[120px]"
                        title={`Повний UUID: ${u.id}`}
                        onClick={() => handleCopyId(u.id)}
                      >
                        {u.id}
                      </span>
                    </div>

                    {/* Ban / Mute explanations if active */}
                    {u.isBanned && u.banReason && (
                      <div className="text-xs text-rose-700 dark:text-rose-400 flex items-center gap-1 font-medium pt-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Причина блокування: {u.banReason}</span>
                      </div>
                    )}

                    {isMuted && (
                      <div className="text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1 font-medium pt-1">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          Діє до:{' '}
                          {u.mutedUntil === 'permanent'
                            ? 'Назавжди'
                            : new Date(u.mutedUntil!).toLocaleDateString('uk-UA', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                          {u.muteReason ? ` (${u.muteReason})` : ''}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Moderation Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 self-stretch lg:self-center justify-end shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100 dark:border-stone-800">
                  {/* Mute / Unmute Button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenMuteModal(u)}
                    className={`rounded-xl text-xs font-bold ${
                      isMuted
                        ? 'border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                        : 'border-amber-300 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                    }`}
                  >
                    {isMuted ? (
                      <>
                        <MessageSquare className="w-3.5 h-3.5 mr-1" />
                        <span>Зняти обмеження</span>
                      </>
                    ) : (
                      <>
                        <MessageSquareOff className="w-3.5 h-3.5 mr-1" />
                        <span>Заборонити коментарі</span>
                      </>
                    )}
                  </Button>

                  {/* Ban / Unban Button */}
                  <Button
                    type="button"
                    variant={u.isBanned ? 'secondary' : 'danger'}
                    size="sm"
                    onClick={() => handleOpenBanModal(u)}
                    className="rounded-xl text-xs font-bold"
                  >
                    {u.isBanned ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                        <span>Розблокувати</span>
                      </>
                    ) : (
                      <>
                        <Ban className="w-3.5 h-3.5 mr-1" />
                        <span>Бан акаунту</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* BAN MODAL */}
      <Modal
        isOpen={banModalOpen}
        onClose={() => setBanModalOpen(false)}
        title={selectedUserForBan?.isBanned ? 'Розблокування акаунту' : 'Блокування (Бан) акаунту'}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1 text-xs">
            <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              {selectedUserForBan?.displayName}
            </div>
            <div className="text-stone-500">Email: {selectedUserForBan?.email}</div>
            <div className="font-mono text-stone-600 dark:text-stone-400">
              ID: {selectedUserForBan?.friendlyId}
            </div>
          </div>

          {!selectedUserForBan?.isBanned ? (
            <div className="space-y-3">
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Заблокований користувач бачитиме статус блокування у власному кабінеті та не зможе публікувати нові відгуки.
              </p>
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Причина блокування:
                </label>
                <input
                  type="text"
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  placeholder="Наприклад: спам, образлива поведінка, порушення правил"
                  className="w-full h-11 px-3.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl outline-none focus:border-rose-500"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Ви впевнені, що бажаєте зняти блокування з цього акаунту? Користувач знову отримає повний доступ.
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setBanModalOpen(false)}>
              Скасувати
            </Button>
            <Button
              variant={selectedUserForBan?.isBanned ? 'primary' : 'danger'}
              onClick={handleConfirmBan}
            >
              {selectedUserForBan?.isBanned ? 'Підтвердити розблокування' : 'Заблокувати акаунт'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* MUTE (COMMENT RESTRICTION) MODAL */}
      <Modal
        isOpen={muteModalOpen}
        onClose={() => setMuteModalOpen(false)}
        title={
          selectedUserForMute && isUserMutedActive(selectedUserForMute)
            ? 'Зняти обмеження на коментарі'
            : 'Тимчасова заборона на коментарі'
        }
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1 text-xs">
            <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">
              {selectedUserForMute?.displayName}
            </div>
            <div className="text-stone-500">Email: {selectedUserForMute?.email}</div>
            <div className="font-mono text-stone-600 dark:text-stone-400">
              ID: {selectedUserForMute?.friendlyId}
            </div>
          </div>

          {selectedUserForMute && !isUserMutedActive(selectedUserForMute) ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Тривалість заборони на публікацію коментарів:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { days: 1, label: '1 день' },
                    { days: 3, label: '3 дні' },
                    { days: 7, label: '7 днів' },
                    { days: 14, label: '14 днів' },
                    { days: 30, label: '30 днів' },
                    { days: 0, label: 'Назавжди' }
                  ].map((opt) => (
                    <button
                      key={opt.days}
                      type="button"
                      onClick={() => setMuteDurationDays(opt.days)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        muteDurationDays === opt.days
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 ring-2 ring-amber-500/20'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-400'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  Причина обмеження (висвітлюється користувачеві в профілі):
                </label>
                <input
                  type="text"
                  value={muteReason}
                  onChange={(e) => setMuteReason(e.target.value)}
                  placeholder="Наприклад: ненормативна лексика, флуд, неправдиві відгуки"
                  className="w-full h-11 px-3.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl outline-none focus:border-amber-500"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Ви впевнені, що бажаєте зняти обмеження на коментарі для цього користувача? Він знову зможе писати відгуки до рецептів.
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setMuteModalOpen(false)}>
              Скасувати
            </Button>
            <Button
              variant={
                selectedUserForMute && isUserMutedActive(selectedUserForMute)
                  ? 'primary'
                  : 'secondary'
              }
              onClick={handleConfirmMute}
              className={
                selectedUserForMute && !isUserMutedActive(selectedUserForMute)
                  ? 'bg-amber-600 hover:bg-amber-700 text-white border-transparent'
                  : ''
              }
            >
              {selectedUserForMute && isUserMutedActive(selectedUserForMute)
                ? 'Зняти обмеження'
                : 'Застосувати заборону'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
