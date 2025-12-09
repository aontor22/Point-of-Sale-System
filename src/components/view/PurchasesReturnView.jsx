"use client";

import React from "react";
import PurchaseStatCard from "@/components/ui/StatusAmountCard";

function formatCurrency(value) {
    const num = Number(value) || 0;
    return "$" + num.toLocaleString();
}

export default function PurchasesReturnView({
    totalReturns = 0,
    totalItemsReturned = 0,
    pendingReturns = 0,
    completedReturns = 0,
    totalRefund = 0,
}) {
    return (
        <div className="space-y-6">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <PurchaseStatCard
                    title="Total Returns"
                    amount={String(totalReturns)}
                    subtitle={`${totalItemsReturned} Items Returned`}
                    bgClass="bg-red-400"
                />

                <PurchaseStatCard
                    title="Pending Returns"
                    amount={String(pendingReturns)}
                    subtitle="Awaiting Approval"
                    bgClass="bg-orange-400"
                />

                <PurchaseStatCard
                    title="Completed Returns"
                    amount={String(completedReturns)}
                    subtitle="Successfully Processed"
                    bgClass="bg-gradient-to-r from-green-500 to-green-600"
                />

                <PurchaseStatCard
                    title="Total Refund"
                    amount={formatCurrency(totalRefund)}
                    subtitle="Refunded Amount"
                    bgClass="bg-teal-400"
                />
            </div>

            {/* extra content for this view can go here if needed */}
        </div>
    );
}
