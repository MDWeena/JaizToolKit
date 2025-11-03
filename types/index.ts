export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
  status: string;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  accessToken?: string;
  password?: string;
}
