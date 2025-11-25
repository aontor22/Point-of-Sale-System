import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function StatCard({
    icon = <ArrowUpRight className="h-6 w-6" />,
    iconBg = "bg-indigo-500 text-white",
    badgeText = "+12.5%",
    badgeTone = "success", // success | danger | default
    title = "Total Companies",
    value = "1,247",
    subtitle = "vs last month",
    badgeIcon = <BsThreeDotsVertical className="h-4 w-4 text-slate-400 dark:text-slate-500" />,
    showTrendIcon = true,
}) {
    const growthColor =
        badgeTone === "danger"
            ? "text-red-500 dark:text-red-400"
            : badgeTone === "success"
                ? "text-emerald-500 dark:text-emerald-400"
                : "text-slate-500 dark:text-slate-300";

    const TrendIcon = badgeTone === "danger" ? ArrowDownRight : ArrowUpRight;

    return (
        <Card
            className={cn(
                "h-full rounded-2xl p-0 border shadow-md transition-colors duration-200",
                "border-slate-100 bg-white",
                "dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
            )}
        >
            <CardContent className="p-5 pb-4">
                {/* Top row: icon + menu */}
                <div className="mb-6 flex items-start justify-between">
                    <div
                        className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm",
                            "ring-1 ring-white/0",
                            "dark:ring-white/15 dark:shadow-[0_10px_22px_rgba(0,0,0,0.65)]",
                            iconBg
                        )}
                    >
                        {icon}
                    </div>

                    <button
                        type="button"
                        className={cn(
                            "inline-flex h-8 w-8 items-center justify-center rounded-full",
                            "text-slate-400 hover:bg-slate-100/70 hover:text-slate-700",
                            "dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                        )}
                    >
                        {badgeIcon}
                    </button>
                </div>

                {/* Title + main value */}
                <div className="mb-4 space-y-1">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
                        {title}
                    </p>
                    <p className="text-[28px] font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-50">
                        {value}
                    </p>
                </div>

                {/* Growth row */}
                <div className="flex items-center text-sm">
                    {badgeText && (
                        <span className={cn("flex items-center gap-1 font-medium", growthColor)}>
                            {showTrendIcon && <TrendIcon className="h-3 w-3" />}
                            {badgeText}
                        </span>
                    )}
                    <span className="ml-1 text-slate-400 dark:text-slate-500">{subtitle}</span>
                </div>
            </CardContent>
        </Card>
    );
}
