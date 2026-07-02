import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import {
  loadCustomers,
  setCurrentPage,
  setSelectedCustomer,
  getCustomerById,
} from "../slices/customerSlice";

import { openModal } from "../slices/uiSlice";
import { Pencil, Trash2, User } from "lucide-react";
import toast from "react-hot-toast";

export default function CustomerTable() {
  const dispatch = useDispatch();

  // const customerState = useSelector((state) => state.customer);
  // const { page, pageSize } = useSelector((state) => state.customer);
  // console.log("Customer State:", customerState);

  // const customers = customerState.customers || [];

  const { customers, loading, error, page, pageSize, totalElements } =
    useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(loadCustomers({ page, size: pageSize }));
  }, [dispatch, page, pageSize]);

  // const startIndex = (page - 1) * pageSize;
  // const currentCustomers = customers.slice(startIndex, startIndex + pageSize);

  // const totalPages = Math.ceil(customers.length / pageSize);

  // const handleViewCustomer = async (id) => {
  //   try {
  //     await dispatch(getCustomerById(id)).unwrap();

  //     dispatch(
  //       openModal({
  //         type: "viewCustomer",
  //       }),
  //     );
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to load customer");
  //   }
  // };

  const startIndex = (page - 1) * pageSize;
  const currentCustomers = customers.slice(startIndex, startIndex + pageSize);

  const totalPages = Math.ceil(customers.length / pageSize);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await dispatch(removeCustomer(id)).unwrap();
      toast.success("Customer deleted");
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

  if (!customers || customers.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <User className="mx-auto mb-3 h-10 w-10 text-gray-300" />
        <p className="text-gray-500">No customers yet. Add your first one!</p>

        {/* Debug */}
        {/* <pre>{JSON.stringify(customerState, null, 2)}</pre> */}
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!customers.length) {
    return (
      <div className="p-10 text-center text-gray-500">No customers found.</div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "Display Name",
                "Customer Type",
                "Email",
                "Mobile",
                "Work Phone",
                "PAN",
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
            {customers?.length > 0 ? (
              customers.map((c, index) => (
                <tr
                  key={c.id || index}
                  onClick={() => {
                    dispatch(setSelectedCustomer(c));
                    navigate(`/customers/${c.id}`);
                  }}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  {/* Customer Info */}
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarColor(
                          c.displayName || c.customerName,
                        )}`}
                      >
                        {initials(c.displayName || c.customerName)}
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">
                          {c.displayName}
                        </p>
                        <p className="text-sm text-gray-500">ID: #{c.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3">{c.customerType || "—"}</td>

                  {/* Email */}
                  <td className="px-4 py-3">{c.email || "—"}</td>

                  {/* Mobile */}
                  <td className="px-4 py-3">
                    {c.mobileCode || "+91"} {c.mobile || "—"}
                  </td>

                  {/* Work Phone */}
                  <td className="px-4 py-3">
                    {c.workPhoneCode || "+91"} {c.workPhone || "—"}
                  </td>

                  {/* PAN */}
                  <td className="px-4 py-3">{c.pan || "—"}</td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            openModal({
                              type: "editCustomer",
                              data: c,
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
                          handleDelete(c.id);
                        }}
                        className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-300 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-5 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {currentCustomers.length} of {totalElements} customers
        </p>

        <div className="flex items-center gap-3">
          <button
            disabled={page === 0}
            onClick={() => dispatch(setCurrentPage(page - 1))}
            className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-medium">
            {page + 1}
          </span>

          <button
            disabled={page >= totalPages - 1}
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
