export const validateInvoice = (invoice) => {
  const errors = {};

  // Customer
  if (!invoice.customerId) {
    errors.customerId = "Customer is required.";
  }

  // Invoice Date
  if (!invoice.invoiceDate) {
    errors.invoiceDate = "Invoice date is required.";
  }

  // Due Date
  if (!invoice.dueDate) {
    errors.dueDate = "Due date is required.";
  }

  // Sales Person
  if (!invoice.salesPersonId) {
    errors.salesPersonId = "Sales person is required.";
  }

  // Items
  const items = invoice.invoiceItems || [];

  const validItems = items.filter((item) => item.itemId);

  if (validItems.length === 0) {
    errors.items = "Add at least one item.";
  } else {
    const itemErrors = [];

    validItems.forEach((item, index) => {
      const rowError = {};

      if (!item.quantity || Number(item.quantity) <= 0) {
        rowError.quantity = "Quantity must be greater than 0.";
      }

      if (Number(item.rate) <= 0) {
        rowError.rate = "Rate must be greater than 0.";
      }

      if (Number(item.discount) < 0) {
        rowError.discount = "Discount cannot be negative.";
      }

      // Validate tax only for INR invoices
      if (invoice.currency === "INR" && Number(item.taxPercent) < 0) {
        rowError.taxPercent = "Invalid tax percentage.";
      }

      if (Object.keys(rowError).length > 0) {
        itemErrors[index] = rowError;
      }
    });

    if (itemErrors.length > 0) {
      errors.itemErrors = itemErrors;
    }
  }

  // Shipping
  if (Number(invoice.shippingCharges) < 0) {
    errors.shippingCharges = "Shipping charges cannot be negative.";
  }

  // Adjustment
  if (isNaN(Number(invoice.adjustment))) {
    errors.adjustment = "Invalid adjustment.";
  }

  return errors;
};
