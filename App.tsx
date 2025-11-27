import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import TransactionTable from './components/TransactionTable';
import ClientTable from './components/ClientTable';
import Login from './components/Login';
import { NavItemType, IncomeTransaction, Client } from './types';
import { Tray, TrendUp, CheckCircle, Clock } from '@phosphor-icons/react';

// Mock Data based on the Income screenshot + Additional data
const INITIAL_INCOME_DATA: IncomeTransaction[] = [
  {
    id: '1',
    date: '20.11.2025',
    customer: 'Cash sale - no customer',
    category: 'Business Income',
    typeId: 'Sale 570',
    hasDocument: true,
    reference: 'POS-001',
    reconciled: true,
    subtotal: 200.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 200.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Cash',
    dueDate: '20.11.2025',
    project: 'Store 1',
    costCenter: 'Sales',
    createdBy: 'Sami Kletta'
  },
  {
    id: '2',
    date: '20.11.2025',
    customer: 'Manual entry - no customer',
    description: 'Torstai Timma Myynti 25,5%',
    category: 'Business Income',
    typeId: 'Manual Entry 62720',
    hasDocument: false,
    reference: 'DAILY-02',
    reconciled: false,
    subtotal: 796.81,
    taxRate: '25.5%: ', 
    vat: 203.19,
    totalAmount: 1000.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Manual',
    dueDate: '20.11.2025',
    project: 'HQ',
    costCenter: 'Ops',
    createdBy: 'Sami Kletta'
  },
  {
    id: '3',
    date: '19.11.2025',
    customer: 'TechSolutions Inc.',
    description: 'Q4 Consulting Retainer',
    category: 'Consulting Fees',
    typeId: 'Inv-1024',
    hasDocument: true,
    reference: 'PO-9921',
    reconciled: true,
    subtotal: 4500.00,
    taxRate: '24%: ',
    vat: 1080.00,
    totalAmount: 5580.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Bank Transfer',
    dueDate: '19.12.2025',
    project: 'Consulting',
    costCenter: 'Services',
    createdBy: 'Admin User'
  },
  {
    id: '4',
    date: '18.11.2025',
    customer: 'Nordic Design Studio',
    description: 'Web Development Services',
    category: 'Service Income',
    typeId: 'Inv-1023',
    hasDocument: true,
    reference: 'REF-882',
    reconciled: false,
    subtotal: 1250.00,
    taxRate: '24%: ',
    vat: 300.00,
    totalAmount: 1550.00,
    isVerified: false,
    isAiVerified: true,
    paymentMethod: 'Stripe',
    dueDate: '18.12.2025',
    project: 'Web Dev',
    costCenter: 'IT',
    createdBy: 'Sami Kletta'
  },
  {
    id: '5',
    date: '15.11.2025',
    customer: 'Stripe Payout',
    description: 'Weekly settlement',
    category: 'Online Sales',
    typeId: 'Payout 22',
    hasDocument: false,
    reference: 'STR-9912',
    reconciled: true,
    subtotal: 890.50,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 890.50,
    isVerified: true,
    isAiVerified: false,
    paymentMethod: 'Stripe',
    dueDate: '15.11.2025',
    project: 'Online',
    costCenter: 'Sales',
    createdBy: 'System'
  },
  {
    id: '6',
    date: '14.11.2025',
    customer: 'Local Cafe Partnership',
    description: 'Merchandise reselling',
    category: 'Merchandise',
    typeId: 'Sale 562',
    hasDocument: true,
    reference: 'INV-009',
    reconciled: false,
    subtotal: 320.00,
    taxRate: '14%: ',
    vat: 44.80,
    totalAmount: 364.80,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Cash',
    dueDate: '14.11.2025',
    project: 'Retail',
    costCenter: 'Sales',
    createdBy: 'Sami Kletta'
  },
  {
    id: '7',
    date: '12.11.2025',
    customer: 'Consulting Project Alpha',
    description: 'Milestone 2 payment',
    category: 'Consulting Fees',
    typeId: 'Inv-1021',
    hasDocument: true,
    reference: 'MST-2',
    reconciled: true,
    subtotal: 2100.00,
    taxRate: '24%: ',
    vat: 504.00,
    totalAmount: 2604.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Bank Transfer',
    dueDate: '12.12.2025',
    project: 'Alpha',
    costCenter: 'Consulting',
    createdBy: 'Admin User'
  },
  {
    id: '8',
    date: '10.11.2025',
    customer: 'Cash sale - no customer',
    category: 'Business Income',
    typeId: 'Sale 555',
    hasDocument: false,
    reference: 'POS-002',
    reconciled: true,
    subtotal: 150.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 150.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Cash',
    dueDate: '10.11.2025',
    project: 'Store 1',
    costCenter: 'Sales',
    createdBy: 'Sami Kletta'
  },
  {
    id: '9',
    date: '08.11.2025',
    customer: 'Marketing GIG',
    description: 'Ad campaign management',
    category: 'Service Income',
    typeId: 'Inv-1019',
    hasDocument: true,
    reference: 'AD-2025',
    reconciled: false,
    subtotal: 5000.00,
    taxRate: '24%: ',
    vat: 1200.00,
    totalAmount: 6200.00,
    isVerified: false,
    isAiVerified: false,
    paymentMethod: 'Bank Transfer',
    dueDate: '08.12.2025',
    project: 'Marketing',
    costCenter: 'Services',
    createdBy: 'Sami Kletta'
  },
  {
    id: '10',
    date: '05.11.2025',
    customer: 'Subscription Renewal',
    description: 'Yearly SaaS License',
    category: 'Software Sales',
    typeId: 'Sub-441',
    hasDocument: true,
    reference: 'LIC-99',
    reconciled: true,
    subtotal: 800.00,
    taxRate: '24%: ',
    vat: 192.00,
    totalAmount: 992.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Credit Card',
    dueDate: '05.11.2025',
    project: 'SaaS',
    costCenter: 'IT',
    createdBy: 'System'
  },
  {
    id: '11',
    date: '02.11.2025',
    customer: 'Manual entry - Adjustment',
    description: 'Correction for Oct',
    category: 'Other Income',
    typeId: 'Adj-01',
    hasDocument: false,
    reference: 'MEMO-01',
    reconciled: true,
    subtotal: 50.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 50.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'N/A',
    dueDate: '02.11.2025',
    project: 'Internal',
    costCenter: 'Admin',
    createdBy: 'Sami Kletta'
  },
  {
    id: '12',
    date: '01.11.2025',
    customer: 'StartUp Grant',
    description: 'Government assistance',
    category: 'Grants',
    typeId: 'Gov-2025',
    hasDocument: true,
    reference: 'FIN-GRANT',
    reconciled: true,
    subtotal: 8000.00,
    taxRate: '0%: €0.00',
    vat: 0.00,
    totalAmount: 8000.00,
    isVerified: true,
    isAiVerified: true,
    paymentMethod: 'Grant',
    dueDate: '01.11.2025',
    project: 'Funding',
    costCenter: 'Finance',
    createdBy: 'Admin User'
  }
];

// Generate more data for scrolling
const MOCK_INCOME_DATA: IncomeTransaction[] = [
  ...INITIAL_INCOME_DATA,
  ...INITIAL_INCOME_DATA.map(item => ({ ...item, id: item.id + '_dup1', date: '01.10.2025' })),
  ...INITIAL_INCOME_DATA.map(item => ({ ...item, id: item.id + '_dup2', date: '28.09.2025' })),
];

const MOCK_CLIENT_DATA: Client[] = [
  {
    id: 1,
    email: 'sami+newmandate@kletta.com',
    countryCode: 'FI',
    plan: 'Kletta Solo',
    utr: '1234567-8',
    isUtrVerified: true,
    isPrepaymentRegistered: false,
    companyName: 'Sami Mandate',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Not set',
    cardAddedDate: '',
    bankName: '',
    profession: 'Syömies',
    city: 'Helsinki'
  },
  {
    id: 2,
    email: 'sami+timma@kletta.com',
    countryCode: 'FI',
    plan: 'UNSUBSCRIBED',
    utr: '1234567-8',
    isUtrVerified: true,
    isPrepaymentRegistered: false,
    companyName: 'Timma',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Sami',
    cardAddedDate: '',
    bankName: '',
    profession: 'Kampaaja',
    city: 'Espoo'
  },
  {
    id: 3,
    email: 'sami+fionboard@kletta.com',
    countryCode: 'FI',
    plan: 'UNSUBSCRIBED',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Not set',
    cardAddedDate: '',
    bankName: '',
    profession: '',
    city: ''
  },
  {
    id: 4,
    email: 'sami+timmakey@kletta.com',
    countryCode: 'FI',
    plan: 'UNSUBSCRIBED',
    utr: '3577590-6',
    isUtrVerified: true, // Gold check in screenshot?
    isPrepaymentRegistered: true,
    companyName: 'Testi',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Not set',
    cardAddedDate: '',
    bankName: '',
    profession: '',
    city: ''
  },
  {
    id: 5,
    email: 'origamih+28@gmail.com',
    countryCode: 'FI',
    plan: 'UNSUBSCRIBED',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Danny',
    cardAddedDate: '12.11.2025',
    bankName: '',
    profession: '',
    city: ''
  },
  {
    id: 6,
    email: 'origamih+19@gmail.com',
    countryCode: 'FI',
    plan: 'Kletta Care',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Danny',
    cardAddedDate: '12.11.2025',
    bankName: '',
    profession: '',
    city: ''
  },
  {
    id: 7,
    email: 'origamih+18@gmail.com',
    countryCode: 'FI',
    plan: 'Kletta Care',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Danny',
    cardAddedDate: '12.11.2025',
    bankName: '',
    profession: '',
    city: ''
  },
  {
    id: 8,
    email: 'sami+newpromouser@kletta.com',
    countryCode: 'FI',
    plan: 'UNSUBSCRIBED',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Danny',
    cardAddedDate: '',
    bankName: '',
    profession: '',
    city: ''
  },
  {
    id: 9,
    email: 'sami+businessname@kletta.com',
    countryCode: 'FI',
    plan: 'UNSUBSCRIBED',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Danny',
    cardAddedDate: '',
    bankName: '',
    profession: '',
    city: ''
  },
  {
    id: 10,
    email: 'sami+mandatemailuk@kletta.com',
    countryCode: 'UK',
    plan: 'COLLECT',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: "Sam's UK code",
    firstName: 'Sami',
    lastName: 'Verkkoperä',
    phone: '',
    salesPerson: 'Not set',
    cardAddedDate: '',
    bankName: '',
    profession: 'Software designer',
    city: ''
  },
  {
    id: 11,
    email: 'sami+mandatemail@kletta.com',
    countryCode: 'FI',
    plan: 'UNSUBSCRIBED',
    utr: '1234567-8',
    isUtrVerified: true,
    isPrepaymentRegistered: false,
    companyName: "Sam's Code",
    firstName: 'Sami',
    lastName: 'Verkkoperä',
    phone: '',
    salesPerson: 'Not set',
    cardAddedDate: '',
    bankName: '',
    profession: 'Ohjelmistosuunnittelija',
    city: ''
  },
  {
    id: 12,
    email: 'sumo+1212@gmaaail.com',
    countryCode: 'FI',
    plan: 'UNSUBSCRIBED',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: '',
    firstName: 'DANNY',
    lastName: 'Danny',
    phone: '',
    salesPerson: 'Danny',
    cardAddedDate: '',
    bankName: '',
    profession: '',
    city: ''
  },
  {
    id: 13,
    email: 'james.smith250479+1@gmail.com',
    countryCode: 'UK',
    plan: 'PARTNER',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: 'James Services',
    firstName: 'James',
    lastName: 'Smith',
    phone: '',
    salesPerson: 'Not set',
    cardAddedDate: '',
    bankName: 'Natwest',
    profession: 'Beauty',
    city: 'Manchester'
  },
  {
    id: 14,
    email: 'sami+newpromo@kletta.com',
    countryCode: 'FI',
    plan: 'UNSUBSCRIBED',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Not set',
    cardAddedDate: '',
    bankName: '',
    profession: '',
    city: ''
  },
   {
    id: 15,
    email: 'sami+ba@kletta.com',
    countryCode: 'FI',
    plan: 'UNSUBSCRIBED',
    utr: '',
    isUtrVerified: false,
    isPrepaymentRegistered: false,
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    salesPerson: 'Not set',
    cardAddedDate: '',
    bankName: '',
    profession: '',
    city: ''
  }
];

const App: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeItem, setActiveItem] = useState<NavItemType>(NavItemType.INCOME);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const filteredTransactions = useMemo(() => {
    if (!filterCategory) return MOCK_INCOME_DATA;
    return MOCK_INCOME_DATA.filter(t => t.category === filterCategory);
  }, [filterCategory]);

  const totalBusinessIncome = MOCK_INCOME_DATA.filter(t => t.category === 'Business Income')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // --- RENDER CONTENT BASED ON ACTIVE ITEM ---
  const renderContent = () => {
    if (activeItem === NavItemType.ALL_CLIENTS) {
      return (
        <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-gray-50/50">
          {/* Clients Page Title */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#002b31]">Clients</h1>
          </div>

          {/* Client Widgets */}
          <div className="flex gap-4 mb-6">
             <div className="relative overflow-hidden rounded-lg pl-4 pr-10 py-3.5 border flex items-center gap-4 min-w-[240px] shadow-sm bg-white border-gray-200">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm bg-gray-50 border border-gray-200 text-[#002b31]">
                   <CheckCircle size={20} weight="fill" className="opacity-80" />
                </div>
                <div className="flex flex-col z-10">
                   <span className="text-[12px] font-regular tracking-wide text-gray-600">Paying customers</span>
                   <span className="text-[16px] text-[#002b31] font-bold leading-none mt-1 tabular-nums">19</span>
                </div>
             </div>

             <div className="relative overflow-hidden rounded-lg pl-4 pr-10 py-3.5 border flex items-center gap-4 min-w-[240px] shadow-sm bg-white border-gray-200">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm bg-gray-50 border border-gray-200 text-[#002b31]">
                   <Clock size={20} weight="fill" className="opacity-80" />
                </div>
                 <div className="flex flex-col z-10">
                   <span className="text-[12px] font-regular tracking-wide text-gray-600">MRR</span>
                   <span className="text-[16px] text-[#002b31] font-bold leading-none mt-1 tabular-nums">€991.00</span>
                </div>
             </div>
          </div>

          {/* Actions & Filters */}
          <div className="flex flex-col gap-4 mb-4">
             {/* Action Buttons */}
             <div className="flex justify-end gap-3">
                <button className="bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[12px] font-bold px-4 py-2 rounded shadow-sm">
                   Invite client
                </button>
                <button className="bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[12px] font-bold px-4 py-2 rounded shadow-sm">
                   Import Clients
                </button>
                <button className="bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[12px] font-bold px-4 py-2 rounded shadow-sm">
                   Invite client with payment link
                </button>
             </div>

             {/* Filter Bar */}
             <div className="flex items-center gap-3">
                <select className="h-[36px] px-3 bg-white border border-gray-300 rounded text-[12px] text-gray-600 focus:border-[#002b31] focus:outline-none min-w-[120px]">
                   <option>All statuses</option>
                </select>
                <select className="h-[36px] px-3 bg-white border border-gray-300 rounded text-[12px] text-gray-600 focus:border-[#002b31] focus:outline-none min-w-[120px]">
                   <option>All countries</option>
                </select>
                <select className="h-[36px] px-3 bg-white border border-gray-300 rounded text-[12px] text-gray-600 focus:border-[#002b31] focus:outline-none min-w-[120px]">
                   <option>All plans</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="h-[36px] px-3 bg-white border border-gray-300 rounded text-[12px] text-gray-900 focus:border-[#002b31] focus:outline-none flex-1"
                />
             </div>
          </div>

          <ClientTable clients={MOCK_CLIENT_DATA} />
        </main>
      );
    }

    // Default to Income View
    return (
      <main className="flex-1 overflow-hidden flex flex-col px-6 py-4 bg-gray-50/50">
          {/* Income Page Title */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#002b31]">Income</h1>
          </div>

          {/* Income Summary Widgets */}
          <div className="flex gap-4 mb-6">
            <div 
              onClick={() => setFilterCategory(null)}
              className={`relative overflow-hidden rounded-lg pl-4 pr-10 py-3.5 border flex items-center gap-4 min-w-[240px] shadow-sm hover:shadow-md transition-all group cursor-pointer ${
                filterCategory === null 
                  ? 'bg-[#fffdf5] border-[#fcd34d] ring-1 ring-[#fcd34d]/50' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
               <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors ${
                 filterCategory === null ? 'bg-white border border-[#e6dac0] text-[#002b31]' : 'bg-gray-50 border border-gray-200 text-gray-500'
               }`}>
                  <Tray size={20} weight="fill" className={filterCategory === null ? "opacity-80" : "opacity-60"} />
               </div>
               <div className="flex flex-col z-10">
                  <span className={`text-[12px] font-regular tracking-wide transition-colors ${filterCategory === null ? 'text-black opacity-90' : 'text-gray-600'}`}>All income</span>
                  <span className="text-[16px] text-[#002b31] font-bold leading-none mt-1 tabular-nums">€29,626.26</span>
               </div>
               {filterCategory === null && (
                 <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#fcd34d] opacity-50"></div>
               )}
            </div>

             <div 
               onClick={() => setFilterCategory('Business Income')}
               className={`relative overflow-hidden rounded-lg pl-4 pr-10 py-3.5 border flex items-center gap-4 min-w-[240px] shadow-sm hover:shadow-md transition-all group cursor-pointer ${
                 filterCategory === 'Business Income' 
                   ? 'bg-[#fffdf5] border-[#fcd34d] ring-1 ring-[#fcd34d]/50' 
                   : 'bg-white border-gray-200 hover:border-gray-300'
               }`}
             >
               <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-colors ${
                 filterCategory === 'Business Income' ? 'bg-white border border-[#e6dac0] text-[#002b31]' : 'bg-gray-50 border border-gray-200 text-gray-500'
               }`}>
                  <TrendUp size={20} weight="fill" className={filterCategory === 'Business Income' ? "opacity-80" : "opacity-60"} />
               </div>
               <div className="flex flex-col z-10">
                  <span className={`text-[12px] font-regular tracking-wide transition-colors ${filterCategory === 'Business Income' ? 'text-black opacity-90' : 'text-gray-600'}`}>Business income</span>
                  <span className="text-[16px] text-[#002b31] font-bold leading-none mt-1 tabular-nums">€{totalBusinessIncome.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
               </div>
               {filterCategory === 'Business Income' && (
                 <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#fcd34d] opacity-50"></div>
               )}
            </div>
          </div>
          
          <TransactionTable transactions={filteredTransactions} />
        </main>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar 
        activeItem={activeItem} 
        setActiveItem={setActiveItem} 
        onLogout={() => setIsAuthenticated(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <TopHeader />
        {renderContent()}
      </div>
    </div>
  );
};

export default App;