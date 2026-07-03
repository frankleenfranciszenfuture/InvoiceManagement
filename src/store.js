import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import invoiceReducer from "./slices/invoiceSlice";
import customerReducer from "./slices/customerSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    invoice: invoiceReducer,
    customer: customerReducer,
    ui: uiReducer,
  },
});

export default store;
