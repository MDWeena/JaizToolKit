import {
  OpenAccountIcon,
  TeensAccountIcon,
  VerifyAccountIcon,
} from '@/assets/images/svgs/account';
import {
  AccountIcon,
  FunctionIcon,
  ProductIcon,
  ResourceIcon,
} from '@/assets/images/svgs/category-icons';
import {
  CardIcon as FCardIcon,
  FacilityIcon,
  LinkBvnIcon,
  RMIcon,
} from '@/assets/images/svgs/functions';
import {
  CardIcon,
  ChannelIcon,
  CorporateIcon,
  LoanIcon,
  PieIcon,
  UserIcon,
} from '@/assets/images/svgs/product-icons';
import {
  Directory,
  FAQsIcon,
  FormIcon,
  NIMCIcon,
  QuickLinks,
  SingleDirectoryIcon,
  SingleQuickLinkIcon,
  UnitUserIcon,
  UsefulCodes,
} from '@/assets/images/svgs/ressources';
import {
  ChequeIcon,
  CustomerDetailsIcon,
  LienIcons,
  ServiceRequestIcon,
  TransactionsIcon,
} from '@/assets/images/svgs/rm';
import {
  CardHotlist,
  PasswordResetIcon,
  RequestTrackerIcon,
} from '@/assets/images/svgs/service-requests';
import { PageItem } from '@/types/page';

export const categoriesData: PageItem[] = [
  {
    id: 1,
    icon: <AccountIcon width={44} height={44} />,
    text: 'Account',
    route: '/(tabs)/(home)/(categories)/accounts' as const,
    keywords: ['accounts'],
    class: 'border-error/40 bg-error/20',
  },
  {
    id: 2,
    icon: <FunctionIcon width={44} height={44} />,
    text: 'Function',
    route: '/(tabs)/(home)/(categories)/functions' as const,
    keywords: ['functions'],
    class: 'border-secondary/40 bg-secondary/20',
  },
  {
    id: 3,
    icon: <ProductIcon width={44} height={44} />,
    text: 'Product',
    route: '/(tabs)/(home)/(categories)/products' as const,
    keywords: ['products'],
    class: 'border-primary/40 bg-primary/20',
  },
  {
    id: 4,
    icon: <ResourceIcon width={44} height={44} />,
    text: 'Resource',
    route: '/(tabs)/(home)/(categories)/resources' as const,
    keywords: ['resources', 'help', 'support'],
    class: 'border-success/40 bg-success/20',
  },
];

export const productsData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon />,
    text: 'Account Type',
    route: '/products/account-type' as const,
    keywords: ['account type', 'account'],
  },
  {
    id: 4,
    icon: <LoanIcon />,
    text: 'Loan',
    route: '/products/loan' as const,
    keywords: ['loan', 'credit', 'finance'],
  },
  {
    id: 2,
    icon: <CardIcon />,
    text: 'Card',
    route: '/products/card' as const,
    keywords: ['card', 'debit', 'credit'],
  },
  {
    id: 3,
    icon: <ChannelIcon />,
    text: 'Banking Channel',
    route: '/products/banking-channel' as const,
    keywords: ['banking channel', 'channel'],
  },
  {
    id: 5,
    icon: <PieIcon />,
    text: 'Other Products',
    route: '/products/other-products' as const,
    keywords: ['other products', 'products'],
  },
];

export const accountTypeData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon />,
    text: 'Individual',
    route: '/products/account-type/individual' as const,
    keywords: ['individual', 'account'],
  },
  {
    id: 2,
    icon: <CorporateIcon />,
    text: 'Corporate',
    route: '/products/account-type/corporate' as const,
    keywords: ['corporate', 'account'],
  },
];

// export const individualAccountsData: PageItem[] = [
//   {
//     id: 1,
//     icon: <UserIcon width={44} height={44} />,
//     route: "/products/account-type/individual" as const,
//     text: "Jaiz Instant Account",
//     keywords: ["jaiz instant", "instant account", "jaiz"],
//   },
//   {
//     id: 2,
//     icon: <UserIcon width={44} height={44} />,
//     route: "/products/account-type/individual" as const,
//     text: "eAccount",
//     keywords: ["eaccount", "electronic account"],
//   },
//   {
//     id: 3,
//     icon: <UserIcon width={44} height={44} />,
//     route: "/products/account-type/individual" as const,
//     text: "Jaiz Target",
//     keywords: ["jaiz target", "target account"],
//   },
//   {
//     id: 4,
//     icon: <UserIcon width={44} height={44} />,
//     route: "/products/account-type/individual" as const,
//     text: "Jaiz EasySavers Account",
//     keywords: ["easysavers", "easy savers", "jaiz"],
//   },
//   {
//     id: 5,
//     icon: <UserIcon width={44} height={44} />,
//     text: "Teens Account",
//     route: "/products/account-type/individual/teens-account" as const,
//     keywords: ["teens account", "teen", "jaiz"],
//   },
//   {
//     id: 6,
//     icon: <UserIcon width={44} height={44} />,
//     text: "Jaiz eSavers",
//     route: "/products/account-type/individual" as const,
//     keywords: ["esavers", "jaiz esavers", "savers"],
//   },
// ];
// export const individualAccountsData: PageItem[] = [
//   {
//     id: 1,
//     icon: <UserIcon width={44} height={44} />,
//     route: "/products/account-type/individual" as const,
//     text: "Jaiz Instant Account",
//     keywords: ["jaiz instant", "instant account", "jaiz"],
//   },
//   {
//     id: 2,
//     icon: <UserIcon width={44} height={44} />,
//     route: "/products/account-type/individual" as const,
//     text: "eAccount",
//     keywords: ["eaccount", "electronic account"],
//   },
//   {
//     id: 3,
//     icon: <UserIcon width={44} height={44} />,
//     route: "/products/account-type/individual" as const,
//     text: "Jaiz Target",
//     keywords: ["jaiz target", "target account"],
//   },
//   {
//     id: 4,
//     icon: <UserIcon width={44} height={44} />,
//     route: "/products/account-type/individual" as const,
//     text: "Jaiz EasySavers Account",
//     keywords: ["easysavers", "easy savers", "jaiz"],
//   },
//   {
//     id: 5,
//     icon: <UserIcon width={44} height={44} />,
//     text: "Teens Account",
//     route: "/products/account-type/individual/teens-account" as const,
//     keywords: ["teens account", "teen", "jaiz"],
//   },
//   {
//     id: 6,
//     icon: <UserIcon width={44} height={44} />,
//     text: "Jaiz eSavers",
//     route: "/products/account-type/individual" as const,
//     keywords: ["esavers", "jaiz esavers", "savers"],
//   },
// ];
export const individualAccountsData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon />,
    route: '/products/account-type/individual/tier1' as const,
    text: 'Tier 1 Account',
    keywords: ['tier 1', 'tier one', 'jaiz'],
  },
  {
    id: 2,
    icon: <UserIcon />,
    route: '/products/account-type/individual/tier3' as const,
    text: 'Tier 3 Account',
    keywords: ['tier 3', 'tier three', 'jaiz'],
  },
  {
    id: 3,
    icon: <UserIcon />,
    route: '/products/account-type/individual/current-account' as const,
    text: ' Current Account',
    keywords: ['current account', 'current'],
  },
  {
    id: 4,
    icon: <UserIcon />,
    route: '/products/account-type/individual/domicilliary-account' as const,
    text: 'Jaiz Domicilliary Account',
    keywords: ['easysavers', 'easy savers', 'jaiz'],
  },
  {
    id: 5,
    icon: <UserIcon />,
    route: '/products/account-type/individual/japsa-term-deposit' as const,
    text: 'JAPSA Term Deposit(JTD)',
    keywords: ['japsa term deposit', 'jtd', 'jaiz'],
  },
  {
    id: 6,
    icon: <UserIcon />,
    text: 'Teens Account',
    route: '/products/account-type/individual/teens-account' as const,
    keywords: ['teens account', 'teen', 'jaiz'],
  },
  {
    id: 7,
    icon: <UserIcon />,
    text: 'Hajj Savings Account',
    route: '/products/account-type/individual/hajj-savings-account' as const,
    keywords: ['hajj savings account', 'hajj', 'savings'],
  },
];

export const loansData: PageItem[] = [
  {
    id: 1,
    icon: <LoanIcon />,
    text: 'Murabaha',
    route: '/products/loan/murabaha' as const,
    keywords: ['murabaha', 'murabaha loan'],
  },
  {
    id: 2,
    icon: <LoanIcon />,
    text: 'Ijara Muntahiya Bittamlik',
    route: '/products/loan/ijara-muntahiya-bittamlik' as const,
    keywords: ['ijara muntahiya bittamlik', 'ijara muntahiya bittamlik loan'],
  },
  {
    id: 3,
    icon: <LoanIcon />,
    text: 'Ijara Service',
    route: '/products/loan/ijara-service' as const,
    keywords: ['ijara service', 'ijara loan service'],
  },
  {
    id: 4,
    icon: <LoanIcon />,
    text: 'Istisna',
    route: '/products/loan/istisna' as const,
    keywords: ['istisna', 'istisna loan'],
  },
  {
    id: 5,
    icon: <LoanIcon />,
    text: 'Bai\' Muajjal',
    route: '/products/loan/bai-muajjal' as const,
    keywords: ['bai\' muajjal', 'bai muajjal loan'],
  },
  {
    id: 6,
    icon: <LoanIcon />,
    text: 'Salam',
    route: '/products/loan/salam' as const,
    keywords: ['salam', 'salam loan'],
  },
  {
    id: 7,
    icon: <LoanIcon />,
    text: 'Musharaka',
    route: '/products/loan/musharaka' as const,
    keywords: ['musharaka', 'musharaka loan'],
  },
  {
    id: 8,
    icon: <LoanIcon />,
    text: 'Wakala',
    route: '/products/loan/wakala' as const,
    keywords: ['wakala', 'wakala loan'],
  },
];

export const cardsData: PageItem[] = [
  {
    id: 1,
    icon: <CardIcon />,
    text: 'Verve Card',
    route: '/products/card/verve' as const,
    keywords: ['verve card'],
  },
  {
    id: 2,
    icon: <CardIcon />,
    text: 'Visa Dollar Card',
    route: '/products/card/visa-dollar' as const,
    keywords: ['visa dollar card'],
  },
  {
    id: 3,
    icon: <UserIcon />,
    text: 'Master Card',
    route: '/products/card/master' as const,
    keywords: ['master card'],
  },
  {
    id: 4,
    icon: <UserIcon />,
    text: 'Afrigo Card',
    route: '/products/card/afrigo' as const,
    keywords: ['afrigo card'],
  },
];

export const bankingChannelsData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon />,
    text: 'Mobile Banking',
    route: '/products/banking-channel/mobile' as const,
    keywords: ['mobile banking', 'banking app'],
  },
  {
    id: 2,
    icon: <UserIcon />,
    text: 'Internet Banking',
    route: '/products/banking-channel/internet' as const,
    keywords: ['internet banking', 'online banking'],
  },
  {
    id: 3,
    icon: <UserIcon />,
    text: 'USSD Banking',
    route: '/products/banking-channel/ussd' as const,
    keywords: ['ussd', 'banking'],
  },
];

export const otherProductsData: PageItem[] = [
  {
    id: 4,
    icon: <PieIcon />,
    text: 'POS Terminals',
    route: '/products/other-products' as const,
    keywords: ['pos terminals', 'point of sale', 'mobile banking'],
  },
];

export const functionsData: PageItem[] = [
  {
    id: 1,
    icon: <FCardIcon />,
    text: 'Cards',
    route: '/functions/cards' as const,
    keywords: ['link', 'pin', 'card'],
    class: 'border-grey-200',
  },
  {
    id: 2,
    icon: <RMIcon />,
    text: 'Relationship Mgmt.',
    route: '/functions/rm' as const,
    keywords: [
      'customer',
      'balance',
      'lien',
      'restrictions',
      'transactions',
      'statement',
      'cheque',
      'service',
      'requests',
    ],
    class: 'border-grey-200',
  },

  {
    id: 3,
    icon: <LinkBvnIcon />,
    text: 'Link BVN/NIN',
    route: '/functions/linking' as const,
    keywords: ['bvn', 'nin', 'link', 'identification', 'id'],
    class: 'border-grey-200',
  },

  {
    id: 4,
    icon: <FacilityIcon />,
    text: 'Facility Repayment',
    route: '/functions' as const,
    keywords: ['facility', 'repayment'],
    class: 'border-grey-200',
  },
];

export const rmData : PageItem[] = [
  {
    id: 1,
    icon: <CustomerDetailsIcon width={25} height={25} />,
    text: 'View Customer Details',
    description: 'Balance & customer details...',
    route: '/functions/rm/customer-details' as const,
    keywords: [
      'customer',
      'balance',
      'lien',
      'restrictions',
      'transactions',
      'statement',
      'cheque',
      'service',
      'requests',
    ],
  },
  {
    id: 2,
    icon: <LienIcons width={25} height={25} />,
    description: 'View restrictions & Blocked funds',
    text: 'View LIEN / Retrictions',
    route: '/functions/rm/lien' as const,
    keywords: ['link', 'pin', 'card'],
  },
  {
    id: 3,
    icon: <TransactionsIcon width={25} height={25} />,
    text: 'View Transactions',
    route: '/functions/rm/transactions' as const,
    description: 'View Statement & history',
    keywords: ['bvn', 'nin', 'link', 'identification', 'id'],
  },
  {
    id: 4,
    icon: <ChequeIcon width={25} height={25} />,
    text: 'Confirm/Delete Cheque',
    description: 'Confirm & Delete confirmed Cheque',
    route: '/functions/rm/cheque' as const,
    keywords: ['nuban', 'customer'],
  },
  {
    id: 5,
    icon: <ServiceRequestIcon width={25} height={25} />,
    text: 'Service requests',
    description: 'Includes Tracker, reset, hotlist...',
    route: '/functions/rm/service-requests' as const,
    keywords: ['service', 'request', 'tracker', 'reset', 'hotlist'],
  },
];

export const accounts: PageItem[] = [
  {
    id: 1,
    icon: <OpenAccountIcon width={44} height={44} />,
    text: 'Open Account',
    route: '/accounts/open/officer-details' as const,
    // route: "/accounts/open" as const,
    keywords: ['open account', 'account'],
    class: 'border-grey-200',
  },
  {
    id: 2,
    icon: <VerifyAccountIcon width={44} height={44} />,
    text: 'Verify Account',
    route: '/accounts/verify' as const,
    keywords: ['verify account', 'account'],
    class: 'border-grey-200',
  },
];

export const serviceRequestData : PageItem[] = [
  {
    id: 1,
    icon: <RequestTrackerIcon width={30} height={30} />,
    text: 'Request Tracker',
    description: 'Track customer requests',
    route: '/functions/rm/service-requests/request-tracker',
    keywords: ['tracker', 'request', 'request tracker', 'customer request'],
  },
  {
    id: 2,
    icon: <PasswordResetIcon width={30} height={30} />,
    text: 'Log in Detail Request',
    description: 'Reset password',
    route: '/functions/rm/service-requests/login-request',
    keywords: ['GAPS', 'password', 'reset'],
  },
  {
    id: 3,
    icon: <CardHotlist width={30} height={30} />,
    text: 'Card Hotlist',
    description: 'Block customer cards',
    route: '/functions/rm/service-requests/card-hotlist',
    keywords: ['card', 'hotlist', 'block', 'customer'],
  },
];

export const openAccountData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon />,
    route: '/accounts/open/individual' as const,
    text: 'Individual Account',
    keywords: ['Individual', 'account'],
  },
  {
    id: 2,
    icon: <CorporateIcon />,
    route: '/accounts/open/corporate' as const,
    text: 'Corporate Account',
    keywords: ['Corporate', 'account'],
  },
  {
    id: 3,
    icon: <TeensAccountIcon />,
    route: '/accounts/open/teen' as const,
    text: 'Teens Account',
    keywords: ['Teens', 'account'],
  },
  {
    id: 4,
    icon: <PieIcon />,
    route: '/accounts/open/jaiz3' as const,
    text: 'Jaiz 3 Account',
    keywords: ['Jaiz 3', 'account'],
  },
];

export const IndividualAccountData: PageItem[] = [
  {
    id: 1,
    icon: <UserIcon />,
    route: '/accounts/open/individual/tier1' as const,
    text: 'Tier 1',
    keywords: ['Tier 1', 'individual', 'account'],
  },
  {
    id: 2,
    icon: <UserIcon />,
    route: '/accounts/open/individual/tier3' as const,
    text: 'Tier 3',
    keywords: ['Tier 3', 'individual', 'account'],
  },
];

export const TeenAccountData: PageItem[] = [
  {
    id: 1,
    icon: <TeensAccountIcon />,
    route: '/accounts/open/teen/tier1' as const,
    text: 'Tier 1- Teen Account',
    keywords: ['Tier 1', 'teen', 'account'],
  },
  {
    id: 2,
    icon: <TeensAccountIcon />,
    route: '/accounts/open/teen/tier3' as const,
    text: 'Tier 3 - Teen Account',
    keywords: ['Tier 3', 'teen', 'account'],
  },
];

export const Jaiz3AccountData: PageItem[] = [
  {
    id: 1,
    icon: <PieIcon />,
    route: '/accounts/open/jaiz3/tier1' as const,
    text: 'Tier 1 - Jaiz 3 Account',
    keywords: ['Tier 1', 'jaiz 3', 'account'],
  },
  {
    id: 2,
    icon: <PieIcon />,
    route: '/accounts/open/jaiz3/tier3' as const,
    text: 'Tier 3 - Jaiz 3 Account',
    keywords: ['Tier 3', 'jaiz 3', 'account'],
  },
];

export const transactionHistoryData = [
  {
    period: 'Today',
    transactions: [
      {
        id: 1,
        amount: '₦50,000.00',
        direction: 'credit',
        actor: 'Yusuf Salisu',
        type: 'Transfer',
      },

      {
        id: 2,
        amount: '₦50,000.00',
        direction: 'debit',
        actor: 'Yusuf Salisu',
        type: 'Transfer',
      },
    ],
  },
  {
    period: 'Yesterday',
    transactions: [
      {
        id: 1,
        amount: '₦20,000.00',
        direction: 'debit',
        actor: 'Aminu Bello',
        type: 'Transfer',
      },
      {
        id: 2,
        amount: '₦100,000.00',
        direction: 'credit',
        actor: 'Aminu Bello',
        type: 'Transfer',
      },
      {
        id: 1,
        amount: '₦20,000.00',
        direction: 'debit',
        actor: 'Aminu Bello',
        type: 'Transfer',
      },
      {
        id: 2,
        amount: '₦100,000.00',
        direction: 'credit',
        actor: 'Aminu Bello',
        type: 'Transfer',
      },
      {
        id: 1,
        amount: '₦20,000.00',
        direction: 'debit',
        actor: 'Aminu Bello',
        type: 'Transfer',
      },
      {
        id: 2,
        amount: '₦100,000.00',
        direction: 'credit',
        actor: 'Aminu Bello',
        type: 'Transfer',
      },
    ],
  },
];

export const resourcesData = [
  {
    id: 1,
    icon: <FormIcon width={44} height={44} />,
    text: 'Forms',
    route: '/resources/forms' as const,
    keywords: ['link', 'pin', 'card'],
    class: 'border-grey-200',
  },
  {
    id: 2,
    icon: <UsefulCodes width={44} height={44} />,
    text: 'Useful Codes',
    route: '/resources/useful-codes' as const,
    keywords: ['codes', 'sort codes', 'pc codes'],
    class: 'border-grey-200',
  },

  {
    id: 3,
    icon: <QuickLinks width={44} height={44} />,
    text: 'Quick Links',
    route: '/resources/quick-links' as const,
    keywords: ['quick', 'links', 'quick links'],
    class: 'border-grey-200',
  },

  {
    id: 4,
    icon: <Directory width={44} height={44} />,
    text: 'Directories',
    route: '/resources/directories' as const,
    keywords: ['directories', 'unit', 'hmo'],
    class: 'border-grey-200',
  },

  {
    id: 5,
    icon: <FAQsIcon width={44} height={44} />,
    text: 'FAQs',
    route: '/resources/faqs' as const,
    keywords: ['faqs', 'frequently asked questions', 'questions'],
    class: 'border-grey-200',
  },

  {
    id: 6,
    icon: <NIMCIcon width={44} height={44} />,
    text: 'NIMC Centres',
    route: '/resources/nimc' as const,
    keywords: ['nimc'],
    class: 'border-grey-200',
  },
];

export const quickLinksData : PageItem[] = [
  { 
    id: 1,
    text: 'ProcessMaker',
    url: '',
    icon: <SingleQuickLinkIcon width={25} height={25} />,
  },
  {
    id: 2,
    text: 'Office 635',
    url: '',
    icon: <SingleQuickLinkIcon width={25} height={25} />,
  },
  {
    id: 3,
    text: 'CRM Portal',
    url: '',
    icon: <SingleQuickLinkIcon width={25} height={25} />,
  },
  {
    id: 4,
    text: 'Digital Skills',
    url: '',
    icon: <SingleQuickLinkIcon width={25} height={25} />,
  },
  {
    id: 5,
    text: 'E-Library',
    url: '',
    icon: <SingleQuickLinkIcon width={25} height={25} />,
  },
];

export const directoriesData = [
  {
    id: 1,
    text: 'Unit Directories',
    link: '/resources/directories/unit' as const,
    icon: <SingleDirectoryIcon width={25} height={25} />,
  },
  {
    id: 2,
    text: 'Escalation Directories',
    link: '/resources/directories/escalation' as const,
    icon: <SingleDirectoryIcon width={25} height={25} />,
    external: true,
  },
  {
    id: 3,
    text: 'HMO Directories',
    link: '/resources/directories/hmo' as const,
    icon: <SingleDirectoryIcon width={25} height={25} />,
    external: true,
  },
];

export const directoryContacts = [
  {
    name: 'John Doe',
    phone: '08012345678',
  },
  {
    name: 'Jane Smith',
    phone: '08087654321',
  },
  {
    name: 'Michael Johnson',
    phone: '08123456789',
  },
  {
    name: 'Branch Head',
    phone: '08098765432',
  },
  {
    name: 'Customer Service',
    phone: '08134567890',
  },
  {
    name: 'Security Officer',
    phone: '08045678901',
  },
  {
    name: 'Switchboard',
    phone: '07012345678',
  },
  {
    name: 'IT Support',
    phone: '07087654321',
  },
  {
    name: 'CBG',
    phone: '08123456780',
  },
];

export const usefulCodesData : PageItem[] = [
  {
    id: 1,
    text: 'Sort Codes',
    url: '',
    icon: <UnitUserIcon width={25} height={25} />,
  },
  {
    id: 2,
    text: 'PC Codes',
    url: '',
    icon: <UnitUserIcon width={25} height={25} />,
  },
];

export const NIMCCentresData = [
  {
    id: 1,
    centre: 'Ajah',
    location: 'Lagos Island',
    live: true,
    operational: true,
  },
  {
    id: 2,
    centre: 'Maitama',
    location: 'Abuja',
    live: false,
    operational: true,
  },
  {
    id: 3,
    centre: 'Kaduna',
    location: 'Kaduna State',
    live: true,
    operational: false,
  },
  {
    id: 4,
    centre: 'Port Harcourt',
    location: 'Rivers State',
    live: false,
    operational: false,
  },
];

export const faqsData = [
  {
    id: 1,
    question: 'How to generate card statement?',
    answer:
      "To generate your card statement, log in to the Jaiz Bank App or Internet Banking platform. Navigate to the 'Cards' section, select your card, and choose the 'Generate Statement' option. You can specify the date range for the statement you wish to generate.",
    categories: ['Cards', 'Channels'],
  },
  {
    id: 2,
    question: 'How to link BVN to my account?',
    answer:
      "To link your BVN to your Jaiz Bank account, you can visit any Jaiz Bank branch with a valid ID and your BVN. Alternatively, you can use the Jaiz Bank App or Internet Banking platform to link your BVN online by navigating to the 'Profile' or 'Account Settings' section and following the prompts to link your BVN.",
    categories: ['Accounts'],
  },
  {
    id: 3,
    question: 'What are the charges for SMS banking?',
    answer:
      'Jaiz Bank offers SMS banking services at a nominal fee. The charges may vary based on the type of transaction you perform via SMS. For detailed information on SMS banking charges, please refer to the official Jaiz Bank website or contact customer service.',
    categories: ['Channels'],
  },
  {
    id: 4,
    question: 'What is the interest rate for Jaiz Salary Advance?',
    answer:
      'The interest rate for Jaiz Salary Advance is competitive and may vary based on the amount and tenure of the advance. For the most accurate and up-to-date information on interest rates, please visit the Jaiz Bank website or contact your relationship manager.',
    categories: ['Loans'],
  },
  {
    id: 5,
    question: 'How to reset my Internet Banking password?',
    answer:
      'To reset your Internet Banking password, go to the Jaiz Bank Internet Banking login page and click on the "Forgot Password" link. Follow the instructions provided, which may include verifying your identity through email or SMS, to create a new password.',
    categories: ['Channels', 'Functions'],
  },
  {
    id: 6,
    question: 'Where can I find Jaiz Bank forms?',
    answer:
      'Jaiz Bank forms can be found on the official Jaiz Bank website under the "Resources" or "Forms" section. You can download the required forms for various services such as account opening, loan applications, and more.',
    categories: ['Resources'],
  },
  {
    id: 7,
    question: 'How to contact Jaiz Bank customer service?',
    answer:
      'You can contact Jaiz Bank customer service through various channels including phone, email, or by visiting a local branch. The customer service hotline is available on the Jaiz Bank website, and you can also reach out via the Jaiz Bank App for assistance.',
    categories: ['Resources'],
  },
];

export const formsData = [
  {
    id: 1,
    name: 'Tier 3 Individual Account Opening',
    categories: ['Account Opening', 'Individual Accounts'],
  },
  {
    id: 2,
    name: 'Tier 1 Individual Account Opening',
    categories: ['Account Opening', 'Individual Accounts'],
  },
  {
    id: 3,
    name: 'Corporate Account Opening',
    categories: ['Account Opening', 'Corporate Accounts'],
  },
  {
    id: 4,
    name: 'Teens Account Opening',
    categories: ['Account Opening', 'Teen Accounts'],
  },
  {
    id: 5,
    name: 'Jaiz 3 Account Opening',
    categories: ['Account Opening', 'Jaiz 3 Accounts'],
  },
  {
    id: 6,
    name: 'Loan Application Form',
    categories: ['Loans'],
  },
  {
    id: 7,
    name: 'Card Request Form',
    categories: ['Cards'],
  },
  {
    id: 8,
    name: 'Account Closure Form',
    categories: ['Account Management'],
  },
];
