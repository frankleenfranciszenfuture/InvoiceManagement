import React from "react";
import { FileText, ScrollText } from "lucide-react";
import useSelectedInvoice from "../../../templates/InvoiceTemplates/hooks/useSelectedInvoice";


export default function NotesTerms() {

    const invoice = useSelectedInvoice();

    return (
        <div className="mt-8 grid grid-cols-2 gap-6">

            {/* Customer Notes */}

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="flex items-center gap-2 border-b bg-gray-50 px-6 py-4">

                    <FileText
                        size={18}
                        className="text-blue-600"
                    />

                    <h3 className="text-lg font-semibold text-gray-800">
                        Customer Notes
                    </h3>

                </div>

                <div className="min-h-[140px] px-6 py-5">

                    {invoice?.customerNotes ? (

                        <p className="whitespace-pre-line leading-7 text-gray-700">
                            {invoice.customerNotes}
                        </p>

                    ) : (

                        <p className="italic text-gray-400">
                            No customer notes available.
                        </p>

                    )}

                </div>

            </div>

            {/* Terms & Conditions */}

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

                <div className="flex items-center gap-2 border-b bg-gray-50 px-6 py-4">

                    <ScrollText
                        size={18}
                        className="text-green-600"
                    />

                    <h3 className="text-lg font-semibold text-gray-800">
                        Terms & Conditions
                    </h3>

                </div>

                <div className="min-h-[140px] px-6 py-5">

                    {invoice?.terms ? (

                        <p className="whitespace-pre-line leading-7 text-gray-700">
                            {invoice.terms}
                        </p>

                    ) : (

                        <p className="italic text-gray-400">
                            No terms available.
                        </p>

                    )}

                </div>

            </div>

        </div>
    );
}