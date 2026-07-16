const phoneStyles = {
    control: (base, state) => ({
        ...base,
        minHeight: 40,
        borderColor: state.isFocused
            ? "#2563eb"
            : "#d1d5db",
        boxShadow: "none",
        borderRadius: 6,
    }),

    menuPortal: (base) => ({
        ...base,
        zIndex: 99999,
    }),

    indicatorSeparator: () => ({
        display: "none",
    }),
};

export default phoneStyles;