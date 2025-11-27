import React, { useState } from 'react';
import { Client } from '../types';
import { 
  ArrowsDownUp, 
  SealCheck,
  CaretDown
} from '@phosphor-icons/react';

interface ClientTableProps {
  clients: Client[];
}

const ClientTable: React.FC<ClientTableProps> = ({ clients }) => {
  const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);

  const getFlag = (code: string) => {
    if (code === 'FI') return '🇫🇮';
    if (code === 'UK') return '🇬🇧';
    return '';
  };

  return (
    <div className="bg-white border border-gray-300 shadow-sm flex flex-col flex-1 overflow-hidden mt-4 rounded-sm">
      <div className="overflow-auto flex-1 custom-scrollbar">
        {/* Wide table to accommodate many columns */}
        <table className="min-w-[2200px] text-[11px] text-left border-collapse table-fixed">
          <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-300 sticky top-0 z-10 tracking-tight">
            <tr>
              <th className="px-3 py-3 font-semibold w-[40px] text-center border-r border-gray-300 border-dotted"></th>
              <th className="px-3 py-3 font-semibold w-[220px] border-r border-gray-300 border-dotted">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  E-mail <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[60px] text-center border-r border-gray-300 border-dotted">Country</th>
              <th className="px-3 py-3 font-semibold w-[140px] border-r border-gray-300 border-dotted">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  Plan <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[120px] border-r border-gray-300 border-dotted">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  UTR <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[100px] border-r border-gray-300 border-dotted">
                 <div className="leading-tight">Prepayment<br/>registered</div>
              </th>
              <th className="px-3 py-3 font-semibold w-[180px] border-r border-gray-300 border-dotted">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  Company Name <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[100px] border-r border-gray-300 border-dotted">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  First Name <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[100px] border-r border-gray-300 border-dotted">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  Last Name <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[120px] border-r border-gray-300 border-dotted">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  Phone <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[140px] border-r border-gray-300 border-dotted">Sales Person</th>
              <th className="px-3 py-3 font-semibold w-[100px] border-r border-gray-300 border-dotted">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  Card added <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[100px] border-r border-gray-300 border-dotted">Bank name</th>
              <th className="px-3 py-3 font-semibold w-[140px] border-r border-gray-300 border-dotted">Profession</th>
              <th className="px-3 py-3 font-semibold w-[100px] border-r border-gray-300 border-dotted">
                 <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  City <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[280px] border-r border-gray-300 border-dotted">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {clients.map((c, index) => (
              <tr 
                key={c.id} 
                className={`transition-colors ${hoveredRowId === c.id ? 'bg-[#fff9c4]' : 'hover:bg-blue-50'}`}
                onMouseEnter={() => setHoveredRowId(c.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="px-3 py-1.5 text-center text-gray-500 align-middle border-r border-dotted border-gray-300">
                  {index + 1}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-900 truncate">
                  {c.email}
                </td>
                <td className="px-3 py-1.5 text-center text-[16px] align-middle border-r border-dotted border-gray-300">
                  {getFlag(c.countryCode)}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-700">
                  {c.plan}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-700">
                   <div className="flex items-center gap-1">
                      <span>{c.utr}</span>
                      {c.isUtrVerified && <SealCheck size={14} weight="fill" className="text-gray-400" />}
                   </div>
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-700">
                  {c.isPrepaymentRegistered ? 'Yes' : ''}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-900 font-medium truncate">
                  {c.companyName}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-700">
                  {c.firstName}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-700">
                  {c.lastName}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-700">
                  {c.phone}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300">
                   <div className="relative border border-gray-300 rounded px-2 py-1 bg-white flex items-center justify-between min-w-[80px] cursor-pointer hover:border-gray-400">
                      <span className="text-gray-700">{c.salesPerson}</span>
                      <CaretDown size={10} className="text-gray-400" />
                   </div>
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-700 tabular-nums">
                   {c.cardAddedDate}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-700">
                   {c.bankName}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-700 truncate">
                   {c.profession}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300 text-gray-700">
                   {c.city}
                </td>
                <td className="px-3 py-1.5 align-middle border-r border-dotted border-gray-300">
                   <div className="flex items-center gap-2">
                      <button className="bg-[#fcd34d] hover:bg-[#fbbf24] text-[#002b31] text-[10px] font-bold px-2 py-1 rounded shadow-sm whitespace-nowrap">
                        Login to Client App
                      </button>
                      <button className="bg-[#9ca3af] hover:bg-[#6b7280] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm whitespace-nowrap">
                        Edit
                      </button>
                      <button className="bg-[#9ca3af] hover:bg-[#6b7280] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm whitespace-nowrap">
                        Deactivate
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientTable;
