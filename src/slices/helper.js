export const fmt = {
  currency: (v) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(v ?? 0),
  date: (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—",
  num: (n) => new Intl.NumberFormat("en-IN").format(n ?? 0),
};

export const STATUS_META = {
  DRAFT: { label: "Draft", color: "bg-gray-100 text-gray-700" },
  SAVED: { label: "Saved", color: "bg-blue-100 text-blue-700" },
  SENT: { label: "Sent", color: "bg-purple-100 text-purple-700" },
  PAID: { label: "Paid", color: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Cancelled", color: "bg-red-100 text-red-700" },
  OVERDUE: { label: "Overdue", color: "bg-orange-100 text-orange-700" },
};

export const isOverdue = (inv) =>
  inv.status !== "PAID" &&
  inv.status !== "CANCELLED" &&
  inv.dueDate &&
  new Date(inv.dueDate) < new Date();

export const getDisplayStatus = (inv) =>
  isOverdue(inv) ? "OVERDUE" : inv.status;
