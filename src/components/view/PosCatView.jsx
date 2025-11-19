import React from "react";
import CategoryCard from "@/components/ui/pos/PosCategoryCard";

import juicerImg from "@/assets/icons/juicer.png";
import laptopImg from "@/assets/icons/laptop.png";
import watchImg from "@/assets/icons/watch.png";
import iphoneImg from "@/assets/icons/iphone.png";
import shoeImg from "@/assets/icons/shoe.png";
import headphoneImg from "@/assets/icons/headphone.png";
import allcat from "@/assets/icons/allcat.svg";

export const POS_CATEGORIES = [
    { title: "All Categories", itemsText: "54 Items", iconSrc: allcat },
    { title: "Headphones", itemsText: "4 Items", iconSrc: headphoneImg },
    { title: "Headphones", itemsText: "4 Items", iconSrc: headphoneImg },
    { title: "Shoes", itemsText: "14 Items", iconSrc: shoeImg },
    { title: "Mobiles", itemsText: "7 Items", iconSrc: iphoneImg },
    { title: "Watches", itemsText: "16 Items", iconSrc: watchImg },
    { title: "Laptops", itemsText: "18 Items", iconSrc: laptopImg },
    { title: "Home Needs", itemsText: "12 Items", iconSrc: juicerImg },
];

function PosCatView({ activeIndex, onChangeActive }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 pb-4">
            {POS_CATEGORIES.map((cat, index) => (
                <CategoryCard
                    key={`${cat.title}-${index}`}
                    title={cat.title}
                    itemsText={cat.itemsText}
                    iconSrc={cat.iconSrc}
                    active={index === activeIndex}
                    onClick={() => onChangeActive(index)}
                />
            ))}
        </div>
    );
}

export default PosCatView;
