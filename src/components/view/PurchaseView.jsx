import React from "react";
import PurchaseStatCard from "@/components/ui/StatusAmountCard";

export default function PurchasesOverview() {
    return (
        <div className="grid gap-3 md:grid-cols-3">
            <PurchaseStatCard
                title="Total Purchases"
                amount="$333,840.95"
                subtitle="This Month"
                bgClass="bg-sky-600"
            />

            <PurchaseStatCard
                title="Paid Amount"
                amount="$262,958.00"
                subtitle="5 Orders"
                bgClass="bg-green-700"
            />

            <PurchaseStatCard
                title="Pending Payment"
                amount="$42,513.75"
                subtitle="3 Orders"
                bgClass="bg-cyan-800"
            />
        </div>
    );
}
