import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { loadInvoices } from '../../../../slices/invoices/thunks/invoiceThunks';
import {
    setSelectedInvoice,
    addItem,
    changeInvoiceStatus,
    updateBank,
    updateTax,
} from "../../../../slices/invoices/invoiceSlice";

import { closeModal } from "../../../../slices/Ui/uiSlice";
import StatusBadge from "../../../overViewCardInvoices/components/StatusBadge";
import { fmt } from "../../../overViewCardInvoices/components/helper";
import toast from "react-hot-toast";
import Editable from './InvoiceTemplates/template2/components/Editable';
import { formatCurrency } from '../../../utils/formatCurrency';

export default function InvoiceTemplate3({ invoice: invoiceProp }) {

    const dispatch = useDispatch();

    const { invoices } = useSelector((state) => state.invoice);

    const invoiceFromStore = useSelector(
        (state) => state.invoice.selectedInvoice,
    );

    const invoice = invoiceProp ?? invoiceFromStore;

    if (!invoice) return <h1>Invoice not found</h1>;

    // ✅ Add this helper
    const update = (path, value) => {
        dispatch(
            setSelectedInvoice({
                ...invoice,
                [path[0]]: value,
            }),
        );
    };



    const items = invoice.items ?? [];

    //fmt
    const fmt = (n) => parseFloat(n || 0).toFixed(2);

    const { subtotal, tax } = items.reduce(
        (acc, item) => {
            const rowTotal =
                (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);

            acc.subtotal += rowTotal;
            acc.tax += (rowTotal * (Number(item.taxPercent) || 0)) / 100;

            return acc;
        },
        { subtotal: 0, tax: 0 },
    );

    const total = subtotal + tax;

    const totalDue = (invoice.items || []).reduce((sum, item) => {
        const rowTotal =
            (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);

        const rowTax = (rowTotal * (Number(item.taxPercent) || 0)) / 100;

        return sum + rowTotal + rowTax;
    }, 0);

    const handle = async (status) => {
        try {
            await dispatch(
                changeInvoiceStatus({
                    id: invoice.id,
                    status,
                }),
            );
            dispatch(loadDashboardStats());
            dispatch(closeModal());
            toast.success(`Invoice ${status.toLowerCase()}`);
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="mx-auto w-[210mm] min-h-[297mm] bg-white border border-black text-[13px] text-gray-900">

                {/* Header */}
                <div className="border-b border-black">

                    <div className="flex justify-between items-center border-b border-black px-4 py-2">
                        <h1 className="w-full text-center text-xl font-bold tracking-[4px] text-blue-700">
                            TAX INVOICE
                        </h1>

                        {/* <span className="absolute right-8 text-xs tracking-widest">
                            ORIGINAL FOR RECIPIENT
                        </span> */}
                    </div>

                    <div className="grid grid-cols-2">

                        {/* Company */}

                        <div className="border-r border-black p-4">

                            <div className="flex gap-4">

                                <img
                                    src="/logo.png"
                                    className="w-28 h-28 object-contain"
                                />

                                <div>
                                    <h2 className="font-bold text-xl">
                                        COMPANY NAME
                                    </h2>

                                    <p>GSTIN : 27XXXXX</p>

                                    <p>Address Line 1</p>

                                    <p>Address Line 2</p>

                                    <p>Mobile : 9999999999</p>

                                    <p>Email : info@company.com</p>
                                </div>

                            </div>

                        </div>

                        {/* Invoice Details */}

                        <div>

                            <div className="grid grid-cols-2">

                                <div className="border-b border-r border-black p-3">
                                    <p className="font-semibold">Invoice #</p>
                                    <p> {" "}
                                        {invoice.invoiceNumber}</p>
                                </div>

                                <div className="border-b border-black p-3">
                                    <p className="font-semibold">
                                        Invoice Date
                                    </p>
                                    <p>17 Jun 2023</p>
                                </div>

                                <div className="border-r border-black p-3">
                                    <p className="font-semibold">
                                        Place of Supply
                                    </p>
                                    <p>Tamil Nadu</p>
                                </div>

                                <div className="p-3">
                                    <p className="font-semibold">
                                        Due Date
                                    </p>
                                    <p>17 Jun 2023</p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Customer Section */}

                <div className="grid grid-cols-2 border-b border-black">

                    <div className="border-r border-black p-3">
                        <h3 className="font-bold mb-2">
                            Customer Details
                            Billing Address Address
                        </h3>

                        <p className="font-semibold">
                            {invoice.customer?.displayName || ""}
                        </p>

                        <p>{invoice.customer?.billingAddress?.address}</p>
                        <p>{invoice.customer?.billingAddress?.city}</p>

                        <p>Phone : {invoice.customer?.billingAddress?.phone}</p>
                    </div>

                    <div className="p-3">
                        <h3 className="font-bold mb-2">
                            Shipping Address
                        </h3>

                        <p>{invoice.customer?.shippingAddress?.address}</p>

                        <p>{invoice.customer?.shippingAddress?.city}</p>

                        <p>{invoice.customer?.shippingAddress?.state}</p>
                        <p>Phone : {invoice.customer?.shippingAddress?.phone}</p>
                    </div>

                </div>

                {/* Items */}

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="border-b border-black bg-gray-50">

                            {[
                                "#",
                                "Item",
                                "HSN",
                                "Rate",
                                "Qty",
                                "Taxable",
                                "Tax",
                                "Amount",
                            ].map((h) => (
                                <th
                                    key={h}
                                    className="border-r border-black p-2 text-left font-semibold"
                                >
                                    {h}
                                </th>
                            ))}

                        </tr>

                    </thead>

                    <tbody>
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <tr key={item.id ?? index} className="border-b border-black">
                                    <td className="border-r border-black p-2">{index + 1}</td>

                                    <td className="border-r border-black p-2">
                                        {item.itemName}
                                    </td>

                                    <td className="border-r border-black p-2">
                                        {item.hsnCode ?? "-"}
                                    </td>

                                    <td className="border-r border-black p-2">
                                        {formatCurrency(item.rate, invoice.currency)}
                                    </td>

                                    <td className="border-r border-black p-2">
                                        {item.quantity}
                                    </td>

                                    <td className="border-r border-black p-2">
                                        {formatCurrency(
                                            (item.rate || 0) * (item.quantity || 0),
                                            invoice.currency
                                        )}
                                    </td>

                                    <td className="border-r border-black p-2">
                                        {item.taxAmount ?? 0}%
                                    </td>

                                    <td className="p-2">
                                        {formatCurrency(
                                            ((item.rate || 0) * (item.quantity || 0)) +
                                            (((item.rate || 0) * (item.quantity || 0) * (item.taxPercent || 0)) / 100),
                                            invoice.currency
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-3 py-10 text-center text-sm text-gray-500">
                                    No items found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

                {/* Totals */}

                <div className="border-t border-black">

                    <div className="flex">

                        <div className="w-1/2 border-r border-black p-3">
                            Total Items : 2
                        </div>

                        <div className="w-1/2">

                            <table className="w-full">

                                <tbody>

                                    <tr>
                                        <td className="p-2 font-semibold">
                                            Taxable Amount
                                        </td>

                                        <td className="p-2 text-right">
                                            ₹1000
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="p-2 font-semibold">
                                            GST
                                        </td>

                                        <td className="p-2 text-right">
                                            ₹180
                                        </td>
                                    </tr>

                                    <tr className="border-t border-black text-xl font-bold">
                                        <td className="p-2">
                                            Total
                                        </td>

                                        <td className="p-2 text-right">
                                            ₹1180
                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                {/* Tax Summary */}

                <div className="border-y border-black">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-black bg-gray-50">

                                <th className="border-r border-black p-2">
                                    HSN
                                </th>

                                <th className="border-r border-black p-2">
                                    Taxable
                                </th>

                                <th className="border-r border-black p-2">
                                    Rate
                                </th>

                                <th className="border-r border-black p-2">
                                    Tax
                                </th>

                                <th className="p-2">
                                    Total Tax
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td className="border-r border-black p-2">
                                    8703
                                </td>

                                <td className="border-r border-black p-2">
                                    ₹1000
                                </td>

                                <td className="border-r border-black p-2">
                                    18%
                                </td>

                                <td className="border-r border-black p-2">
                                    ₹180
                                </td>

                                <td className="p-2">
                                    ₹180
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

                {/* Bank */}

                <div className="grid grid-cols-3 border-b border-black">

                    <div className="border-r border-black p-4">

                        <h3 className="font-bold mb-3">
                            Bank Details
                        </h3>

                        <p>Bank : SBI</p>

                        <p>A/C : XXXXXXXX</p>

                        <p>IFSC : XXXXX</p>

                    </div>

                    <div className="border-r border-black p-4 flex flex-col items-center">

                        <h3 className="font-bold">
                            Pay Using UPI
                        </h3>

                        <div className="w-40 h-40 border mt-4"></div>

                    </div>

                    <div className="p-4 flex flex-col justify-between">

                        <p className="text-right">
                            For Company Name
                        </p>

                        <div className="h-32 flex items-center justify-center">
                            Signature
                        </div>

                        <p className="text-right">
                            Authorized Signatory
                        </p>

                    </div>

                </div>

                {/* Notes */}

                <div className="grid grid-cols-2">

                    <div className="border-r border-black p-4">

                        <h3 className="font-bold mb-2">
                            Notes
                        </h3>

                        <p>Thank you for your Business.</p>

                    </div>

                    <div className="p-4">

                        <h3 className="font-bold mb-2">
                            Terms & Conditions
                        </h3>

                        <ol className="list-decimal ml-5 space-y-1">
                            <li>Goods once sold cannot be returned.</li>
                            <li>Warranty as per manufacturer.</li>
                            <li>Interest applicable after due date.</li>
                            <li>Subject to jurisdiction.</li>
                        </ol>

                    </div>

                </div>

                {/* Footer */}

                <div className="border-t border-black p-3 flex justify-between text-xs">

                    <span>Page 1 / 1</span>

                    <span>This is a digitally signed document.</span>

                </div>

            </div>
        </div>
    );
}
