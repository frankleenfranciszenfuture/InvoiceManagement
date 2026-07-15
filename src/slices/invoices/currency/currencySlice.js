import { createSlice } from "@reduxjs/toolkit";

import {
  loadExchangeRate,
  loadCurrencies,
} from "../../../slices/invoices/currency/thunks/currencyThunks";

const initialState = {
  exchangeRate: null,
  currencies: {},

  loadingRate: false,
  loadingCurrencies: false,

  error: null,
};

const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState,
  reducers: {
    clearExchangeRate(state) {
      state.exchangeRate = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Exchange Rate
      .addCase(loadExchangeRate.pending, (state) => {
        state.loadingRate = true;
        state.error = null;
      })
      .addCase(loadExchangeRate.fulfilled, (state, action) => {
        state.loadingRate = false;
        state.exchangeRate = action.payload;
      })
      .addCase(loadExchangeRate.rejected, (state, action) => {
        state.loadingRate = false;
        state.error = action.payload;
      })

      // Currencies
      .addCase(loadCurrencies.pending, (state) => {
        state.loadingCurrencies = true;
        state.error = null;
      })
      .addCase(loadCurrencies.fulfilled, (state, action) => {
        state.loadingCurrencies = false;
        state.currencies = action.payload;
      })
      .addCase(loadCurrencies.rejected, (state, action) => {
        state.loadingCurrencies = false;
        state.error = action.payload;
      });
  },
});

export const { clearExchangeRate } = exchangeRateSlice.actions;

export default exchangeRateSlice.reducer;
