import { useSelector } from "react-redux";

export default function useSelectedInvoice() {
    return useSelector((state) => state.invoice.selectedInvoice);
}