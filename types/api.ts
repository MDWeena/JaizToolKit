import { NameForm, PhoneForm } from "@/features/account/validation";

export interface ApiResponse<T> {
  status: "Success" | "Failed";
  message: string;
  code: number;
  data: T | null;
  timestamp: string;
  traceId: string;
}

export interface SendProspectOTPRequest {
  prospectDetails: {
    type: "IND";
    tier: 1;
  };
  country: string;
  phone: string;
}
export interface SendProspectOTPData {
  prospect: {
    id: string;
  };
}

export interface VerifyOTPRequest {
  OTP: string;
}

// Base request for identity verification (BVN/NIN)
interface VerifyIdentityBaseRequest {
  prospectId: string;
  dob: Date;
  email: string;
}

export interface VerifyBvnRequest extends VerifyIdentityBaseRequest {
  bvn: string;
}

export interface VerifyNinRequest extends VerifyIdentityBaseRequest {
  nin: string;
}

export type VerifyIdentityRequest = VerifyBvnRequest | VerifyNinRequest;

export interface VerifyBvnData {
  base64Image: string;
  bvn: string;
  dateOfBirth: string;
  email: string;
  enrollmentBank: string;
  enrollmentBranch: string;
  firstName: string;
  gender: string;
  lastName: string;
  localGovernmentOfOrigin: string | null;
  localGovernmentOfResidence: string | null;
  maritalStatus: string;
  middleName: string;
  nameOnCard: string;
  nationalIdentificationNumber: string | null;
  nationality: string;
  phoneNumber1: string;
  phoneNumber2: string;
  registrationDate: string;
  requestId: string;
  residentialAddress: string;
  responseCode: string;
  responseMessage: string;
  stateOfOrigin: string;
  stateOfResidence: string;
  title: string;
  watchListed: string;
}

export interface VerifyNinData {
  birthdate: string;
  firstName: string;
  gender: string;
  middleName: string;
  nin: string;
  otherName: string;
  photoBase64: string;
  requestId: string;
  residenceAddressLine1: string;
  responseCode: string;
  responseMessage: string;
  surName: string;
  telephoneNo: string;
}

export interface UpdateAddressDetailsRequest {
  gender: string;
  mothersmaidenname: string;
  origin: {
    state: string;
    lga: string;
  };
  residence: {
    addressline: string;
    state: string;
    lga: string;
  };
}

export interface SubmitProspectRequest {
  Id: string;
}
export interface SubmitProspectData {
  customer: {
    accountname: string;
    accountnumber: string;
  };
}

export type VerifyAccountRequest = NameForm | PhoneForm

export interface VerifyAccountData {
  accountName: string;
  accountNumber: string;
  branchCodeCif: string; // e.g., "123/123456789"
  bvn: string;
  idType: string;
  branch: string;
  accountType: string;
  currency: string;
  accountOfficer: string; // e.g., "FG000123 | MICHAEL JOHN"
};

