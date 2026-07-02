import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import {
  setCustomerName,
  setCustomerSearch,
  setSalesPersonSeacth,
  setOpenCustomer,
  setInvoiceNumber,
  setInvoiceDate,
  addItem,
  updateItem,
  removeItem,
  setItemSearch,
  setOpenRowItemDropdown,
  setActiveItemId,
  selectTotal,
} from "../slices/invSlice";
import {
  Search,
  ChevronDown,
  Settings,
  Plus,
  Trash2,
  X,
  Grip,
} from "lucide-react";

export default function NewInvoiceSimple() {
  const dispatch = useDispatch();

  const customerDropdownRef = useRef(null);
  const itemDropdownRef = useRef(null);

  const invoice = useSelector((state) => state.invoice);
  const total = useSelector(selectTotal);

  const customerSearch = useSelector((state) => state.invoice.customerSearch);
  const customerSearch = useSelector((state) => state.invoice.customerSearch);
  const openCustomer = useSelector((state) => state.invoice.openCustomer);
  const openRowItemDropdown = useSelector(
    (state) => state.invoice.openRowItemDropdown,
  );
  const activeItemId = useSelector((state) => state.invoice.activeItemId);
  const itemSearch = useSelector((state) => state.invoice.itemSearch);
  const itemMaster = useSelector((state) => state.invoice.itemMaster);

  const [showSummary, setShowSummary] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showGateway, setShowGateway] = useState(false);

  const fmt = (n) => parseFloat(n || 0).toFixed(2);

  const filteredCustomers = invoice.customers.filter((c) =>
    c.customerName.toLowerCase().includes(customerSearch.toLowerCase()),
  );

  const filteredItems = itemMaster.filter((item) =>
    item.itemName.toLowerCase().includes(itemSearch.toLowerCase()),
  );

  const totalQty = invoice.items.reduce(
    (sum, i) => sum + (Number(i.quantity) || 0),
    0,
  );

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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Customer Name */}
      <div className="bg-gray-50 px-6 py-4 flex items-center border-b border-gray-200">
        <label className="w-44 text-sm font-medium text-red-500 shrink-0 flex items-center gap-1">
          Customer Name<span>*</span>
          <span className="w-2 h-2 bg-blue-500 rounded-full" />
        </label>

        <div className="flex gap-2 max-w-[550px] flex-1">
          <div ref={customerDropdownRef} className="relative flex-1">
            <input
              type="text"
              value={customerSearch}
              placeholder="Select or add a customer"
              onClick={() => dispatch(setOpenCustomer(!openCustomer))}
              onChange={(e) => dispatch(setCustomerSearch(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <ChevronDown
              size={14}
              className="absolute right-3 top-3 text-gray-400"
            />

            {openCustomer && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-lg z-50">
                <div className="p-2 border-b border-gray-200">
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
                      className="w-full border border-blue-300 rounded pl-10 pr-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredCustomers.map((customer) => (
                    <button
                      key={customer.id}
                      onClick={() => {
                        dispatch(setCustomerName(customer.customerName));
                        dispatch(setCustomerSearch(customer.customerName));
                        dispatch(setOpenCustomer(false));
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-500 hover:text-white text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-medium">
                        {customer.customerName?.charAt(0)}
                      </div>
                      <div>
                        <p>{customer.customerName}</p>
                        <p className="text-xs opacity-80">{customer.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 border-t border-gray-200 hover:bg-blue-100 cursor-pointer px-3 py-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                    <Plus size={12} className="text-white" />
                  </div>
                  <h2 className="text-sm font-medium text-blue-800">
                    New Customer
                  </h2>
                </div>
              </div>
            )}
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded">
            <Search size={15} />
          </button>
        </div>
      </div>

      {/* Invoice# + Invoice Date — only the two essential fields */}
      <div className="px-6 py-5 space-y-4">
        <div className="flex items-center">
          <label className="w-44 text-sm font-medium text-red-500 shrink-0">
            Invoice#<span>*</span>
          </label>
          <div className="relative w-[330px]">
            <input
              value={invoice.invoiceNumber}
              onChange={(e) => dispatch(setInvoiceNumber(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm"
            />
            <Settings
              size={14}
              className="absolute right-3 top-3 text-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-44 text-sm font-medium text-red-500 shrink-0">
            Invoice Date<span>*</span>
          </label>
          <DatePicker
            selected={
              invoice.invoiceDate ? new Date(invoice.invoiceDate) : null
            }
            onChange={(date) =>
              dispatch(setInvoiceDate(date.toISOString().split("T")[0]))
            }
            dateFormat="dd/MM/yyyy"
            className="w-[330px] border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="border-t border-gray-200" />

      {/* Item Table — same table, simplified header (no Scan Item) */}
      <div className="px-6 py-5">
        <div className="border border-gray-200 rounded-lg overflow-visible">
          <div className="flex items-center px-4 py-3 bg-white border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700">Item Table</h3>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-8" />
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Item Details
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-28">
                  Quantity
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-36">
                  Rate
                </th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide w-28">
                  Amount
                </th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50 group"
                >
                  <td className="px-3 py-3 text-gray-300">
                    <Grip size={14} />
                  </td>

                  <td className="px-4 py-3 relative">
                    {item.selected ? (
                      <div>
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
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </div>
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
                          className="w-full text-sm text-gray-500 focus:outline-none"
                        />

                        {openRowItemDropdown && activeItemId === item.id && (
                          <div
                            ref={itemDropdownRef}
                            className="absolute top-full left-0 mt-2 w-[500px] bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                          >
                            <div className="max-h-64 overflow-y-auto p-1">
                              {filteredItems.map((product) => (
                                <div
                                  key={product.id}
                                  onClick={() => {
                                    dispatch(
                                      updateItem({
                                        id: item.id,
                                        field: "description",
                                        value: product.itemName,
                                      }),
                                    );
                                    dispatch(
                                      updateItem({
                                        id: item.id,
                                        field: "rate",
                                        value: product.rate,
                                      }),
                                    );
                                    dispatch(
                                      updateItem({
                                        id: item.id,
                                        field: "selected",
                                        value: true,
                                      }),
                                    );
                                    dispatch(setOpenRowItemDropdown(false));
                                    dispatch(setActiveItemId(null));

                                    const isLastRow =
                                      invoice.items[invoice.items.length - 1]
                                        .id === item.id;
                                    if (isLastRow) dispatch(addItem());
                                  }}
                                  className="cursor-pointer rounded-md px-3 py-3 hover:bg-blue-500 hover:text-white"
                                >
                                  <div className="font-semibold uppercase">
                                    {product.itemName}
                                  </div>
                                  <div className="text-sm opacity-80">
                                    Rate: ₹{product.rate.toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={item.quantity}
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
                      value={item.rate}
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
                    {invoice.items.length > 1 && (
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
      </div>

      <div className="flex items-center gap-3 px-6 mb-6">
        <div className="flex items-center ">
          <button
            onClick={() => dispatch(addItem())}
            className="py-2 flex items-center gap-1.5 text-sm text-white bg-blue-500 hover:text-white-700 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-l"
          >
            <Plus
              size={14}
              className="bg-white hover:bg-blue-600 text-blue-500 rounded-lg "
            />
            Add New Row
          </button>
          <button className="bg-blue-500 text-white w-9 h-9 rounded-r border-l border-blue-400 flex items-center justify-center">
            <ChevronDown size={12} className="items-center" />
          </button>
        </div>
        <button className="py-2 flex items-center gap-1.5 text-sm text-white bg-blue-500 hover:text-white-700 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-l">
          <Plus
            size={14}
            className="bg-white hover:bg-blue-600 text-blue-500 rounded-lg "
          />
          Add Items in bulk
        </button>
      </div>

      {/* Total — simplified summary, no notes/terms/gateway */}
      <div className="px-6 pb-8">
        <div className="flex justify-end">
          <div className="w-full max-w-sm">
            <div className="flex justify-between items-center py-3 border-t border-gray-200">
              <span className="text-sm font-semibold text-gray-700">
                Total (₹)
              </span>
              <span className="text-base font-bold text-gray-900">
                {fmt(total)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Total Quantity</span>
              <span>{totalQty}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
