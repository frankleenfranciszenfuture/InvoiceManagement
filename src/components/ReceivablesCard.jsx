import React from "react";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";

export default function ReceivablesCard() {
  const receivables = useSelector((state) => state.dashboard.receivables);

  const formatAmount = (amount) =>
    `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800 underline decoration-dotted decoration-gray-300 underline-offset-4">
          Total Receivables
        </h2>
        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
          <Plus className="w-4 h-4 rounded-full bg-blue-600 text-white p-0.5" />
          New
        </button>
      </div>

      <div className="px-5 pt-4 pb-3">
        <p className="text-sm text-gray-600 mb-2">
          Total Receivables {formatAmount(receivables.total)}
        </p>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-gray-300 rounded-full"
            style={{ width: "0%" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 px-5 py-4 border-t border-gray-100">
        <div>
          <p className="text-xs font-medium text-blue-600 mb-1.5 tracking-wide">
            CURRENT
          </p>
          <p className="text-lg text-gray-800">
            {formatAmount(receivables.current)}
          </p>
        </div>
        {receivables.overdue.map((item, idx) => (
          <div key={item.label} className={idx === 0 ? "" : ""}>
            {idx === 0 && (
              <p className="text-xs font-medium text-orange-500 mb-1.5 tracking-wide">
                OVERDUE
              </p>
            )}
            {idx !== 0 && <div className="h-[18px]" />}
            <p className="text-lg text-gray-800">{formatAmount(item.amount)}</p>
            <p className="text-xs text-gray-400 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
