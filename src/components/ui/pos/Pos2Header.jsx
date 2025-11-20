import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CategoryCard({
    label = "All",
    icon,
    isActive = false,
    className,
    ...props
}) {
    return (
        <Card
            className={cn(
                "inline-flex items-center gap-2 rounded-2xl px-4 py-2",
                "bg-white shadow-sm cursor-pointer select-none",
                "border border-transparent transition-all",
                isActive
                    ? "border-[#FF8A00] shadow-[0_0_0_1px_rgba(255,138,0,0.35)]"
                    : "hover:border-slate-200",
                className
            )}
            {...props}
        >
            {icon && (
                <span
                    className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-md",
                        isActive ? "text-[#FF8A00]" : "text-slate-700"
                    )}
                >
                    {icon}
                </span>
            )}

            <span
                className={cn(
                    "text-sm font-semibold",
                    isActive ? "text-slate-900" : "text-slate-700"
                )}
            >
                {label}
            </span>
        </Card>
    );
}
