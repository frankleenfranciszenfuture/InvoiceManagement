import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleQuickCreate } from "../../../slices/Ui/uiSlice";

import Tooltip from "../../../common/Tooltip/Tooltip";
import QuickCreateMenu from "../../../common/Models/QuickCreateMenu";

export default function QuickCreateButton() {
    const dispatch = useDispatch();

    return (
        <div className="relative group">
            <button
                onClick={() => dispatch(toggleQuickCreate())}
                className="w-9 h-9 rounded bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white"
            >
                <Plus size={18} />
            </button>

            <Tooltip text="Quick Create" />

            <QuickCreateMenu />
        </div>
    );
}