import {
  OpenAccountIcon,
  TeensAccountIcon,
  VerifyAccountIcon,
} from "@/assets/images/svgs/account";
import {
  AccountIcon,
  FunctionIcon,
  ProductIcon,
  ResourceIcon,
} from "@/assets/images/svgs/category-icons";
import {
  CardIcon as FCardIcon,
  FacilityIcon,
  LinkBvnIcon,
  RMIcon,
} from "@/assets/images/svgs/functions";
import {
  CardIcon,
  ChannelIcon,
  CorporateIcon,
  DocumentIcon,
  LoanIcon,
  PieIcon,
  TargetIcon,
  UserIcon,
} from "@/assets/images/svgs/product-icons";
import {
  ChequeIcon,
  CustomerDetailsIcon,
  LienIcons,
  ServiceRequestIcon,
  TransactionsIcon,
} from "@/assets/images/svgs/rm";
import {
  CardHotlist,
  PasswordResetIcon,
  RequestTrackerIcon,
} from "@/assets/images/svgs/service-requests";
import { PageItem, PageSection } from "@/types/page";
import { Use } from "react-native-svg";
import { id } from "zod/v4/locales";

export const categoriesData: PageItem[] = [
  {
    id: 1,
    icon: <AccountIcon width={44} height={44} />,
    text: "Account",
    route: "/(tabs)/(home)/(categories)/accounts" as const,
    keywords: ["accounts"],
    class: "border-error/40 bg-error/20",
  },
  {
    id: 2,
    icon: <FunctionIcon width={44} height={44} />,
    text: "Function",
    route: "/(tabs)/(home)/(categories)/functions" as const,
    keywords: ["functions"],
    class: "border-secondary/40 bg-secondary/20",
  },
  {
    id: 3,
    icon: <ProductIcon width={44} height={44} />,
    text: "Product",
    route: "/(tabs)/(home)/(categories)/products" as const,
    keywords: ["products"],
    class: "border-primary/40 bg-primary/20",
  },
  {
    id: 4,
    icon: <ResourceIcon width={44} height={44} />,
    text: "Resource",
    route: "/(tabs)/(home)/(categories)/resources" as const,
    keywords: ["resources", "help", "support"],
    class: "border-success/40 bg-success/20",
  },
];

export const productsData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon width={44} height={44} />,
    text: "Account Type",
    route: "/products/account-type" as const,
    keywords: ["account type", "account"],
  },
  {
    id: 4,
    icon: <LoanIcon width={44} height={44} />,
    text: "Loan",
    route: "/products/loan" as const,
    keywords: ["loan", "credit", "finance"],
  },
  {
    id: 2,
    icon: <CardIcon width={44} height={44} />,
    text: "Card",
    route: "/products/card" as const,
    keywords: ["card", "debit", "credit"],
  },
  {
    id: 3,
    icon: <ChannelIcon width={44} height={44} />,
    text: "Banking Channel",
    route: "/products/banking-channel" as const,
    keywords: ["banking channel", "channel"],
  },
  {
    id: 5,
    icon: <PieIcon width={44} height={44} />,
    text: "Other Products",
    route: "/products/other-products" as const,
    keywords: ["other products", "products"],
  },
];

export const accountTypeData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon width={44} height={44} />,
    text: "Individual",
    route: "/products/account-type/individual" as const,
    keywords: ["individual", "account"],
  },
  {
    id: 2,
    icon: <CorporateIcon width={44} height={44} />,
    text: "Corporate",
    route: "/products/account-type/corporate" as const,
    keywords: ["corporate", "account"],
  },
];

export const individualAccountsData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon width={44} height={44} />,
    route: "/products/account-type/individual" as const,
    text: "Jaiz Instant Account",
    keywords: ["jaiz instant", "instant account", "jaiz"],
  },
  {
    id: 2,
    icon: <UserIcon width={44} height={44} />,
    route: "/products/account-type/individual" as const,
    text: "eAccount",
    keywords: ["eaccount", "electronic account"],
  },
  {
    id: 3,
    icon: <UserIcon width={44} height={44} />,
    route: "/products/account-type/individual" as const,
    text: "Jaiz Target",
    keywords: ["jaiz target", "target account"],
  },
  {
    id: 4,
    icon: <UserIcon width={44} height={44} />,
    route: "/products/account-type/individual" as const,
    text: "Jaiz EasySavers Account",
    keywords: ["easysavers", "easy savers", "jaiz"],
  },
  {
    id: 5,
    icon: <UserIcon width={44} height={44} />,
    text: "Teens Account",
    route: "/products/account-type/individual/teens-account" as const,
    keywords: ["teens account", "teen", "jaiz"],
  },
  {
    id: 6,
    icon: <UserIcon width={44} height={44} />,
    text: "Jaiz eSavers",
    route: "/products/account-type/individual" as const,
    keywords: ["esavers", "jaiz esavers", "savers"],
  },
];

export const corporateAccountsData: PageItem[] = [
  {
    id: 1,
    icon: <CorporateIcon width={44} height={44} />,
    text: "Jaiz Max",
    route: "/products/account-type/corporate" as const,
    keywords: ["corporate", "account", "jaiz max"],
  },
  {
    id: 2,
    icon: <CorporateIcon width={44} height={44} />,
    text: "Jaiz Business",
    route: "/products/account-type/corporate" as const,
    keywords: ["corporate", "account", "jaiz business"],
  },
];

export const teenAccountData: PageSection[] = [
  {
    id: 1,
    section: "Description",
    content: [
      "Start your children on the road to financial success.",
      "The Smart Kids Save account is designed to enable parents/guardians save for their children under 18 years of age, whilst also developing a savings culture in them.",
      "Teaching children the value of savings early can help them develop SMART financial habits for life.",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 2,
    section: "Target Market",
    content: [
      "Minimum opening/account balance of N1,000.00 (One Thousand Naira Only).",
      "Periodic lodgements can be made into the account through Standing Order/automated direct debits.",
      "Complimentary invite to SKS Fun events.",
      "SKS can be converted into a regular savings or current account, with the young saver as an authorized signatory. This is however only after the Smart kid saver has attained the age of 18.",
      "From the age of 13, an SKS Teen account will be opened for the teenager which comes with a Trendy Teen MasterCard (issued upon Parent’s request) so the child can learn to manage money responsibly.",
    ],
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    id: 3,
    section: "Features & Benefits",
    content: [
      "Minimum opening/account balance of N1,000.00 (One Thousand Naira Only).",
      "Periodic lodgements can be made into the account through Standing Order/automated direct debits.",
      "Complimentary invite to SKS Fun events.",
      "SKS can be converted into a regular savings or current account, with the young saver as an authorized signatory. This is however only after the Smart kid saver has attained the age of 18.",
      "From the age of 13, an SKS Teen account will be opened for the teenager which comes with a Trendy Teen MasterCard (issued upon Parent’s request) so the child can learn to manage money responsibly.",
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 4,
    section: "Documentation",
    content: [],
    icon: <DocumentIcon width={32} height={32} />,
  },
];

export const loansData: PageItem[] = [
  {
    id: 1,
    icon: <LoanIcon width={44} height={44} />,
    text: "Jaiz Salary Advance",
    route: "/products/loan" as const,
    keywords: ["salary advance", "jaiz"],
  },
  {
    id: 2,
    icon: <LoanIcon width={44} height={44} />,
    text: "Max Advance",
    route: "/products/loan" as const,
    keywords: ["max advance", "advance"],
  },
  {
    id: 3,
    icon: <LoanIcon width={44} height={44} />,
    text: "MaxPlus",
    route: "/products/loan" as const,
    keywords: ["maxplus", "max plus"],
  },
  {
    id: 4,
    icon: <LoanIcon width={44} height={44} />,
    text: "Jaiz Auto",
    route: "/products/loan" as const,
    keywords: ["auto", "jaiz auto"],
  },
  {
    id: 5,
    icon: <LoanIcon width={44} height={44} />,
    text: "Jaiz Mortgage",
    route: "/products/loan" as const,
    keywords: ["mortgage", "jaiz mortgage"],
  },
  {
    id: 6,
    icon: <LoanIcon width={44} height={44} />,
    text: "School Fees Advance",
    route: "/products/loan" as const,
    keywords: ["school fees advance", "school fees"],
  },
  {
    id: 7,
    icon: <LoanIcon width={44} height={44} />,
    text: "CBN MSME Development Fund",
    route: "/products/loan" as const,
    keywords: ["cbn msme", "development fund", "msme"],
  },
  {
    id: 8,
    icon: <LoanIcon width={44} height={44} />,
    text: "CBN SME Credit Guarantee Scheme",
    route: "/products/loan" as const,
    keywords: ["cbn sme", "credit guarantee", "scheme"],
  },
];

export const cardsData: PageItem[] = [
  {
    id: 1,
    icon: <CardIcon width={44} height={44} />,
    text: "Prepaid Utility Card",
    route: "/products/card" as const,
    keywords: ["prepaid utility card", "utility card", "prepaid"],
  },
  {
    id: 2,
    icon: <CardIcon width={44} height={44} />,
    text: "Prepaid Virtual Card",
    route: "/products/card" as const,
    keywords: ["prepaid virtual card", "virtual card", "prepaid"],
  },
  {
    id: 3,
    icon: <UserIcon width={44} height={44} />,
    text: "One Time Password",
    route: "/products/card" as const,
    keywords: ["one time password", "otp", "password"],
  },
  {
    id: 4,
    icon: <UserIcon width={44} height={44} />,
    text: "Card-Less Withdrawal",
    route: "/products/card" as const,
    keywords: ["card-less withdrawal", "cardless", "withdrawal"],
  },
];

export const bankingChannelsData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon width={44} height={44} />,
    text: "Jaiz Bank App",
    route: "/products/banking-channel" as const,
    keywords: ["jaiz bank", "banking app"],
  },
  {
    id: 2,
    icon: <UserIcon width={44} height={44} />,
    text: "Internet Banking",
    route: "/products/banking-channel" as const,
    keywords: ["internet banking", "online banking"],
  },
  {
    id: 3,
    icon: <UserIcon width={44} height={44} />,
    text: "USSD Bank",
    route: "/products/banking-channel" as const,
    keywords: ["ussd", "banking", "mobile banking"],
  },
  {
    id: 4,
    icon: <UserIcon width={44} height={44} />,
    text: "SMS Banking",
    route: "/products/banking-channel" as const,
    keywords: ["sms banking", "text banking", "mobile banking"],
  },
];

export const otherProductsData: PageItem[] = [
  {
    id: 4,
    icon: <PieIcon width={44} height={44} />,
    text: "POS Terminals",
    route: "/products/other-products" as const,
    keywords: ["pos terminals", "point of sale", "mobile banking"],
  },
];

export const functionsData = [
  {
    id: 1,
    icon: <FCardIcon width={44} height={44} />,
    text: "Cards",
    route: "/functions/cards" as const,
    keywords: ["link", "pin", "card"],
    class: "border-grey-200",
  },
  {
    id: 2,
    icon: <RMIcon />,
    text: "Relationship Mgmt.",
    route: "/functions/rm" as const,
    keywords: [
      "customer",
      "balance",
      "lien",
      "freeze",
      "transactions",
      "statement",
      "cheque",
      "service",
      "requests",
    ],
    class: "border-grey-200",
    },

  {
    id: 3,
    icon: <LinkBvnIcon width={44} height={44} />,
    text: "Link BVN/NIN",
    route: "/functions/link-ids" as const,
    keywords: ["bvn", "nin", "link", "identification", "id"],
    class: "border-grey-200",
    },

  {
    id: 4,
    icon: <FacilityIcon width={44} height={44} />,
    text: "Facility Repayment",
    route: "/functions/repayment" as const,
    keywords: ["facility", "repayment"],
    class: "border-grey-200",
  },
];

export const rmData = [
  {
    id: 1,
    icon: <CustomerDetailsIcon width={25} height={25} />,
    text: "View Customer Details",
    description: "Balance & customer details...",
    route: "/functions/rm/customer-details" as const,
    keywords: [
      "customer",
      "balance",
      "lien",
      "freeze",
      "transactions",
      "statement",
      "cheque",
      "service",
      "requests",
    ],
  },
  {
    id: 2,
    icon: <LienIcons width={25} height={25} />,
    description: "View restrictions & Blocked funds",
    text: "View LIEN / Freeze",
    route: "/functions/rm/lien" as const,
    keywords: ["link", "pin", "card"],
  },
  {
    id: 3,
    icon: <TransactionsIcon width={25} height={25} />,
    text: "View Transactions",
    route: "/functions/rm/transactions" as const,
    description: "View Statement & history",
    keywords: ["bvn", "nin", "link", "identification", "id"],
  },
  {
    id: 4,
    icon: <ChequeIcon width={25} height={25} />,
    text: "Confirm/Delete Cheque",
    description: "Confirm & Delete confirmed Cheque",
    route: "/functions/rm/cheque" as const,
    keywords: ["nuban", "customer"],
  },
  {
    id: 5,
    icon: <ServiceRequestIcon width={25} height={25} />,
    text: "Service requests",
    description: "Includes Tracker, reset, hotlist...",
    route: "/functions/rm/service-requests" as const,
    keywords: ["service", "request", "tracker", "reset", "hotlist"],
  },
];

export const accounts: PageItem[] = [
  {
    id: 1,
    icon: <OpenAccountIcon width={44} height={44} />,
    text: "Open Account",
    route: "/accounts/open/officer-details" as const,
    // route: "/accounts/open" as const,
    keywords: ["open account", "account"],
    class: "border-grey-200",
  },
  {
    id: 2,
    icon: <VerifyAccountIcon width={44} height={44} />,
    text: "Verify Account",
    route: "/accounts/verify" as const,
    keywords: ["verify account", "account"],
    class: "border-grey-200",
  },
];

export const serviceRequestData = [
  {
    id: 1,
    icon: <RequestTrackerIcon width={30} height={30} />,
    text: "Request Tracker",
    description: "Track customer requests",
    route: "/functions/rm/service-requests/request-tracker",
    keywords: ["tracker", "request", "request tracker", "customer request"],
  },
  {
    id: 2,
    icon: <PasswordResetIcon width={30} height={30} />,
    text: "GAPS Password Reset",
    description: "Reset GAPS password",
    route: "/functions/rm/service-requests/login-request",
    keywords: ["GAPS", "password", "reset"],
  },
  {
    id: 3,
    icon: <CardHotlist width={30} height={30} />,
    text: "Card Hotlist",
    description: "Block customer cards",
    route: "/functions/rm/service-requests/card-hotlist",
    keywords: ["card", "hotlist", "block", "customer"],
  },
];

export const openAccountData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon width={44} height={44} />,
    route: "/accounts/open/individual" as const,
    text: "Individual Account",
    keywords: ["Individual", "account"],
  },
  {
    id: 2,
    icon: <CorporateIcon width={44} height={44} />,
    route: "/accounts/open/corporate" as const,
    text: "Corporate Account",
    keywords: ["Corporate", "account"],
  },
  {
    id: 3,
    icon: <TeensAccountIcon width={44} height={44} />,
    route: "/accounts/open/teen" as const,
    text: "Teens Account",
    keywords: ["Teens", "account"],
  },
  {
    id: 4,
    icon: <PieIcon width={44} height={44} />,
    route: "/accounts/open/jaiz3" as const,
    text: "Jaiz 3 Account",
    keywords: ["Jaiz 3", "account"],
  },
];

export const IndividualAccountData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon width={44} height={44} />,
    route: "/accounts/open/individual/tier1" as const,
    text: "Tier 1",
    keywords: ["Tier 1", "individual", "account"],
  },
  {
    id: 2,
    icon: <UserIcon width={44} height={44} />,
    route: "/accounts/open/individual/tier3" as const,
    text: "Tier 3",
    keywords: ["Tier 3", "individual", "account"],
  },
];

export const TeenAccountData: PageItem[] = [
  {
    id: 1,
    icon: <TeensAccountIcon width={44} height={44} />,
    route: "/accounts/open/teen/tier1" as const,
    text: "Tier 1- Teen Account",
    keywords: ["Tier 1", "teen", "account"],
  },
  {
    id: 2,
    icon: <TeensAccountIcon width={44} height={44} />,
    route: "/accounts/open/teen/tier3" as const,
    text: "Tier 3 - Teen Account",
    keywords: ["Tier 3", "teen", "account"],
  },
];

export const Jaiz3AccountData: PageItem[] = [
  {
    id: 1,
    icon: <PieIcon width={44} height={44} />,
    route: "/accounts/open/jaiz3/tier1" as const,
    text: "Tier 1 - Jaiz 3 Account",
    keywords: ["Tier 1", "jaiz 3", "account"],
  },
  {
    id: 2,
    icon: <PieIcon width={44} height={44} />,
    route: "/accounts/open/jaiz3/tier3" as const,
    text: "Tier 3 - Jaiz 3 Account",
    keywords: ["Tier 3", "jaiz 3", "account"],
  },
];