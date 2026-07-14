import React from 'react'
import { useState } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectGrandTotal } from '../../../slices/invoices/invoiceSlice';

export default function InvoiceAddPaymentCard() {

    const [receivedPayment, setReceivedPayment] = useState(false);
    const [payments, setPayments] = useState([
        {
            paymentMode: "Cash",
            amount: 0,
        },
    ]);

    const addSplitPayment = () => {
        setPayments([
            ...payments,
            {
                paymentMode: "Cash",
                amount: 0,
            },
        ]);
    };

    const total = useSelector(selectGrandTotal);
    const fmt = (n) => parseFloat(n || 0).toFixed(2);

    const deletePaymentRow = (index) => {
        setPayments(payments.filter((_, i) => i !== index));
    };

    const updatePayment = (index, field, value) => {
        const updated = [...payments];
        updated[index][field] = value;
        setPayments(updated);
    };

    const totalReceived = payments.reduce(
        (sum, p) => sum + Number(p.amount || 0),
        0
    );

    const balance = total - totalReceived;

    return (
        <div>

            {/* Payment */}
            {/* Receive Payment */}
            <div className="w-[750px] mt-6 border border-gray-300 rounded-md bg-white">

                {/* Checkbox */}
                <div className="flex items-center gap-2 p-3 ">
                    <input
                        type="checkbox"
                        checked={receivedPayment}
                        onChange={(e) => setReceivedPayment(e.target.checked)}
                        className="h-4 w-4 accent-blue-600"
                    />

                    <span className="font-medium text-gray-700">
                        I have received the payment
                    </span>
                </div>

                {/* Payment Details */}
                {receivedPayment && (
                    <div>

                        {/* Header */}
                        <div className="grid grid-cols-[2fr_1fr_80px] bg-gray-50 border border-gray-200 cursor-pointer">
                            <div className="p-3 text-xs font-semibold text-gray-500 uppercase border-r border-gray-200">
                                Payment Mode
                            </div>

                            <div className="p-3 text-xs font-semibold text-gray-500 uppercase border-r border-gray-200 text-right">
                                Amount Received
                            </div>

                            <div className="p-3 text-xs font-semibold text-gray-500 uppercase text-center">
                                Action
                            </div>
                        </div>

                        {/* Rows */}
                        {payments.map((payment, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-[2fr_1fr_80px] border border-gray-200 "
                            >
                                <div className="p-3 border-r border-gray-300">
                                    <select
                                        value={payment.paymentMode}
                                        onChange={(e) =>
                                            updatePayment(index, "paymentMode", e.target.value)
                                        }
                                        className="w-full border border-gray-200 rounded px-3 py-2 cursor-pointer"
                                    >
                                        <option>Cash</option>
                                        <option>Bank Transfer</option>
                                        <option>Cheque</option>
                                        <option>UPI</option>
                                        <option>Card</option>
                                    </select>
                                </div>

                                <div className="p-3 border-r border-gray-300">
                                    <input
                                        type="number"
                                        value={payment.amount}
                                        onChange={(e) =>
                                            updatePayment(index, "amount", e.target.value)
                                        }
                                        className="w-full text-right border border-gray-200 rounded px-3 py-2"
                                    />
                                </div>

                                <div className="flex items-center justify-center gap-2">

                                    <button className="cursor-pointer w-8 h-8 rounded-full border hover:bg-gray-100 flex items-center justify-center">
                                        <MoreHorizontal size={16} />
                                    </button>

                                    {payments.length > 1 && (
                                        <button
                                            onClick={() => deletePaymentRow(index)}
                                            className="w-8 h-8 rounded-full border border-red-300 hover:bg-red-50 flex items-center justify-center"
                                        >
                                            <X size={16} className="text-red-500" />
                                        </button>
                                    )}

                                </div>
                            </div>
                        ))}

                        {/* Footer */}
                        <div className="flex justify-between items-start p-3">

                            <button
                                onClick={addSplitPayment}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                            >
                                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                                    +
                                </span>
                                Add Split Payment
                            </button>

                            <div className="text-right space-y-2">
                                <div>
                                    <span>Total (₹) :</span>

                                    <span className="ml-8 font-medium">
                                        {fmt(totalReceived)}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-red-500">
                                        Balance Amount (₹) :
                                    </span>

                                    <span className="ml-4 text-red-500 font-medium">
                                        {fmt(balance)}
                                    </span>
                                </div>
                            </div>

                        </div>

                    </div>
                )}
            </div>


        </div>
    )
}
