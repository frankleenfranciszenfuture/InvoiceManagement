import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/api";
import { toast } from "react-toastify";

export const loadCustomers = createAsyncThunk(
  "customers/loadAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.fetchCustomers(params);

      return response.data; // IMPORTANT: keep full backend response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getCustomerById = createAsyncThunk(
  "customers/getCustomerById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.fetchCustomerById(id);
      return res.data.data;
    } catch (error) {
      console.error(error);

      return rejectWithValue(error.message);
    }
  },
);

export const addCustomer = createAsyncThunk(
  "customers/add",
  async (customer, { rejectWithValue }) => {
    try {
      const response = await api.createCustomer(customer);
      console.log(customer);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateCustomerAddress = createAsyncThunk(
  "customers/updateAddress",
  async ({ customerId, billingAddress }, { rejectWithValue }) => {
    try {
      const response = await api.updateCustomerAddress(
        customerId,
        billingAddress,
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const saveCustomer = createAsyncThunk(
  "customer/saveCustomer",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { selectedCustomer } = getState().customer;

      const response = await api.updateCustomer(
        selectedCustomer.id,
        selectedCustomer,
      );

      console.log("Update Response:", response);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const editCustomer = createAsyncThunk(
  "customers/edit",
  async ({ id, data }, { rejectWithValue }) => {
    console.log("PUT Body:", data);

    try {
      const response = await api.updateCustomer(id, data);
      return response;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.message);
    }
  },
);

export const removeCustomer = createAsyncThunk(
  "customers/remove",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteCustomer(id);
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

const emptyContactPerson = {
  salutation: "",
  firstName: "",
  lastName: "",
  email: "",
  workPhone: "",
  mobile: "",
  skype: "",
  designation: "",
  department: "",
  portalAccess: false,
  profileImage: null,
};

const initialState = {
  // Form Fields
  customerType: "Business",
  salutation: "",
  firstName: "",
  lastName: "",
  companyName: "",
  displayName: "",
  currency: "",
  email: "",
  workPhoneCode: "+91",
  workPhone: "",
  mobileCode: "+91",
  mobile: "",
  customerLanguage: "",
  pan: "",
  paymentTerms: "Due on Receipt",
  enablePortal: false,
  websiteUrl: "",
  department: "",
  designation: "",
  twitter: "",
  skype: "",
  facebook: "",
  activeTab: "Other Details",

  billingAddress: { ...emptyAddress },
  shippingAddress: { ...emptyAddress },

  // Table Data
  customers: [],

  page: 0,
  pageSize: 5,
  totalElements: 0,
  totalPages: 0,

  searchQuery: "",
  sortBy: "displayName",
  direction: "asc",

  totalYouPay: 0,
  totalYouCollect: 0,

  errors: {},

  selectedCustomer: null,

  activeTab: "Dashboard",

  customerTypes: ["Business", "Individual"],

  customerTypeSearch: "",
  openCustomerType: false,
  openCustomerLanguage: false,
  customerLanguageSearch: "",
  customerLanguage: "",

  paymentTermsSearch: "",
  openPaymentTerms: false,

  editingField: null,

  contactForm: { ...emptyContactPerson },

  contactPersons: [],

  activities: [],

  recentActivities: [],

  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  // initialState: { list: [], loading: false, error: null },
  reducers: {
    setField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;

      // Clear error when user types
      if (state.errors[field]) {
        delete state.errors[field];
      }
    },

    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    // setIsEditingCustomerType: (state, action) => {
    //   state.isEditingCustomerType = action.payload;
    // },

    setEditingField: (state, action) => {
      state.editingField = action.payload;
    },

    saveCustomerType: (state) => {
      state.customer.customerType = state.editCustomerType;
      state.isEditingCustomerType = false;
    },

    cancelCustomerType: (state) => {
      state.editCustomerType = state.customer.customerType;
      state.isEditingCustomerType = false;
    },

    validateCustomer: (state) => {
      const errors = {};

      if (!state.firstName.trim()) errors.firstName = "Please enter first name";

      if (!state.lastName.trim()) errors.lastName = "Please enter last name";

      if (!state.companyName.trim())
        errors.companyName = "Please enter company name";

      if (!state.displayName.trim())
        errors.displayName = "Please enter display name";

      if (!state.currency) errors.currency = "Please select currency";

      if (!state.email.trim()) errors.email = "Please enter email";

      if (!/\S+@\S+\.\S+/.test(state.email))
        errors.email = "Please enter a valid email";

      if (!state.workPhone.trim()) errors.workPhone = "Please enter work phone";

      if (!state.mobile.trim()) errors.mobile = "Please enter mobile number";

      if (!state.customerLanguage)
        errors.customerLanguage = "Please select language";

      state.errors = errors;
    },

    clearFieldError: (state, action) => {
      delete state.errors[action.payload];
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    toggleEnablePortal: (state) => {
      state.enablePortal = !state.enablePortal;
    },

    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },

    setAddressField: (state, action) => {
      const { addressType, field, value } = action.payload;
      state[addressType][field] = value;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },

    setCustomerLanguageSearch: (state, action) => {
      state.customerLanguageSearch = action.payload;
    },

    setOpenCustomerLanguage: (state, action) => {
      state.openCustomerLanguage = action.payload;
    },

    // customerTypeSeacrh
    setCustomerTypeSearch: (state, action) => {
      state.customerTypeSearch = action.payload;
    },

    setOpenCustomerType: (state, action) => {
      state.openCustomerType = action.payload;
    },

    updateSelectedCustomerField: (state, action) => {
      const { field, value } = action.payload;

      if (state.selectedCustomer) {
        state.selectedCustomer[field] = value;
      }
    },

    copyBillingToShipping: (state) => {
      state.shippingAddress = { ...state.billingAddress };
    },

    setContactField: (state, action) => {
      const { field, value } = action.payload;
      state.contactForm[field] = value;
    },

    removeCustomerLocal: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload,
      );
    },

    clearSelectedCustomer(state) {
      state.selectedCustomer = null;
    },

    setSelectedCustomer: (state, action) => {
      console.log("Selected:", action.payload.id);
      state.selectedCustomer = action.payload;
    },

    resetForm: () => ({
      ...initialState,
    }),

    resetContactForm: (state) => {
      state.contactForm = { ...emptyContactPerson };
    },

    addContactPerson: (state) => {
      state.contactPersons.push({
        id: Date.now(),
        ...state.contactForm,
      });

      state.contactForm = { ...emptyContactPerson };
    },

    addRecentActivity: (state, action) => {
      console.log("addRecentActivity reducer", action.payload);

      state.recentActivities.unshift({
        id: Date.now(),
        createdAt: new Date().toISOString(),
        ...action.payload,
      });
    },

    clearActivities: (state) => {
      state.recentActivities = [];
    },

    setRecentActivities: (state, action) => {
      state.recentActivities = action.payload;
    },

    setActivities: (state, action) => {
      state.activities = action.payload;
    },

    addActivity: (state, action) => {
      state.activities.unshift(action.payload);
    },

    setPaymentTermsSearch: (state, action) => {
      state.paymentTermsSearch = action.payload;
    },

    setOpenPaymentTerms: (state, action) => {
      state.openPaymentTerms = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loadCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ ONLY ONE fulfilled
      .addCase(loadCustomers.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload || {}; // action.payload IS already the interior data block

        // Use optional chaining or defaults for the assignments
        state.customers = data.content || [];
        // state.page = data.page || 0;
        // state.pageSize = data.size || 10;
        state.totalElements = data.totalElements || 0;
        state.totalPages = data.totalPages || 0;
      })
      // ✅ ONLY ONE rejected
      .addCase(loadCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getCustomerById
      .addCase(getCustomerById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomer = action.payload.data;
      })

      .addCase(getCustomerById.rejected, (state, action) => {
        console.log("Rejected:", action.payload.data);

        state.loading = false;
        state.error = action.payload.data;
      })

      .addCase(saveCustomer.fulfilled, (state, action) => {
        console.log("saveCustomer payload:", action.payload);

        state.selectedCustomer = action.payload;

        const index = state.customers.findIndex(
          (c) => c.id === action.payload.id,
        );

        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })

      .addCase(editCustomer.fulfilled, (state, action) => {
        const customer = action.payload.data;

        const index = state.customers.findIndex((c) => c.id === customer.id);

        if (index !== -1) {
          state.customers[index] = customer;
        }
      })

      .addCase(removeCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload,
        );
      });
  },
});

export const {
  setField,
  validateCustomer,
  clearFieldError,

  setActiveTab,
  setSearchQuery,
  toggleEnablePortal,
  setAddressField,
  copyBillingToShipping,
  resetForm,
  setCurrency,

  setCustomerLanguage,
  setOpenCustomerLanguage,
  setCustomerLanguageSearch,

  setCurrentPage,
  removeCustomerLocal,

  clearSelectedCustomer,
  setSelectedCustomer,

  setCustomerTypeSearch,
  setOpenCustomerType,
  updateSelectedCustomerField,

  setIsEditingCustomerType,
  setEditCustomerType,
  saveCustomerType,
  cancelCustomerType,

  setEditingField,
  setContactField,
  resetContactForm,

  setActivities,
  addActivity,

  addRecentActivity,
  setRecentActivities,
  clearActivities,

  setOpenPaymentTerms,
  setPaymentTermsSearch,
} = customerSlice.actions;

export default customerSlice.reducer;
