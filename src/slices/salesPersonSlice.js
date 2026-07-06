import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/api";

export const loadSalesPersons = createAsyncThunk(
  "salesPerson/loadSalesPersons",
  async (_, { rejectWithValue }) => {
    try {
      return await api.fetchSalesPersons();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load sales persons",
      );
    }
  },
);

const initialState = {
  salesPersons: [],
  loading: false,
  error: null,
};

const salesPersonSlice = createSlice({
  name: "salesPerson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSalesPersons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSalesPersons.fulfilled, (state, action) => {
        state.loading = false;
        state.salesPersons = action.payload;
      })
      .addCase(loadSalesPersons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default salesPersonSlice.reducer;
