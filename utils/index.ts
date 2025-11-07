export const sanitizePhone = (input: string) => input.replace(/\D/g, "");

export const sanitizeName = (input: string) =>
  input
    .replace(/[^a-zA-Z\s'-]/g, "") // Remove invalid characters
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

export const sanitizeBVN = (input: string) => input.replace(/\D/g, "");

export const sanitizeNIN = (input: string) => input.replace(/\D/g, "");

export const sanitizeEmail = (input: string) => input.trim().toLowerCase();
