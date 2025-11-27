const suppliers = [
    "Tech Supplies Co.",
    "Apple Distributors Inc.",
    "Audio Excellence Ltd.",
    "Dell Technologies",
    "Logitech International",
    "LG Electronics",
    "Canon Inc.",
];

const creators = ["John Smith", "Sarah Johnson", "Mike Davis", "Emily Brown"];

const priorities = ["High", "Medium", "Low"];

const requestStatuses = [
    "Pending Approval",
    "Approved",
    "Draft",
    "Completed",
    "Cancelled",
];

const monthLabels = ["Oct", "Nov", "Dec"];

const purchaseReturns = Array.from({ length: 100 }, (_, index) => {
    const prID = index + 1;

    const prCode = `PO-2025-${String(100 + prID).padStart(3, "0")}`;

    const prSupplier = suppliers[index % suppliers.length];
    const prCreatedBy = creators[index % creators.length];

    const orderMonth = monthLabels[Math.floor(index / 30) % monthLabels.length];
    const deliveryMonth =
        monthLabels[(Math.floor(index / 30) + 1) % monthLabels.length];

    const orderDay = (index % 25) + 1;
    const deliveryDay = ((index + 7) % 25) + 1;

    const prOrderDate = `${orderMonth} ${orderDay}, 2025`;
    const prExpectedDelivery = `${deliveryMonth} ${deliveryDay}, 2025`;

    const prTotalItems = (index % 12) + 1;
    const baseValue = 1500 + (index % 20) * 750;
    const prTotalAmount = Number((prTotalItems * baseValue).toFixed(2));

    const prPriority = priorities[index % priorities.length];
    const prStatus = requestStatuses[index % requestStatuses.length];

    return {
        prID,
        prCode,
        prSupplier,
        prOrderDate,
        prExpectedDelivery,
        prTotalItems,
        prTotalAmount,
        prPriority,
        prStatus,
        prCreatedBy,
    };
});

export default purchaseReturns;
