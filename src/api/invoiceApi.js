import api from "./api";

// Get All Invoices
export const fetchInvoices = async (params) => {
  const response = await api.get("/invoices", { params });
  return response.data.data; // unwrap axios .data, then envelope .data → { content, page, size, totalElements, totalPages, first, last }
};

// create invoices
export const createInvoice = async (data) => {
  try {
    console.log("Sending Invoice:", JSON.stringify(data, null, 2));

    const response = await api.post("/invoices", data);

    console.log("Response:", response.data);

    return response.data.data;
  } catch (error) {
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("Request:", JSON.stringify(data, null, 2));
    throw error;
  }
};

// update invoice
export const updateInvoice = async (id, data) => {
  const response = await api.put(`/invoices/${id}`, data);
  return response.data.data;
};

// Delete Invoice
export const deleteInvoice = async (id) => {
  const response = await api.delete(`/invoices/${id}`);
  return response.data.data;
};

// Get Invoice By Id
export const fetchInvoiceById = async (id) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data.data;
};

// Get Customer Invoices
export const fetchCustomerInvoices = async (customerId, params) => {
  const response = await api.get(`/invoices/customer/${customerId}`, {
    params,
  });
  return response.data.data;
};

// Search Invoice By Status
export const searchInvoiceByStatus = async (params) => {
  const response = await api.get("/invoices/status", { params });
  return response.data.data;
};

// Generate Invoice Number
export const generateInvoiceNumber = async () => {
  const response = await api.get("/invoices/generate");
  return response.data.data;
};

// Get All Invoice Items
export const fetchInvoiceItems = async (invoiceId) => {
  const response = await api.get(`/invoices/${invoiceId}/items`);
  return response.data.data;
};

// Get Invoice Item By Id
export const fetchInvoiceItemById = async (invoiceId, itemId) => {
  const response = await api.get(`/invoices/${invoiceId}/items/${itemId}`);
  return response.data.data;
};
