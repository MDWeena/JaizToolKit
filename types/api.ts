export interface ApiResponse<T> {
  status: "success" | "Failed";
  message: string;
  code: number;
  data: T | null;
  timestamp: string;
  traceId: string;
}

export interface UpdateAODetailsRequest {
  aocode: string;
}
export interface UpdateAODetailsData {
  user: {
    teamname: string;
  };
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
    Id: string;
  };
}

export interface VerifyOTPRequest {
  OTP: string;
}

export interface VerifyBVNRequest {
  bvn: string;
  dob: string;
}
export interface VerifyBVNData {
  prospect: {
    firstname: string;
    middlename: string;
    lastname: string;
  };
}

export interface VerifyNINRequest {
  dob: string; 
  email: string;
  nin: string;
}
export interface VerifyNINData {
  prospect: {
    firstname: string;
    middlename: string;
    lastname: string;
  };
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
    city: string;
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


