import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchSalesPersons,
  fetchSalesPersonsById,
  createSalesPerson,
  updateSalesPerson,
  deleteSalesPerson,
} from "../../../api/salesPersonApi";

export const loadSalesPerson = createAsyncThunk(
  "salesPerson/loadAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchSalesPersons(params);
      return response; // already fully unwrapped by fetchCustomers
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const addSalesPerson = createAsyncThunk(
  "salesPerson/add",
  async ({ salesPerson }, { rejectWithValue }) => {
    try {
      const response = await createSalesPerson(salesPerson);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const updateSalesPersonThunk = createAsyncThunk(
  "salesPerson/update",
  async ({ id, salesPerson }, { rejectWithValue }) => {
    try {
      const response = await updateSalesPerson(id, salesPerson);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const loadSalesPersonById = createAsyncThunk(
  "salesPerson/loadById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchSalesPersonsById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteSalesPersonThunk = createAsyncThunk(
  "salesPerson/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteSalesPerson(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
