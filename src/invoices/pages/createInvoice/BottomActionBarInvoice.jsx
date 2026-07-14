import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleSaveMenu, setShowSaveMenu } from '../../../slices/invoices/invoiceSlice';
import { ChevronUp, FileSpreadsheet, Mail, UploadCloud } from 'lucide-react';


export default function BottomActionBarInvoice
    ({
        onSaveDraft,
        onSaveAndSend,
        onSaveAndPrint,
        onSaveAndShare,
        onSaveAndSendLater,
        onCancel,
        onPreview,
        onDownloadPdf,
        onGenerateInvoice,
        onUpdateInvoice,
        onDeleteInvoice,
        onDuplicateInvoice,
        onValidateInvoice,
        onResetInvoice,
        onPrintInvoice,
        onEmailInvoice
    }) {
    const dispatch = useDispatch();

    const showSaveMenu = useSelector((state) => state.invoice?.showSaveMenu);
    const saveMenuRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (e) => {

            if (saveMenuRef.current && !saveMenuRef.current.contains(e.target)) {
                dispatch(setShowSaveMenu(false));
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dispatch]);

    return (

        <div className="flex items-center justify-between">

            {/* Left Side - Buttons */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onSaveDraft}
                    className="border border-gray-300 text-gray-700 text-sm px-5 py-2 rounded hover:bg-gray-100 font-medium"
                >


                    Save as Draft
                </button>

                <div ref={saveMenuRef} className="relative flex items-center">


                    <button className="bg-blue-500 text-white px-4 h-10 rounded-l">
                        Save and Send
                    </button>

                    <button
                        onClick={() => dispatch(toggleSaveMenu())}
                        className="bg-blue-500 text-white w-9 h-10 rounded-r border-l border-blue-400 flex items-center justify-center"
                    >
                        <ChevronUp size={12} />
                    </button>

                    {showSaveMenu && (
                        <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-500 hover:text-white text-left">
                                <FileSpreadsheet size={16} />
                                Save and Print
                            </button>

                            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-500 hover:text-white text-left">
                                <UploadCloud size={16} />
                                Save and Share
                            </button>

                            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-500 hover:text-white text-left">
                                <Mail size={16} />
                                Save and Send Later
                            </button>
                        </div>
                    )}
                </div>
                <button className="border border-gray-300 text-gray-700 text-sm px-5 py-2 rounded hover:bg-gray-100 font-medium">
                    Cancel
                </button>
            </div>
            {/*  */}
        </div>

    )
}
