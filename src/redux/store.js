import { configureStore } from "@reduxjs/toolkit";
// login
import authReducer from "../slices/login/authSlice";
import customerReducer from "../slices/customers/customerSlices";
import uiReducer from "../slices/Ui/uiSlice";
import customerViewReducer from "../slices/customers/customerViewSlice";
import dashboardReducer from "../slices/dashboard/dashboardSlice";
import itemMasterReducer from "../slices/itemMasters/itemMasterSlice";
import itemMasterViewReducer from "../slices/itemMasters/itemMasterViewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    // UI
    ui: uiReducer,

    // customers
    customer: customerReducer,
    customerView: customerViewReducer,

    // itemMaster
    itemMaster: itemMasterReducer,
    itemMasterView: itemMasterViewReducer,

    // dashboard
    dashboard: dashboardReducer,
  },
});

export default store;
