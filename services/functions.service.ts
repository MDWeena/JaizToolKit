import { ApiResponse } from "@/types";
import {
  CustomerBalance,
  CustomerDetails,
  CustomerDetailsWithAccountNumberResponse,
  GetCustomerDetails,
  GetCustomerDetailsResponse,
  LinkBVNData,
  LinkNINData,
  SendStatementDto,
  TransactionHistoryQuery,
} from "@/types/api";
import { ApiService } from ".";

export const getCustomerDetailsWithAccountNumber = async (
  accountNumber: string
) => {
  try {
    const response = await ApiService.get<
      ApiResponse<CustomerDetailsWithAccountNumberResponse>
    >(`/customer/${accountNumber}`);

    return response.data?.data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error;
  }
};

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

export const getCustomerBalance = async (accountNumber: string) => {
  try {
    const response = await ApiService.get<ApiResponse<CustomerBalance>>(
      `/customer/${accountNumber}/balance`
    );

    return response.data?.data;
  } catch (error) {
    console.error("Error fetching customer balance:", error);
    throw error;
  }
};

export const getFullCustomerDetails = async (accountNumber: string) => {
  try {
    const response = await ApiService.get<
      ApiResponse<GetCustomerDetailsResponse>
    >(`/customer/${accountNumber}/customerdetails`);

    return response.data?.data;
  } catch (error) {
    console.error("Error fetching full customer details:", error);
    throw error;
  }
};

export const sendStatement = (body: SendStatementDto) => {
  try {
    const response = ApiService.post(
      `/customer/${body.accountNumber}/sendemailstatement`,
      {
        email: body.email,
        startDate: body.startDate,
        endDate: body.endDate,
      }
    );

    return response;
  } catch (error) {
    console.error("Error sending statement:", error);
    throw error;
  }
};

export const getTransactionHistory = async (body: TransactionHistoryQuery) => {
  try {
    const response = await ApiService.post<ApiResponse<Array<any>>>(
      `/customer/${body.accountNumber}/transhistory`,
      {
        startDate: body.startDate,
        endDate: body.endDate,
      }
    );

    return response.data?.data;
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    throw error;
  }
};
