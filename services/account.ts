export type AccountDetails = {
  accountName: string;
  accountNumber: string;
  branchCodeCif: string; // e.g., "123/123456789"
  bvn: string;
  idType: string;
  branch: string;
  accountType: string;
  currency: string;
  accountOfficer: string; // e.g., "FG000123 | MICHAEL JOHN"
};

export async function fetchAccountDetails(): Promise<AccountDetails> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 800));
  return {
    accountName: "JOHN DOE MICHAEL",
    accountNumber: "123456789",
    branchCodeCif: "123/123456789",
    bvn: "1234567890",
    idType: "NIN",
    branch: "Lagos",
    accountType: "Current",
    currency: "Naira",
    accountOfficer: "FG000123 | MICHAEL JOHN",
  };
}


