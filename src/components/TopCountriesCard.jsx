import React from "react";
import { useSelector } from "react-redux";
import { Plus, MapPin } from "lucide-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
export default function TopCountriesCard() {
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

  const countries = [
    { name: "India", orders: 2450, percent: 35 },
    { name: "USA", orders: 1820, percent: 26 },
    { name: "UK", orders: 1240, percent: 18 },
    { name: "Germany", orders: 860, percent: 12 },
    { name: "Canada", orders: 540, percent: 9 },
  ];

  return (
    <div className="border border-gray-200 rounded-md bg-white mt-5">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <h2 className="text-base font-medium text-gray-800 underline decoration-dotted decoration-gray-300 underline-offset-4">
          Top Countires
        </h2>

        <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
          <Plus className="w-4 h-4 rounded-full bg-blue-600 text-white p-0.5" />
          New
        </button>
      </div>

      <div className="px-4 pt-2 pb-3">
        <select className="text-xs border rounded px-2 py-1">
          <option>World</option>
        </select>
      </div>

      {/* Map */}
      <div className="relative px-4 rounded-full">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
          alt="World Map"
          className="w-full opacity-70 bg-blue-400"
        />

        {/* USA */}
        <span className="absolute top-[32%] left-[18%] w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow" />

        {/* Brazil */}
        <span className="absolute top-[58%] left-[31%] w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow" />

        {/* Germany */}
        <span className="absolute top-[34%] left-[49%] w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow" />

        {/* India */}
        <span className="absolute top-[42%] left-[63%] w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow" />

        {/* Australia */}
        <span className="absolute top-[70%] left-[82%] w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow" />
      </div>

      {/* Country Stats */}
      <div className="mt-4 space-y-2 text-xs">
        {[
          ["United States", "5.5k", "4.8%"],
          ["Australia", "1.2k", "3.1%"],
          ["China", "546", "6.6%"],
          ["Germany", "76", "1.2%"],
          ["Brazil", "7", "0.5%"],
        ].map(([country, visitors, growth]) => (
          <div key={country} className="flex justify-between border-b pb-2">
            <span>{country}</span>
            <span>{visitors}</span>
            <span>{growth}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
