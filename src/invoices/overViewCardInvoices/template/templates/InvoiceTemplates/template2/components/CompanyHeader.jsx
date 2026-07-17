import React from "react";
import Editable from "./Editable";

export default function CompanyHeader({
    invoice,
    updateInvoice,
}) {
    const company = invoice.company || {};

    const updateCompany = (field, value) => {
        updateInvoice("company", {
            ...company,
            [field]: value,
        });
    };

    return (
        <div className="border-r">

            {/* TAX INVOICE */}

            <div className="bg-gray-100 border-b px-4 py-3">
                <h1 className="text-2xl font-bold tracking-wide">
                    TAX INVOICE
                </h1>
            </div>

            {/* Company */}

            <div className="p-5">

                {/* Logo */}

                <div className="flex gap-4 items-start">

                    <div className="w-20 h-20 border rounded flex items-center justify-center overflow-hidden bg-white">

                        {company.logo ? (
                            <img
                                src={company.logo}
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <span className="text-xs text-gray-400">
                                LOGO
                            </span>
                        )}

                    </div>

                    <div className="flex-1">

                        <Editable
                            tag="h2"
                            className="text-xl font-bold uppercase block"
                            value={company.name}
                            placeholder="Company Name"
                            onChange={(v) =>
                                updateCompany("name", v)
                            }
                        />

                        <Editable
                            className="block mt-1 text-sm"
                            value={company.tagline}
                            placeholder="Company Tagline"
                            onChange={(v) =>
                                updateCompany("tagline", v)
                            }
                        />

                    </div>

                </div>

                {/* GST */}

                <div className="mt-4 space-y-1 text-sm">

                    <div className="flex">
                        <span className="font-semibold w-20">
                            GSTIN
                        </span>

                        <Editable
                            className="flex-1"
                            value={company.gstin}
                            placeholder="33ABCDE1234F1Z5"
                            onChange={(v) =>
                                updateCompany("gstin", v)
                            }
                        />
                    </div>

                    <div className="flex">
                        <span className="font-semibold w-20">
                            PAN
                        </span>

                        <Editable
                            className="flex-1"
                            value={company.pan}
                            placeholder="ABCDE1234F"
                            onChange={(v) =>
                                updateCompany("pan", v)
                            }
                        />
                    </div>

                    <div className="flex items-start">
                        <span className="font-semibold w-20">
                            Address
                        </span>

                        <Editable
                            tag="div"
                            className="flex-1 whitespace-pre-wrap"
                            value={company.address}
                            placeholder="Company Address"
                            onChange={(v) =>
                                updateCompany("address", v)
                            }
                        />
                    </div>

                    <div className="flex">
                        <span className="font-semibold w-20">
                            Phone
                        </span>

                        <Editable
                            className="flex-1"
                            value={company.phone}
                            placeholder="+91 XXXXX XXXXX"
                            onChange={(v) =>
                                updateCompany("phone", v)
                            }
                        />
                    </div>

                    <div className="flex">
                        <span className="font-semibold w-20">
                            Email
                        </span>

                        <Editable
                            className="flex-1"
                            value={company.email}
                            placeholder="company@email.com"
                            onChange={(v) =>
                                updateCompany("email", v)
                            }
                        />
                    </div>

                    <div className="flex">
                        <span className="font-semibold w-20">
                            Website
                        </span>

                        <Editable
                            className="flex-1"
                            value={company.website}
                            placeholder="www.company.com"
                            onChange={(v) =>
                                updateCompany("website", v)
                            }
                        />
                    </div>

                </div>

                {/* Declaration */}

                <div className="mt-5 border rounded p-3 bg-gray-50">

                    <p className="text-xs font-semibold mb-2">
                        Declaration
                    </p>

                    <Editable
                        tag="div"
                        className="text-xs leading-5 whitespace-pre-wrap"
                        value={company.declaration}
                        placeholder="Declaration..."
                        onChange={(v) =>
                            updateCompany(
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