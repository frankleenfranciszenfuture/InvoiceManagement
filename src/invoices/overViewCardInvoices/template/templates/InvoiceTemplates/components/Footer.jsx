import React from "react";
import {
    Mail,
    Phone,
    Globe,
    PenSquare,
} from "lucide-react";

export default function Footer({ invoice }) {

    // Replace later with Company Settings API
    const company = invoice?.company || {
        companyName: "FH Technology",
        email: "info@fhtechnology.com",
        phone: "+91 9876543210",
        website: "www.fhtechnology.com",
    };

    return (
        <div className="mt-10 border-t border-gray-200 bg-gray-50">

            {/* Thank You */}
            <div className="px-8 pt-8 text-center">
                <h2 className="text-xl font-semibold text-blue-700">
                    Thank You!
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                    Thank you for choosing us. We truly appreciate your business
                    and look forward to serving you again.
                </p>
            </div>

            {/* Signature */}
            <div className="mt-10 flex justify-end px-8">
                <div className="w-64 text-center">

                    <div className="flex justify-center">
                        <PenSquare
                            size={42}
                            className="text-gray-400"
                        />
                    </div>

                    <div className="mt-8 border-t border-gray-400 pt-2">
                        <p className="font-semibold text-gray-800">
                            Authorized Signature
                        </p>

                        <p className="text-sm text-gray-500">
                            {company.companyName}
                        </p>
                    </div>

                </div>
            </div>

            {/* Footer Contact */}
            <div className="mt-10 border-t border-gray-200 px-8 py-5">

                <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">

                    <div className="flex items-center gap-2">
                        <Mail size={16} />
                        <span>{company.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <span>{company.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Globe size={16} />
                        <span>{company.website}</span>
                    </div>

                </div>

                <div className="mt-4 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} {company.companyName}. All Rights Reserved.
                </div>

            </div>

        </div>
    );
}