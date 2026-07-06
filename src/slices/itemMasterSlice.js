import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/api";

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

const initialState = {
  itemMasters: [],
  selectedItemMaster: null,
  loading: false,
  error: null,
};

const itemMasterSlice = createSlice({
  name: "itemMaster",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadItemMasters.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadItemMasters.fulfilled, (state, action) => {
        state.loading = false;
        state.itemMasters = action.payload;
      })
      .addCase(loadItemMasters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default itemMasterSlice.reducer;
