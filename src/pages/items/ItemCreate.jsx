import React from 'react'
import { InfoIcon, Settings, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'recharts'
import { useState, useRef, useEffect } from "react";
import BottomActionBarItems from './BottomActionBarItems';
import toast from 'react-hot-toast';

import {
    addItemMaster,
    updateItemMaster,
    deleteItemMaster,
    loadItemMasters,
} from "../../slices/itemMasterSlice";

import { closeModal } from "../../slices/uiSlice";

export default function ItemCreate() {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [search, setSearch] = useState("");

    const ref = useRef();

    const [item, setItem] = useState({
        itemName: "",
        itemType: "",
        unit: "",
        sellingPrice: "",
        purchasePrice: "",
        description: "",
    });


    const [options, setOptions] = useState([
        { label: "BOX", value: "box" },
        { label: "CMS", value: "cm" },
    ]);

    // image
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            toast.error("Image size must be less than 5 MB.");
            e.target.value = "";
            return;
        }

        setImage({
            file,
            preview: URL.createObjectURL(file),
        });
    };

    useEffect(() => {
        return () => {
            if (image?.preview) {
                URL.revokeObjectURL(image.preview);
            }
        };
    }, [image]);

    // Close when clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filtered = options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );


    const handleSave = async () => {
        try {

            const { id, imagePath, ...itemData } = item;

            await dispatch(
                addItemMaster({
                    item: itemData,
                    image: image?.file,
                })
            ).unwrap();

            toast.success("Item created successfully!");

            dispatch(loadItemMasters());

            dispatch(closeModal());
        } catch (error) {
            toast.error(error);
        }
    };

    const handleEdit = async () => {
        try {

            const { id, imagePath, ...itemData } = item;
            await dispatch(
                updateItemMaster({
                    id,
                    item: itemData,
                    image: image?.file,
                })
            ).unwrap();

            toast.success("Item updated successfully!");

            dispatch(loadItemMasters());

            dispatch(closeModal());
        } catch (error) {
            toast.error(error);
        }
    };

    const handleUpdate = handleEdit;


    const handleDelete = async (id) => {
        try {
            await dispatch(deleteItemMaster(id)).unwrap();

            toast.success("Item deleted successfully!");

            await dispatch(loadItemMasters());
        } catch (error) {
            toast.error(error || "Failed to delete item");
        }
    };

    const handleCancel = () => {
        dispatch(closeModal());
    };

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
                                        placeholder="Enter name"
                                        value={item.itemName || ""}
                                        onChange={(e) =>
                                            setItem({ ...item, itemName: e.target.value })
                                        }
                                        className="flex-1 border  border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                                    />
                                </div>

                                {/* Type */}
                                <div className="flex items-center gap-6 ">
                                    <label className="w-28 text-sm font-medium text-gray-700 ">
                                        Type
                                    </label>

                                    <div className="flex items-center gap-4 ">
                                        <label className="flex items-center gap-2 ">
                                            <input
                                                type="radio"
                                                value="Goods"
                                                checked={item.itemType === "Goods"}

                                                onChange={(e) =>
                                                    setItem({
                                                        ...item,
                                                        itemType: e.target.value,
                                                    })
                                                }
                                                className="accent-blue-600 cursor-pointer" />
                                            Goods
                                        </label>

                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                value="Service"
                                                checked={item.itemType === "Service"}

                                                onChange={(e) =>
                                                    setItem({
                                                        ...item,
                                                        itemType: e.target.value,
                                                    })
                                                }
                                                className="accent-blue-600 cursor-pointer" />
                                            Service
                                        </label>
                                    </div>
                                </div>

                                {/* Unit */}
                                <div className="flex items-center gap-6">
                                    <label className="w-28 text-sm font-medium text-gray-700">
                                        Unit
                                    </label>
                                    <div className="relative w-110" ref={ref}>
                                        {/* Input Box */}
                                        <input
                                            value={open ? search : item.unit}
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                                setOpen(true);
                                            }}

                                            placeholder="Select or type to add"
                                            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        {/* Dropdown */}
                                        {open && (
                                            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
                                                {/* Search */}
                                                {/* <input
                                                    // autoFocus
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    placeholder="Search..."
                                                    className="w-full px-3 py-2 border-b border-gray-300 outline-none"
                                                /> */}

                                                {/* Options */}
                                                <ul className="max-h-40 overflow-y-auto border rounded-md bg-white shadow-sm">
                                                    {filtered.length > 0 ? (
                                                        filtered.map((opt) => (
                                                            <li
                                                                key={opt.value}
                                                                onClick={() => {
                                                                    setSelected(opt.label);

                                                                    setItem({
                                                                        ...item,
                                                                        unit: opt.label,
                                                                    });

                                                                    setOpen(false);
                                                                    setSearch("");
                                                                }}
                                                                className="px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                                                            >
                                                                {opt.label}
                                                            </li>
                                                        ))
                                                    ) : search.trim() ? (
                                                        <li
                                                            onClick={() => {
                                                                const newOption = {
                                                                    label: search.trim(),
                                                                    value: search.trim().toLowerCase(),
                                                                };

                                                                setOptions((prev) => [...prev, newOption]);

                                                                setSelected(newOption.label);

                                                                setItem({
                                                                    ...item,
                                                                    unit: newOption.label,
                                                                });

                                                                setOpen(false);
                                                                setSearch("");
                                                            }}
                                                            className="px-3 py-2 cursor-pointer text-blue-600 hover:bg-blue-500 hover:text-white"
                                                        >
                                                            + Add "{search}"
                                                        </li>
                                                    ) : (
                                                        <li className="px-3 py-2 text-gray-400">No results</li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>

                            {/* RIGHT SIDE IMAGE UPLOAD */}
                            <div className="w-72">
                                <div className="border-2 border-dashed rounded-lg p-6 text-center h-48 flex flex-col justify-center items-center">

                                    {image ? (
                                        <img
                                            src={image.preview}
                                            alt="Preview"
                                            className="w-full h-full object-contain rounded"
                                        />
                                    ) : item?.imagePath ? (
                                        <img
                                            src={`http://localhost:8081/uploads/${item.imagePath}`}
                                            alt={item.itemName}
                                            className="w-full h-full object-contain rounded"
                                        />
                                    ) : (
                                        <>
                                            <div className="text-gray-400 text-4xl mb-2">🖼️</div>

                                            <p className="text-sm text-gray-600">
                                                Drag image(s) here or
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current.click()}
                                                className="text-blue-600 text-sm font-medium"
                                            >
                                                Browse images
                                            </button>

                                        </>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="text-blue-600 mt-2"
                                    >
                                        Change Image
                                    </button>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                    <div>
                        {/* SALES INFORMATION */}
                        <div className='px-2 space-y-8 bg-gray-50 w-[1250px] '>
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
                                            value={item.sellingPrice ?? ""}
                                            onChange={(e) =>
                                                setItem({
                                                    ...item,
                                                    sellingPrice: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Purchase price */}
                                <div className="flex items-center gap-6">
                                    <label className="w-28 text-sm font-medium text-red-500">
                                        Purchase Price<span>*</span>
                                    </label>

                                    <div className="flex items-center border rounded overflow-hidden">
                                        <span className="px-3 bg-gray-100 text-sm border-r">INR</span>
                                        <input
                                            type="number"
                                            value={item.purchasePrice ?? ""}
                                            onChange={(e) =>
                                                setItem({
                                                    ...item,
                                                    purchasePrice: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>


                                {/* Purchase price */}

                                {/* Description */}
                                <div className="flex items-center gap-6 flex-1">
                                    <label className="w-28 text-sm font-medium text-gray-700">
                                        Description
                                    </label>

                                    <textarea
                                        value={item.description || ""}
                                        onChange={(e) =>
                                            setItem({
                                                ...item,
                                                description: e.target.value,
                                            })
                                        }
                                        className="flex-1 border rounded px-3 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Enter description"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}

                <div className="flex-1 flex flex-col overflow-hidden relative h-full  gap-3 mt-8 pb-10">
                    <BottomActionBarItems
                        onSave={item.id ? handleEdit : handleSave}
                        onCancel={handleCancel}

                    />
                </div>
            </div>
        </div >

    )
}
