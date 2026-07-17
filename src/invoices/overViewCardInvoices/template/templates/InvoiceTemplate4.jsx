import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/formatCurrency";

export default function InvoiceTemplate4({ invoice: invoiceProp }) {
    const invoiceFromStore = useSelector(
        (state) => state.invoice.selectedInvoice
    );

    const invoice = invoiceProp ?? invoiceFromStore;

    if (!invoice) return <h1>Invoice not found</h1>;

    // ---------------------------
    // Customer
    // ---------------------------

    const customer = invoice.customer ?? {};

    const billing = customer.billingAddress ?? {};
    const shipping = customer.shippingAddress ?? {};

    // ---------------------------
    // Items
    // ---------------------------

    const items =
        invoice.items ??
        invoice.invoiceItems ??
        [];

    // ---------------------------
    // Totals
    // ---------------------------

    const totals = useMemo(() => {
        let taxable = 0;
        let itemTax = 0;

        items.forEach((item) => {
            const qty = Number(item.quantity || 0);
            const rate = Number(item.rate || item.sellingPrice || 0);
            const discount = Number(item.discount || 0);
            const taxPercent = Number(item.taxPercent || 0);

            const rowTaxable = qty * rate - discount;
            const rowTax = rowTaxable * taxPercent / 100;

            taxable += rowTaxable;
            itemTax += rowTax;
        });

        return {
            taxable,
            itemTax,
        };
    }, [items]);

    // ---------------------------
    // Tax Summary
    // ---------------------------

    const taxSummary = useMemo(() => {
        const map = {};

        items.forEach((item) => {
            const hsn = item.hsnCode ?? "-";

            const qty = Number(item.quantity || 0);
            const rate = Number(item.rate || item.sellingPrice || 0);
            const discount = Number(item.discount || 0);

            const taxable = qty * rate - discount;

            const taxPercent = Number(item.taxPercent || 0);

            const tax = taxable * taxPercent / 100;

            if (!map[hsn]) {
                map[hsn] = {
                    hsn,
                    taxable: 0,
                    rate: taxPercent,
                    tax: 0,
                };
            }

            map[hsn].taxable += taxable;
            map[hsn].tax += tax;
        });

        return Object.values(map);
    }, [items]);

    return (
        <div className="bg-gray-100 py-8">
            <div className="mx-auto w-[210mm] min-h-[297mm] bg-white border border-black text-[13px]">

                {/* ================= HEADER ================= */}

                <div className="border-b border-black">

                    <div className="border-b border-black py-3">
                        <h1 className="text-center text-2xl font-bold tracking-[4px] text-blue-700">
                            TAX INVOICE
                        </h1>
                    </div>

                    <div className="grid grid-cols-2">

                        {/* Company */}

                        <div className="border-r border-black p-4">

                            <div className="flex gap-4">

                                <img
                                    src="/logo.png"
                                    alt=""
                                    className="w-28 h-28 object-contain"
                                />

                                <div>

                                    <h2 className="text-xl font-bold">
                                        COMPANY NAME
                                    </h2>

                                    <p>GSTIN : 27XXXXX</p>

                                    <p>Address Line 1</p>

                                    <p>Address Line 2</p>

                                    <p>Phone : 9999999999</p>

                                    <p>Email : info@company.com</p>

                                </div>

                            </div>

                        </div>

                        {/* Invoice */}

                        <div>

                            <div className="grid grid-cols-2">

                                <div className="border-b border-r border-black p-3">
                                    <p className="font-semibold">
                                        Invoice Number
                                    </p>

                                    <p>{invoice.invoiceNumber}</p>
                                </div>

                                <div className="border-b border-black p-3">
                                    <p className="font-semibold">
                                        Invoice Date
                                    </p>

                                    <p>{invoice.invoiceDate}</p>
                                </div>

                                <div className="border-r border-black p-3">
                                    <p className="font-semibold">
                                        Due Date
                                    </p>

                                    <p>{invoice.dueDate}</p>
                                </div>

                                <div className="p-3">
                                    <p className="font-semibold">
                                        Currency
                                    </p>

                                    <p>{invoice.currency}</p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================= CUSTOMER ================= */}

                <div className="grid grid-cols-2 border-b border-black">

                    {/* Billing */}

                    <div className="border-r border-black p-4">

                        <h3 className="font-bold mb-2">
                            Billing Address
                        </h3>

                        <p className="font-semibold">
                            {customer.displayName}
                        </p>

                        <p>{billing.address}</p>

                        <p>{billing.city}</p>

                        <p>{billing.state}</p>

                        <p>{billing.country}</p>

                        <p>{billing.zipCode}</p>

                        <p>{billing.phone}</p>

                    </div>

                    {/* Shipping */}

                    <div className="p-4">

                        <h3 className="font-bold mb-2">
                            Shipping Address
                        </h3>

                        <p>{shipping.address}</p>

                        <p>{shipping.city}</p>

                        <p>{shipping.state}</p>

                        <p>{shipping.country}</p>

                        <p>{shipping.zipCode}</p>

                        <p>{shipping.phone}</p>

                    </div>

                </div>


                {/* ================= ITEMS ================= */}

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-gray-100 border-b border-black">

                            <th className="border-r border-black p-2">#</th>
                            <th className="border-r border-black p-2 text-left">
                                Item
                            </th>
                            <th className="border-r border-black p-2">
                                HSN
                            </th>
                            <th className="border-r border-black p-2">
                                Rate
                            </th>
                            <th className="border-r border-black p-2">
                                Qty
                            </th>
                            <th className="border-r border-black p-2">
                                Discount
                            </th>
                            <th className="border-r border-black p-2">
                                Tax %
                            </th>
                            <th className="border-r border-black p-2">
                                Taxable
                            </th>
                            <th className="p-2">
                                Amount
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {items.length > 0 ? (

                            items.map((item, index) => {

                                const qty = Number(item.quantity || 0);
                                const rate = Number(item.rate || item.sellingPrice || 0);
                                const discount = Number(item.discount || 0);
                                const taxPercent = Number(item.taxPercent || 0);

                                const taxable = qty * rate - discount;
                                const tax = taxable * taxPercent / 100;
                                const total = taxable + tax;

                                return (

                                    <tr
                                        key={item.id ?? index}
                                        className="border-b border-black"
                                    >

                                        <td className="border-r border-black p-2 text-center">
                                            {index + 1}
                                        </td>

                                        <td className="border-r border-black p-2">
                                            <div className="font-medium">
                                                {item.itemName}
                                            </div>

                                            {item.description && (
                                                <div className="text-xs text-gray-500">
                                                    {item.description}
                                                </div>
                                            )}
                                        </td>

                                        <td className="border-r border-black p-2 text-center">
                                            {item.hsnCode ?? "-"}
                                        </td>

                                        <td className="border-r border-black p-2 text-right">
                                            {formatCurrency(rate, invoice.currency)}
                                        </td>

                                        <td className="border-r border-black p-2 text-center">
                                            {qty}
                                        </td>

                                        <td className="border-r border-black p-2 text-right">
                                            {formatCurrency(discount, invoice.currency)}
                                        </td>

                                        <td className="border-r border-black p-2 text-center">
                                            {taxPercent}%
                                        </td>

                                        <td className="border-r border-black p-2 text-right">
                                            {formatCurrency(taxable, invoice.currency)}
                                        </td>

                                        <td className="text-right p-2">
                                            {formatCurrency(total, invoice.currency)}
                                        </td>

                                    </tr>

                                );

                            })

                        ) : (

                            <tr>

                                <td
                                    colSpan={9}
                                    className="text-center py-10 text-gray-500"
                                >
                                    No Items Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

                {/* ================= TOTALS ================= */}

                <div className="border-t border-black">

                    <div className="flex">

                        <div className="w-1/2 border-r border-black p-4">

                            <p>
                                <strong>Total Items :</strong> {items.length}
                            </p>

                            <p className="mt-2">
                                <strong>Sales Person :</strong>{" "}
                                {invoice.salesPerson?.salesPersonName || "-"}
                            </p>

                        </div>

                        <div className="w-1/2">

                            <table className="w-full">

                                <tbody>

                                    <tr>

                                        <td className="p-2 font-semibold">
                                            Sub Total
                                        </td>

                                        <td className="p-2 text-right">
                                            {formatCurrency(
                                                invoice.subTotal ?? totals.taxable,
                                                invoice.currency
                                            )}
                                        </td>

                                    </tr>

                                    <tr>

                                        <td className="p-2 font-semibold">
                                            Discount
                                        </td>

                                        <td className="p-2 text-right">
                                            {formatCurrency(
                                                invoice.discountAmount ?? 0,
                                                invoice.currency
                                            )}
                                        </td>

                                    </tr>

                                    <tr>

                                        <td className="p-2 font-semibold">
                                            {invoice.taxNameSnapshot || "Tax"}
                                            {" "}
                                            ({invoice.taxRateSnapshot ?? 0}%)
                                        </td>

                                        <td className="p-2 text-right">
                                            {formatCurrency(
                                                invoice.taxAmount ?? totals.itemTax,
                                                invoice.currency
                                            )}
                                        </td>

                                    </tr>

                                    <tr>

                                        <td className="p-2 font-semibold">
                                            Shipping
                                        </td>

                                        <td className="p-2 text-right">
                                            {formatCurrency(
                                                invoice.shippingCharges ?? 0,
                                                invoice.currency
                                            )}
                                        </td>

                                    </tr>

                                    <tr>

                                        <td className="p-2 font-semibold">
                                            Adjustment
                                        </td>

                                        <td className="p-2 text-right">
                                            {formatCurrency(
                                                invoice.adjustment ?? 0,
                                                invoice.currency
                                            )}
                                        </td>

                                    </tr>

                                    <tr className="border-t border-black text-lg font-bold">

                                        <td className="p-2">
                                            Grand Total
                                        </td>

                                        <td className="p-2 text-right">
                                            {formatCurrency(
                                                invoice.totalAmount,
                                                invoice.currency
                                            )}
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                {/* ================= TAX SUMMARY ================= */}

                <div className="border-y border-black">

                    <table className="w-full">

                        <thead>

                            <tr className="bg-gray-100 border-b border-black">

                                <th className="border-r border-black p-2">
                                    HSN
                                </th>

                                <th className="border-r border-black p-2">
                                    Taxable Value
                                </th>

                                <th className="border-r border-black p-2">
                                    Rate
                                </th>

                                <th className="border-r border-black p-2">
                                    Tax Amount
                                </th>

                                <th className="p-2">
                                    Total
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {taxSummary.map((row) => (

                                <tr
                                    key={row.hsn}
                                    className="border-b border-black"
                                >

                                    <td className="border-r border-black p-2">
                                        {row.hsn}
                                    </td>

                                    <td className="border-r border-black p-2 text-right">
                                        {formatCurrency(
                                            row.taxable,
                                            invoice.currency
                                        )}
                                    </td>

                                    <td className="border-r border-black p-2 text-center">
                                        {row.rate}%
                                    </td>

                                    <td className="border-r border-black p-2 text-right">
                                        {formatCurrency(
                                            row.tax,
                                            invoice.currency
                                        )}
                                    </td>

                                    <td className="text-right p-2">
                                        {formatCurrency(
                                            row.taxable + row.tax,
                                            invoice.currency
                                        )}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* ================= BANK DETAILS ================= */}

                <div className="grid grid-cols-3 border-b border-black">

                    {/* Bank */}

                    <div className="border-r border-black p-4">

                        <h3 className="font-bold mb-3">
                            Bank Details
                        </h3>

                        <table className="w-full text-sm">

                            <tbody>

                                <tr>
                                    <td className="py-1 font-medium">
                                        Bank
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        {invoice.bank?.bankName || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="py-1 font-medium">
                                        Account No
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        {invoice.bank?.accountNumber || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="py-1 font-medium">
                                        IFSC
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        {invoice.bank?.ifscCode || "-"}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="py-1 font-medium">
                                        Branch
                                    </td>
                                    <td>
                                        :
                                    </td>
                                    <td>
                                        {invoice.bank?.branchName || "-"}
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                    {/* QR */}

                    <div className="border-r border-black flex flex-col items-center justify-center p-4">

                        <h3 className="font-semibold mb-3">
                            Scan To Pay
                        </h3>

                        {invoice.qrCode ? (
                            <img
                                src={invoice.qrCode}
                                alt="QR Code"
                                className="w-36 h-36 object-contain"
                            />
                        ) : (
                            <div className="w-36 h-36 border flex items-center justify-center text-gray-400">
                                QR Code
                            </div>
                        )}

                    </div>

                    {/* Signature */}

                    <div className="flex flex-col justify-between p-4">

                        <div className="text-right font-semibold">
                            For COMPANY NAME
                        </div>

                        <div className="flex justify-end items-center h-24">

                            {invoice.signature ? (

                                <img
                                    src={invoice.signature}
                                    alt="Signature"
                                    className="h-20 object-contain"
                                />

                            ) : (

                                <div className="h-16"></div>

                            )}

                        </div>

                        <div className="text-right font-semibold">
                            Authorized Signatory
                        </div>

                    </div>

                </div>

                {/* ================= NOTES ================= */}

                <div className="grid grid-cols-2 border-b border-black">

                    <div className="border-r border-black p-4">

                        <h3 className="font-bold mb-2">
                            Customer Notes
                        </h3>

                        <p className="whitespace-pre-line text-sm">
                            {invoice.customerNotes || "-"}
                        </p>

                    </div>

                    <div className="p-4">

                        <h3 className="font-bold mb-2">
                            Terms & Conditions
                        </h3>

                        <p className="whitespace-pre-line text-sm">
                            {invoice.terms || "-"}
                        </p>

                    </div>

                </div>

                {/* ================= FOOTER ================= */}

                <div className="flex justify-between items-center px-4 py-3 text-xs">

                    <div>
                        Invoice Status :
                        <span className="font-semibold ml-2">
                            {invoice.invoiceStatus}
                        </span>
                    </div>

                    <div>
                        Exchange Rate :
                        <span className="font-semibold ml-2">
                            {invoice.exchangeRate || 1}
                        </span>
                    </div>

                    <div>
                        Generated :
                        <span className="font-semibold ml-2">
                            {invoice.updatedDate || invoice.createdDate}
                        </span>
                    </div>

                </div>

            </div>
        </div>
    );
}