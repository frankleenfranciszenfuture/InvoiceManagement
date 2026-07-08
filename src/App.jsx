import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";


import LoginPage from "./login/LoginPage";
import Dashboard from "./Dashboard/pages/Dashboard";
import CustomerDashboard from "./customers/pages/CustomerDashboard";
import AppLayout from "./Home/pages/AppLayout";
import ProtectedRoute from "./roots/ProtectedRoute";
import CustomerTable from "./customers/pages/CustomerTable";
import CreateCustomer from "./customers/pages/CreateCustomer";
import EditCustomer from "./customers/pages/EditCustomer";
import ItemsDashboard from "./itemMasters/pages/ItemsDashboard";
import ItemCreate from "./itemMasters/pages/ItemCreate";

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


          <Route path="/customers/edit/:id" element={<EditCustomer />} />


          {/* Items */}
          <Route path="/items" element={<ItemsDashboard />} />
          <Route path="/items/new" element={<ItemCreate />} />


        </Route>
      </Routes>

      <Toaster />
    </BrowserRouter>
  )
}
