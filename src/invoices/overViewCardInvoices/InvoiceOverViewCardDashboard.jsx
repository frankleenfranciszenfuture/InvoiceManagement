import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import InvoiceOverViewCardSiderTopbar from './InvoiceOverViewCardSiderTopbar';
import InvoiceOverViewCardSiderbarDetails from './InvoiceOverViewCardSiderbarDetails';

import { loadInvoices } from "../../slices/invoices/thunks/invoiceThunks";

import { setCurrentPage, setInvoiceStatus, setSearchQuery } from "../../slices/invoices/invoiceSlice"
import InvoiceOverViewCardTabsTopbar from './InvoiceOverViewCardTabsTopbar';
import InvoiceOverViewCardTabsTopbarDown from './InvoiceOverViewCardTabsTopbarDown';
import { LayoutTemplate } from 'lucide-react';
import { openModal } from "../../slices/Ui/uiSlice";
import InvoicePreviewTemplateDashboard from '../../invoices/overViewCardInvoices/template/InvoicePreviewTemplateDashboard';


export default function InvoiceOverViewCardDashboard() {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const invoiceState = useSelector((state) => state.invoice);
    const invoice = useSelector((state) => state.invoice.selectedInvoice);
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
        <div className="h-screen flex">
            {/* Left Sidebar */}
            <div className="w-[440px] border border-gray-200 ">
                <div className="sticky top-0 z-40 bg-white border border-gray-200">
                    <InvoiceOverViewCardSiderTopbar />
                </div>

                <div className="flex-1 ">
                    <InvoiceOverViewCardSiderbarDetails />
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col h-screen">
                {/* Sticky Header — fixed from accidental modal backdrop classes */}
                <div className="sticky top-0 z-40 bg-white flex flex-col">
                    <InvoiceOverViewCardTabsTopbar />
                    <InvoiceOverViewCardTabsTopbarDown />
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto bg-gray-100">
                    <div className="p-10">
                        <div className="relative group bg-white rounded-lg shadow">
                            <button
                                onClick={() =>
                                    dispatch(
                                        openModal({
                                            type: "changeTemplate",
                                            data: { invoiceId: invoices?.id },
                                        }),
                                    )
                                }
                                className="
                  absolute top-4 right-4
                  opacity-0 invisible
                  group-hover:opacity-100
                  group-hover:visible
                  transition-all duration-200
                  rounded-md border border-gray-200
                  bg-white px-3 py-1.5
                  text-sm text-blue-600
                  shadow-sm hover:bg-gray-50
                  flex items-center gap-2
                "
                            >
                                <LayoutTemplate size={16} />
                                Change Template
                            </button>

                            <div className="p-20 rounded-md bg-gray-100 overflow-hidden">
                                <InvoicePreviewTemplateDashboard invoice={invoices} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

