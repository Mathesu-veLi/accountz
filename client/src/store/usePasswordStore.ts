import { IPassword } from '@/interfaces/IPassword';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PasswordState {
  passwords: IPassword[];
  addPassword: (password: IPassword) => void;
  updatePassword: (newPasswordData: IPassword) => void;
  deletePassword: (id: number) => void;
}

export const usePasswordStore = create<PasswordState>()(
  persist(
    (set) => ({
      passwords: [],
      addPassword: (password: IPassword) => {
        set((state) => ({
          passwords: [
            ...state.passwords,
            {
              id:
                state.passwords.length > 0
                  ? Number(state.passwords.reverse()[0]) + 1
                  : 0,
              ...password,
            },
          ],
        }));
      },

      updatePassword: (newPasswordData: IPassword) => {
        set((state) => ({
          passwords: state.passwords.map((actualPassword) => {
            if (actualPassword.id === newPasswordData.id)
              return newPasswordData;

            return actualPassword;
          }),
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
