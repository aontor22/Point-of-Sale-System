// supplier images
import su1 from "../assets/supplier/su1.png";
import su2 from "../assets/supplier/su2.png";
import su3 from "../assets/supplier/su3.png";
import su4 from "../assets/supplier/su4.png";
import su5 from "../assets/supplier/su5.png";
import su6 from "../assets/supplier/su6.png";
import su7 from "../assets/supplier/su7.png";
import su8 from "../assets/supplier/su8.png";
import su9 from "../assets/supplier/su9.png";
import su10 from "../assets/supplier/su10.png";

const suppliers = [
    {
        suID: 1,
        suRef: "INV/PO2025",
        suCode: "SU001",
        suName: "Apex Computers",
        suTotalItems: 10,
        suAmount: "$1000",
        suPaymentMethod: "Cash",
        suStatus: "Received",
        suImg: su1,
    },
    {
        suID: 2,
        suRef: "INV/PO2031",
        suCode: "SU002",
        suName: "Beats Headphones",
        suTotalItems: 15,
        suAmount: "$1500",
        suPaymentMethod: "Paypal",
        suStatus: "Pending",
        suImg: su2,
    },
    {
        suID: 3,
        suRef: "INV/PO2042",
        suCode: "SU003",
        suName: "Dazzle Shoes",
        suTotalItems: 22,
        suAmount: "$1500",
        suPaymentMethod: "Paypal",
        suStatus: "Received",
        suImg: su3,
    },
    {
        suID: 4,
        suRef: "INV/PO2033",
        suCode: "SU004",
        suName: "Best Accessories",
        suTotalItems: 14,
        suAmount: "$2000",
        suPaymentMethod: "Stripe",
        suStatus: "Ordered",
        suImg: su4,
    },
    {
        suID: 5,
        suRef: "INV/PO2042",
        suCode: "SU005",
        suName: "A-Z Store",
        suTotalItems: 12,
        suAmount: "$800",
        suPaymentMethod: "Paypal",
        suStatus: "Received",
        suImg: su5,
    },
    {
        suID: 6,
        suRef: "INV/PO2011",
        suCode: "SU006",
        suName: "Hatimi Hardwares",
        suTotalItems: 45,
        suAmount: "$750",
        suPaymentMethod: "Cash",
        suStatus: "Pending",
        suImg: su6,
    },
    {
        suID: 7,
        suRef: "INV/PO2014",
        suCode: "SU007",
        suName: "Aesthetic Bags",
        suTotalItems: 21,
        suAmount: "$1300",
        suPaymentMethod: "Credit Card",
        suStatus: "Received",
        suImg: su7,
    },
    {
        suID: 8,
        suRef: "INV/PO2056",
        suCode: "SU008",
        suName: "Alpha Mobiles",
        suTotalItems: 78,
        suAmount: "$1100",
        suPaymentMethod: "Stripe",
        suStatus: "Received",
        suImg: su8,
    },
    {
        suID: 9,
        suRef: "INV/PO2047",
        suCode: "SU009",
        suName: "Sigma Chairs",
        suTotalItems: 25,
        suAmount: "$2300",
        suPaymentMethod: "Credit Card",
        suStatus: "Ordered",
        suImg: su9,
    },
    {
        suID: 10,
        suRef: "INV/PO2017",
        suCode: "SU010",
        suName: "Zenith Bags",
        suTotalItems: 15,
        suAmount: "$1700",
        suPaymentMethod: "Stripe",
        suStatus: "Pending",
        suImg: su10,
    },
];

export default suppliers;
