import React, { useMemo } from "react";
import { fmt } from "../../../../templates/InvoiceTemplates/template2/helpers";

export default function TaxSummary({ invoice }) {
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

    const summary = useMemo(() => {
        const map = {};

        items.forEach((item) => {
            const hsn = item.hsn || "-";

            const qty = Number(item.quantity) || 0;
            const rate = Number(item.unitPrice) || 0;
            const discount = Number(item.discount) || 0;
            const gst = Number(item.taxPercent) || 0;

            const taxable = qty * rate - discount;
            const tax = taxable * gst / 100;

            if (!map[hsn]) {
                map[hsn] = {
                    hsn,
                    taxable: 0,
                    gst,
                    tax: 0,
                };
            }

            map[hsn].taxable += taxable;
            map[hsn].tax += tax;
        });

        return Object.values(map);
    }, [items]);

    const totalTaxable = summary.reduce(
        (s, i) => s + i.taxable,
        0
    );

    const totalTax = summary.reduce(
        (s, i) => s + i.tax,
        0
    );

    return (
        <div className="border-t">

            <div className="bg-gray-100 border-b px-4 py-2 font-semibold">
                GST Summary
            </div>

            <table className="w-full border-collapse text-sm">

                <thead>

                    <tr className="bg-gray-50">

                        <th className="border px-2 py-2">
                            HSN/SAC
                        </th>

                        <th className="border px-2 py-2">
                            Taxable Value
                        </th>

                        <th className="border px-2 py-2">
                            GST %
                        </th>

                        <th className="border px-2 py-2">
                            CGST
                        </th>

                        <th className="border px-2 py-2">
                            SGST
                        </th>

                        <th className="border px-2 py-2">
                            IGST
                        </th>

                        <th className="border px-2 py-2">
                            Total Tax
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {summary.length === 0 && (
                        <tr>

                            <td
                                colSpan={7}
                                className="border py-8 text-center text-gray-400"
                            >
                                No Tax Details
                            </td>

                        </tr>
                    )}

                    {summary.map((row) => {

                        const cgst =
                            invoice.interState
                                ? 0
                                : row.tax / 2;

                        const sgst =
                            invoice.interState
                                ? 0
                                : row.tax / 2;

                        const igst =
                            invoice.interState
                                ? row.tax
                                : 0;

                        return (

                            <tr key={row.hsn}>

                                <td className="border px-2 py-2">
                                    {row.hsn}
                                </td>

                                <td className="border px-2 py-2 text-right">
                                    {fmt.currency(
                                        row.taxable
                                    )}
                                </td>

                                <td className="border px-2 py-2 text-center">
                                    {row.gst}%
                                </td>

                                <td className="border px-2 py-2 text-right">
                                    {fmt.currency(cgst)}
                                </td>

                                <td className="border px-2 py-2 text-right">
                                    {fmt.currency(sgst)}
                                </td>

                                <td className="border px-2 py-2 text-right">
                                    {fmt.currency(igst)}
                                </td>

                                <td className="border px-2 py-2 text-right font-medium">
                                    {fmt.currency(
                                        row.tax
                                    )}
                                </td>

                            </tr>

                        );
                    })}

                </tbody>

                <tfoot>

                    <tr className="bg-gray-100 font-semibold">

                        <td className="border px-2 py-2">
                            Total
                        </td>

                        <td className="border px-2 py-2 text-right">
                            {fmt.currency(
                                totalTaxable
                            )}
                        </td>

                        <td className="border"></td>

                        <td className="border px-2 py-2 text-right">
                            {invoice.interState
                                ? "-"
                                : fmt.currency(
                                    totalTax / 2
                                )}
                        </td>

                        <td className="border px-2 py-2 text-right">
                            {invoice.interState
                                ? "-"
                                : fmt.currency(
                                    totalTax / 2
                                )}
                        </td>

                        <td className="border px-2 py-2 text-right">
                            {invoice.interState
                                ? fmt.currency(
                                    totalTax
                                )
                                : "-"}
                        </td>

                        <td className="border px-2 py-2 text-right">
                            {fmt.currency(totalTax)}
                        </td>

                    </tr>

                </tfoot>

            </table>

        </div>
    );
}