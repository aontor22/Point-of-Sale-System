import React from "react";
import { PieChart, CalendarDays } from "lucide-react";
import Donut from "./Donut";

const Dot = ({ color }) => (
  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
);

const StatRow = ({ dot, label, value, borderTop }) => (
  <div className={`flex items-center justify-between px-4 py-2 ${borderTop ? "border-t border-slate-200" : ""}`}>
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <Dot color={dot} />
      <span>{label}</span>
    </div>
    <div className="text-slate-900 font-semibold">{value}</div>
  </div>
);

export default function TopCategoriesCard({
  period = "Weekly",
  legend = [
    { label: "Electronics", sales: 698, color: "#22c55e" },
    { label: "Sports", sales: 545, color: "#f59e0b" },
    { label: "Lifestyles", sales: 456, color: "#0f4784" },
  ],
  totals = { categories: 698, products: 7899 },
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-rose-50">
            <PieChart className="h-4 w-4 text-rose-500" />
          </span>
          <h3 className="text-sm font-medium text-slate-800">Top Categories</h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
            <CalendarDays className="h-3.5 w-3.5" />
            {period}
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center pl-4 gap-12">
          <Donut size={150} thickness={20} />
          <div className="flex">
            <div className="space-y-3 mb-5">
              {legend.map((it) => (
                <div key={it.label} className="flex-1 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Dot color={it.color} />
                    <span className="text-sm text-slate-600">{it.label}</span>
                  </div>
                  <span className="text-slate-900 flex gap-2 font-semibold text-sm">
                    {it.sales} <span className="font-normal text-slate-500">Sales</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <h4 className="text-slate-800 font-semibold text-sm mt-5 mb-2">Category Statistics</h4>
        <div className="rounded-sm border border-slate-200 overflow-hidden">
          <StatRow dot="#3b82f6" label="Total Number Of Categories" value={totals.categories} />
          <StatRow dot="#f97316" borderTop label="Total Number Of Products" value={totals.products} />
        </div>
      </div>
    </section>
  );
}
