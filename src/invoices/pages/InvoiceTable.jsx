import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {

    setCurrentPage,
    setSelectedInvoice,

} from "../../slices/invoices/invoiceSlice"


import { openModal } from "../../slices/Ui/uiSlice";
import { ChevronDown, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import ActionMenubar from "../../common/bars/Action/ActionMenubar";




const statusColor = {
    DRAFT: "bg-gray-100 text-gray-700",
    SENT: "bg-blue-100 text-blue-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    ACTIVE: "bg-green-100 text-green-700",
};


export default function InvoiceTable() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        invoices = [],
        loading,
        error,
        page,
        totalPages,
        totalElements,
    } = useSelector((state) => state.invoice);

    const currentInvoices = invoices;


    const initials = (displayName, customerName) => {
        const name = displayName || customerName || "";

        return (
            name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "??"
        );
    };

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


    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Header bar */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {[
                                "Customer",
                                "Invoice #",
                                "Order #",
                                "Invoice Date",
                                "Due Date",
                                "Sales Person",
                                "Subtotal",
                                "Tax",
                                "Total",
                                "Items",
                                "Status",
                                "Actions",
                            ].map((h) => (
                                <th
                                    key={h}
                                    className={`px-4 py-3 font-medium text-sm text-gray-500 uppercase ${h === "Actions" ? "text-right" : "text-left"
                                        }`}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {currentInvoices.map((invoice, idx) => (
                            <tr
                                key={invoice.id}
                                onClick={() => {
                                    dispatch(setSelectedInvoice(invoice));
                                    navigate(`/invoices/${invoice.id}`);
                                }}
                                className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${idx % 2 === 1 ? "bg-gray-50/40" : ""
                                    }`}
                            >
                                {/* Customer */}
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${getAvatarColor(
                                                invoice.customer?.displayName || ""
                                            )}`}
                                        >
                                            {initials(
                                                invoice.customer?.displayName ||
                                                `${invoice.customer?.firstName ?? ""} ${invoice.customer?.lastName ?? ""}`
                                            )}
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                {invoice.customer?.displayName || "—"}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                ID #{invoice.customer?.id || "—"}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Invoice Number */}
                                <td className="px-5 py-3">
                                    {invoice.invoiceNumber || "—"}
                                </td>

                                {/* Order number */}
                                <td className="px-5 py-3">
                                    {invoice.orderNumber || "—"}
                                </td>

                                {/* Invoice Date */}
                                <td className="px-5 py-3">
                                    {invoice.invoiceDate || "—"}
                                </td>

                                {/* Due Date */}
                                <td className="px-5 py-3">
                                    {invoice.dueDate || "—"}
                                </td>

                                {/* Sales person */}

                                <td className="px-5 py-3">
                                    {invoice.salesPerson?.salesPersonName || "—"}
                                </td>

                                {/* SubTotal */}

                                <td className="px-5 py-3">
                                    ₹
                                    {Number(invoice.subTotal || 0).toLocaleString()}
                                </td>

                                {/* Tax */}
                                <td className="px-5 py-3">
                                    ₹
                                    {Number(invoice.taxAmount || 0).toLocaleString()}
                                </td>

                                {/* Total */}
                                <td className="px-5 py-3 font-semibold">
                                    ₹
                                    {Number(invoice.totalAmount || 0).toLocaleString()}
                                </td>

                                {/* Items */}
                                <td className="px-5 py-3 font-semibold">
                                    {invoice.items?.length || 0} Items
                                </td>

                                {/* Status */}
                                <td className="px-5 py-3 font-semibold">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[invoice.invoiceStatus]}`}
                                    >
                                        {invoice.invoiceStatus || "—"}
                                    </span>
                                </td>


                                {/* Actions */}
                                <td className="px-6 py-3 text-right">
                                    <ActionMenubar
                                        onEdit={() => {
                                            dispatch(setSelectedItemMaster(invoice));
                                            navigate(`/invoices/edit/${invoice.id}`);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer / pagination */}
            <div className="px-5 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    Showing {currentInvoices.length} of {totalElements} invoices
                </p>

                <div className="flex items-center gap-3">
                    <button
                        disabled={page === 0}
                        onClick={() => dispatch(setCurrentPage(page - 1))}
                        className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:hover:text-gray-400"
                    >
                        Previous
                    </button>

                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-medium">
                        {page + 1}
                    </span>

                    <button
                        disabled={page + 1 >= totalPages}
                        onClick={() => dispatch(setCurrentPage(page + 1))}
                        className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:hover:text-gray-400"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}