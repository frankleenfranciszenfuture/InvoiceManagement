import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeQuickCreate } from "../../slices/Ui/uiSlice";
import { CirclePlus, ShoppingCart, ShoppingBag } from "lucide-react";

const groups = [
    {
        title: "GENERAL",
        items: ["Add User", "Item", "Log Time", "Weekly Log"],
        icon: CirclePlus,
    },
    {
        title: "SALES",
        items: [
            "Customer",
            "Quotes",
            "Delivery Challan",
            "Invoices",
            "Retail Invoice",
            "Customer Payment",
        ],
        icon: ShoppingCart,
    },
    {
        title: "PURCHASES",
        items: ["Expenses"],
        icon: ShoppingBag,
    },
];

export default function QuickCreateMenu() {
    const dispatch = useDispatch();

    const { quickCreateOpen } = useSelector((state) => state.ui);

    const menuRef = useRef(null);


    useEffect(() => {
        function handleClick(e) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                dispatch(closeQuickCreate());
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () =>
            document.removeEventListener("mousedown", handleClick);
    }, [dispatch]);



    if (!quickCreateOpen) return null;

    return (
        <div
            ref={menuRef}
            className="
                absolute
                right-0
                top-12
                w-[760px]
                rounded-xl
                border
                bg-white
                shadow-2xl
                p-6
                z-50
                animate-in
                fade-in
                slide-in-from-top-2
                duration-200
            "
        >
            <div className="grid grid-cols-3 gap-12">
                {groups.map((group) => {
                    const Icon = group.icon;

                    return (
                        <div key={group.title}>
                            <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold mb-5">
                                <Icon className="w-4 h-4" />
                                {group.title}
                            </div>

                            <div className="space-y-4">
                                {group.items.map((item) => (
                                    <button
                                        key={item}
                                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                                    >
                                        <CirclePlus className="w-4 h-4 text-gray-400" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}