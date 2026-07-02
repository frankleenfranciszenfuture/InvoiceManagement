import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../slices/uiSlice";
import {
  Sparkles,
  ChevronRight,
  Home,
  User,
  Package,
  LayoutDashboard,
  FileText,
  Users,
  Menu,
  X,
  File,
  Truck,
  Wallet,
  Receipt,
  Clock,
  BarChart2,
  Globe,
  PanelLeftClose,
  TrendingUp,
  Settings,
  Plus,
  FolderKanban,
} from "lucide-react";

const NAV = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    addTo: "/dashboard",
  },

  {
    to: "/customers",
    icon: Users,
    label: "Customers",
    addTo: "/customers/new",
  },
  {
    to: "/items",
    icon: FolderKanban,
    label: "Items",
    addTo: "/items/new",
  },

  {
    to: "/qutoes",
    icon: FileText,
    label: "Quotes",
    addTo: "/quotes/new",
  },

  {
    to: "/invoices",
    icon: FileText,
    label: "Invoices",
    addTo: "/invoices/new",
  },
  {
    to: "/view",
    icon: Truck,
    label: "Delivery Challans",
    addTo: "/view",
  },
  { to: "/payment", icon: Wallet, label: "Payments Received" },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const open = useSelector((s) => s.ui.sidebarOpen);
  const navigate = useNavigate();
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30  bg-[#080c39] border-r border-gray-100 flex flex-col
          transition-all duration-300
          ${open ? "w-60" : "w-3 lg:w-18 overflow-hidden"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-100 shrink-0">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shrink-0">
            <TrendingUp size={16} className="text-white" />
          </div>
          {open && (
            <span className="font-semibold text-gray-200 text-sm tracking-tight">
              InvoicePro
            </span>
          )}
        </div>

        {/* Getting Started */}
        <div className="px-3 mb-2">
          <div>
            <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <span className="flex items-center gap-2 text-sm text-white">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Getting Started
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <div className="mt-2 h-1 rounded-full bg-white/10 mx-3 overflow-hidden">
              <div className="h-full w-[15%] bg-blue-500 rounded-full" />
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-2 space-y-2 px-2 overflow-y-auto">
            {NAV.map(({ to, icon: Icon, label, addTo }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `group flex items-stretch justify-between rounded-md overflow-hidden ${isActive
                    ? "bg-blue-400 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-3 px-2 py-2 flex-1">
                  <Icon size={18} />
                  {open && <span>{label}</span>}
                </div>

                {open && addTo && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault(); // stop NavLink navigation
                      e.stopPropagation(); // stop bubbling
                      navigate(addTo);
                    }}
                    className="
        w-8
        flex items-center justify-center
        border-l border-white/10
        bg-white/35
        opacity-0
        group-hover:opacity-100
        transition-all duration-200
      "
                  >
                    <Plus
                      size={16}
                      className="text-gray-600 group-hover:text-white"
                    />
                  </button>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom toggle */}
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                       text-gray-500 hover:bg-gray-50 transition-colors text-sm"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
              {open && <span className="text-xs">Collapse</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
