import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api/v1.0",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟢 Helper to unwrap the Axios response and pass down the raw backend payload
const extractData = (response) => response.data;

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(msg));
  },
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//: Normalize Axios response

// ── Dashboard ──────────────────────────────────────
export const fetchDashboardStats = () => api.get("/dashboard/stats");

// ── Customers ──────────────────────────────────────
// Get Customers (Pagination + Search + Sorting)
export const fetchCustomers = async (params) => {
  const response = await api.get("/customers", { params });
  return extractData(response); // 🟢 Add .then(extractData) here!
};

//GetById
export const fetchCustomerById = (id) =>
  api.get(`/customers/${id}`).then(extractData);

// Create Customer
export const createCustomer = (data) =>
  api.post("/customers", data).then(extractData);

// Update Customer
export const updateCustomer = (id, data) =>
  api.put(`/customers/${id}`, data).then(extractData);

// Soft Delete Customer
export const deleteCustomer = (id) =>
  api.delete(`/customers/${id}`).then(extractData);

// Restore Customer
export const restoreCustomer = (id) =>
  api.patch(`/customers/${id}/restore`).then(extractData);

// Customer Dropdown
export const fetchCustomerDropdown = () =>
  api.get("/customers/dropdown").then(extractData);

// Customer Count
export const fetchCustomerCount = () =>
  api.get("/customers/count").then(extractData);

// Dashboard Summary
export const fetchCustomerDashboard = () =>
  api.get("/customers/dashboard").then(extractData);

// Check Email Exists
export const checkCustomerEmail = (email) =>
  api
    .get("/customers/check-email", {
      params: { email },
    })
    .then(extractData);

// ── Invoices ───────────────────────────────────────

export const fetchInvoices = async (params) => {
  const response = await api.get("/invoices", { params });
  return extractData(response); // 🟢 Add .then(extractData) here!
};

export const fetchInvoiceById = (id) => api.get(`/invoices/${id}`);

export const fetchCustomerInvoices = (customerId, params) =>
  api.get(`/invoices/customer/${customerId}`, { params });

export const fetchInvoiceItems = (invoiceId) =>
  api.get(`/invoices/${invoiceId}/items`);

export const fetchInvoiceItemById = (invoiceId, itemId) =>
  api.get(`/invoices/${invoiceId}/items/${itemId}`);

// Create Invoice
export const createInvoice = (data) => api.post("/invoices", data);

// Update Invoice
export const updateInvoice = (id, data) => api.put(`/invoices/${id}`, data);

// Delete Invoice
export const deleteInvoice = (id) => api.delete(`/invoices/${id}`);

//Sales Persons

// Get All
export const fetchSalesPersons = async (params) => {
  const response = await api.get("/sales-persons", { params });
  return extractData(response);
};

// Get By Id
export const fetchSalesPersonById = async (id) => {
  const response = await api.get(`/sales-persons/${id}`);
  return extractData(response);
};

// Create
export const createSalesPerson = async (data) => {
  const response = await api.post("/sales-persons", data);
  return extractData(response);
};

// Update
export const updateSalesPerson = async (id, data) => {
  const response = await api.put(`/sales-persons/${id}`, data);
  return extractData(response);
};

// Delete
export const deleteSalesPerson = async (id) => {
  const response = await api.delete(`/sales-persons/${id}`);
  return extractData(response);
};

// itemMaster

export const fetchItemMasters = async (params) => {
  const response = await api.get("/item-master", { params });
  return extractData(response);
};

export const fetchItemMasterById = async (id) => {
  const response = await api.get(`/item-master/${id}`);
  return extractData(response);
};

export const createItemMaster = async (data) => {
  const response = await api.post("/item-master", data);
  return extractData(response);
};

export const updateItemMaster = async (id, data) => {
  const response = await api.put(`/item-master/${id}`, data);
  return extractData(response);
};

export const deleteItemMaster = async (id) => {
  const response = await api.delete(`/item-master/${id}`);
  return extractData(response);
};

export default api;
