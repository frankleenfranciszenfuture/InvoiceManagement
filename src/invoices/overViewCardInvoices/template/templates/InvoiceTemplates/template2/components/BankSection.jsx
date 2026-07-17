import React from "react";
import Editable from "./Editable";

export default function BankSection({
    invoice,
    dispatch,
    updateBank,
}) {
    const bank = invoice.bank || {};

    const update = (field, value) => {
        dispatch(
            updateBank({
                field,
                value,
            })
        );
    };

    return (
        <div className="border-r">

            {/* Header */}

            <div className="bg-gray-100 border-b px-4 py-2 font-semibold">
                Bank Details
            </div>

            <div className="p-4">

                {/* QR */}

                <div className="flex justify-center mb-5">

                    <div className="w-32 h-32 border flex items-center justify-center bg-white overflow-hidden">

                        {bank.qrImage ? (
                            <img
                                src={bank.qrImage}
                                alt="QR"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <span className="text-xs text-gray-400">
                                QR CODE
                            </span>
                        )}

                    </div>

                </div>

                {/* Bank Details */}

                <table className="w-full text-sm">

                    <tbody>

                        <tr>

                            <td className="py-2 font-medium w-36">
                                Bank Name
                            </td>

                            <td>

                                <Editable
                                    value={bank.name}
                                    placeholder="State Bank of India"
                                    onChange={(v) =>
                                        update("name", v)
                                    }
                                />

                            </td>

                        </tr>

                        <tr>

                            <td className="py-2 font-medium">
                                Account Name
                            </td>

                            <td>

                                <Editable
                                    value={bank.accountHolder}
                                    placeholder="Company Name"
                                    onChange={(v) =>
                                        update(
                                            "accountHolder",
                                            v
                                        )
                                    }
                                />

                            </td>

                        </tr>

                        <tr>

                            <td className="py-2 font-medium">
                                Account No.
                            </td>

                            <td>

                                <Editable
                                    value={bank.accountNumber}
                                    placeholder="1234567890"
                                    onChange={(v) =>
                                        update(
                                            "accountNumber",
                                            v
                                        )
                                    }
                                />

                            </td>

                        </tr>

                        <tr>

                            <td className="py-2 font-medium">
                                IFSC
                            </td>

                            <td>

                                <Editable
                                    value={bank.ifsc}
                                    placeholder="SBIN0000123"
                                    onChange={(v) =>
                                        update(
                                            "ifsc",
                                            v
                                        )
                                    }
                                />

                            </td>

                        </tr>

                        <tr>

                            <td className="py-2 font-medium">
                                Branch
                            </td>

                            <td>

                                <Editable
                                    value={bank.branch}
                                    placeholder="Coimbatore"
                                    onChange={(v) =>
                                        update(
                                            "branch",
                                            v
                                        )
                                    }
                                />

                            </td>

                        </tr>

                        <tr>

                            <td className="py-2 font-medium">
                                SWIFT
                            </td>

                            <td>

                                <Editable
                                    value={bank.swift}
                                    placeholder="SBININBB"
                                    onChange={(v) =>
                                        update(
                                            "swift",
                                            v
                                        )
                                    }
                                />

                            </td>

                        </tr>

                        <tr>

                            <td className="py-2 font-medium">
                                UPI ID
                            </td>

                            <td>

                                <Editable
                                    value={bank.upi}
                                    placeholder="company@upi"
                                    onChange={(v) =>
                                        update(
                                            "upi",
                                            v
                                        )
                                    }
                                />

                            </td>

                        </tr>

                    </tbody>

                </table>

                {/* Payment Instructions */}

                <div className="mt-6">

                    <p className="font-semibold mb-2">
                        Payment Instructions
                    </p>

                    <Editable
                        tag="div"
                        className="border rounded p-3 min-h-[90px] whitespace-pre-wrap"
                        value={bank.instructions}
                        placeholder="Payment instructions..."
                        onChange={(v) =>
                            update(
                                "instructions",
                                v
                            )
                        }
                    />

                </div>

            </div>

        </div>
    );
}