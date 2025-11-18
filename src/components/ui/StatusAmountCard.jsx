import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function PurchaseStatCard({
    title,
    amount,
    subtitle,
    bgClass = "bg-sky-600",
    className = "",
}) {
    return (
        <Card
            className={`${bgClass} text-white rounded-[9.71px] border-none p-0 h-32 ${className}`}
        >
            <CardContent className="h-full px-6 pt-6 pb-4 flex flex-col justify-between items-start">
                <p className="text-sm leading-5 font-normal opacity-90">
                    {title}
                </p>

                <p className="text-3xl leading-9 font-normal tracking-tight">
                    {amount}
                </p>

                <p className="text-sm leading-5 font-normal opacity-80">
                    {subtitle}
                </p>
            </CardContent>
        </Card>
    );
}
