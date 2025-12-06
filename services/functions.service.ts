import { ApiResponse } from "@/types";
import {
  CustomerDetails,
  GetCustomerDetails,
  LinkBVNData,
  LinkNINData,
} from "@/types/api";
import { ApiService } from ".";

export const getCustomerDetails = async (body: GetCustomerDetails) => {
  const response = await ApiService.post<ApiResponse<CustomerDetails>>(
    `/customer/${body.accountNumber}`,
    { dob: body.dob }
  );

  return response.data?.data;
};

export const linkBvn = async ({ accountNumber, ...body }: LinkBVNData) => {
  try {
    const response = await ApiService.patch(
      `/customer/${accountNumber}/bvn/link`,
      body
    );

    return response.data;
  } catch (error) {
    console.error("Oops! error occured in linking bvn", error);
    throw error;
  }
};

export const linkNin = async ({ accountNumber, ...body }: LinkNINData) => {
  try {
    console.log({ body });

    const response = await ApiService.patch(
      `/customer/${accountNumber}/nin/link`,
      body
    );

    return response.data;
  } catch (error) {
    console.error("Oops! error occured in linking nin", error);
    throw error;
  }
};
