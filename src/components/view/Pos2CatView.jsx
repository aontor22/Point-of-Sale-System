import React, { useState } from "react";
import CategoryCard from "@/components/ui/pos/Pos2Card";

import juicerImg from "@/assets/icons/juicer.png";
import laptopImg from "@/assets/icons/laptop.png";
import watchImg from "@/assets/icons/watch.png";
import iphoneImg from "@/assets/icons/iphone.png";
import shoeImg from "@/assets/icons/shoe.png";
import headphoneImg from "@/assets/icons/headphone.png";
import allcat from "@/assets/icons/allcat.svg";

export const POS_CATEGORIES = [
    { title: "All", iconSrc: allcat },
    { title: "Headphones", iconSrc: headphoneImg },
    { title: "Headphones", iconSrc: headphoneImg },
    { title: "Shoes", iconSrc: shoeImg },
    { title: "Mobiles", iconSrc: iphoneImg },
    { title: "Watches", iconSrc: watchImg },
    { title: "Laptops", iconSrc: laptopImg },
    { title: "Home Needs", iconSrc: juicerImg },
];

export default function CategoryStrip() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="grid grid-cols-6 gap-3 pb-1">
            {POS_CATEGORIES.map((cat, index) => (
                <CategoryCard
                    key={index}
                    label={cat.title}
                    icon={
                        <img
                            src={cat.iconSrc}
                            alt={cat.title}
                            className="h-5 w-5 object-contain"
                        />
                    }
                    isActive={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                />
            ))}
        </div>
    );
}
