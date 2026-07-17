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


const ACTIONS = [
    { label: "Mark Sent", status: "SENT", show: ["SAVED", "DRAFT"] },
    { label: "Mark Paid", status: "PAID", show: ["SENT", "SAVED", "DRAFT"] },
    { label: "Cancel", status: "CANCELLED", show: ["DRAFT", "SAVED", "SENT"] },
];


function StackLogo() {
    return (
        <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="20" width="24" height="4" rx="2" fill="white" />
                <rect
                    x="4"
                    y="14"
                    width="24"
                    height="4"
                    rx="2"
                    fill="white"
                    opacity="0.7"
                />
                <rect
                    x="4"
                    y="8"
                    width="24"
                    height="4"
                    rx="2"
                    fill="white"
                    opacity="0.4"
                />
            </svg>
        </div>
    );
}


function Editable({ value, onChange, className = "", tag: Tag = "span" }) {
    return (
        <Tag
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onChange(e.currentTarget.textContent)}
            className={`outline-none focus:bg-gray-100 rounded px-0.5 cursor-text ${className}`}
        >
            {value}
        </Tag>
    );
}



export default function InvoiceTemplate2({ invoice: invoiceProp }) {


    const invoiceFromStore = useSelector(
        (state) => state.invoice.selectedInvoice,
    );

    const invoice = invoiceProp ?? invoiceFromStore;

    if (!invoice) return <h1>Invoice not found</h1>;

    const dispatch = useDispatch();

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
        <div className="px-9 pt-10 pb-6 border border-gray-200">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-5xl font-black tracking-tight text-black leading-none">
                        INVOICE
                    </h1>
                    <span className="p-1 text-xl font-sm text-gray-900">
                        {" "}
                        {invoice.invoiceNumber}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        {/* <StatusBadge invoice={invoice} /> */}
                        <Editable
                            value={invoice.customerName}
                            onChange={(v) => update(["company"], v)}
                            className="font-bold text-sm block text-black"
                        />
                        <Editable
                            value={invoice.invoiceNumber}
                            onChange={(v) => update(["tagline"], v)}
                            className="text-xs text-gray-500 block"
                        />
                    </div>
                    <StackLogo />
                </div>
            </div>
            {/* Divider */}
            <div className="border-t border-gray-300 mt-6 mb-4" />

            {/* ── Bill To + Total Due ── */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="px-1 py-2">
                    {/* <p className="text-gray-500">Customer</p>
          <p className="font-medium text-gray-900">{invoice.customerName}</p>
          {invoice.customerGstin && (
            <p className="text-xs text-gray-400">
              GSTIN: {invoice.customerGstin}
            </p>
          )} */}

                    <p className="px-1 text-xs font-bold text-black mb-1">INVOICE TO :</p>
                    <Editable
                        value={invoice.customer?.displayName || ""}
                        onChange={(v) => update(["invoiceTo", "name"], v)}
                        tag="h1"
                        className="px-1 text-xl font-bold text-black block mb-2"
                    />

                    <p className="px-1 text-xs text-gray-600 leading-5">
                        P:{" "}
                        <Editable
                            value={invoice?.invoiceTo?.phone || ""}
                            onChange={(v) => update(["invoiceTo", "phone"], v)}
                        />
                    </p>
                    <p className="px-1 text-xs text-gray-600 leading-5">
                        E :{" "}
                        <Editable
                            value={invoice.invoiceTo?.email || ""}
                            onChange={(v) => update(["invoiceTo", "email"], v)}
                        />
                    </p>
                    <p className="px-1 text-xs text-gray-600 leading-5">
                        A :{" "}
                        <Editable
                            value={invoice.invoiceTo?.address || ""}
                            onChange={(v) => update(["invoiceTo", "address"], v)}
                        />
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-gray-500">Date / Due</p>
                    <p className="font-medium">{fmt.date(invoice.invoiceDate)}</p>
                    <p className="text-xs text-gray-400">
                        {invoice.dueDate
                            ? `Due: ${fmt.date(invoice.dueDate)}`
                            : "No due date"}
                    </p>
                </div>
            </div>
            {/* Items table */}

            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-blue-600 text-white border-b border-gray-100 text-xs text-gray-500 uppercase">
                        <th className="text-left font-bold px-3 py-3 text-xs tracking-wide">
                            Product
                        </th>
                        <th className="text-center font-bold px-3 py-3 text-xs tracking-wide">
                            Qty
                        </th>
                        <th className="text-center font-bold px-3 py-3 text-xs tracking-wide">
                            Price
                        </th>
                        <th className="text-center font-bold px-3 py-3 text-xs tracking-wide">
                            Tax
                            <span>(%{invoice.tax})</span>
                        </th>
                        <th className="text-center font-bold px-3 py-2 text-xs tracking-wide">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((it, index) => (
                            <tr key={it.id ?? index}>
                                <td className="px-3 py-3 border-b border-gray-200">
                                    {it.itemName}
                                </td>

                                <td className="px-3 py-3 border-b border-gray-200 text-center">
                                    {it.quantity}
                                </td>

                                <td className="px-3 py-3 border-b border-gray-200 text-center">
                                    {fmt.currency(it.unitPrice)}
                                </td>

                                <td className="px-3 py-3 border-b border-gray-200 text-center">
                                    {it.taxPercent}%
                                </td>

                                <td className="px-3 py-3 border-b border-gray-200 text-center">
                                    {fmt.currency(it.totalAmount)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-3 py-10 text-center text-sm text-gray-500"
                            >
                                No records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-10  border-b border-gray-400 text-gray-700 ">
                {/* ── Payment + Totals ── */}
                <div className=" flex justify-between items-end gap-6 mb-5">
                    {/* Payment Method */}
                    <div>
                        <h3 className="font-black text-base text-black mb-2">
                            Payment Method :
                        </h3>
                        <p className="text-xs text-gray-600 leading-5">
                            Bank Name:{" "}
                            <Editable
                                value={invoice?.bank?.name || ""}
                                onChange={(v) =>
                                    dispatch(
                                        updateBank({
                                            field: "name",
                                            value: v,
                                        }),
                                    )
                                }
                            />
                        </p>

                        <p className="text-xs text-gray-600 leading-5">
                            Bank Account:{" "}
                            <Editable
                                value={invoice?.bank?.account || ""}
                                onChange={(v) =>
                                    dispatch(
                                        updateBank({
                                            field: "account",
                                            value: v,
                                        }),
                                    )
                                }
                            />
                        </p>
                    </div>
                    {/* Totals */}
                    <div className="min-w-[200px]">
                        <div className="flex justify-between text-sm  text-gray-600">
                            <span>Sub-total :</span>
                            <span>{fmt.currency(subtotal)}</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Tax :</span>

                            <Editable
                                value={String(invoice.tax || 0)}
                                onChange={(v) =>
                                    dispatch(
                                        updateTax({
                                            value: Number(v) || 0,
                                        }),
                                    )
                                }
                            />
                        </div>

                        <div className="border-t-2 border-black  pt-2 flex justify-between font-black text-base text-black">
                            <span>Total :</span>
                            <span>{fmt.currency(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* ── Footer ── */}
            <div className="pt-10 pb-6 flex justify-between items-end border-t border-gray-200">
                <h2 className="text-xl font-black text-black">
                    Thank you for purchase!
                </h2>

                <div className="text-center">
                    <Editable
                        value={invoice.administrator}
                        onChange={(v) => update(["administrator"], v)}
                        className="font-bold text-sm block text-black mb-1"
                    />
                    <div className="border-t border-black w-36" />
                    <p className="text-xs text-gray-500 mt-1">Administrator</p>
                </div>
            </div>
        </div>
    );
}
