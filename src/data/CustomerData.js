import c1 from "../assets/customer/cu1.png";
import c2 from "../assets/customer/cu2.png";
import c3 from "../assets/customer/cu3.png";
import c4 from "../assets/customer/cu4.png";
import c5 from "../assets/customer/cu5.png";
import c6 from "../assets/customer/cu6.png";
import c7 from "../assets/customer/cu7.png";
import c8 from "../assets/customer/cu8.png";
import c9 from "../assets/customer/cu9.png";
import c10 from "../assets/customer/cu10.png";

const orders = [
    {
        id: 1,
        reference: "INV2025",
        code: "CU001",
        customer: "Carl Evans",
        totalOrders: 10,
        amount: "$1000",
        paymentMethod: "Cash",
        status: "Completed",
        customerImg: c1,
    },
    {
        id: 2,
        reference: "INV2031",
        code: "CU002",
        customer: "Minerva Ramirez",
        totalOrders: 15,
        amount: "$1500",
        paymentMethod: "Paypal",
        status: "Completed",
        customerImg: c2,
    },
    {
        id: 3,
        reference: "INV2042",
        code: "CU003",
        customer: "Robert Lamon",
        totalOrders: 22,
        amount: "$1500",
        paymentMethod: "Paypal",
        status: "Completed",
        customerImg: c3,
    },
    {
        id: 4,
        reference: "INV2033",
        code: "CU004",
        customer: "Patricia Lewis",
        totalOrders: 14,
        amount: "$2000",
        paymentMethod: "Stripe",
        status: "Completed",
        customerImg: c4,
    },
    {
        id: 5,
        reference: "INV2042",
        code: "CU005",
        customer: "Mark Joslyn",
        totalOrders: 12,
        amount: "$800",
        paymentMethod: "Paypal",
        status: "Completed",
        customerImg: c5,
    },
    {
        id: 6,
        reference: "INV2011",
        code: "CU006",
        customer: "Marsha Betts",
        totalOrders: 45,
        amount: "$750",
        paymentMethod: "Cash",
        status: "Completed",
        customerImg: c6,
    },
    {
        id: 7,
        reference: "INV2014",
        code: "CU007",
        customer: "Daniel Jude",
        totalOrders: 21,
        amount: "$1300",
        paymentMethod: "Credit Card",
        status: "Completed",
        customerImg: c7,
    },
    {
        id: 8,
        reference: "INV2056",
        code: "CU008",
        customer: "Emma Bates",
        totalOrders: 78,
        amount: "$1100",
        paymentMethod: "Stripe",
        status: "Completed",
        customerImg: c8,
    },
    {
        id: 9,
        reference: "INV2047",
        code: "CU009",
        customer: "Richard Fraick",
        totalOrders: 25,
        amount: "$2300",
        paymentMethod: "Credit Card",
        status: "Completed",
        customerImg: c9,
    },
    {
        id: 10,
        reference: "INV2017",
        code: "CU010",
        customer: "Michelle Robison",
        totalOrders: 15,
        amount: "$1700",
        paymentMethod: "Stripe",
        status: "Completed",
        customerImg: c10,
    }
];

export default orders;
