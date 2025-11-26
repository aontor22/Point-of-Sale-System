const baseIncomes = [
  {
    inID: 1,
    inDate: "Nov 4, 2025",
    inSource: "Product Sales - Online Store",
    inAmount: 15420.0,
    inCategory: "Sales Revenue",
    inPaymentMethod: "Credit Card",
    inInvoice: "INV-2025-1104",
    inStatus: "Received",
  },
  {
    inID: 2,
    inDate: "Nov 4, 2025",
    inSource: "Consulting Services - ABC Corp",
    inAmount: 8500.0,
    inCategory: "Service Revenue",
    inPaymentMethod: "Bank Transfer",
    inInvoice: "INV-2025-1103",
    inStatus: "Received",
  },
  {
    inID: 3,
    inDate: "Nov 3, 2025",
    inSource: "Subscription Renewals",
    inAmount: 3200.0,
    inCategory: "Recurring Revenue",
    inPaymentMethod: "Auto Payment",
    inInvoice: "INV-2025-1102",
    inStatus: "Received",
  },
  {
    inID: 4,
    inDate: "Nov 3, 2025",
    inSource: "Wholesale Order - Retail Partner",
    inAmount: 24750.0,
    inCategory: "Sales Revenue",
    inPaymentMethod: "Check",
    inInvoice: "INV-2025-1101",
    inStatus: "Processing",
  },
  {
    inID: 5,
    inDate: "Nov 2, 2025",
    inSource: "Investment Returns",
    inAmount: 5600.0,
    inCategory: "Investment Income",
    inPaymentMethod: "Bank Transfer",
    inInvoice: "-",
    inStatus: "Received",
  },
  {
    inID: 6,
    inDate: "Nov 2, 2025",
    inSource: "Freelance Project - Tech Startup",
    inAmount: 12000.0,
    inCategory: "Service Revenue",
    inPaymentMethod: "PayPal",
    inInvoice: "INV-2025-1100",
    inStatus: "Pending",
  },
  {
    inID: 7,
    inDate: "Nov 1, 2025",
    inSource: "Rental Income - Commercial Property",
    inAmount: 6500.0,
    inCategory: "Rental Income",
    inPaymentMethod: "Bank Transfer",
    inInvoice: "-",
    inStatus: "Received",
  },
  {
    inID: 8,
    inDate: "Nov 1, 2025",
    inSource: "Product Sales - Retail Store",
    inAmount: 18900.0,
    inCategory: "Sales Revenue",
    inPaymentMethod: "Multiple",
    inInvoice: "INV-2025-1099",
    inStatus: "Received",
  },
  {
    inID: 9,
    inDate: "Oct 31, 2025",
    inSource: "Commission Income",
    inAmount: 4200.0,
    inCategory: "Commission",
    inPaymentMethod: "Bank Transfer",
    inInvoice: "-",
    inStatus: "Received",
  },
  {
    inID: 10,
    inDate: "Oct 31, 2025",
    inSource: "Licensing Fees",
    inAmount: 9800.0,
    inCategory: "Licensing Revenue",
    inPaymentMethod: "Wire Transfer",
    inInvoice: "INV-2025-1098",
    inStatus: "Processing",
  },
  {
    inID: 11,
    inDate: "Oct 30, 2025",
    inSource: "Workshop Registration Fees",
    inAmount: 2850.0,
    inCategory: "Service Revenue",
    inPaymentMethod: "Credit Card",
    inInvoice: "-",
    inStatus: "Received",
  },
  {
    inID: 12,
    inDate: "Oct 30, 2025",
    inSource: "Affiliate Marketing Commission",
    inAmount: 1450.0,
    inCategory: "Commission",
    inPaymentMethod: "PayPal",
    inInvoice: "-",
    inStatus: "Pending",
  },
];

// src/data/IncomeData.js

const incomeCategories = [
  "Sales Revenue",
  "Service Revenue",
  "Recurring Revenue",
  "Commission",
  "Licensing Revenue",
  "Rental Income",
  "Investment Income",
];

const paymentMethods = [
  "Credit Card",
  "Bank Transfer",
  "Paypal",
  "Wire Transfer",
  "Cash",
  "Check",
  "Auto Payment",
];

function randomDate() {
  const start = new Date(2024, 0, 1);
  const end = new Date(2025, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toDateString().slice(4);
}

const demoIncomes = Array.from({ length: 200 }, (_, i) => {
  const id = i + baseIncomes.length + 1;
  const category = incomeCategories[Math.floor(Math.random() * incomeCategories.length)];
  return {
    inID: id,
    inDate: randomDate(),
    inSource: `${category} Source ${id}`,
    inAmount: Number((Math.random() * 20000 + 500).toFixed(2)),
    inCategory: category,
    inPaymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    inInvoice: `INV-${2025}-${id}`,
    inStatus: ["Received", "Pending", "Processing"][Math.floor(Math.random() * 3)],
  };
});

const incomes = [...baseIncomes, ...demoIncomes];
export default incomes;
