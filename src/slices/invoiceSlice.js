import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchInvoices,
  fetchInvoiceById,
  fetchCustomerInvoices,
  fetchInvoiceItems,
  fetchInvoiceItemById,
  fetchCustomers,
  deleteInvoice,
  fetchSalesPersons,
} from "../api/api";

// ============================
// Thunks
// ============================

// Load All Invoices
export const loadInvoices = createAsyncThunk(
  "invoice/loadInvoices",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchInvoices(params);

      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// 2. Fetch a single invoice detail
export const loadInvoiceById = createAsyncThunk(
  "invoice/loadInvoiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchInvoiceById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          error.message ||
          "Failed to load invoice details",
      );
    }
  },
);

// 3. Fetch invoices belonging to a specific customer
export const loadCustomerInvoices = createAsyncThunk(
  "invoice/loadCustomerInvoices",
  async ({ customerId, params }, { rejectWithValue }) => {
    try {
      const response = await fetchCustomerInvoices(customerId, params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          error.message ||
          "Failed to load customer invoices",
      );
    }
  },
);

// 4. Fetch all line items for an invoice
export const loadInvoiceItems = createAsyncThunk(
  "invoice/loadInvoiceItems",
  async (invoiceId, { rejectWithValue }) => {
    try {
      const response = await fetchInvoiceItems(invoiceId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to load invoice items",
      );
    }
  },
);

// 5. Fetch a specific single item inside an invoice context
export const loadInvoiceItemById = createAsyncThunk(
  "invoice/loadInvoiceItemById",
  async ({ invoiceId, itemId }, { rejectWithValue }) => {
    try {
      const response = await fetchInvoiceItemById(invoiceId, itemId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          error.message ||
          "Failed to load individual item data",
      );
    }
  },
);

export const removeInvoice = createAsyncThunk(
  "invoice/removeInvoice",
  async (id, { rejectWithValue }) => {
    try {
      await deleteInvoice(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Failed to delete invoice",
      );
    }
  },
);

export const loadCustomers = createAsyncThunk(
  "invoice/loadCustomers",
  async (params, { rejectWithValue }) => {
    try {
      const data = await fetchCustomers(params);
      console.log("Customers API:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ============================
// Initial State
// ============================

let itemIdCounter = 0;
const makeBlankItem = () => ({
  id: `item-${Date.now()}-${itemIdCounter++}`,
  description: "",
  quantity: 1,
  rate: 0,
  amount: 0,
  selected: false,
});

const initialState = {
  customer: {
    customers: [],
  },

  loading: false,
  error: null,

  invoices: [],
  selectedInvoice: null,

  customers: [],
  selectedCustomer: null,

  invoiceItems: [],
  selectedItem: null,

  // Product/service catalog used by the item picker dropdown in the item
  // table. This was previously missing entirely, which made
  // `state.invoice.itemMaster` undefined and crashed `(itemMaster ?? [])
  // .filter(...)` if that guard was ever dropped. Populate this via a
  // thunk (e.g. loadItemMaster) once you have an endpoint for it.
  itemMaster: [],

  customerName: "",
  salesPersonName: "",
  invoiceNumber: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  terms: "",
  customerNotes: "",
  orderNumber: "",
  salesPerson: "",
  subject: "",

  customerSearch: "",
  // salesPersons: [],
  salesPersonSearch: "",
  itemSearch: "",
  searchQuery: "",

  page: 0,
  pageSize: 5,
  totalElements: 0,
  totalPages: 0,

  openCustomer: false,
  openSalesPerson: false,
  openItemDropdown: false,
  openRowItemDropdown: false,

  selectedItemId: null,
  activeItemId: null,
  editingItemId: null,

  items: [makeBlankItem()],

  showSaveMenu: false,
  invoiceTemplate: "template1",
  simplifiedView: false,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      if (field in state) {
        state[field] = value;
      }
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },
    setSalesPersonName: (state, action) => {
      state.salesPersonName = action.payload;
    },
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },
    setInvoiceDate: (state, action) => {
      state.invoiceDate = action.payload;
    },
    setTerms: (state, action) => {
      state.terms = action.payload;
    },
    setDueDate: (state, action) => {
      state.dueDate = action.payload;
    },
    setCustomerNotes: (state, action) => {
      state.customerNotes = action.payload;
    },
    setCustomerSearch: (state, action) => {
      state.customerSearch = action.payload;
    },
    setSalesPersonSearch: (state, action) => {
      state.salesPersonSearch = action.payload;
    },
    setItemSearch: (state, action) => {
      state.itemSearch = action.payload;
    },
    toggleSimplifiedView: (state) => {
      state.simplifiedView = !state.simplifiedView;
    },
    setOpenCustomer: (state, action) => {
      state.openCustomer = action.payload;
    },
    setOpenSalesPerson: (state, action) => {
      state.openSalesPerson = action.payload;
    },
    setOpenItemDropdown: (state, action) => {
      state.openItemDropdown = action.payload;
    },
    setOpenRowItemDropdown: (state, action) => {
      state.openRowItemDropdown = action.payload;
    },
    setShowSaveMenu: (state, action) => {
      state.showSaveMenu = action.payload;
    },
    toggleSaveMenu: (state) => {
      state.showSaveMenu = !state.showSaveMenu;
    },
    setSelectedItemId: (state, action) => {
      state.selectedItemId = action.payload;
    },
    setActiveItemId: (state, action) => {
      state.activeItemId = action.payload;
    },
    // Component calls dispatch(addItem()) with no payload, so we can't rely
    // on action.payload here — build a fresh blank row ourselves. If a
    // payload IS passed (e.g. a prefilled item from elsewhere), use that
    // instead.
    addItem: (state, action) => {
      state.items.push(action.payload ?? makeBlankItem());
    },
    // Component dispatches { id, field, value } (see updateItem calls in
    // NewInvoice.jsx), not { id, updatedFields }. Support both shapes so
    // this works no matter which call site is used.
    updateItem: (state, action) => {
      const { id, field, value, updatedFields } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index === -1) return;

      if (updatedFields) {
        state.items[index] = { ...state.items[index], ...updatedFields };
      } else if (field) {
        state.items[index][field] = value;
      }

      // Keep amount in sync whenever quantity or rate changes.
      if (field === "quantity" || field === "rate" || updatedFields) {
        const qty = Number(state.items[index].quantity) || 0;
        const rate = Number(state.items[index].rate) || 0;
        state.items[index].amount = qty * rate;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setItemName: (state, action) => {
      const { id, itemName } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index].itemName = itemName;
      }
    },
    resetInvoice: (state) => {
      state.customerName = "";
      state.salesPersonName = "";
      state.invoiceNumber = "";
      state.invoiceDate = "";
      state.dueDate = "";
      state.terms = "";
      state.customerNotes = "";
      state.orderNumber = "";
      state.salesPerson = "";
      state.subject = "";
      state.customerSearch = "";
      state.salesPersonSearch = "";
      state.itemSearch = "";
      state.searchQuery = "";
      state.items = [makeBlankItem()];
      state.selectedInvoice = null;
      state.selectedItemId = null;
      state.activeItemId = null;
      state.editingItemId = null;
      state.showSaveMenu = false;
    },
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
      if (action.payload) {
        state.customerName = action.payload.customerName || "";
        state.salesPersonName = action.payload.salesPersonName || "";
        state.invoiceNumber = action.payload.invoiceNumber || "";
        state.invoiceDate = action.payload.invoiceDate || "";
        state.dueDate = action.payload.dueDate || "";
        state.terms = action.payload.terms || "";
        state.customerNotes = action.payload.customerNotes || "";
        state.orderNumber = action.payload.orderNumber || "";
        state.salesPerson = action.payload.salesPerson || "";
        state.subject = action.payload.subject || "";
        state.items =
          action.payload.items && action.payload.items.length
            ? action.payload.items
            : [makeBlankItem()];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- loadInvoices ----
      // NOTE: response.data is the full backend envelope:
      // { success, message, data: { content, page, size, totalElements, totalPages, first, last }, timestamp }
      // so the paginated payload lives at action.payload.data, not action.payload directly.
      .addCase(loadInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadInvoices.fulfilled, (state, action) => {
        state.loading = false;

        const pageData = action.payload.data || {};

        state.invoices = pageData.content || [];
        state.page = pageData.page ?? 0;
        state.pageSize = pageData.size ?? 5;
        state.totalElements = pageData.totalElements ?? 0;
        state.totalPages = pageData.totalPages ?? 0;
      })

      .addCase(loadInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch invoices";
      })

      // ---- loadInvoiceById ----
      .addCase(loadInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadInvoiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedInvoice = action.payload?.data || null;
      })
      .addCase(loadInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch invoice details";
      })

      // ---- loadCustomerInvoices ----
      .addCase(loadCustomerInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadCustomerInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch customer invoices";
      })

      // ---- loadInvoiceItems ----
      .addCase(loadInvoiceItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadInvoiceItems.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceItems = action.payload?.data || [];
      })
      .addCase(loadInvoiceItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch invoice items";
      })

      // ---- loadInvoiceItemById ----
      .addCase(loadInvoiceItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadInvoiceItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload?.data || null;
      })
      .addCase(loadInvoiceItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch invoice item";
      })

      // ---- removeInvoice ----
      .addCase(removeInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = state.invoices.filter(
          (inv) => inv.id !== action.payload,
        );
        if (state.totalElements > 0) {
          state.totalElements -= 1;
        }
      })
      .addCase(removeInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "An error occurred while deleting the invoice";
      })

      // ---- loadCustomers ----
      .addCase(loadCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadCustomers.fulfilled, (state, action) => {
        state.loading = false;

        const pageData = action.payload.data || {};

        state.customers = pageData.content || [];
      })

      .addCase(loadCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch customers";
      });
  },
});

// ==========================================
// Memoized Selectors
// ==========================================
export const selectTotal = (state) => {
  return (state.invoice?.items || []).reduce((sum, item) => {
    const amount = Number(item.amount) || 0;
    return sum + amount;
  }, 0);
};

export const {
  setField,
  setCustomerName,
  setSalesPersonName,
  setInvoiceNumber,
  setOrderNumber,
  setInvoiceDate,
  setTerms,
  setDueDate,
  toggleSimplifiedView,
  addItem,
  updateItem,
  removeItem,
  setCustomerNotes,
  resetInvoice,
  setItemName,
  setCustomerSearch,
  setOpenCustomer,
  setItemSearch,
  setOpenItemDropdown,
  setOpenRowItemDropdown,
  setSelectedItemId,
  setActiveItemId,
  setShowSaveMenu,
  toggleSaveMenu,
  setOpenSalesPerson,
  setSalesPersonSearch,
  setCurrentPage,
  setSelectedInvoice,
} = invoiceSlice.actions;

export const invoiceActions = invoiceSlice.actions;
export default invoiceSlice.reducer;
