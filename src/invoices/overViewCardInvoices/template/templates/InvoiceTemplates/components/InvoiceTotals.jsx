import React from "react";
import useSelectedInvoice from "../../../templates/InvoiceTemplates/hooks/useSelectedInvoice";
import { formatCurrency } from "../../../../../utils/formatCurrency";

export default function InvoiceTotals() {

    const invoice = useSelectedInvoice();

    const currency = invoice?.currency || "INR";

    const subTotal = Number(invoice?.subTotal || 0);
    const discount = Number(invoice?.discountAmount || 0);
    const tax = Number(invoice?.taxAmount || 0);
    const shipping = Number(invoice?.shippingCharges || 0);
    const adjustment = Number(invoice?.adjustment || 0);
    const total = Number(invoice?.totalAmount || 0);
    const paid = Number(invoice?.paidAmount || 0);
    const balance = total - paid;

    const Row = ({ label, value, bold = false }) => (
        <div className="flex items-center justify-between py-2">
            <span
                className={`${bold
                    ? "font-semibold text-gray-900"
                    : "text-gray-600"
                    }`}
            >
                {label}
            </span>

            <span
                className={`${bold
                    ? "font-semibold text-gray-900"
                    : "text-gray-700"
                    }`}
            >
                {formatCurrency(value, currency)}
            </span>
        </div>
    );

    return (
        <div className="mt-8 ml-auto w-[420px] rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b bg-gray-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Invoice Summary
                </h2>
            </div>

            <div className="space-y-1 px-6 py-5">

                <Row
                    label="Sub Total"
                    value={subTotal}
                />

                <Row
                    label="Discount"
                    value={discount}
                />

                <Row
                    label="Tax"
                    value={tax}
                />

                <Row
                    label="Shipping Charges"
                    value={shipping}
                />

                <Row
                    label="Adjustment"
                    value={adjustment}
                />

                <hr className="my-3" />

                <Row
                    label="Grand Total"
                    value={total}
                    bold
                />

                <hr className="my-3" />

                <Row
                    label="Paid Amount"
                    value={paid}
                />

                <Row
                    label="Balance Due"
                    value={balance}
                    bold
                />

            </div>
        </div>
    );
}