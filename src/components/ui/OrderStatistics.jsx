import { CalendarRange, ChevronDown } from "lucide-react";

/**
 * Heatmap: days x hours grid.
 * dataMap: {(dayIdx-hourIdx): value}, value in [0..1] for intensity
 */
export default function OrderStatistics({
  period = "Weekly",
  days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  hours = ["2 am","4 am","6 am","8 am","10 am","12 pm"],
  dataMap = { "0-0":0.9, "1-2":0.6, "2-1":0.7, "4-5":0.8, "6-4":0.9 },
  tooltip = (v) => `${Math.round(v * 300)} Orders`,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
            <CalendarRange className="h-4 w-4 text-slate-700" />
          </span>
          <h3 className="text-sm font-medium text-slate-800 dark:text-slate-100">Order Statistics</h3>
        </div>
        <button className="text-xs inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50 dark:border-slate-700">
          {period} <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="p-4">
        <div className="grid" style={{ gridTemplateColumns: `64px repeat(${days.length}, minmax(0,1fr))` }}>
          {/* header row */}
          <div />
          {days.map((d) => (
            <div key={d} className="text-xs text-slate-500 text-center pb-2">{d}</div>
          ))}

          {/* rows */}
          {hours.map((h, hi) => (
            <div key={h} className="contents">
              <div className="text-xs text-slate-500 pr-2 py-2">{h}</div>
              {days.map((_, di) => {
                const k = `${di}-${hi}`;
                const v = dataMap[k] ?? 0;
                const bg = v > 0 ? `rgba(37,99,235,${0.15 + v * 0.7})` : "rgba(203,213,225,0.35)";
                return (
                  <div
                    key={k}
                    title={v ? tooltip(v) : ""}
                    className="m-1 h-7 rounded-sm transition-transform hover:scale-[1.03]"
                    style={{ backgroundColor: bg }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
