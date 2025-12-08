import {
  ApiResponse,
  SendProspectOTPData,
  SendProspectOTPRequest,
  SubmitProspectData,
  UpdateAddressDetailsRequest,
  VerifyAccountData,
  VerifyAccountRequest,
  VerifyBvnData,
  VerifyBvnRequest,
  VerifyNinData,
  VerifyNinRequest,
} from "@/types/api";
import { FileUpload } from "@/types/file-upload";
import { ApiService } from ".";
import { formatDate } from "@/lib/utils";

const USE_MOCK_API = true;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getStates = async (): Promise<
  ApiResponse<{ state_code: string; state_name: string }[]>
> => {
  try {
    const response = await ApiService.get("/static/fetchstates");
    return response.data;
  } catch (error) {
    console.error("Error getting states:", error);
    throw error;
  }
};

export const getLGAs = async (
  stateCode: string
): Promise<ApiResponse<{ lga_code: string; lga_name: string }[]>> => {
  try {
    const response = await ApiService.get(`/static/${stateCode}/fetchlgas`);
    return response.data;
  } catch (error) {
    console.error("Error getting LGAs:", error);
    throw error;
  }
};

export const getBanksUssdCodes = async (): Promise<
  ApiResponse<{ ussdTransferCode: string; bankName: string }[]>
> => { 
  try {
    const response = await ApiService.get("/static/banks/ussdcodes");
    return response.data;
  } catch (error) {
    console.error("Error getting banks:", error);
    throw error;
  }
}

export const sendProspectOTP = async (
  prospectDetails: SendProspectOTPRequest["prospectDetails"],
  phone: SendProspectOTPRequest["phone"],
  country: SendProspectOTPRequest["country"]
): Promise<ApiResponse<SendProspectOTPData>> => {
  try {
    const payload = {
      prospectDetails,
      country,
      phone,
    };
    const response = await ApiService.post("/prospect/otp", payload);
    return response.data;
  } catch (error) {
    console.error("Error sending prospect OTP:", error);
    throw error;
  }
};

export const verifyOTP = async (
  prospectId: string,
  otp: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await ApiService.patch(
      `/prospect/${prospectId}/otp/verify`,
      {
        OTP: otp,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const verifyBVN = async ({
  prospectId,
  bvn,
  dob,
  email,
}: VerifyBvnRequest): Promise<ApiResponse<VerifyBvnData>> => {
  try {
    const response = await ApiService.patch(
      `/prospect/${prospectId}/bvn`,
      JSON.stringify({
        bvn,
        dob: formatDate(dob),
        email,
      })
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying BVN:", error);
    throw error;
  }
};

export const verifyNIN = async ({
  prospectId,
  nin,
  dob,
  email,
}: VerifyNinRequest): Promise<ApiResponse<VerifyNinData>> => {
  try {
    const response = await ApiService.patch(`/prospect/${prospectId}/nin`, {
      nin,
      dob: formatDate(dob),
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying NIN:", error);
    throw error;
  }
};

export const updateAddressDetails = async (
  prospectId: string,
  details: UpdateAddressDetailsRequest
): Promise<ApiResponse<null>> => {
  try {
    const response = await ApiService.patch(
      `/prospect/${prospectId}/addressdetails`,
      details
    );
    return response.data;
  } catch (error) {
    console.error("Error updating address details:", error);
    throw error;
  }
};

export const updateFile = async (
  prospectId: string,
  file: NonNullable<FileUpload> & { mimeType?: string },
  fileName: string
): Promise<ApiResponse<null>> => {
  try {
    const formData = new FormData();    
    formData.append("formFile", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || file.type || "image/jpeg",
    } as any);

    const response = await ApiService.patch(
      `/prospect/${prospectId}/${fileName}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const submitProspect = async (
  prospectId: string
): Promise<ApiResponse<SubmitProspectData>> => {
  try {
    const response = await ApiService.post(`/prospect/${prospectId}/submit`);
    return response.data;
  } catch (error) {
    console.error("Error submitting prospect:", error);
    throw error;
  }
};

export const verifyAccount = async (
  data: VerifyAccountRequest
): Promise<ApiResponse<VerifyAccountData>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Verifying account for prospect:", { data });
    return {
      status: "Success",
      message: "Account verified successfully",
      code: 200,
      data: {
        accountName: "John Doe",
        accountNumber: "0123456789",
        branchCodeCif: "123/123456789",
        bvn: "1234567890",
        idType: "NIN",
        branch: "Lagos",
        accountType: "Current",
        currency: "Naira",
        accountOfficer: "FG000123 | MICHAEL JOHN",
      },
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
  try {
    const response = await ApiService.post(`/prospect/verify`, data);
    return response.data;
  } catch (error) {
    console.error("Error verifying account:", error);
    throw error;
  }
};
