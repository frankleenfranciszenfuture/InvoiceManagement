import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../slices/customers/customerSlices";

import CustomerOtherDetails from "./tabs/CustomerOtherDetails";
import CustomerAddress from "./tabs/CustomerAddress";
import CustomerCustomFields from "./tabs/CustomerCustomFields";
import CustomerRemarks from "./tabs/CustomerRemarks";

export default function CustomerTabs() {
    const dispatch = useDispatch();

    const activeTab = useSelector(
        (state) => state.customer.activeTab
    );

    const tabs = [
        "Other Details",
        "Address",
        "Custom Fields",
        "Remarks",
    ];

    return (
        <div className="mt-8">

            {/* Tabs */}
            <div className="border-b flex gap-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => dispatch(setActiveTab(tab))}
                        className={`pb-2 text-sm ${activeTab === tab
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === "Other Details" && <CustomerOtherDetails />}
                {activeTab === "Address" && <CustomerAddress />}
                {activeTab === "Custom Fields" && <CustomerCustomFields />}
                {activeTab === "Remarks" && <CustomerRemarks />}
            </div>

        </div>
    );
}