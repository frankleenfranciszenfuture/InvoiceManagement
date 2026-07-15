import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";


import LoginPage from "./login/LoginPage";
import Dashboard from "./Dashboard/pages/Dashboard";

import AppLayout from "./Home/pages/AppLayout";
import ProtectedRoute from "./roots/ProtectedRoute";

// customers
import CustomerDashboard from "./customers/pages/CustomerDashboard";
import CustomerTable from "./customers/pages/CustomerTable";
import CreateCustomer from "./customers/pages/CreateCustomer";
import EditCustomer from "./customers/pages/EditCustomer";
import CustomerOverViewDashboard from "./customers/OverviewCard/CustomerOverViewDashboard";

// items
import ItemMasterDashboard from "./itemMasters/pages/itemMasterDashboard";
import ItemMasterCreate from "./itemMasters/pages/ItemMasterCreate";

// invoices
import InvoiceDashboard from "./invoices/pages/InvoiceDashboard";
import InvoiceTable from "./invoices/pages/InvoiceTable";
import NewInvoiceFull from "./invoices/pages/createInvoice/NewInvoiceFull";
import InvoiceOverViewCardDashboard from "./invoices/overViewCardInvoices/InvoiceOverViewCardDashboard";



export default function App() {
  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Cutomers */}
          <Route path="/customers" element={<CustomerDashboard />} />
          <Route path="/customers/table" element={<CustomerTable />} />
          <Route path="/customers/new" element={<CreateCustomer />} />

          {/* Custoemr OverviewCard */}
          <Route path="/customers/view/:id" element={<CustomerOverViewDashboard />} />
          <Route path="/customers/edit/:id" element={<EditCustomer />} />


          {/* invoices */}
          <Route path="/invoices" element={<InvoiceDashboard />} />
          <Route path="/invoices/new" element={<NewInvoiceFull />} />

          {/* Invoice overviewCard */}
          <Route path="/invoices/view/:id" element={<InvoiceOverViewCardDashboard />} />

          {/* Items */}
          <Route path="/items" element={<ItemMasterDashboard />} />
          <Route path="/items/new" element={<ItemMasterCreate />} />


        </Route>
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "#16a34a",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#dc2626",
              color: "#fff",
            },
          },
        }}
      />
    </BrowserRouter>
  )
}
