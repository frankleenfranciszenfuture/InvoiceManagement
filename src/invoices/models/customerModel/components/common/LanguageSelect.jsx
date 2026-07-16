import React from 'react'

import SearchSelect from "./SearchSelect";


const options = [
    { value: "English", label: "English" },
    { value: "Tamil", label: "தமிழ் (Tamil)" },
    { value: "Hindi", label: "हिन्दी (Hindi)" },
    { value: "Malayalam", label: "മലയാളം (Malayalam)" },
    { value: "Kannada", label: "ಕನ್ನಡ (Kannada)" },
    { value: "Telugu", label: "తెలుగు (Telugu)" },
    { value: "French", label: "Français (French)" },
    { value: "German", label: "Deutsch (German)" },
    { value: "Spanish", label: "Español (Spanish)" },
    { value: "Chinese", label: "中文 (Chinese)" },
    { value: "Japanese", label: "日本語 (Japanese)" },
];

export default function LanguageSelect(props) {
    return (
        <SearchSelect
            {...props}
            options={options}
            placeholder="Customer Language"
        />
    );
}