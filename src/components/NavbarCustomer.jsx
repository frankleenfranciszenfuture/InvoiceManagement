import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Plus, Bell } from "lucide-react";
import { toggleSidebar, openModal } from "../slices/uiSlice";
import {
  History,
  Search,
  ChevronDown,
  Settings,
  FileText,
  MoreHorizontal,
} from "lucide-react";

export default function NavbarCustomer({ title }) {
  // console.log("Title:", title);
  const dispatch = useDispatch();
  const open = useSelector((s) => s.ui.sidebarOpen);

  const user = useSelector((state) => state.auth.user);

  const initials = (name) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "??";

  return (
    // <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 gap-3 sticky top-0 z-10">
    //   <button
    //     onClick={() => dispatch(toggleSidebar())}
    //     className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors lg:hidden"
    //   >
    //     <Menu size={18} />
    //   </button>

    //   <h1 className="font-semibold text-gray-100 text-base flex-1">{title}</h1>

    //   <button
    //     onClick={() => dispatch(openModal({ type: "createInvoice" }))}
    //     className="btn-primary"
    //   >
    //     <Plus size={16} />
    //     {/* New Invoice */}
    //   </button>

    //   <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors relative">
    //     <Bell size={18} />
    //     <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
    //   </button>

    //   <button className="text-gray-500 hover:text-gray-700">
    //     <Settings className="w-[18px] h-[18px]" />
    //   </button>

    //   <button className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white text-sm font-medium">
    //     {initials(user?.name)}
    //   </button>
    // </header>

    // <div className="h-[60px] border border-gray-200 rounded-md flex items-center justify-between px-4 bg-white flex-shrink-0">
    //   <div className="flex items-center gap-3 flex-1">
    <div className="h-[60px] border border-gray-100 rounded-md  flex items-center justify-between bg-white px-2 py-2 border-b">
      {/* Left Side */}
      <button className="flex items-center gap-1 text-xl font-semibold text-gray-900">
        All Customers
        <ChevronDown size={18} className="text-blue-600" />
      </button>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <div className="flex overflow-hidden rounded-md shadow-sm">
          <button className="flex items-center gap-2 bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">
            <Plus size={18} />
            New
          </button>

          <button className="bg-blue-600 px-3 text-white border-l border-blue-500 hover:bg-blue-700">
            <ChevronDown size={16} />
          </button>
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-md border bg-white hover:bg-gray-50">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
    //   </div>
    // </div>
  );
}
