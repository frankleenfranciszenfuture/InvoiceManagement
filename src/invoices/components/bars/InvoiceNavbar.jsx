import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Plus, Bell, Edit } from "lucide-react";
import { toggleSidebar, openModal } from "../../../slices/Ui/uiSlice";
import {
    setCurrentPage,
} from "../../../slices/invoices/invoiceSlice"

import { setSearch, setSelectedView, setInvoiceStatus } from "../../../slices/invoices/invoiceViewSlice"

import { loadInvoices } from "../../../slices/invoices/thunks/invoiceThunks"

import {
    History,
    Search,
    ChevronDown,
    Settings,
    FileText,
    MoreHorizontal,
} from "lucide-react";
import Tooltip from "../../../common/Tooltip/Tooltip";
import QuickCreateButtonInvoice from "../../../invoices/components/bars/Nav/QuickCreateButtonInvoice";

export default function InvoiceNavbar({ title }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const sidebarOpen = useSelector((s) => s.ui.sidebarOpen);

    const user = useSelector((state) => state.auth.user);

    const dropdownOpenRef = useRef(null);

    const initials = (name) =>
        name
            ?.split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "??";


    const {
        selectedView = "All Invoices",
        search = "",
        views = [],
    } = useSelector((state) => state.invoiceView ?? {});

    const { status, page, pageSize } = useSelector((state) => state.invoice);

    const filteredViews = (views ?? []).filter((view) =>
        view.label.toLowerCase().includes((search ?? "").toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownOpenRef.current &&
                !dropdownOpenRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (


        <div className="h-[60px] border border-gray-100 rounded-md  flex items-center justify-between bg-white px-2 py-2 border-b ">
            {/* Left */}
            <div ref={dropdownOpenRef} className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-2 cursor-pointer"
                >
                    <h2 className="font-semibold">{selectedView}</h2>
                    <ChevronDown
                        size={14}
                        className={`transition ${dropdownOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-72 rounded-md border border-gray-200 bg-white shadow-lg z-50 cursor-pointer">

                        {/* Views */}
                        <div className="max-h-72 overflow-y-auto">
                            {filteredViews.map((view) => (
                                <button
                                    key={view.value}
                                    onClick={() => {
                                        dispatch(setCurrentPage(0));
                                        dispatch(setSelectedView(view.label));
                                        dispatch(setInvoiceStatus(view.value));

                                        dispatch(
                                            loadInvoices({
                                                page: 0,
                                                size: pageSize,
                                                invoiceStatus: view.value,
                                                search: "",
                                            })
                                        );

                                        navigate(`/invoices?invoiceStatus=${view.value}`);

                                        setDropdownOpen(false);
                                    }}
                                    className="w-full px-5 py-4 border-b border-gray-50 rounded-lg text-left hover:bg-blue-500 hover:text-white"
                                >
                                    {view.label}

                                </button>

                            ))}

                        </div>

                        {/* Footer */}
                        <button className="w-full border-t border-gray-200 px-4 py-3 text-left text-blue-600 hover:bg-gray-50">
                            + New View
                        </button>

                    </div>
                )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">


                <QuickCreateButtonInvoice />
            </div>
        </div>
    );
}