const baseExpenses = [
    {
        exID: 1,
        exDate: "Nov 4, 2025",
        exCategory: "Office Supplies",
        exAmount: 1250.0,
        exDescription: "Printer paper, ink cartridges, and office stationery",
        exPaymentMethod: "Credit Card",
        exVendor: "Office Depot",
        exStatus: "Paid",
    },
    {
        exID: 2,
        exDate: "Nov 3, 2025",
        exCategory: "Utilities",
        exAmount: 875.5,
        exDescription: "Monthly electricity bill for November",
        exPaymentMethod: "Bank Transfer",
        exVendor: "Power Company",
        exStatus: "Paid",
    },
    {
        exID: 3,
        exDate: "Nov 3, 2025",
        exCategory: "Marketing",
        exAmount: 3500.0,
        exDescription: "Social media advertising campaign",
        exPaymentMethod: "Credit Card",
        exVendor: "Meta Ads",
        exStatus: "Approved",
    },
    {
        exID: 4,
        exDate: "Nov 2, 2025",
        exCategory: "Transportation",
        exAmount: 450.0,
        exDescription: "Delivery truck fuel expenses",
        exPaymentMethod: "Cash",
        exVendor: "Shell Gas Station",
        exStatus: "Paid",
    },
    {
        exID: 5,
        exDate: "Nov 2, 2025",
        exCategory: "Equipment Maintenance",
        exAmount: 2100.0,
        exDescription: "Annual maintenance for warehouse equipment",
        exPaymentMethod: "Check",
        exVendor: "Tech Service Inc.",
        exStatus: "Pending",
    },
    {
        exID: 6,
        exDate: "Nov 1, 2025",
        exCategory: "Rent",
        exAmount: 5000.0,
        exDescription: "Monthly office rent payment",
        exPaymentMethod: "Bank Transfer",
        exVendor: "Property Management Co.",
        exStatus: "Paid",
    },
    {
        exID: 7,
        exDate: "Nov 1, 2025",
        exCategory: "Professional Services",
        exAmount: 1800.0,
        exDescription: "Legal consultation and contract review",
        exPaymentMethod: "Credit Card",
        exVendor: "Smith & Associates Law",
        exStatus: "Paid",
    },
    {
        exID: 8,
        exDate: "Oct 31, 2025",
        exCategory: "Software Subscription",
        exAmount: 599.0,
        exDescription: "Annual subscription for accounting software",
        exPaymentMethod: "Credit Card",
        exVendor: "QuickBooks",
        exStatus: "Paid",
    },
    {
        exID: 9,
        exDate: "Oct 31, 2025",
        exCategory: "Employee Benefits",
        exAmount: 4200.0,
        exDescription: "Health insurance premium for November",
        exPaymentMethod: "Bank Transfer",
        exVendor: "HealthCare Provider",
        exStatus: "Approved",
    },
    {
        exID: 10,
        exDate: "Oct 30, 2025",
        exCategory: "Travel",
        exAmount: 1650.0,
        exDescription: "Business trip to supplier facility",
        exPaymentMethod: "Corporate Card",
        exVendor: "Airlines & Hotel",
        exStatus: "Pending",
    },
];

// src/data/ExpenseData.js

const expenseCategories = [
    "Office Supplies",
    "Utilities",
    "Marketing",
    "Transportation",
    "Equipment Maintenance",
    "Rent",
    "Travel",
    "Software Subscription",
    "Employee Benefits",
];

const vendors = [
    "Office Depot",
    "Tech Service Inc.",
    "Power Company",
    "Meta Ads",
    "Amazon Business",
    "Shell Gas Station",
    "QuickBooks",
    "Airline Co.",
];

const payMethods = ["Credit Card", "Bank Transfer", "Cash", "Check", "Corporate Card"];

function randomDate() {
    const start = new Date(2024, 0, 1);
    const end = new Date(2025, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toDateString().slice(4);
}

const demoExpenses = Array.from({ length: 200 }, (_, i) => {
    const id = i + baseExpenses.length + 1;
    const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)];

    return {
        exID: id,
        exDate: randomDate(),
        exCategory: category,
        exAmount: Number((Math.random() * 5000 + 200).toFixed(2)),
        exDescription: `${category} expense description ${id}`,
        exPaymentMethod: payMethods[Math.floor(Math.random() * payMethods.length)],
        exVendor: vendors[Math.floor(Math.random() * vendors.length)],
        exStatus: ["Paid", "Approved", "Pending"][Math.floor(Math.random() * 3)],
    };
});

const expenses = [...baseExpenses, ...demoExpenses];
export default expenses;
