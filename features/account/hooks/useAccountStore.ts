import { VerifyAccountData } from "@/types/api";
import { create } from "zustand";

interface AccountState {
    verifiedAccounts: VerifyAccountData[] | null;
    setVerifiedAccounts: (accounts: VerifyAccountData[]) => void;
    clearAccounts: () => void;
}

export const useAccountStore = create<AccountState>((set) => ({
    verifiedAccounts: null,
    setVerifiedAccounts: (accounts) => set({ verifiedAccounts: accounts }),
    clearAccounts: () => set({ verifiedAccounts: null }),
}));
