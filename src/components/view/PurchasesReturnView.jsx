"use client";

import React from "react";
import PurchaseStatCard from "@/components/ui/StatusAmountCard";

export default function PurchasesOrderView() {
    return (
        <div className="space-y-6">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <PurchaseStatCard
                    title="Total Returns"
                    amount="10"
                    subtitle="52 Items Returned"
                    bgClass="bg-red-400"
                />

                <PurchaseStatCard
                    title="Pending Returns"
                    amount="2"
                    subtitle="Awaiting Approval"
                    bgClass="bg-orange-400"
                />

                <PurchaseStatCard
                    title="Completed Returns"
                    amount="3"
                    subtitle="Successfully Processed"
                    bgClass="bg-gradient-to-r from-green-500 to-green-600"
                />

                <PurchaseStatCard
                    title="Total Refund"
                    amount="$14,173"
                    subtitle="Refunded Amount"
                    bgClass="bg-teal-400"
                />
            </div>

            {/* rest of PurchasesOrderView content here */}
        </div>
    );
}
