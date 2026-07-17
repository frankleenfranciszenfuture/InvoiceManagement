import React from "react";
import Editable from "./Editable";

export default function FooterSection({
    invoice,
    updateInvoice,
}) {
    const update = (field, value) => {
        updateInvoice(field, value);
    };

    return (
        <div className="border-t">

            {/* Amount In Words */}

            <div className="border-b">

                <div className="bg-gray-100 px-4 py-2 font-semibold">
                    Amount In Words
                </div>

                <div className="p-4">

                    <Editable
                        tag="div"
                        className="font-medium text-sm min-h-[40px] block"
                        value={invoice.amountInWords}
                        placeholder="Amount In Words"
                        onChange={(v) =>
                            update(
                                "amountInWords",
                                v
                            )
                        }
                    />

                </div>

            </div>

            {/* Notes + Terms */}

            <div className="grid grid-cols-2">

                {/* Notes */}

                <div className="border-r">

                    <div className="bg-gray-100 border-b px-4 py-2 font-semibold">
                        Notes
                    </div>

                    <div className="p-4">

                        <Editable
                            tag="div"
                            className="min-h-[120px] whitespace-pre-wrap block"
                            value={invoice.notes}
                            placeholder="Additional Notes"
                            onChange={(v) =>
                                update(
                                    "notes",
                                    v
                                )
                            }
                        />

                    </div>

                </div>

                {/* Terms */}

                <div>

                    <div className="bg-gray-100 border-b px-4 py-2 font-semibold">
                        Terms & Conditions
                    </div>

                    <div className="p-4">

                        <Editable
                            tag="div"
                            className="min-h-[120px] whitespace-pre-wrap block"
                            value={invoice.terms}
                            placeholder="Terms & Conditions"
                            onChange={(v) =>
                                update(
                                    "terms",
                                    v
                                )
                            }
                        />

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="border-t bg-gray-50 px-5 py-4">

                <div className="flex justify-between items-center">

                    <div>

                        <Editable
                            className="block text-lg font-bold"
                            value={invoice.footerTitle}
                            placeholder="Thank You!"
                            onChange={(v) =>
                                update(
                                    "footerTitle",
                                    v
                                )
                            }
                        />

                        <Editable
                            className="block text-sm text-gray-600"
                            value={invoice.footerSubtitle}
                            placeholder="We appreciate your business."
                            onChange={(v) =>
                                update(
                                    "footerSubtitle",
                                    v
                                )
                            }
                        />

                    </div>

                    <div className="text-right space-y-1">

                        <Editable
                            className="block"
                            value={invoice.footerPhone}
                            placeholder="+91 XXXXX XXXXX"
                            onChange={(v) =>
                                update(
                                    "footerPhone",
                                    v
                                )
                            }
                        />

                        <Editable
                            className="block"
                            value={invoice.footerEmail}
                            placeholder="company@email.com"
                            onChange={(v) =>
                                update(
                                    "footerEmail",
                                    v
                                )
                            }
                        />

                        <Editable
                            className="block"
                            value={invoice.footerWebsite}
                            placeholder="www.company.com"
                            onChange={(v) =>
                                update(
                                    "footerWebsite",
                                    v
                                )
                            }
                        />

                    </div>

                </div>

                <div className="mt-5 border-t pt-3 text-center text-xs text-gray-500">

                    <Editable
                        value={invoice.footerCopyright}
                        placeholder="This is a computer generated invoice."
                        onChange={(v) =>
                            update(
                                "footerCopyright",
                                v
                            )
                        }
                    />

                </div>

            </div>

        </div>
    );
}