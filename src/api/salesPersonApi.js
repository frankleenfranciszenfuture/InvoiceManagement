import api from "./api";

export const fetchSalesPersons = async (params) => {
  const response = await api.get("/sales-persons", { params });
  return response.data;
};

export const fetchSalesPersonsById = async (id) => {
  const response = await api.get(`/sales-persons/${id}`);
  return response.data;
};

export const createSalesPerson = async (data) => {
  const response = await api.post("/sales-persons", data);
  return response.data; // unwrap to the actual customer object
};

// update invoice
export const updateSalesPerson = async (id, data) => {
  const response = await api.put(`/sales-persons/${id}`, data);
  return response.data;
};

export const deleteSalesPerson = async (id) => {
  const response = await api.delete(`/sales-persons/${id}`);
  return response.data;
};
