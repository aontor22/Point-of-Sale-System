import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function SubscriptionTierCard({
    icon,
    iconBg,
    name,
    subscriptions,
    price,
    period,
    share,
    barColor,
}) {
    return (
        <Card
            className={cn(
                "h-full w-full rounded-2xl border px-7 pt-7 pb-5 flex flex-col justify-between transition-colors duration-200",
                "bg-white border-slate-100 shadow-[0px_4.47px_6.7px_-4.47px_rgba(0,0,0,0.10),0px_11.17px_16.75px_-3.35px_rgba(0,0,0,0.10)]",
                "dark:bg-slate-900/95 dark:border-slate-700 dark:shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
            )}
        >
            {/* Top */}
            <div className="flex w-full items-start justify-between">
                <div className="flex items-center gap-3.5">
                    <div
                        className={cn(
                            "flex size-11 items-center justify-center rounded-xl shadow-sm",
                            "ring-1 ring-white/0",
                            "dark:ring-white/15 dark:shadow-[0_10px_22px_rgba(0,0,0,0.65)]",
                            iconBg
                        )}
                    >
                        {icon}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-base leading-6 text-gray-600 dark:text-slate-300">
                            {name}
                        </span>
                        <span className="text-lg leading-7 text-gray-900 dark:text-slate-50">
                            {subscriptions}{" "}
                            <span className="font-normal text-gray-900 dark:text-slate-200">
                                subscriptions
                            </span>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-base leading-6 text-gray-900 dark:text-slate-50">
                        {price}
                    </span>
                    <span className="text-sm leading-4 text-gray-500 dark:text-slate-400">
                        {period}
                    </span>
                </div>
            </div>

            {/* Bottom */}
            <div className="w-full pt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-slate-300">Share</span>
                    <span className="text-gray-900 dark:text-slate-50">{share}%</span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
                    <div
                        className={cn("h-2 rounded-full transition-all duration-300", barColor)}
                        style={{ width: `${share}%` }}
                    />
                </div>
            </div>
        </Card>
    );
}
