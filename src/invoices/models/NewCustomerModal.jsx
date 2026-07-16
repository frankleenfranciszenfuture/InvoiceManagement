import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import CreateCustomer from "../../customers/pages/CreateCustomer";

export default function NewCustomerModal() {
    const dispatch = useDispatch();

    const open = useSelector(
        state => state.ui.customerModalOpen
    );

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="bg-white rounded-lg w-[750px] h-[95vh] mb-8 overflow-hidden">

                <CreateCustomer
                    mode="modal"
                    onSuccess={(customer) => {
                        console.log(customer);
                    }}
                />
            </div>

        </div>
    );
}