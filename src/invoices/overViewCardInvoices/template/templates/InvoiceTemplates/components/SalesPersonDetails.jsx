import React from "react";
import {
    UserCheck,
    Mail,
    Phone,
    BadgeCheck,
} from "lucide-react";

import useSelectedInvoice from "../../../templates/InvoiceTemplates/hooks/useSelectedInvoice";

export default function SalesPersonDetails() {

    const invoice = useSelectedInvoice();

    const salesPerson = invoice?.salesPerson;

    return (
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">

            <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-gray-800">
                <UserCheck size={20} />
                Sales Person
            </h3>

            {!salesPerson ? (
                <div className="rounded-md bg-gray-50 p-4 text-gray-500">
                    No sales person assigned.
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-6">

                    <div>
                        <label className="text-xs text-gray-500">
                            Name
                        </label>

                        <div className="mt-2 flex items-center gap-2 font-medium">
                            <BadgeCheck
                                size={16}
                                className="text-blue-600"
                            />

                            {salesPerson.salesPersonName || "-"}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">
                            Email
                        </label>

                        <div className="mt-2 flex items-center gap-2">
                            <Mail
                                size={16}
                                className="text-gray-500"
                            />

                            {salesPerson.email || "-"}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">
                            Phone
                        </label>

                        <div className="mt-2 flex items-center gap-2">
                            <Phone
                                size={16}
                                className="text-gray-500"
                            />

                            {salesPerson.phone || "-"}
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}