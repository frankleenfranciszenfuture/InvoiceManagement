import { InfoIcon, Settings, X } from 'lucide-react'
import React from 'react'
import { Label } from 'recharts'

export default function ItemCreate() {
    return (
        <div className="flex h-full bg-gray-50 font-sans text-[13px] overflow-hidden">
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="px-6 py-6 max-w-30xl w-full">
                    <div className="flex items-center justify-between">
                        {/* Left Section */}
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 border-2 border-gray-400 rounded-sm flex items-center justify-center">

                                <div className="w-2.5 h-2.5 border border-gray-400 rounded-sm" />
                            </div>

                            <h1 className="text-lg font-semibold text-gray-800">
                                New Item
                            </h1>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
                                <Settings size={15} />
                                Customize invoice
                            </button>

                            <button
                                // onClick={onClose}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>


                {/* Body */}

                <div className="p-6 space-y-8">
                    <div className='px-2 space-y-8 bg-gray-100 w-[1250px] '>
                        {/* TOP SECTION */}
                        <div className="flex gap-10 px-2 py-4">

                            {/* LEFT SIDE FORM */}
                            <div className="flex-1 space-y-5">

                                {/* Name */}
                                <div className="flex items-center gap-6">
                                    <label className="w-28 text-sm font-medium text-red-500">
                                        Name<span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter name"
                                    />
                                </div>

                                {/* Type */}
                                <div className="flex items-center gap-6">
                                    <label className="w-28 text-sm font-medium text-gray-700">
                                        Type
                                    </label>

                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="type" value="Goods" className="accent-blue-600" />
                                            Goods
                                        </label>

                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="type" value="Service" className="accent-blue-600" />
                                            Service
                                        </label>
                                    </div>
                                </div>

                                {/* Unit */}
                                <div className="flex items-center gap-6">
                                    <label className="w-28 text-sm font-medium text-gray-700">
                                        Unit
                                    </label>

                                    <select className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Select or type to add</option>
                                        <option>Piece</option>
                                        <option>Kg</option>
                                        <option>Box</option>
                                    </select>
                                </div>

                            </div>

                            {/* RIGHT SIDE IMAGE UPLOAD */}
                            <div className="w-72">
                                <div className="border-2 border-dashed rounded-lg p-6 text-center h-48 flex flex-col justify-center items-center">
                                    <div className="text-gray-400 mb-2">🖼️</div>
                                    <p className="text-sm text-gray-600">
                                        Drag image(s) here or
                                    </p>
                                    <button className="text-blue-600 text-sm font-medium">
                                        Browse images
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        {/* SALES INFORMATION */}
                        <div className='px-2 space-y-8 bg-gray-50 w-[1150px] '>
                            <h2 className="px-2 text-lg font-semibold mb-4">Sales Information</h2>

                            <div className="flex gap-10">
                                {/* Selling Price */}
                                <div className="flex items-center gap-6">
                                    <label className="w-28 text-sm font-medium text-red-500">
                                        Selling Price<span>*</span>
                                    </label>

                                    <div className="flex items-center border rounded overflow-hidden">
                                        <span className="px-3 bg-gray-100 text-sm border-r">INR</span>
                                        <input
                                            type="number"
                                            className="px-3 py-2 outline-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="flex items-center gap-6 flex-1">
                                    <label className="w-28 text-sm font-medium text-gray-700">
                                        Description
                                    </label>

                                    <textarea
                                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Enter description"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
            </div>
        </div >

    )
}
