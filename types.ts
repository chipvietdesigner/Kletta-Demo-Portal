export interface IncomeTransaction {
  id: string;
  date: string;
  customer: string;
  description?: string; // For sub-text like "Torstai Timma..."
  category: string;
  typeId: string;
  hasDocument: boolean;
  reference: string;
  reconciled: boolean;
  subtotal: number;
  taxRate: string;
  vat: number;
  totalAmount: number;
  isVerified: boolean;
  isAiVerified: boolean;
  // New fields for horizontal scroll
  paymentMethod: string;
  dueDate: string;
  project?: string;
  costCenter?: string;
  createdBy: string;
}

export interface Client {
  id: number;
  email: string;
  countryCode: string; // 'FI' or 'UK' for flag rendering
  plan: string;
  utr: string;
  isUtrVerified: boolean;
  isPrepaymentRegistered: boolean;
  companyName: string;
  firstName: string;
  lastName: string;
  phone: string;
  salesPerson: string;
  cardAddedDate: string;
  bankName: string;
  profession: string;
  city: string;
}

export enum NavItemType {
  WELCOME = 'Welcome',
  CHAT = 'Chat',
  ALL_CLIENTS = 'All clients',
  INVITATIONS = 'Invitations',
  ACCOUNT = 'Account',
  DASHBOARD = 'Dashboard',
  TRANSACTIONS = 'Transactions',
  INCOME = 'Income',
  EXPENSES = 'Expenses',
  MILEAGES = 'Mileages',
  INVOICES = 'Invoices',
  REPORTS = 'Reports',
}