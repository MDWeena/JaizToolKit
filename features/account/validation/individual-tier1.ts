import { FileUpload } from "@/types/file-upload";
import {
  getCountryByCca2,
  ICountry,
  isValidPhoneNumber,
} from "react-native-international-phone-number";
import { z } from "zod";

// Step 1: Verification
export const step1Schema = z
  .object({
    agreement: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Data Privacy Policy",
    }),

    selectedCountry: z.custom<ICountry>().optional(),

    mobileNumber: z.string().trim().min(1, "Phone number is required"),

    otp: z
      .string()
      .length(6, "OTP must be 6 digits")
      .regex(/^\d+$/, "OTP must be numeric"),
  })
  .superRefine((data, ctx) => {
    const { mobileNumber, selectedCountry } = data;

    if (!selectedCountry) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["selectedCountry"],
        message: "Please select a country.",
      });
      return;
    }

    // Validate phone number using selected country
    const isValid = isValidPhoneNumber(mobileNumber, selectedCountry);

    if (!isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mobileNumber"],
        message: "Invalid phone number for the selected country.",
      });
    }
    if (
      selectedCountry &&
      selectedCountry.cca2 === "NG" &&
      mobileNumber &&
      mobileNumber.replace(/\D/g, "").length !== 10
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["mobileNumber"],
        message: "Phone number must be 10 digits for this country.",
      });
    }
  });


// Step 2: Personal Details (with conditional BVN/NIN using discriminated union)
// Common fields for both BVN and NIN cases
const step2CommonFields = {
  dateOfBirth: z
    .date({
      required_error: "Date of birth is required",
      invalid_type_error: "Please select a valid date",
    })
    .refine(
      (date) => {
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        const dayDiff = today.getDate() - date.getDate();
        const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
        return actualAge >= 18 && actualAge <= 120;
      },
      { message: "You must be at least 18 years old and not more than 120 years old" }
    ),
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
};

// BVN schema with common fields
const bvnSchema = z.object({
  idType: z.literal("bvn"),
  bvn: z
    .string()
    .trim()
    .length(11, "BVN must be exactly 11 digits")
    .regex(/^\d+$/, "BVN must be numeric"),
  nin: z.undefined(),
  ...step2CommonFields,
});

// NIN schema with common fields
const ninSchema = z.object({
  idType: z.literal("nin"),
  nin: z
    .string()
    .trim()
    .length(11, "NIN must be exactly 11 digits")
    .regex(/^\d+$/, "NIN must be numeric"),
  bvn: z.undefined(),
  ...step2CommonFields,
});

// Discriminated union for idType
export const step2Schema = z.discriminatedUnion("idType", [bvnSchema, ninSchema]);


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
});

// Step 4: Documents and Funding
export const step4Schema = z.object({
  bank: z.string().min(1, "Please select a bank"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
    .refine(
      (val) => parseFloat(val) >= 100,
      { message: "Minimum amount is ₦100" }
    ),
  passportPhotograph: z.custom<FileUpload>((val) => val !== null && val !== undefined, {
    message: "Passport photograph is required",
  }),
  signature: z.custom<FileUpload>((val) => val !== null && val !== undefined, {
    message: "Signature is required",
  }),
});

// Combined schema - use intersection for discriminated union
export const individualTier1Schema = step1Schema
  .and(step2Schema)
  .and(step3Schema)
  .and(step4Schema)

export type IndividualTier1FormData = z.infer<typeof individualTier1Schema>;

// Field groups for step validation
export const step1Fields: (keyof IndividualTier1FormData)[] = [
  "agreement",
  "mobileNumber",
  "otp",
  "selectedCountry",
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
  "lgaOfResidence"
];

export const step4Fields: (keyof IndividualTier1FormData)[] = [
  "bank",
  "amount",
  "passportPhotograph",
  "signature",
  "selectedCountry",
];


export const getDefaultValues = (): Partial<IndividualTier1FormData> => ({
  agreement: false,
  mobileNumber: "",
  otp: "",
  idType: "bvn",
  bvn: "",
  nin: undefined,
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
  bank: "",
  amount: "",
  passportPhotograph: null,
  signature: null,
  selectedCountry: getCountryByCca2("NG"),
});

