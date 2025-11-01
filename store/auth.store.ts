import { User } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureStorage } from '.';

type AuthState = {
  user?: User;
};

type AuthActions = {
  setUser: (user: User) => void;
  clearUser: VoidFunction;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      setUser(user) {
        set({ user });
      },
      clearUser() {
        set({ user: undefined });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
