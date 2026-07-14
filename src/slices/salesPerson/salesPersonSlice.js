import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  loadSalesPerson,
  addSalesPerson,
  updateSalesPersonThunk,
  loadSalesPersonById,
  deleteSalesPersonThunk,
} from "../../slices/salesPerson/thunks/salesPersonThunks";

const initialState = {
  salesPersons: [],
  selectedSalesPerson: null,
  loading: false,
  error: null,
};

const salesPersonSlice = createSlice({
  name: "salesPerson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Load
      .addCase(loadSalesPerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSalesPerson.fulfilled, (state, action) => {
        state.loading = false;
        state.salesPersons = action.payload;
      })
      .addCase(loadSalesPerson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getById

      .addCase(loadSalesPersonById.fulfilled, (state, action) => {
        state.selectedSalesPerson = action.payload;
      })

      // Add
      .addCase(addSalesPerson.fulfilled, (state, action) => {
        state.salesPersons.push(action.payload);
      })

      // Update
      .addCase(updateSalesPersonThunk.fulfilled, (state, action) => {
        const index = state.salesPersons.findIndex(
          (sp) => sp.id === action.payload.id,
        );

        if (index !== -1) {
          state.salesPersons[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteSalesPersonThunk.fulfilled, (state, action) => {
        state.salesPersons = state.salesPersons.filter(
          (sp) => sp.id !== action.payload,
        );
      });
  },
});

export default salesPersonSlice.reducer;
