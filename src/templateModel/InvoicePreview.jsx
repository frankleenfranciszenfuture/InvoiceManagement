import { useSelector } from "react-redux";
import invoiceTemplates from "../templateModel/templateRegistry";

const InvoicePreview = ({ invoice }) => {
  const invoiceTemplate = useSelector(
    (s) => invoice?.invoiceTemplate || s.invoice.invoiceTemplate,
  );

  const Template = invoiceTemplates.find(
    (t) => t.id === invoiceTemplate,
  )?.component;

  if (!invoice) return <p>Invoice not found</p>;
  if (!Template) return <p>Template not found</p>;

  return <Template invoice={invoice} />;
};

export default InvoicePreview;
