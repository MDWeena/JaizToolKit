import { GroupedTransactions, Transaction } from "@/types/api";
import { type ClassValue, clsx } from "clsx";
import {
  compareDesc,
  format,
  isToday,
  isYesterday,
  startOfDay,
} from "date-fns";
import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getOrCreateDeviceId() {
  let id = await SecureStore.getItemAsync("device-id");
  if (!id) {
    id = Crypto.randomUUID();
    await SecureStore.setItemAsync("device-id", id);
  }
  return id;
}

export function formatDate(date: Date | string) {
  return format(new Date(date), "dd-MM-yyyy");
}

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

export function hideEmailPartsWithAsterisks(email: string): string {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 3) {
    return "*".repeat(localPart.length) + "@" + domain;
  }
  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  const hiddenPart = "*".repeat(localPart.length - 3);
  return `${firstChar}${hiddenPart}${lastChar}@${domain}`;
}

export function groupTransactionsByDay(
  transactions: Transaction[]
): GroupedTransactions[] {
  const groups = new Map<number, Transaction[]>();

  transactions.forEach((tx) => {
    const date = startOfDay(new Date(tx.transDate)).getTime();

    if (!groups.has(date)) {
      groups.set(date, []);
    }
    groups.get(date)!.push(tx);
  });

  return Array.from(groups.entries())
    .sort(([a], [b]) => compareDesc(a, b)) // desc by day
    .map(([day, txs]) => {
      const dateObj = new Date(day);

      const label = isToday(dateObj)
        ? "Today"
        : isYesterday(dateObj)
          ? "Yesterday"
          : format(dateObj, "dd/MM/yyyy");

      return {
        date: label,
        transactions: txs.sort((a, b) =>
          compareDesc(new Date(a.transDate), new Date(b.transDate))
        ),
      };
    });
}
