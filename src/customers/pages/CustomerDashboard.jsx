import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CustomerBottomActionBar from "../components/bars/CustomerBottomActionBar";
import CustomerTable from "../../customers/pages/CustomerTable";
import CustomerNavbar from "../components/bars/CustomerNavbar";
import { useSearchParams } from "react-router-dom";

import { loadCustomers } from "../../slices/customers/thunks/customerThunks";

import { setCurrentPage, setStatus, } from "../../slices/customers/customerSlices"


import {
    Search,
    RotateCcw,
    HelpCircle,
    Mail,
    Globe,
    MessageCircle,
    Download,
    UploadCloud,
    ChevronDown,
    FileSpreadsheet,
    ArrowDown,
    UserCircle,
    MoreHorizontal,
    Plus,
    Loader2,
} from "lucide-react";

export default function CustomerDashboard() {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const {
        customers,
        loading,
        error,
        page,
        pageSize,
        totalPages,
        totalElements,
    } = useSelector((state) => state.customer);

    console.log("Customer State:", useSelector((state) => state.customer));

    const { search } = useSelector((state) => state.customerView);

    console.log("Customers Redux:", customers);
    console.log("Customers Length:", customers?.length);

    const status = searchParams.get("status") || "ALL";

    const customerState = useSelector((state) => state.customer);
    console.log("Customer State:", customerState);


    useEffect(() => {

        dispatch(loadCustomers({
            page: 0,
            size: 10,
            search: "",
            sortBy: "displayName",
            direction: "asc"
        }));

    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                    <p className="mt-4 text-sm font-medium text-gray-700">
                        Loading Customers...
                    </p>
                </div>
            </div>
        );
    }


    return (

        <div className="flex h-screen bg-gray-50 font-sans text-[13px] overflow-hidden">
            {/* Form Container Wrapper allowing separate inner scrolling */}
            <div className="flex-1 min-h-0 bg-white overflow-y-auto">
                <div className="px-2 py-5 max-w-30xl w-full ">
                    <CustomerNavbar />
                    <>
                        {customers?.length > 0 ? (
                            <CustomerTable />
                        ) : (
                            <div className="min-h-full flex flex-col items-center justify-center gap-3 px-4">
                                <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-1 flex-shrink-0 mt-30">
                                    <UserCircle className="w-14 h-14 text-gray-400" />
                                    <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                </div>

                                <p className="text-base font-medium text-gray-800 text-center">
                                    Every sale starts with a customer
                                </p>
                                <p className="text-sm text-gray-500 text-center max-w-sm">
                                    Create and manage your customers and their contact persons,
                                    all in one place.
                                </p>

                                <div className="flex items-center gap-2.5 mt-1 flex-wrap justify-center">
                                    <button
                                        onClick={() => navigate("/customers/new")}
                                        className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create New Customer
                                    </button>
                                    <button className="flex items-center gap-2 bg-white text-gray-700 text-sm border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                                        <Download className="w-4 h-4" />
                                        Import File
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
}
