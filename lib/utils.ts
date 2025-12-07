import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
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

export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}
