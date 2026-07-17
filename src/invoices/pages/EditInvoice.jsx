import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useMemo } from "react";


import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

// import { loadCustomers } from "../../../slices/customers/thunks/customerThunks";
import {
    loadInvoiceNumber,
    addInvoice,
    loadInvoices,
    loadInvoiceCustomers
} from "../../slices/invoices/thunks/invoiceThunks"
import { loadItemMasters } from "../../slices/itemMasters/thunks/itemMasterThunks"

import {
    loadTaxMasters,
    getTaxMasterByType
} from "../../slices/invoices/tax/thunks/taxMasterThunks";

import { loadSalesPerson } from "../../slices/salesPerson/thunks/salesPersonThunks";

import {
    loadCurrencies,
    loadExchangeRate
} from "../../slices/invoices/currency/thunks/currencyThunks";

import {
    closeModal,
    openCustomerModal,
    closeInvoiceNumberModal,
    openInvoiceNumberModal
} from "../../slices/Ui/uiSlice";

import { validateInvoice } from "../../invoices/utils/validateInvoice";

import CustomerModal from "../models/customerModel/CustomerModal";
import { formatCurrency } from "../../invoices/utils/formatCurrency";


import {
    // customer related inside invoice
    toggleSimplifiedView,
    setCustomerSearch,
    setOpenCustomer,
    setCustomerId,
    setCustomerName,
    setCustomerNotes,
    //......................//

    // loadInvoice related
    setOrderNumber,
    setReferenceNumber,
    setSubject,
    //......................//

    //invoiceRelated
    setInvoiceNumber,
    updateInvoiceNumberPreference,
    setInvoiceDate,
    setDueDate,
    setTerms,
    //......................//


    //itemMaster
    setItemSearch,
    setOpenRowItemDropdown,
    setActiveItemId,
    addItem,
    updateItem,
    removeItem,
    //ui
    setShowSaveMenu,
    toggleSaveMenu,
    //totalBlock
    selectSubTotal,
    selectDiscountAmount,
    selectTaxAmount,
    selectTcsAmount,
    selectTdsAmount,
    selectGrandTotal,
    //......................//

    setField,
    updateInvoiceField,


    //salesPerson
    setSalesPersonId,
    setSalesPersonName,
    setSalesPersonSearch,
    setOpenSalesPerson,

    //currency & exchangerate
    setCurrency,
    setOpenCurrency,
    selectFilteredCurrencies,
    setCurrencySearch,
    setCustomerCurrency,


    //errors
    setErrors,
    clearErrors,

    //rest
    resetDirty,
    resetInvoice



} from "../../slices/invoices/invoiceSlice";

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
    MoreHorizontal
} from "lucide-react";


import { TaxDropdown, TaxTypeSelector } from "../components/Tax";

import InvoiceAddPaymentCard from "../components/bars/InvoiceAddPaymentCard";

import BottomActionBarInvoice from "../pages/createInvoice/BottomActionBarInvoice";

import NewCustomerModal from "../models/NewCustomerModal";

import { motion, AnimatePresence } from "framer-motion";

import InvoiceNumberPreferenceModal from "../models/invoices/invoiceNumber/InvoiceNumberPreferenceModal";

export default function EditInvoice() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const isCustomerModalOpen = useSelector(
        (state) => state.ui.isCustomerModalOpen
    );

    const EMPTY_ARRAY = [];
    const EMPTY_OBJECT = {};

    const customerDropdownRef = useRef(null);

    const customers = useSelector(
        (state) => state.invoice.customers ?? []
    );

    const customerSearch = useSelector(
        (state) => state.invoice.customerSearch
    );

    const openCustomer = useSelector(
        (state) => state.invoice.openCustomer
    );

    //customer section , right toggle customerDetaisl
    const customerName = useSelector(
        (state) => state.invoice.customerName
    );

    const customerDetailsTitle = customerName
        ? customerName.endsWith("s") || customerName.endsWith("S")
            ? `${customerName}' Details`
            : `${customerName}'s Details`
        : "Customer Details";

    const { customerCurrency } = useSelector((state) => state.invoice);


    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) =>
            customer.displayName
                ?.toLowerCase()
                .includes(customerSearch.toLowerCase())
        );
    }, [customers, customerSearch]);


    const simplifiedView = useSelector(
        (state) => state.invoice.simplifiedView
    );


    return <div>Edit Invoice {id}</div>;
}
