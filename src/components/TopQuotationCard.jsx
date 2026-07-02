import React from "react";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";

export default function TopQuotationCard() {
  // const receivables = useSelector((state) => state.dashboard.receivables);
  const { receivables, activeTab, data, loading, error } = useSelector(
    (state) => state.dashboard,
  );

  const formatAmount = (amount) =>
    `₹${amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const fmt = (v) => {
    if (v == null) return "₹0";
    return (
      "₹" +
      Number(v).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  function Skeleton({ className = "h-6 w-24" }) {
    return <div className={`animate-pulse bg-gray-200 rounded ${className}`} />;
  }

  return (
    <div className="border border-gray-200 rounded-md bg-white mt-5">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800 underline decoration-dotted decoration-gray-300 underline-offset-4">
          Top Quotations
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

      <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h2 className="text-sm font-semibold text-gray-800">
            Recent Payments
          </h2>
          <button
            onClick={() => navigate("/admin/dashboard/customers")}
            className="text-xs text-blue-500 hover:text-blue-700 font-medium"
          >
            View All
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-[11px] text-gray-400 uppercase tracking-wide">
              <th className="text-left px-5 py-3 font-medium">
                Receipt / Customer
              </th>
              <th className="text-left px-3 py-3 font-medium">Plan</th>
              <th className="text-left px-3 py-3 font-medium">Amount</th>
              <th className="text-left px-3 py-3 font-medium">Mode</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-t border-gray-50">
                  <td className="px-5 py-3.5">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-3 py-3.5">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-3 py-3.5">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-3 py-3.5">
                    <Skeleton className="h-4 w-12" />
                  </td>
                </tr>
              ))
            ) : receivables.overdue.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-8 text-center text-sm text-gray-400"
                >
                  No recent payments found.
                </td>
              </tr>
            ) : (
              receivables.overdue.map((p, i) => (
                <tr key={i} className="border-t border-gray-50">
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-semibold text-gray-800">
                      {p.customerName || "Not Mapped Customer"}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5 font-mono">
                      {p.receiptNumber}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5 font-mono">
                      {p.customerPhone}
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="text-sm text-gray-600">
                      {p.chitPlanName}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Month #{p.monthNumber}
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="text-sm font-semibold text-green-600">
                      {fmt(p.amountPaid)}
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="text-xs bg-green-700 text-gray-100 px-2 py-0.5 rounded-full font-medium">
                      {p.paymentMode || "CASH"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
