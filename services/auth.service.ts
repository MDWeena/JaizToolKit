import { getOrCreateDeviceId } from '@/lib/utils';
import { ApiResponse } from '@/types';
import { ApiService } from '.';

type LoginData = {
  staffid: string;
  password: string;
  deviceId?: string;
};

type LoginResponse = {
  expiresIn: number;
  token: string;
  user: {
    email: string;
    id: string;
    name: string;
  };
};

export const login = async (body: LoginData) => {
  try {
    body.deviceId = await getOrCreateDeviceId();

    const response = await ApiService.post<ApiResponse<LoginResponse>>(
      '/user/login',
      body
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
