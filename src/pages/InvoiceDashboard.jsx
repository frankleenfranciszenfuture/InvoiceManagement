import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InvTab from "../pages/InvTab";
import NavbarInvoice from "./invoices/NavbarInvoice";
import BottomActionBar from "../../../invoice/src/components/BottomActionBar";
import { useSearchParams } from "react-router-dom";

import {
  loadCustomers,
  loadInvoices,
} from "../slices/invoiceSlice";

import { setInvoiceStatus } from "../slices/invoices/InvoiceViewSlice";
import {
  Search,
  RotateCcw,
  HelpCircle,
  Mail,
  Globe,
  MessageCircle,
  Download,
  UploadCloud,
  ChevronDown,
  FileSpreadsheet,
  ArrowDown,
  UserCircle,
  Plus,
  Loader2,
} from "lucide-react";


export default function InvoiceDashboard() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const {
    invoices = [],
    loading,
    page,
    pageSize,
    totalPages,
  } = useSelector((state) => state.invoice);

  const { search } = useSelector((state) => state.invoiceView);

  const invoiceStatus = searchParams.get("invoiceStatus") || "ALL";

  useEffect(() => {
    dispatch(setInvoiceStatus(invoiceStatus));

    dispatch(
      loadInvoices({
        page,
        size: pageSize,
        search,
        invoiceStatus,
      })
    );
  }, [dispatch, page, pageSize, search, invoiceStatus]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <p className="mt-4 text-sm font-medium text-gray-700">
            Loading invoices...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-50 font-sans text-[13px] overflow-hidden">
      {/* Form Container Wrapper allowing separate inner scrolling */}
      <div className="flex-1 min-h-0 bg-white overflow-y-auto">
        <div className="px-2 py-5 max-w-30xl w-full ">
          <NavbarInvoice />
          <>
            {invoices.length > 0 ? (
              <InvTab />
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <h2 className="text-lg font-semibold text-gray-800">
                  No records found
                </h2>

                <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
                  There are no items to display. Create a new item or import an existing file to get started.
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => navigate("/items/new")}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    <Plus size={16} />
                    Create New Inoice
                  </button>

                  <button
                    className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition"
                  >
                    <Download size={16} />
                    Import File
                  </button>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}