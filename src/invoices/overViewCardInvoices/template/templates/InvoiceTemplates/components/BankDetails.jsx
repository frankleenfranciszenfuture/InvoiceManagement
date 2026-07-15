import React from "react";
import {
    Landmark,
    CreditCard,
    Hash,
    MapPin,
    Smartphone,
} from "lucide-react";

export default function BankDetails({ invoice }) {
    // Future: replace with invoice.company or organization settings
    const bank = invoice?.bankDetails || {
        accountHolder: "FH Technology",
        bankName: "State Bank of India",
        accountNumber: "XXXXXXXXXXXX1234",
        ifscCode: "SBIN0001234",
        branch: "Coimbatore Branch",
        upiId: "fhtechnology@sbi",
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    Bank Details
                </h3>
            </div>

            <div className="space-y-4 p-5">

                <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div>
                        <p className="text-xs text-gray-500">
                            Account Holder
                        </p>
                        <p className="font-medium">
                            {bank.accountHolder}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Landmark className="h-5 w-5 text-green-600" />
                    <div>
                        <p className="text-xs text-gray-500">
                            Bank Name
                        </p>
                        <p className="font-medium">
                            {bank.bankName}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Hash className="h-5 w-5 text-purple-600" />
                    <div>
                        <p className="text-xs text-gray-500">
                            Account Number
                        </p>
                        <p className="font-medium">
                            {bank.accountNumber}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Hash className="h-5 w-5 text-orange-600" />
                    <div>
                        <p className="text-xs text-gray-500">
                            IFSC Code
                        </p>
                        <p className="font-medium">
                            {bank.ifscCode}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <div>
                        <p className="text-xs text-gray-500">
                            Branch
                        </p>
                        <p className="font-medium">
                            {bank.branch}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-indigo-600" />
                    <div>
                        <p className="text-xs text-gray-500">
                            UPI ID
                        </p>
                        <p className="font-medium">
                            {bank.upiId}
                        </p>
                    </div>
                </div>

                {/* Optional QR Code */}
                <div className="pt-4 border-t border-gray-200 flex justify-center">
                    <div className="flex h-32 w-32 items-center justify-center rounded border-2 border-dashed border-gray-300 text-center text-xs text-gray-400">
                        QR Code
                    </div>
                </div>

            </div>
        </div>
    );
}