import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function ProductCard({
    category = "Mobiles",
    name = "IPhone 14 64GB",
    quantityText = "30 Pcs",
    priceText = "$15800",
    imageSrc,
    className,
    ...props
}) {
    return (
        <Card
            className={cn(
                "self-stretch p-0 bg-white dark:bg-slate-800 rounded-lg",
                "outline outline-1 outline-offset-[-1px] outline-Transparent-Secondry-Transparent",
                "flex flex-col justify-center items-center",
                className
            )}
            {...props}
        >
            <CardContent className="py-4 px-0 relative flex flex-col justify-center items-center gap-2.5 w-full">
                <div className=" w-36 h-28 bg-slate-100 dark:bg-slate-700 rounded-md items-center justify-center flex">
                    {imageSrc && (
                        <img
                            src={imageSrc}
                            alt={name}
                            className="w-14 h-24 absolute top-6 left-1/2 -translate-x-1/2 object-contain"
                        />
                    )}
                </div>

                <div className="w-36 flex flex-col justify-start items-start gap-2">
                    <div className="self-stretch flex flex-col justify-start items-start">
                        <div className="text-slate-600 dark:text-slate-300 text-sm font-normal font-['Nunito_Sans'] leading-5">
                            {category}
                        </div>

                        <div className="w-36 flex-1 flex flex-col justify-start items-start gap-[5px]">
                            <div className="self-stretch text-Grey-Grey-900 text-sm font-bold font-['Nunito_Sans'] leading-5">
                                {name}
                            </div>
                        </div>
                    </div>

                    <div className="self-stretch h-0 outline-dashed outline-1 outline-offset-[-0.5px] outline-Transparent-Secondry-Transparent" />

                    <div className="self-stretch inline-flex justify-start items-start gap-2.5">
                        <div className="text-pink-600 text-sm font-normal font-['Nunito_Sans'] leading-5">
                            {quantityText}
                        </div>
                        <div className="flex-1 text-right text-teal-600 text-sm font-bold font-['Nunito_Sans'] leading-5">
                            {priceText}
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}

export default ProductCard;
