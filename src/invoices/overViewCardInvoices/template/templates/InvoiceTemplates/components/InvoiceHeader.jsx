import React from "react";
import {
    Building2,
    MapPin,
    Mail,
    Phone,
    Globe,
    BadgeIndianRupee,
} from "lucide-react";

export default function InvoiceHeader({ invoice }) {

    // Replace later with Company Settings API
    const company = invoice?.company || {
        companyName: "FH Technology",
        logo: "",
        email: "info@fhtechnology.com",
        phone: "+91 9876543210",
        website: "www.fhtechnology.com",
        gstNumber: "33ABCDE1234F1Z5",
        panNumber: "ABCDE1234F",
        address: "12G, MGR Street, Coimbatore, Tamil Nadu - 641011",
    };

    const statusColor = {
        ACTIVE: "bg-green-100 text-green-700",
        DRAFT: "bg-yellow-100 text-yellow-700",
        INACTIVE: "bg-red-100 text-red-700",
        PAID: "bg-blue-100 text-blue-700",
        OVERDUE: "bg-red-100 text-red-700",
    };

    return (
        <div className="border-b border-gray-200 bg-white px-8 py-8">

            {/* Top Section */}
            <div className="flex justify-between items-start">

                {/* Company */}

                <div className="flex gap-5">

                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-gray-50">

                        {company.logo ? (
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
                            {company.companyName}
                        </h1>

                        <div className="mt-3 space-y-1 text-sm text-gray-600">

                            <div className="flex items-center gap-2">
                                <MapPin size={15} />
                                {company.address}
                            </div>

                            <div className="flex items-center gap-2">
                                <Mail size={15} />
                                {company.email}
                            </div>

                            <div className="flex items-center gap-2">
                                <Phone size={15} />
                                {company.phone}
                            </div>

                            <div className="flex items-center gap-2">
                                <Globe size={15} />
                                {company.website}
                            </div>

                        </div>

                    </div>

                </div>

                {/* Invoice */}

                <div className="text-right">

                    <h2 className="text-5xl font-bold tracking-wide text-blue-700">
                        INVOICE
                    </h2>

                    <div className="mt-4 space-y-2">

                        <p className="text-gray-600">
                            <span className="font-semibold">
                                Invoice No :
                            </span>{" "}
                            {invoice?.invoiceNumber}
                        </p>

                        <p className="text-gray-600">
                            <span className="font-semibold">
                                Invoice Date :
                            </span>{" "}
                            {invoice?.invoiceDate}
                        </p>

                        <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColor[invoice?.invoiceStatus] ||
                                "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {invoice?.invoiceStatus}
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
                            GST Number
                        </p>

                        <p className="font-medium">
                            {company.gstNumber}
                        </p>

                    </div>

                </div>

                <div>

                    <p className="text-xs text-gray-500">
                        PAN Number
                    </p>

                    <p className="font-medium">
                        {company.panNumber}
                    </p>

                </div>

            </div>

        </div>
    );
}