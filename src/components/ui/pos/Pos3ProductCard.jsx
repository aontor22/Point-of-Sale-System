import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext1";

const ProductCard = ({
    name,
    price,
    quantity,
    imageSrc,
    className,
    ...props
}) => {
    const { items, toggleItem } = useCart();

    const key = name;
    const isAdded = !!items[key];

    const handleToggle = (e) => {
        e.stopPropagation();
        toggleItem({
            key,
            name,
            price,
            imageSrc,
        });
    };

    return (
        <Card
            className={cn(
                "relative w-40.5 h-47.5 rounded-xl p-0",
                "bg-white dark:bg-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.10)] dark:shadow-none overflow-hidden",
                isAdded ? "border-2 border-[#F5A623]" : "border border-transparent",
                className
            )}
            {...props}
        >
            <div className="relative h-40 w-full bg-slate-200">
                <img
                    src={imageSrc}
                    alt={name}
                    className="h-full w-full object-cover"
                />

                <button
                    type="button"
                    onClick={handleToggle}
                    className={cn(
                        "absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-white text-[11px]",
                        "shadow-md transition-all duration-200",
                        isAdded ? "bg-red-500" : "bg-emerald-500"
                    )}
                >
                    {isAdded ? (
                        <Minus className="h-3.5 w-3.5" />
                    ) : (
                        <Plus className="h-3.5 w-3.5" />
                    )}
                </button>
            </div>

            <CardContent className="px-4 pb-4 -mt-2.5">
                <p className="text-sm font-semibold pb-1 text-slate-800 dark:text-slate-300 leading-snug">
                    {name}
                </p>

                <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-emerald-500">${price}</span>
                    <span className="text-pink-500">{quantity} Pcs</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
