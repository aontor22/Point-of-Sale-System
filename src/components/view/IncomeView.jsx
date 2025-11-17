import React from "react";
import StatExpenseCard from "../ui/CardChange";
import { Wallet2, WalletCards, Clock3, FileText } from "lucide-react";

function IncomeRow() {
    return (
        <div className="flex gap-4">
            {/* 1. Total Income */}
            <StatExpenseCard
                title="Total Income"
                amount="$113,170.00"
                period="This Month"
                icon={<WalletCards className="h-6 w-6" />}
                tone="green"
            />

            {/* 2. Received Income */}
            <StatExpenseCard
                title="Received Income"
                amount="$65,170.00"
                period="8 Transactions"
                icon={<Wallet2 className="h-6 w-6" />}
                tone="emerald"
            />

            {/* 3. Pending Income */}
            <StatExpenseCard
                title="Pending Income"
                amount="$48,000.00"
                period="4 In Progress"
                icon={<Clock3 className="h-6 w-6" />}
                tone="amber"
            />

            {/* 4. Total Transactions */}
            <StatExpenseCard
                title="Total Transactions"
                amount="12"
                period="All Income Records"
                icon={<FileText className="h-6 w-6" />}
                tone="blue"
            />
        </div>
    );
}

export default IncomeRow;
