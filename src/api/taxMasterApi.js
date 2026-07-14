import api from "./api";

export const fetchtaxMasters = async (params) => {
  const response = await api.get("/tax-master", { params });
  return response.data;
};

export const fetchTaxMasterById = async (id) => {
  const response = await api.get(`/tax-master/${id}`);
  return response.data.data;
};

export const fetchTaxMasterByType = async (type) => {
  const response = await api.get(`/tax-master/type/${type}`);
  return response.data.data;
};

export const createTaxMaster = async (data) => {
  const response = await api.post("/tax-master", data);
  return response.data.data; // unwrap to the actual customer object
};

// update invoice
export const updateTaxMaster = async (id, data) => {
  const response = await api.put(`/tax-master/${id}`, data);
  return response.data.data;
};

// Delete Invoice
export const deleteTaxMaster = async (id) => {
  const response = await api.delete(`/tax-master/${id}`);
  return response.data.data;
};
