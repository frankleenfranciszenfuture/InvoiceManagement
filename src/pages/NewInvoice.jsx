import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BottomActionBar from "../../../invoice/src/components/BottomActionBar";
import DatePicker from "react-datepicker";
// import NewInvoiceSimplified from "./NewInvoiceSimplified";
import NewInvoiceFull from "../pages/invoice/NewInvoiceFull";
import NewInvoiceSimplified from "./invoice/NewInvoiceSimlified";

import {
  setCustomerName,
  setInvoiceNumber,
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
} from "../slices/invSlice";

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
  const itemDropdownRef = useRef(null);
  const saveMenuRef = useRef(null);

  const customer = useSelector((state) => state.customers);
  const invoice = useSelector((state) => state.invoice);
  const total = useSelector(selectTotal);

  const openItemDropdown = useSelector(
    (state) => state.invoice.openItemDropdown,
  );

  const openRowItemDropdown = useSelector(
    (state) => state.invoice.openRowItemDropdown,
  );

  const activeItemId = useSelector((state) => state.invoice.activeItemId);

  const editingItemId = useSelector((state) => state.invoice.editingItemId);

  const itemSearch = useSelector((state) => state.invoice.itemSearch);

  const itemMaster = useSelector((state) => state.invoice.itemMaster);

  const customerSearch = useSelector((state) => state.invoice.customerSearch);

  const openCustomer = useSelector((state) => state.invoice.openCustomer);
  const customers = useSelector((state) => state.customer.customers);

  const showSaveMenu = useSelector((state) => state.invoice.showSaveMenu);

  const [showSummary, setShowSummary] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showGateway, setShowGateway] = useState(false);

  const fmt = (n) => parseFloat(n || 0).toFixed(2);

  //customers
  const filteredCustomers = invoice.customers.filter((customer) =>
    customer.customerName.toLowerCase().includes(customerSearch.toLowerCase()),
  );

  //items

  const filteredItems = itemMaster.filter((item) =>
    item.itemName.toLowerCase().includes(itemSearch.toLowerCase()),
  );
  console.log(invoice.items);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        customerDropdownRef.current &&
        !customerDropdownRef.current.contains(e.target)
      ) {
        dispatch(setOpenCustomer(false));
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

  return (
    <div className="flex h-full bg-gray-50 font-sans text-[13px] overflow-hidden">
      {/* Form Container Wrapper allowing separate inner scrolling */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Body */}

        {/* {invoice.simplifiedView ? <NewInvoiceSimplified /> : <NewInvoiceFull />} */}
        {invoice.simplifiedView ? <NewInvoiceFull /> : <NewInvoiceSimplified />}
        {/* Footer */}
      </div>
    </div>
  );
}
