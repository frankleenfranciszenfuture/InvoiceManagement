import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import ItemTable from './ItemTable'
import { Download, Loader2, Loader2Icon, Plus, UserCircle } from 'lucide-react'

import {
    loadItemMasters,
    setSelectedItemMaster,
    loadItemMasterById,

} from "../../slices/itemMasterSlice";

import { setItemStatus } from '../../slices/items/ItemViewSlice';

import NavbarItems from './NavbarItems';

export default function ItemsDashboard() {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();



    const itemMasters = useSelector((state) => state.itemMaster.itemMasters);
    const selectedItemMaster = useSelector((state) => state.itemMaster.selectedItemMaster);
    const loading = useSelector((state) => state.itemMaster.loading);
    const error = useSelector((state) => state.itemMaster.error);


    const itemStatus = searchParams.get("itemStatus") || "ALL";

    useEffect(() => {
        dispatch(
            loadItemMasters({
                itemStatus,
            })
        );
    }, [dispatch, itemStatus]);

    if (loading) {
        return (
            <div className="flex flex-1 items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                    <p className="mt-4 text-sm font-medium text-gray-700">
                        Loading items...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-[13px] overflow-hidden">
            {/* Form Container Wrapper allowing separate inner scrolling */}
            <div className="flex-1 min-h-0 bg-white overflow-y-auto">
                <div className="px-2 py-5 max-w-30xl w-full ">
                    <NavbarItems />
                    <> {itemMasters.length > 0 ? (
                        <ItemTable />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16">
                            <h2 className="text-lg font-semibold text-gray-800">
                                No records found
                            </h2>

                            <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
                                There are no items to display. Create a new item or import an existing file to get started.
                            </p>

                            <div className="flex items-center gap-3 mt-6">
                                <button
                                    onClick={() => navigate("/items/new")}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                >
                                    <Plus size={16} />
                                    Create New Item
                                </button>

                                <button
                                    className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition"
                                >
                                    <Download size={16} />
                                    Import File
                                </button>
                            </div>
                        </div>
                    )}
                    </>
                </div>
            </div>
        </div>
    )
}
