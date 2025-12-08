import { getBanksUssdCodes } from "@/services/account.service";
import { useQuery } from "@tanstack/react-query";

export const useBanksUssdCodes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["banksUssdCodes"],
    queryFn: getBanksUssdCodes,
    staleTime: 1000 * 60 * 60 * 24, // 24 hour
  });

  const banks = data?.data ?? [];

  // lookup map for easy USSD code retrieval by bank name
  const ussdCodeMap: Record<string, string> = {};
  banks.forEach((bank) => {
    ussdCodeMap[bank.bankName] = bank.ussdTransferCode;
  });

  const getUssdCode = (bankName: string, amount: string, account: string) => {
    const template = ussdCodeMap[bankName];
    if (!template) return "";
    return template
      .replace("AMOUNT", amount)
      .replace("ACCOUNT", account);
  };

  return {
    banks,
    ussdCodeMap,
    getUssdCode,
    isLoading,
    error,
  };
};
