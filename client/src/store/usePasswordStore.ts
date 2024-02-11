import { IPassword } from '@/interfaces/IPassword';
import { create } from 'zustand';

interface PasswordState {
  passwords: IPassword[];
  addPassword: (password: IPassword) => void;
  deletePassword: (email: string) => void;
}

export const usePasswordStore = create<PasswordState>()((set) => ({
  passwords: [],
  addPassword: (password: IPassword) => {
    set((state) => ({
      passwords: [...state.passwords, password],
    }));
  },
  deletePassword: (email: string) => {
    set((state) => ({
      passwords: state.passwords.filter((password) => password.email !== email),
    }));
  },
}));
