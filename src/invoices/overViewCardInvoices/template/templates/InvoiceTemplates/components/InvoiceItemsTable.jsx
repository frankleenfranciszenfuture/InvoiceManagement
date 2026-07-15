import React from "react";

export default function InvoiceItemsTable({ invoice }) {
    const items = invoice?.items || [];

    const currency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: invoice?.currency || "INR",
            minimumFractionDigits: 2,
        }).format(Number(value || 0));

    return (
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            #
                        </th>

                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Item
                        </th>

                        <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Description
                        </th>

                        <th className="border-b px-4 py-3 text-right text-sm font-semibold text-gray-700">
                            Qty
                        </th>

                        <th className="border-b px-4 py-3 text-right text-sm font-semibold text-gray-700">
                            Rate
                        </th>

                        <th className="border-b px-4 py-3 text-right text-sm font-semibold text-gray-700">
                            Discount
                        </th>

                        <th className="border-b px-4 py-3 text-right text-sm font-semibold text-gray-700">
                            Tax %
                        </th>

                        <th className="border-b px-4 py-3 text-right text-sm font-semibold text-gray-700">
                            Amount
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td
                                colSpan={8}
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                No items found.
                            </td>
                        </tr>
                    ) : (
                        items.map((item, index) => (
                            <tr
                                key={item.id || index}
                                className="hover:bg-gray-50"
                            >
                                <td className="border-b px-4 py-3">
                                    {index + 1}
                                </td>

                                <td className="border-b px-4 py-3 font-medium">
                                    {item.itemName}
                                </td>

                                <td className="border-b px-4 py-3 text-gray-600">
                                    {item.description || "-"}
                                </td>

                                <td className="border-b px-4 py-3 text-right">
                                    {item.quantity}
                                </td>

                                <td className="border-b px-4 py-3 text-right">
                                    {currency(item.rate)}
                                </td>

                                <td className="border-b px-4 py-3 text-right">
                                    {currency(item.discount)}
                                </td>

                                <td className="border-b px-4 py-3 text-right">
                                    {item.taxPercent}%
                                </td>

                                <td className="border-b px-4 py-3 text-right font-semibold">
                                    {currency(item.amount)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}