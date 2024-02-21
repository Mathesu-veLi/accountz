import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  user: IUser;
  token: string;
  setUser: (user: IUser) => void;
  setToken: (token: string) => void;
  reset: () => void;
}

const initialState = {
  user: { id: 0, name: '', email: '' },
  token: '',
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user: IUser) => set({ user }),
      setToken: (token: string) => set({ token }),
      reset: () => set(initialState),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
