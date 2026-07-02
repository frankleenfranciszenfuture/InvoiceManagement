import CustomerSidebar from "../../components/customerbars/CustomerSidebar";
import CustomerTopbar from "../../components/customerbars/CustomerTopbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LayoutTemplate } from "lucide-react";
import { openModal } from "../../slices/uiSlice";
import CustomerTopbar2 from "../../components/customerbars/CustomerTopbar2";
import CustomerTopbar3 from "../../components/customerbars/CustomerTopbar3";
import CustomerOverviewCard from "../../components/customerbars/CustomerOverviewCard";
// import InvoicePreview from "../templateModel/InvoicePreview";
import { getCustomerById } from "../../slices/customerSlice";
import CustomerOverviewSalesExpensesCard from "../../components/customerbars/CustomerOverviewSalesExpensesCard";
import CustomerTabContent from "./CustomerTabContent";

export default function CustomerDash() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.selectedCustomer);

  useEffect(() => {
    if (id) {
      dispatch(getCustomerById(id));
    }
  }, [id, dispatch]);

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div className="w-[440px] border border-gray-200 ">
        <div className="sticky top-0 z-40 bg-white border border-gray-200">
          <CustomerTopbar />
        </div>

        <div className="flex-1 ">
          <CustomerSidebar />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Sticky Header — fixed from accidental modal backdrop classes */}
        <div className="sticky top-0 z-40 bg-white flex flex-col">
          <CustomerTopbar2 />
          <CustomerTopbar3 />
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <CustomerTabContent />

        </div>
      </div>
    </div>
  );
}
