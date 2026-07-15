import { configureStore } from "@reduxjs/toolkit";
// login
import authReducer from "../slices/login/authSlice";

import uiReducer from "../slices/Ui/uiSlice";

// customers
import customerReducer from "../slices/customers/customerSlices";
import customerViewReducer from "../slices/customers/customerViewSlice";

// invoices
import invoiceReducer from "../slices/invoices/invoiceSlice";
import invoiceViewReducer from "../slices/invoices/invoiceViewSlice";
// items
import itemMasterReducer from "../slices/itemMasters/itemMasterSlice";
import itemMasterViewReducer from "../slices/itemMasters/itemMasterViewSlice";

//salesPerson
import salesPersonReducer from "../slices/salesPerson/salesPersonSlice";

// tax
import taxMasterReducer from "../slices/invoices/tax/taxMasterSlice";

//currency
import exchangeRateReducer from "../slices/invoices/currency/currencySlice";

import dashboardReducer from "../slices/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    // UI
    ui: uiReducer,

    // customers
    customer: customerReducer,
    customerView: customerViewReducer,

    // invoices
    invoice: invoiceReducer,
    invoiceView: invoiceViewReducer,

    // taxMaster
    taxMaster: taxMasterReducer,

    // itemMaster
    itemMaster: itemMasterReducer,
    itemMasterView: itemMasterViewReducer,

    //salesPerson
    salesPerson: salesPersonReducer,

    //currency
    exchangeRate: exchangeRateReducer,

    // dashboard
    dashboard: dashboardReducer,
  },
});

export default store;
