import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchItemMasters,
  fetchItemMasterById,
  createItemMaster,
  updateItemMaster,
  deleteItemMaster,
} from "../../../api/itemMasterApi";

export const loadItemMasters = createAsyncThunk(
  "itemMaster/loadAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchItemMasters(params);
      return response; // already fully unwrapped by fetchCustomers
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addItemMaster = createAsyncThunk(
  "itemMaster/add",
  async ({ item, image }, { rejectWithValue }) => {
    try {
      const response = await createItemMaster(item, image);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateSaveItemMaster = createAsyncThunk(
  "itemMaster/update",
  async ({ id, item, image }, { rejectWithValue }) => {
    try {
      const response = await updateItemMaster(id, item, image);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const loadItemMasterById = createAsyncThunk(
  "itemMaster/loadById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchItemMasterById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteSaveItemMaster = createAsyncThunk(
  "itemMaster/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteItemMaster(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
