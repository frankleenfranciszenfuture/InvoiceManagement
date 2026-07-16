import React from 'react'

import FormLabel from "./FormLabel";

export default function FormRadioGroup({
    label,
    value,
    onChange,
    options,
}) {

    return (

        <div className="grid grid-cols-[180px_1fr] gap-6">

            <FormLabel >

                {label}

            </FormLabel>

            <div className="flex gap-8">

                {options.map(option => (

                    <label
                        key={option.value}
                        className="flex items-center gap-2"
                    >

                        <input
                            type="radio"
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                        />

                        {option.label}

                    </label>

                ))}

            </div>

        </div>

    );

}