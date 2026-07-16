import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

// import { loadCustomers } from "../../../slices/customers/thunks/customerThunks";
import { loadInvoiceNumber, addInvoice, loadInvoices, loadInvoiceCustomers } from "../../../slices/invoices/thunks/invoiceThunks"
import { loadItemMasters } from "../../../slices/itemMasters/thunks/itemMasterThunks"
import { loadTaxMasters, getTaxMasterByType } from "../../../slices/invoices/tax/thunks/taxMasterThunks";
import { loadSalesPerson } from "../../../slices/salesPerson/thunks/salesPersonThunks";
import { loadCurrencies, loadExchangeRate } from "../../../slices/invoices/currency/thunks/currencyThunks"
import { closeModal, openCustomerModal, closeInvoiceNumberModal, openInvoiceNumberModal } from "../../../slices/Ui/uiSlice";
import { validateInvoice } from "../../../invoices/utils/validateInvoice";
// import NewCustomerModal from "../../../invoices/models/NewCustomerModal";
import CustomerModal from "../../models/customerModel/CustomerModal";
import { formatCurrency } from "../../../invoices/utils/formatCurrency";


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



} from "../../../slices/invoices/invoiceSlice";

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
import { TaxDropdown, TaxTypeSelector } from "../../components/Tax";
import InvoiceAddPaymentCard from "../../components/bars/InvoiceAddPaymentCard";
import BottomActionBarInvoice from "../../pages/createInvoice/BottomActionBarInvoice";
import NewCustomerModal from "../../models/NewCustomerModal";
import { motion, AnimatePresence } from "framer-motion";
import InvoiceNumberPreferenceModal from "../../models/invoices/invoiceNumber/InvoiceNumberPreferenceModal";

export default function NewInvoiceFull() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


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


    //invoice

    const invoice = useSelector(
        (state) => state.invoice ?? EMPTY_OBJECT
    );


    const invoiceNumber = useSelector(
        (state) => state.invoice.invoiceNumber
    );

    const showInvoiceNumberModal = useSelector(
        (state) => state.ui.showInvoiceNumberModal
    );

    const [showInvoiceNumberPreference, setShowInvoiceNumberPreference] =
        useState(false);

    const handleInvoiceNumberSave = (number) => {


        dispatch(
            setInvoiceNumber(number)
        );


    };

    const openInvoiceNumberPreference = () => {

        console.log("Settings clicked");


        const index =
            invoiceNumber.lastIndexOf("-");


        console.log("invoiceNumber:", invoiceNumber);


        dispatch(
            updateInvoiceNumberPreference({

                prefix:
                    invoiceNumber.substring(0, index + 1),


                nextNumber:
                    invoiceNumber.substring(index + 1),


                mode: "AUTO"

            })
        );


        dispatch(
            openInvoiceNumberModal()
        );

    };

    //taxMaster

    const {
        taxes,
        selectedTax,
        loading,
    } = useSelector((state) => state.taxMaster);


    // itemMasters

    //showMenu invoice itemMasters
    const showSaveMenu = useSelector((state) => state.invoice?.showSaveMenu);
    const saveMenuRef = useRef(null);

    const itemMasters = useSelector(
        state => state.invoice.itemMasters
    );

    const invoiceItems = useSelector(
        state => state.invoice.invoiceItems
    );

    const selectItems = (state) => state.invoice.invoiceItems ?? [];

    const itemDropdownRef = useRef(null);

    const itemSearch = useSelector((state) => state.invoice?.itemSearch || "");

    const openItemDropdown = useSelector(
        (state) => state.invoice?.openItemDropdown
    );

    const openRowItemDropdown = useSelector(
        (state) => state.invoice?.openRowItemDropdown
    );

    const activeItemId = useSelector((state) => state.invoice?.activeItemId);

    const editingItemId = useSelector((state) => state.invoice?.editingItemId);

    const filteredItems = useMemo(() => {
        return itemMasters.filter((item) =>
            item.itemName
                ?.toLowerCase()
                .includes(itemSearch.toLowerCase())
        );
    }, [itemMasters, itemSearch]);


    // salesPerson

    const salesPersonDropdownRef = useRef(null);

    const salesPerson = useSelector(
        (state) => state.invoice.salesPersons ?? []
    );

    const salesPersonSearch = useSelector(
        (state) => state.invoice.salesPersonSearch ?? ""
    );

    const openSalesPerson = useSelector(
        (state) => state.invoice?.openSalesPerson ?? ""
    );


    const filteredSalesPerson = useMemo(() => {
        return salesPerson.filter((salesPerson) =>
            salesPerson.salesPersonName
                ?.toLowerCase()
                .includes(salesPersonSearch.toLowerCase())
        );
    }, [salesPerson, salesPersonSearch]);


    //exchangeRate, currency

    const {

        currencies,
        loadingExchangeRate,
        currency,
    } = useSelector((state) => state.invoice);

    //currencyDropDown
    const currencyDropdownRef = useRef(null);


    const currencySearch = useSelector(
        (state) => state.invoice.currencySearch
    );

    const openCurrency = useSelector(
        (state) => state.invoice.openCurrency
    );

    //filterCurrency
    const filteredCurrencies = useSelector(selectFilteredCurrencies);

    const exchangeRate = useSelector(
        (state) => state.invoice.exchangeRate
    );

    // const invoiceCurrency = useSelector(
    //     (state) => state.invoice.currency
    // );

    // const convertedRate =
    //     currency === "INR"
    //         ? itemMasters.sellingPrice
    //         : itemMasters.sellingPrice / exchangeRate;

    const displayPrice =
        currency === "INR"
            ? itemMasters.sellingPrice
            : itemMasters.sellingPrice / exchangeRate.rate;


    //isDirty

    // useEffect for dispatch values
    useEffect(() => {

        dispatch(loadInvoiceCustomers());

    }, [dispatch]);

    useEffect(() => {
        dispatch(loadInvoiceNumber());
        dispatch(loadInvoices());
        dispatch(loadItemMasters());
        dispatch(loadTaxMasters());
        dispatch(loadSalesPerson());
        dispatch(loadCurrencies());
    }, [dispatch]);

    //useEffect for exchangeRate
    useEffect(() => {
        if (invoice.currency && invoice.currency !== "INR") {
            dispatch(
                loadExchangeRate({
                    from: "INR",
                    to: invoice.currency,
                })
            );
        } else {
            dispatch(
                updateInvoiceField({
                    field: "exchangeRate",
                    value: 1,
                })
            );
        }
    }, [invoice.currency, dispatch]);


    useEffect(() => {
        console.log("salesPersonId changed:", invoice.salesPersonId);
    }, [invoice.salesPersonId]);


    //useEffect for change customer show rate rest
    useEffect(() => {

        if (!invoiceItems || invoiceItems.length === 0) return;

        invoiceItems.forEach((item) => {

            if (item.itemId && item.sellingPrice) {

                const newRate =
                    currency === "INR"
                        ? Number(item.sellingPrice)
                        : Number(item.sellingPrice) *
                        Number(exchangeRate?.exchangeRate || 1);


                dispatch(
                    updateItem({
                        id: item.id,
                        field: "rate",
                        value: newRate,
                    })
                );
            }

        });

    }, [currency, exchangeRate]);

    //useEffect for handleClick enable/disable

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

            if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(e.target)) {
                dispatch(setShowSaveMenu(false));
            }


        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dispatch]);

    //calculations
    //safeNumber , safeText
    const safeText = (v) => (v ?? "").toString().toLowerCase();
    const safeNumber = (v) => Number(v ?? 0);

    //fmt
    const fmt = (n) => parseFloat(n || 0).toFixed(2);


    //total block calc
    const subTotal = useSelector(selectSubTotal);
    const discountAmount = useSelector(selectDiscountAmount);
    const taxAmount = useSelector(selectTaxAmount);
    const tdsAmount = useSelector(selectTdsAmount);
    const tcsAmount = useSelector(selectTcsAmount);
    const grandTotal = useSelector(selectGrandTotal);



    //paymentCard
    const [showSummary, setShowSummary] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showGateway, setShowGateway] = useState(false);
    const [receivedPayment, setReceivedPayment] = useState(false);

    // handle function

    //handleChange
    const handleChange = (field) => (e) => {
        dispatch(setField({ field, value: e.target.value }));
    };

    //TermsChanges
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

    const handleSave = async (invoiceStatus) => {
        console.log("========== SAVE ==========");

        const errors = validateInvoice(invoice);

        dispatch(setErrors(errors));

        if (Object.keys(errors).length > 0) {
            return;
        }

        const payload = {
            invoiceDate: invoice.invoiceDate,
            dueDate: invoice.dueDate,
            subject: invoice.subject,
            customerNotes: invoice.customerNotes,
            terms: invoice.terms,
            orderNumber: invoice.orderNumber,
            referenceNumber: invoice.referenceNumber,

            currency: invoice.currency,
            exchangeRate:
                invoice.currency === "INR"
                    ? 1
                    : exchangeRate?.exchangeRate,

            customerId: invoice.customerId,
            salesPersonId: invoice.salesPersonId,

            shippingCharges: invoice.shippingCharges,
            adjustment: invoice.adjustment,

            invoiceStatus,

            items: invoice.invoiceItems.map(item => ({
                itemId: item.itemId,
                quantity: Number(item.quantity ?? 0),
                rate: Number(item.rate ?? 0),
                discount: Number(item.discount ?? 0),
                taxPercent:
                    invoice.currency === "INR"
                        ? Number(item.taxPercent || 0)
                        : 0,
            })),
        };
        console.log("Payload:", JSON.stringify(payload, null, 2));
        try {
            const savedInvoice = await dispatch(addInvoice(payload)).unwrap();

            console.log("Saved Invoice:", savedInvoice);

            dispatch(resetDirty());
            dispatch(resetInvoice());

            const successMessages = {
                ACTIVE: "Invoice created successfully.",
                DRAFT: "Invoice saved as draft.",
                INACTIVE: "Invoice removed successfully.",
            };

            toast.success(successMessages[invoiceStatus]);

            navigate("/invoices");
        } catch (error) {
            console.error(error);
            const errorMessages = {
                ACTIVE: "Failed to create invoice.",
                DRAFT: "Failed to save draft.",
                INACTIVE: "Failed to remove invoice.",
            };

            toast.error(errorMessages[invoiceStatus]);
        }
    };

    const handleSaveClick = () => {
        handleSave("ACTIVE");
    };

    //handleSaveAndNew
    const handleSaveAndNew = async () => {
        console.log("Save & New Invoice");
    };

    //handleSaveAndSend
    const handleSaveAndSend = async () => {
        console.log("Save & Send Invoice");
    };

    //handleSaveAsDraft
    const handleSaveAsDraft = async () => {
        const errors = validateInvoice(invoice);
        dispatch(setErrors(errors));

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const savedInvoice = await dispatch(
                addInvoice({
                    ...invoice,
                    invoiceStatus: "DRAFT",
                })
            ).unwrap();

            dispatch(resetDirty());
            dispatch(resetInvoice());

            toast.success("Invoice saved as draft.");

            navigate(`/sales/invoices/${savedInvoice.id}`);

        } catch (error) {
            toast.error(error?.message || "Failed to save draft.");
        }
    };

    //handleUpdate
    const handleSaveAndPrint = async () => {
        console.log("Update Invoice");
    };


    //handleUpdate
    const handleSaveAndShare = async () => {
        console.log("handleSaveAndShare  Invoice");
    };

    // handleSaveAndSendLater 
    const handleSaveAndSendLater = async () => {
        console.log("handleSaveAndSendLater  Invoice");
    };

    // handleCancel 
    const handleCancel = () => {
        dispatch(resetDirty());
        dispatch(closeModal());
        navigate("/invoices");
    };


    const convertItemRate = (sellingPrice) => {
        const price = Number(sellingPrice) || 0;

        console.log("Conversion Debug:", {
            invoiceCurrency: invoice.currency,
            sellingPrice: price,
            exchangeRate: exchangeRate,
        });

        if (!invoice.currency || invoice.currency === "INR") {
            return price;
        }

        const rate = Number(exchangeRate?.exchangeRate) || 1;

        return price * rate;
    };
    return (
        <div className="flex h-full bg-gray-50 font-sans text-[13px] overflow-hidden">
            {/* Form Container Wrapper allowing separate inner scrolling */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">

                {/* Header */}
                <div className="px-6 py-6 max-w-30xl w-full">
                    <div className="flex items-center justify-between">
                        {/* Left Section */}
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-gray-400 rounded-sm flex items-center justify-center">
                                <div className="w-2.5 h-2.5 border border-gray-400 rounded-sm" />
                            </div>

                            <h1 className="text-lg font-semibold text-gray-800">
                                New Invoice All
                            </h1>

                            <div className="flex items-center gap-2 ml-4 shrink-0">
                                <span className="text-sm text-gray-600 whitespace-nowrap">
                                    Use Simplified View
                                </span>

                                <button
                                    type="button"
                                    // onClick={() => dispatch(toggleSimplifiedView())}
                                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 
                                        transition-colors duration-200 ${simplifiedView ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow 
                                            transition-transform duration-200 ${simplifiedView ? "translate-x-4" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
                                <Settings size={15} />
                                Customize invoice
                            </button>

                            <button
                                // onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* .......... */}


                {/* Body */}

                <div className="flex-1 overflow-y-auto px-3 py-2">

                    {/* Customer Section */}

                    <div className="bg-gray-100 border border-gray-100 rounded-md px-4 py-6 mb-6">

                        <div className="flex">

                            {/* Left Label */}
                            <div className="w-44 pt-2 shrink-0">
                                <label className="text-sm font-medium text-red-500 flex items-center">
                                    Customer Name<span>*</span>
                                    <span className="ml-2 w-2 h-2 rounded-full bg-blue-500"></span>
                                </label>
                            </div>

                            {/* Middle Section */}
                            <div className="flex-1">

                                {/* Customer Row */}
                                <div className="flex items-center gap-3">

                                    {/* Customer Dropdown */}
                                    <div
                                        ref={customerDropdownRef}
                                        className="relative w-[610px]"
                                    >
                                        <input
                                            type="text"
                                            value={customerSearch}
                                            placeholder="Select or add a customer"
                                            onClick={() =>
                                                dispatch(setOpenCustomer(!openCustomer))
                                            }
                                            onChange={(e) =>
                                                dispatch(setCustomerSearch(e.target.value))
                                            }
                                            className="w-full h-10 border border-gray-300 rounded-md px-3 pr-10 text-sm"
                                        />

                                        <ChevronDown
                                            size={16}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                        />

                                        {openCustomer && (
                                            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">

                                                {/* Search */}
                                                <div className="p-2 border-b border-gray-200">
                                                    <div className="relative">
                                                        <Search
                                                            size={16}
                                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                        />

                                                        <input
                                                            type="text"
                                                            value={customerSearch}
                                                            onChange={(e) =>
                                                                dispatch(setCustomerSearch(e.target.value))
                                                            }
                                                            placeholder="Search customer"
                                                            className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Customer List */}
                                                <div className="max-h-64 overflow-y-auto">

                                                    {filteredCustomers.map((customer) => (
                                                        <button
                                                            key={customer.id}
                                                            onClick={() => {

                                                                dispatch(setCustomerId(customer.id));

                                                                dispatch(
                                                                    setCustomerName(customer.displayName)
                                                                );


                                                                const selectedCurrency =
                                                                    customer.currency || "INR";


                                                                // Update invoice currency
                                                                dispatch(
                                                                    updateInvoiceField({
                                                                        field: "currency",
                                                                        value: selectedCurrency,
                                                                    })
                                                                );


                                                                // Update currency dropdown display
                                                                dispatch(
                                                                    setCurrencySearch(selectedCurrency)
                                                                );


                                                                dispatch(
                                                                    setCustomerSearch(customer.displayName)
                                                                );


                                                                dispatch(
                                                                    setOpenCustomer(false)
                                                                );

                                                            }}
                                                            className="w-full flex gap-3 px-4 py-3 hover:bg-blue-500 hover:text-white text-left"
                                                        >
                                                            <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center font-medium">
                                                                {customer.displayName?.charAt(0)}
                                                            </div>

                                                            <div>
                                                                <p>{customer.displayName}</p>
                                                                <p className="text-xs  ">
                                                                    {customer.email}
                                                                </p>
                                                            </div>
                                                        </button>
                                                    ))}

                                                </div>

                                                {/* Footer */}
                                                <div className="border-t px-4 py-3 flex items-center gap-3 hover:bg-blue-50 cursor-pointer">
                                                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                                                        <Plus
                                                            size={12}
                                                            className="text-white"
                                                        />
                                                    </div>

                                                    <span className="text-sm font-medium text-blue-600">
                                                        <button
                                                            type="button"
                                                            onClick={() => dispatch(openCustomerModal())}
                                                            className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50"
                                                        >
                                                            + New Customer
                                                        </button>
                                                    </span>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                    <>
                                        {/* Invoice UI */}

                                        <AnimatePresence>
                                            {isCustomerModalOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -80 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -80 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="fixed inset-0 z-50 bg-black/40 flex justify-center items-start"
                                                >
                                                    <CustomerModal />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* <NewCustomerModal /> */}

                                    </>



                                    {/* Search */}
                                    <button className="w-10 h-10 rounded-md bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center">
                                        <Search size={16} />
                                    </button>

                                    {/* Currency */}
                                    <button className="h-10 border border-gray-300 rounded-md px-4 flex items-center gap-2">
                                        💰
                                        <span className="text-sm">{currency || "INR"}</span>
                                    </button>

                                    {/* Push Details to Right */}
                                    <div className="flex-1 flex justify-end">

                                        <button className="min-w-[220px] h-11 bg-slate-700 hover:bg-slate-800 text-white rounded-md px-5 flex items-center justify-between">

                                            <span>
                                                {customerName
                                                    ? `${customerName}${customerName.endsWith("s") ||
                                                        customerName.endsWith("S")
                                                        ? "'"
                                                        : "'s"
                                                    } Details`
                                                    : "Customer Details"}
                                            </span>

                                            <ChevronRight size={18} />

                                        </button>

                                    </div>

                                </div>

                                {/* Addresses */}
                                <div className="flex mt-6">

                                    <div className="w-[320px]">
                                        <p className="text-gray-600 uppercase text-sm">
                                            Billing Address
                                        </p>

                                        <button className="mt-2 text-blue-600 text-sm hover:underline">
                                            New Address
                                        </button>
                                    </div>

                                    <div className="w-[320px]">
                                        <p className="text-gray-600 uppercase text-sm">
                                            Shipping Address
                                        </p>

                                        <button className="mt-2 text-blue-600 text-sm hover:underline">
                                            New Address
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ...... */}

                    {/* Invoice # and Date row */}
                    <div className="px-2 max-w-[1100px] mt-6">
                        {/* Invoice Number */}
                        <div className="flex items-center mb-4">
                            <label className="w-44 text-sm font-medium text-red-500 shrink-0">
                                Invoice Number<span>#</span>
                            </label>

                            <div className="relative w-[330px]">

                                <input
                                    value={invoiceNumber || ""}
                                    readOnly
                                    placeholder="Generating..."
                                    className="w-full border border-gray-300 rounded px-3 py-2 pr-8 bg-gray-100"
                                />

                                <Settings
                                    size={14}
                                    className="absolute right-3 top-3 text-blue-500 cursor-pointer"
                                    onClick={() => dispatch(openInvoiceNumberModal())}
                                />

                                {showInvoiceNumberPreference && (
                                    <div
                                        className="
                fixed inset-0
                bg-black/30
                backdrop-blur-sm
                flex items-start justify-center
                pt-20
                animate-overlay
                z-50
            "
                                        onClick={() => setShowInvoiceNumberPreference(false)}
                                    >
                                        <div
                                            className="
                    w-[330px]
                    bg-white
                    rounded-modal
                    shadow-modal
                    animate-modal
                "
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Header */}
                                            <div className="flex justify-between items-center p-4 border-b">
                                                <h3 className="font-semibold text-gray-800">
                                                    Invoice Number Preference
                                                </h3>

                                                <button
                                                    onClick={() => setShowInvoiceNumberPreference(false)}
                                                    className="
                            text-gray-500
                            hover:text-red-500
                            text-xl
                            transition-colors
                        "
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4">
                                                Your form here...
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>


                        {/* Order Number */}
                        <div className="flex items-center mb-4">
                            <label className="w-44 text-sm font-medium shrink-0">
                                Order Number<span>#</span>
                            </label>

                            <div className="relative w-[330px]">
                                <input
                                    value={invoice.orderNumber}
                                    onChange={(e) => dispatch(setOrderNumber(e.target.value))}
                                    className="w-full border border-gray-300 rounded px-3 py-2 pr-8"
                                />
                            </div>
                        </div>


                        {/*  Reference Number */}

                        <div className="flex items-center mb-4">
                            <label className="w-44 text-sm font-medium shrink-0">
                                Reference Number
                            </label>

                            <div className="w-[330px]">
                                <input
                                    value={invoice.referenceNumber}
                                    onChange={(e) =>
                                        dispatch(setReferenceNumber(e.target.value))
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        </div>



                        {/* Currency */}

                        {/* <div className="flex items-center mb-4">
                            <label className="w-44 text-sm font-medium shrink-0">
                                Currency
                            </label>

                            <select
                                value={invoice.currency}
                                onChange={(e) =>
                                    dispatch(setCurrency(e.target.value))
                                }
                                className="w-[330px] border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="INR">INR</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                            </select>
                        </div>

                        {invoice.currency !== "INR" && (

                            <div className="flex items-center mb-4">

                                <label className="w-44 text-sm font-medium">
                                    Exchange Rate
                                </label>

                                <input
                                    type="number"
                                    value={invoice.exchangeRate}
                                    onChange={(e) =>
                                        dispatch(setExchangeRate(Number(e.target.value)))
                                    }
                                    className="w-[330px] border border-gray-300 rounded px-3 py-2"
                                />

                            </div>

                        )} */}



                        {/* Currency */}

                        <div className="flex items-center mb-4">
                            <label className="w-44 text-sm font-medium text-gray-700 shrink-0 flex items-center">
                                Currency
                                <span className="ml-1 inline-block w-2 h-2 bg-blue-500 rounded-full" />
                            </label>

                            <div className="flex gap-2 w-[550px]">

                                <div ref={currencyDropdownRef} className="relative flex-1">

                                    <input
                                        type="text"
                                        value={currencySearch}
                                        placeholder="Select currency"
                                        onClick={() =>
                                            dispatch(setOpenCurrency(!openCurrency))
                                        }
                                        onChange={(e) =>
                                            dispatch(setCurrencySearch(e.target.value))
                                        }
                                        className="w-full border border-blue-500 rounded px-3 py-2 text-sm"
                                    />

                                    <ChevronDown
                                        size={14}
                                        className="absolute right-3 top-3 text-gray-400"
                                    />


                                    {openCurrency && (
                                        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-50">

                                            {/* Search */}
                                            <div className="p-2 border border-gray-200">
                                                <div className="relative">

                                                    <Search
                                                        size={16}
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                    />

                                                    <input
                                                        type="text"
                                                        placeholder="Search currency"
                                                        value={currencySearch}
                                                        onChange={(e) =>
                                                            dispatch(
                                                                setCurrencySearch(e.target.value)
                                                            )
                                                        }
                                                        className="w-full border border-blue-300 rounded pl-10 pr-3 py-2 text-sm"
                                                    />

                                                </div>
                                            </div>


                                            {/* Currency List */}
                                            <div className="max-h-60 overflow-y-auto">

                                                {filteredCurrencies.map(([code, name]) => (
                                                    <button
                                                        key={code}
                                                        onClick={() => {

                                                            dispatch(
                                                                setCurrency(code)
                                                            );

                                                            dispatch(
                                                                setCurrencySearch(code)
                                                            );

                                                            dispatch(
                                                                setOpenCurrency(false)
                                                            );

                                                            // load exchange rate
                                                            if (code !== "INR") {
                                                                dispatch(
                                                                    loadExchangeRate({
                                                                        from: code,
                                                                        to: "INR"
                                                                    })
                                                                );
                                                            }

                                                        }}
                                                        className="w-full flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-500 hover:text-white text-left"
                                                    >

                                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                                                            {code.charAt(0)}
                                                        </div>

                                                        <div>
                                                            <p className="font-medium">
                                                                {code}
                                                            </p>

                                                            <p className="text-xs opacity-80">
                                                                {name}
                                                            </p>
                                                        </div>

                                                    </button>
                                                ))}

                                            </div>

                                        </div>
                                    )}

                                </div>


                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded"
                                >
                                    <Search size={15} />
                                </button>

                            </div>
                        </div>

                        {/* .... */}
                        {/* Sales person */}
                        <div className="flex items-center mb-4">
                            <label className="w-44 text-sm font-medium text-red-500 shrink-0 flex items-center">
                                Sales Person<span>*</span>
                                <span className="ml-1 inline-block w-2 h-2 bg-blue-500 rounded-full" />
                            </label>

                            <div className="flex gap-2 w-[550px]">
                                <div ref={salesPersonDropdownRef} className="relative flex-1">
                                    <input
                                        type="text"
                                        value={salesPersonSearch}
                                        placeholder="Select or add a salesperson"
                                        onClick={() =>
                                            dispatch(setOpenSalesPerson(!openSalesPerson))
                                        }
                                        onChange={(e) =>
                                            dispatch(setSalesPersonSearch(e.target.value))
                                        }
                                        className="w-full border border-blue-500 rounded px-3 py-2 text-sm"
                                    />

                                    <ChevronDown
                                        size={14}
                                        className="absolute right-3 top-3 text-gray-400"
                                    />

                                    {openSalesPerson && (
                                        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                                            {/* Search Box */}
                                            <div className="p-2 border border-gray-200">
                                                <div className="relative">
                                                    <Search
                                                        size={16}
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Search"
                                                        value={salesPersonSearch}
                                                        onChange={(e) =>
                                                            dispatch(setSalesPersonSearch(e.target.value))
                                                        }
                                                        className="w-full border border-blue-300 rounded pl-10 pr-3 py-2 text-sm  cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                            {/* Customer List */}
                                            <div className="max-h-60 overflow-y-auto">
                                                {filteredSalesPerson.map((salesPerson) => (
                                                    <button
                                                        key={salesPerson.id}
                                                        onClick={() => {
                                                            console.log("Selected Sales Person:", salesPerson);

                                                            dispatch(setSalesPersonId(salesPerson.id));
                                                            dispatch(setSalesPersonName(salesPerson.salesPersonName));
                                                            dispatch(setSalesPersonSearch(salesPerson.salesPersonName));
                                                            dispatch(setOpenSalesPerson(false));
                                                        }}
                                                        className="w-full flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-500 hover:text-white text-left"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                                                            {salesPerson.salesPersonName?.charAt(0)}
                                                        </div>

                                                        <div>
                                                            <p>{salesPerson.salesPersonName}</p>

                                                            <p className="text-xs opacity-80">
                                                                {salesPerson.email}
                                                            </p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center gap-2 flex-1 border border-gray-200  hover:bg-blue-100  cursor-pointer">
                                                <div className="ml-3 mt-2 mb-2 px-3 py-2 h-7 rounded-full bg-blue-500 border border-gray-400 flex items-center justify-center flex-shrink-0">
                                                    <Plus
                                                        size={8}
                                                        className="w-2 h-3 text-gray-100 font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-medium text-blue-800 ">
                                                        New Customer
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded">
                                    <Search size={15} />
                                </button>
                            </div>
                        </div>

                        {/* Shipping Charges */}

                        <div className="flex items-center mb-4">
                            <label className="w-44 text-sm font-medium shrink-0">
                                <span>Shipping Charges</span>
                            </label>
                            <input
                                type="number"
                                value={invoice.shippingCharges}
                                onChange={(e) =>
                                    dispatch(updateInvoiceField({
                                        field: "shippingCharges",
                                        value: Number(e.target.value)
                                    }))
                                }
                                className="w-[150px] h-[50px] border border-gray-300 rounded px-2 py-1 text-right"
                            />

                        </div>

                        {/* Adjustment */}

                        <div className="flex items-center mb-4">
                            <label className="w-44 text-sm font-medium shrink-0">
                                <span>Adjustment</span>
                            </label>
                            <input
                                type="number"
                                value={invoice.adjustment}
                                onChange={(e) =>
                                    dispatch(updateInvoiceField({
                                        field: "adjustment",
                                        value: Number(e.target.value)
                                    }))
                                }
                                className="w-[150px] h-[50px] border border-gray-300 rounded px-2 py-1 text-right"
                            />

                        </div>



                        {/* Subject */}

                        <div className="flex items-center mb-4">
                            <label className="w-44 text-sm font-medium shrink-0">
                                Subject<span>#</span>
                            </label>

                            <div className="relative w-[330px]">
                                <input
                                    value={invoice.subject}
                                    onChange={(e) => dispatch(setSubject(e.target.value))}
                                    className="w-full border border-gray-300 rounded px-3 py-2 pr-8"
                                />
                            </div>
                        </div>



                        {/* Invoice Date + Terms + Due Date */}
                        <div className="flex items-center">
                            <label className="w-44 text-sm font-medium text-red-500 shrink-0">
                                Invoice Date*
                            </label>

                            <DatePicker
                                selected={
                                    invoice.invoiceDate ? new Date(invoice.invoiceDate) : null
                                }
                                onChange={(date) =>
                                    dispatch(setInvoiceDate(date.toISOString().split("T")[0]))
                                }
                                dateFormat="dd/MM/yyyy"
                                className="w-[330px] border border-gray-300 rounded px-3 py-2"
                            />

                            <div className="flex items-center ml-8 gap-3">
                                <label className="text-sm text-gray-700">Terms</label>

                                <select
                                    value={invoice.terms}
                                    onChange={(e) => handleTermsChange(e.target.value)}
                                    className="w-[150px] border border-gray-300 rounded px-3 py-2"
                                >
                                    <option>Due on Receipt</option>
                                    <option>Net 15</option>
                                    <option>Net 30</option>
                                </select>
                            </div>

                            <div className="flex items-center ml-8 gap-3">
                                <label className="text-sm text-gray-700">Due Date</label>

                                <DatePicker
                                    selected={invoice.dueDate ? new Date(invoice.dueDate) : null}
                                    onChange={(date) =>
                                        dispatch(setDueDate(date.toISOString().split("T")[0]))
                                    }
                                    dateFormat="dd/MM/yyyy"
                                    className="w-[150px] border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        </div>


                        {/* Item Table */}
                        <div className="border border-gray-100 rounded-lg mt-4 mb-4 overflow-visible">
                            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700">
                                    Item Table
                                </h3>
                                <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
                                    <ScanLine size={15} />
                                    Scan Item
                                </button>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-8"></th>
                                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Item Details
                                        </th>
                                        <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-28">
                                            Quantity
                                        </th>
                                        <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-36">
                                            <span className="flex items-center justify-end gap-1">
                                                Rate <Settings size={11} />
                                            </span>
                                        </th>
                                        <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-28">
                                            Amount
                                        </th>
                                        <th className="w-8"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceItems.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-gray-100 hover:bg-gray-50 group"
                                        >
                                            <td className="px-3 py-3 text-gray-300">
                                                <div className="flex flex-col gap-0.5">
                                                    <Grip />
                                                </div>
                                            </td>

                                            {/* Items selected with dropdown */}
                                            <td className="px-4 py-3 relative">
                                                {item.selected ? (
                                                    <div>
                                                        {/* Selected Item Header */}
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="font-medium text-gray-800 uppercase">
                                                                {item.description}
                                                            </span>

                                                            <button
                                                                onClick={() =>
                                                                    dispatch(
                                                                        updateItem({
                                                                            id: item.id,
                                                                            field: "selected",
                                                                            value: false,
                                                                        }),
                                                                    )
                                                                }
                                                                className=" cursor-pointer text-gray-400 hover:text-red-500"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        </div>

                                                        {/* Editable Description */}
                                                        <textarea
                                                            value={item.description}
                                                            rows={2}
                                                            onChange={(e) =>
                                                                dispatch(
                                                                    updateItem({
                                                                        id: item.id,
                                                                        field: "description",
                                                                        value: e.target.value,
                                                                    }),
                                                                )
                                                            }
                                                            className=" cursor-pointer w-full border border-blue-400 rounded-md px-3 py-2 focus:outline-none"
                                                        />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <input
                                                            value={item.description}
                                                            placeholder="Type or click to select an item."
                                                            onClick={() => {
                                                                dispatch(setActiveItemId(item.id));
                                                                dispatch(setOpenRowItemDropdown(true));
                                                            }}
                                                            onChange={(e) => {
                                                                dispatch(
                                                                    updateItem({
                                                                        id: item.id,
                                                                        field: "description",
                                                                        value: e.target.value,
                                                                    }),
                                                                );

                                                                dispatch(setItemSearch(e.target.value));
                                                                dispatch(setActiveItemId(item.id));
                                                                dispatch(setOpenRowItemDropdown(true));
                                                            }}
                                                            className=" cursor-pointer w-full text-sm text-gray-500 focus:outline-none"
                                                        />

                                                        {openRowItemDropdown && activeItemId === item.id && (
                                                            <div
                                                                ref={itemDropdownRef}
                                                                className="absolute top-full left-0 mt-2 w-[600px] bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                                                            >
                                                                {" "}
                                                                <div className="max-h-64 overflow-y-auto p-1">

                                                                    {filteredItems.length === 0 ? (
                                                                        <div className="p-3 text-gray-500">
                                                                            No items found
                                                                        </div>
                                                                    ) : (
                                                                        filteredItems.map((itemMaster) => {

                                                                            const convertedRate = convertItemRate(itemMaster.sellingPrice);

                                                                            return (
                                                                                <div
                                                                                    key={itemMaster.id}
                                                                                    onClick={() => {

                                                                                        console.log({
                                                                                            invoiceCurrency: invoice.currency,
                                                                                            exchangeRate,
                                                                                            originalPrice: itemMaster.sellingPrice,
                                                                                            convertedRate,
                                                                                        });

                                                                                        dispatch(
                                                                                            updateItem({
                                                                                                id: item.id,
                                                                                                updatedFields: {
                                                                                                    itemId: itemMaster.id,
                                                                                                    itemName: itemMaster.itemName,
                                                                                                    itemType: itemMaster.itemType,

                                                                                                    description:
                                                                                                        itemMaster.description ||
                                                                                                        itemMaster.itemName,

                                                                                                    sellingPrice: itemMaster.sellingPrice,

                                                                                                    rate: convertedRate,

                                                                                                    purchasePrice: itemMaster.purchasePrice,
                                                                                                    unit: itemMaster.unit,

                                                                                                    selected: true,
                                                                                                },
                                                                                            })
                                                                                        );

                                                                                        dispatch(setItemSearch(""));
                                                                                        dispatch(setOpenRowItemDropdown(false));
                                                                                        dispatch(setActiveItemId(null));

                                                                                        const isLastRow =
                                                                                            item.id === invoiceItems[invoiceItems.length - 1]?.id;

                                                                                        if (isLastRow) {
                                                                                            dispatch(addItem());
                                                                                        }
                                                                                    }}

                                                                                    className="cursor-pointer rounded-md px-3 py-3 transition-all hover:bg-blue-600 hover:text-white"
                                                                                >

                                                                                    <div className="font-semibold uppercase">
                                                                                        {itemMaster.itemName}
                                                                                    </div>

                                                                                    <div className="text-sm text-gray-500">
                                                                                        {formatCurrency(
                                                                                            convertedRate,
                                                                                            invoice.currency
                                                                                        )}
                                                                                    </div>

                                                                                    <div className="text-xs text-gray-500">
                                                                                        {itemMaster.unit}
                                                                                    </div>

                                                                                    {itemMaster.description && (
                                                                                        <div className="text-xs opacity-70 mt-1">
                                                                                            {itemMaster.description}
                                                                                        </div>
                                                                                    )}

                                                                                </div>
                                                                            );
                                                                        })
                                                                    )}

                                                                </div>
                                                                <div className="border-t px-4 py-3">
                                                                    <button className=" cursor-pointer flex items-center gap-2 text-blue-600">
                                                                        <Plus size={16} />
                                                                        Add New Item
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <input
                                                    type="number"
                                                    value={safeNumber(item.quantity)}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            updateItem({
                                                                id: item.id,
                                                                field: "quantity",
                                                                value: parseFloat(e.target.value),
                                                            }),
                                                        )
                                                    }
                                                    className="w-full text-right text-sm focus:outline-none bg-transparent border-b border-transparent focus:border-blue-400"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    <span className="text-sm text-gray-500">
                                                        {new Intl.NumberFormat("en", {
                                                            style: "currency",
                                                            currency: invoice.currency,
                                                            currencyDisplay: "narrowSymbol",
                                                        })
                                                            .formatToParts(0)
                                                            .find((part) => part.type === "currency")?.value}
                                                    </span>

                                                    <input
                                                        type="number"
                                                        value={safeNumber(item.rate)}
                                                        onChange={(e) =>
                                                            dispatch(
                                                                updateItem({
                                                                    id: item.id,
                                                                    field: "rate",
                                                                    value: parseFloat(e.target.value) || 0,
                                                                })
                                                            )
                                                        }
                                                        className="w-24 text-right text-sm focus:outline-none bg-transparent border-b border-transparent focus:border-blue-400"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm font-semibold text-gray-800">
                                                {fmt(item.amount)}
                                            </td>
                                            <td className="px-2 py-3">
                                                {invoiceItems.length > 1 && (
                                                    <button
                                                        onClick={() => dispatch(removeItem(item.id))}
                                                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Add Row buttons */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center ">
                                <button
                                    onClick={() => dispatch(addItem())}
                                    className="flex items-center gap-1.5 text-sm text-gray-100 hover:text-blue-700 border border-blue-200 hover:border-blue-400 bg-blue-400 
                                    px-3 py-1.5 rounded-l"
                                >
                                    <Plus size={14} />
                                    Add New Row
                                </button>
                                <button className="border border-blue-100 border-l-0 border-blue-200 hover:border-blue-400 bg-blue-400
                                px-2 py-2 rounded-r text-blue-600">
                                    <ChevronDown size={16} />
                                </button>
                            </div>
                            <button className="flex items-center gap-1.5 text-sm text-gray-100 hover:text-blue-700 border border-blue-200 hover:border-blue-400 bg-blue-400
                             px-3 py-1.5 rounded">
                                <Plus size={14} />
                                Add Items in Bulk
                            </button>
                        </div>

                        {/* Total + Notes */}
                        <div className="flex gap-12 mb-6">




                            {/* Total block */}
                            <div className="flex-1 max-w-sm ml-auto">
                                <div className="border border-gray-200 rounded-md px-4 py-3">

                                    {/* Sub Total */}
                                    <div className="flex items-center justify-between text-sm font-semibold mb-5">
                                        <span>Sub Total</span>
                                        <span>{fmt(subTotal)}</span>
                                    </div>

                                    {/* Discount */}
                                    <div className="flex items-center justify-between mb-5">

                                        <div className="w-32">
                                            <span className="text-sm text-gray-700">Discount</span>
                                        </div>

                                        <div className="w-32">
                                            <div className="flex border border-gray-300 rounded-md overflow-hidden">

                                                <input
                                                    type="number"
                                                    value={invoice.discount ?? ""}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            updateInvoiceField({
                                                                field: "discount",
                                                                value: Number(e.target.value),
                                                            })
                                                        )
                                                    }
                                                    className="w-full px-2 py-2 text-right outline-none"
                                                />

                                                <div className="px-3 flex items-center border-l border-gray-300 bg-gray-50 text-gray-600">
                                                    %
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-20 text-right">
                                            -{fmt(discountAmount)}
                                        </div>

                                    </div>



                                    {/* GST */}
                                    {currency === "INR" && (
                                        <>
                                            {/* GST */}
                                            <div className="flex items-center justify-between mb-5">

                                                <div className="w-32">
                                                    <span className="text-sm text-gray-700">
                                                        GST
                                                    </span>
                                                </div>

                                                <div className="w-32">
                                                    <div className="flex border border-gray-300 rounded-md overflow-hidden">

                                                        <input
                                                            type="number"
                                                            placeholder="GST %"
                                                            value={invoice.taxAmount ?? ""}
                                                            onChange={(e) => {
                                                                const value = e.target.value;

                                                                dispatch(
                                                                    updateInvoiceField({
                                                                        field: "taxAmount",
                                                                        value: value === "" ? null : Number(value),
                                                                    })
                                                                );
                                                            }}
                                                            className="w-full px-2 py-2 text-right outline-none"
                                                        />

                                                        <div className="px-3 flex items-center border-l border-gray-300 bg-gray-50 text-gray-600">
                                                            %
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="w-20 text-right">
                                                    {fmt(taxAmount)}
                                                </div>

                                            </div>
                                        </>
                                    )}

                                    {/* TDS / TCS */}
                                    {currency === "INR" && (
                                        <>
                                            {/* TDS / TCS */}
                                            <div className="flex items-center justify-between mb-5">

                                                <div className="w-32 border-gray-200">

                                                    <TaxTypeSelector
                                                        value={invoice.salesType}
                                                        onChange={(value) => {

                                                            dispatch(updateInvoiceField({
                                                                field: "salesType",
                                                                value,
                                                            }));

                                                            dispatch(updateInvoiceField({
                                                                field: "taxId",
                                                                value: null,
                                                            }));

                                                            dispatch(updateInvoiceField({
                                                                field: "taxPercent",
                                                                value: 0,
                                                            }));

                                                            dispatch(getTaxMasterByType(value));

                                                        }}
                                                    />

                                                </div>


                                                <div className="w-32">

                                                    <TaxDropdown
                                                        type={invoice.salesType}
                                                        taxes={taxes}
                                                        selectedTax={selectedTax}
                                                        onSelect={(tax) => {

                                                            dispatch(updateInvoiceField({
                                                                field: "taxId",
                                                                value: tax.id,
                                                            }));

                                                            dispatch(updateInvoiceField({
                                                                field: "taxPercent",
                                                                value: tax.taxRate,
                                                            }));

                                                        }}
                                                        onManage={() =>
                                                            navigate("/settings/tax-master")
                                                        }
                                                    />

                                                </div>


                                                <div className="w-20 text-right text-gray-600">
                                                    - {fmt(tdsAmount)}
                                                </div>

                                            </div>
                                        </>
                                    )}

                                    <hr className="mb-4 border-gray-200" />

                                    {/* Total */}
                                    <div className="flex items-center justify-between font-semibold">

                                        <span className="text-xl text-gray-700">
                                            Total ({new Intl.NumberFormat("en", {
                                                style: "currency",
                                                currency: currency || "INR",
                                                currencyDisplay: "narrowSymbol",
                                            })
                                                .formatToParts(0)
                                                .find(
                                                    (part) => part.type === "currency"
                                                )?.value})
                                        </span>

                                        <span className="text-2xl text-gray-700">
                                            {fmt(grandTotal)}
                                        </span>

                                    </div>
                                </div>

                                {/* .. */}


                                {/* .......... */}
                                <button
                                    onClick={() => setShowSummary(!showSummary)}
                                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 w-full justify-end"
                                >
                                    {/* {showSummary ? "Hide" : "Show"} Total Summary */}
                                    <ChevronDown
                                        size={14}
                                        className={`transition-transform ${showSummary ? "rotate-180" : ""}`}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Terms and Payment links */}
                        {/* Customer Notes */}
                        <div className="flex-1 max-w-[550px]">
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                Customer Notes
                            </label>
                            <textarea
                                value={invoice.customerNotes}
                                onChange={(e) => dispatch(setCustomerNotes(e.target.value))}
                                rows={3}
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Will be displayed on the invoice
                            </p>
                        </div>


                        <div className="space-y-3 mb-8">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">
                                    Terms and Conditions
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full max-w-[550px] border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
                                />
                            </div>

                            <button
                                onClick={() => setShowGateway(!showGateway)}
                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                            >
                                <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                                    <Plus size={12} />
                                </div>
                                Add Payment Gateway
                            </button>

                            {/* payment */}
                            <InvoiceAddPaymentCard />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 bg-white px-6 py-4">
                        <div className="flex items-center justify-between">


                            <BottomActionBarInvoice
                                onSave={handleSaveClick}
                                onSaveAsDraft={handleSaveAsDraft}
                                onSaveAndSend={handleSaveAndSend}
                                onSaveAndPrint={handleSaveAndPrint}
                                onSaveAndShare={handleSaveAndShare}
                                onSaveAndSendLater={handleSaveAndSendLater}
                                onCancel={handleCancel}


                            />
                            {/* Right Side - Total */}
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col items-left">
                                    <div className="text-sm font-semibold text-gray-800">
                                        Total Amount:
                                        <span className="ml-3 text-lg font-bold text-gray-900">
                                            ₹ {fmt(grandTotal)}
                                        </span>
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        Total Quantity:
                                        <span className="ml-3 font-medium">
                                            {invoiceItems.reduce(
                                                (sum, item) => sum + Number(item.quantity || 0),
                                                0
                                            )}
                                        </span>
                                    </div>
                                </div>

                            </div>
                            {/* .......... */}

                            {/* Invoice Number Modal */}
                            {showInvoiceNumberModal && (
                                <InvoiceNumberPreferenceModal
                                    onSave={(number) => {
                                        dispatch(setInvoiceNumber(number));
                                        console.log(number)
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}
