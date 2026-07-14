import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import {
  loadInvoices,
  addInvoice,
  editInvoice,
  removeInvoice,
  getInvoiceById,
  getInvoicesByStatus,
  loadInvoiceNumber,
  getInvoiceItems,
  getInvoiceItemById,
  loadCustomerInvoices,
} from "./thunks/invoiceThunks";

// customers
import { loadCustomers } from "../../slices/customers/thunks/customerThunks";

//  itemMasters
import { loadItemMasters } from "../../slices/itemMasters/thunks/itemMasterThunks";

// SalesPerson
import { loadSalesPerson } from "../../slices/salesPerson/thunks/salesPersonThunks";

// ============================
// Helpers
// ============================

let itemIdCounter = 0;

export const makeBlankItem = () => ({
  id: `item-${Date.now()}-${itemIdCounter++}`,
  itemId: "",
  itemType: "",
  itemName: "",
  description: "",
  sellingPrice: 0,
  purchasePrice: 0,
  unit: "",
  quantity: 1,
  rate: 0,
  discount: 0,
  taxPercent: 0,
  amount: 0,
  selected: false,
});
// ============================
// Initial State
// ============================

const initialState = {
  // Loading / Error
  loading: false,
  error: null,

  // Invoice List
  invoices: [],
  selectedInvoice: null,

  // Pagination
  page: 0,
  pageSize: 10,
  totalPages: 0,
  totalElements: 0,

  // Invoice Meta
  invoiceNumber: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  terms: "",
  subject: "",
  customerNotes: "",
  orderNumber: "",
  referenceNumber: "",
  invoiceStatus: "ALL",

  // Customer
  customers: [],
  customerId: "",
  customerName: "",

  // Sales Person
  salesPersons: [],
  salesPersonId: "",
  salesPersonName: "",

  // Totals
  subTotal: 0,
  discountAmount: 0,
  taxAmount: 0,
  shippingCharges: 0,
  adjustment: 0,
  totalAmount: 0,

  // Dropdown Data
  itemMasters: [],

  // Invoice Items
  items: [],
  invoiceItems: [makeBlankItem()],
  selectedItem: null,
  selectedItemId: null,
  activeItemId: null,

  // Search
  searchQuery: "",
  customerSearch: "",
  salesPersonSearch: "",
  itemSearch: "",

  // UI
  openCustomer: false,
  openSalesPerson: false,
  openItemDropdown: false,
  openRowItemDropdown: false,
  showSaveMenu: false,
  showInvoiceMenu: false,
  simplifiedView: false,
  invoiceTemplate: "template1",
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    // ==========================
    // Generic Field Setters
    // ==========================
    // NOTE: setField and updateInvoiceField are functionally identical
    // (both do state[field] = value). Kept both since existing components
    // import either name — pick one going forward for new code.
    setField: (state, action) => {
      const { field, value } = action.payload;
      if (field in state) {
        state[field] = value;
      }
    },

    updateInvoiceField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    // ==========================
    // Invoice Meta
    // ==========================
    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
    },
    setInvoiceDate: (state, action) => {
      state.invoiceDate = action.payload;
    },
    setDueDate: (state, action) => {
      state.dueDate = action.payload;
    },
    setTerms: (state, action) => {
      state.terms = action.payload;
    },
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
    setOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },
    setCustomerNotes: (state, action) => {
      state.customerNotes = action.payload;
    },
    setInvoiceStatus: (state, action) => {
      state.invoiceStatus = action.payload;
    },

    // ==========================
    // Customer
    // ==========================
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },

    // ==========================
    // Sales Person
    // ==========================
    setSalesPersonId: (state, action) => {
      state.salesPersonId = action.payload;
    },
    setSalesPersonName: (state, action) => {
      state.salesPersonName = action.payload;
    },

    // ==========================
    // Search
    // ==========================
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
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

    // ==========================
    // UI
    // ==========================
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

    // showinvoice menu invoiceNavbar
    setShowInvoiceMenu: (state, action) => {
      state.showInvoiceMenu = action.payload;
    },

    toggleInvoiceMenu: (state) => {
      state.showInvoiceMenu = !state.showSaveMenu;
    },

    toggleSimplifiedView: (state) => {
      state.simplifiedView = !state.simplifiedView;
    },

    // ==========================
    // Pagination
    // ==========================
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },

    // ==========================
    // Invoice Items
    // ==========================
    setSelectedItemId: (state, action) => {
      state.selectedItemId = action.payload;
    },
    setActiveItemId: (state, action) => {
      state.activeItemId = action.payload;
    },

    addItem(state, action) {
      state.invoiceItems.push(action.payload ?? makeBlankItem());
    },

    // Component dispatches { id, field, value } (see updateItem calls in
    // NewInvoice.jsx), not { id, updatedFields }. Support both shapes so
    // this works no matter which call site is used.
    updateItem(state, action) {
      const { id, updatedFields, field, value } = action.payload;

      const index = state.invoiceItems.findIndex((item) => item.id === id);

      if (index === -1) return;

      if (updatedFields) {
        state.invoiceItems[index] = {
          ...state.invoiceItems[index],
          ...updatedFields,
        };
      } else {
        state.invoiceItems[index][field] = value;
      }

      const row = state.invoiceItems[index];

      row.amount =
        (Number(row.quantity) || 0) * (Number(row.rate) || 0) -
        (Number(row.discount) || 0);
    },

    removeItem(state, action) {
      state.invoiceItems = state.invoiceItems.filter(
        (item) => item.id !== action.payload,
      );
    },

    setItemName: (state, action) => {
      const { id, itemName } = action.payload;
      const index = state.itemMaster.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.itemMaster[index].itemName = itemName;
      }
    },

    // ==========================
    // Selected Invoice
    // ==========================
    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;

      if (!action.payload) return;

      state.invoiceNumber = action.payload.invoiceNumber;
      state.invoiceDate = action.payload.invoiceDate;
      state.dueDate = action.payload.dueDate;
      state.subject = action.payload.subject;
      state.customerNotes = action.payload.customerNotes;
      state.terms = action.payload.terms;
      state.orderNumber = action.payload.orderNumber;

      state.customerId = action.payload.customer?.id ?? "";
      state.customerName = action.payload.customer?.displayName ?? "";

      state.salesPersonId = action.payload.salesPerson?.id ?? "";
      state.salesPersonName = action.payload.salesPerson?.salesPersonName ?? "";

      state.items =
        action.payload.items?.length > 0
          ? action.payload.items
          : [makeBlankItem()];

      state.referenceNumber = action.payload.referenceNumber ?? "";
      state.subTotal = action.payload.subTotal ?? 0;
      state.discountAmount = action.payload.discountAmount ?? 0;
      state.taxAmount = action.payload.taxAmount ?? 0;
      state.shippingCharges = action.payload.shippingCharges ?? 0;
      state.adjustment = action.payload.adjustment ?? 0;
      state.totalAmount = action.payload.totalAmount ?? 0;
      state.invoiceStatus = action.payload.invoiceStatus ?? "ACTIVE";
    },

    // ==========================
    // Reset
    // ==========================
    resetInvoice: () => ({
      ...initialState,
      items: [makeBlankItem()],
    }),
  },

  extraReducers: (builder) => {
    builder
      // ==========================
      // Load All Invoices
      // ==========================
      .addCase(loadInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadInvoices.fulfilled, (state, action) => {
        console.log("Redux Invoice Payload:", action.payload);
        state.loading = false;

        state.invoices = action.payload.content || [];

        state.page = action.payload.page;

        state.pageSize = action.payload.size;

        state.totalElements = action.payload.totalElements;

        state.totalPages = action.payload.totalPages;
      })
      .addCase(loadInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Create Invoice
      // ==========================
      .addCase(addInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices.unshift(action.payload.data);
        state.selectedInvoice = action.payload.data;
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Update Invoice
      // ==========================
      .addCase(editInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editInvoice.fulfilled, (state, action) => {
        state.loading = false;

        const updatedInvoice = action.payload.data;
        const index = state.invoices.findIndex(
          (invoice) => invoice.id === updatedInvoice.id,
        );

        if (index !== -1) {
          state.invoices[index] = updatedInvoice;
        }

        state.selectedInvoice = updatedInvoice;
      })
      .addCase(editInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Delete Invoice
      // ==========================
      .addCase(removeInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = state.invoices.filter(
          (invoice) => invoice.id !== action.payload,
        );
        state.totalElements--;
      })
      .addCase(removeInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Get Invoice By Id
      // ==========================
      .addCase(getInvoiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedInvoice = action.payload.data;
      })
      .addCase(getInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Generate Invoice Number
      // ==========================
      .addCase(loadInvoiceNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadInvoiceNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceNumber = action.payload.invoiceNumber;
      })
      .addCase(loadInvoiceNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Customer Invoices
      // ==========================
      .addCase(loadCustomerInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCustomerInvoices.fulfilled, (state, action) => {
        console.log("Redux Invoice Payload:", action.payload);
        state.loading = false;

        state.invoices = action.payload.content || [];

        state.page = action.payload.page;

        state.pageSize = action.payload.size;

        state.totalElements = action.payload.totalElements;

        state.totalPages = action.payload.totalPages;
      })

      .addCase(loadCustomerInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch customer invoices";
      })

      // ==========================
      // Search Invoices By Status
      // ==========================
      .addCase(getInvoicesByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoicesByStatus.fulfilled, (state, action) => {
        state.loading = false;

        const pageData = action.payload.data;

        state.invoices = pageData.content || [];
        state.page = pageData.number ?? 0;
        state.pageSize = pageData.size ?? 10;
        state.totalElements = pageData.totalElements ?? 0;
        state.totalPages = pageData.totalPages ?? 0;
      })
      .addCase(getInvoicesByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Get All Invoice Items
      // ==========================
      .addCase(getInvoiceItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoiceItems.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceItems = action.payload.data || [];
      })
      .addCase(getInvoiceItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Get Invoice Item By Id
      // ==========================
      .addCase(getInvoiceItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoiceItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload.data;
      })
      .addCase(getInvoiceItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // customers
      // ==========================

      .addCase(loadCustomers.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadCustomers.fulfilled, (state, action) => {
        console.log("Redux Customer Payload:", action.payload);

        state.loading = false;

        state.customers = action.payload.content || [];

        state.page = action.payload.page;

        state.pageSize = action.payload.size;

        state.totalElements = action.payload.totalElements;

        state.totalPages = action.payload.totalPages;
      })

      .addCase(loadCustomers.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // ==========================
      // itemMasters
      // ==========================

      .addCase(loadItemMasters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadItemMasters.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Payload:", action.payload);
        state.itemMasters = action.payload;
      })
      .addCase(loadItemMasters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // salesPersons
      // ==========================

      .addCase(loadSalesPerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSalesPerson.fulfilled, (state, action) => {
        state.loading = false;
        state.salesPersons = action.payload;
      })
      .addCase(loadSalesPerson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ==========================================
// Memoized Selectors
// ==========================================
const selectItems = (state) => state.invoice.items ?? [];

export const selectSubTotal = createSelector([selectItems], (items) =>
  items.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 0) * (Number(item.rate) || 0),
    0,
  ),
);

export const selectDiscountAmount = createSelector([selectItems], (items) =>
  items.reduce((total, item) => total + (Number(item.discount) || 0), 0),
);

export const selectTaxAmount = createSelector([selectItems], (items) =>
  items.reduce((total, item) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const discount = Number(item.discount) || 0;
    const tax = Number(item.taxPercent) || 0;

    const taxable = qty * rate - discount;

    return total + (taxable * tax) / 100;
  }, 0),
);

export const selectGrandTotal = createSelector(
  [
    selectSubTotal,
    selectDiscountAmount,
    selectTaxAmount,
    (state) => Number(state.invoice.shippingCharges) || 0,
    (state) => Number(state.invoice.adjustment) || 0,
  ],
  (subtotal, discount, tax, shipping, adjustment) =>
    subtotal - discount + tax + shipping + adjustment,
);

export const selectInvoiceCount = (state) => state.invoice.totalElements;
export const selectSelectedInvoice = (state) => state.invoice.selectedInvoice;
export const selectInvoiceLoading = (state) => state.invoice.loading;
export const selectInvoiceError = (state) => state.invoice.error;

// ==========================================
// Actions
// ==========================================
export const {
  loading,

  // Generic
  setField,
  updateInvoiceField,

  // Invoice Meta
  setInvoiceNumber,
  setInvoiceDate,
  setDueDate,
  setTerms,
  setSubject,
  setOrderNumber,
  setCustomerNotes,
  setInvoiceStatus,

  // Customer
  setCustomerId,
  setCustomerName,

  // Sales Person
  setSalesPersonId,
  setSalesPersonName,

  // Search
  setSearchQuery,
  setCustomerSearch,
  setSalesPersonSearch,
  setItemSearch,

  // UI
  setOpenCustomer,
  setOpenSalesPerson,
  setOpenItemDropdown,
  setOpenRowItemDropdown,
  setShowSaveMenu,
  toggleSaveMenu,
  toggleSimplifiedView,

  setShowInvoiceMenu,
  toggleInvoiceMenu,

  // Pagination
  setCurrentPage,

  // Items
  setSelectedItemId,
  setActiveItemId,
  addItem,
  updateItem,
  removeItem,
  setItemName,

  // Selected Invoice / Reset
  setSelectedInvoice,
  resetInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
