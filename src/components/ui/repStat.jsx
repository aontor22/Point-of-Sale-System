import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function StatCard({
    icon = <ArrowUpRight className="h-2.5 w-2.5" />,
    iconBg = "bg-indigo-500 text-white",
    badgeText = "12.2",
    badgeIcon = <BsThreeDotsVertical className="h-4 w-4" />,
    badgeTone = "success",
    title = "Total Orders",
    value = "8690",
    subtitle = "From Last Month",
}) {
    const isNegative =
        typeof badgeText === "string" && badgeText.trim().startsWith("-");

    const TrendIcon = isNegative || badgeTone === "danger"
        ? ArrowDownRight
        : ArrowUpRight;

    return (
        <Card className="h-full rounded-lg dark:bg-slate-800 dark:border-slate-400 dark:shadow-2xl dark:shadow-gray-900 shadow-md p-0">
            <CardContent>
                <div className="flex justify-between pt-5">
                    <div
                        className={cn(
                            "flex h-5.5 w-5.5 items-center justify-center rounded-sm",
                            iconBg
                        )}
                    >
                        {icon}
                    </div>

                    <span>{title}</span>
                    <div>{badgeIcon}</div>
                </div>

                <div className="py-5">
                    <div className="text-[26px] font-semibold leading-none tracking-tight">
                        {value}
                    </div>
                </div>

                <div className="pb-5">
                    <div className="flex items-end justify-between gap-3">
                        <div
                            className={cn(
                                "rounded-sm px-2.5 py-1 flex items-center text-xs font-semibold shadow-sm",
                                badgeTone === "danger" || isNegative
                                    ? "bg-red-600 text-white"
                                    : badgeTone === "success"
                                        ? "bg-emerald-600 text-white"
                                        : "bg-slate-200 text-slate-700"
                            )}
                        >
                            <span>{badgeText}</span>
                            <TrendIcon className="ml-1 h-3 w-3" />
                        </div>
                        <div>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {subtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
