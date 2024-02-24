import { IAccount } from '@/interfaces/IAccount';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  accounts?: Record<string, IAccount[]>;
  setAccounts: (accounts: Record<string, IAccount[]>) => void;
  reset: () => void;
}

const initialState = {
  accounts: undefined,
};

export const useAccountStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setAccounts: (accounts: Record<string, IAccount[]>) => set({ accounts }),
      reset: () => set(initialState),
    }),
    {
      name: 'accounts',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
