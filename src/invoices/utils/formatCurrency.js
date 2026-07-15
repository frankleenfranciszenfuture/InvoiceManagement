// export const formatCurrency = (amount, currency = "INR") => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency,
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(Number(amount || 0));
// };

export const formatCurrency = (
  amount,
  currency = "INR",
  exchangeRate = 1,
  baseCurrency = "INR",
) => {
  let convertedAmount = Number(amount || 0);

  // Convert from base currency (INR) to selected currency
  if (currency !== baseCurrency && exchangeRate > 0) {
    convertedAmount = convertedAmount / exchangeRate;
  }

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);
};
