import React from 'react'

export default function ItemMasterTable2() {
    return (
        <div className="bg-slate-100 min-h-screen flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_20px_45px_-15px_rgba(47,92,255,0.25)] flex overflow-hidden">

                {/* Sidebar */}
                <aside className="w-56 bg-[#2F5CFF] rounded-l-3xl flex flex-col justify-between py-8 px-6 text-white shrink-0">
                    <div>
                        <h1 className="text-lg font-bold mb-10">eProduct</h1>
                        <nav className="space-y-1">
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="3" y="3" width="7" height="7" rx="1" />
                                    <rect x="14" y="3" width="7" height="7" rx="1" />
                                    <rect x="3" y="14" width="7" height="7" rx="1" />
                                    <rect x="14" y="14" width="7" height="7" rx="1" />
                                </svg>
                                Dashboard
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white text-[#2F5CFF] text-sm font-semibold shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                Order
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                                Statistic
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                    <path d="M3.27 6.96 12 12.01l8.73-5.05" />
                                    <path d="M12 22.08V12" />
                                </svg>
                                Product
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M20.59 13.41 12 22l-8.59-8.59a2 2 0 0 1 0-2.82L12 2l8.59 8.59a2 2 0 0 1 0 2.82Z" />
                                </svg>
                                Stock
                            </a>
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M20.59 13.41 12 22l-8.59-8.59a2 2 0 0 1 0-2.82L12 2l8.59 8.59a2 2 0 0 1 0 2.82Z" />
                                </svg>
                                Offer
                            </a>
                        </nav>
                    </div>
                    <div className="flex gap-4 text-xs text-white/70 font-medium">
                        <a href="#" className="hover:text-white">Facebook</a>
                        <a href="#" className="hover:text-white">Twitter</a>
                        <a href="#" className="hover:text-white">Google</a>
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1 px-8 py-8">
                    {/* Top bar */}
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Order</h2>
                            <p className="text-sm text-slate-400 mt-1">28 orders found</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                            </button>
                            <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-2">
                                <img src="https://i.pravatar.cc/40?img=5" className="w-9 h-9 rounded-full object-cover" alt="user avatar" />
                                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Tabs + date range */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-6 text-sm">
                            <span className="text-[#2F5CFF] font-semibold border-b-2 border-[#2F5CFF] pb-1">All orders</span>
                            <span className="text-slate-400 font-medium">Dispatch</span>
                            <span className="text-slate-400 font-medium">Pending</span>
                            <span className="text-slate-400 font-medium">Completed</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-3 py-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                                31 Jul 2020
                            </div>
                            <span>To</span>
                            <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-3 py-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                                03 Aug 2020
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-xl overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-slate-400 text-xs font-semibold uppercase tracking-wide">
                                    <th className="py-3 pr-4 font-semibold">Id ▾</th>
                                    <th className="py-3 pr-4 font-semibold">Name</th>
                                    <th className="py-3 pr-4 font-semibold">Address</th>
                                    <th className="py-3 pr-4 font-semibold">Date ▾</th>
                                    <th className="py-3 pr-4 font-semibold">Price ▾</th>
                                    <th className="py-3 pr-4 font-semibold">Status</th>
                                    <th className="py-3 pr-4 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-600">
                                {orders.map((order) =>
                                    order.highlighted ? (
                                        <tr key={order.id} className="bg-[#2F5CFF] rounded-xl text-white shadow-lg">
                                            <td className="py-4 pr-4 pl-4 font-medium rounded-l-xl">{order.id}</td>
                                            <td className="py-4 pr-4">
                                                <div className="flex items-center gap-2">
                                                    <img src={order.avatar} className="w-7 h-7 rounded-full object-cover ring-2 ring-white/40" alt={order.name} />
                                                    <span className="font-medium">{order.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 pr-4 text-white/80">
                                                {order.addressLine}, <span className="text-white/60">{order.addressRest}</span>
                                            </td>
                                            <td className="py-4 pr-4 text-white/80">{order.date}</td>
                                            <td className="py-4 pr-4 font-semibold">{order.price}</td>
                                            <td className="py-4 pr-4">
                                                <span className="inline-flex items-center gap-1.5 text-white font-medium text-xs">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-300"></span>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 pr-2 rounded-r-xl">
                                                <div className="flex items-center justify-end gap-2 pr-2">
                                                    <button className="w-7 h-7 rounded-md bg-white/20 text-white flex items-center justify-center hover:bg-white/30">
                                                        <SettingsIcon />
                                                    </button>
                                                    <button className="w-7 h-7 rounded-md bg-white/20 text-white flex items-center justify-center hover:bg-white/30">
                                                        <ChevronDownIcon />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={order.id} className="border-t border-slate-100">
                                            <td className="py-4 pr-4 font-medium text-slate-500">{order.id}</td>
                                            <td className="py-4 pr-4">
                                                <div className="flex items-center gap-2">
                                                    <img src={order.avatar} className="w-7 h-7 rounded-full object-cover" alt={order.name} />
                                                    <span className="font-medium text-slate-700">{order.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 pr-4 text-slate-500">
                                                {order.addressLine}, <span className="text-slate-400">{order.addressRest}</span>
                                            </td>
                                            <td className="py-4 pr-4 text-slate-500">{order.date}</td>
                                            <td className="py-4 pr-4 font-semibold text-slate-700">{order.price}</td>
                                            <td className="py-4 pr-4">
                                                <span className={`inline-flex items-center gap-1.5 font-medium text-xs ${statusColor[order.status]}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[order.status]}`}></span>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 pr-2">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="w-7 h-7 rounded-md bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200">
                                                        <SettingsIcon />
                                                    </button>
                                                    <button className="w-7 h-7 rounded-md bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200">
                                                        <ChevronDownIcon />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6 text-xs text-slate-400">
                        <span>Showing 06-12 of 28</span>
                        <div className="flex items-center gap-2">
                            <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-slate-100">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            {[1, 2, 3, 4, 5].map((page) => (
                                <button
                                    key={page}
                                    className={`w-7 h-7 rounded-md flex items-center justify-center font-medium ${page === 2 ? 'bg-[#2F5CFF] text-white' : 'hover:bg-slate-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-slate-100">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            <div className="fixed bottom-4 right-6 text-sm font-bold text-slate-700 tracking-wide">
                ehsan<span className="text-[#2F5CFF]">moin</span>
            </div>
        </div>
    )
}

const orders = [
    {
        id: '#2632',
        name: 'Brooklyn Zoe',
        avatar: 'https://i.pravatar.cc/32?img=47',
        addressLine: '302 Snider Street',
        addressRest: 'RUTLAND, VT, 05701',
        date: '31 Jul 2020',
        price: '$64.00',
        status: 'Pending',
        highlighted: false,
    },
    {
        id: '#2633',
        name: 'John McCormick',
        avatar: 'https://i.pravatar.cc/32?img=12',
        addressLine: '1096 Wiseman Street',
        addressRest: 'CALMAR, IA, 52132',
        date: '01 Aug 2020',
        price: '$35.00',
        status: 'Dispatch',
        highlighted: true,
    },
    {
        id: '#2634',
        name: 'Sandra Pugh',
        avatar: 'https://i.pravatar.cc/32?img=32',
        addressLine: '1640 Thorn Street',
        addressRest: 'SALE CITY, GA, 98106',
        date: '02 Aug 2020',
        price: '$74.00',
        status: 'Completed',
        highlighted: false,
    },
    {
        id: '#2635',
        name: 'Vernie Hart',
        avatar: 'https://i.pravatar.cc/32?img=23',
        addressLine: '3898 Oak Drive',
        addressRest: 'DOVER, DE, 19906',
        date: '02 Aug 2020',
        price: '$82.00',
        status: 'Pending',
        highlighted: false,
    },
    {
        id: '#2636',
        name: 'Mark Clark',
        avatar: 'https://i.pravatar.cc/32?img=15',
        addressLine: '1915 Augusta Park',
        addressRest: 'NASSAU, NY, 10662',
        date: '03 Aug 2020',
        price: '$39.00',
        status: 'Dispatch',
        highlighted: false,
    },
    {
        id: '#2637',
        name: 'Rebekah Foster',
        avatar: 'https://i.pravatar.cc/32?img=44',
        addressLine: '3445 Park Boulevard',
        addressRest: 'BIOLA, CA, 93606',
        date: '03 Aug 2020',
        price: '$67.00',
        status: 'Pending',
        highlighted: false,
    },
]

const statusColor = {
    Pending: 'text-red-500',
    Dispatch: 'text-green-500',
    Completed: 'text-slate-400',
}

const statusDot = {
    Pending: 'bg-red-500',
    Dispatch: 'bg-green-500',
    Completed: 'bg-slate-400',
}

function SettingsIcon() {
    return (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    )
}

function ChevronDownIcon() {
    return (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}