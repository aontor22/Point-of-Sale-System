import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function CategoryCard({
    title = "All Categories",
    itemsText = "54 Items",
    iconSrc,
    active = false,
    className,
    ...props
}) {
    return (
        <Card
            className={cn(
                "p-3.5 flex flex-col justify-center items-center gap-2.5",
                "bg-white dark:bg-slate-800 rounded-lg cursor-pointer",
                active
                    ? "border-2 border-orange-500"
                    : "border border-gray-200 dark:border-slate-700",
                className
            )}
            {...props}
        >
            <CardContent className="p-0 flex flex-col justify-center items-center gap-2.5">
                <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                    {iconSrc && (
                        <img
                            src={iconSrc}
                            alt={title}
                            className="max-w-full max-h-full object-contain"
                        />
                    )}
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className="text-slate-900 dark:text-slate-200 text-sm font-bold leading-5">
                        {title}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm leading-5">
                        {itemsText}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CategoryCard;
