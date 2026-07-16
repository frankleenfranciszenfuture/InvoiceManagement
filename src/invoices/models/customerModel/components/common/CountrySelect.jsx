import React from 'react'

import SearchSelect from "./SearchSelect";

const options = [
    { value: "India", label: "🇮🇳 India" },
    { value: "United States", label: "🇺🇸 United States" },
    { value: "United Kingdom", label: "🇬🇧 United Kingdom" },
    { value: "UAE", label: "🇦🇪 United Arab Emirates" },
];

export default function CountrySelect(props) {
    return (
        <SearchSelect
            {...props}
            options={options}
            placeholder="Country"
        />
    );
}