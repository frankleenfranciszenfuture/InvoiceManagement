import Select from "react-select";
// import "./css/SearchSelect.css"; // Import CSS

const customStyles = {
    control: (base, state) => ({
        ...base,
        minHeight: 38,
        borderRadius: 6,
        borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
        boxShadow: state.isFocused ? "0 0 0 1px #2563eb" : "none",
        "&:hover": {
            borderColor: "#2563eb",
        },
    }),

    menu: (base) => ({
        ...base,
        borderRadius: 6,
        overflow: "hidden",
    }),

    menuList: (base) => ({
        ...base,
        maxHeight: 220,
        overflowY: "auto",
        paddingTop: 0,
        paddingBottom: 0,
    }),

    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "#2563eb"
            : state.isFocused
                ? "#eff6ff"
                : "#fff",
        color: state.isSelected ? "#fff" : "#111827",
        cursor: "pointer",
    }),

    indicatorSeparator: () => ({
        display: "none",
    }),
};

export default function SearchSelect({
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    error,
    isClearable = false,
}) {
    return (

        <div className="w-full">
            <Select
                className="w-full"
                classNamePrefix="react-select"
                options={options}
                value={options.find((o) => o.value === value) || null}
                onChange={(option) => onChange(option?.value ?? "")}
                placeholder={placeholder}
                styles={customStyles}
                isSearchable
                isClearable={isClearable}
                noOptionsMessage={() => "No results found"}
            />

            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>

    );
}