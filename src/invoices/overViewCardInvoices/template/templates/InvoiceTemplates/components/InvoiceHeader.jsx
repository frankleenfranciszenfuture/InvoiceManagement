import React from "react";
import {
    Building2,
    MapPin,
    Mail,
    Phone,
    Globe,
    BadgeIndianRupee,
} from "lucide-react";

import useSelectedInvoice from "../../../templates/InvoiceTemplates/hooks/useSelectedInvoice";

export default function InvoiceHeader() {

    const invoice = useSelectedInvoice();

    // Temporary: Use customer as company
    const company = invoice?.customer;

    const statusColor = {
        ACTIVE: "bg-green-100 text-green-700",
        DRAFT: "bg-yellow-100 text-yellow-700",
        INACTIVE: "bg-red-100 text-red-700",
        PAID: "bg-blue-100 text-blue-700",
        OVERDUE: "bg-red-100 text-red-700",
    };

    const address = [
        company?.billingAddress?.address,
        company?.billingAddress?.city,
        company?.billingAddress?.state,
        company?.billingAddress?.country,
        company?.billingAddress?.zipCode,
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <div className="border-b border-gray-200 bg-white px-8 py-8">

            {/* Header */}
            <div className="flex justify-between items-start">

                {/* Company Details */}
                <div className="flex gap-5">

                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-gray-50">

                        {company?.logo ? (
                            <img
                                src={company.logo}
                                alt={company.companyName}
                                className="h-full w-full object-contain"
                            />
                        ) : (
                            <Building2
                                size={42}
                                className="text-blue-600"
                            />
                        )}

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            {company?.companyName || company?.displayName || "-"}
                        </h1>

                        <div className="mt-3 space-y-2 text-sm text-gray-600">

                            <div className="flex items-center gap-2">
                                <MapPin size={15} />
                                {address || "-"}
                            </div>

                            <div className="flex items-center gap-2">
                                <Mail size={15} />
                                {company?.email || "-"}
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone size={15} />
                                {company?.workPhone || company?.mobile || "-"}
                            </div>

                            <div className="flex items-center gap-2">
                                <Globe size={15} />
                                {company?.websiteUrl || "-"}
                            </div>

                        </div>

                    </div>

                </div>

                {/* Invoice Details */}
                <div className="text-right">

                    <h2 className="text-5xl font-bold tracking-wide text-blue-700">
                        INVOICE
                    </h2>

                    <div className="mt-4 space-y-2">

                        <p>
                            <span className="font-semibold">
                                Invoice No :
                            </span>{" "}
                            {invoice?.invoiceNumber || "-"}
                        </p>

                        <p>
                            <span className="font-semibold">
                                Invoice Date :
                            </span>{" "}
                            {invoice?.invoiceDate || "-"}
                        </p>

                        <p>
                            <span className="font-semibold">
                                Due Date :
                            </span>{" "}
                            {invoice?.dueDate || "-"}
                        </p>

                        <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColor[invoice?.invoiceStatus] ||
                                "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {invoice?.invoiceStatus || "DRAFT"}
                        </span>

                    </div>

                </div>

            </div>

            {/* GST / PAN */}
            <div className="mt-8 grid grid-cols-2 gap-6 rounded-lg bg-gray-50 p-4">

                <div className="flex items-center gap-3">

                    <BadgeIndianRupee
                        size={18}
                        className="text-green-600"
                    />

                    <div>

                        <p className="text-xs text-gray-500">
                            PAN Number
                        </p>

                        <p className="font-medium">
                            {company?.pan || "-"}
                        </p>

                    </div>

                </div>

                <div>

                    <p className="text-xs text-gray-500">
                        Customer Type
                    </p>

                    <p className="font-medium">
                        {company?.customerType || "-"}
                    </p>

                </div>

            </div>

        </div>
    );
}