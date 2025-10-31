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
  DocumentIcon,
  LoanIcon,
  PieIcon,
  TargetIcon,
  UserIcon,
} from '@/assets/images/svgs/product-icons';
import {
  ChequeIcon,
  CustomerDetailsIcon,
  LienIcons,
  ServiceRequestIcon,
  TransactionsIcon,
} from '@/assets/images/svgs/rm';

export const categoriesData = [
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

export const productsData = [
  {
    id: 1,
    icon: <UserIcon width={44} height={44} />,
    text: 'Account Type',
    route: '/products/account-type' as const,
    keywords: ['account type', 'account'],
  },
  {
    id: 4,
    icon: <LoanIcon width={44} height={44} />,
    text: 'Loan',
    route: '/products/loan' as const,
    keywords: ['loan', 'credit', 'finance'],
  },
  {
    id: 2,
    icon: <CardIcon width={44} height={44} />,
    text: 'Card',
    route: '/products/card' as const,
    keywords: ['card', 'debit', 'credit'],
  },
  {
    id: 3,
    icon: <ChannelIcon width={44} height={44} />,
    text: 'Banking Channel',
    route: '/products/banking-channel' as const,
    keywords: ['banking channel', 'channel'],
  },
  {
    id: 5,
    icon: <PieIcon width={44} height={44} />,
    text: 'Other Products',
    route: '/products/other-products' as const,
    keywords: ['other products', 'products'],
  },
];

export const accountTypeData = [
  {
    id: 1,
    icon: <UserIcon width={44} height={44} />,
    text: 'Individual',
    route: '/products/account-type/individual' as const,
    keywords: ['individual', 'account'],
  },
  {
    id: 2,
    icon: <CorporateIcon width={44} height={44} />,
    text: 'Corporate',
    route: '/products/account-type/corporate' as const,
    keywords: ['corporate', 'account'],
  },
];

export const individualAccountsData = [
  {
    id: 1,
    icon: <UserIcon width={44} height={44} />,
    text: 'Jaiz Instant Account',
    route: '/(tabs)/(home)/(accounts)/jaiz-instant-account' as const,
    keywords: ['jaiz instant', 'instant account', 'jaiz'],
  },
  {
    id: 2,
    icon: <UserIcon width={44} height={44} />,
    text: 'eAccount',
    route: '/(tabs)/(home)/(accounts)/eaccount' as const,
    keywords: ['eaccount', 'electronic account'],
  },
  {
    id: 3,
    icon: <UserIcon width={44} height={44} />,
    text: 'Jaiz Target',
    route: '/(tabs)/(home)/(accounts)/jaiz-target' as const,
    keywords: ['jaiz target', 'target account'],
  },
  {
    id: 4,
    icon: <UserIcon width={44} height={44} />,
    text: 'Jaiz EasySavers Account',
    route: '/(tabs)/(home)/(accounts)/jaiz-easysavers-account' as const,
    keywords: ['easysavers', 'easy savers', 'jaiz'],
  },
  {
    id: 5,
    icon: <UserIcon width={44} height={44} />,
    text: 'Teens Account',
    route: '/products/account-type/individual/teens-account' as const,
    keywords: ['teens account', 'teen', 'jaiz'],
  },
  {
    id: 6,
    icon: <UserIcon width={44} height={44} />,
    text: 'Jaiz eSavers',
    route: '/(tabs)/(home)/(accounts)/jaiz-esavers' as const,
    keywords: ['esavers', 'jaiz esavers', 'savers'],
  },
];

export const corporateAccountsData = [
  {
    id: 1,
    icon: <CorporateIcon width={44} height={44} />,
    text: 'Jaiz Max',
    route: '/products/account-type/corporate/jaiz-max' as const,
    keywords: ['corporate', 'account', 'jaiz max'],
  },
  {
    id: 2,
    icon: <CorporateIcon width={44} height={44} />,
    text: 'Jaiz Business',
    route: '/products/account-type/corporate/jaiz-business' as const,
    keywords: ['corporate', 'account', 'jaiz business'],
  },
];

export const teenAccountData = [
  {
    id: 1,
    section: 'Description',
    content: [
      'Start your children on the road to financial success.',
      'The Smart Kids Save account is designed to enable parents/guardians save for their children under 18 years of age, whilst also developing a savings culture in them.',
      'Teaching children the value of savings early can help them develop SMART financial habits for life.',
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 2,
    section: 'Target Market',
    content: [
      'Minimum opening/account balance of N1,000.00 (One Thousand Naira Only).',
      'Periodic lodgements can be made into the account through Standing Order/automated direct debits.',
      'Complimentary invite to SKS Fun events.',
      'SKS can be converted into a regular savings or current account, with the young saver as an authorized signatory. This is however only after the Smart kid saver has attained the age of 18.',
      'From the age of 13, an SKS Teen account will be opened for the teenager which comes with a Trendy Teen MasterCard (issued upon Parent’s request) so the child can learn to manage money responsibly.',
    ],
    icon: <TargetIcon width={32} height={32} />,
  },
  {
    id: 3,
    section: 'Features & Benefits',
    content: [
      'Minimum opening/account balance of N1,000.00 (One Thousand Naira Only).',
      'Periodic lodgements can be made into the account through Standing Order/automated direct debits.',
      'Complimentary invite to SKS Fun events.',
      'SKS can be converted into a regular savings or current account, with the young saver as an authorized signatory. This is however only after the Smart kid saver has attained the age of 18.',
      'From the age of 13, an SKS Teen account will be opened for the teenager which comes with a Trendy Teen MasterCard (issued upon Parent’s request) so the child can learn to manage money responsibly.',
    ],
    icon: <DocumentIcon width={32} height={32} />,
  },
  {
    id: 4,
    section: 'Documentation',
    content: [],
    icon: <DocumentIcon width={32} height={32} />,
  },
];

export const loansData = [
  {
    id: 1,
    icon: <LoanIcon width={44} height={44} />,
    text: 'Jaiz Salary Advance',
    route: '/(tabs)/(home)/(loans)/jaiz-salary-advance' as const,
    keywords: ['salary advance', 'jaiz'],
  },
  {
    id: 2,
    icon: <LoanIcon width={44} height={44} />,
    text: 'Max Advance',
    route: '/(tabs)/(home)/(loans)/max-advance' as const,
    keywords: ['max advance', 'advance'],
  },
  {
    id: 3,
    icon: <LoanIcon width={44} height={44} />,
    text: 'MaxPlus',
    route: '/(tabs)/(home)/(loans)/maxplus' as const,
    keywords: ['maxplus', 'max plus'],
  },
  {
    id: 4,
    icon: <LoanIcon width={44} height={44} />,
    text: 'Jaiz Auto',
    route: '/(tabs)/(home)/(loans)/jaiz-auto' as const,
    keywords: ['auto', 'jaiz auto'],
  },
  {
    id: 5,
    icon: <LoanIcon width={44} height={44} />,
    text: 'Jaiz Mortgage',
    route: '/(tabs)/(home)/(loans)/jaiz-mortgage' as const,
    keywords: ['mortgage', 'jaiz mortgage'],
  },
  {
    id: 6,
    icon: <LoanIcon width={44} height={44} />,
    text: 'School Fees Advance',
    route: '/(tabs)/(home)/(loans)/school-fees-advance' as const,
    keywords: ['school fees advance', 'school fees'],
  },
  {
    id: 7,
    icon: <LoanIcon width={44} height={44} />,
    text: 'CBN MSME Development Fund',
    route: '/(tabs)/(home)/(loans)/cbn-msme-development-fund' as const,
    keywords: ['cbn msme', 'development fund', 'msme'],
  },
  {
    id: 8,
    icon: <LoanIcon width={44} height={44} />,
    text: 'CBN SME Credit Guarantee Scheme',
    route: '/(tabs)/(home)/(loans)/cbn-sme-credit-guarantee-scheme' as const,
    keywords: ['cbn sme', 'credit guarantee', 'scheme'],
  },
];

export const cardsData = [
  {
    id: 1,
    icon: <CardIcon width={44} height={44} />,
    text: 'Prepaid Utility Card',
    route: '/(tabs)/(home)/(cards)/prepaid-utility-card' as const,
    keywords: ['prepaid utility card', 'utility card', 'prepaid'],
  },
  {
    id: 2,
    icon: <CardIcon width={44} height={44} />,
    text: 'Prepaid Virtual Card',
    route: '/(tabs)/(home)/(cards)/prepaid-virtual-card' as const,
    keywords: ['prepaid virtual card', 'virtual card', 'prepaid'],
  },
  {
    id: 3,
    icon: <UserIcon width={44} height={44} />,
    text: 'One Time Password',
    route: '/(tabs)/(home)/(cards)/one-time-password' as const,
    keywords: ['one time password', 'otp', 'password'],
  },
  {
    id: 4,
    icon: <UserIcon width={44} height={44} />,
    text: 'Card-Less Withdrawal',
    route: '/(tabs)/(home)/(cards)/card-less-withdrawal' as const,
    keywords: ['card-less withdrawal', 'cardless', 'withdrawal'],
  },
];

export const bankingChannelsData = [
  {
    id: 1,
    icon: <UserIcon width={44} height={44} />,
    text: 'Jaiz Bank App',
    route: '/' as const,
    keywords: ['jaiz bank', 'banking app'],
  },
  {
    id: 2,
    icon: <UserIcon width={44} height={44} />,
    text: 'Internet Banking',
    route: '/' as const,
    keywords: ['internet banking', 'online banking'],
  },
  {
    id: 3,
    icon: <UserIcon width={44} height={44} />,
    text: 'USSD Bank',
    route: '/' as const,
    keywords: ['ussd', 'banking', 'mobile banking'],
  },
  {
    id: 4,
    icon: <UserIcon width={44} height={44} />,
    text: 'SMS Banking',
    route: '/' as const,
    keywords: ['sms banking', 'text banking', 'mobile banking'],
  },
];

export const otherProductsData = [
  {
    id: 4,
    icon: <PieIcon width={44} height={44} />,
    text: 'POS Terminals',
    route: '/' as const,
    keywords: ['pos terminals', 'point of sale', 'mobile banking'],
  },
];

export const functionsData = [
  {
    id: 1,
    icon: <FCardIcon width={44} height={44} />,
    text: 'Cards',
    route: '/functions/cards' as const,
    keywords: ['link', 'pin', 'card'],
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
      'freeze',
      'transactions',
      'statement',
      'cheque',
      'service',
      'requests',
    ],
  },

  {
    id: 3,
    icon: <LinkBvnIcon width={44} height={44} />,
    text: 'Link BVN/NIN',
    route: '/functions/link-ids' as const,
    keywords: ['bvn', 'nin', 'link', 'identification', 'id'],
  },

  {
    id: 4,
    icon: <FacilityIcon width={44} height={44} />,
    text: 'Facility Repayment',
    route: '/functions/repayment' as const,
    keywords: ['facility', 'repayment'],
  },
];

export const rmData = [
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
      'freeze',
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
    text: 'View LIEN / Freeze',
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
