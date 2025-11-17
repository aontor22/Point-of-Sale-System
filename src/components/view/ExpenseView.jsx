import React from "react";
import StatExpenseCard from "../ui/CardChange";
import { DollarSign, Wallet2, Clock3, FileText } from "lucide-react";

function ExpensesRow() {
    return (
        <div className="flex gap-4">
            <StatExpenseCard
                title="Total Expenses"
                amount="$21,424.50"
                period="This Month"
                icon={<DollarSign className="h-6 w-6" />}
                tone="red"
            />

            <StatExpenseCard
                title="Paid Expenses"
                amount="$9,974.50"
                period="6 Transactions"
                icon={<Wallet2 className="h-6 w-6" />}
                tone="green"
            />

            <StatExpenseCard
                title="Pending Expenses"
                amount="$3,750.00"
                period="2 Awaiting Payment"
                icon={<Clock3 className="h-6 w-6" />}
                tone="amber"
            />

            <StatExpenseCard
                title="Total Transactions"
                amount="10"
                period="All Expense Records"
                icon={<FileText className="h-6 w-6" />}
                tone="violet"
            />
        </div>
    );
}

export default ExpensesRow;
