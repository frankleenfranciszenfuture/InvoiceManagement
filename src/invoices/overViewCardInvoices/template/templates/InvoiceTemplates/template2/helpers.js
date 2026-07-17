// helpers.js

export const fmt = {
  currency(value = 0, currency = "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(Number(value || 0));
  },

  number(value = 0) {
    return new Intl.NumberFormat("en-IN").format(Number(value || 0));
  },

  percent(value = 0) {
    return `${Number(value || 0)}%`;
  },

  date(date) {
    if (!date) return "";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  },
};

/* ------------------------------ */

export function calculateItem(item) {
  const qty = Number(item.quantity) || 0;

  const rate = Number(item.unitPrice) || 0;

  const discount = Number(item.discount) || 0;

  const gst = Number(item.taxPercent) || 0;

  const taxableAmount = qty * rate - discount;

  const taxAmount = (taxableAmount * gst) / 100;

  const totalAmount = taxableAmount + taxAmount;

  return {
    ...item,

    taxableAmount,

    taxAmount,

    totalAmount,
  };
}

/* ------------------------------ */

export function calculateInvoice(items = []) {
  let subtotal = 0;

  let discount = 0;

  let tax = 0;

  let grandTotal = 0;

  items.forEach((item) => {
    const row = calculateItem(item);

    subtotal += row.taxableAmount;

    discount += Number(item.discount || 0);

    tax += row.taxAmount;

    grandTotal += row.totalAmount;
  });

  return {
    subtotal,

    discount,

    tax,

    grandTotal,
  };
}

/* ------------------------------ */

export function amountInWords(amount) {
  return `${fmt.currency(amount)} Only`;

  /*
      Replace later with
    
      npm install to-words
    
      import { ToWords } from "to-words";
    
      const words = new ToWords();
    
      return words.convert(amount);
    */
}

/* ------------------------------ */

export function blankItem() {
  return {
    id: Date.now(),

    itemName: "",

    hsn: "",

    quantity: 1,

    unit: "Nos",

    unitPrice: 0,

    discount: 0,

    taxPercent: 18,

    taxableAmount: 0,

    taxAmount: 0,

    totalAmount: 0,
  };
}

/* ------------------------------ */

export function blankInvoice() {
  return {
    company: {},

    customer: {},

    shipping: {},

    bank: {},

    signature: {},

    items: [blankItem()],
  };
}
