import React from "react";
import { BarChart as ReBarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, } from "recharts";
import { PieChart as PieIcon, ChevronDown, ArrowUpLeft, ArrowDownRight, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from "@/components/ui/dropdown-menu";

const DATA = [
    { name: "Jan", revenue: 22, expense: -12 },
    { name: "Feb", revenue: 28, expense: -15 },
    { name: "Mar", revenue: 24, expense: -14 },
    { name: "Apr", revenue: 26, expense: -13 },
    { name: "May", revenue: 20, expense: -12 },
    { name: "Jun", revenue: 27, expense: -15 },
    { name: "Jul", revenue: 11, expense: -10 },
    { name: "Aug", revenue: 13, expense: -12 },
    { name: "Sep", revenue: 25, expense: -14 },
    { name: "Oct", revenue: 18, expense: -13 },
    { name: "Nov", revenue: 22, expense: -12 },
    { name: "Dec", revenue: 24, expense: -13 },
];

export default function SalesStaticsCard() {
    const [year, setYear] = React.useState("2025");

    return (
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-rose-100">
                        <PieIcon size={14} className="text-rose-600" />
                    </span>
                    <h3 className="text-slate-800 font-semibold">Sales Statics</h3>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 rounded-md">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {year} <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-28">
                        {["2025", "2024", "2023"].map((y) => (
                            <DropdownMenuItem key={y} onClick={() => setYear(y)}>
                                {y}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="p-4 flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-sm border px-2.5 py-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-semibold text-emerald-700">
                        {Intl.NumberFormat("en-BD").format(48_988_078)} BDT
                    </span>
                    <span className=" flex text-[11px] rounded bg-emerald-100 text-emerald-700 px-1 py-[1px]"><ArrowUpLeft size={12} /> 25%</span>
                    <span className="text-xs text-slate-500">Revenue</span>
                </div>

                <div className="flex items-center gap-2 rounded-sm border px-2.5 py-1">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span className="text-sm font-semibold text-rose-700">{Intl.NumberFormat("en-BD").format(12_189)} BDT</span>
                    <span className="flex text-[11px] rounded bg-rose-100 text-rose-700 px-1 py-[1px]"><ArrowDownRight size={12} /> 8%</span>
                    <span className="text-xs text-slate-500">Expense</span>
                </div>
            </div>

            <div className="h-[250px] w-full px-2 pb-3">
                <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={DATA} barCategoryGap={18}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748B", fontSize: 12 }}
                        />
                        <YAxis
                            domain={[-30, 30]}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748B", fontSize: 12 }}
                            tickFormatter={(v) => `${v}K`}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(2, 6, 23, 0.03)" }}
                            contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }}
                            formatter={(val, key) => [`${Math.abs(val)}K`, key === "revenue" ? "Revenue" : "Expense"]}
                        />
                        <ReferenceLine y={0} stroke="#CBD5E1" />
                        <Bar dataKey="revenue" name="Revenue" fill="#00bd7e" radius={[0, 0, 0, 0]} barSize={8} />
                        <Bar dataKey="expense" name="Expense" fill="#ff2159" radius={[0, 0, 0, 0]} barSize={8} />
                    </ReBarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
