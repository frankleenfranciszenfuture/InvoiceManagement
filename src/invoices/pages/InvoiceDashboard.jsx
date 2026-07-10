import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import InvoiceBottomActionBar from "../components/bars/InvoiceBottomActionBar";
import InvoiceTable from "../../invoices/pages/InvoiceTable";
import InvoiceNavbar from '../components/bars/InvoiceNavbar';
import { useSearchParams } from "react-router-dom";

import { loadInvoices } from "../../slices/invoices/thunks/invoiceThunks";

import { setCurrentPage, setInvoiceStatus, setSearchQuery } from "../../slices/invoices/invoiceSlice"

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


import InvoiceSkeleton from '../../common/loader/InvoiceSkeleton ';


export default function InvoiceDashboard() {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const invoiceState = useSelector((state) => state.invoice);

    const {
        invoices,
        loading,
        error,
        page,
        pageSize,
        totalPages,
        totalElements,
        invoiceStatus,
    } = invoiceState;

    console.log(invoiceState);

    const { search } = useSelector((state) => state.invoiceView);

    console.log("Customers Redux:", invoices);
    console.log("Customers Length:", invoices?.length);

    const status = searchParams.get("invoiceStatus") || "ALL";


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

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-[13px] overflow-hidden">
            {/* Form Container Wrapper allowing separate inner scrolling */}
            <div className="flex-1 min-h-0 bg-white overflow-y-auto">
                <div className="px-2 py-5 max-w-30xl w-full ">
                    <InvoiceNavbar />
                    <>
                        {invoices?.length > 0 ? (
                            <InvoiceTable />
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
                                        Create New Invoice
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
