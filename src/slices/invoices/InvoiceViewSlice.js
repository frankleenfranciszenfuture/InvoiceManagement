import { createSlice } from "@reduxjs/toolkit";

const views = [
  "All Invoices",
  "Active Invoices",
  "Inactive Invoices",
  "Draft Invoices",
];

const initialState = {
  selectedInvoiceView: "All Invoices",
  invoiceStatus: "ALL",
  search: "",
  views: [
    { label: "All Invoices", value: "ALL" },
    { label: "Active Invoices", value: "ACTIVE" },
    { label: "Inactive Invoices", value: "INACTIVE" },
    { label: "Draft Invoices", value: "DRAFT" },
  ],
};

const InvoiceViewSlice = createSlice({
  name: "invoiceView",
  initialState,
  reducers: {
    setOpenInvoiceView(state, action) {
      state.openInvoiceView = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },

    setSelectedInvoiceView(state, action) {
      state.selectedInvoiceView = action.payload;
    },

    setInvoiceStatus: (state, action) => {
      state.invoiceStatus = action.payload;
    },
  },
});

export const { setSelectedInvoiceView, setSearch, setInvoiceStatus } =
  InvoiceViewSlice.actions;
export default InvoiceViewSlice.reducer;
