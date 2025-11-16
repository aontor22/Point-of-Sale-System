import React from "react";

export default function InventoryCard({ inventoryValue, date }) {
    return (
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex-1 justify-between items-center">
            <div>
                <h2 className="text-sm font-light">Total Inventory Value</h2>
                <p className="text-3xl font-bold">{`$${inventoryValue}`}</p>
            </div>
            <div>
                <p className="text-xs">{date}</p>
            </div>
        </div>
    );
};

