import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { itemMaster } from '../../slices/invSlice'
import ItemTable from './ItemTable'
import { Download, Plus, UserCircle } from 'lucide-react'


import { loadItemMasters } from '../../slices/itemMasterSlice';

export default function ItemsDashboard() {

    const dispatch = useDispatch();
    const {
        itemMaster,
        loading,
        error,
    } = useSelector((state) => state.itemMaster);


    useEffect(() => {
        dispatch(loadItemMasters());
    }, [dispatch]);


    return (
        <div className="flex h-screen bg-gray-50 font-sans text-[13px] overflow-hidden">
            {/* Form Container Wrapper allowing separate inner scrolling */}
            <div className="flex-1 min-h-0 bg-white overflow-y-auto">
                <div className="px-2 py-5 max-w-30xl w-full ">
                    {/* <NavbarItemMaster /> */}
                    <>
                        {itemMaster?.length > 0 ? (
                            <ItemTable />
                        ) : (
                            <div className="min-h-full flex flex-col items-center justify-center gap-3 px-4">
                                <div className="relative w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-1 flex-shrink-0 mt-30">
                                    <UserCircle className="w-14 h-14 text-gray-400" />
                                    <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                </div>

                                <p className="text-base font-medium text-gray-800 text-center">
                                    Every sale starts with a customer
                                </p>
                                <p className="text-sm text-gray-500 text-center max-w-sm">
                                    Create and manage your customers and their contact persons,
                                    all in one place.
                                </p>

                                <div className="flex items-center gap-2.5 mt-1 flex-wrap justify-center">
                                    <button
                                        // onClick={onCreateNew}
                                        className="flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create New Items
                                    </button>
                                    <button className="flex items-center gap-2 bg-white text-gray-700 text-sm border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap">
                                        <Download className="w-4 h-4" />
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
