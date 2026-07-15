import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchExchangeRate,
  fetchCurrencies,
} from "../../../../api/currencyApi";

export const loadExchangeRate = createAsyncThunk(
  "exchangeRate/loadExchangeRate",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchExchangeRate(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const loadCurrencies = createAsyncThunk(
  "exchangeRate/loadCurrencies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCurrencies();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
