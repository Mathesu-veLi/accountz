import { IPassword } from '@/interfaces/IPassword';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IPasswordObject {
  [key: string]: IPassword[];
}

interface PasswordState {
  passwords: IPasswordObject;
  addPassword: (password: IPassword) => void;
  updatePassword: (newPasswordData: IPassword) => void;
  deletePassword: (id: number) => void;
}

export const usePasswordStore = create<PasswordState>()(
  persist(
    (set) => ({
      passwords: {},
      addPassword: (password: IPassword) => {
        set((state) => ({
          passwords: {
            ...state.passwords,
            [password.website]: state.passwords[password.website]
              ? [...state.passwords[password.website], password]
              : [password],
          },
        }));
      },

      updatePassword: (newPasswordData: IPassword) => {
        set((state) => ({
          passwords: {
            ...state.passwords,
            [newPasswordData.website]: state.passwords[newPasswordData.website].map((password) => {
              if (password.email === newPasswordData.email) return newPasswordData;
              return password;
            })
          }
        }));
      },

      deletePassword: (id: number) => {
        set((state) => ({
          passwords: state.passwords.filter((password) => password.id !== id),
        }));
      },
    }),
    {
      name: 'password',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
