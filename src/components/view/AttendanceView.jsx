import React from "react";
import StatExpenseCard from "../ui/CardChange";
import { FileText, Users, Calendar, UserCheck, Clock } from "lucide-react";

function IncomeRow() {
    const stats = [
        {
            title: "Total Employees",
            amount: "10",
            period: "All Staff Members",
            icon: <Users className="h-6 w-6" />,
            tone: "blue",
        },
        {
            title: "Present",
            amount: "6",
            period: "Currently Working",
            icon: <UserCheck className="h-6 w-6" />,
            tone: "green",
        },
        {
            title: "Absent",
            amount: "1",
            period: "Not Checked In",
            icon: <FileText className="h-6 w-6" />,
            tone: "red",
        },
        {
            title: "Late",
            amount: "1",
            period: "Late Arrival",
            icon: <Clock className="h-6 w-6" />,
            tone: "amber",
        },
        {
            title: "On Leave",
            amount: "1",
            period: "Approved Leave",
            icon: <Calendar className="h-6 w-6" />,
            tone: "violet",
        },
    ];

    return (
        <div className="flex-1 min-w-0 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((s) => (
                    <StatExpenseCard
                        key={s.title}
                        title={s.title}
                        amount={s.amount}
                        period={s.period}
                        icon={s.icon}
                        tone={s.tone}
                    />
                ))}
            </div>
        </div>
    );
}

export default IncomeRow;
