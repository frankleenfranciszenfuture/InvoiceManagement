import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    closeInvoiceNewMenuOpen,
    toggleInvoiceNewMenuOpen
} from "../../../../slices/Ui/uiSlice";

import { ChevronDown, FileSpreadsheet, Mail, MoreHorizontal, Plus, UploadCloud } from "lucide-react";
import Tooltip from "../../../../common/Tooltip/Tooltip";

import { toggleInvoiceMenu, setShowInvoiceMenu } from "../../../../slices/invoices/invoiceSlice"

import QuickInvoiceMenu from "../../../../invoices/components/bars/Nav/QuickInvoiceMenu";

export default function QuickCreateButtonInvoice() {
    const dispatch = useDispatch();

    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (wrapperRef.current?.contains(e.target)) return;

            dispatch(closeInvoiceNewMenuOpen());

        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [dispatch]);

    return (


        <div className="flex items-center gap-1">

            <div className="flex overflow-visible  shadow-sm">
                <div ref={wrapperRef} className="relative group">
                    <button
                        onClick={() => dispatch(toggleInvoiceNewMenuOpen())}
                        className="flex items-center  gap-2 bg-blue-600 border-r border-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">
                        <Plus size={16} />
                        New

                    </button>
                    <Tooltip text="Create Invoice" />

                </div>


                <button
                    className="bg-blue-600 px-3 text-white hover:bg-blue-700">
                    <ChevronDown size={16} />
                    <QuickInvoiceMenu />
                </button>


            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border bg-white hover:bg-gray-50">
                <MoreHorizontal size={16} />
            </button>
        </div>

    );
}