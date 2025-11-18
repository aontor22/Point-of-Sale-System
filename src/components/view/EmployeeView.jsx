import React from "react";
import StatExpenseCard from "../ui/CardChange";
import { FileText, Users, Calendar, UserCheck } from "lucide-react";

function IncomeRow() {
    return (
        <div className="flex-1 min-w-0">
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
                <StatExpenseCard
                    title="Total Employees"
                    amount="10"
                    period="All Staff Members"
                    icon={<Users className="h-6 w-6" />}
                    tone="blue"
                />

                <StatExpenseCard
                    title="Present"
                    amount="6"
                    period="Currently Working"
                    icon={<UserCheck className="h-6 w-6" />}
                    tone="green"
                />

                <StatExpenseCard
                    title="Absent"
                    amount="1"
                    period="Not Checked In"
                    icon={<FileText className="h-6 w-6" />}
                    tone="red"
                />

                <StatExpenseCard
                    title="On Leave"
                    amount="1"
                    period="Approved Leave"
                    icon={<Calendar className="h-6 w-6" />}
                    tone="violet"
                />
            </div>
        </div>
    );
}

export default IncomeRow;
