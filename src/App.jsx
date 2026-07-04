import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CustomerTable from "./pages/CustomerTable";
import NewCustomerForm from "./pages/NewCustomerForm";
import CreateInvoiceModal from "./pages/CreateInvoiceModal";
import ViewInvoiceModal from "./pages/ViewInvoiceModal";

import ProtectedRoute from "./roots/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import NewInvoice from "./pages/NewInvoice";
import InvoiceDashboard from "./pages/InvoiceDashboard";
import InvoiceDash from "./pages/InvoiceDash";
import CustomerDash from "./pages/customers/CustomerDash";
import CreateCustomerModal from "./pages/customers/Createcustomermodal";
import EditCustomerForm from "./pages/customers/Edit/EditCustomerForm";
import { toast } from "react-toastify";

function App() {
  return (
    <BrowserRouter>

      {/* <button
        onClick={() => {
          console.log("clicked");
          toast.success("Hello");
        }}
      >
        Test
      </button> */}

      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers/:status" element={<CustomerDashboard />} />
          <Route path="/customers" element={<Navigate to="/customers/all" replace />} />
          <Route path="/invoices" element={<InvoiceDashboard />} />
          <Route path="/customers/new" element={<NewCustomerForm />} />
          <Route path="/invoices/new" element={<NewInvoice />} />
          <Route path="/view" element={<ViewInvoiceModal />} />
          <Route path="/create-customer" element={<CreateCustomerModal />} />
          <Route path="/invoice/:id" element={<InvoiceDash />} />

          {/* customers ListView */}

          <Route path="/customers/view/:id" element={<CustomerDash />} />
          <Route path="/customers/edit/:id" element={<EditCustomerForm />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* Toast Container */}
      <Toaster
        position="top-right"
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
  );
}

export default App;
