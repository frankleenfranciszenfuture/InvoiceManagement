import { createSlice } from "@reduxjs/toolkit";

const views = [
  "All Invoices",
  "Active Invoices",
  "Inactive Invoices",
  "Draft Invoices",
];

const initialState = {
  selectedView: "All Invoices",
  invoiceStatus: "ALL",
  search: "",
  views: [
    { label: "All Invoices", value: "ALL" },
    { label: "Active Invoices", value: "ACTIVE" },
    { label: "Inactive Invoices", value: "INACTIVE" },
    { label: "Draft Invoices", value: "DRAFT" },
  ],
};

const invoiceViewSlice = createSlice({
  name: "invoiceView",
  initialState,
  reducers: {
    setOpenInvoice(state, action) {
      state.openInvoice = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },

    setSelectedView(state, action) {
      state.selectedView = action.payload;
    },

    setInvoiceStatus: (state, action) => {
      state.invoiceStatus = action.payload;
    },
  },
});

export const { setSelectedView, setSearch, setInvoiceStatus } =
  invoiceViewSlice.actions;
export default invoiceViewSlice.reducer;
