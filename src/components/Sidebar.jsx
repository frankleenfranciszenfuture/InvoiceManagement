import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../slices/uiSlice";
import { resetInvoice } from "../slices/invoiceSlice";

import {
  Sparkles,
  ChevronRight,
  LayoutDashboard,
  Users,
  FileText,
  FolderKanban,
  Truck,
  Wallet,
  Plus,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    addTo: "/dashboard",
  },
  {
    label: "Customers",
    icon: Users,
    addTo: "/customers/new",
    children: [
      { label: "All", to: "/customers/all" },
      { label: "Active", to: "/customers/active" },
      { label: "Inactive", to: "/customers/inactive" },
    ],
  },
  {
    to: "/items",
    icon: FolderKanban,
    label: "Items",
    addTo: "/items/new",
  },
  {
    to: "/quotes",
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
  },
  {
    to: "/payment",
    icon: Wallet,
    label: "Payments Received",
  },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const open = useSelector((s) => s.ui.sidebarOpen);

  const [openMenu, setOpenMenu] = React.useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isActiveRoute = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <>
      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 bg-[#080c39] border-r border-white/10
          flex flex-col transition-all duration-300
          ${open ? "w-60" : "w-16 overflow-hidden"}
        `}
      >
        {/* LOGO */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp size={16} className="text-white" />
          </div>

          {open && (
            <span className="text-sm font-semibold text-gray-200">
              InvoicePro
            </span>
          )}
        </div>

        {/* GETTING STARTED */}
        <div className="px-3 mt-3">
          <div className="rounded-xl bg-white/5 hover:bg-white/10 transition">
            <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <span className="flex items-center gap-2 text-sm text-white min-w-0 flex-1">
                <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />

                <span className="truncate whitespace-nowrap">
                  Getting Started
                </span>
              </span>

              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </button>

            <div className="px-3 pb-3">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[15%] bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 py-3 space-y-1 px-2 overflow-y-auto">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = item.to && isActiveRoute(item.to);

            return (
              <div key={item.label} className="flex flex-col">
                <div className="group flex items-stretch justify-between rounded-md overflow-hidden">
                  {/* MAIN */}
                  {item.children ? (
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === item.label ? null : item.label
                        )
                      }
                      className="flex items-center gap-3 px-3 py-2 flex-1 text-gray-300 hover:bg-white/10 hover:text-white"
                    >
                      <Icon size={18} />
                      {open && <span>{item.label}</span>}
                    </button>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 flex-1 transition
                         ${isActive
                          ? "bg-blue-500 text-white"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`
                      }
                    >
                      <Icon size={18} />
                      {open && <span>{item.label}</span>}
                    </NavLink>
                  )}

                  {/* ADD BUTTON */}
                  {open && item.addTo && (
                    <button
                      onClick={() => {
                        dispatch(resetInvoice());
                        navigate(item.addTo);
                      }}
                      className="w-8 flex items-center justify-center border-l border-white/10
                                 opacity-0 group-hover:opacity-100 hover:bg-white/10"
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>

                {/* CHILDREN */}
                {item.children && openMenu === item.label && (
                  <div className="ml-7 mt-1 flex flex-col space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `text-sm px-2 py-1 rounded-md transition
                           ${isActive
                            ? "text-blue-400 font-medium"
                            : "text-gray-400 hover:text-white"
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* BOTTOM TOGGLE */}
        <div className="p-2 border-t border-white/10">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                       text-gray-400 hover:bg-white/5 transition"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
            {open && <span className="text-xs">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}