import { createSlice } from "@reduxjs/toolkit";
import {
  loadTaxMasters,
  addTaxMaster,
  getTaxMasterById,
  getTaxMasterByType,
  editTaxMaster,
  removeTaxMaster,
} from "../../../slices/invoices/tax/thunks/taxMasterThunks";

const initialState = {
  taxes: [],
  selectedTax: null,
  loading: false,
  error: null,
};

const taxMasterSlice = createSlice({
  name: "taxMaster",
  initialState,

  reducers: {
    clearSelectedTax(state) {
      state.selectedTax = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Load All
      .addCase(loadTaxMasters.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTaxMasters.fulfilled, (state, action) => {
        state.loading = false;
        state.taxes = action.payload;
      })
      .addCase(loadTaxMasters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By Id
      .addCase(getTaxMasterById.fulfilled, (state, action) => {
        state.selectedTax = action.payload;
      })

      // Get By Type
      .addCase(getTaxMasterByType.fulfilled, (state, action) => {
        state.taxes = action.payload;
      })

      // Add
      .addCase(addTaxMaster.fulfilled, (state, action) => {
        state.taxes.push(action.payload);
      })

      // Edit
      .addCase(editTaxMaster.fulfilled, (state, action) => {
        const index = state.taxes.findIndex((t) => t.id === action.payload.id);

        if (index !== -1) {
          state.taxes[index] = action.payload;
        }

        if (state.selectedTax && state.selectedTax.id === action.payload.id) {
          state.selectedTax = action.payload;
        }
      })

      // Delete
      .addCase(removeTaxMaster.fulfilled, (state, action) => {
        state.taxes = state.taxes.filter((tax) => tax.id !== action.payload);

        if (state.selectedTax && state.selectedTax.id === action.payload) {
          state.selectedTax = null;
        }
      });
  },
});

export const { clearSelectedTax } = taxMasterSlice.actions;

export default taxMasterSlice.reducer;
