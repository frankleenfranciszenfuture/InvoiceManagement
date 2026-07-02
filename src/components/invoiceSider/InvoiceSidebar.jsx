import { useDispatch, useSelector } from "react-redux";
import { setSelectedInvoice } from "../../slices/invSlice";
import InvoiceTopbar from "./invoiceTopbar";

export default function InvoiceSidebar() {
  const dispatch = useDispatch();

  const { customers, selectedInvoice } = useSelector((state) => state.invoice);

  return (
    <div className="w-[400px] h-screen bg-white border-r border-gray-200 overflow-y-auto">
      {customers.map((inv) => (
        <div
          key={inv.id}
          onClick={() => dispatch(setSelectedInvoice(inv))}
          className={`cursor-pointer border-b border-gray-100 px-4 py-4 transition-all
            ${
              selectedInvoice?.id === inv.id
                ? "bg-blue-50 border-l-4 border-l-blue-600"
                : "hover:bg-gray-50"
            }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <input
                type="checkbox"
                onClick={(e) => e.stopPropagation()}
                className="mt-1"
              />

              <div>
                <h3 className="font-semibold text-gray-800">
                  {inv.customerName}
                </h3>

                <p className="text-sm text-gray-500">{inv.invoiceNumber}</p>

                <p className="text-xs text-gray-400 mt-1">{inv.invoiceDate}</p>

                <span className="mt-2 inline-block rounded bg-gray-100 py-0.5 text-xs font-medium">
                  {inv.status || "Draft"}
                </span>
              </div>
            </div>
            <div className="text-left">
              <p className="font-semibold">
                ₹{Number(inv.total || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
