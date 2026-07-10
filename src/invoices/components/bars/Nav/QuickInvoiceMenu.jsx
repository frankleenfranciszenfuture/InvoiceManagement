import { useSelector } from "react-redux";
import { closeInvoiceNewMenuOpen } from "../../../../slices/Ui/uiSlice";
import {
    CirclePlus, ShoppingCart, ShoppingBag, FileSpreadsheet, UploadCloud,
    Mail,
    FilePenIcon,
    FileTextIcon,
    Edit2Icon,
} from "lucide-react";

const menuItems = [
    {
        label: "New invoice",
        icon: FileTextIcon,
        action: "print",
    },
    {
        label: "Edit Invoice",
        icon: FilePenIcon,
        action: "share",
    },
    {
        label: "Save and Send Later",
        icon: Mail,
        action: "sendLater",
    },
];


export default function QuickInvoiceMenu() {
    const { invoiceNewMenuOpen } = useSelector((state) => state.ui);

    if (!invoiceNewMenuOpen) return null;

    return (
        <div className="absolute right-8 top-30 mt-3 w-56 rounded-lg border border-gray-200 bg-white shadow-xl overflow-hidden z-50">
            {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                    <button
                        key={item.action}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
                    >
                        <Icon size={16} />
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
}