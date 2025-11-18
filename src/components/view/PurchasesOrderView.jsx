"use client";

import React from "react";
import PurchaseStatCard from "@/components/ui/StatusAmountCard";

export default function PurchasesReturnView() {
    return (
        <div className="space-y-6">

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <PurchaseStatCard
                    title="Total Orders"
                    amount="10"
                    subtitle="Active Purchase Orders"
                    bgClass="bg-blue-500"
                />

                <PurchaseStatCard
                    title="Draft Orders"
                    amount="2"
                    subtitle="Awaiting Submission"
                    bgClass="bg-gradient-to-r from-gray-500 to-gray-600"
                />

                <PurchaseStatCard
                    title="Pending Approval"
                    amount="2"
                    subtitle="Requires Action"
                    bgClass="bg-orange-400"
                />

                <PurchaseStatCard
                    title="Total Value"
                    amount="$522,430"
                    subtitle="3 Approved Orders"
                    bgClass="bg-gradient-to-r from-blue-500 to-blue-600"
                />
            </div>

            {/* rest of your PurchasesReturnView content below */}
        </div>
    );
}
