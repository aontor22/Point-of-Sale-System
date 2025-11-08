// src/components/dashboard/RecentTransactions.jsx
import React, { useState, useMemo } from "react";
import { Receipt, ChevronRight } from "lucide-react";
import rcs1 from '../../assets/products/rcs1.svg'
import rcs2 from '../../assets/products/rcs2.svg'
import rcs3 from '../../assets/products/rcs3.svg'
import rcs4 from '../../assets/products/rcs4.svg'

const tabs = ["Sale", "Purchase", "Quotation", "Expenses", "Invoices"];

// One grid template reused for header and rows
const gridCols = "grid-cols-[110px_minmax(0,1fr)_140px_120px]"; // Date | Customer | Status | Total

const StatusBadge = ({ text }) => {
    const map = {
        Completed: "bg-emerald-50 text-emerald-700",
        Processing: "bg-sky-50 text-sky-700",
        Draft: "bg-rose-50 text-rose-700",
        Cancelled: "bg-rose-50 text-rose-700",
    };
    return (
        <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${map[text] || "bg-slate-100 text-slate-700"}`}>
            {text}
        </span>
    );
};

const Row = ({ date, name, orderNo, avatar, status, total }) => (
    <div className={`grid ${gridCols} items-center px-4 py-3`}>
        <div className="text-xs text-slate-500">{date}</div>

        <div className="flex items-center gap-3 min-w-0">
            <img
                src={avatar}
                alt={name}
                className="h-9 w-9 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div className="min-w-0">
                <div className="text-sm text-slate-800 truncate">{name}</div>
                <div className="text-xs text-slate-500">#{orderNo}</div>
            </div>
        </div>

        <div className="flex items-center">
            <StatusBadge text={status} />
        </div>

        <div className="text-sm font-semibold text-slate-800 text-right">
            {Number(total).toLocaleString()} BDT
        </div>
    </div>
);

// ---- Demo data (replace avatar paths with your assets) ----
const demoSale = [
    { date: "24 OCT 2025", name: "Nguyen, Shane", orderNo: "114589", avatar: rcs1, status: "Completed", total: 4560 },
    { date: "23 OCT 2025", name: "Miles, Esther", orderNo: "114590", avatar: rcs2, status: "Processing", total: 3569 },
    { date: "22 OCT 2025", name: "Flores, Juanita", orderNo: "114591", avatar: rcs3, status: "Draft", total: 2659 },
    { date: "21 OCT 2025", name: "Henry, Arthur", orderNo: "114592", avatar: rcs4, status: "Completed", total: 2155 },
];

const demoPurchase = [
    { date: "20 OCT 2025", name: "Acme Supplies", orderNo: "PU-8831", avatar: rcs1, status: "Completed", total: 17890 },
    { date: "18 OCT 2025", name: "Alpha Traders", orderNo: "PU-8827", avatar: rcs2, status: "Processing", total: 10250 },
];

const demoQuotation = [
    { date: "17 OCT 2025", name: "Gomez, Alicia", orderNo: "QT-3321", avatar: rcs2, status: "Processing", total: 7850 },
];

const demoExpenses = [
    { date: "16 OCT 2025", name: "Warehouse Rent", orderNo: "EX-2211", avatar: rcs4, status: "Completed", total: 25000 },
];

const demoInvoices = [
    { date: "15 OCT 2025", name: "Richard Wilson", orderNo: "INV-7012", avatar: rcs1, status: "Completed", total: 5366 },
];

const demoByTab = {
    Sale: demoSale,
    Purchase: demoPurchase,
    Quotation: demoQuotation,
    Expenses: demoExpenses,
    Invoices: demoInvoices,
};

export default function RecentTransactions({ items = [], onViewAll }) {
    const [active, setActive] = useState("Sale");

    // Use provided items if any; otherwise use demo for the active tab
    const rows = useMemo(() => {
        if (items && items.length) return items;
        return demoByTab[active] || [];
    }, [items, active]);

    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Card header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
                        <Receipt className="h-4 w-4 text-slate-700" />
                    </span>
                    <h3 className="text-sm font-medium text-slate-800">Recent Transactions</h3>
                </div>
                <button
                    onClick={onViewAll}
                    className="text-xs text-slate-600 inline-flex items-center gap-1 hover:text-slate-800"
                >
                    View All <ChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>

            {/* Tabs row (segmented) */}
            <div className="px-4 pt-3">
                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                    {tabs.map((t) => (
                        <button
                            key={t}
                            onClick={() => setActive(t)}
                            className={[
                                "px-3 py-1.5 text-xs font-medium rounded-md transition",
                                active === t
                                    ? "bg-white text-slate-800 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700",
                            ].join(" ")}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Column header – EXACT same grid as rows */}
            <div
                className={`mt-3 px-4 py-2 border-y border-slate-200 bg-slate-50/60 grid ${gridCols} text-xs font-medium text-slate-500`}
            >
                <div>Date</div>
                <div>Customer</div>
                <div>Status</div>
                <div className="text-right">Total</div>
            </div>

            {/* Rows */}
            <div className="divide-y">
                {rows.map((it, i) => (
                    <Row key={i} {...it} />
                ))}
            </div>
        </div>
    );
}
