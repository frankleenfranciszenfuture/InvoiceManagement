export const formatCurrency = (amount, currency = "INR") => {
  const code = currency?.toUpperCase() || "INR";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount || 0));
};
