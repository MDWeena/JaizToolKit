import { User } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureStorage } from '.';

type AuthState = {
  user?: User;
  biometricsEnabled?: boolean;
};

type AuthActions = {
  setUser: (user: User) => void;
  clearUser: VoidFunction;
  setBiometricsEnabled: (enabled: boolean) => void;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      biometricsEnabled: false,

      setUser(user) {
        set({ user });
      },
      clearUser() {
        set({ user: undefined });
      },
      setBiometricsEnabled(enabled: boolean) {
        set({ biometricsEnabled: enabled });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);

type LoginState = {
  hasLoggedIn: boolean;
};

type LoginActions = {
  setLoginState: (state: boolean) => void;
};

export const useLoginState = create<LoginState & LoginActions>()((set) => ({
  hasLoggedIn: false,
  setLoginState(state) {
    set({ hasLoggedIn: state });
  },
}));
