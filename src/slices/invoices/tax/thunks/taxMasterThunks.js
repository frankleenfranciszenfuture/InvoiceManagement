import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchtaxMasters,
  fetchTaxMasterById,
  fetchTaxMasterByType,
  createTaxMaster,
  updateTaxMaster,
  deleteTaxMaster,
} from "../../../../api/taxMasterApi";

export const loadTaxMasters = createAsyncThunk(
  "taxMaster/loadTaxMasters",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchTaxMasters(params);
      return response; // already fully unwrapped by fetchCustomers
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addTaxMaster = createAsyncThunk(
  "taxMaster/add",
  async (taxMaster, { rejectWithValue }) => {
    try {
      const response = await createTaxMaster(taxMaster);
      return response; // ✅ not response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getTaxMasterById = createAsyncThunk(
  "taxMaster/getTaxMasterById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchgetTaxMasterById(id);
      return response; // api.fetchCustomerById should already return response.data.data (the customer object)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getTaxMasterByType = createAsyncThunk(
  "taxMaster/getTaxMasterByType",
  async (type, { rejectWithValue }) => {
    try {
      const response = await fetchgetgetTaxMasterByType(type);
      return response; // api.fetchCustomerById should already return response.data.data (the customer object)
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const editTaxMaster = createAsyncThunk(
  "taxMaster/edit",
  async (taxMaster, { rejectWithValue }) => {
    try {
      const response = await updateTaxMaster(taxMaster.id, taxMaster);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const removeTaxMaster = createAsyncThunk(
  "taxMaster/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteTaxMaster(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
