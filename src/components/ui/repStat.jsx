import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function StatCard({
    icon = <ArrowUpRight className="h-2.5 w-2.5" />,
    iconup = <ArrowUpRight className="h-2.5 w-2.5" />,
    iconBg = "bg-indigo-500 text-white",
    badgeText = "12.2",
    badgeIcon = <BsThreeDotsVertical className="h-4 w-4" />,
    badgeTone = "success",
    title = "Total Orders",
    value = "8690",
    subtitle = "From Last Month",
}) {
    const badgeClass = {
        success: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
        danger: "bg-red-100 text-red-700 hover:bg-red-100",
        default: "bg-slate-100 text-slate-700 hover:bg-slate-100",
    }[badgeTone];

    return (
        <Card className="h-full rounded-lg dark:bg-slate-800 dark:border-slate-400 dark:shadow-2xl dark:shadow-gray-900 shadow-md p-0">
            <CardContent className="">
                <div className="flex justify-between pt-5">
                    <div className={cn("flex h-5.5 w-5.5 items-center justify-center rounded-sm", iconBg)}>
                        {icon}
                    </div>

                    <span>{title}</span>
                    <div className="">{badgeIcon}</div>
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
                                "rounded-sm px-2.5 py-1 flex text-xs font-semibold shadow-sm",
                                badgeTone === "danger"
                                    ? "bg-red-600 text-white"
                                    : badgeTone === "success"
                                        ? "bg-emerald-600 text-white"
                                        : "bg-slate-200 text-slate-700"
                            )}
                        >
                            {badgeText}
                            {iconup}
                        </div>
                        <div>
                            <p className="text-sm mt-1 text-muted-foreground">{subtitle}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
