import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewInvoiceFull from './NewInvoiceFull';
import NewInvoiceSimplified from './NewInvoiceSimplified';

import { toggleSimplifiedView } from "../../../slices/invoices/invoiceSlice";

export default function ChoseInvoice() {
    const dispatch = useDispatch();

    const invoice = useSelector((state) => state?.invoice ?? {});


    return (
        <div className="flex h-full bg-gray-50 font-sans text-[13px] overflow-hidden">
            {/* Form Container Wrapper allowing separate inner scrolling */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Body */}

                {/* {invoice.simplifiedView ? <NewInvoiceSimplified /> : <NewInvoiceFull />} */}
                {invoice.simplifiedView ? <NewInvoiceFull /> : <NewInvoiceSimplified />}
                {/* {invoice.simplifiedView ? <NewInvoiceFull /> : <NewInvoiceSimplified />} */}
                {/* Footer */}
            </div>
        </div>
    )
}
