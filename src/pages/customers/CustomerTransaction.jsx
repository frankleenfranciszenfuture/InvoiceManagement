import React from 'react'

export default function CustomerTransaction() {
    return (
        <div className="p-3">
            <div className="bg-white rounded-lg shadow">

                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="font-semibold">Transactions</h2>

                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        + New Transaction
                    </button>
                </div>

                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Invoice</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td
                                colSpan={6}
                                className="text-center py-20 text-gray-500"
                            >
                                No transactions found.
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}