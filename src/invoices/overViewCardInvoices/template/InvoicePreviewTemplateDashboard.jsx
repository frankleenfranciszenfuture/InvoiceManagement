import React from "react";
import { useSelector } from "react-redux";
import invoiceTemplates from "../../../invoices/overViewCardInvoices/template/invoiceTemplateRegistry";

const InvoicePreviewTemplateDashboard = ({ invoice }) => {

    // Use invoice template from selected invoice first,
    // otherwise use the default template stored in Redux.
    const defaultTemplate = useSelector(
        (state) => state.invoice.invoiceTemplate
    );

    const templateId = invoice?.invoiceTemplate || defaultTemplate;

    const Template = invoiceTemplates.find(
        (t) => t.id === templateId
    )?.component;

    if (!invoice) {
        return (
            <div className="flex h-96 items-center justify-center text-gray-500">
                Select an invoice to preview.
            </div>
        );
    }

    if (!Template) {
        return (
            <div className="flex h-96 items-center justify-center text-red-500">
                Template not found.
            </div>
        );
    }

    return <Template invoice={invoice} />;
};

export default InvoicePreviewTemplateDashboard;