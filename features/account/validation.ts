import { z } from "zod";

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(11, "Enter at least 11 digits")
    .max(14, "Phone number must not be more than 14 digits")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone number"),
});

export type PhoneForm = z.infer<typeof phoneSchema>;