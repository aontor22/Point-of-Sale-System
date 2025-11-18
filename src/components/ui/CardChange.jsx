import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const toneStyles = {
    red: {
        card:
            "shadow-[0px_3.84px_5.76px_-3.84px_rgba(255,226,226,1)] " +
            "shadow-[0px_9.6px_14.4px_-2.88px_rgba(255,226,226,1)] " +
            "outline outline-[0.96px] outline-offset-[-0.96px] outline-red-100",
        iconBg: "bg-gradient-to-br from-red-500 to-red-600",
        amountText: "text-red-500",
    },
    green: {
        card:
            "shadow-[0px_3.84px_5.76px_-3.84px_rgba(220,252,231,1)] " +
            "shadow-[0px_9.6px_14.4px_-2.88px_rgba(220,252,231,1)] " +
            "outline outline-[0.96px] outline-offset-[-0.96px] outline-green-100",
        iconBg: "bg-gradient-to-br from-green-500 to-green-600",
        amountText: "text-green-500",
    },
    amber: {
        card:
            "shadow-[0px_3.84px_5.76px_-3.84px_rgba(254,243,198,1)] " +
            "shadow-[0px_9.6px_14.4px_-2.88px_rgba(254,243,198,1)] " +
            "outline outline-[0.96px] outline-offset-[-0.96px] outline-amber-100",
        iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
        amountText: "text-amber-500",
    },
    emerald: {
        card:
            "shadow-[0px_4px_6px_-4px_rgba(208,250,229,1)] " +
            "shadow-[0px_10px_15px_-3px_rgba(208,250,229,1)] " +
            "outline outline-[1px] outline-offset-[-1px] outline-emerald-100",
        iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        amountText: "text-emerald-500",
    },
    blue: {
        card:
            "shadow-[0px_4px_6px_-4px_rgba(219,234,254,1)] " +
            "shadow-[0px_10px_15px_-3px_rgba(219,234,254,1)] " +
            "outline outline-[1px] outline-offset-[-1px] outline-blue-100",
        iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
        amountText: "text-blue-500",
    },
    violet: {
        card:
            "shadow-[0px_3.84px_5.76px_-3.84px_rgba(237,233,254,1)] " +
            "shadow-[0px_9.6px_14.4px_-2.88px_rgba(237,233,254,1)] " +
            "outline outline-[0.96px] outline-offset-[-0.96px] outline-violet-100",
        iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
        amountText: "text-violet-500",
    },
};

function StatExpenseCard({
    title = "Total Expenses",
    amount = "$0.00",
    period = "This Month",
    icon,
    tone = "red",
    className,
}) {
    const styles = toneStyles[tone] || toneStyles.red;
    const IconNode = icon || <DollarSign className="h-6 w-6" />;

    return (
        <Card
            className={cn(
                " p-0 w-full h-full rounded-xl relative bg-white",
                styles.card,
                className
            )}
        >
            <CardContent className="h-full flex flex-col p-6">
                <div
                    className={cn(
                        "h-12 w-12 rounded-xl inline-flex items-center justify-center text-white",
                        styles.iconBg
                    )}
                >
                    {IconNode}
                </div>

                <div className="mt-6 space-y-1">
                    <p className="text-gray-500 text-sm font-normal leading-5">
                        {title}
                    </p>
                    <p
                        className={cn(
                            "text-3xl font-normal leading-9",
                            styles.amountText
                        )}
                    >
                        {amount}
                    </p>
                </div>

                {/* period */}
                <p className="mt-auto text-gray-400 text-xs font-normal leading-4">
                    {period}
                </p>
            </CardContent>
        </Card>
    );
}

export default StatExpenseCard;
