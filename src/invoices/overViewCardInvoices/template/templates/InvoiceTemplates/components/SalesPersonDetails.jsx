import React from "react";
import { User, Mail, Phone } from "lucide-react";

export default function SalesPersonDetails({ invoice }) {
    const salesPerson = invoice?.salesPerson;

    if (!salesPerson) {
        return null;
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                Sales Person
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2">
                        <User className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Name
                        </p>

                        <p className="font-medium text-gray-900">
                            {salesPerson.salesPersonName || "-"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2">
                        <Mail className="h-5 w-5 text-green-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Email
                        </p>

                        <p className="font-medium text-gray-900">
                            {salesPerson.email || "-"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-100 p-2">
                        <Phone className="h-5 w-5 text-orange-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Phone
                        </p>

                        <p className="font-medium text-gray-900">
                            {salesPerson.phone || "-"}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}