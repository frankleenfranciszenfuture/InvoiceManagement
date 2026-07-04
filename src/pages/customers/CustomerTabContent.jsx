import { useSelector } from "react-redux";

import CustomerOverviewCard from "../../components/customerbars/CustomerOverviewCard";
import CustomerTransaction from "./CustomerTransaction";
import CustomerRecentUpdates from "./CustomerRecentUpdates";
import CustomerTopQuotation from "./CustomerTopQuotation";
import CustomerOverviewPayDueCard from "../../components/customerbars/CustomerOverviewPayDueCard";
import CustomerOverviewSalesExpensesCard from "../../components/customerbars/CustomerOverviewSalesExpensesCard";
import { toast } from "react-toastify";


export default function CustomerTabContent() {
    const activeTab = useSelector((state) => state.customer.activeTab);

    switch (activeTab) {
        case "Transaction":
            // return <CustomerTransaction />;
            <div className="px-3 py-2">
                <div className="flex gap-8">
                    <div className="flex-1">
                        <CustomerTransaction />
                    </div>

                    <div className="flex-1">
                        <CustomerOverviewPayDueCard />
                        <CustomerOverviewSalesExpensesCard />
                    </div>
                </div>
            </div>

        case "Recent Updates":
            // return <CustomerRecentUpdates />;

            <div className="px-3 py-2">
                <div className="flex gap-8">
                    <div className="flex-1">
                        <CustomerRecentUpdates />
                    </div>

                    <div className="flex-1">
                        <CustomerOverviewPayDueCard />
                        <CustomerOverviewSalesExpensesCard />
                    </div>
                </div>
            </div>

        case "Top Quotation":
            // return <CustomerTopQuotation />;

            <div className="px-3 py-2">
                <div className="flex gap-8">
                    <div className="flex-1">
                        <CustomerTopQuotation />
                    </div>

                    <div className="flex-1">
                        <CustomerOverviewPayDueCard />
                        <CustomerOverviewSalesExpensesCard />
                    </div>
                </div>
            </div>

        default:
            return (
                <div className="px-3 py-2">
                    <div className="flex gap-8">
                        <div className="flex-1">
                            <CustomerOverviewCard />
                        </div>

                        <div className="flex-1">
                            <CustomerOverviewPayDueCard />
                            <CustomerOverviewSalesExpensesCard />
                        </div>
                    </div>
                </div>
            );
    }
}