import { useDispatch, useSelector } from "react-redux";
import { setSelectedCustomer } from "../../slices/customerSlice";
// import InvoiceTopbar from "./invoiceTopbar";
import { useNavigate } from "react-router-dom";

export default function CustomerSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customers, selectedCustomer } = useSelector(
    (state) => state.customer,
  );

  return (
    <div className="w-[387px] h-screen bg-white border-r border-gray-200 overflow-y-auto">
      {customers.map((c) => (
        <div
          key={c.id}
          onClick={() => {
            dispatch(setSelectedCustomer(c));
            navigate(`/customers/${c.id}`);
          }}
          className={`cursor-pointer border-b border-gray-100 px-4 py-4 transition-all
               ${selectedCustomer?.id === c.id
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
                <h3 className="font-semibold text-gray-800">{c.displayName}</h3>

                <p className="text-sm text-gray-500">{c.id}</p>

                <p className="text-xs text-gray-400 mt-1">{c.displayName}</p>

                <span className="mt-2 inline-block rounded bg-gray-100 py-0.5 text-xs font-medium">
                  {c.status || "Draft"}
                </span>
              </div>
            </div>
            <div className="text-left">
              <p className="font-semibold">
                ₹{Number(c.total || 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
