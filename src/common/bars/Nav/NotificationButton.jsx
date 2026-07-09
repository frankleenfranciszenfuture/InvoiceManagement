import { Bell } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleNotifications } from "../../../slices/Ui/uiSlice";

import Tooltip from "../../../common/Tooltip/Tooltip";
import NotificationMenu from "../../../common/Models/NotificationMenu";

export default function NotificationButton() {
    const dispatch = useDispatch();

    return (
        <div className="relative group">
            <button
                onClick={() => dispatch(toggleNotifications())}
                className="w-9 h-9 rounded hover:bg-gray-100 flex items-center justify-center"
            >
                <Bell size={18} />
            </button>

            <Tooltip text="Notifications" />

            <NotificationMenu />
        </div>
    );
}