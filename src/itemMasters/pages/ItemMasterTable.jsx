import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionMenubar from "../../common/bars/Action/ActionMenubar";
import {
    setSelectedItemMaster,
} from "../../slices/itemMasters/itemMasterSlice";

import {
    loadItemMasters,
    loadItemMasterById

} from "../../slices/itemMasters/thunks/itemMasterThunks";


import { openModal } from "../../slices/Ui/uiSlice";
import { ChevronDown, Edit, Pencil, Trash2, User } from "lucide-react";
import toast from "react-hot-toast";

export default function ItemMasterTable() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [showEdit, setShowEdit] = useState(false);
    const [showMenu, setShowMenu] = useState(false);


    const itemMasters = useSelector((state) => state.itemMaster.itemMasters);
    const selectedItemMaster = useSelector((state) => state.itemMaster.selectedItemMaster);
    const loading = useSelector((state) => state.itemMaster.loading);
    const error = useSelector((state) => state.itemMaster.error);

    //status color
    const statusColor = {
        ACTIVE: "bg-green-100 text-green-700",
        DRAFT: "bg-yellow-100 text-yellow-700",
        INACTIVE: "bg-red-100 text-red-700",
    };



    if (loading) return <p>Loading...</p>;

    if (error) return <p className="text-red-500">{error}</p>;

    if (!itemMasters || itemMasters.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                <User className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                <p className="text-gray-500">No items yet. Add your first one!</p>
            </div>
        );
    }

    return (

        <div className="bg-white rounded-xl border border-gray-200">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">

                        <tr>
                            {[
                                "Item Name",
                                "Item Type",
                                "Purchase price",
                                "Selling Price",
                                "Description",
                                "Unit",
                                "Status",
                                "Actions",
                            ].map((h) => (
                                <th
                                    key={h}
                                    className={`px-4 py-3 font-medium text-sm text-gray-500 uppercase ${h === "Actions" ? "text-right" : "text-left"
                                        }`}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>


                    <tbody>
                        {itemMasters?.length > 0 ? (
                            itemMasters.map((item, index) => (
                                <tr
                                    key={item.id || index}
                                    onClick={() => {
                                        dispatch(setSelectedItemMaster(item));
                                        navigate(`/items/view/${item.id}`);
                                    }}
                                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    {/* Customer Info */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {/* <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarColor(
                                                    item.itemName || " ",
                                                )}`}
                                            >
                                                {initials(c.displayName || c.customerName)}
                                            </div> */}

                                            <div>
                                                <p className="font-small text-gray-800">
                                                    {item.itemName}
                                                </p>
                                                {/* <p className="text-sm text-gray-500">ID: #{item.id}</p> */}
                                            </div>
                                        </div>
                                    </td>


                                    {/* Type */}
                                    <td className="px-4 py-3">{item.itemType || "—"}</td>

                                    {/* purchasePrice */}
                                    <td className="px-4 py-3">{item.purchasePrice || "—"}</td>

                                    {/* sellingPrice */}
                                    <td className="px-4 py-3">{item.sellingPrice || "—"}</td>

                                    {/* unit */}
                                    <td className="px-4 py-3">
                                        {item.unit || "—"}
                                    </td>


                                    {/* description */}
                                    <td className="px-4 py-3">
                                        {item.description || "—"}
                                    </td>

                                    {/* Status */}
                                    <td className="px-5 py-3 font-semibold">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[item.itemStatus]}`}
                                        >
                                            {item.itemStatus || "—"}
                                        </span>
                                    </td>


                                    {/* Actions */}
                                    {/* <td className="relative overflow-visible px-4 py-3">
                                        <div className="flex justify-end">
                                            <div className="relative group inline-block">
                                                <button
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="p-1 rounded-full bg-blue-500 text-white"
                                                >
                                                    <ChevronDown size={16} />
                                                </button>

                                                <div
                                                    className="
                                                    absolute
                                                    right-0
                                                    top-full
                                                    mt-1
                                                    z-[9999]
                                                    opacity-0
                                                    invisible
                                                    group-hover:opacity-100
                                                    group-hover:visible
                                                    transition-all
                                                  "
                                                >
                                                    <div className="w-32 rounded-md bg-blue-500 shadow-lg ">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevent row click
                                                                setShowEdit(true);
                                                                dispatch(setSelectedItems(item));
                                                                navigate(`/items/edit/${item.id}`);
                                                            }}
                                                            className="flex w-full items-center gap-2 px-4 py-2 text-white hover:bg-blue-600 rounded-md"
                                                        >
                                                            <Edit size={16} />
                                                            Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </td> */}


                                    <td className="px-6 py-3 text-right">
                                        <ActionMenubar
                                            onEdit={() => {
                                                dispatch(setSelectedItemMaster(item));
                                                navigate(`/items/edit/${item.id}`);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-gray-500 ">
                                    No customers found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
