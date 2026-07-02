import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addInvoice } from "../slices/invSlice";
import { loadCustomers } from "../slices/customerSlice";
import { closeModal } from "../slices/uiSlice";
import { loadDashboardStats } from "../slices/dashboardSlice";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const emptyItem = () => ({
  productName: "",
  description: "",
  quantity: 1,
  unitPrice: "",
  discountPercent: 0,
  taxPercent: 18,
});

export default function CreateInvoiceModal() {
  const dispatch = useDispatch();
  const customers = useSelector((s) => s.customers.list);
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    customerId: "",
    invoiceDate: today,
    dueDate: "",
    invoiceType: "REGULAR",
    reference: "",
    poNumber: "",
    vehicleNo: "",
    challanNo: "",
    salesPerson: "",
    dispatchNumber: "",
    discountPercent: 0,
    action: "DRAFT",
  });
  const [items, setItems] = useState([emptyItem()]);

  useEffect(() => {
    dispatch(loadCustomers());
  }, [dispatch]);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setItem = (i, k, v) =>
    setItems((arr) =>
      arr.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)),
    );
  const addItem = () => setItems((a) => [...a, emptyItem()]);
  const removeItem = (i) => setItems((a) => a.filter((_, idx) => idx !== i));

  const calcItem = (it) => {
    const base =
      (parseFloat(it.quantity) || 0) * (parseFloat(it.unitPrice) || 0);
    const disc = (base * (parseFloat(it.discountPercent) || 0)) / 100;
    const taxable = base - disc;
    const tax = (taxable * (parseFloat(it.taxPercent) || 0)) / 100;
    return (taxable + tax).toFixed(2);
  };

  const total = items.reduce((s, it) => s + parseFloat(calcItem(it)), 0);

  const handleSubmit = async (action) => {
    if (!form.customerId) {
      toast.error("Select a customer");
      return;
    }
    if (!items[0].productName) {
      toast.error("Add at least one item");
      return;
    }
    setLoading(true);
    try {
      await dispatch(
        addInvoice({ ...form, customerId: +form.customerId, action, items }),
      ).unwrap();
      dispatch(loadDashboardStats());
      dispatch(closeModal());
      toast.success(action === "SAVED" ? "Invoice saved!" : "Draft saved!");
    } catch (e) {
      toast.error(e.message || "Failed to create invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-5">
        Create Invoice
      </h2>

      {/* Customer + dates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="sm:col-span-1">
          <label className="label">Customer *</label>
          <select
            className="input"
            value={form.customerId}
            onChange={(e) => setField("customerId", e.target.value)}
          >
            <option value="">Select customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.companyName ? ` — ${c.companyName}` : ""}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Invoice date *</label>
          <input
            type="date"
            className="input"
            value={form.invoiceDate}
            onChange={(e) => setField("invoiceDate", e.target.value)}
          />
        </div>
        <div>
          <label className="label">Due date</label>
          <input
            type="date"
            className="input"
            value={form.dueDate}
            onChange={(e) => setField("dueDate", e.target.value)}
          />
        </div>
      </div>

      {/* Custom headers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {[
          ["reference", "Reference"],
          ["poNumber", "PO Number"],
          ["vehicleNo", "Vehicle No"],
          ["challanNo", "Challan No"],
          ["salesPerson", "Sales Person"],
          ["dispatchNumber", "Dispatch No"],
        ].map(([k, l]) => (
          <div key={k}>
            <label className="label">{l}</label>
            <input
              className="input"
              value={form[k]}
              onChange={(e) => setField(k, e.target.value)}
              placeholder={l}
            />
          </div>
        ))}
      </div>

      {/* Line items */}
      <div className="border border-gray-100 rounded-xl overflow-hidden mb-4">
        <div className="bg-gray-50 px-4 py-2 grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 uppercase">
          <div className="col-span-4">Product</div>
          <div className="col-span-2 text-right">Qty</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-1 text-right">Disc%</div>
          <div className="col-span-1 text-right">Tax%</div>
          <div className="col-span-1 text-right">Total</div>
          <div className="col-span-1" />
        </div>
        {items.map((it, i) => (
          <div
            key={i}
            className="px-4 py-2 grid grid-cols-12 gap-2 items-center border-t border-gray-50"
          >
            <input
              className="input col-span-4"
              placeholder="Product name"
              value={it.productName}
              onChange={(e) => setItem(i, "productName", e.target.value)}
            />
            <input
              className="input col-span-2 text-right"
              type="number"
              min="0"
              value={it.quantity}
              onChange={(e) => setItem(i, "quantity", e.target.value)}
            />
            <input
              className="input col-span-2 text-right"
              type="number"
              min="0"
              placeholder="0.00"
              value={it.unitPrice}
              onChange={(e) => setItem(i, "unitPrice", e.target.value)}
            />
            <input
              className="input col-span-1 text-right"
              type="number"
              min="0"
              max="100"
              value={it.discountPercent}
              onChange={(e) => setItem(i, "discountPercent", e.target.value)}
            />
            <input
              className="input col-span-1 text-right"
              type="number"
              min="0"
              max="100"
              value={it.taxPercent}
              onChange={(e) => setItem(i, "taxPercent", e.target.value)}
            />
            <div className="col-span-1 text-right text-sm font-medium text-gray-700">
              ₹{calcItem(it)}
            </div>
            <button
              onClick={() => removeItem(i)}
              disabled={items.length === 1}
              className="col-span-1 flex justify-center text-gray-400 hover:text-red-500 disabled:opacity-30"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={addItem}
            className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            <Plus size={15} /> Add item
          </button>
          <div className="text-right">
            <span className="text-sm text-gray-500 mr-3">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Global discount */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-sm text-gray-600 shrink-0">
          Apply discount (%) to all items
        </label>
        <input
          type="number"
          min="0"
          max="100"
          className="input w-24"
          value={form.discountPercent}
          onChange={(e) => setField("discountPercent", e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <button
          className="btn-secondary"
          onClick={() => handleSubmit("DRAFT")}
          disabled={loading}
        >
          Save as Draft
        </button>
        <button
          className="btn-primary"
          onClick={() => handleSubmit("SAVED")}
          disabled={loading}
        >
          {loading ? "Saving…" : "Save Invoice"}
        </button>
      </div>
    </div>
  );
}
