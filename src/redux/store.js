import { configureStore } from "@reduxjs/toolkit";
// login
import authReducer from "../slices/login/authSlice";
import customerReducer from "../slices/customers/customerSlices";
import uiReducer from "../slices/Ui/uiSlice";
import customerViewReducer from "../slices/customers/customerViewSlice";
import dashboardReducer from "../slices/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    ui: uiReducer,
    customerView: customerViewReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
