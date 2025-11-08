import React from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";

export default function LowStockProducts({ items = [], onViewAll }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
            <AlertTriangle className="h-4 w-4 text-slate-700" />
          </span>
          <h3 className="text-sm font-medium text-slate-800">Low Stock Products</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs text-slate-600 inline-flex items-center gap-1 hover:text-slate-800"
        >
          View All <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="divide-y">
        {items.map((p) => (
          <div key={p.id} className="px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img src={p.thumb} alt={p.name} className="h-9 w-9 rounded-md object-cover ring-1 ring-slate-200" />
              <div className="min-w-0">
                <div className="text-sm text-slate-800 truncate">{p.name}</div>
                <div className="text-xs text-slate-500">ID: {p.id}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Instock</div>
              <div className="text-sm font-medium text-rose-600">{p.qty}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
