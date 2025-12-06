import { getOrCreateDeviceId } from "@/lib/utils";
import { ApiResponse } from "@/types";
import { LoginData, LoginResponse } from "@/types/api";
import { ApiService } from ".";

export const login = async (body: LoginData) => {
  try {
    body.deviceId = await getOrCreateDeviceId();

    const response = await ApiService.post<ApiResponse<LoginResponse>>(
      "/user/login",
      body
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.log("[Login Error]", error);

    return {
      success: false,
      message: error?.message ?? "Unable to complete login.",
    };
  }
};
