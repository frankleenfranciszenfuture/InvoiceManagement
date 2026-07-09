import { Settings } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSettings } from "../../../slices/Ui/uiSlice";

import Tooltip from "../../../common/Tooltip/Tooltip";
import SettingsMenu from "../../../common/Models/SettingsMenu";

export default function SettingsButton() {
    const dispatch = useDispatch();

    return (
        <div className="relative group">
            <button
                onClick={() => dispatch(toggleSettings())}
                className="w-9 h-9 rounded hover:bg-gray-100 flex items-center justify-center"
            >
                <Settings size={18} />
            </button>

            <Tooltip text="Settings" />

            <SettingsMenu />
        </div>
    );
}