const suppliers = [
    "Tech Supplies Co.",
    "Apple Distributors Inc.",
    "Audio Excellence Ltd.",
    "Dell Technologies",
    "Logitech International",
    "LG Electronics",
    "Canon Inc.",
    "Gadget World Wholesale",
];

const products = [
    "Samsung Galaxy S24",
    'MacBook Pro 16"',
    "Sony WH-1000XM5",
    "iPad Air 5th Gen",
    "Dell XPS 13",
    "Logitech MX Master 3",
    'LG 27" Monitor',
    "Apple Watch Series 9",
    "Canon EOS R6",
    "Bose SoundLink",
];

const paymentStatuses = ["Paid", "Pending", "Partial", "Overdue"];
const deliveryStatuses = ["Delivered", "Processing", "In Transit", "Delayed"];

const monthLabels = ["Oct", "Nov", "Dec"];

// Generate 100 demo purchase orders
const purchases = Array.from({ length: 100 }, (_, index) => {
    const poID = index + 1;
    const supplier = suppliers[index % suppliers.length];
    const product = products[index % products.length];

    const month = monthLabels[Math.floor(index / 30) % monthLabels.length];
    const day = (index % 28) + 1;
    const poDate = `${month} ${day}, 2025`;

    const poQuantity = 10 + (index % 90);
    const poUnitPrice = 99.99 + (index % 20) * 25;
    const poTotalAmount = Number((poQuantity * poUnitPrice).toFixed(2));

    const poPaymentStatus = paymentStatuses[index % paymentStatuses.length];
    const poDeliveryStatus = deliveryStatuses[index % deliveryStatuses.length];

    return {
        poID,
        poCode: `PO-2025-${String(poID).padStart(3, "0")}`,
        poSupplier: supplier,
        poDate,
        poProduct: product,
        poQuantity,
        poUnitPrice,
        poTotalAmount,
        poPaymentStatus,
        poDeliveryStatus,
    };
});

export default purchases;
