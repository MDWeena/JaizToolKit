import { PhoneForm } from "@/features/account/validation";

export interface ApiResponse<T> {
  status: "Success" | "Failed";
  message: string;
  code: number;
  data: T | null;
  timestamp: string;
  traceId: string;
}

export interface ApiError {
  message: string;
  status: number;
  data?: unknown;
}

export interface LocationOption {
  code: string;
  name: string;
}

export interface BankOption {
  bankName: string;
  ussdTransferCode: string;
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

export type VerifyAccountRequest = PhoneForm;

export interface VerifyAccountData {
  accountName: string;
  accountNumber: string;
  cif: string;
  branchCode: string;
  bvn: string;
  idType: string;
  branch: string;
  accountType: string;
  currency: string;
  accountOfficerId: string;
  accountOfficerName: string;
}

export interface LoginData {
  staffid: string;
  password: string;
  deviceId?: string;
}

export interface LoginResponse {
  expiresIn: number;
  token: string;
  user: {
    email: string;
    id: string;
    name: string;
  };
}

export interface LinkBVNData {
  bvn: string;
  accountNumber: string;
  dob: string;
  firstname: string;
  lastname: string;
  phone: string;
}

export interface LinkNINData {
  nin: string;
  accountNumber: string;
  dob: string;
  firstname: string;
  lastname: string;
  phone: string;
}

export interface GetCustomerDetails {
  dob: string;
  accountNumber: string;
}

export interface CustomerDetails {
  accountname: string;
  phone: string;
  firstname: string;
  lastname: string;
}

export interface CustomerDetailsWithAccountNumberResponse {
  accountName: string;
  dateOfBirth: Date;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface CustomerBalance {
  accountNumber: string;
  accountName: string;
  availableBalance: number;
  clearedBalance: number;
  unclearedBalance: number;
  bookBalance: number;
  totalBlockedFunds: number;
}

export interface Transaction {
  transDate: string;
  narration: string;
  amount: number;
  transType: "CR" | "DR";
  isMobileTransaction: boolean;
  transactionRef: string;
}

export interface GroupedTransactions {
  date: string;
  transactions: Transaction[];
}

export interface GetCustomerDetailsResponse {
  accountNumber: string;
  accountName: string;
  phone: string;
  email: string;
  accountType: string;
  accountManager: string;
  address: string;
  accountOpenDate: string;
  marketingID: string;
  status: string;
  occupation: string;
}

export interface TransactionHistoryQuery {
  accountNumber: string;
  startDate: Date | string;
  endDate: Date | string;
}

export interface SendStatementDto {
  accountNumber: string;
  startDate: Date | string;
  endDate: Date | string;
  email: string;
}
