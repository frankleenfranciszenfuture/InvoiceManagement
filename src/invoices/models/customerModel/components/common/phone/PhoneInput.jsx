import React from 'react'

import Select from "react-select";
import countryCodes from "./countryCodes";
import phoneStyles from "./phoneStyles";

export default function PhoneInput({
    countryCode,
    phone,
    onCountryChange,
    onPhoneChange,
    placeholder = "Phone Number",
}) {
    return (
        <div className="flex w-full gap-3">

            <div className="w-32">

                <Select
                    options={countryCodes}
                    value={
                        countryCodes.find(
                            c => c.value === countryCode
                        )
                    }
                    onChange={(option) =>
                        onCountryChange(option.value)
                    }
                    styles={phoneStyles}
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    isSearchable
                />

            </div>

            <input
                type="text"
                value={phone}
                onChange={e => onPhoneChange(e.target.value)}
                placeholder={placeholder}
                className="
                    flex-1
                    rounded-md
                    border
                    border-gray-300
                    px-3
                    py-2
                    focus:border-blue-600
                    focus:outline-none
                "
            />

        </div>
    );
}