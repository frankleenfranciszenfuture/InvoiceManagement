import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../slices/invoiceSlice";
import { Search, X } from "lucide-react";

const STATUSES = ["DRAFT", "SAVED", "SENT", "PAID", "CANCELLED"];

export default function InvoiceFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.invoices.filters);
  const set = (k, v) => dispatch(setFilters({ [k]: v }));

  return (
    <div className="card p-3 mb-4 flex flex-wrap gap-2 items-center">
      <div className="relative flex-1 min-w-[180px]">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          className="input pl-8"
          placeholder="Search invoice no. or customer…"
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
        />
      </div>

      <select
        className="input w-36"
        value={filters.status}
        onChange={(e) => set("status", e.target.value)}
      >
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="input w-36"
        placeholder="From"
        value={filters.dateFrom}
        onChange={(e) => set("dateFrom", e.target.value)}
      />
      <input
        type="date"
        className="input w-36"
        placeholder="To"
        value={filters.dateTo}
        onChange={(e) => set("dateTo", e.target.value)}
      />

      {(filters.search ||
        filters.status ||
        filters.dateFrom ||
        filters.dateTo) && (
        <button
          onClick={() => dispatch(clearFilters())}
          className="btn-secondary text-xs gap-1"
        >
          <X size={13} /> Clear
        </button>
      )}
    </div>
  );
}
