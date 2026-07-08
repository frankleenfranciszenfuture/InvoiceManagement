import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Plus, Bell } from "lucide-react";
import { toggleSidebar, openModal } from "../../slices/Ui/uiSlice";
import { History, Search, ChevronDown, Settings, FileText } from "lucide-react";



export default function Navbar({ title }) {

    const dispatch = useDispatch();
    const open = useSelector((s) => s.ui.sidebarOpen);

    const user = useSelector((state) => state.auth.user);

    const initials = (name) =>
        name
            ?.split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "??";

    return (
        <div className="h-[60px] border-b border-gray-200 flex items-center justify-between px-4 bg-white flex-shrink-0">
            <div className="flex items-center gap-3 flex-1">
                <div className="w-11 h-11 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-medium text-blue-800 ">
                        Hello, {user?.name?.split(" ")[0]}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.7">
                        Today is{" "}
                        {new Date().toLocaleDateString("en-IN", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="w-8 h-8 rounded bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white">
                    <Plus className="w-4 h-4" />
                </button>

                <button className="text-gray-500 hover:text-gray-700">
                    <Bell className="w-[18px] h-[18px]" />
                </button>

                <button className="text-gray-500 hover:text-gray-700">
                    <Settings className="w-[18px] h-[18px]" />
                </button>

                <button className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white text-sm font-medium">
                    {initials(user?.name)}
                </button>
            </div>
        </div>

    );
}
