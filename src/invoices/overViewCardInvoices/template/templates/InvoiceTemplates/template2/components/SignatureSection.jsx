import React from "react";
import Editable from "./Editable";

export default function SignatureSection({
    invoice,
    updateInvoice,
}) {
    const signature = invoice.signature || {};

    const updateSignature = (field, value) => {
        updateInvoice("signature", {
            ...signature,
            [field]: value,
        });
    };

    return (
        <div className="border-r">

            {/* Header */}

            <div className="bg-gray-100 border-b px-4 py-2 font-semibold">
                Authorized Signatory
            </div>

            <div className="p-5 flex flex-col h-full">

                {/* Company Seal */}

                <div className="flex justify-center mb-5">

                    <div className="w-28 h-28 border rounded flex items-center justify-center bg-white overflow-hidden">

                        {signature.sealImage ? (
                            <img
                                src={signature.sealImage}
                                alt="Seal"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <span className="text-xs text-gray-400">
                                COMPANY SEAL
                            </span>
                        )}

                    </div>

                </div>

                {/* Signature */}

                <div className="flex justify-center mb-5">

                    <div className="w-40 h-20 border-b flex items-center justify-center">

                        {signature.signatureImage ? (
                            <img
                                src={signature.signatureImage}
                                alt="Signature"
                                className="max-h-full object-contain"
                            />
                        ) : (
                            <span className="text-xs text-gray-400">
                                Signature
                            </span>
                        )}

                    </div>

                </div>

                {/* Details */}

                <div className="space-y-3">

                    <Editable
                        tag="div"
                        className="font-bold text-center text-lg block"
                        value={signature.name}
                        placeholder="Authorized Person"
                        onChange={(v) =>
                            updateSignature("name", v)
                        }
                    />

                    <Editable
                        tag="div"
                        className="text-center text-sm block"
                        value={signature.designation}
                        placeholder="Managing Director"
                        onChange={(v) =>
                            updateSignature("designation", v)
                        }
                    />

                    <Editable
                        tag="div"
                        className="text-center text-sm block"
                        value={signature.company}
                        placeholder="Company Name"
                        onChange={(v) =>
                            updateSignature("company", v)
                        }
                    />

                </div>

                {/* Declaration */}

                <div className="mt-6">

                    <p className="font-semibold mb-2">
                        Declaration
                    </p>

                    <Editable
                        tag="div"
                        className="border rounded p-3 min-h-[120px] whitespace-pre-wrap text-sm"
                        value={signature.declaration}
                        placeholder="We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct."
                        onChange={(v) =>
                            updateSignature(
                                "declaration",
                                v
                            )
                        }
                    />

                </div>

            </div>

        </div>
    );
}