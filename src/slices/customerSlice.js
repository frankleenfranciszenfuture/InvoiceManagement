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
      return await api.fetchCustomerById(id);
    } catch (error) {
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

      console.log("ID:", selectedCustomer.id);
      console.log("PUT Body:", selectedCustomer);

      const response = await api.updateCustomer(
        selectedCustomer.id,
        selectedCustomer,
      );

      console.log("Response:", response.data);

      return response.data;
    } catch (err) {
      console.log(err);
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
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phoneCode: "+91",
  phone: "",
  fax: "",
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
  // Create Form
  customerForm: {
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

    billingAddress: { ...emptyAddress },
    shippingAddress: { ...emptyAddress },

    contactPersons: [],
    status: "",
  },

  // Edit/View
  selectedCustomer: null,

  // UI
  activeTab: "OtherDetails",
  editingField: null,
  errors: {},

  // Table
  customers: [],
  page: 0,
  pageSize: 5,
  totalElements: 0,
  totalPages: 0,

  searchQuery: "",
  sortBy: "displayName",
  direction: "asc",
  status: "ALL",

  // Dropdowns
  customerTypes: ["Business", "Individual"],
  customerTypeSearch: "",
  openCustomerType: false,

  customerLanguageSearch: "",
  openCustomerLanguage: false,

  paymentTermsSearch: "",
  openPaymentTerms: false,

  // Totals
  totalYouPay: 0,
  totalYouCollect: 0,

  // Activity
  activities: [],
  recentActivities: [],

  hasCustomers: false,

  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  // initialState: { list: [], loading: false, error: null },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },

    setField: (state, action) => {
      const { field, value } = action.payload;
      state.customerForm[field] = value;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    setAddressField: (state, action) => {
      const { addressType, field, value } = action.payload;

      if (!state.customerForm[addressType]) {
        state.customerForm[addressType] = { ...emptyAddress };
      }

      state.customerForm[addressType][field] = value;
    },

    setSelectedCustomerAddressField(state, action) {
      const { addressType, field, value } = action.payload;

      if (!state.selectedCustomer) return;

      state.selectedCustomer[addressType][field] = value;
    },

    copyBillingToShipping: (state) => {
      state.customerForm.shippingAddress = {
        ...state.customerForm.billingAddress,
      };
    },

    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },

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
      const customer = state.customerForm;
      const errors = {};

      if (!customer.firstName?.trim())
        errors.firstName = "Please enter first name";

      if (!customer.lastName?.trim())
        errors.lastName = "Please enter last name";

      if (!customer.companyName?.trim())
        errors.companyName = "Please enter company name";

      if (!customer.displayName?.trim())
        errors.displayName = "Please enter display name";

      if (!customer.currency) errors.currency = "Please select currency";

      if (!customer.email?.trim()) {
        errors.email = "Please enter email";
      } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
        errors.email = "Please enter a valid email";
      }

      if (!customer.workPhone?.trim())
        errors.workPhone = "Please enter work phone";

      if (!customer.mobile?.trim())
        errors.mobile = "Please enter mobile number";

      if (!customer.customerLanguage)
        errors.customerLanguage = "Please select language";

      state.errors = errors;
    },

    clearFieldError: (state, action) => {
      delete state.errors[action.payload];
    },

    setErrors: (state, action) => {
      state.errors = action.payload;
    },

    toggleEnablePortal: (state) => {
      state.enablePortal = !state.enablePortal;
    },

    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },

    setCurrency: (state, action) => {
      state.customerForm.currency = action.payload;
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

    updateCustomerField: (state, action) => {
      const { field, value } = action.payload;
      state.customerForm[field] = value;
    },

    updateSelectedCustomerField: (state, action) => {
      const { field, value } = action.payload;

      if (state.selectedCustomer) {
        state.selectedCustomer[field] = value;
      }
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
      state.selectedCustomer = action.payload;

      state.customerForm = {
        ...action.payload,
        billingAddress: {
          ...emptyAddress,
          ...action.payload.billingAddress,
        },
        shippingAddress: {
          ...emptyAddress,
          ...action.payload.shippingAddress,
        },
      };
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

        const data = action.payload || {};

        state.customers = data.content || [];
        state.totalElements = data.totalElements || 0;
        state.totalPages = data.totalPages || 0;

        state.hasCustomers = (data.totalElements || 0) > 0;
      })

      // ✅ ONLY ONE rejected
      .addCase(loadCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getCustomerById
      .addCase(getCustomerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCustomer = action.payload.data;
      })

      .addCase(getCustomerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
  loading,
  setField,
  validateCustomer,
  clearFieldError,

  setActiveTab,
  setErrors,
  setSearchQuery,
  toggleEnablePortal,
  setAddressField,
  copyBillingToShipping,
  resetForm,
  setCurrency,

  updateSelectedCustomerField,
  setSelectedCustomerAddressField,

  setCustomerLanguage,
  setOpenCustomerLanguage,
  setCustomerLanguageSearch,

  setCurrentPage,
  removeCustomerLocal,

  clearSelectedCustomer,
  setSelectedCustomer,

  setCustomerTypeSearch,
  setOpenCustomerType,

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

  setStatus,
} = customerSlice.actions;

export default customerSlice.reducer;
