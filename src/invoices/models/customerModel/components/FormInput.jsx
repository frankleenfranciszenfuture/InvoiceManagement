import FormLabel from "./FormLabel";

export default function FormInput({
    label,
    required = false,
    value,
    onChange,
    error,
    placeholder = "",
    type = "text",
    textColor = "text-gray-100",
    icon: Icon,
    iconBg = "bg-blue-400",
    iconSize = 18,
    description = "",
}) {
    return (
        <div className="grid grid-cols-[180px_1fr] gap-6 items-start">

            <FormLabel required={required}>
                {label}
            </FormLabel>

            <div>

                <div className="relative">

                    {Icon && type !== "file" && (
                        <div
                            className={`
                                absolute
                                left-0
                                top-0
                                h-full
                                w-11
                                flex
                                items-center
                                justify-center
                                ${iconBg}
                                border-r
                            `}
                        >
                            <Icon
                                size={iconSize}
                                className={textColor}
                            />
                        </div>
                    )}

                    <input
                        type={type}
                        {...(type !== "file"
                            ? { value: value ?? "" }
                            : {}
                        )}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`
                            w-full
                            rounded-md
                            border
                            px-3
                            py-2
                            text-sm
                            ${Icon && type !== "file"
                                ? "pl-12"
                                : ""
                            }
                            file:mr-3
                            file:rounded-md
                            file:border-0
                            file:bg-gray-100
                            file:px-3
                            file:py-1
                            file:text-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            ${error
                                ? "border-red-500"
                                : "border-gray-300"
                            }
                        `}
                    />

                </div>

                {description && (
                    <p className="mt-1 text-xs text-gray-400">
                        {description}
                    </p>
                )}
                {error && (
                    <p className="mt-1 text-xs text-red-500">
                        {error}
                    </p>
                )}

            </div>

        </div>
    );
}