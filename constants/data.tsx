import { OpenAccountIcon, VerifyAccountIcon } from "@/assets/images/svgs/account";
import {
  AccountIcon,
  FunctionIcon,
  ProductIcon,
  ResourceIcon,
} from "@/assets/images/svgs/category-icons";
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
import { PageItem, PageSection } from "@/types/page";

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

export const accounts: PageItem[] = [
  {
    id: 1,
    icon: <OpenAccountIcon width={44} height={44} />,
    text: "Open Account",
    route: "/accounts/open/officer-details" as const,
    keywords: ["open account", "account"],
    class: "border-white"
  },
  {
    id: 2,
    icon: <VerifyAccountIcon width={44} height={44} />,
    text: "Verify Account",
    route: "/accounts/verify" as const,
    keywords: ["verify account", "account"],
    class: "border-white",
  }
]
