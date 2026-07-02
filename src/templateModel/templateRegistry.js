// templates/templateRegistry.js
import InvoiceTemplate1 from "../templateModel/InvoiceTemplate1";
import InvoiceTemplate2 from "../templateModel/InvoiceTemplate2";
import InvoiceTemplate3 from "../templateModel/InvoiceTemplate3";

const invoiceTemplates = [
  { id: "template1", title: "Classic", component: InvoiceTemplate1 },
  { id: "template2", title: "Modern", component: InvoiceTemplate2 },
  { id: "template3", title: "Minimal", component: InvoiceTemplate3 },
];

export default invoiceTemplates;
