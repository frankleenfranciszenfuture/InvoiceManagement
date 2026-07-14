const TaxTypeSelector = ({ value, onChange }) => {
    return (
        <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input
                    type="radio"
                    checked={value === "TDS"}
                    onChange={() => onChange("TDS")}
                    className="accent-blue-600"
                />
                TDS
            </label>

            <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input
                    type="radio"
                    checked={value === "TCS"}
                    onChange={() => onChange("TCS")}
                    className="accent-blue-600"
                />
                TCS
            </label>
        </div>
    );
};

export default TaxTypeSelector;