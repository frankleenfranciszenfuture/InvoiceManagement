import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BottomActionBar from "../../../invoice/src/components/BottomActionBar";
import DatePicker from "react-datepicker";
// import NewInvoiceSimplified from "./NewInvoiceSimplified";
import NewInvoiceFull from "../pages/invoice/NewInvoiceFull";
import NewInvoiceSimplified from "./invoice/NewInvoiceSimlified";

import {
  loadCustomers,
  setField,
  setCustomerName,
  setSalesPersonName,
  setInvoiceNumber,
  setOrderNumber,
  setInvoiceDate,
  setTerms,
  setDueDate,
  toggleSimplifiedView,
  addItem,
  updateItem,
  removeItem,
  setCustomerNotes,
  resetInvoice,
  selectTotal,
  setItemName,
  setCustomerSearch,
  setOpenCustomer,
  setItemSearch,
  setOpenItemDropdown,
  setOpenRowItemDropdown,
  setSelectedItemId,
  setActiveItemId,
  setShowSaveMenu,
  toggleSaveMenu,
  setOpenSalesPerson,
  setSalesPersonSearch,
} from "../slices/invoiceSlice";

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
  X,
  Settings,
  ScanLine,
  Trash2,
  ChevronRight,
  ChevronUp,
  GripHorizontal,
  Grip,
} from "lucide-react";

export default function NewInvoice() {
  const dispatch = useDispatch();

  const customerDropdownRef = useRef(null);
  const salesPersonDropdownRef = useRef(null);
  const itemDropdownRef = useRef(null);
  const saveMenuRef = useRef(null);

  const invoice = useSelector((state) => state?.invoice ?? {});
  const items = invoice?.items ?? [];




  // NOTE: these previously read from state.customer.customers / state.salesPersons,
  // which don't exist in the store — the invoice slice is where this data actually
  // lives (see invoiceSlice.js). That mismatch, combined with calling .toLowerCase()
  // directly instead of through a null-safe helper, is what caused the crash.
  const customers = useSelector(
    (state) => state.invoice.customers || []
  );


  const salesPersons = useSelector((state) => state?.invoice?.salesPersons ?? []);
  const itemMaster = useSelector((state) => state?.invoice?.itemMaster ?? []);

  const total = useSelector(selectTotal);

  const openItemDropdown = useSelector(
    (state) => state.invoice?.openItemDropdown
  );

  const openRowItemDropdown = useSelector(
    (state) => state.invoice?.openRowItemDropdown
  );

  const activeItemId = useSelector((state) => state.invoice?.activeItemId);

  const editingItemId = useSelector((state) => state.invoice?.editingItemId);

  const itemSearch = useSelector((state) => state.invoice?.itemSearch || "");

  const customerSearch = useSelector(
    (state) => state.invoice?.customerSearch || ""
  );

  const salesPersonSearch = useSelector(
    (state) => state.invoice?.salesPersonSearch || ""
  );

  const openCustomer = useSelector((state) => state.invoice?.openCustomer);
  const openSalesPerson = useSelector(
    (state) => state.invoice?.openSalesPerson
  );

  const showSaveMenu = useSelector((state) => state.invoice?.showSaveMenu);

  const [showSummary, setShowSummary] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showGateway, setShowGateway] = useState(false);

  const fmt = (n) => parseFloat(n || 0).toFixed(2);

  // Null-safe helpers so a missing customerName / salesPersonName / itemName
  // never throws when filtering — this is what was missing before.
  const safeText = (v) => (v ?? "").toString().toLowerCase();
  const safeNumber = (v) => Number(v ?? 0);

  //customers
  const filteredCustomers = customers.filter((customer) =>
    (customer.displayName || "")
      .toLowerCase()
      .includes((customerSearch || "").toLowerCase())
  );

  //sales
  const filteredSalesPersons = (salesPersons ?? []).filter((s) =>
    (s?.salesPersonName ?? "")
      .toString()
      .toLowerCase()
      .includes((salesPersonSearch ?? "").toLowerCase())
  );
  //items
  const filteredItems = (itemMaster ?? []).filter((item) =>
    (item?.itemName ?? "")
      .toString()
      .toLowerCase()
      .includes((itemSearch ?? "").toLowerCase())
  );

  const handleTermsChange = (term) => {
    dispatch(setTerms(term));

    const invoiceDate = new Date(invoice.invoiceDate);

    if (term === "Net 15") {
      invoiceDate.setDate(invoiceDate.getDate() + 15);
    } else if (term === "Net 30") {
      invoiceDate.setDate(invoiceDate.getDate() + 30);
    }

    dispatch(setDueDate(invoiceDate.toISOString().split("T")[0]));
  };

  console.log("Customers:", customers);
  console.log("Invoice customers:", invoice.customers);
  console.log("Filtered:", filteredCustomers);

  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        customerDropdownRef.current &&
        !customerDropdownRef.current.contains(e.target)
      ) {
        dispatch(setOpenCustomer(false));
      }

      if (
        salesPersonDropdownRef.current &&
        !salesPersonDropdownRef.current.contains(e.target)
      ) {
        dispatch(setOpenSalesPerson(false));
      }

      if (
        itemDropdownRef.current &&
        !itemDropdownRef.current.contains(e.target)
      ) {
        dispatch(setOpenRowItemDropdown(false));
        dispatch(setActiveItemId(null));
      }

      if (saveMenuRef.current && !saveMenuRef.current.contains(e.target)) {
        dispatch(setShowSaveMenu(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  const handleRowClick = (id) => {
    if (activeItemId === id) {
      dispatch(setOpenRowItemDropdown(false));
      dispatch(setActiveItemId(null));
    } else {
      dispatch(setActiveItemId(id));
      dispatch(setOpenRowItemDropdown(true));
    }
  };

  const handleChange = (field) => (e) => {
    dispatch(setField({ field, value: e.target.value }));
  };

  return (
    <div className="flex h-full bg-gray-50 font-sans text-[13px] overflow-hidden">
      {/* Form Container Wrapper allowing separate inner scrolling */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Body */}

        {/* {invoice.simplifiedView ? <NewInvoiceSimplified /> : <NewInvoiceFull />} */}
        {invoice.simplifiedView ? <NewInvoiceSimplified /> : <NewInvoiceFull />}
        {/* {invoice.simplifiedView ? <NewInvoiceFull /> : <NewInvoiceSimplified />} */}
        {/* Footer */}
      </div>
    </div>
  );
}
