import React, { useState } from "react";
import ProductCard from "@/components/ui/pos/Pos2ProductCard";
import airpod from '@/assets/icons/airpod.png'
import vaccum from '@/assets/icons/vaccum.png'
import realme8pro from '@/assets/icons/realme8pro.png'
import powercable from '@/assets/icons/powercable.png'

const products = [
    {
        id: 1,
        name: "Power Cable",
        price: 120,
        quantity: 25,
        imageSrc: powercable,
    },
    {
        id: 2,
        name: "Apple Airpods Pro",
        price: 180,
        quantity: 15,
        imageSrc: airpod,
    },
    {
        id: 3,
        name: "Apple Airpods 3",
        price: 150,
        quantity: 10,
        imageSrc: vaccum,
    },
    {
        id: 4,
        name: "Apple Airpods Max",
        price: 550,
        quantity: 5,
        imageSrc: realme8pro,
    }, {
        id: 1,
        name: "Apple Airpods 2",
        price: 120,
        quantity: 25,
        imageSrc: powercable,
    },
    {
        id: 2,
        name: "Apple Airpods Pro",
        price: 180,
        quantity: 15,
        imageSrc: airpod,
    },
    {
        id: 3,
        name: "Apple Airpods 3",
        price: 150,
        quantity: 10,
        imageSrc: vaccum,
    },
    {
        id: 4,
        name: "Apple Airpods Max",
        price: 550,
        quantity: 5,
        imageSrc: realme8pro,
    }, {
        id: 1,
        name: "Apple Airpods 2",
        price: 120,
        quantity: 25,
        imageSrc: powercable,
    },
    {
        id: 2,
        name: "Apple Airpods Pro",
        price: 180,
        quantity: 15,
        imageSrc: airpod,
    },
    {
        id: 3,
        name: "Apple Airpods 3",
        price: 150,
        quantity: 10,
        imageSrc: vaccum,
    },
    {
        id: 4,
        name: "Apple Airpods Max",
        price: 550,
        quantity: 5,
        imageSrc: realme8pro,
    }, {
        id: 1,
        name: "Apple Airpods 2",
        price: 120,
        quantity: 25,
        imageSrc: powercable,
    },
    {
        id: 2,
        name: "Apple Airpods Pro",
        price: 180,
        quantity: 15,
        imageSrc: airpod,
    },
    {
        id: 3,
        name: "Apple Airpods 3",
        price: 150,
        quantity: 10,
        imageSrc: vaccum,
    },
    {
        id: 4,
        name: "Apple Airpods Max",
        price: 550,
        quantity: 5,
        imageSrc: realme8pro,
    }, {
        id: 1,
        name: "Apple Airpods 2",
        price: 120,
        quantity: 25,
        imageSrc: powercable,
    },
    {
        id: 2,
        name: "Apple Airpods Pro",
        price: 180,
        quantity: 15,
        imageSrc: airpod,
    },
    {
        id: 3,
        name: "Apple Airpods 3",
        price: 150,
        quantity: 10,
        imageSrc: vaccum,
    },
    {
        id: 4,
        name: "Apple Airpods Max",
        price: 550,
        quantity: 5,
        imageSrc: realme8pro,
    },
];

export default function ProductGridView({ isSidebarCollapsed }) {
    return (
        <div className="w-full pr-3">
            <div
                className={`grid gap-3 sm:grid-cols-2 ${isSidebarCollapsed ? "lg:grid-cols-5" : "lg:grid-cols-4"
                    }`}
            >
                {products.map((item, index) => (
                    <ProductCard
                        key={index}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        imageSrc={item.imageSrc}
                    />
                ))}
            </div>
        </div>
    );
}