const returnReasons = [
    "Defective Units",
    "Wrong Model",
    "Damaged in Transit",
    "Customer Order Cancelled",
    "Excess Stock",
    "Wrong Specifications",
    "Quality Issues",
];

const returnStatuses = ["Approved", "Pending", "Completed", "Processing", "Rejected"];

const suppliers = [
    "Tech Supplies Co.",
    "Apple Distributors Inc.",
    "Audio Excellence Ltd.",
    "Dell Technologies",
    "Logitech International",
    "LG Electronics",
    "Canon Inc.",
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

const monthLabels = ["Oct", "Nov", "Dec"];

const purchaseOrders = Array.from({ length: 100 }, (_, index) => {
    const returnID = index + 1;
    const purchaseOrderCode = `PO-2025-${String(((index % 100) + 1)).padStart(
        3,
        "0"
    )}`;

    const supplier = suppliers[index % suppliers.length];
    const product = products[index % products.length];

    const month = monthLabels[Math.floor(index / 30) % monthLabels.length];
    const day = (index % 28) + 1;
    const returnDate = `${month} ${day}, 2025`;

    const qtyReturned = (index % 15) + 1;
    const baseUnitPrice = 199.99 + (index % 15) * 30;
    const refundAmount = Number((qtyReturned * baseUnitPrice).toFixed(2));

    const reason = returnReasons[index % returnReasons.length];
    const status = returnStatuses[index % returnStatuses.length];

    return {
        returnID,
        returnCode: `PR-2025-${String(returnID).padStart(3, "0")}`,
        purchaseOrderCode,
        supplier,
        returnDate,
        product,
        qtyReturned,
        refundAmount,
        reason,
        status,
    };
});

export default purchaseOrders;
