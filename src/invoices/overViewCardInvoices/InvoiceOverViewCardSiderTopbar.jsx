import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    ChevronDown,
    MoreHorizontal,
    Plus,
} from "lucide-react";

import {
    setCurrentPage,
    setInvoiceStatus,
} from "../../slices/invoices/invoiceSlice";

import {
    setSelectedView,
} from "../../slices/invoices/invoiceViewSlice";

import { loadInvoices } from "../../slices/invoices/thunks/invoiceThunks";

export default function InvoiceOverViewCardSiderTopbar() {
    const dispatch = useDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownOpenRef = useRef(null);

    // Invoice State
    const {
        page,
        pageSize,
        invoiceStatus,
    } = useSelector((state) => state.invoice);

    // View State
    const {
        selectedView = "All Invoices",
        search = "",
        views = [],
    } = useSelector((state) => state.invoiceView);

    const filteredViews = views.filter((view) =>
        view.label.toLowerCase().includes(search.toLowerCase())
    );

    // Load invoices whenever filter changes
    useEffect(() => {
        dispatch(
            loadInvoices({
                page,
                size: pageSize,
                search,
                invoiceStatus,
            })
        );
    }, [dispatch, page, pageSize, search, invoiceStatus]);

    // Close dropdown on outside click
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
        <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-200">
            {/* Left */}
            <div className="flex items-center gap-1">
                <div ref={dropdownOpenRef} className="relative">
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-1 rounded-md bg-gray-100 px-3 py-2"
                    >
                        <h2 className="text-base font-semibold text-gray-900">
                            {selectedView}
                        </h2>

                        <ChevronDown
                            size={18}
                            className={`text-blue-600 transition-transform ${dropdownOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute left-0 top-full mt-2 w-64 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                            <div className="max-h-72 overflow-y-auto">
                                {filteredViews.map((view) => (
                                    <button
                                        key={view.value}
                                        onClick={() => {
                                            dispatch(setCurrentPage(0));
                                            dispatch(setSelectedView(view.label));
                                            dispatch(setInvoiceStatus(view.value));

                                            setDropdownOpen(false);
                                        }}
                                        className={`w-full px-5 py-4 text-left border-b border-gray-100 hover:bg-blue-600 hover:text-white ${invoiceStatus === view.value
                                            ? "bg-blue-50 text-blue-600"
                                            : ""
                                            }`}
                                    >
                                        {view.label}
                                    </button>
                                ))}
                            </div>

                            <button className="w-full border-t border-gray-200 px-4 py-3 text-left text-blue-600 hover:bg-gray-50">
                                + New View
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                <div className="flex overflow-hidden rounded-md border border-blue-600 shadow-sm">
                    <button className="flex items-center gap-1 bg-blue-600 px-2.5 py-1 text-xs font-medium text-white">
                        <Plus size={12} />
                        New
                    </button>

                    <button className="border-l border-blue-500 bg-blue-600 px-2 text-white">
                        <ChevronDown size={12} />
                    </button>
                </div>

                <button className="rounded-md border border-gray-300 p-1">
                    <MoreHorizontal size={14} />
                </button>
            </div>
        </div>
    );
}