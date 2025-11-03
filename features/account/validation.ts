import { z } from "zod";

export const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Enter at least 10 digits")
    .max(15, "Phone number must not be more than 15 digits")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone number"),
});

export const nameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Enter full name")
    .max(100, "Too long"),
});

export const sanitizePhone = (input: string) =>
  input.replace(/[^0-9+\s()-]/g, "");

export const sanitizeName = (input: string) =>
  input.replace(/\s+/g, " ").trim();

export type PhoneForm = z.infer<typeof phoneSchema>;
export type NameForm = z.infer<typeof nameSchema>;

export type VerifyInput =
  | ({ mode: "phone" } & PhoneForm)
  | ({ mode: "name" } & NameForm);

export const verifySchema = z.discriminatedUnion("mode", [
  phoneSchema.extend({ mode: z.literal("phone") }),
  nameSchema.extend({ mode: z.literal("name") }),
]);

// Officer details schema
export const officerSchema = z.object({
  officerCode: z
    .string()
    .trim()
    .min(2, "Enter a valid code")
    .max(20, "Too long")
    .regex(/^[A-Za-z0-9-]+$/, "Only letters, numbers and hyphen"),
  teamName: z.string().trim().min(2, "Enter team name").max(100, "Too long"),
});

export type OfficerForm = z.infer<typeof officerSchema>;
