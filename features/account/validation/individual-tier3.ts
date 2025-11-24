import { FileUpload } from "@/types/file-upload";
import { ICountry } from "react-native-international-phone-number";
import { isValidPhoneNumber } from "react-native-international-phone-number";
import { z } from "zod";

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


// Step 1: Verification and Personal Details
export const step2Schema = z.object({
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
export const step3Schema = z.object({
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
});

// Step 3: Next of Kin and Account Details
export const step4Schema = z.object({
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
export const step5Schema = z.object({
  bank: z.string().min(1, "Please select a bank"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Amount must be a valid number")
    .refine(
      (val) => parseFloat(val) >= 100,
      { message: "Minimum amount is ₦100" }
    ),
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
  .and(step2Schema)
  .and(step3Schema)
  .and(step4Schema)
  .and(step5Schema);

export type IndividualTier3FormData = z.infer<typeof individualTier3Schema>;

export const step1Fields: (keyof IndividualTier3FormData)[] = [
  "selectedCountry",
  "mobileNumber",
  "otp",
];

// Field groups for step validation
export const step2Fields: (keyof IndividualTier3FormData)[] = [
  "email",
  "bvn",
  "nin",
  "firstName",
  "middleName",
  "lastName",
];

export const step3Fields: (keyof IndividualTier3FormData)[] = [
  "gender",
  "maritalStatus",
  "mothersMaidenName",
  "stateOfOrigin",
  "lgaOfOrigin",
  "residentialAddress",
  "stateOfResidence",
  "lgaOfResidence"
];

export const step4Fields: (keyof IndividualTier3FormData)[] = [
  "nextOfKinFullName",
  "nextOfKinMobileNumber",
  "nextOfKinRelationship",
  "nextOfKinDateOfBirth",
  "annualTurnover",
  "purposeOfAccountOpening",
];

export const step5Fields: (keyof IndividualTier3FormData)[] = [
  "bank",
  "amount",
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
  agreement: true,
  mobileNumber: "8123456789",
  otp: "123456",
  email: "Adeoluwa@gmail.com",
  bvn: "12345678901",
  nin: "12345678901",
  firstName: "John",
  middleName: "",
  lastName: "Doe",
  gender: "male",
  maritalStatus: "single",
  mothersMaidenName: "Jane Doe",
  stateOfOrigin: "Lagos",
  lgaOfOrigin: "Lagos",
  residentialAddress: "123 Main St, Lagos",
  stateOfResidence: "Lagos",
  lgaOfResidence: "Lagos",
  nextOfKinFullName: "John Doe",
  nextOfKinMobileNumber: "08123456789",
  nextOfKinRelationship: "brother",
  nextOfKinDateOfBirth: undefined,
  annualTurnover: "1000000",
  purposeOfAccountOpening: "Business",
  bank: "044",
  amount: "1000000",
  validId: null,
  passportPhotograph: null,
  utilityBill: null,
  signature: null,
  kyc: null,
  edd: null,
  riskAssessmentForm: null,
});

