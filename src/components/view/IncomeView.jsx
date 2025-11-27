import React from "react";
import StatExpenseCard from "../ui/CardChange";
import { Wallet2, WalletCards, Clock3, FileText } from "lucide-react";

function IncomeRow() {
    return (
        <div className="flex-1 min-w-0">
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
                <StatExpenseCard
                    title="Total Income"
                    amount="$113,170.00"
                    period="This Month"
                    icon={<WalletCards className="h-6 w-6" />}
                    tone="green"
                />

                <StatExpenseCard
                    title="Received Income"
                    amount="$65,170.00"
                    period="8 Transactions"
                    icon={<Wallet2 className="h-6 w-6" />}
                    tone="emerald"
                />

                <StatExpenseCard
                    title="Pending Income"
                    amount="$48,000.00"
                    period="4 In Progress"
                    icon={<Clock3 className="h-6 w-6" />}
                    tone="amber"
                />

                <StatExpenseCard
                    title="Total Transactions"
                    amount="12"
                    period="All Income Records"
                    icon={<FileText className="h-6 w-6" />}
                    tone="blue"
                />
            </div>
        </div>
    );
}

export default IncomeRow;
