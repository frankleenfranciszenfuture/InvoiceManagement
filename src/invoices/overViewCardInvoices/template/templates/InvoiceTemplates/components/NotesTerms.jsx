import React from "react";
import { FileText, ClipboardList, ShieldCheck } from "lucide-react";

export default function NotesTerms({ invoice }) {
    return (
        <div className="space-y-6">

            {/* Subject */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-base font-semibold text-gray-800">
                        Subject
                    </h3>
                </div>

                <div className="px-5 py-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {invoice?.subject || "No subject available."}
                    </p>
                </div>
            </div>

            {/* Customer Notes */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-3">
                    <ClipboardList className="h-5 w-5 text-green-600" />
                    <h3 className="text-base font-semibold text-gray-800">
                        Customer Notes
                    </h3>
                </div>

                <div className="px-5 py-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {invoice?.customerNotes || "No customer notes available."}
                    </p>
                </div>
            </div>

            {/* Terms & Conditions */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-3">
                    <ShieldCheck className="h-5 w-5 text-orange-600" />
                    <h3 className="text-base font-semibold text-gray-800">
                        Terms & Conditions
                    </h3>
                </div>

                <div className="px-5 py-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {invoice?.terms || "No terms & conditions available."}
                    </p>
                </div>
            </div>

        </div>
    );
}