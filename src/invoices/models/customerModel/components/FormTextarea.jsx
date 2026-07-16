import React from 'react'
import FormLabel from "./FormLabel";

export default function FormTextarea({
    label,
    value,
    onChange,
    rows = 4,
}) {

    return (

        <div className="grid grid-cols-[180px_1fr] gap-6">

            <FormLabel>

                {label}

            </FormLabel>

            <textarea
                rows={rows}
                value={value}
                onChange={onChange}
                className="
                    w-full
                    rounded-md
                    border
                    border-gray-300
                    px-3
                    py-2
                    resize-none
                "
            />

        </div>

    );

}