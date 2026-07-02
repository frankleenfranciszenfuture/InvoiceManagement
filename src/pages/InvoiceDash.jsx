import InvoiceSidebar from "../components/invoiceSider/InvoiceSidebar";
import InvoiceTopbar from "../components/invoiceSider/invoiceTopbar";
import InvoiceTopbar2 from "../components/invoiceSider/InvoiceTopbar2";
import InvoiceTopbar3 from "../components/invoiceSider/InvoiceTopbar3";

import { useSelector, useDispatch } from "react-redux";
import { LayoutTemplate } from "lucide-react";
import { openModal } from "../slices/uiSlice";
import InvoicePreview from "../templateModel/InvoicePreview";

export default function InvoiceDash() {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice.selectedInvoice);

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div className="w-[420px] border border-gray-200 ">
        <div className="sticky top-0 z-40 bg-white border border-gray-200">
          <InvoiceTopbar />
        </div>

        <div className="flex-1 ">
          <InvoiceSidebar />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Sticky Header — fixed from accidental modal backdrop classes */}
        <div className="sticky top-0 z-40 bg-white flex flex-col">
          <InvoiceTopbar2 />
          <InvoiceTopbar3 />
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="p-10">
            <div className="relative group bg-white rounded-lg shadow">
              <button
                onClick={() =>
                  dispatch(
                    openModal({
                      type: "changeTemplate",
                      data: { invoiceId: invoice?.id },
                    }),
                  )
                }
                className="
                  absolute top-4 right-4
                  opacity-0 invisible
                  group-hover:opacity-100
                  group-hover:visible
                  transition-all duration-200
                  rounded-md border border-gray-200
                  bg-white px-3 py-1.5
                  text-sm text-blue-600
                  shadow-sm hover:bg-gray-50
                  flex items-center gap-2
                "
              >
                <LayoutTemplate size={16} />
                Change Template
              </button>

              <div className="p-20 rounded-md bg-gray-100 overflow-hidden">
                <InvoicePreview invoice={invoice} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
