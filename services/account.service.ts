import {
  ApiResponse,
  SendProspectOTPData,
  SendProspectOTPRequest,
  SubmitProspectData,
  UpdateAddressDetailsRequest,
  VerifyAccountData,
  VerifyAccountRequest,
  VerifyBVNData,
  VerifyNINData,
} from "@/types/api";
import { ApiService } from ".";

const USE_MOCK_API = true;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getStates = async (): Promise<ApiResponse<{state_code: string, state_name: string}[]>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Getting states");
    return {
      status: "success",
      message: "States fetched successfully",
      code: 200,
      data: [
        {"state_code": "23", "state_name": "Abia"},
        {"state_code": "24", "state_name": "Adamawa"},
        {"state_code": "25", "state_name": "Akwa Ibom"},
        {"state_code": "26", "state_name": "Anambra"},
        {"state_code": "27", "state_name": "Bauchi"},
        {"state_code": "28", "state_name": "Bayelsa"},
        {"state_code": "29", "state_name": "Benue"},
        {"state_code": "30", "state_name": "Borno"},
        {"state_code": "31", "state_name": "Cross River"},
        {"state_code": "32", "state_name": "Delta"},
        {"state_code": "33", "state_name": "Ebonyi"},
        {"state_code": "34", "state_name": "Edo"},
        {"state_code": "35", "state_name": "Ekiti"},
        {"state_code": "36", "state_name": "Enugu"},
        {"state_code": "37", "state_name": "Gombe"},
        {"state_code": "38", "state_name": "Imo"},
        {"state_code": "39", "state_name": "Jigawa"},
        {"state_code": "40", "state_name": "Kaduna"},
        {"state_code": "41", "state_name": "Kano"},
        {"state_code": "42", "state_name": "Katsina"},
        {"state_code": "43", "state_name": "Kebbi"},
        {"state_code": "44", "state_name": "Kogi"},
        {"state_code": "45", "state_name": "Kwara"},
        {"state_code": "46", "state_name": "Lagos"},
        {"state_code": "47", "state_name": "Nasarawa"},
        {"state_code": "48", "state_name": "Niger"},
        {"state_code": "49", "state_name": "Ogun"},
        {"state_code": "50", "state_name": "Ondo"},
        {"state_code": "51", "state_name": "Osun"},
        {"state_code": "52", "state_name": "Oyo"},
        {"state_code": "53", "state_name": "Plateau"},
        {"state_code": "54", "state_name": "Rivers"},
        {"state_code": "55", "state_name": "Sokoto"},
        {"state_code": "56", "state_name": "Taraba"},
        {"state_code": "57", "state_name": "Yobe"},
        {"state_code": "58", "state_name": "Zamfara"},
        {"state_code": "59", "state_name": "Federal Capital Territory (Abuja)"}
      ],
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
  try {
    const response = await ApiService.get("/static/fetchstates");
    return response.data;
  } catch (error) {
    console.error("Error getting states:", error);
    throw error;
  }
};

export const getLGAs = async (stateCode: string): Promise<ApiResponse<{lga_code: string, lga_name: string}[]>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Getting LGAs for state:", stateCode);
    return {
      status: "success",
      message: "LGAs fetched successfully",
      code: 200,
      data:  [
        {"lga_code": "2413", "lga_name": "Kosofe"},
        {"lga_code": "2414", "lga_name": "Lagos Island"},
        {"lga_code": "2415", "lga_name": "Lagos Mainland"}
      ],
      timestamp: new Date().toISOString(),
      traceId: "xyz789abc",
    };
  }
  try {
    const response = await ApiService.get(`/static/${stateCode}/fetchlgas`);
    return response.data;
  } catch (error) {
    console.error("Error getting LGAs:", error);
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

export const updateFile = async (
  prospectId: string,
  file: File,
  fileName: string
): Promise<ApiResponse<null>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Uploading passport for prospect:", { prospectId });
    return {
      status: "success",
      message: `${fileName} photo updated successfully`,
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

export const verifyAccount = async (data: VerifyAccountRequest): Promise<ApiResponse<VerifyAccountData>> => {
  if (USE_MOCK_API) {
    await sleep(1000);
    console.log("MOCK API: Verifying account for prospect:", { data });
    return {
      status: "success",
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