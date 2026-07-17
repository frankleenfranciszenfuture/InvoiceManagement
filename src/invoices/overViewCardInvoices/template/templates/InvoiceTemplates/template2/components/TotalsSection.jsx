import React from "react";
import Editable from "./Editable";

export default function TotalsSection({
    invoice,
    totals,
    fmt,
    dispatch,
    updateTax,
}) {
    const {
        taxableAmount = 0,
        taxAmount = 0,
        grandTotal = 0,
    } = totals;

    const discount = Number(invoice.discount || 0);
    const shipping = Number(invoice.shippingCharge || 0);
    const roundOff = Number(invoice.roundOff || 0);

    const taxRate = Number(invoice.tax || 18);

    const finalTotal =
        taxableAmount -
        discount +
        shipping +
        taxAmount +
        roundOff;

    return (
        <div className="border-t grid grid-cols-2">

            {/* Left */}

            <div className="p-5 border-r">

                <h3 className="font-semibold text-sm mb-3">
                    Notes
                </h3>

                <Editable
                    tag="div"
                    value={invoice.notes}
                    placeholder="Enter Notes..."
                    className="block min-h-[90px] whitespace-pre-wrap"
                    onChange={(v) => { }}
                />

            </div>

            {/* Right */}

            <div>

                <table className="w-full text-sm">

                    <tbody>

                        <tr>

                            <td className="border px-3 py-2">
                                Taxable Amount
                            </td>

                            <td className="border px-3 py-2 text-right">
                                {fmt.currency(taxableAmount)}
                            </td>

                        </tr>

                        <tr>

                            <td className="border px-3 py-2">
                                Discount
                            </td>

                            <td className="border px-3 py-2 text-right">

                                <Editable
                                    value={String(discount)}
                                    className="block text-right"
                                    onChange={() => { }}
                                />

                            </td>

                        </tr>

                        <tr>

                            <td className="border px-3 py-2">
                                Shipping Charge
                            </td>

                            <td className="border px-3 py-2 text-right">

                                <Editable
                                    value={String(shipping)}
                                    className="block text-right"
                                    onChange={() => { }}
                                />

                            </td>

                        </tr>

                        <tr>

                            <td className="border px-3 py-2">
                                GST %
                            </td>

                            <td className="border px-3 py-2 text-right">

                                <Editable
                                    value={String(taxRate)}
                                    className="block text-right"
                                    onChange={(v) =>
                                        dispatch(
                                            updateTax({
                                                value:
                                                    Number(v) || 0,
                                            })
                                        )
                                    }
                                />

                            </td>

                        </tr>

                        <tr>

                            <td className="border px-3 py-2">
                                GST Amount
                            </td>

                            <td className="border px-3 py-2 text-right">
                                {fmt.currency(taxAmount)}
                            </td>

                        </tr>

                        <tr>

                            <td className="border px-3 py-2">
                                Round Off
                            </td>

                            <td className="border px-3 py-2 text-right">

                                <Editable
                                    value={String(roundOff)}
                                    className="block text-right"
                                    onChange={() => { }}
                                />

                            </td>

                        </tr>

                        <tr className="bg-gray-100 font-bold text-base">

                            <td className="border px-3 py-3">
                                Grand Total
                            </td>

                            <td className="border px-3 py-3 text-right">
                                {fmt.currency(finalTotal)}
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    );
}