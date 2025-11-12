import { FileUpload } from "@/types/file-upload";
import { z } from "zod";

// Step 1: Verification and Personal Details
export const step1Schema = z.object({
  agreement: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Data Privacy Policy",
  }),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, "Phone number must be numeric")
    .length(11, "Phone number must be exactly 11 digits"),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),
  bvn: z
    .string()
    .trim()
    .length(11, "BVN must be exactly 11 digits")
    .regex(/^\d+$/, "BVN must be numeric"),
  nin: z
    .string()
    .trim()
    .min(11, "NIN must be at least 11 digits")
    .max(11, "NIN must be exactly 11 digits")
    .regex(/^\d+$/, "NIN must be numeric"),
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

// Step 2: Address and Additional Info
export const step2Schema = z.object({
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
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

// Step 3: Next of Kin and Account Details
export const step3Schema = z.object({
  nextOfKinFullName: z
    .string()
    .trim()
    .min(2, "Next of kin full name must be at least 2 characters")
    .max(100, "Next of kin full name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Next of kin full name can only contain letters"),
  nextOfKinMobileNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, "Phone number must be numeric")
    .length(11, "Phone number must be exactly 11 digits"),
  nextOfKinRelationship: z
    .string()
    .trim()
    .min(2, "Relationship must be at least 2 characters")
    .max(50, "Relationship is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Relationship can only contain letters"),
  nextOfKinDateOfBirth: z
    .date({
      required_error: "Next of kin date of birth is required",
      invalid_type_error: "Please select a valid date",
    })
    .refine(
      (date) => {
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        const dayDiff = today.getDate() - date.getDate();
        const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
        return actualAge >= 0 && actualAge <= 120;
      },
      { message: "Please enter a valid date of birth" }
    ),
  annualTurnover: z
    .string()
    .trim()
    .min(1, "Annual turnover is required")
    .regex(/^[\d,]+$/, "Annual turnover must be a valid number"),
  purposeOfAccountOpening: z
    .string()
    .trim()
    .min(10, "Purpose of account opening must be at least 10 characters")
    .max(500, "Purpose of account opening is too long"),
});

// Step 4: Documents
export const step4Schema = z.object({
  validId: z.custom<FileUpload>((val) => val !== null && val !== undefined, {
    message: "Valid ID is required",
  }),
  passportPhotograph: z.custom<FileUpload>((val) => val !== null && val !== undefined, {
    message: "Passport photograph is required",
  }),
  utilityBill: z.custom<FileUpload>((val) => val !== null && val !== undefined, {
    message: "Utility bill is required",
  }),
  signature: z.custom<FileUpload>((val) => val !== null && val !== undefined, {
    message: "Signature is required",
  }),
  kyc: z.custom<FileUpload>((val) => val !== null && val !== undefined, {
    message: "KYC document is required",
  }),
    edd: z.custom<FileUpload>((val) => val !== null && val !== undefined, {
    message: "EDD document is required",
  }),
  riskAssessmentForm: z.custom<FileUpload>((val) => val !== null && val !== undefined, {
    message: "Risk assessment form is required",
  }),
});

// Combined schema
export const individualTier3Schema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type IndividualTier3FormData = z.infer<typeof individualTier3Schema>;

// Field groups for step validation
export const step1Fields: (keyof IndividualTier3FormData)[] = [
  "agreement",
  "mobileNumber",
  "otp",
  "email",
  "bvn",
  "nin",
  "firstName",
  "middleName",
  "lastName",
];

export const step2Fields: (keyof IndividualTier3FormData)[] = [
  "gender",
  "maritalStatus",
  "mothersMaidenName",
  "stateOfOrigin",
  "lgaOfOrigin",
  "residentialAddress",
  "stateOfResidence",
  "lgaOfResidence",
  "cityOfResidence",
];

export const step3Fields: (keyof IndividualTier3FormData)[] = [
  "nextOfKinFullName",
  "nextOfKinMobileNumber",
  "nextOfKinRelationship",
  "nextOfKinDateOfBirth",
  "annualTurnover",
  "purposeOfAccountOpening",
];

export const step4Fields: (keyof IndividualTier3FormData)[] = [
  "validId",
  "passportPhotograph",
  "utilityBill",
  "signature",
  "kyc",
  "edd",
  "riskAssessmentForm",
];

// Default values
export const getDefaultValues = (): Partial<IndividualTier3FormData> => ({
  agreement: false,
  mobileNumber: "",
  otp: "",
  email: "",
  bvn: "",
  nin: "",
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  maritalStatus: "",
  mothersMaidenName: "",
  stateOfOrigin: "",
  lgaOfOrigin: "",
  residentialAddress: "",
  stateOfResidence: "",
  lgaOfResidence: "",
  cityOfResidence: "",
  nextOfKinFullName: "",
  nextOfKinMobileNumber: "",
  nextOfKinRelationship: "",
  nextOfKinDateOfBirth: undefined,
  annualTurnover: "",
  purposeOfAccountOpening: "",
  validId: undefined,
  passportPhotograph: undefined,
  utilityBill: undefined,
  signature: undefined,
  kyc: undefined,
  edd: undefined,
  riskAssessmentForm: undefined,
});

