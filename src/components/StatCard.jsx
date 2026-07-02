import React from "react";

export default function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color = "primary",
  trend,
}) {
  const colorMap = {
    primary: "bg-primary-50 text-primary-600",
    success: "bg-green-50 text-green-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-semibold text-gray-900 truncate">
            {value}
          </p>
          {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
          {trend !== undefined && (
            <p
              className={`mt-1 text-xs font-medium ${trend >= 0 ? "text-green-600" : "text-red-500"}`}
            >
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% vs last month
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ml-3 ${colorMap[color]}`}
          >
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
