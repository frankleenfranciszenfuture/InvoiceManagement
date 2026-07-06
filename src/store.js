import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice";
import invoiceReducer from "./slices/invoiceSlice";
import customerReducer from "./slices/customerSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import customerViewReducer from "./slices/customer/customerViewSlice";
import salesPersonReducer from "./slices/salesPersonSlice";
import itemMasterReducer from "./slices/itemMasterSlice";
import itemViewReducer from "./slices/items/ItemViewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    invoice: invoiceReducer,
    customer: customerReducer,
    customerView: customerViewReducer,
    salesPerson: salesPersonReducer,
    itemMaster: itemMasterReducer,
    itemView: itemViewReducer,
    ui: uiReducer,
  },
});

export default store;
