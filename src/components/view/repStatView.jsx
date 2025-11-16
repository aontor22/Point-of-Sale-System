import StatCard from "@/components/ui/repStat";
import { Building2, ShieldCheck, UsersRound, DollarSign } from "lucide-react";

const statsData = [
    {
        icon: <Building2 className="h-4 w-4" />,
        iconBg: "bg-indigo-500 text-white",
        badgeText: "+19.03%",
        badgeTone: "success",
        title: "New Sales",
        value: "$40,565,000",
        subtitle: "From Last Month",
    },
    {
        icon: <ShieldCheck className="h-4 w-4" />,
        iconBg: "bg-yellow-500 text-white",
        badgeText: "+12%",
        badgeTone: "success",
        title: "Total Orders",
        value: "8690",
        subtitle: "From Last Month",
    },
    {
        icon: <UsersRound className="h-4 w-4" />,
        iconBg: "bg-blue-500 text-white",
        badgeText: "+6%",
        badgeTone: "success",
        title: "Total Customers",
        value: "4558",
        subtitle: "From Last Month",
    },
    {
        icon: <DollarSign className="h-4 w-4" />,
        iconBg: "bg-green-500 text-white",
        badgeText: "-16%",
        badgeTone: "danger",
        title: "Units Sold",
        value: "865",
        subtitle: "From Last Month",
    },
];

export default function StatsRow() {
    return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {statsData.map((stat, index) => (
                <StatCard
                    key={index}
                    icon={stat.icon}
                    iconBg={stat.iconBg}
                    badgeText={stat.badgeText}
                    badgeTone={stat.badgeTone}
                    title={stat.title}
                    value={stat.value}
                    subtitle={stat.subtitle}
                />
            ))}
        </div>
    );
}
