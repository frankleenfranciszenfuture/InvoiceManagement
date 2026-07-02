import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../slices/customerSlice";

import DashboardView from "../../pages/customers/DashboardView";
import CustomerTransaction from "../../pages/customers/CustomerTransaction";
import CustomerRecentUpdates from "../../pages/customers/CustomerRecentUpdates";
import CustomerTopQuotation from "../../pages/customers/CustomerTopQuotation";


export default function CustomerTopbar3() {
  const dispatch = useDispatch();

  const { activeTab, selectedCustomer } = useSelector(
    (state) => state.customer
  );

  if (!selectedCustomer) {
    return <div>Customer not found</div>;
  }

  const tabs = [
    "Dashboard",
    "Transaction",
    "Recent Updates",
    "Top Quotation",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardView />;

      case "Transaction":
        return <CustomerTransaction />;

      case "Recent Updates":
        return <CustomerRecentUpdates />;

      case "Top Quotation":
        return <CustomerTopQuotation />;

      default:
        return <DashboardView />;
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 bg-white px-4 ">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => dispatch(setActiveTab(tab))}
            className={`relative py-4 text-sm cursor-pointer ${activeTab === tab
              ? "font-semibold text-black"
              : "text-gray-500"
              }`}
          >
            {tab}

            {activeTab === tab && (
              <div className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-600" />
            )}
          </button>
        ))}
      </div>

      {/* This div changes */}
      <div className="p-4 bg-gray-50 min-h-[700px] ">
        {renderTabContent()}
      </div>
    </div>
  );
}