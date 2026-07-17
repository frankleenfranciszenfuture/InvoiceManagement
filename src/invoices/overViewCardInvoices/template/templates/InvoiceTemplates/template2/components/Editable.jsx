import React from "react";

export default function Editable({
    value = "",
    onChange,
    type = "text", // text | number | textarea | date | email
    className = "",
    placeholder = "",
    readOnly = false,
    rows = 3,
}) {
    const commonClass = `
        w-full
        rounded
        px-2
        py-1
        bg-transparent
        hover:bg-gray-50
        focus:bg-yellow-50
        focus:outline-none
        border
        border-transparent
        focus:border-blue-400
        transition
        ${className}
    `;

    if (type === "textarea") {
        return (
            <textarea
                value={value ?? ""}
                rows={rows}
                readOnly={readOnly}
                placeholder={placeholder}
                className={`${commonClass} resize-none`}
                onChange={(e) => onChange?.(e.target.value)}
            />
        );
    }

    return (
        <input
            type={type}
            value={value ?? ""}
            readOnly={readOnly}
            placeholder={placeholder}
            className={commonClass}
            onChange={(e) =>
                onChange?.(
                    type === "number"
                        ? Number(e.target.value) || 0
                        : e.target.value
                )
            }
        />
    );
}