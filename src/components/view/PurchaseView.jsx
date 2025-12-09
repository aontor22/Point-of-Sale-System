import React from "react";
import PurchaseStatCard from "@/components/ui/StatusAmountCard";

function formatCurrency(value) {
    const num = Number(value) || 0;
    return "$" + num.toLocaleString();
}

export default function PurchasesOverview({
    totalPurchasesAmount = 0,
    paidAmount = 0,
    pendingPaymentAmount = 0,
    paidOrders = 0,
    pendingOrders = 0,
}) {
    return (
        <div className="grid gap-3 md:grid-cols-3">
            <PurchaseStatCard
                title="Total Purchases"
                amount={formatCurrency(totalPurchasesAmount)}
                subtitle="This Month"
                bgClass="bg-sky-600"
            />

            <PurchaseStatCard
                title="Paid Amount"
                amount={formatCurrency(paidAmount)}
                subtitle={`${paidOrders} Orders`}
                bgClass="bg-green-700"
            />

            <PurchaseStatCard
                title="Pending Payment"
                amount={formatCurrency(pendingPaymentAmount)}
                subtitle={`${pendingOrders} Orders`}
                bgClass="bg-cyan-800"
            />
        </div>
    );
}
