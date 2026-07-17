import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedInvoice } from "../../slices/invoices/invoiceSlice";
import { FileText, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
export default function InvoiceOverViewCardSiderbarDetails() {
    const dispatch = useDispatch();

    const { invoices, selectedInvoice } = useSelector((state) => state.invoice);

    const statusColor = {
        ACTIVE: "bg-green-100 text-green-700",
        DRAFT: "bg-yellow-100 text-yellow-700",
        INACTIVE: "bg-red-100 text-red-700",
    };

    return (
        <div className="w-[440px] h-screen bg-white border-r border-gray-200 overflow-y-auto">

            {invoices?.length > 0 ? (
                invoices.map((inv) => (

                    <div
                        key={inv.id}
                        onClick={() => dispatch(setSelectedInvoice(inv))}
                        className={`cursor-pointer border-b border-gray-100 px-4 py-4 transition-all ${selectedInvoice?.id === inv.id
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
                                        {inv.customer?.displayName}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {inv.invoiceNumber}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {inv.invoiceDate}
                                    </p>

                                    <span
                                        className={`mt-2 inline-block rounded px-2 py-1 text-xs font-medium ${statusColor[inv.invoiceStatus]
                                            }`}
                                    >
                                        {inv.invoiceStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold">
                                    {formatCurrency(
                                        inv.totalAmount,
                                        inv.customer?.country === "India" ? "INR" : inv.currency
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                    <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                        <FileText className="h-12 w-12 text-gray-400" />
                        <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                            <Plus className="h-4 w-4" />
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800">
                        No invoices found
                    </h3>

                    <p className="mt-2 max-w-sm text-sm text-gray-500">
                        Start by creating your first invoice or change the selected filter to view existing invoices.
                    </p>

                    <button className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        Create Invoice
                    </button>
                </div>
            )}
        </div>
    )
}