import React from "react";
import ProductCard from "@/components/ui/pos/PosProductCard";

import iphoneImg from "@/assets/icons/iphone14.png";
import laptopImg from "@/assets/icons/macbookpro.png";
import watchImg from "@/assets/icons/rolexTributev3.png";
import shoeImg from "@/assets/icons/rednikeAngelo.png";
import headphoneImg from "@/assets/icons/airpod2.png";
import bluewhiteogr from "@/assets/icons/bluewhiteogr.png";
import ideapad5 from "@/assets/icons/ideapad5.png";
import swagme from "@/assets/icons/swagme.png";
import watch from "@/assets/icons/watch.png";
import tablet from "@/assets/icons/tablet.png";
import fossil from "@/assets/icons/fossil.png";
import greennike from "@/assets/icons/greennike.png";
import yogabook from "@/assets/icons/yogabook.png";
import ideapad3 from "@/assets/icons/ideapad3.png";
import iphone11 from "@/assets/icons/iphone11.png";

export default function ProductView() {
    const products = [
        {
            category: "Mobiles",
            name: "IPhone 14 64GB",
            quantityText: "30 Pcs",
            priceText: "$15800",
            imageSrc: iphoneImg,
        },
        {
            category: "Computer",
            name: "MacBook Pro",
            quantityText: "140 Pcs",
            priceText: "$1000",
            imageSrc: laptopImg,
        },
        {
            category: "Watches",
            name: "Rolex Tribute V3",
            quantityText: "220 Pcs",
            priceText: "$6800",
            imageSrc: watchImg,
        },
        {
            category: "Shoes",
            name: "Red Nike Angelo",
            quantityText: "220 Pcs",
            priceText: "78 Pcs",
            imageSrc: shoeImg,
        },
        {
            category: "Headphones",
            name: "Airpod 2",
            quantityText: "47 Pcs",
            priceText: "$5478",
            imageSrc: headphoneImg,
        },
        {
            category: "Shoes",
            name: "Blue White OGR",
            quantityText: "30 Pcs",
            priceText: "$987",
            imageSrc: bluewhiteogr,
        },
        {
            category: "Laptops",
            name: "IdeaPad Slim 5 Gen 7",
            quantityText: "74 Pcs",
            priceText: "$1454",
            imageSrc: ideapad5,
        },
        {
            category: "Headphones",
            name: "SWAGME",
            quantityText: "14 Pcs",
            priceText: "$6587",
            imageSrc: swagme,
        },
        {
            category: "Watches",
            name: "Sport Watch Black",
            quantityText: "220 Pcs",
            priceText: "$1457",
            imageSrc: watch,
        },
        {
            category: "Computers",
            name: "Tablet 1.02 inch",
            quantityText: "47 Pcs",
            priceText: "$4744",
            imageSrc: tablet,
        },
        {
            category: "Watches",
            name: "Fossil Pair of 3 in 1",
            quantityText: "40 Pcs",
            priceText: "$789",
            imageSrc: fossil,
        },
        {
            category: "Shoes",
            name: "Green Nike Fe",
            quantityText: "78 Pcs",
            priceText: "$1454",
            imageSrc: greennike,
        },
        {
            category: "Laptops",
            name: "Yoga Book 9i",
            quantityText: "65 Pcs",
            priceText: "$4784",
            imageSrc: yogabook,
        },
        {
            category: "Laptops",
            name: "IdeaPad Slim 3i",
            quantityText: "47 Pcs",
            priceText: "$4784",
            imageSrc: ideapad3,
        },
        {
            category: "Phones",
            name: "Iphone 11",
            quantityText: "14 Pcs",
            priceText: "$3654",
            imageSrc: iphone11,
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 pb-4">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    category={product.category}
                    name={product.name}
                    quantityText={product.quantityText}
                    priceText={product.priceText}
                    imageSrc={product.imageSrc}
                />
            ))}
        </div>
    );
}
