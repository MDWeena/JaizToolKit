import { VerifyAccountData } from "@/types/api";
import { create } from "zustand";

interface OpenedAccount {
    accountName: string;
    accountNumber: string;
    ussdString?: string;
}

interface AccountState {
    verifiedAccounts: VerifyAccountData[] | null;
    openedAccount: OpenedAccount | null;
    setVerifiedAccounts: (accounts: VerifyAccountData[]) => void;
    setOpenedAccount: (account: OpenedAccount) => void;
    clearAccounts: () => void;
    clearOpenedAccount: () => void;
}

export const useAccountStore = create<AccountState>((set) => ({
    verifiedAccounts: null,
    openedAccount: null,
    setVerifiedAccounts: (accounts) => set({ verifiedAccounts: accounts }),
    setOpenedAccount: (account) => set({ openedAccount: account }),
    clearAccounts: () => set({ verifiedAccounts: null }),
    clearOpenedAccount: () => set({ openedAccount: null }),
}));