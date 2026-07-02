import CustomerOverviewCard from "../../components/customerbars/CustomerOverviewCard";
import CustomerOverviewPayDueCard from "../../components/customerbars/CustomerOverviewPayDueCard";
import CustomerOverviewSalesExpensesCard from "../../components/customerbars/CustomerOverviewSalesExpensesCard";

export default function DashboardView() {
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