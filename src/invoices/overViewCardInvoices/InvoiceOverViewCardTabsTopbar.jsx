import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import {
    ChevronDown,
    Edit,
    FolderClock,
    MoreHorizontal,
    Paperclip,
    Plus,
    Square,
    SquareX,
} from "lucide-react";


export default function InvoiceOverViewCardTabsTopbar() {

    const invoice = useSelector((state) => state.invoice.selectedInvoice);

    if (!invoice) {
        return <h1>Invoice not found</h1>;
    }


    return (
        <div className="flex items-center justify-between px-5 py-5 bg-white border-b border-gray-200 ">
            {/* Left */}
            <div className="flex  items-center gap-1 cursor-pointer">
                <h1 className="text-2xl font-semibold leading-2 text-gray-900">
                    {invoice.invoiceNumber}
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {/* New Button Group */}
                <div className="flex overflow-hidden rounded-sm border border-blue-600  bg-blue-500 shadow-sm cursor-pointer">
                    <button className="flex items-center gap-1  px-2.5 py-1 text-xs font-medium text-white">
                        <Paperclip size={16} />
                    </button>
                </div>

                <div className="flex overflow-hidden rounded-sm border border-blue-600  bg-blue-500 shadow-sm cursor-pointer">
                    <button className="flex items-center px-2.5 py-1 text-xs font-medium text-white">
                        <FolderClock size={16} />
                    </button>
                </div>

                <div className="flex overflow-hidden rounded-sm border border-blue-600  bg-blue-500 shadow-sm cursor-pointer">
                    <button className="flex items-center px-2.5 py-1 text-xs font-medium text-white hover:bg-red-800">
                        <SquareX size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}