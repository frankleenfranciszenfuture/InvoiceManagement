import React from 'react'
import { ChevronDown, MoreHorizontal, Plus } from "lucide-react";

export default function CustomerOverViewSiderTopbar() {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-200">
      {/* Left */}
      <div className="flex items-center gap-1 cursor-pointer">
        <h2 className="text-base font-semibold leading-2 text-gray-900">
          All Customer
        </h2>
        <ChevronDown size={12} className="text-blue-600 mt-1" />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* New Button Group */}
        <div className="flex overflow-hidden rounded-md border border-blue-600 shadow-sm">
          <button className="flex items-center gap-1 bg-blue-600 px-2.5 py-1 text-xs font-medium text-white">
            <Plus size={12} />
            New
          </button>

          <button className="border-l border-blue-500 bg-blue-600 px-2 text-white">
            <ChevronDown size={12} />
          </button>
        </div>

        {/* More */}
        <button className="rounded-md border border-gray-300 p-1">
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  );
}
