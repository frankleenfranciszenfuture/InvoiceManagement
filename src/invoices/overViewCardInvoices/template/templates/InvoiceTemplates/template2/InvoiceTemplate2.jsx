import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    setSelectedInvoice,
    addItem,
    removeItem,
    updateItem,
    updateBank,
    updateTax,
} from "../../../../../../slices/invoices/invoiceSlice";

import {
    fmt,
    calculateInvoice,
} from "../template2/helpers";

import "../template2/styles.css";

import CompanyHeader from "./components/CompanyHeader";
import InvoiceInfo from "./components/InvoiceInfo";
import CustomerSection from "./components/CustomerSection";
import ItemsTable from "./components/ItemsTable";
import TotalsSection from "./components/TotalsSection";
import TaxSummary from "./components/TaxSummary";
import BankSection from "./components/BankSection";
import SignatureSection from "./components/SignatureSection";
import FooterSection from "./components/FooterSection";

export default function InvoiceTemplate2({ invoice: invoiceProp }) {
    const dispatch = useDispatch();

    const invoice = useSelector(
        (state) => invoiceProp ?? state.invoice.selectedInvoice
    );

    if (!invoice) {
        return (
            <div className="flex justify-center items-center h-96">
                <h2 className="text-gray-500 text-lg">
                    Invoice not found
                </h2>
            </div>
        );
    }

    //----------------------------------------------------
    // Generic Update
    //----------------------------------------------------

    const updateInvoice = (field, value) => {
        dispatch(
            setSelectedInvoice({
                ...invoice,
                [field]: value,
            })
        );
    };

    //----------------------------------------------------
    // Totals
    //----------------------------------------------------

    const totals = calculateInvoice(invoice.items);

    //----------------------------------------------------
    // Item Actions
    //----------------------------------------------------

    const handleAddItem = () => dispatch(addItem());

    const handleRemoveItem = (index) =>
        dispatch(removeItem(index));

    const handleUpdateItem = (index, field, value) =>
        dispatch(
            updateItem({
                index,
                field,
                value,
            })
        );

    //----------------------------------------------------
    // Render
    //----------------------------------------------------

    return (
        <div className="bg-gray-100 py-8 px-6 flex justify-center">

            <div className="invoice-page shadow-xl">

                {/* Header */}

                <div className="grid grid-cols-2 border-b">

                    <CompanyHeader
                        invoice={invoice}
                        updateInvoice={updateInvoice}
                    />

                    <InvoiceInfo
                        invoice={invoice}
                        updateInvoice={updateInvoice}
                    />

                </div>

                {/* Customer */}

                <CustomerSection
                    invoice={invoice}
                    updateInvoice={updateInvoice}
                />

                {/* Items */}

                <ItemsTable
                    invoice={invoice}
                    fmt={fmt}
                    onAddItem={handleAddItem}
                    onRemoveItem={handleRemoveItem}
                    onUpdateItem={handleUpdateItem}
                />

                {/* Totals */}

                <TotalsSection
                    invoice={invoice}
                    totals={totals}
                    fmt={fmt}
                    dispatch={dispatch}
                    updateTax={updateTax}
                    updateInvoice={updateInvoice}
                />

                {/* GST Summary */}

                <TaxSummary
                    invoice={invoice}
                    fmt={fmt}
                />

                {/* Bottom */}

                <div className="grid grid-cols-2 border-t">

                    <BankSection
                        invoice={invoice}
                        dispatch={dispatch}
                        updateBank={updateBank}
                    />

                    <SignatureSection
                        invoice={invoice}
                        updateInvoice={updateInvoice}
                    />

                </div>

                {/* Footer */}

                <FooterSection
                    invoice={invoice}
                    updateInvoice={updateInvoice}
                />

            </div>

        </div>
    );
}