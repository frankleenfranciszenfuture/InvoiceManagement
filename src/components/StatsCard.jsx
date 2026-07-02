import React from "react";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";

export default function StatsCard() {
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

  const statsCards = [
    {
      title: "Total Collected",
      value: loading ? null : fmt(data?.totalCollected),
      sub: `${data?.totalPayments ?? 0} payments`,
      color: "text-blue-500",
      bg: "bg-blue-50",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-blue-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
    },
    {
      title: "Total Pending",
      value: loading ? null : fmt(data?.totalPending),
      sub: "outstanding",
      color: "text-pink-500",
      bg: "bg-pink-50",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-pink-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
    },
    {
      title: "Total Customers",
      value: loading,
      sub: "Total active chits",
      color: "text-green-500",
      bg: "bg-green-50",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },

    {
      title: "Overdue Entries",
      value: loading ? null : String(data?.overdueEntries ?? 0),
      sub: "need attention",
      subColor: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-200",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-orange-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <div className="border border-gray-200 rounded-md bg-white mt-5">
      {/* <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100"> */}
      {/* Stats Row */}
      <div className="grid grid-cols-4 px-3 gap-4 mt-4 mb-6 border-b rounded-lg border-gray-100">
        {statsCards.map((card, i) => (
          <div
            key={i}
            className={`bg-white rounded-xl p-4 border ${card.border || "border-gray-100"} shadow-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium">
                {card.title}
              </span>
              <div
                className={`w-8 h-8 rounded-full ${card.bg} flex items-center justify-center`}
              >
                {card.icon}
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900">
              {card.value == null ? (
                <Skeleton className="h-7 w-28" />
              ) : (
                card.value
              )}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className={`text-xs ${card.subColor || "text-gray-400"}`}>
                {card.sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
}
