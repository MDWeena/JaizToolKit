import {
    ApiResponse,
    SendProspectOTPData,
    SendProspectOTPRequest,
    SubmitProspectData,
    UpdateAODetailsData,
    UpdateAddressDetailsRequest,
    VerifyBVNData,
    VerifyNINData,
} from "@/types/api";
import { ApiService } from ".";

const USE_MOCK_API = true;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateAODetails = async (
  aocode: string
): Promise<ApiResponse<UpdateAODetailsData>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Updating AO Details with code:", aocode);
    return {
      status: "success",
      message: "Account Officer Details Updated",
      code: 200,
      data: {
        user: {
          teamname: "Retail FCT 1",
        },
      },
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
  try {
    const response = await ApiService.patch("/user/aodetails", { aocode });
    return response.data;
  } catch (error) {
    console.error("Error updating AO Details:", error);
    throw error;
  }
};

export const sendProspectOTP = async (
  prospectDetails: SendProspectOTPRequest["prospectDetails"],
  phone: SendProspectOTPRequest["phone"],
  country: SendProspectOTPRequest["country"]
): Promise<ApiResponse<SendProspectOTPData>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Sending OTP to:", { phone, country });
    return {
      status: "success",
      message: "OTP Sent",
      code: 200,
      data: {
        prospect: {
          Id: "1838675d-2fb0-4539-9d10-6db3a12bad7c",
        },
      },
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
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
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Verifying OTP for prospect:", { prospectId, otp });
    if (otp === "123456") {
      return {
        status: "success",
        message: "OTP Verified",
        code: 200,
        data: null,
        timestamp: new Date().toISOString(),
        traceId: "xyz789abc",
      };
    }
    return {
      status: "Failed",
      message: "OTP is incorrect, you have 3 retries left",
      code: 400,
      data: null,
      timestamp: new Date().toISOString(),
      traceId: "abc123xyz",
    };
  }
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

export const verifyBVN = async (
  prospectId: string,
  bvn: string,
  dob: Date
): Promise<ApiResponse<VerifyBVNData>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Verifying BVN for prospect:", { prospectId, bvn });
    return {
      status: "success",
      message: "BVN validation successful",
      code: 200,
      data: {
        prospect: {
          firstname: "Tom",
          middlename: "Jerry",
          lastname: "Cruise",
        },
      },
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
  try {
    const response = await ApiService.patch(`/prospect/${prospectId}/bvn`, {
      bvn,
      dob: dob.toISOString().split("T")[0], // format to YYYY-MM-DD
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying BVN:", error);
    throw error;
  }
};

export const verifyNIN = async (
  prospectId: string,
  nin: string,
  dob: Date,
  email: string
): Promise<ApiResponse<VerifyNINData>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Verifying NIN for prospect:", { prospectId, nin });
    return {
      status: "success",
      message: "NIN validation successful",
      code: 200,
      data: {
        prospect: {
          firstname: "Tom",
          middlename: "Jerry",
          lastname: "Cruise",
        },
      },
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
  try {
    const response = await ApiService.patch(`/prospect/${prospectId}/nin`, {
      nin,
      dob: dob.toISOString().split("T")[0],
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
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Updating address details for prospect:", {
      prospectId,
    });
    return {
      status: "success",
      message: "Address details updated successfully",
      code: 204,
      data: null,
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
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

export const updatePassport = async (
  prospectId: string,
  file: File
): Promise<ApiResponse<null>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Uploading passport for prospect:", { prospectId });
    return {
      status: "success",
      message: "Passport photo updated successfully",
      code: 204,
      data: null,
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await ApiService.patch(
      `/prospect/${prospectId}/passport`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading passport:", error);
    throw error;
  }
};

export const updateSignature = async (
  prospectId: string,
  file: File
): Promise<ApiResponse<null>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Uploading signature for prospect:", { prospectId });
    return {
      status: "success",
      message: "Signature photo updated successfully",
      code: 204,
      data: null,
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await ApiService.patch(
      `/prospect/${prospectId}/signature`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading signature:", error);
    throw error;
  }
};

export const submitProspect = async (
  prospectId: string
): Promise<ApiResponse<SubmitProspectData>> => {
  if (USE_MOCK_API) {
    await sleep(2000);
    console.log("MOCK API: Submitting prospect account:", { prospectId });
    return {
      status: "success",
      message: "Account Opened Successfully",
      code: 200,
      data: {
        customer: {
          accountname: "Tom Jerry Cruise",
          accountnumber: "0123456789",
        },
      },
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
  try {
    const response = await ApiService.post("/prospect/submit", {
      Id: prospectId,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting prospect:", error);
    throw error;
  }
};
