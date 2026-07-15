import React from "react";

export default function InvoiceTotals({ invoice }) {
    const currencyCode = invoice?.currency || "INR";

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(amount || 0));

    return (
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    Invoice Summary
                </h3>
            </div>

            <div className="space-y-3 px-6 py-5">

                <div className="flex justify-between">
                    <span className="text-gray-600">Sub Total</span>
                    <span className="font-medium">
                        {formatCurrency(invoice?.subTotal)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium">
                        {formatCurrency(invoice?.discountAmount)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                        {formatCurrency(invoice?.taxAmount)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Charges</span>
                    <span className="font-medium">
                        {formatCurrency(invoice?.shippingCharges)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Adjustment</span>
                    <span className="font-medium">
                        {formatCurrency(invoice?.adjustment)}
                    </span>
                </div>

                <hr className="border-gray-300" />

                <div className="flex justify-between text-xl font-bold text-blue-700">
                    <span>Total</span>
                    <span>{formatCurrency(invoice?.totalAmount)}</span>
                </div>

            </div>
        </div>
    );
}