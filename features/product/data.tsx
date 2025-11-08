import { PageSection } from "@/types/page";
import { DocumentIcon, TargetIcon } from "@/assets/images/svgs/product-icons";

export const tier1AccountData: PageSection[] = [
  {
    id: 1,
    section: "Description",
    content: [
      `The Tier 1 Account is a basic savings account designed for individuals who may not have a BVN but wish to start banking easily. It allows customers to open an account with minimal documentation using either a NIN or BVN and is ideal for people with small-scale businesses or limited financial history. It encourages financial inclusion by catering for the financially disadvantaged people.`,
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 2,
    section: "Target Market",
    content: [
      "Petty Traders",
      "Small scale businesses",
      "Farmers",
      "Socially and financially",
      "Disadvantaged Individuals",
    ],
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    id: 3,
    section: "Features & Benefits",
    content: [
      "Can be opened with either NIN or BVN",
      "Accumulated balance of N300,000",
      "Can be upgraded to Tier 3",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 4,
    section: "Documentation",
    content: [
      "Duly completed account opening form.",
      "BVN of the signatory. ",
      "One recent passport size photograph of Signatory with full face forward, indicating name on the reverse side. ",
      "For blind/illiterate customers: an illiterate Jurat is required in addition to items above",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
];

export const tier3AccountData: PageSection[] = [
  {
    id: 1,
    section: "Description",
    content: [
      `This is a standard savings account for individuals and business people, this account has a monthly profit accrued to it. This account allows for deposit, withdrawals and transfers offering convenience to customers.`,
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 2,
    section: "Target Market",
    content: [
      "Stable income earners",
      "Professionals(Doctors, lawyers, engineers etc.)",
      "Salaried employees",
      "Traders",
      "Service providers",
      "Individuals",
      "Young adults",
      "Families",
    ],
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    id: 3,
    section: "Features & Benefits",
    content: [
      "Monthly Profit Payment",
      "Instant Debit Card(Verve and Master card) Issuance",
      "Access to internet, Mobile and USSD banking services",
      "Lodgment Warrant (up to N2 Million face value)",
      "Free monthly E-Statement of Account",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 4,
    section: "Documentation",
    content: [
      "Duly completed accountopening form.",
      "BVN of the signatory.",
      "One recent passport size photograph of Signatory with full face forward indicating full name on the reverse side. ",
      "Valid means of identification (National Identification Card or NIMC Slip with NIN). ",
      "Proof of residential address not older than three (3) months from date of issue or payment (refer to the section on Evidence of address above). ",
      "Non-Citizens will need to provide a valid residence permit. ",
      "For blind/illiterate customers: an illiterate Jurat is required in addition to items above.",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
];

export const currentAccountData: PageSection[] = [
  {
    id: 1,
    section: "Description",
    content: [`This account can be used by professionals for their monthly income. It is also used by individuals that require frequent transactions and flexible banking operations. The account allows for Cheque book to be issued to customers and also customers can be on boarded on `],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 2,
    section: "Target Market",
    content: ["Professionals", "Entrepreneurs", "Sole Proprietors"],
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    id: 3,
    section: "Features & Benefits",
    content: [
      "Minimum opening balance and documentation requirements apply",
      "No limit to number of withdrawals in a month",
      "Zero cash withdrawal and account maintenance charges",
      "Funded through cash deposits, inflows, and wire transfers",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 4,
    section: "Documentation",
    content: [
      "Duly completed account opening form.", 
      "BVN of the signatory. ", 
      "One recent passport- size photograph of Signatory with full face forward indicating full name on the reverse side. ", 
      "Valid means of identification (National Identification Card or NIMC Slip with NIN). ", 
      "Proof of residential address not older than three (3) months from date of issue or payment (refer to the section on Evidence of address above). ", 
      "Non-Citizens will need to provide a valid residence permit. ", 
      "For blind/illiterate customers: an illiterate Jurat is required in addition to items above. ", 
      "Two suitable referees",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
];

export const jaizDomicilliaryAccountData: PageSection[] = [
  {
    id: 1,
    section: "Description",
    content: [
      `This is a foreign currency account, which can be in USD, GBP or Eur. This account is ideal for those desiring to grow their foreign currency savings in a shariah compliant manner.`,
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 2,
    section: "Target Market",
    content: [
      "Individuals with International transactions(Frequent travelers, Freelancers, individual with foreign income or investment)",
      "Businesses with international trade",
      "Non-resident Nigerians",
      "Multinational corporation",
    ],
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    id: 3,
    section: "Features & Benefits",
    content: [
      "Minimum opening balance and documentation requirements apply",
      "No limit to number of withdrawals in a month",
      "Zero cash withdrawal and account maintenance charges",
      "Can have access to the funds internationally through Visa Dollar Card",
      "Operated in USD, GBP, or EUR",
      "Funded through cash deposits, inflows, and wire transfers",
      "Allows international transfers and payments",
      "Withdrawals in foreign currency (processed at designated branches)",
      "View-only access via mobile app under Special Account section",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 4,
    section: "Documentation",
    content: [
      "Duly completed account opening form.",
      "BVN of the signatory. ",
      "One recent passport size photograph of Signatory with full face forward indicating full name on the reverse side. ",
      "Valid means of identification (National Identification Card or NIMC Slip with NIN). ",
      "Proof of residential address not older than three (3) months from date of issue or payment (refer to the section on Evidence of address above). ",
      "Non-Citizens will need to provide a valid residence permit. ",
      "For blind/illiterate customers: an illiterate Jurat is required in addition to items above.",
      "Two suitable referees",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
];

export const japsaTermDepositData: PageSection[] = [
  {
    id: 1,
    section: "Description",
    content: [
      `JAPSA term deposit, is an account where a customer can invest their fund for a period of time to earn a competitive return (Profit). The profit will be shared between the customer and the bank based on the amount invested and the duration of investment.`,
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 2,
    section: "Target Market",
    content: [
      "Risk-averse Investors",
      "Savers",
      "Fixed income seekers",
      "Conservative investors",
    ],
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    id: 3,
    section: "Features & Benefits",
    content: [
      "Opening balance of N500,000",
      "Attractive Return (Profit Sharing at the end of the month)",
      "Investment period (Tenure) is a minimum of 30 days and a maximum of 360 days",
      "Investment Certificate is issued for each investment",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 4,
    section: "Documentation",
    content: [
      "Customer shall open or have an existing naira account before opening a JAPSA account",
      "Opening balance of N500,000",
      "Investment period (Tenure) is a minimum of 30 days and a maximum of 360 days",
      "Investment Certificate is issued for each investment",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
];

export const hajjSavingsAccountData: PageSection[] = [
  {
    id: 1,
    section: "Description",
    content: [
      `The description `,
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 2,
    section: "Target Market",
    content: ["Potential pilgrims", "Muslims", "Families"],
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    id: 3,
    section: "Features & Benefits",
    content: [
      "Intending Pilgrims can save before Hajj",
      "Monthly profit",
      "To open, customer require BVN, Phone Number and NIN",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 4,
    section: "Documentation",
    content: [
      "Duly completed HSS account opening form.",
      "BVN and NIN of intending pilgrim.",
      "Mobile number of intending pilgrim.",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
];

export const teenAccountData: PageSection[] = [
  {
    id: 1,
    section: "Description",
    content: [
      `This is an account that is specially designed for minors to help parents or guardians cultivate a saving culture in their kids `,
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 2,
    section: "Target Market",
    content: ["Guardian of minors", "parents and guardian", "Teenagers"],
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    id: 3,
    section: "Features & Benefits",
    content: [
      "Monthly profit payment",
      "This account is opened in the child's name and operated by the parent/guardian",
      "Cheques/Dividend lodgment Warrant (up to N2 Million face value)",
      "Instant Debit Card (Verve) issuance",
      "Access to Internet, Mobile and USSD banking services",
      "Free monthly E-Statement of Account",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 4,
    section: "Documentation",
    content: [
      "Duly Completed Account Opening Form.",
      "One Passport size photograph each of both Minor and Signatory(ies) with full name on the reverse side.",
      "Birth certificate or age declaration (court affidavit sworn to by the account Operator attesting to the age of the beneficial minor).",
      "The operator(s) of the account shall be a legal guardian or parent(s) of the minor.",
      "Where the signatory(ies) is a legal guardian, he/she is required to provide a court affidavit. If the signatories include a parent and a guardian, only the guardian shall provide a sworn court affidavit.",
      "Valid means of identification (National Identification Card or NIMC Slip with NIN) of Signatory(ies).",
      "Proof of residential address not older than three (3) months from date of issue or payment (refer to the section on Evidence of address above).",
      "BVN of the account signatory(ies).",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
];


export const corporateAccountData: PageSection[] = [
  {
    id: 1,
    section: "Description",
    content: [`This caters for registered businesses, NGO and institutions seeking for banking services. This type of account can take the form of Registered company, Sole Proprietorship etc `],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 2,
    section: "Target Market",
    content: ["Professionals", "Sole Proprietors", "Businesses"],
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    id: 3,
    section: "Features & Benefits",
    content: [
      "No Account Maintenance Charges",
      "Personal Cheque Book",
      "Instant Debit Card issuance",
      "Access to Internet, Mobile and USSD banking services",
      "Cheque/Dividend Warrant lodgment",
      "Free monthly E-Statement of Account",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 4,
    section: "Documentation",
    content: [
      "Duly completed account Opening Package",
      "Opening form and signature card/mandate",
      "Copy of certificate of incorporation",
      "Certified True Copy of Memorandum and articles of association (MEMAT)",
      "Certified True Copy of form CAC7 (Particulars of Directors)",
      "Certified True Copy of form CAC2 (Allotment of shares)",
      "Certified True Copy of CAC 1.1 or any other form as may be amended by the CAC is also acceptable in place of CAC7 & CAC2 above",
      "One recent passport-size photograph for each signatory to the account with their names on the reverse side",
      "A valid means of identification for each signatory and Directors",
      "Proof of registered/business address and residential address of signatory(ies) not older than three (3) months from date of issue or payment (refer to the section on evidence of address above)",
      "Evidence of verified Corporate Tax Identification Number (TIN)",
      "Two (2) satisfactory References; (2 corporate referees or 1 corporate and 1 individual current account referee)",
      "Satisfactory Legal search report",
      "Non-Citizens shall provide International Passport, Valid residence permit and BVN",
      "Power of Attorney (where applicable)",
      "A valid means of identification (Driver's license, international passport, Permanent voters'card, National Identification Card or NIMC Slip with NIN numbers of signatories) for Directors and signatories",
      "Bank Verification Number (BVN) of the account signatories, Directors, and significant shareholders (5% and above shareholding) excluding minors (Note that there must be at least two adults in the shareholding structures)",
      "Any other document as may be required e.g., SCUML certificate",
      "Initial Deposit (cost recovery on search report)",
      "Approval of the supervisory agency in the case of schools and hospitals",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
];