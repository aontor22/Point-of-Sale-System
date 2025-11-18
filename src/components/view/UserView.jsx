import React from "react";
import StatExpenseCard from "../ui/CardChange";
import { FileText, Users, Calendar, UserCheck, Shield, UserX } from "lucide-react";

function IncomeRow() {
    return (
        <div className="flex-1 min-w-0">
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
                <StatExpenseCard
                    title="Total Users"
                    amount="10"
                    period="All Staff Members"
                    icon={<Users className="h-6 w-6" />}
                    tone="blue"
                />

                <StatExpenseCard
                    title="Active Users"
                    amount="8"
                    period="Currently Working"
                    icon={<UserCheck className="h-6 w-6" />}
                    tone="green"
                />

                <StatExpenseCard
                    title="Inactive Users"
                    amount="1"
                    period="Not Checked In"
                    icon={<UserX className="h-6 w-6" />}
                    tone="amber"
                />

                <StatExpenseCard
                    title="Suspended"
                    amount="1"
                    period="Approved Leave"
                    icon={<Shield className="h-6 w-6" />}
                    tone="red"
                />
            </div>
        </div>
    );
}

export default IncomeRow;
