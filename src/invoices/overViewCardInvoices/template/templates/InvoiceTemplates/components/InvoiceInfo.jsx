import React from "react";

export default function InvoiceInfo({ invoice }) {
    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="flex justify-end">
            <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Invoice Details
                </h3>

                <div className="space-y-3 text-sm">

                    <div className="flex justify-between">
                        <span className="text-gray-500">Invoice No</span>
                        <span className="font-medium">
                            {invoice?.invoiceNumber || "-"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Invoice Date</span>
                        <span>
                            {formatDate(invoice?.invoiceDate)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Due Date</span>
                        <span>
                            {formatDate(invoice?.dueDate)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Order No</span>
                        <span>
                            {invoice?.orderNumber || "-"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Reference No</span>
                        <span>
                            {invoice?.referenceNumber || "-"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Currency</span>
                        <span>
                            {invoice?.currency || "-"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">
                            Exchange Rate
                        </span>
                        <span>
                            {invoice?.exchangeRate ?? "-"}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>

                        <span
                            className={`rounded-full px-2 py-1 text-xs font-medium
                                ${invoice?.invoiceStatus === "ACTIVE"
                                    ? "bg-green-100 text-green-700"
                                    : invoice?.invoiceStatus === "DRAFT"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                        >
                            {invoice?.invoiceStatus || "-"}
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
}