import React from "react";
import {
    ShieldCheck,
    CalendarDays,
    PenSquare,
    HeartHandshake,
} from "lucide-react";

import useSelectedInvoice from "../../../templates/InvoiceTemplates/hooks/useSelectedInvoice";


export default function InvoiceFooter() {

    const invoice = useSelectedInvoice();

    return (
        <div className="mt-10 border-t border-gray-200 pt-8">

            <div className="grid grid-cols-2 gap-12">

                {/* Left */}

                <div>

                    <div className="flex items-center gap-2">

                        <HeartHandshake
                            size={20}
                            className="text-blue-600"
                        />

                        <h3 className="text-lg font-semibold text-gray-800">
                            Thank You
                        </h3>

                    </div>

                    <p className="mt-3 leading-7 text-gray-600">
                        Thank you for your business. We truly appreciate your
                        trust in our services. If you have any questions
                        regarding this invoice, please feel free to contact us.
                    </p>

                </div>

                {/* Right */}

                <div className="flex flex-col items-end">

                    <div className="w-64">

                        <p className="text-sm text-gray-500">
                            Authorized Signature
                        </p>

                        <div className="mt-10 border-b border-gray-400"></div>

                        <div className="mt-3 flex items-center gap-2">

                            <PenSquare
                                size={16}
                                className="text-gray-500"
                            />

                            <span className="text-sm text-gray-600">
                                FH Technology
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Bottom */}

            <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-5 text-sm text-gray-500">

                <div className="flex items-center gap-2">

                    <ShieldCheck
                        size={16}
                    />

                    <span>
                        This is a system generated invoice. Signature is optional.
                    </span>

                </div>

                <div className="flex items-center gap-2">

                    <CalendarDays
                        size={16}
                    />

                    <span>
                        Generated on {invoice?.updatedDate || invoice?.createdDate}
                    </span>

                </div>

            </div>

        </div>
    );
}