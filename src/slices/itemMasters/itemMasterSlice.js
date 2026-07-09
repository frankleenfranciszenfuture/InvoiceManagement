import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  loadItemMasters,
  addItemMaster,
  updateSaveItemMaster,
  loadItemMasterById,
  deleteSaveItemMaster,
} from "./thunks/itemMasterThunks";

// ============================
// Initial State
// ============================

const initialState = {
  itemMasters: [],

  loading: false,
  error: null,
  errors: {},

  // Edit/View
  selectedItemMaster: null,
};

const itemMasterSlice = createSlice({
  name: "itemMaster",
  initialState,
  reducers: {
    validateItemMaster: (state, action) => {
      const item = action.payload;
      const errors = {};

      if (!item.itemName?.trim()) {
        errors.itemName = "Item Name is required";
      }

      if (!item.customerType) {
        errors.customerType = "Customer Type is required";
      }

      if (!item.unit) {
        errors.unit = "Unit is required";
      }

      state.errors = errors;
    },

    setSelectedItemMaster: (state, action) => {
      state.selectedItemMaster = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load All
      .addCase(loadItemMasters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadItemMasters.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Payload:", action.payload);
        state.itemMasters = action.payload;
      })
      .addCase(loadItemMasters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Load By Id
      .addCase(loadItemMasterById.fulfilled, (state, action) => {
        state.selectedItemMaster = action.payload;
      })

      // Add
      .addCase(addItemMaster.fulfilled, (state, action) => {
        state.itemMasters.push(action.payload);
      })

      // Update
      .addCase(updateSaveItemMaster.fulfilled, (state, action) => {
        const index = state.itemMasters.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.itemMasters[index] = action.payload;
        }

        state.selectedItemMaster = action.payload;
      })

      // Delete
      .addCase(deleteSaveItemMaster.fulfilled, (state, action) => {
        state.itemMasters = state.itemMasters.filter(
          (item) => item.id !== action.payload,
        );
      });
  },
});

export const { validateItemMaster, setSelectedItemMaster } =
  itemMasterSlice.actions;

export default itemMasterSlice.reducer;
