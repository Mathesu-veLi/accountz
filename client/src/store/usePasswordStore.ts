import { IPassword } from '@/interfaces/IPassword';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IPasswordObject {
  [key: string]: IPassword[];
}

interface PasswordState {
  passwords: IPasswordObject;
  addPassword: (newPassword: IPassword) => void;
  updatePassword: (newPasswordData: IPassword) => void;
  deletePassword: (website: string, email: string) => void;
}

export const usePasswordStore = create<PasswordState>()(
  persist(
    (set) => ({
      passwords: {},
      addPassword: (newPassword: IPassword) => {
        set((state) => ({
          passwords: {
            ...state.passwords,
            [newPassword.website]: state.passwords[newPassword.website]
              ? [
                  ...state.passwords[newPassword.website],
                  {
                    ...newPassword,
                    id:
                      (state.passwords[newPassword.website].reverse()[0]
                        .id as number) + 1,
                  },
                ]
              : [{ ...newPassword, id: 0 }],
          },
        }));
      },

      updatePassword: (newPasswordData: IPassword) => {
        set((state) => ({
          passwords: {
            ...state.passwords,
            [newPasswordData.website]: state.passwords[
              newPasswordData.website
            ].map((password) => {
              if (password.email === newPasswordData.email)
                return newPasswordData;
              return password;
            }),
          },
        }));
      },

      deletePassword: (website: string, email: string) => {
        set((state) => ({
          passwords: {
            ...state.passwords,
            [website]: state.passwords[website].filter(
              (password) => password.email !== email,
            ),
          },
        }));
      },
    }),
    {
      name: 'password',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
