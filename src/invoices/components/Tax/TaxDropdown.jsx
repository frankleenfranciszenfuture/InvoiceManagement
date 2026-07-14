import { useMemo, useState } from "react";
import { Search, ChevronDown, Settings } from "lucide-react";

const TaxDropdown = ({
    type,
    taxes,
    selectedTax,
    onSelect,
    onManage,
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filteredTaxes = useMemo(() => {
        return taxes.filter(
            (tax) =>
                tax.type === type &&
                tax.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [taxes, type, search]);

    return (
        <div className="relative w-60">
            <button
                onClick={() => setOpen(!open)}
                className="w-38 border border-gray-300 rounded-md px-3 py-2 flex justify-between items-center bg-white"
            >
                <span>{selectedTax?.name || "Select a Tax"}</span>

                <ChevronDown size={16} />
            </button>

            {open && (
                <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">

                    <div className="p-2 border-b border-gray-300">
                        <div className="flex items-center border border-gray-300 rounded px-2">
                            <Search size={16} className="text-gray-400" />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search"
                                className="w-full p-2 outline-none"
                            />
                        </div>
                    </div>

                    <div className="max-h-56 overflow-y-auto">

                        {filteredTaxes.length ? (
                            filteredTaxes.map((tax) => (
                                <button
                                    key={tax.id}
                                    onClick={() => {
                                        onSelect(tax);
                                        setOpen(false);
                                    }}
                                    className="block w-full px-3 py-2 text-left hover:bg-blue-50"
                                >
                                    {tax.name}
                                </button>
                            ))
                        ) : (
                            <div className="px-3 py-4 text-sm text-gray-500">
                                NO RESULTS FOUND
                            </div>
                        )}

                    </div>

                    <div className="border-t border-gray-200 p-2">
                        <button
                            onClick={onManage}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                            <Settings size={16} />
                            Manage {type}
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default TaxDropdown;