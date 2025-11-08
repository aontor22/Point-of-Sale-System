import React from "react";
import { Trophy, ChevronDown, ChevronUp, ArrowUpLeft, ArrowDownRight } from "lucide-react";

const Pill = ({ children, up = true }) => (
  <span
    className={` flex px-2 py-0.5 rounded-sm border text-xs font-medium ${
      up ? " text-emerald-700 border-green-400" : "border-red-400 text-red-700"
    }`}
  >
    {up ? <ArrowUpLeft size={16}/> : <ArrowDownRight size={16}/>}
    {children}
  </span>
);

export default function TopSellingProducts({ items = [], period = "Today", onChangePeriod }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
            <Trophy className="h-4 w-4 text-slate-700" />
          </span>
          <h3 className="text-sm font-medium text-slate-800">Top Selling Products</h3>
        </div>
        <button
          onClick={onChangePeriod}
          className="text-xs inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50"
        >
          {period} <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="divide-y">
        {items.map((p, i) => {
          const up = String(p.change).trim().startsWith("+");
          return (
            <div key={i} className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img src={p.thumb} alt={p.name} className="h-9 w-9 rounded-md object-cover ring-1 ring-slate-200" />
                <div className="min-w-0">
                  <div className="text-sm text-slate-800 truncate">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.price} BDT</div>
                </div>
              </div>
              <Pill up={up}>{p.change}</Pill>
            </div>
          );
        })}
      </div>
    </div>
  );
}
