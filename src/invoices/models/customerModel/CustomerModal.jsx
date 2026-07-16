import { useDispatch, useSelector } from "react-redux";
import { Settings, Users2Icon, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {
    closeCustomerModal, closeModal
} from "../../../slices/Ui/uiSlice";

import {
    loadCustomers,
    addCustomer,
    editCustomer,
    removeCustomer
} from "../../../slices/customers/thunks/customerThunks";

import {
    validateCustomerForm,
    resetCustomerForm,
    setSelectedCustomer,
    setErrors,
    setCurrency,
    resetDirty,
    resetSelectedCustomer
} from "../../../slices/customers/customerSlices";
import toast from 'react-hot-toast';

import CustomerBasicForm from "../../../invoices/models/customerModel/CustomerBasicForm";
import CustomerTabs from "../../../invoices/models/customerModel/CustomerTabs";

export default function CustomerModal({
    mode = "page",
    onSuccess,
}) {
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const open = useSelector(
        (state) => state.ui.customerModalOpen
    );

    const customer = useSelector(
        (state) => state.customer.customerForm
    );

    const loading = useSelector(
        (state) => state.customer.loading
    );

    if (!open) return null;

    const handleClose = () => {
        dispatch(resetCustomerForm());
        dispatch(closeCustomerModal());
    };

    const handleSave = async (status) => {
        const errors = validateCustomerForm(customer);
        dispatch(setErrors(errors));

        if (Object.keys(errors).length > 0) {
            return;
        }


        try {
            const savedCustomer = await dispatch(
                addCustomer({
                    ...customer,
                    status: "ACTIVE",
                })
            ).unwrap();

            dispatch(resetDirty());
            dispatch(resetSelectedCustomer());
            dispatch(closeCustomerModal());

            await dispatch(
                loadCustomers({
                    page: 0,
                    size: 5,
                    search: "",
                    sortBy: "displayName",
                    direction: "asc",
                    status: savedCustomer.status,
                })
            );

            if (mode === "modal") {

                dispatch(closeCustomerModal());

                onSuccess?.(savedCustomer);

            } else {

                navigate(`/customers?status=${savedCustomer.status}`);
            }
        } catch (error) {
            toast.error(error?.message || error || "Failed to create customer");
        }
    };

    const handleCancel = () => {
        dispatch(resetDirty());

        if (mode === "modal") {
            dispatch(closeCustomerModal());
        } else {
            dispatch(closeModal());
            navigate(-1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 text-gray-600 font-sm flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-6">

            <div className="relative flex rounded-lg w-[700px] h-[100vh] max-w-7xl mt-2 flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-[fadeIn_.2s_ease]">

                {/* Header */}

                <div className="sticky top-2 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-2 ">
                    <div className="px-6 py-6 max-w-30xl w-full bg-blue-100 rounded">
                        <div className="flex items-center justify-between">
                            {/* Left Section */}
                            <div className="flex items-center gap-3">
                                {/* <div className="w-6 h-6 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 border border-gray-400 rounded-sm" />
                                </div> */}
                                <Users2Icon className="w-6 h-6" />
                                <h1 className="text-lg font-semibold text-gray-800">
                                    New Customer
                                </h1>


                            </div>

                            {/* Right Section */}
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="rounded-md p-2 transition hover:bg-gray-100"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Body */}

                <div className="flex-1 overflow-y-auto bg-white">

                    <div className="px-8 py-6">

                        <div className="mx-auto max-w-5xl">

                            <CustomerBasicForm />

                            <div className="mt-8">
                                <CustomerTabs />
                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="sticky bottom-0 z-20 flex items-center justify-between border-t border-gray-200 bg-gray-50 px-8 py-4">

                    <div className="text-xs text-gray-500">
                        Fields marked with
                        <span className="ml-1 text-red-500">*</span>
                        are required.
                    </div>

                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={loading}
                            className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">

                                    <svg
                                        className="h-4 w-4 animate-spin"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            opacity=".25"
                                        />

                                        <path
                                            d="M22 12a10 10 0 0 1-10 10"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        />
                                    </svg>

                                    Saving...

                                </div>
                            ) : (
                                "Save"
                            )}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}