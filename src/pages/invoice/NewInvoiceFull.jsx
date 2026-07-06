import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
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
} from "../../slices/invoiceSlice";

import { loadSalesPersons } from "../../slices/salesPersonSlice";

import { loadItemMasters } from "../../slices/itemMasterSlice";

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
import InvoiceAddPaymentCard from "./InvoiceAddPaymentCard";


export default function NewInvoiceFull() {
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

  const salesPersons = useSelector(
    (state) => state.salesPerson.salesPersons ?? []
  );

  const itemMasters = useSelector(
    (state) => state.itemMaster.itemMasters ?? []
  );

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
    (state) => state.invoice.salesPersonSearch ?? ""
  );


  const openCustomer = useSelector((state) => state.invoice?.openCustomer);
  const openSalesPerson = useSelector(
    (state) => state.invoice?.openSalesPerson ?? ""
  );

  const showSaveMenu = useSelector((state) => state.invoice?.showSaveMenu);

  const [showSummary, setShowSummary] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [receivedPayment, setReceivedPayment] = useState(false);

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
  const filteredSalesPersons = (salesPersons ?? []).filter((person) =>
    (person.salesPersonName ?? "")
      .toLowerCase()
      .includes((salesPersonSearch ?? "").toLowerCase())
  );

  //items
  const filteredItems = itemMasters.filter((item) =>
    (item.itemName ?? "")
      .toLowerCase()
      .includes(itemSearch.toLowerCase())
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

  console.log(invoice.customers[0]);

  useEffect(() => {
    dispatch(loadCustomers());
    dispatch(loadSalesPersons());
    dispatch(loadItemMasters());

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

  const makeBlankItem = () => ({
    id: crypto.randomUUID(),

    itemId: null,
    description: "",
    quantity: 1,
    rate: 0,
    amount: 0,

    unit: "",
    selected: false,
  });



  return (
    <div className="flex h-full bg-gray-50 font-sans text-[13px] overflow-hidden">
      {/* Form Container Wrapper allowing separate inner scrolling */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
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
                  onClick={() => dispatch(toggleSimplifiedView())}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ${invoice.simplifiedView ? "bg-blue-500" : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${invoice.simplifiedView ? "translate-x-4" : "translate-x-0"
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

        {/* Body */}

        <div className="flex-1 overflow-y-auto px-3 py-2">
          {/* Customer Name */}
          <div className="flex items-center mb-6">
            <div className="px-2 bg-gray-100 w-full h-[100px] flex items-center ">
              <label className="w-44 text-sm font-medium text-red-500 shrink-0 flex items-center">
                Customer Name<span>*</span>
                <span className="ml-1 inline-block w-2 h-2 bg-blue-500 rounded-full" />
              </label>

              <div className="flex gap-2 w-[550px]">
                <div ref={customerDropdownRef} className="relative flex-1">
                  <input
                    type="text"
                    value={customerSearch}
                    placeholder="Select or add a customer"
                    onClick={() => dispatch(setOpenCustomer(!openCustomer))}
                    onChange={(e) =>
                      dispatch(setCustomerSearch(e.target.value))
                    }
                    className="w-full border border-blue-500 rounded px-3 py-2 text-sm"
                  />

                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-3 text-gray-400"
                  />

                  {openCustomer && (
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
                            value={customerSearch}
                            onChange={(e) =>
                              dispatch(setCustomerSearch(e.target.value))
                            }
                            className="w-full border border-blue-300 rounded pl-10 pr-3 py-2 text-sm  cursor-pointer"
                          />
                        </div>
                      </div>
                      {/* Customer List */}
                      <div className="max-h-60 overflow-y-auto">
                        {filteredCustomers.map((customer) => (
                          <button
                            key={customer.id}
                            onClick={() => {
                              dispatch(setCustomerName(customer.displayName));
                              dispatch(setCustomerSearch(customer.displayName));
                              dispatch(setOpenCustomer(false));

                              dispatch(setCustomerId(customer.id));
                            }}
                            className="w-full flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-500 hover:text-white text-left"
                          >
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                              {customer.displayName?.charAt(0)}
                            </div>

                            <div>
                              <p>{customer.displayName}</p>


                              <p className="text-xs opacity-80">
                                {customer.email}
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
          </div>
          {/* alternate items*/}

          {/* Invoice # and Date row */}
          <div className="px-2 max-w-[1100px]">
            {/* Invoice Number */}
            <div className="flex items-center mb-4">
              <label className="w-44 text-sm font-medium text-red-500 shrink-0">
                Invoice Number<span>#</span>
              </label>

              <div className="relative w-[330px]">
                <input
                  value={invoice.invoiceNumber}
                  onChange={(e) => dispatch(setInvoiceNumber(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-8"
                />

                <Settings
                  size={14}
                  className="absolute right-3 top-3 text-blue-500"
                />
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
          </div>

          {/* Sales person */}

          <div className="flex items-center mt-6">
            <div className="px-2 bg-gray-100 w-full h-[100px] flex items-center ">
              <label className="w-44 text-sm font-medium text-red-500 shrink-0 flex items-center">
                Sales Person<span>*</span>
                <span className="ml-1 inline-block w-2 h-2 bg-blue-500 rounded-full" />
              </label>

              <div className="flex gap-2 w-[380px]">
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
                        {filteredSalesPersons.map((salesPerson) => (
                          <button
                            key={salesPerson.id}
                            onClick={() => {
                              dispatch(setSalesPersonName(salesPerson.salesPersonName));
                              dispatch(setSalesPersonSearch(salesPerson.salesPersonName));
                              dispatch(setOpenSalesPerson(false));

                              dispatch(setCustomerId(salesPerson.id));
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
                {items.map((item) => (
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
                                  filteredItems.map((itemMaster) => (
                                    <div
                                      key={itemMaster.id}
                                      onClick={() => {
                                        dispatch(
                                          updateItem({
                                            id: item.id,
                                            field: "description",
                                            value: itemMaster.itemName,
                                          })
                                        );

                                        dispatch(
                                          updateItem({
                                            id: item.id,
                                            field: "description",
                                            value: itemMaster.description || itemMaster.itemName,
                                          })
                                        );

                                        dispatch(
                                          updateItem({
                                            id: item.id,
                                            field: "rate",
                                            value: itemMaster.sellingPrice,
                                          })
                                        );

                                        dispatch(
                                          updateItem({
                                            id: item.id,
                                            field: "unit",
                                            value: itemMaster.unit,
                                          })
                                        );

                                        dispatch(
                                          updateItem({
                                            id: item.id,
                                            field: "selected",
                                            value: true,
                                          })
                                        );

                                        dispatch(setItemSearch(""));
                                        dispatch(setOpenRowItemDropdown(false));
                                        dispatch(setActiveItemId(null));


                                        if (items[items.length - 1]?.id === item.id) {
                                          dispatch(addItem());
                                        }
                                      }}
                                      className="cursor-pointer rounded-md px-3 py-3 transition-all
                                      hover:bg-blue-600 hover:text-white"
                                    >
                                      <div className="font-semibold uppercase group-hover:text-gray-200">
                                        {itemMaster.itemName}
                                      </div>

                                      <div className="text-sm text-gray-500 group-hover:text-blue-100">
                                        ₹{itemMaster.sellingPrice}
                                      </div>

                                      <div className="text-xs text-gray-500 group-hover:text-blue-100">
                                        {itemMaster.unit}
                                      </div>

                                      {itemMaster.description && (
                                        <div className="text-xs opacity-70 mt-1 group-hover:text-blue-100">
                                          {itemMaster.description}
                                        </div>
                                      )}

                                    </div>
                                  ))
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
                      <input
                        type="number"
                        value={safeNumber(item.rate)}
                        onChange={(e) =>
                          dispatch(
                            updateItem({
                              id: item.id,
                              field: "rate",
                              value: parseFloat(e.target.value),
                            }),
                          )
                        }
                        className="w-full text-right text-sm focus:outline-none bg-transparent border-b border-transparent focus:border-blue-400"
                      />
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-800">
                      {fmt(item.amount)}
                    </td>
                    <td className="px-2 py-3">
                      {items.length > 1 && (
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
            <div className="flex items-center">
              <button
                onClick={() => dispatch(addItem())}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-l"
              >
                <Plus size={14} />
                Add New Row
              </button>
              <button className="border border-l-0 border-blue-200 hover:border-blue-400 px-2 py-1.5 rounded-r text-blue-600">
                <ChevronDown size={14} />
              </button>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded">
              <Plus size={14} />
              Add Items in Bulk
            </button>
          </div>

          {/* Total + Notes */}
          <div className="flex gap-12 mb-6">
            {/* Customer Notes */}
            <div className="flex-1 max-w-sm">
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

            {/* Total block */}
            <div className="flex-1 max-w-sm ml-auto">
              <div className="border border-gray-100 mb-2 px-2">
                {/* {showSummary && ( */}
                <div className="mt-2 text-sm text-gray-600 space-y-1 border-b border-gray-200 pt-2 py-2">
                  <div className="flex justify-between">
                    <span>Sub Total</span>
                    <span>₹{fmt(total)}</span>
                  </div>
                  <div className="flex justify-between mt-6">
                    <span>Discount</span>
                    <span>₹{fmt(total)}</span>
                  </div>

                  <div className="flex justify-between mt-6">
                    <div className="flex gap-2">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="salesType"
                          value="Business"
                          onChange={handleChange("salesType")}
                          className="w-4 h-4 text-blue-600 accent-blue-600"
                        />
                        <span>TDS</span>
                      </label>

                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="salesType"
                          value="Business"
                          onChange={handleChange("salesType")}
                          className="w-4 h-4 text-blue-600 accent-blue-600"
                        />
                        <span>TCS</span>
                      </label>
                    </div>
                    <span>₹{fmt(total)}</span>
                  </div>
                </div>
                {/* )} */}
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-semibold text-gray-700">
                    Total (₹)
                  </span>
                  <span className="text-sm font-semibold text-gray-500">
                    {fmt(total)}
                  </span>
                </div>
              </div>
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
          <div className="space-y-3 mb-8">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Terms and Conditions
              </label>
              <textarea
                rows={3}
                className="w-full max-w-sm border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400 resize-none"
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

            {/* Left Side - Buttons */}
            <div className="flex items-center gap-3">
              <button className="border border-gray-300 text-gray-700 text-sm px-5 py-2 rounded hover:bg-gray-100 font-medium">
                Save as Draft
              </button>

              <div ref={saveMenuRef} className="relative flex items-center">


                <button className="bg-blue-500 text-white px-4 h-10 rounded-l">
                  Save and Send
                </button>

                <button
                  onClick={() => dispatch(toggleSaveMenu())}
                  className="bg-blue-500 text-white w-9 h-10 rounded-r border-l border-blue-400 flex items-center justify-center"
                >
                  <ChevronUp size={12} />
                </button>

                {showSaveMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-500 hover:text-white text-left">
                      <FileSpreadsheet size={16} />
                      Save and Print
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-500 hover:text-white text-left">
                      <UploadCloud size={16} />
                      Save and Share
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-500 hover:text-white text-left">
                      <Mail size={16} />
                      Save and Send Later
                    </button>
                  </div>
                )}
              </div>
              <button className="border border-gray-300 text-gray-700 text-sm px-5 py-2 rounded hover:bg-gray-100 font-medium">
                Cancel
              </button>
            </div>

            {/* Right Side - Total */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-left">
                <div className="text-sm font-semibold text-gray-800">
                  Total Amount:
                  <span className="ml-3 text-lg font-bold text-gray-900">
                    ₹ {fmt(total)}
                  </span>
                </div>

                <div className="text-sm text-gray-500">
                  Total Quantity:
                  <span className="ml-3 font-medium">
                    {items.reduce(
                      (sum, item) => sum + Number(item.quantity || 0),
                      0
                    )}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div >
    </div >

  );
}