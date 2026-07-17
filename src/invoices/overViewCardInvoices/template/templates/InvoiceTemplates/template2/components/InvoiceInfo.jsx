import React from "react";
import Editable from "./Editable";

export default function InvoiceInfo({
    invoice,
    updateInvoice,
}) {
    const updateField = (field, value) => {
        updateInvoice(field, value);
    };

    const Row = ({ label, field, placeholder = "" }) => (
        <div className="grid grid-cols-[140px_1fr] border-b last:border-b-0">
            <div className="bg-gray-50 border-r px-3 py-2 text-sm font-medium">
                {label}
            </div>

            <Editable
                className="px-3 py-2 block min-h-[36px]"
                value={invoice[field] || ""}
                placeholder={placeholder}
                onChange={(v) => updateField(field, v)}
            />
        </div>
    );

    return (
        <div>

            {/* Header */}

            <div className="bg-gray-100 border-b px-4 py-3">
                <h2 className="text-xl font-bold">
                    Invoice Details
                </h2>
            </div>

            {/* Details */}

            <div>

                <Row
                    label="Invoice No."
                    field="invoiceNumber"
                    placeholder="INV-00001"
                />

                <Row
                    label="Invoice Date"
                    field="invoiceDate"
                    placeholder="01/01/2026"
                />

                <Row
                    label="Due Date"
                    field="dueDate"
                    placeholder="10/01/2026"
                />

                <Row
                    label="Order No."
                    field="orderNumber"
                    placeholder="ORD-1001"
                />

                <Row
                    label="Order Date"
                    field="orderDate"
                    placeholder="01/01/2026"
                />

                <Row
                    label="PO Number"
                    field="poNumber"
                    placeholder="PO-1001"
                />

                <Row
                    label="PO Date"
                    field="poDate"
                    placeholder="01/01/2026"
                />

                <Row
                    label="State"
                    field="state"
                    placeholder="Tamil Nadu"
                />

                <Row
                    label="State Code"
                    field="stateCode"
                    placeholder="33"
                />

                <Row
                    label="Place of Supply"
                    field="placeOfSupply"
                    placeholder="Coimbatore"
                />

                <Row
                    label="Reverse Charge"
                    field="reverseCharge"
                    placeholder="No"
                />

                <Row
                    label="Vehicle No."
                    field="vehicleNumber"
                    placeholder="TN38AB1234"
                />

                <Row
                    label="Transport"
                    field="transportName"
                    placeholder="Transport Name"
                />

                <Row
                    label="LR No."
                    field="lrNumber"
                    placeholder="LR000123"
                />

                <Row
                    label="E-Way Bill"
                    field="ewayBillNumber"
                    placeholder="123456789012"
                />

                <Row
                    label="Dispatch Through"
                    field="dispatchThrough"
                    placeholder="Courier"
                />

                <Row
                    label="Destination"
                    field="destination"
                    placeholder="Chennai"
                />

            </div>

        </div>
    );
}