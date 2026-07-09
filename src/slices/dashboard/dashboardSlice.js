import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardStats } from "../../api/dashboardApi";

export const loadDashboardStats = createAsyncThunk(
  "dashboard/loadStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchDashboardStats();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  user: {
    name: "Frankleen Francis",
    orgName: "WXYZ",
    initial: "F",
  },
  activeNavItem: "Home",
  activeTab: "Dashboard",
  fiscalPeriod: "This Fiscal Year",
  receivables: {
    total: 0,
    current: 0,
    overdue: [
      { label: "1-15 Days", amount: 0 },
      { label: "16-30 Days", amount: 0 },
      { label: "31-45 Days", amount: 0 },
      { label: "Above 45 days", amount: 0 },
    ],
  },
  salesAndExpenses: {
    totalSales: 0,
    totalReceipts: 0,
    totalExpenses: 0,
    chartData: [
      { month: "Apr", year: 2026, sales: 0, expenses: 0 },
      { month: "May", year: 2026, sales: 0, expenses: 0 },
      { month: "Jun", year: 2026, sales: 0, expenses: 0 },
      { month: "Jul", year: 2026, sales: 0, expenses: 0 },
      { month: "Aug", year: 2026, sales: 0, expenses: 0 },
      { month: "Sep", year: 2026, sales: 0, expenses: 0 },
      { month: "Oct", year: 2026, sales: 0, expenses: 0 },
      { month: "Nov", year: 2026, sales: 0, expenses: 0 },
      { month: "Dec", year: 2026, sales: 0, expenses: 0 },
      { month: "Jan", year: 2027, sales: 0, expenses: 0 },
      { month: "Feb", year: 2027, sales: 0, expenses: 0 },
      { month: "Mar", year: 2027, sales: 0, expenses: 0 },
    ],
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  // initialState: { stats: null, loading: false, error: null },
  initialState,
  reducers: {
    setActiveNavItem: (state, action) => {
      state.activeNavItem = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setFiscalPeriod: (state, action) => {
      state.fiscalPeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDashboardStats.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loadDashboardStats.fulfilled, (s, a) => {
        s.loading = false;
        s.stats = a.payload;
      })
      .addCase(loadDashboardStats.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});
export const { setActiveNavItem, setActiveTab, setFiscalPeriod } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
