import api from "./api";

export const fetchExchangeRate = async (params) => {
  const response = await api.get("/exchange-rate", { params });
  return response.data;
};

export const fetchCurrencies = async () => {
  const response = await api.get("/exchange-rate/currencies");
  return response.data;
};
