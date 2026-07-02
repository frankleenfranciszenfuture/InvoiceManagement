import React from "react";
import { useSelector } from "react-redux";
import {
  History,
  Search,
  ChevronDown,
  Plus,
  Bell,
  Settings,
} from "lucide-react";

export default function TopBar() {
  // const user = useSelector((state) => state.dashboard.user);

  const user = useSelector((state) => state.auth.user);
  const initials = (name) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "??";

  return (
    <div className="h-[60px] border-b border-gray-200 flex items-center justify-between px-4 bg-white flex-shrink-0">
      <div className="flex items-center gap-3 flex-1">
        <History className="w-4 h-4 text-gray-500" />
        <div className="flex items-center gap-2 max-w-md w-full border border-gray-200 rounded px-2 py-1.5">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search in Customers ( / )"
            className="outline-none text-sm w-full placeholder-gray-400 text-gray-600"
          />
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 text-sm text-gray-700 hover:bg-gray-50 px-2 py-1.5 rounded">
          {/* {user.orgName} */}
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>

        <button className="w-8 h-8 rounded bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white">
          <Plus className="w-4 h-4" />
        </button>

        <button className="text-gray-500 hover:text-gray-700">
          <Bell className="w-[18px] h-[18px]" />
        </button>

        <button className="text-gray-500 hover:text-gray-700">
          <Settings className="w-[18px] h-[18px]" />
        </button>

        <button className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white text-sm font-medium">
          {initials(user?.name)}
        </button>
      </div>
    </div>
  );
}
