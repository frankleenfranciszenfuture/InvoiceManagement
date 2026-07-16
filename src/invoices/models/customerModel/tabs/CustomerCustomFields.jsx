import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setField,
    clearFieldError,
} from "../../../../slices/customers/customerSlices";

export default function CustomerCustomFields() {
    const dispatch = useDispatch();

    const customer = useSelector(
        (state) => state.customer.customerForm
    );

    const handleChange = (field) => (e) => {
        dispatch(
            setField({
                field,
                value: e.target.value,
            })
        );

        dispatch(clearFieldError(field));
    };

    return (
        <div className="space-y-5">

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label className="text-sm font-medium">
                    Customer Code
                </label>

                <input
                    type="text"
                    value={customer.customerCode || ""}
                    onChange={handleChange("customerCode")}
                    className="w-full rounded-md border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter customer code"
                />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label className="text-sm font-medium">
                    Reference Number
                </label>

                <input
                    type="text"
                    value={customer.referenceNumber || ""}
                    onChange={handleChange("referenceNumber")}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter reference number"
                />
            </div>

            <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                <label className="text-sm font-medium">
                    Customer Group
                </label>

                <input
                    type="text"
                    value={customer.customerGroup || ""}
                    onChange={handleChange("customerGroup")}
                    className="w-full rounded-md border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter customer group"
                />
            </div>

        </div>
    );
}