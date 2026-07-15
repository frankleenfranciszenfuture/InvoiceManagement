import React from "react";
import { Package } from "lucide-react";

import useSelectedInvoice from "../../../templates/InvoiceTemplates/hooks/useSelectedInvoice";

import { formatCurrency } from "../../../../../utils/formatCurrency";

export default function InvoiceItemsTable() {

    const invoice = useSelectedInvoice();

    const items = invoice?.items || [];

    return (
        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white">

            {/* Header */}

            <div className="border-b bg-gray-50 px-6 py-4">

                <h2 className="text-lg font-semibold text-gray-800">
                    Invoice Items
                </h2>

            </div>

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="w-14 px-4 py-3 text-left text-sm font-semibold">
                            #
                        </th>

                        <th className="px-4 py-3 text-left text-sm font-semibold">
                            Item
                        </th>

                        <th className="px-4 py-3 text-left text-sm font-semibold">
                            Description
                        </th>

                        <th className="px-4 py-3 text-right text-sm font-semibold">
                            Qty
                        </th>

                        <th className="px-4 py-3 text-right text-sm font-semibold">
                            Rate
                        </th>

                        <th className="px-4 py-3 text-right text-sm font-semibold">
                            Discount
                        </th>

                        <th className="px-4 py-3 text-center text-sm font-semibold">
                            Tax
                        </th>

                        <th className="px-4 py-3 text-right text-sm font-semibold">
                            Amount
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {items.length === 0 ? (

                        <tr>

                            <td
                                colSpan={8}
                                className="py-12 text-center text-gray-500"
                            >
                                No items available.
                            </td>

                        </tr>

                    ) : (

                        items.map((item, index) => (

                            <tr
                                key={item.id ?? index}
                                className="border-b last:border-none hover:bg-gray-50"
                            >

                                <td className="px-4 py-4 text-gray-600">
                                    {index + 1}
                                </td>

                                <td className="px-4 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="rounded-lg bg-blue-50 p-2">

                                            <Package
                                                size={18}
                                                className="text-blue-600"
                                            />

                                        </div>

                                        <div>

                                            <p className="font-semibold text-gray-800">
                                                {item.itemName}
                                            </p>

                                        </div>

                                    </div>

                                </td>

                                <td className="px-4 py-4 text-gray-600">
                                    {item.description || "-"}
                                </td>

                                <td className="px-4 py-4 text-right">
                                    {item.quantity}
                                </td>

                                <td className="px-4 py-4 text-right">
                                    {formatCurrency(
                                        item.rate,
                                        invoice?.currency
                                    )}
                                </td>

                                <td className="px-4 py-4 text-right">
                                    {formatCurrency(
                                        item.discount,
                                        invoice?.currency
                                    )}
                                </td>

                                <td className="px-4 py-4 text-center">

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                                        {item.taxPercent}%

                                    </span>

                                </td>

                                <td className="px-4 py-4 text-right font-semibold text-gray-900">
                                    {formatCurrency(
                                        item.amount,
                                        invoice?.currency
                                    )}
                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
}