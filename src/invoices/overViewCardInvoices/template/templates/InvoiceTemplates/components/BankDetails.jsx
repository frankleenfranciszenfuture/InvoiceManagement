import React from "react";
import {
    Landmark,
    CreditCard,
    Hash,
    Building2,
    QrCode,
} from "lucide-react";

import useSelectedInvoice from "../../../templates/InvoiceTemplates/hooks/useSelectedInvoice";


export default function BankDetails() {

    useSelectedInvoice(); // Reserved for future Company Settings integration

    // Replace with Company Settings API later
    const bank = {
        accountName: "FH Technology",
        bankName: "State Bank of India",
        accountNumber: "1234567890123456",
        ifsc: "SBIN0001234",
        branch: "Coimbatore",
        upiId: "payments@fhtech",
    };

    const Row = ({ icon: Icon, label, value }) => (
        <div className="flex items-start gap-3">

            <div className="rounded-lg bg-blue-50 p-2">
                <Icon
                    size={18}
                    className="text-blue-600"
                />
            </div>

            <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                    {label}
                </p>

                <p className="mt-1 font-medium text-gray-800">
                    {value}
                </p>
            </div>

        </div>
    );

    return (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b bg-gray-50 px-6 py-4">

                <h2 className="text-lg font-semibold text-gray-800">
                    Bank Details
                </h2>

            </div>

            <div className="grid grid-cols-2 gap-8 p-6">

                <Row
                    icon={Building2}
                    label="Account Name"
                    value={bank.accountName}
                />

                <Row
                    icon={Landmark}
                    label="Bank Name"
                    value={bank.bankName}
                />

                <Row
                    icon={CreditCard}
                    label="Account Number"
                    value={bank.accountNumber}
                />

                <Row
                    icon={Hash}
                    label="IFSC Code"
                    value={bank.ifsc}
                />

                <Row
                    icon={Building2}
                    label="Branch"
                    value={bank.branch}
                />

                <div className="flex items-start gap-3">

                    <div className="rounded-lg bg-green-50 p-2">
                        <QrCode
                            size={18}
                            className="text-green-600"
                        />
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                            UPI ID
                        </p>

                        <p className="mt-1 font-medium text-gray-800">
                            {bank.upiId}
                        </p>

                        <div className="mt-3 flex h-24 w-24 items-center justify-center rounded-lg border bg-gray-50 text-xs text-gray-400">
                            QR
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}