import React from "react";
import LowStockProducts from "../ui/LowStockProducts";
import RecentSales from "../ui/RecentSales";
import TopSellingProducts from "../ui/TopSellingProducts";

export default function ProductsView({
    lowStock = [],
    recentSales = [],
    topSelling = [],
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <LowStockProducts items={lowStock} />
            <RecentSales items={recentSales} />
            <TopSellingProducts items={topSelling} />
        </div>
    );
}
