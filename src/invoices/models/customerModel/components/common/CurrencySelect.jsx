import React from 'react'

import SearchSelect from "./SearchSelect";

const currencyOptions = [
    { value: "INR", label: "🇮🇳 Indian Rupee (₹)" },
    { value: "USD", label: "🇺🇸 US Dollar ($)" },
    { value: "EUR", label: "🇪🇺 Euro (€)" },
    { value: "GBP", label: "🇬🇧 Pound Sterling (£)" },
    { value: "AED", label: "🇦🇪 UAE Dirham (د.إ)" },
    { value: "AUD", label: "🇦🇺 Australian Dollar (A$)" },
    { value: "CAD", label: "🇨🇦 Canadian Dollar (C$)" },
    { value: "SGD", label: "🇸🇬 Singapore Dollar (S$)" },
    { value: "NZD", label: "🇳🇿 New Zealand Dollar (NZ$)" },
    { value: "JPY", label: "🇯🇵 Japanese Yen (¥)" },
    { value: "CNY", label: "🇨🇳 Chinese Yuan (¥)" },
    { value: "HKD", label: "🇭🇰 Hong Kong Dollar (HK$)" },
    { value: "KRW", label: "🇰🇷 South Korean Won (₩)" },
    { value: "CHF", label: "🇨🇭 Swiss Franc (CHF)" },
    { value: "SEK", label: "🇸🇪 Swedish Krona (kr)" },
    { value: "NOK", label: "🇳🇴 Norwegian Krone (kr)" },
    { value: "DKK", label: "🇩🇰 Danish Krone (kr)" },
    { value: "SAR", label: "🇸🇦 Saudi Riyal (﷼)" },
    { value: "QAR", label: "🇶🇦 Qatari Riyal (﷼)" },
    { value: "KWD", label: "🇰🇼 Kuwaiti Dinar (KD)" },
    { value: "BHD", label: "🇧🇭 Bahraini Dinar (BD)" },
    { value: "OMR", label: "🇴🇲 Omani Rial (﷼)" },
    { value: "MYR", label: "🇲🇾 Malaysian Ringgit (RM)" },
    { value: "THB", label: "🇹🇭 Thai Baht (฿)" },
    { value: "IDR", label: "🇮🇩 Indonesian Rupiah (Rp)" },
    { value: "PHP", label: "🇵🇭 Philippine Peso (₱)" },
    { value: "VND", label: "🇻🇳 Vietnamese Dong (₫)" },
    { value: "ZAR", label: "🇿🇦 South African Rand (R)" },
    { value: "BRL", label: "🇧🇷 Brazilian Real (R$)" },
    { value: "MXN", label: "🇲🇽 Mexican Peso ($)" },
    { value: "RUB", label: "🇷🇺 Russian Ruble (₽)" },
    { value: "TRY", label: "🇹🇷 Turkish Lira (₺)" },
];

export default function CurrencySelect(props) {
    return (
        <SearchSelect
            {...props}
            options={options}
            placeholder="Select Currency"
        />
    );
}
