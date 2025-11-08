import React from "react";
import { Receipt, ChevronDown } from "lucide-react";

const Pill = ({ children, tone = "gray" }) => {
  const tones = {
    gray: "bg-slate-50 text-slate-600",
    info: "bg-sky-50 text-sky-700",
    warning: "bg-amber-50 text-amber-700",
    success: "bg-emerald-50 text-emerald-700",
    danger: "bg-rose-50 text-rose-700",
  };
  return <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${tones[tone]}`}>{children}</span>;
};

export default function RecentSales({ items = [], period = "Today", onChangePeriod }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
            <Receipt className="h-4 w-4 text-slate-700" />
          </span>
          <h3 className="text-sm font-medium text-slate-800">Recent Sales</h3>
        </div>
        <button
          onClick={onChangePeriod}
          className="text-xs inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50"
        >
          {period} <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="divide-y">
        {items.map((s, i) => {
          const tone =
            s.status === "Completed" ? "success"
            : s.status === "Cancelled" ? "danger"
            : s.status === "Ongoing" ? "warning"
            : "info";
          return (
            <div key={i} className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img src={s.thumb} alt={s.name} className="h-9 w-9 rounded-md object-cover ring-1 ring-slate-200" />
                <div className="min-w-0">
                  <div className="text-sm text-slate-800 truncate">{s.name}</div>
                  <div className="text-xs text-slate-500">
                    {s.cat} • {s.price} BDT
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Pill tone="gray">{s.date}</Pill>
                <Pill tone={tone}>{s.status}</Pill>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
