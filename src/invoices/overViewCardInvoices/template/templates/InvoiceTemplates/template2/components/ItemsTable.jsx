import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Plus,
    Trash2,
} from "lucide-react";

import Editable from "./Editable";

export default function ItemsTable({
    invoice,
    fmt,
    onAddItem,
    onRemoveItem,
    onUpdateItem,
}) {

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

    const items = invoice.items || [];

    const summary = items.reduce(
        (acc, item) => {
            const qty = Number(item.quantity) || 0;
            const rate = Number(item.unitPrice) || 0;
            const discount = Number(item.discount || 0);
            const gst = Number(item.taxPercent || 0);

            const taxable = qty * rate - discount;
            const taxAmount = taxable * gst / 100;
            const total = taxable + taxAmount;

            acc.taxable += taxable;
            acc.discount += discount;
            acc.tax += taxAmount;
            acc.total += total;

            return acc;
        },
        {
            taxable: 0,
            discount: 0,
            tax: 0,
            total: 0,
        }
    );

    const cgst = summary.tax / 2;
    const sgst = summary.tax / 2;
    const igst = invoice.interState ? summary.tax : 0;

    const totalTax =
        invoice.interState
            ? igst
            : cgst + sgst;

    const grandTotal =
        summary.taxable + totalTax;

    // const update = (index, field, value) => {
    //     onUpdateItem(index, field, value);
    // };

    return (
        <div className="border-t">

            {/* Header */}

            <table className="w-full border-collapse text-sm">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="border px-2 py-2 w-12">
                            #
                        </th>

                        <th className="border px-2 py-2">
                            Description
                        </th>

                        <th className="border px-2 py-2 w-28">
                            HSN/SAC
                        </th>

                        <th className="border px-2 py-2 w-20">
                            Qty
                        </th>

                        <th className="border px-2 py-2 w-20">
                            Unit
                        </th>

                        <th className="border px-2 py-2 w-28">
                            Rate
                        </th>

                        <th className="border px-2 py-2 w-20">
                            GST %
                        </th>

                        <th className="border px-2 py-2 w-36">
                            Amount
                        </th>

                        <th className="border px-2 py-2 w-16">

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {items.length === 0 && (

                        <tr>

                            <td
                                colSpan={9}
                                className="border py-10 text-center text-gray-400"
                            >
                                No Items Added
                            </td>

                        </tr>

                    )}

                    {items.map((item, index) => {

                        const qty =
                            Number(item.quantity) || 0;

                        const rate =
                            Number(item.unitPrice) || 0;

                        const discount =
                            Number(item.discount) || 0;

                        const taxable =
                            qty * rate - discount;

                        const gst =
                            Number(item.taxPercent) || 0;

                        const taxAmount =
                            taxable * gst / 100;

                        const amount =
                            taxable + taxAmount;

                        return (

                            <tr
                                key={item.id ?? index}
                                className="hover:bg-gray-50"
                            >

                                <td className="border px-2 py-2 text-center">

                                    {index + 1}

                                </td>

                                {/* Description */}

                                <td className="border px-2 py-2">

                                    <Editable
                                        tag="div"
                                        className="block min-h-[26px]"
                                        value={
                                            item.itemName
                                        }
                                        placeholder="Item Description"
                                        onChange={(v) =>
                                            update(
                                                index,
                                                "itemName",
                                                v
                                            )
                                        }
                                    />

                                </td>

                                {/* HSN */}

                                <td className="border px-2 py-2">

                                    <Editable
                                        value={item.hsn}
                                        className="block"
                                        placeholder="HSN"
                                        onChange={(v) =>
                                            update(
                                                index,
                                                "hsn",
                                                v
                                            )
                                        }
                                    />

                                </td>

                                {/* Qty */}

                                <td className="border px-2 py-2">

                                    <Editable
                                        value={String(
                                            item.quantity ??
                                            ""
                                        )}
                                        className="block text-center"
                                        placeholder="0"
                                        onChange={(v) =>
                                            update(
                                                index,
                                                "quantity",
                                                Number(v) ||
                                                0
                                            )
                                        }
                                    />

                                </td>

                                {/* Unit */}

                                <td className="border px-2 py-2">

                                    <Editable
                                        value={item.unit}
                                        className="block text-center"
                                        placeholder="Nos"
                                        onChange={(v) =>
                                            update(
                                                index,
                                                "unit",
                                                v
                                            )
                                        }
                                    />

                                </td>

                                {/* Rate */}

                                <td className="border px-2 py-2">

                                    <Editable
                                        value={String(
                                            item.unitPrice ??
                                            ""
                                        )}
                                        className="block text-right"
                                        placeholder="0.00"
                                        onChange={(v) =>
                                            update(
                                                index,
                                                "unitPrice",
                                                Number(v) ||
                                                0
                                            )
                                        }
                                    />

                                </td>

                                {/* GST */}

                                <td className="border px-2 py-2">

                                    <Editable
                                        value={String(
                                            item.taxPercent ??
                                            ""
                                        )}
                                        className="block text-center"
                                        placeholder="18"
                                        onChange={(v) =>
                                            update(
                                                index,
                                                "taxPercent",
                                                Number(v) ||
                                                0
                                            )
                                        }
                                    />

                                </td>

                                {/* Amount */}

                                <td className="border px-2 py-2 text-right font-medium">

                                    {fmt.currency(amount)}

                                </td>

                                {/* Delete */}

                                <td className="border px-2 py-2 text-center">

                                    <button
                                        onClick={() =>
                                            onRemoveItem(
                                                index
                                            )
                                        }
                                        className="
                                            text-red-500
                                            hover:text-red-700
                                        "
                                    >
                                        <Trash2
                                            size={18}
                                        />
                                    </button>

                                </td>

                            </tr>

                        );
                    })}

                </tbody>

            </table>

            {/* Bottom Action */}

            <div className="flex justify-start p-4">

                <button
                    onClick={onAddItem}
                    className="
                        flex
                        items-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded
                        text-sm
                    "
                >
                    <Plus size={16} />

                    Add Item

                </button>

            </div>
            <div className="border-t">

                <div className="grid grid-cols-2">

                    {/* Amount in Words */}

                    <div className="p-5">

                        <p className="font-semibold mb-2">
                            Amount In Words
                        </p>

                        <div className="border rounded p-3 min-h-[80px] bg-gray-50">

                            {/* Replace later using number-to-words package */}

                            {fmt.currency(grandTotal)}

                        </div>

                    </div>

                    {/* Totals */}

                    <div className="border-l">

                        <table className="w-full text-sm">

                            <tbody>

                                <tr>

                                    <td className="border px-3 py-2">
                                        Taxable Amount
                                    </td>

                                    <td className="border px-3 py-2 text-right">
                                        {fmt.currency(summary.taxable)}
                                    </td>

                                </tr>

                                <tr>

                                    <td className="border px-3 py-2">
                                        Discount
                                    </td>

                                    <td className="border px-3 py-2 text-right">
                                        {fmt.currency(summary.discount)}
                                    </td>
                                    <td className="border px-2 py-2">

                                        <Editable
                                            value={String(item.discount || 0)}
                                            className="block text-right"
                                            placeholder="0"
                                            onChange={(v) =>
                                                update(
                                                    index,
                                                    "discount",
                                                    Number(v) || 0
                                                )
                                            }
                                        />

                                    </td>
                                </tr>

                                {!invoice.interState && (
                                    <>
                                        <tr>

                                            <td className="border px-3 py-2">
                                                CGST
                                            </td>

                                            <td className="border px-3 py-2 text-right">
                                                {fmt.currency(cgst)}
                                            </td>

                                        </tr>

                                        <tr>

                                            <td className="border px-3 py-2">
                                                SGST
                                            </td>

                                            <td className="border px-3 py-2 text-right">
                                                {fmt.currency(sgst)}
                                            </td>

                                        </tr>
                                    </>
                                )}

                                {invoice.interState && (
                                    <tr>

                                        <td className="border px-3 py-2">
                                            IGST
                                        </td>

                                        <td className="border px-3 py-2 text-right">
                                            {fmt.currency(igst)}
                                        </td>

                                    </tr>
                                )}

                                <tr className="bg-gray-100 font-bold text-base">

                                    <td className="border px-3 py-3">
                                        Grand Total
                                    </td>

                                    <td className="border px-3 py-3 text-right">
                                        {fmt.currency(grandTotal)}
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
}