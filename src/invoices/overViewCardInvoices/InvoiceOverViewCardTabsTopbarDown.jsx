import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import {
    ChevronDown,
    DollarSign,
    Edit,
    MoreHorizontal,
    Plus,
    Printer,
    Send,
    Share,
    Turntable,
} from "lucide-react";


export default function InvoiceOverViewCardTabsTopbarDown() {

    const invoice = useSelector((state) => state.invoice.selectedInvoice);

    if (!invoice) {
        return <h1>Invoice not found</h1>;
    }


    return (
        <div className="flex items-center justify-between px-2 py-2 bg-white border-b border-gray-200 cursor-pointer sticky top-0">
            {/* Left */}
            <div className="flex overflow-hidden rounded-sm border border-blue-600  bg-blue-500 shadow-sm cursor-pointer">
                <button className="flex items-center gap-1  px-2.5 py-1 text-xs font-medium text-white cursor-pointer">
                    <Edit size={16} />
                    Edit
                </button>

                <button className="flex items-center border-l gap-1  px-2.5 py-1 text-xs font-medium text-white cursor-pointer">
                    <Send size={16} />
                    Send
                </button>

                <button className="flex items-center border-l gap-1  px-2.5 py-1 text-xs font-medium text-white cursor-pointer">
                    <Share size={16} />
                    Share
                </button>

                <button className="flex items-center border-l gap-1  px-2.5 py-1 text-xs font-medium text-white cursor-pointer">
                    <Printer size={16} />
                    Pdf/Print
                </button>

                <button className="flex items-center border-l gap-1  px-2.5 py-1 text-xs font-medium text-white cursor-pointer">
                    <Turntable size={16} />
                    Record Payment
                </button>

                {/* More */}
                <button className="flex items-center border-l gap-1  px-2.5 py-1 text-xs font-medium text-white  cursor-pointer">
                    <MoreHorizontal size={14} />
                </button>
            </div>

            {/* Right */}
            {/* <div className="flex items-center gap-2"> */}
            {/* New Button Group */}
            {/* <div className="flex overflow-hidden rounded-md border border-blue-600 shadow-sm">
          <button className="flex items-center gap-1 bg-blue-600 px-2.5 py-1 text-xs font-medium text-white">
            <Plus size={12} />
            New
          </button>

          <button className="border-l border-blue-500 bg-blue-600 px-2 text-white">
            <ChevronDown size={12} />
          </button>
        </div> */}

            {/* More */}
            {/* <button className="rounded-md border border-gray-300 p-1">
          <MoreHorizontal size={14} />
        </button> */}
            {/* </div> */}
        </div>
    );
}