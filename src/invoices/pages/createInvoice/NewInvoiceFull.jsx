import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

import { loadCustomers } from "../../../slices/customers/thunks/customerThunks";

import {
    toggleSimplifiedView,
    setCustomerSearch,
    setOpenCustomer,
    setCustomerId,
    setCustomerName,
} from "../../../slices/invoices/invoiceSlice";

import { ChevronDown, Plus, Search, Settings, X } from "lucide-react";

export default function NewInvoiceFull() {

    const dispatch = useDispatch();

    const EMPTY_ARRAY = [];
    const EMPTY_OBJECT = {};


    const customerDropdownRef = useRef(null);

    const customers = useSelector(
        (state) => state.invoice.customers ?? []
    );

    const customerSearch = useSelector(
        (state) => state.invoice.customerSearch
    );

    const openCustomer = useSelector(
        (state) => state.invoice.openCustomer
    );

    useEffect(() => {
        dispatch(loadCustomers());
    }, [dispatch]);


    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) =>
            customer.displayName
                ?.toLowerCase()
                .includes(customerSearch.toLowerCase())
        );
    }, [customers, customerSearch]);


    const simplifiedView = useSelector(
        (state) => state.invoice.simplifiedView
    );

    return (
        <div className="flex h-full bg-gray-50 font-sans text-[13px] overflow-hidden">
            {/* Form Container Wrapper allowing separate inner scrolling */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">

                {/* Header */}
                <div className="px-6 py-6 max-w-30xl w-full">
                    <div className="flex items-center justify-between">
                        {/* Left Section */}
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                                <div className="w-2.5 h-2.5 border border-gray-400 rounded-sm" />
                            </div>

                            <h1 className="text-lg font-semibold text-gray-800">
                                New Invoice All
                            </h1>

                            <div className="flex items-center gap-2 ml-4 shrink-0">
                                <span className="text-sm text-gray-600 whitespace-nowrap">
                                    Use Simplified View
                                </span>

                                <button
                                    type="button"
                                    // onClick={() => dispatch(toggleSimplifiedView())}
                                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 
                                        transition-colors duration-200 ${simplifiedView ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow 
                                            transition-transform duration-200 ${simplifiedView ? "translate-x-4" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
                                <Settings size={15} />
                                Customize invoice
                            </button>

                            <button
                                // onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* .......... */}


                {/* Body */}

                <div className="flex-1 overflow-y-auto px-3 py-2">
                    {/* Customer Name */}
                    <div className="flex items-center mb-6">
                        <div className="px-2 bg-gray-100 w-full h-[100px] flex items-center ">
                            <label className="w-44 text-sm font-medium text-red-500 shrink-0 flex items-center">
                                Customer Name<span>*</span>
                                <span className="ml-1 inline-block w-2 h-2 bg-blue-500 rounded-full" />
                            </label>

                            <div className="flex gap-2 w-[550px]">
                                <div ref={customerDropdownRef} className="relative flex-1">
                                    <input
                                        type="text"
                                        value={customerSearch}
                                        placeholder="Select or add a customer"
                                        onClick={() => dispatch(setOpenCustomer(!openCustomer))}
                                        onChange={(e) =>
                                            dispatch(setCustomerSearch(e.target.value))
                                        }
                                        className="w-full border border-blue-500 rounded px-3 py-2 text-sm"
                                    />

                                    <ChevronDown
                                        size={14}
                                        className="absolute right-3 top-3 text-gray-400"
                                    />

                                    {openCustomer && (
                                        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                                            {/* Search Box */}
                                            <div className="p-2 border border-gray-200">
                                                <div className="relative">
                                                    <Search
                                                        size={16}
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Search"
                                                        value={customerSearch}
                                                        onChange={(e) =>
                                                            dispatch(setCustomerSearch(e.target.value))
                                                        }
                                                        className="w-full border border-blue-300 rounded pl-10 pr-3 py-2 text-sm  cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                            {/* Customer List */}
                                            <div className="max-h-60 overflow-y-auto">
                                                {filteredCustomers.map((customer) => (
                                                    <button
                                                        key={customer.id}
                                                        onClick={() => {
                                                            dispatch(setCustomerId(customer.id));
                                                            dispatch(setCustomerName(customer.displayName));
                                                            dispatch(setCustomerSearch(customer.displayName));
                                                            dispatch(setOpenCustomer(false));
                                                        }}
                                                        className="w-full flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-500 hover:text-white text-left"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                                                            {customer.displayName?.charAt(0)}
                                                        </div>

                                                        <div>
                                                            <p>{customer.displayName}</p>


                                                            <p className="text-xs opacity-80">
                                                                {customer.email}
                                                            </p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                            {/* Footer */}
                                            <div className="flex items-center gap-2 flex-1 border border-gray-200  hover:bg-blue-100  cursor-pointer">
                                                <div className="ml-3 mt-2 mb-2 px-3 py-2 h-7 rounded-full bg-blue-500 border border-gray-400 flex items-center justify-center flex-shrink-0">
                                                    <Plus
                                                        size={8}
                                                        className="w-2 h-3 text-gray-100 font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-medium text-blue-800 ">
                                                        New Customer
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded">
                                    <Search size={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ...... */}


            </div>
        </div>

    )
}
