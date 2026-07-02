import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeInvoice,
  removeInvoiceLocal,
  setCurrentPage,
  setSelectedInvoice,
} from "../slices/invSlice";
import { openModal } from "../slices/uiSlice";
import { Pencil, Trash2, User } from "lucide-react";
import toast from "react-hot-toast";

export default function InvTab() {
  const dispatch = useDispatch();

  const invoiceState = useSelector((state) => state.invoice);

  const invoices = invoiceState.customers || [];

  console.log(invoices);
  const { page, pageSize, customers } = invoiceState;

  const startIndex = (page - 1) * pageSize;
  const currentInvoices = invoices.slice(startIndex, startIndex + pageSize);

  const totalPages = Math.ceil(invoices.length / pageSize);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Invoice?")) return;

    try {
      await dispatch(removeInvoiceLocal(id)).unwrap();
      toast.success("Invoice deleted");
    } catch (e) {
      toast.error(e.message || "Failed to delete customer");
    }
  };

  const initials = (customerName) =>
    customerName
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "??";

  // get colors
  const avatarColors = [
    "bg-pink-500 text-white",
    "bg-green-500 text-white",
    "bg-blue-500 text-white",
    "bg-purple-500 text-white",
    "bg-orange-500 text-white",
    "bg-cyan-500 text-white",
    "bg-indigo-500 text-white",
  ];

  const getAvatarColor = (name) => {
    const index =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      avatarColors.length;

    return avatarColors[index];
  };

  if (!invoices || invoices.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <User className="mx-auto mb-3 h-10 w-10 text-gray-300" />
        <p className="text-gray-500">No customers yet. Add your first one!</p>

        {/* Debug */}
        <pre>{JSON.stringify(invoiceState, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "Customer",
                "Invoice #",
                "Date",
                "Due Date",
                "Phone",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 font-medium text-sm text-gray-500 uppercase ${
                    h === "Actions" ? "text-right" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentInvoices.map((i, index) => (
              <tr
                key={i.id || index}
                onClick={() => {
                  dispatch(setSelectedInvoice(i));
                  navigate(`/invoice/${i.id}`);
                }}
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                {/* table data */}
                <td className="px-2 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarColor(
                        i.customerName,
                      )}`}
                    >
                      {initials(i.customerName)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {i.customerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        ID: #{startIndex + index + 1}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">{i.invoiceNumber || "—"}</td>

                <td className="px-4 py-3">{i.invoiceDate || "—"}</td>

                <td className="px-4 py-3">{i.terms || "—"}</td>

                {/* <td className="px-4 py-3">
                  {i.terms || "+91"} {i.mobile || "—"}
                </td> */}

                <td className="px-4 py-3">
                  {i.workPhoneCode || "+91"} {i.workPhone || "—"}
                </td>

                {/* <td className="px-4 py-3">{c.pan || "—"}</td> */}

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          openModal({
                            type: "editInvoice",
                            data: i,
                          }),
                        );
                      }}
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-300 transition-all"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(i.id);
                      }}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-300 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-5 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {currentInvoices.length} of {invoices.length} invoices
        </p>

        <div className="flex items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => dispatch(setCurrentPage(page - 1))}
            className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-medium">
            {page}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => dispatch(setCurrentPage(page + 1))}
            className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
