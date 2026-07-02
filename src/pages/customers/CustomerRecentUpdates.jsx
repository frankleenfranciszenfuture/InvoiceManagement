import { Eye } from "lucide-react";

export default function CustomerRecentUpdates() {
    const updates = [
        {
            id: 1,
            title: "Quotation QT-1001 has been created.",
            date: "20 Jun 2026",
            time: "10:30 AM",
        },
        {
            id: 2,
            title: "Invoice INV-1002 has been sent.",
            date: "18 Jun 2026",
            time: "04:20 PM",
        },
        {
            id: 3,
            title: "Payment of ₹15,000 received.",
            date: "15 Jun 2026",
            time: "09:45 AM",
        },
    ];

    return (
        <div className="p-4">
            <div className="bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between border-b px-5 py-4">
                    <h2 className="text-lg font-semibold">Recent Updates</h2>

                    <button className="text-blue-600 text-sm hover:underline">
                        View All
                    </button>
                </div>

                <div className="divide-y">
                    {updates.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-3">
                                <Eye size={18} className="text-blue-500" />

                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.date} • {item.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}