import { useDispatch, useSelector } from "react-redux";

import {
    closeInvoiceNumberModal,
} from "../../../../slices/Ui/uiSlice";


import {
    updateInvoiceNumberPreference
} from "../../../../slices/invoices/invoiceSlice";



export default function InvoiceNumberPreferenceModal({
    onSave,
    onClose
}) {


    const dispatch = useDispatch();



    const {
        prefix,
        nextNumber,
        mode

    } = useSelector(
        state => state.invoice.invoiceNumberPreference
    );



    const handleSave = () => {


        const finalNumber =
            prefix + nextNumber;



        onSave(finalNumber);



        dispatch(
            closeInvoiceNumberModal()
        );


    };



    return (

        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-start pt-2 px-4 animate-overlay">

            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden animate-modal">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Configure Invoice Number Preferences
                    </h2>

                    <button
                        onClick={() => dispatch(closeInvoiceNumberModal())}
                        className="w-8 h-8 rounded-full hover:bg-gray-200 transition flex items-center justify-center text-red-700 hover:text-red-500"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">

                    <p className="text-sm text-gray-600 leading-6">
                        Your invoice numbers are currently generated automatically.
                        You can customize the prefix, next number, or switch to manual numbering.
                    </p>

                    {/* AUTO */}
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="radio"
                            checked={mode === "AUTO"}
                            onChange={() =>
                                dispatch(
                                    updateInvoiceNumberPreference({
                                        mode: "AUTO",
                                    })
                                )
                            }
                            className="mt-1"
                        />

                        <span className="text-sm text-gray-700">
                            Continue auto-generating invoice numbers
                        </span>
                    </label>

                    {/* Prefix + Number */}
                    <div className="grid grid-cols-2 gap-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Prefix
                            </label>

                            <input
                                value={prefix}
                                onChange={(e) =>
                                    dispatch(
                                        updateInvoiceNumberPreference({
                                            prefix: e.target.value,
                                        })
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Next Number
                            </label>

                            <input
                                value={nextNumber}
                                onChange={(e) =>
                                    dispatch(
                                        updateInvoiceNumberPreference({
                                            nextNumber: e.target.value,
                                        })
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                    </div>

                    {/* MANUAL */}
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="radio"
                            checked={mode === "MANUAL"}
                            onChange={() =>
                                dispatch(
                                    updateInvoiceNumberPreference({
                                        mode: "MANUAL",
                                    })
                                )
                            }
                            className="mt-1"
                        />

                        <span className="text-sm text-gray-700">
                            Enter invoice numbers manually
                        </span>
                    </label>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">

                    <button
                        onClick={() => dispatch(closeInvoiceNumberModal())}
                        className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>
    )

}