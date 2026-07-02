import { Plus } from "lucide-react";

export default function CustomerTopQuotation() {
    return (
        <div className="p-4">
            <div className="bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between border-b px-5 py-4">
                    <h2 className="text-lg font-semibold">Top Quotations</h2>

                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md">
                        <Plus size={16} />
                        New Quotation
                    </button>
                </div>

                <table className="w-full">
                    <thead className="bg-gray-50 text-sm">
                        <tr>
                            <th className="text-left px-5 py-3">Quotation No</th>
                            <th className="text-left px-5 py-3">Date</th>
                            <th className="text-left px-5 py-3">Customer</th>
                            <th className="text-left px-5 py-3">Amount</th>
                            <th className="text-left px-5 py-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td
                                colSpan={5}
                                className="text-center py-20 text-gray-500"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <p className="text-lg">📄</p>
                                    <p>No quotations found.</p>
                                    <p className="text-sm">
                                        Your top quotations will appear here.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}