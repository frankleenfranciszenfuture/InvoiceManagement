import React from 'react'

import FormLabel from "./FormLabel";

export default function FormSelect({
    label,
    required = false,
    value,
    onChange,
    options,
    error,
}) {
    return (

        <div className="grid grid-cols-[180px_1fr] gap-6 items-start">

            <FormLabel required={required} >
                {label}
            </FormLabel>

            <div>

                <select
                    value={value}
                    onChange={onChange}
                    className={`
                        w-full
                        rounded-md
                        border
                        px-3
                        py-2
                        text-sm
                        focus:ring-2
                        focus:ring-blue-500
                        ${error
                            ? "border-red-500"
                            : "border-gray-300"
                        }
                    `}
                >

                    {options.map(option => (

                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>

                    ))}

                </select>

                {error && (
                    <p className="mt-1 text-xs text-red-500">
                        {error}
                    </p>
                )}

            </div>

        </div>

    );
}