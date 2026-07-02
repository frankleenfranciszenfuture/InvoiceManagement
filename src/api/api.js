import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081/api/v1.0",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const msg = err.response?.data?.message || "Something went wrong";

    return Promise.reject(new Error(msg));
  },
);

// ── Dashboard ──────────────────────────────────────
export const fetchDashboardStats = () => api.get("/dashboard/stats");

// ── Invoices ───────────────────────────────────────
export const fetchInvoices = () => api.get("/invoices");
export const fetchInvoiceById = (id) => api.get(`/invoices/${id}`);
export const createInvoice = (data) => api.post("/invoices", data);
export const updateInvoiceStatus = (id, status) =>
  api.patch(`/invoices/${id}/status?status=${status}`);
export const deleteInvoice = (id) => api.delete(`/invoices/${id}`);
export const fetchCustomerInvoices = (cid) =>
  api.get(`/invoices/customer/${cid}`);

// ── Customers ──────────────────────────────────────
// Get Customers (Pagination + Search + Sorting)
export const fetchCustomers = (params) => api.get("/customers", { params });

// Get Customer By Id
export const fetchCustomerById = async (id) => {
  const data = await api.get(`/customers/${id}`);
  console.log("fetchCustomerById response:", data);
  return data;
};

// Create Customer
export const createCustomer = (data) => api.post("/customers", data);

// Update Customer
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);

// Soft Delete Customer
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);

// Restore Customer
export const restoreCustomer = (id) => api.patch(`/customers/${id}/restore`);

// Customer Dropdown
export const fetchCustomerDropdown = () => api.get("/customers/dropdown");

// Customer Count
export const fetchCustomerCount = () => api.get("/customers/count");

// Dashboard Summary
export const fetchCustomerDashboard = () => api.get("/customers/dashboard");

// Check Email Exists
export const checkCustomerEmail = (email) =>
  api.get("/customers/check-email", {
    params: { email },
  });

export default api;
