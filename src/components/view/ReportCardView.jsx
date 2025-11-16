import StatCard from "@/components/ui/ReportCard";
import { Building2, ShieldCheck, UsersRound, DollarSign } from "lucide-react";

const statsData = [
    {
        icon: <Building2 className="h-6 w-6" />,
        iconBg: "bg-indigo-500 text-white",
        border: "border-indigo-500",
        badgeTone: "success",
        title: "Total Amount",
        value: "$40,565,000",
    },
    {
        icon: <ShieldCheck className="h-6 w-6" />,
        iconBg: "bg-yellow-500 text-white",
        border: "border-yellow-500",
        badgeTone: "success",
        title: "Total Paid",
        value: "8690",
    },
    {
        icon: <UsersRound className="h-6 w-6" />,
        iconBg: "bg-blue-500 text-white",
        border: "border-blue-500",
        badgeTone: "success",
        title: "Total Unpaid",
        value: "4558",
    },
    {
        icon: <DollarSign className="h-6 w-6" />,
        iconBg: "bg-green-500 text-white",
        border: "border-green-500",
        badgeTone: "danger",
        title: "Overdue",
        value: "865",
    },
];

export default function StatsRow() {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {statsData.map((stat, index) => (
                <StatCard
                    key={index}
                    icon={stat.icon}
                    iconBg={stat.iconBg}
                    badgeTone={stat.badgeTone}
                    border={stat.border}
                    title={stat.title}
                    value={stat.value}
                />
            ))}
        </div>
    );
}
