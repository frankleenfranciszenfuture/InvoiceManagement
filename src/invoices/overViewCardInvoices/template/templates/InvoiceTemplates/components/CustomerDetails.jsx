import React from "react";

export default function CustomerDetails({ invoice }) {
    const customer = invoice?.customer;
    const billing = customer?.billingAddress;
    const shipping = customer?.shippingAddress;

    return (
        <div className="space-y-6">
            {/* Bill To */}
            <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Bill To
                </h3>

                <div className="space-y-1 text-sm">
                    <p className="font-semibold text-gray-900">
                        {customer?.displayName || "-"}
                    </p>

                    {customer?.companyName && (
                        <p>{customer.companyName}</p>
                    )}

                    <p>{customer?.email || "-"}</p>

                    <p>{customer?.mobile || "-"}</p>

                    <div className="pt-2 text-gray-600">
                        <p>{billing?.attention}</p>
                        <p>{billing?.address}</p>

                        <p>
                            {billing?.city}
                            {billing?.city && billing?.state ? ", " : ""}
                            {billing?.state}
                        </p>

                        <p>
                            {billing?.country}
                            {billing?.country && billing?.zipCode ? " - " : ""}
                            {billing?.zipCode}
                        </p>
                    </div>
                </div>
            </div>

            {/* Ship To */}
            <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Ship To
                </h3>

                <div className="space-y-1 text-sm text-gray-600">
                    <p>{shipping?.attention}</p>

                    <p>{shipping?.address}</p>

                    <p>
                        {shipping?.city}
                        {shipping?.city && shipping?.state ? ", " : ""}
                        {shipping?.state}
                    </p>

                    <p>
                        {shipping?.country}
                        {shipping?.country && shipping?.zipCode ? " - " : ""}
                        {shipping?.zipCode}
                    </p>

                    {shipping?.phone && (
                        <p>Phone : {shipping.phone}</p>
                    )}
                </div>
            </div>
        </div>
    );
}