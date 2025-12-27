import { User } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { secureStorage } from '.';

type AuthState = {
  user?: User;
  biometricsEnabled?: boolean;
  returnPath?: string;
};

type AuthActions = {
  setUser: (user: User) => void;
  clearUser: VoidFunction;
  clearAccessToken: VoidFunction;
  setBiometricsEnabled: (enabled: boolean) => void;
  setReturnPath: (path: string) => void;
  clearReturnPath: VoidFunction;
};

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      biometricsEnabled: false,
      returnPath: undefined,

      setUser(user) {
        set({ user });
      },
      clearUser() {
        set({ user: undefined });
      },
      clearAccessToken() {
        set((state) => ({
          user: state.user ? { ...state.user, accessToken: undefined } : undefined
        }));
      },
      setBiometricsEnabled(enabled: boolean) {
        set({ biometricsEnabled: enabled });
      },
      setReturnPath(path: string) {
        set({ returnPath: path });
      },
      clearReturnPath() {
        set({ returnPath: undefined });
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
