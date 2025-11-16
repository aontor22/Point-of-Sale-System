import pst1 from "../assets/products/pst1.png";
import pst2 from "../assets/products/pst2.png";
import pst3 from "../assets/products/pst3.png";
import pst4 from "../assets/products/pst4.png";
import pst5 from "../assets/products/pst5.png";
import pst6 from "../assets/products/pst6.png";
import pst7 from "../assets/products/pst7.png";
import pst8 from "../assets/products/pst8.png";
import pst9 from "../assets/products/pst9.png";
import pst10 from "../assets/products/pst10.png";

import p1 from "../assets/person/p1.png";
import p2 from "../assets/person/p2.png";
import p3 from "../assets/person/p3.png";
import p4 from "../assets/person/p4.png";
import p5 from "../assets/person/p5.png";
import p6 from "../assets/person/p6.png";
import p7 from "../assets/person/p7.png";
import p8 from "../assets/person/p8.png";
import p9 from "../assets/person/p9.png";
import p10 from "../assets/person/p10.png";

const CATALOG_ROWS = [
    {
        sku: "PT001",
        name: "Lenovo IdeaPad 3",
        person: "James Kirwin",
        personImg: p1,
        image: pst1,
        category: "Computers",
        categoryCode: "CT001",
        categorySlug: "computers",
        subCategory: "Laptop",
        brand: "Lenovo",
        price: 460,
        unit: "Pc",
        qty: 100,
        soldQty: 5, // Sold Quantity
        soldAmount: "$3000", // Sold Amount
        instockQty: 100, // Instock Quantity
        costPrice: 899.99,
        get totalPrice() {
            return this.qty * this.costPrice;
        },
        user: { name: "Flores, Juanita", avatar: "" },
        warehouse: "Lavish Warehouse",
        toWareHouse: "North Zone Warehouse",
        refNumber: "#458924",
        store: "Electro Mart",
        locationQty: 20,
        qtyAlert: 15,
        manufacturedDate: "24 Dec 2024",
        expiredDate: "20 Dec 2026",
        status: "Active",
        description: "Efficient Productivity",
    },
    {
        sku: "PT002",
        name: "Beats Pro",
        image: pst2,
        person: "James Kirwin",
        personImg: p2,
        category: "Electronics",
        categoryCode: "CT002",
        categorySlug: "electronics",
        subCategory: "wearables",
        brand: "Beats",
        price: 120,
        unit: "Pc",
        qty: 300,
        soldQty: 10, // Sold Quantity
        soldAmount: "$1600", // Sold Amount
        instockQty: 140, // Instock Quantity
        costPrice: 2499.99,
        get totalPrice() {
            return this.qty * this.costPrice;
        },
        user: { name: "Nguyen, Shane", avatar: "" },
        warehouse: "Quaint Warehouse",
        toWareHouse: "Nova Storage Hub",
        refNumber: "#429054",
        store: "Quantum Gadgets",
        locationQty: 25,
        qtyAlert: 20,
        manufacturedDate: "10 Dec 2024",
        expiredDate: "20 Dec 2026",
        status: "Active",
        description: "Seamless Connectivity",
    },
    {
        sku: "PT003",
        name: "Nike Jordan",
        person: "James Kirwin",
        personImg: p3,
        image: pst3,
        category: "Shoe",
        categoryCode: "CT003",
        categorySlug: "shoe",
        subCategory: "Sneakers",
        brand: "Nike",
        price: 180,
        unit: "Pc",
        qty: 120,
        soldQty: 8, // Sold Quantity
        soldAmount: "$880", // Sold Amount
        instockQty: 300, // Instock Quantity
        costPrice: 399.99,
        get totalPrice() {
            return this.qty * this.costPrice;
        },
        user: { name: "Flores, Juanita", avatar: "" },
        warehouse: "Traditional Warehouse",
        toWareHouse: "Cool Warehouse",
        refNumber: "#419893",
        store: "Prime Bazaar",
        locationQty: 40,
        qtyAlert: 35,
        manufacturedDate: "27 Nov 2024",
        expiredDate: "20 Dec 2026",
        status: "Active",
        description: "Dynamic Grip",
    },
    {
        sku: "PT004",
        name: "Apple Series 6 Watch",
        person: "James Kirwin",
        personImg: p4,
        image: pst4,
        category: "Electronics",
        categoryCode: "CT004",
        categorySlug: "electronics",
        subCategory: "Watch",
        brand: "Apple",
        price: 420,
        unit: "Pc",
        qty: 80,
        soldQty: 10, // Sold Quantity
        soldAmount: "$1200", // Sold Amount
        instockQty: 450, // Instock Quantity
        costPrice: 599.99,
        get totalPrice() {
            return this.qty * this.costPrice;
        },
        user: { name: "Miles, Esther", avatar: "" },
        warehouse: "Cool Warehouse",
        toWareHouse: "Retail Supply Hub",
        refNumber: "#386914",
        store: "Gadget World",
        locationQty: 50,
        qtyAlert: 45,
        manufacturedDate: "18 Nov 2024",
        expiredDate: "20 Dec 2026",
        status: "Active",
        description: "Stylish Time",
    },
    {
        sku: "PT005",
        name: "Amazon Echo Dot",
        person: "James Kirwin",
        personImg: p5,
        image: pst5,
        category: "Electronics",
        categoryCode: "CT005",
        categorySlug: "electronics",
        subCategory: "Speakers",
        brand: "Amazon",
        price: 80,
        unit: "Pc",
        qty: 320,
        soldQty: 15, // Sold Quantity
        soldAmount: "$900", // Sold Amount
        instockQty: 700, // Instock Quantity
        costPrice: 1299.99,
        get totalPrice() {
            return this.qty * this.costPrice;
        },
        user: { name: "Henry, Arthur", avatar: "" },
        warehouse: "Overflow Warehouse",
        toWareHouse: "Quaint Warehouse",
        refNumber: "#366713",
        store: "Volt Vault",
        locationQty: 30,
        qtyAlert: 25,
        manufacturedDate: "06 Nov 2024",
        expiredDate: "20 Dec 2026",
        status: "Active",
        description: "Reliable Sound",
    },
    {
        sku: "PT006",
        name: "Sanford Chair Sofa",
        person: "James Kirwin",
        personImg: p6,
        image: pst6,
        category: "Furniture",
        categoryCode: "CT009",
        categorySlug: "furniture",
        subCategory: "Sofa",
        brand: "Modern Wave",
        price: 700,
        unit: "Pc",
        qty: 76,
        soldQty: 12, // Sold Quantity
        soldAmount: "$6480", // Sold Amount
        instockQty: 630, // Instock Quantity
        costPrice: 99.99,
        get totalPrice() {
            return this.qty * this.costPrice;
        },
        user: { name: "Miles, Esther", avatar: "" },
        warehouse: "Nova Storage Hub",
        toWareHouse: "Traditional Warehouse",
        refNumber: "#327814",
        store: "Elite Retail",
        locationQty: 10,
        qtyAlert: 8,
        manufacturedDate: "25 Oct 2024",
        expiredDate: "20 Dec 2026",
        status: "Active",
        description: "Cozy Comfort",
    },
    {
        sku: "PT007",
        name: "Red Premium Satchel",
        person: "James Kirwin",
        personImg: p7,
        image: pst7,
        category: "Bags",
        categoryCode: "CT007",
        categorySlug: "bags",
        subCategory: "Handbags",
        brand: "Berry",
        price: 90,
        unit: "Pc",
        qty: 210,
        soldQty: 20, // Sold Quantity
        soldAmount: "$1800", // Sold Amount
        instockQty: 550, // Instock Quantity
        costPrice: 349.99,
        get totalPrice() {
            return this.qty * this.costPrice;
        },
        user: { name: "Henry, Arthur", avatar: "" },
        warehouse: "Retail Supply Hub",
        toWareHouse: "Overflow Warehouse",
        refNumber: "#274509",
        store: "Prime Mart",
        locationQty: 70,
        qtyAlert: 60,
        manufacturedDate: "14 Oct 2024",
        expiredDate: "20 Dec 2026",
        status: "Active",
        description: "Compact Carry",
    },
    {
        sku: "PT008",
        name: "iPhone 14 Pro",
        person: "James Kirwin",
        personImg: p8,
        image: pst8,
        category: "Phone",
        categoryCode: "CT011",
        categorySlug: "phone",
        subCategory: "Phone",
        brand: "Apple",
        price: 540,
        unit: "Pc",
        qty: 60,
        soldQty: 5, // Sold Quantity
        soldAmount: "$2700", // Sold Amount
        instockQty: 410, // Instock Quantity
        costPrice: 429.99,
        get totalPrice() {
            return this.qty * this.costPrice;
        },
        user: { name: "Henry, Arthur", avatar: "" },
        warehouse: "EdgeWare Solutions",
        toWareHouse: "Lavish Warehouse",
        refNumber: "#239073",
        store: "NeoTech Store",
        locationQty: 35,
        qtyAlert: 30,
        manufacturedDate: "03 Oct 2024",
        expiredDate: "20 Dec 2026",
        status: "Active",
        description: "Modern Style",
    },
    {
        sku: "PT009",
        name: "Gaming Chair",
        person: "James Kirwin",
        personImg: p9,
        image: pst9,
        category: "Furniture",
        categoryCode: "CT010",
        categorySlug: "furniture",
        subCategory: "Chair",
        brand: "Anime",
        price: 420,
        unit: "Pc",
        qty: 140,
        soldQty: 7, // Sold Quantity
        soldAmount: "$2940", // Sold Amount
        instockQty: 550, // Instock Quantity
        costPrice: 2499.99,
        get totalPrice() {
            return this.qty * this.costPrice;
        },
        user: { name: "Black, Marvin", avatar: "" },
        warehouse: "North Zone Warehouse",
        toWareHouse: "Fulfillment Hub",
        refNumber: "#187204",
        store: "Urban Mart",
        locationQty: 15,
        qtyAlert: 10,
        manufacturedDate: "20 Sep 2024",
        expiredDate: "20 Dec 2026",
        status: "Active",
        description: "Stylish Comfort",
    },
    {
        sku: "PT010",
        name: "Borealis Backpack",
        person: "James Kirwin",
        personImg: p10,
        image: pst10,
        category: "Bags",
        categoryCode: "CT008",
        categorySlug: "bags",
        subCategory: "Travel",
        brand: "The North Face",
        price: 45,
        unit: "Pc",
        qty: 550,
        soldQty: 20, // Sold Quantity
        soldAmount: "$900", // Sold Amount
        instockQty: 550, // Instock Quantity
        costPrice: 129.99,
        get totalPrice() {
            return this.qty * this.costPrice;
        },
        user: { name: "Cooper, Kristin", avatar: "" },
        warehouse: "Fulfillment Hub",
        toWareHouse: "EdgeWare Solutions",
        refNumber: "#139064",
        store: "Travel Mart",
        locationQty: 45,
        qtyAlert: 40,
        manufacturedDate: "10 Sep 2024",
        expiredDate: "20 Dec 2026",
        status: "Active",
        description: "Travel Ready",
    },
];

export default CATALOG_ROWS;
