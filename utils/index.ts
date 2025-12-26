import { FileUpload } from "@/types/file-upload";
import { StateOption } from "@/types/api";

export const normalizeStateName = (stateName: string | null): string => {
  if (!stateName) return "";
  return stateName.replace(/\s*State$/i, "").trim();
};

export const findStateCodeByName = (
  stateName: string | null,
  states: StateOption[]
): string => {
  if (!stateName || states.length === 0) return "";

  const normalized = normalizeStateName(stateName).toLowerCase();
  const state = states.find((s) => s.name.toLowerCase() === normalized);
  return state?.code || "";
};

export const base64ToFileUpload = (
  base64String: string,
  fileName: string = "passport.jpg"
): FileUpload => {
  if (!base64String) return null;

  const uri = `data:image/jpeg;base64,${base64String}`;
  const estimatedSize = Math.round((base64String.length * 3) / 4);
  return {
    uri,
    type: "image/jpeg",
    name: fileName,
    size: estimatedSize,
  };
};


export const sanitizePhone = (input: string) => input.replace(/\D/g, "");

export const sanitizeName = (input: string) =>
  input
    .replace(/[^a-zA-Z\s'-]/g, "") // Remove invalid characters
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

export const sanitizeBVN = (input: string) => input.replace(/\D/g, "");

export const sanitizeNIN = (input: string) => input.replace(/\D/g, "");

export const sanitizeEmail = (input: string) => input.trim().toLowerCase();