import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/api";
import { setSelectedItemId } from "./invSlice";

export const loadItemMasters = createAsyncThunk(
  "itemMaster/loadAll",
  async (params, { rejectWithValue }) => {
    try {
      return await api.fetchItemMasters(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loadItemMasterById = createAsyncThunk(
  "itemMaster/loadById",
  async (id, { rejectWithValue }) => {
    try {
      return await api.fetchItemMasterById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addItemMaster = createAsyncThunk(
  "itemMaster/add",
  async ({ item, image }, { rejectWithValue }) => {
    try {
      return await api.createItemMaster(item, image);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateItemMaster = createAsyncThunk(
  "itemMaster/update",
  async ({ id, item, image }, { rejectWithValue }) => {
    try {
      return await api.updateItemMaster(id, item, image);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteItemMaster = createAsyncThunk(
  "itemMaster/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteItemMaster(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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
      .addCase(updateItemMaster.fulfilled, (state, action) => {
        const index = state.itemMasters.findIndex(
          (item) => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.itemMasters[index] = action.payload;
        }

        state.selectedItemMaster = action.payload;
      })

      // Delete
      .addCase(deleteItemMaster.fulfilled, (state, action) => {
        state.itemMasters = state.itemMasters.filter(
          (item) => item.id !== action.payload,
        );
      });
  },
});

export const { validateItemMaster, setSelectedItemMaster } =
  itemMasterSlice.actions;

export default itemMasterSlice.reducer;
