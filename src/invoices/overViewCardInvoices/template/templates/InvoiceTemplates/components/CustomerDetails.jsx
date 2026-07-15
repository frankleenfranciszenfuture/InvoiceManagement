import React from "react";
import {
    User,
    Building2,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

import useSelectedInvoice from "../../../templates/InvoiceTemplates/hooks/useSelectedInvoice";

export default function CustomerDetails() {

    const invoice = useSelectedInvoice();

    const customer = invoice?.customer;
    const billing = customer?.billingAddress;

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6">

            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                <User size={20} />
                Bill To
            </h3>

            <div className="space-y-3">

                <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                        {customer?.displayName || "-"}
                    </h4>

                    {customer?.companyName && (
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                            <Building2 size={15} />
                            {customer.companyName}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={15} />
                    {customer?.email || "-"}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={15} />
                    {customer?.mobileCode} {customer?.mobile}
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin size={15} className="mt-1" />

                    <div>
                        <div>{billing?.attention}</div>

                        <div>{billing?.address}</div>

                        <div>
                            {billing?.city}, {billing?.state}
                        </div>

                        <div>
                            {billing?.country} - {billing?.zipCode}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}