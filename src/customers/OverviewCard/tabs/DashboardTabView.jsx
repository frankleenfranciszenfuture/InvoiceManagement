import React from 'react'
import CustomerSubDetailsOverviewCard from "../../../customers/OverviewCard/tabs/tabsCustomerSubDetailsOverviewCards/CustomerSubDetailsOverviewCard";
import CustomerPayDueOverviewCard from "../../../customers/OverviewCard/tabs/tabsCustomerSubDetailsOverviewCards/CustomerPayDueOverviewCard";
import CustomerSalesOverviewCard from "../../../customers/OverviewCard/tabs/tabsCustomerSubDetailsOverviewCards/CustomerSalesOverviewCard";

export default function DashboardTabView() {
  return (
    <div className="px-3 py-2">
      <div className="flex gap-8">
        <div className="flex-1">
          <CustomerSubDetailsOverviewCard />
        </div>
        <div className="flex-1">
          <CustomerPayDueOverviewCard />
          <CustomerSalesOverviewCard />
        </div>
      </div>
    </div>
  );
}
