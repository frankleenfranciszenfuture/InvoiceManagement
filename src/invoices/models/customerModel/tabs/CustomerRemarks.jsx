import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setField,
    clearFieldError,
} from "../../../../slices/customers/customerSlices";

export default function CustomerRemarks() {
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
        <div className="space-y-6">

            <div className="grid grid-cols-[180px_1fr] gap-4">

                <label className="text-sm font-medium mt-2">
                    Remarks
                </label>

                <textarea
                    rows={8}
                    value={customer.remarks || ""}
                    onChange={handleChange("remarks")}
                    placeholder="Enter remarks..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

        </div>
    );
}