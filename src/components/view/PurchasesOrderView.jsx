"use client";

import React from "react";
import PurchaseStatCard from "@/components/ui/StatusAmountCard";

function formatCurrency(value) {
    const num = Number(value) || 0;
    return "$" + num.toLocaleString();
}

export default function PurchasesOrderView({
    totalOrders = 0,
    activeOrders = 0,
    draftOrders = 0,
    pendingApproval = 0,
    approvedOrders = 0,
    totalValue = 0,
}) {
    return (
        <div className="space-y-6">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <PurchaseStatCard
                    title="Total Orders"
                    amount={String(totalOrders)}
                    subtitle={`${activeOrders} Active Purchase Orders`}
                    bgClass="bg-blue-500"
                />

                <PurchaseStatCard
                    title="Draft Orders"
                    amount={String(draftOrders)}
                    subtitle="Awaiting Submission"
                    bgClass="bg-gradient-to-r from-gray-500 to-gray-600"
                />

                <PurchaseStatCard
                    title="Pending Approval"
                    amount={String(pendingApproval)}
                    subtitle="Requires Action"
                    bgClass="bg-orange-400"
                />

                <PurchaseStatCard
                    title="Total Value"
                    amount={formatCurrency(totalValue)}
                    subtitle={`${approvedOrders} Approved Orders`}
                    bgClass="bg-gradient-to-r from-blue-500 to-blue-600"
                />
            </div>

        </div>
    );
}
