import React, { useState } from 'react';
import { IncomeTransaction } from '../types';
import { 
  ArrowsDownUp, 
  FileText, 
  SealCheck,
} from '@phosphor-icons/react';

interface TransactionTableProps {
  transactions: IncomeTransaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const calculateTotals = () => {
    const subtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);
    const vat = transactions.reduce((sum, t) => sum + t.vat, 0);
    const total = transactions.reduce((sum, t) => sum + t.totalAmount, 0);
    return { subtotal, vat, total };
  };

  const totals = calculateTotals();

  return (
    <div className="bg-white border border-gray-300 shadow-sm flex flex-col flex-1 overflow-hidden mt-4 rounded-sm">
      {/* Actual Table */}
      <div className="overflow-auto flex-1 custom-scrollbar">
        {/* min-w set to 1900px to force horizontal scroll as requested */}
        <table className="min-w-[1900px] text-[11px] text-left border-collapse table-fixed">
          <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-300 sticky top-0 z-10 tracking-tight">
            <tr>
              <th className="px-3 py-3 font-semibold w-[90px] border-r border-gray-300 border-dotted">Date</th>
              <th className="px-3 py-3 font-semibold w-[220px] border-r border-gray-300 border-dotted">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  Customer <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[150px] border-r border-gray-300 border-dotted">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                  Category <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold w-[120px] border-r border-gray-300 border-dotted">Type ID</th>
              <th className="px-3 py-3 font-semibold w-[120px] border-r border-gray-300 border-dotted">Payment Method</th>
              <th className="px-3 py-3 font-semibold w-[90px] border-r border-gray-300 border-dotted">Due Date</th>
              <th className="px-3 py-3 font-semibold text-center w-[50px] border-r border-gray-300 border-dotted">Doc</th>
              <th className="px-3 py-3 font-semibold w-[100px] border-r border-gray-300 border-dotted">Reference</th>
              <th className="px-3 py-3 font-semibold w-[120px] border-r border-gray-300 border-dotted">Project</th>
              <th className="px-3 py-3 font-semibold w-[100px] border-r border-gray-300 border-dotted">Cost Center</th>
              <th className="px-3 py-3 font-semibold w-[120px] border-r border-gray-300 border-dotted">Created By</th>
              <th className="px-3 py-3 font-semibold text-center w-[50px] border-r border-gray-300 border-dotted">Rec.</th>
              <th className="px-3 py-3 font-semibold text-right w-[110px] border-r border-gray-300 border-dotted">
                <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-gray-900">
                  Subtotal <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold text-right w-[110px] border-r border-gray-300 border-dotted">Tax rate</th>
              <th className="px-3 py-3 font-semibold text-right w-[90px] border-r border-gray-300 border-dotted">VAT</th>
              <th className="px-3 py-3 font-semibold text-right w-[110px] border-r border-gray-300 border-dotted">
                <div className="flex items-center justify-end gap-1 cursor-pointer hover:text-gray-900">
                  Total <ArrowsDownUp size={12} />
                </div>
              </th>
              <th className="px-3 py-3 font-semibold text-center w-[80px] border-r border-gray-300 border-dotted">Verified</th>
              <th className="px-3 py-3 font-semibold text-center w-[80px]">AI Verified</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((t) => (
              <tr 
                key={t.id} 
                className={`transition-colors ${hoveredRowId === t.id ? 'bg-[#fff9c4]' : 'hover:bg-blue-50'}`}
                onMouseEnter={() => setHoveredRowId(t.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                <td className="px-3 py-1.5 text-gray-700 align-middle border-r   overflow-hidden text-ellipsis whitespace-nowrap tabular-nums">
                  {t.date}
                </td>
                <td className="px-3 py-1.5 align-middle border-r   overflow-hidden">
                  <div className="text-[#005c66] font-bold cursor-pointer hover:underline decoration-1 underline-offset-2 truncate">{t.customer}</div>
                  {t.description && (
                    <div className="text-gray-500 text-[10px] mt-0.5 truncate">{t.description}</div>
                  )}
                </td>
                <td className="px-3 py-1.5 align-middle border-r overflow-hidden">
                  <span className="bg-[#fff9c4] text-gray-800 px-2 py-0.5 rounded text-[10px] font-medium border border-[#fefce8] inline-block truncate max-w-full">
                    {t.category}
                  </span>
                </td>
                <td className="px-3 py-1.5 text-gray-900 font-medium align-middle border-r border-dotted border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
                  {t.typeId}
                </td>
                <td className="px-3 py-1.5 text-gray-700 align-middle border-r border-dotted border-gray-300 overflow-hidden text-ellipsis whitespace-nowrap">
                  {t.paymentMethod}
                </td>
                <td className="px-3 py-1.5 text-gray-700 align-middle border-r border-dotted border-gray-300 overflow-hidden text-ellipsis whitespace-nowrap tabular-nums">
                  {t.dueDate}
                </td>
                <td className="px-3 py-1.5 text-center align-middle border-r border-dotted border-gray-300">
                  {t.hasDocument && (
                    <div className="inline-flex justify-center items-center w-5 h-5 border border-gray-300 rounded bg-white hover:border-[#005c66] cursor-pointer">
                        <FileText size={12} className="text-gray-500 hover:text-[#005c66]" />
                    </div>
                  )}
                </td>
                <td className="px-3 py-1.5 text-gray-500 align-middle border-r border-dotted border-gray-300 text-[10px] truncate">{t.reference}</td>
                <td className="px-3 py-1.5 text-gray-500 align-middle border-r border-dotted border-gray-300 text-[10px] truncate">{t.project || '-'}</td>
                <td className="px-3 py-1.5 text-gray-500 align-middle border-r border-dotted border-gray-300 text-[10px] truncate">{t.costCenter || '-'}</td>
                <td className="px-3 py-1.5 text-gray-500 align-middle border-r border-dotted border-gray-300 text-[10px] truncate">{t.createdBy}</td>
                <td className="px-3 py-1.5 text-center align-middle border-r border-dotted border-gray-300 text-green-600 font-bold">{t.reconciled && "✓"}</td>
                <td className="px-3 py-1.5 text-right font-medium text-gray-900 align-middle border-r border-dotted border-gray-300 tabular-nums">
                  {formatCurrency(t.subtotal)}
                </td>
                <td className="px-2 py-1 align-middle border-r border-dotted border-gray-300 tabular-nums">
                   {hoveredRowId === t.id ? (
                      <select 
                        className="w-full h-[36px] bg-white border border-gray-300 rounded px-2 text-[12px] focus:outline-none focus:border-[#004d40] shadow-sm cursor-pointer box-border"
                        defaultValue={t.taxRate.split(':')[0]}
                      >
                         <option>24%</option>
                         <option>14%</option>
                         <option>10%</option>
                         <option>0%</option>
                         <option>25.5%</option>
                      </select>
                   ) : (
                     <div className="flex flex-col items-end gap-0 py-1 px-1">
                         <span className="font-semibold text-gray-700">{t.taxRate.split(':')[0]}</span>
                         <span className="text-gray-400 text-[9px]">{t.taxRate.split(':')[1]}</span>
                     </div>
                   )}
                </td>
                <td className="px-3 py-1.5 text-right font-medium text-gray-900 align-middle border-r border-dotted border-gray-300 tabular-nums">
                  {formatCurrency(t.vat)}
                </td>
                <td className="px-2 py-1 text-right align-middle border-r border-dotted border-gray-300 tabular-nums">
                   {hoveredRowId === t.id ? (
                      <input 
                        type="text" 
                        defaultValue={t.totalAmount.toFixed(2)} 
                        className="w-full h-[36px] bg-white border border-gray-300 rounded px-2 text-right text-[12px] focus:outline-none focus:border-[#004d40] shadow-sm font-semibold text-[#004d40] box-border tabular-nums"
                      />
                   ) : (
                      <span className="font-bold text-[#004d40] text-[12px] py-1 block px-1">{formatCurrency(t.totalAmount)}</span>
                   )}
                </td>
                {/* Action Buttons replace Verified status on hover */}
                {hoveredRowId === t.id ? (
                   <>
                     <td className="px-1 py-1 text-center align-middle border-r border-dotted border-gray-300">
                        <button className="w-full h-[36px] bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-2 rounded text-[11px] shadow-sm transition-colors flex items-center justify-center whitespace-nowrap">
                           Edit
                        </button>
                     </td>
                     <td className="px-1 py-1 text-center align-middle">
                        <button className="w-full h-[36px] bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-2 rounded text-[11px] shadow-sm transition-colors flex items-center justify-center whitespace-nowrap">
                           Action
                        </button>
                     </td>
                   </>
                ) : (
                   <>
                    <td className="px-3 py-1.5 text-center align-middle border-r border-dotted border-gray-300">
                      {t.isVerified && <SealCheck size={18} weight="fill" className="text-gray-200 inline-block cursor-default" />}
                    </td>
                    <td className="px-3 py-1.5 text-center align-middle">
                      {t.isAiVerified && <SealCheck size={18} weight="fill" className="text-gray-200 inline-block cursor-default" />}
                    </td>
                   </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer Summary / Pagination */}
      <div className="bg-gray-50 border-t border-gray-200 p-2 flex justify-between items-center text-[11px] text-gray-500 flex-shrink-0">
         <div>
            Showing {transactions.length} transactions
         </div>
         <div className="flex gap-4 tabular-nums">
            <span>Subtotal: <span className="font-semibold text-gray-900">{formatCurrency(totals.subtotal)}</span></span>
            <span>VAT: <span className="font-semibold text-gray-900">{formatCurrency(totals.vat)}</span></span>
            <span>Total: <span className="font-semibold text-[#004d40]">{formatCurrency(totals.total)}</span></span>
         </div>
      </div>
    </div>
  );
};

export default TransactionTable;