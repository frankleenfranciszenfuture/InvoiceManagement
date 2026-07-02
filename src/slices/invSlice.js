import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/api";

export const loadInvoices = createAsyncThunk(
  "invoices/loadAll",
  async (search, { rejectWithValue }) => {
    try {
      const r = await api.fetchInvoices(search);
      return r.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const addInvoice = createAsyncThunk(
  "invoices/add",
  async (data, { rejectWithValue }) => {
    try {
      const r = await api.createInvoice(data);
      return r.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const editInvoice = createAsyncThunk(
  "invoices/edit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const r = await api.updateInvoice(id, data);
      return r.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const removeInvoice = createAsyncThunk(
  "invoices/remove",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteInvoice(id);
      return id;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

const emptyAddress = {
  attention: "",
  country: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  pinCode: "",
  phoneCode: "+91",
  phone: "",
  faxNumber: "",
};

const initialState = {
  customerName: "",
  invoiceNumber: "INV-000001",
  invoiceDate: "2026-06-16",
  dueDate: "2026-06-16",
  terms: "Due on Receipt",
  customerNotes: "Thanks for your business.",
  loading: false,
  error: null,

  customers: [
    {
      id: 1,
      customerName: "ABC Technologies Pvt Ltd",
      tagline: "Your Business Partner",
      invoiceNumber: "INV-000001",
      invoiceTo: {
        name: "Larson Deo",
        phone: "+123-456-8890",
        email: "ABC@gssite.com",
        address: "123 Anywhere St., Any City, ST 12345",
      },
      invoiceDate: "2026-06-25",
      administrator: "Drew Feig",
      bank: {
        name: "Francisco Andrade",
        account: "1234567890",
      },
      tax: 18,
      terms: "02/07/2026",
      workPhone: "08045678901",

      items: [
        {
          id: 1,
          itemName: "Milk",
          quantity: 2,
          unitPrice: 100,
          taxPercent: 18,
          totalAmount: 236,
        },

        {
          id: 2,
          itemName: "Bread",
          quantity: 3,
          unitPrice: 50,
          taxPercent: 18,
          totalAmount: 150,
        },
      ],
    },
    {
      id: 2,
      customerName: "XYZ Enterprises",
      tagline: "Your Business Partner",
      invoiceNumber: "INV-000002",
      invoiceTo: {
        name: "Marceline Anderson",
        phone: "+123-456-7890",
        email: "hello@reallygreatsite.com",
        address: "123 Anywhere St., Any City, ST 12345",
      },
      invoiceDate: "2026-06-27",
      administrator: "Drew Feig",
      bank: {
        name: "John Abiragam",
        account: "9087654321",
      },
      tax: 18,
      terms: "02/07/2026",
      workPhone: "08047658901",
      items: [
        {
          id: 2,
          itemName: "Bread",
          quantity: 2,
          unitPrice: 100,
          taxPercent: 1,
          totalAmount: 200,
        },
      ],
    },
    {
      id: 3,
      customerName: "John Doe",
      invoiceNumber: "INV-000003",
      invoiceDate: "2026-06-29",
      terms: "02/07/2026",
      workPhone: "08065478901",
    },

    {
      id: 4,
      customerName: "Ben d",
      invoiceNumber: "INV-000004",
      invoiceDate: "25/06/2026",
      terms: "02/07/2026",
      workPhone: "09085678901",
    },

    {
      id: 5,
      customerName: "Rose R",
      invoiceNumber: "INV-000005",
      invoiceDate: "25/06/2026",
      terms: "02/07/2026",
      workPhone: "02212345678",
    },

    {
      id: 6,
      customerName: "Mark Mr",
      invoiceNumber: "INV-000005",
      invoiceDate: "2026-06-16",
      terms: "02/07/2026",
      workPhone: "02212345678",
    },
  ],

  salesPersons: [
    {
      id: 1,
      salesPersonName: "Hemleen",
      mail: "hem@gmail.com",
      phone: "9876567866",
    },

    {
      id: 2,
      salesPersonName: "Felix",
      mail: "hem@gmail.com",
      phone: "9876567654",
    },
  ],

  page: 1,
  pageSize: 5,
  totalElements: 3,
  totalPages: 1,
  currentPage: 0,
  searchQuery: "",
  totalYouPay: 25000,
  totalYouCollect: 75000,
  customerSearch: "",
  salesPersonSearch: "",
  openCustomer: false,
  openSalesPerson: false,

  itemMaster: [
    { id: 1, itemName: "Milk", rate: 200 },
    { id: 2, itemName: "Bread", rate: 50 },
    { id: 3, itemName: "Butter", rate: 120 },
    { id: 4, itemName: "Rice", rate: 80 },
  ],

  items: [
    {
      id: 1,
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ],

  orderNumber: "",
  salesPerson: "",
  subject: "",

  itemSearch: "",
  openItemDropdown: false,
  openRowItemDropdown: false,

  selectedItemId: null,
  activeItemId: null,
  editingItemId: null,

  showSaveMenu: false,

  selectedInvoice: null,

  invoiceTemplate: "template1",
};

const invSlice = createSlice({
  name: "invoices",
  initialState,
  // initialState: { list: [], loading: false, error: null },
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    setCustomerName: (state, action) => {
      state.customerName = action.payload;
    },

    setSalesPersonName: (state, action) => {
      state.salesPersonName = action.payload;
    },

    setCustomerSearch: (state, action) => {
      state.customerSearch = action.payload;
    },

    setSalesPersonSearch: (state, action) => {
      state.salesPersonSearch = action.payload;
    },

    setOpenCustomer: (state, action) => {
      state.openCustomer = action.payload;
    },

    setOpenSalesPerson: (state, action) => {
      state.openSalesPerson = action.payload;
    },

    setInvoiceNumber: (state, action) => {
      state.invoiceNumber = action.payload;
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

    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },

    toggleSimplifiedView: (state) => {
      state.simplifiedView = !state.simplifiedView;
    },

    addItem: (state) => {
      state.items.push({
        id: Date.now(),
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
      });
    },

    updateItem: (state, action) => {
      const { id, field, value } = action.payload;

      const item = state.items.find((i) => i.id === id);

      if (item) {
        item[field] = value;

        item.amount = Number(item.quantity || 0) * Number(item.rate || 0);
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    setCustomerNotes: (state, action) => {
      state.customerNotes = action.payload;
    },

    resetInvoice: () => ({
      ...initialState,
    }),

    removeInvoiceLocal: (state, action) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload,
      );
    },

    changeInvoiceStatus: (state, action) => {
      const { id, status } = action.payload;

      const invoice = state.invoices.find((invoice) => invoice.id === id);

      if (invoice) {
        invoice.status = status;
      }
    },

    //add ordersales

    setOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },
    setSalesPerson: (state, action) => {
      state.salesperson = action.payload;
    },

    setSubject: (state, action) => {
      state.subject = action.payload;
    },

    // item search

    setItemName: (state, action) => {
      const { id, itemName } = action.payload;

      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.description = itemName;
      }
    },

    setItemSearch: (state, action) => {
      state.itemSearch = action.payload;
    },

    setOpenItemDropdown: (state, action) => {
      state.openItemDropdown = action.payload;
    },

    setOpenRowItemDropdown: (state, action) => {
      state.openRowItemDropdown = action.payload;
    },
    setSelectedItemId: (state, action) => {
      state.selectedItemId = action.payload;
    },

    setActiveItemId: (state, action) => {
      state.activeItemId = action.payload;
    },

    setEditingItemId: (state, action) => {
      state.editingItemId = action.payload;
    },

    setShowSaveMenu: (state, action) => {
      state.showSaveMenu = action.payload;
    },

    toggleSaveMenu: (state) => {
      state.showSaveMenu = !state.showSaveMenu;
    },

    setInvoiceTemplate: (state, action) => {
      console.log("Reducer called:", action.payload);

      state.invoiceTemplate = action.payload;
    },

    setSelectedInvoice: (state, action) => {
      console.log("Reducer called:", action.payload);

      state.selectedInvoice = action.payload;
    },

    updateBank: (state, action) => {
      const { field, value } = action.payload;

      if (state.selectedInvoice?.bank) {
        state.selectedInvoice.bank[field] = value;
      }
    },

    updateTax: (state, action) => {
      if (state.selectedInvoice) {
        state.selectedInvoice.tax = action.payload.value;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadInvoices.fulfilled, (state, action) => {
        state.loading = false;

        // Use API data only if it exists
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.invoices = action.payload;
        }
      })

      .addCase(loadInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addInvoice.fulfilled, (state, action) => {
        state.invoices.unshift(action.payload);
      })

      .addCase(editInvoice.fulfilled, (state, action) => {
        const index = state.invoices.findIndex(
          (invoice) => invoice.id === action.payload.id,
        );

        if (index !== -1) {
          state.invoices[index] = action.payload;
        }

        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })

      .addCase(removeInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter(
          (invoice) => invoice.id !== action.payload,
        );
      });
  },
});

export const {
  setCustomerName,
  setSalesPersonName,
  setInvoiceNumber,
  setInvoiceDate,
  setTerms,
  setDueDate,
  setField,
  setCurrentPage,
  toggleSimplifiedView,

  setCustomerNotes,
  resetInvoice,
  removeInvoiceLocal,
  changeInvoiceStatus,
  setCustomerSearch,
  setSalesPersonSearch,
  setOpenCustomer,
  setOpenSalesPerson, //salesperson

  //items
  itemMaster,
  itemSearch,
  openItemDropdown,
  setItemSearch,
  setOpenItemDropdown,
  setOpenRowItemDropdown,
  setSelectedItemId,
  setActiveItemId,
  setEditingItemId,
  setItemName,
  addItem,
  updateItem,
  removeItem,

  updateBank,

  setShowSaveMenu,
  toggleSaveMenu,

  setSelectedInvoice,

  setInvoiceTemplate,
  updateTax,

  setOrderNumber,
  setSalesPerson,
  setSubject,
} = invSlice.actions;

export const selectTotal = (state) =>
  (state.invoice?.items || []).reduce(
    (sum, item) => sum + (item.amount || 0),
    0,
  );

export default invSlice.reducer;
