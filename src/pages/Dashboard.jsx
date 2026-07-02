import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../slices/dashboardSlice";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ReceivablesCard from "../components/ReceivablesCard";
import SalesExpensesCard from "../components/SalesExpensesCard";
import { FileText, MessageCircle } from "lucide-react";
import TopQuotationCard from "../components/TopQuotationCard";
import TopSalesOrderCard from "../components/TopSalesOrderCard";
import TopProductsCard from "../components/TopProductsOrder";
import TopCountriesCard from "../components/TopCountriesCard";
import TopCustomersCard from "../components/TopCustomersCard";
import StatsCard from "../components/StatsCard";

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

export default function Dashboard() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.dashboard.user);
  const user = useSelector((state) => state.auth.user);

  const { activeTab, data, loading, error } = useSelector(
    (state) => state.dashboard,
  );

  const tabs = ["Dashboard", "Recent Updates", "Top Quotation"];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-[13px] overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {/* Greeting header */}
        <div className="px-8 pt-2 pb-4 relative overflow-hidden">
          {/* <div className="flex items-start gap-3 relative z-10">
            <div className="w-11 h-11 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <h1 className="text-xl font-medium text-gray-800">
                Hello, {user.name}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">{user.orgName}</p>
            </div>
          </div> */}

          {/* Tabs */}
          <div className="flex gap-6 mt-5 border-b border-gray-200 relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => dispatch(setActiveTab(tab))}
                className={`pb-2.5 text-sm relative ${
                  activeTab === tab
                    ? "text-gray-800 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-blue-600 rounded-t" />
                )}
              </button>
            ))}
          </div>

          {/* StatsCard */}
          <div>
            <StatsCard />
          </div>
        </div>

        {/* Main content */}
        {activeTab === "Dashboard" && (
          <div className="px-8 pb-10 ">
            <ReceivablesCard />
            <TopQuotationCard />
            <div className=" flex gap-8">
              <div className="flex-1">
                <TopSalesOrderCard />
              </div>

              <div className="flex-1">
                <TopProductsCard />
              </div>
            </div>

            <div className=" flex gap-8">
              <div className="flex-1">
                <TopCountriesCard />
              </div>

              <div className="flex-1">
                <TopCustomersCard />
              </div>
            </div>

            <SalesExpensesCard />
          </div>
        )}

        {activeTab === "Recent Updates" && (
          <div className="px-8 pb-10 text-gray-400 text-sm">
            No recent updates.
          </div>
        )}
      </div>

      {/* Need Assistance chat bubble */}
      <button className="absolute bottom-5 right-6 flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-2 pr-4 py-2 shadow-lg hover:shadow-xl transition-shadow">
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300 flex items-center justify-center">
          <MessageCircle className="w-3.5 h-3.5 text-white" />
        </span>
        <span className="text-sm font-medium text-gray-700">
          Need Assistance?
        </span>
      </button>
    </div>
  );
}
