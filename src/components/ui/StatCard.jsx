import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function SparkBars({ values = [], bar = 6, gap = 3, color = "rgb(59 130 246)" }) {
  const w = values.length * bar + (values.length - 1) * gap;
  const h = 28;
  const max = Math.max(...values, 1);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block">
      {values.map((v, i) => {
        const x = i * (bar + gap);
        const bh = Math.max((v / max) * (h - 2), 2);
        return (
          <rect
            key={i}
            x={x}
            y={h - bh}
            width={bar}
            height={bh}
            rx="1.5"
            fill={color}
            opacity={0.9}
          />
        );
      })}
    </svg>
  );
}

export default function StatCard({
  icon,
  iconBg = "bg-slate-900 text-white",
  badgeText = "STABLE",
  badgeTone = "default",
  title = "Total Companies",
  value = "5468",
  subtitle = "",
  spark = { values: [3, 5, 4, 7, 6, 8, 4], color: "rgb(59 130 246)" },
}) {
  const badgeClass = {
    success: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    danger: "bg-red-100 text-red-700 hover:bg-red-100",
    default: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  }[badgeTone];

  return (
    <Card className="h-full rounded-sm">
      <CardContent className="p-0">
        <div className="flex items-start justify-between px-6">
          <div className={cn("grid h-11 w-11 place-items-center rounded-sm", iconBg)}>
            {icon}
          </div>

          <div
            className={cn(
              "rounded-sm px-2.5 py-1 text-xs font-semibold shadow-sm",
              badgeTone === "danger"
                ? "bg-red-600 text-white"
                : badgeTone === "success"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-200 text-slate-700"
            )}
          >
            {badgeText}
          </div>
        </div>

        <div className=" px-6 pt-5">
          <div className="flex items-end justify-between gap-3">
            <div className="">
              <div className="text-[28px] flex-1 font-semibold leading-none tracking-tight sm:text-[32px]">
                {value}
            <p className="text-sm mt-3 text-muted-foreground">{title}</p>
              </div>
            </div>
            <div className="shrink-0">
              <SparkBars values={spark.values} color={spark.color} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

  );
}
