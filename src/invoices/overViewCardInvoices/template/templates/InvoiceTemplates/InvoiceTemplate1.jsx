import React from "react";

import InvoiceHeader from "./components/InvoiceHeader";
import CustomerDetails from "./components/CustomerDetails";
import InvoiceInfo from "./components/InvoiceInfo";
import SalesPersonDetails from "./components/SalesPersonDetails";
import InvoiceItemsTable from "./components/InvoiceItemsTable";
import InvoiceTotals from "./components/InvoiceTotals";
import NotesTerms from "./components/NotesTerms";
import BankDetails from "./components/BankDetails";
import Footer from "./components/Footer";

export default function InvoiceTemplate1({ invoice }) {
    if (!invoice) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                Invoice not found.
            </div>
        );
    }

    return (
        <div className="bg-white text-gray-800 min-h-screen">
            <InvoiceHeader />

            <div className="grid grid-cols-2 gap-8 px-8 py-6">
                <CustomerDetails />
                <InvoiceInfo />
            </div>

            <div className="px-8 pb-4">
                <SalesPersonDetails />
            </div>

            <div className="px-8">
                <InvoiceItemsTable />
            </div>

            <div className="flex justify-end px-8 mt-6">
                <InvoiceTotals />
            </div>

            <div className="grid grid-cols-2 gap-8 px-8 mt-8">
                <NotesTerms />
                <BankDetails />
            </div>

            <Footer />
        </div>
    );
}