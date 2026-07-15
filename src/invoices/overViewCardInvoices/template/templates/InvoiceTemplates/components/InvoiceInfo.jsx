import React from "react";
import {
    FileText,
    Calendar,
    CalendarDays,
    Hash,
    BadgeIndianRupee,
    Receipt,
} from "lucide-react";

import useSelectedInvoice from "../../../templates/InvoiceTemplates/hooks/useSelectedInvoice";

export default function InvoiceInfo() {

    const invoice = useSelectedInvoice();

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6">

            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-gray-800">
                <FileText size={20} />
                Invoice Details
            </h3>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">

                <div>
                    <label className="text-xs text-gray-500">
                        Invoice Number
                    </label>

                    <div className="mt-1 flex items-center gap-2 font-medium">
                        <Hash size={15} />
                        {invoice?.invoiceNumber || "-"}
                    </div>
                </div>

                <div>
                    <label className="text-xs text-gray-500">
                        Invoice Date
                    </label>

                    <div className="mt-1 flex items-center gap-2">
                        <Calendar size={15} />
                        {invoice?.invoiceDate || "-"}
                    </div>
                </div>

                <div>
                    <label className="text-xs text-gray-500">
                        Due Date
                    </label>

                    <div className="mt-1 flex items-center gap-2">
                        <CalendarDays size={15} />
                        {invoice?.dueDate || "-"}
                    </div>
                </div>

                <div>
                    <label className="text-xs text-gray-500">
                        Currency
                    </label>

                    <div className="mt-1 flex items-center gap-2">
                        <BadgeIndianRupee size={15} />
                        {invoice?.currency || "-"}
                    </div>
                </div>

                <div>
                    <label className="text-xs text-gray-500">
                        Exchange Rate
                    </label>

                    <div className="mt-1">
                        {invoice?.exchangeRate ?? "-"}
                    </div>
                </div>

                <div>
                    <label className="text-xs text-gray-500">
                        Order Number
                    </label>

                    <div className="mt-1">
                        {invoice?.orderNumber || "-"}
                    </div>
                </div>

                <div>
                    <label className="text-xs text-gray-500">
                        Reference Number
                    </label>

                    <div className="mt-1">
                        {invoice?.referenceNumber || "-"}
                    </div>
                </div>

                <div>
                    <label className="text-xs text-gray-500">
                        Status
                    </label>

                    <div className="mt-1">
                        {invoice?.invoiceStatus || "-"}
                    </div>
                </div>

            </div>

            <div className="mt-6">

                <label className="text-xs text-gray-500">
                    Subject
                </label>

                <div className="mt-2 flex items-start gap-2 rounded-md bg-gray-50 p-3">

                    <Receipt
                        size={18}
                        className="mt-0.5 text-blue-600"
                    />

                    <span className="text-gray-700">
                        {invoice?.subject || "-"}
                    </span>

                </div>

            </div>

        </div>
    );
}