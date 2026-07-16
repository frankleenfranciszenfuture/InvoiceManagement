import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  fetchInvoiceById,
  fetchCustomerInvoices,
  searchInvoiceByStatus,
  generateInvoiceNumber,
  fetchInvoiceItems,
  fetchInvoiceItemById,
} from "../../../api/invoiceApi";

import { fetchCustomers } from "../../../api/CustomerApi";

export const loadInvoices = createAsyncThunk(
  "invoice/loadInvoices",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchInvoices(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==============================
// Create Invoice
// ==============================
export const addInvoice = createAsyncThunk(
  "invoice/addInvoice",
  async (data, { rejectWithValue }) => {
    console.log("Thunk received:", data);

    try {
      const response = await createInvoice(data);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==============================
// Update Invoice
// ==============================
export const editInvoice = createAsyncThunk(
  "invoice/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateInvoice(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==============================
// Delete Invoice
// ==============================
export const removeInvoice = createAsyncThunk(
  "invoice/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteInvoice(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==============================
// Get Invoice By Id
// ==============================
export const getInvoiceById = createAsyncThunk(
  "invoice/getInvoiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchInvoiceById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==============================
// Search By Status
// ==============================
export const getInvoicesByStatus = createAsyncThunk(
  "invoice/getInvoicesByStatus",
  async (params, { rejectWithValue }) => {
    try {
      const response = await searchInvoiceByStatus(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==============================
// Generate Invoice Number
// ==============================
export const loadInvoiceNumber = createAsyncThunk(
  "invoice/loadInvoiceNumber",
  async (_, { rejectWithValue }) => {
    try {
      const response = await generateInvoiceNumber();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==============================
// Invoice Items
// ==============================
export const getInvoiceItems = createAsyncThunk(
  "invoice/getInvoiceItems",
  async (invoiceId, { rejectWithValue }) => {
    try {
      const response = await fetchInvoiceItems(invoiceId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==============================
// Invoice Item By Id
// ==============================
export const getInvoiceItemById = createAsyncThunk(
  "invoice/getInvoiceItemById",
  async ({ invoiceId, itemId }, { rejectWithValue }) => {
    try {
      const response = await fetchInvoiceItemById(invoiceId, itemId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==============================
// Customer Invoices
// ==============================
export const loadCustomerInvoices = createAsyncThunk(
  "invoice/loadCustomerInvoices",
  async ({ customerId, params }, { rejectWithValue }) => {
    try {
      return await fetchCustomerInvoices(customerId, params);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const loadInvoiceCustomers = createAsyncThunk(
  "invoice/loadCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCustomers({
        page: 0,
        size: 1000,
        search: "",
        sortBy: "displayName",
        direction: "asc",
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
