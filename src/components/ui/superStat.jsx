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
    badgeIcon = <BsThreeDotsVertical className="h-4 w-4 text-slate-500" />,
    showTrendIcon = true,
}) {
    const growthColor =
        badgeTone === "danger"
            ? "text-red-500"
            : badgeTone === "success"
                ? "text-emerald-500"
                : "text-slate-500";

    // choose arrow based on tone
    const TrendIcon = badgeTone === "danger" ? ArrowDownRight : ArrowUpRight;

    return (
        <Card className="h-full rounded-2xl p-0 shadow-md border border-slate-100 bg-white">
            <CardContent className="p-5">
                {/* Top row: icon + menu */}
                <div className="flex items-start justify-between mb-6">
                    <div
                        className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-2xl",
                            iconBg
                        )}
                    >
                        {icon}
                    </div>

                    <button
                        type="button"
                        className="text-slate-500 hover:text-slate-700"
                    >
                        {badgeIcon}
                    </button>
                </div>

                {/* Title + main value */}
                <div className="space-y-1 mb-4">
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <p className="text-[28px] font-semibold leading-none tracking-tight text-slate-900">
                        {value}
                    </p>
                </div>

                {/* Growth row */}
                <div className="flex items-center text-sm">
                    <span className={cn("flex items-center gap-1 font-medium", growthColor)}>
                        {showTrendIcon && badgeText && (
                            <TrendIcon className="h-3 w-3" />
                        )}
                        {badgeText}
                    </span>
                    <span className="ml-1 text-slate-400">{subtitle}</span>
                </div>
            </CardContent>
        </Card>
    );
}
