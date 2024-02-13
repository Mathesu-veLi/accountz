import { IPassword } from '@/interfaces/IPassword';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PasswordState {
  passwords: IPassword[];
  addPassword: (password: IPassword) => void;
  deletePassword: (email: string) => void;
}

export const usePasswordStore = create<PasswordState>()(
  persist(
    (set) => ({
      passwords: [],
      addPassword: (password: IPassword) => {
        set((state) => ({
          passwords: [...state.passwords, {
            id: state.passwords.length > 0 ? Number(state.passwords.reverse()[0]) + 1 : 0,
            ...password
          }],
        }));
      },
        }));
      },
      deletePassword: (email: string) => {
        set((state) => ({
          passwords: state.passwords.filter(
            (password) => password.email !== email,
          ),
        }));
      },
    }),
    {
      name: 'password',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
