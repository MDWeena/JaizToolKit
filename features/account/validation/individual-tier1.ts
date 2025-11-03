import { z } from "zod";

// Step 1: Verification
export const step1Schema = z.object({
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Data Privacy Policy",
  }),
  mobileNumber: z
    .string()
    .trim()
    .min(10, "Enter at least 10 digits")
    .max(11, "Phone number must not be more than 11 digits")
    .regex(/^[0-9+\s()-]+$/, "Invalid phone number").transform(val => sanitizePhone(val)),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
});

// Step 2: Personal Details (with conditional BVN/NIN)
export const step2SchemaBase = z.object({
  idType: z.enum(["bvn", "nin"], {
    required_error: "Please select BVN or NIN",
  }),
  bvn: z.string().optional(),
  nin: z.string().optional(),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Please select a valid date",
  }),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters"),
  middleName: z
    .string()
    .trim()
    .max(50, "Middle name is too long")
    .regex(/^[a-zA-Z\s'-]*$/, "Middle name can only contain letters")
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters"),
});

export const step2Schema = step2SchemaBase.superRefine((data, ctx) => {
  if (data.idType === "bvn") {
    if (!data.bvn || data.bvn.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "BVN must be at least 10 digits",
        path: ["bvn"],
      });
    }
  } else {
    if (!data.nin || data.nin.length < 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "NIN must be at least 11 digits",
        path: ["nin"],
      });
    }
  }
});

// Step 3: Address and Additional Info
export const step3Schema = z.object({
  gender: z.string().min(1, "Gender is required"),
  mothersMaidenName: z
    .string()
    .trim()
    .min(2, "Mother's maiden name must be at least 2 characters")
    .max(100, "Mother's maiden name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Mother's maiden name can only contain letters"),
  stateOfOrigin: z.string().min(1, "State of origin is required"),
  lgaOfOrigin: z.string().min(1, "LGA of origin is required"),
  residentialAddress: z
    .string()
    .trim()
    .min(10, "Residential address must be at least 10 characters")
    .max(200, "Residential address is too long"),
  stateOfResidence: z.string().min(1, "State of residence is required"),
  lgaOfResidence: z.string().min(1, "LGA of residence is required"),
  cityOfResidence: z.string().min(1, "City of residence is required"),
});

// Step 4: Documents and Funding
export const step4Schema = z.object({
  bank: z.string().min(1, "Please select a bank"),
  amount: z.string().min(1, "Amount is required"),
  passportPhotograph: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Passport photograph is required",
  }),
  signature: z.any().refine((val) => val !== null && val !== undefined, {
    message: "Signature is required",
  }),
});

// Combined schema
export const individualTier1Schema = step1Schema
  .merge(step2SchemaBase)
  .merge(step3Schema)
  .merge(step4Schema);

export type IndividualTier1FormData = z.infer<typeof individualTier1Schema>;

// Field groups for step validation
export const step1Fields: (keyof IndividualTier1FormData)[] = [
  "agreement",
  "mobileNumber",
  "otp",
];

export const step2Fields: (keyof IndividualTier1FormData)[] = [
  "idType",
  "bvn",
  "nin",
  "dateOfBirth",
  "email",
  "firstName",
  "middleName",
  "lastName",
];

export const step3Fields: (keyof IndividualTier1FormData)[] = [
  "gender",
  "mothersMaidenName",
  "stateOfOrigin",
  "lgaOfOrigin",
  "residentialAddress",
  "stateOfResidence",
  "lgaOfResidence",
  "cityOfResidence",
];

export const step4Fields: (keyof IndividualTier1FormData)[] = [
  "bank",
  "amount",
  "passportPhotograph",
  "signature",
];

// Sanitization helpers
export const sanitizePhone = (input: string) =>
  input.replace(/[^0-9+\s()-]/g, "");

export const sanitizeName = (input: string) =>
  input.replace(/\s+/g, " ").trim();

export const sanitizeBVN = (input: string) => input.replace(/\D/g, "");

export const sanitizeNIN = (input: string) => input.replace(/\D/g, "");

export const sanitizeEmail = (input: string) => input.trim().toLowerCase();

// Default values
export const getDefaultValues = (): Partial<IndividualTier1FormData> => ({
  agreement: false,
  mobileNumber: "",
  otp: "",
  idType: "bvn",
  bvn: "",
  nin: "",
  email: "",
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  mothersMaidenName: "",
  stateOfOrigin: "",
  lgaOfOrigin: "",
  residentialAddress: "",
  stateOfResidence: "",
  lgaOfResidence: "",
  cityOfResidence: "",
  bank: "",
  amount: "",
  passportPhotograph: null,
  signature: null,
});

