import StatCard from "@/components/ui/superStat";
import {
    CreditCard,
    DollarSign,
    TriangleAlert,
    CircleCheckBig,
} from "lucide-react";

const statsData = [
    {
        icon: <CreditCard className="h-6 w-6" />,
        iconBg: "bg-blue-500 text-white",
        badgeText: "+34",
        badgeTone: "",
        title: "Total Subscriptions",
        value: "892",
        subtitle: "this month",
    },
    {
        icon: <CircleCheckBig className="h-6 w-6" />,
        iconBg: "bg-green-500 text-white",
        badgeText: "84.7%",
        badgeTone: "",
        title: "Active Subscriptions",
        value: "756",
        subtitle: "of total",
    },
    {
        icon: <TriangleAlert className="h-6 w-6" />,
        iconBg: "bg-orange-500 text-white",
        badgeText: "",
        badgeTone: "",
        title: "Expiring Soon",
        value: "67",
        subtitle: "Within 30 days",
    },
    {
        icon: <DollarSign className="h-6 w-6" />,
        iconBg: "bg-teal-500 text-white",
        badgeText: "+23.5%",
        badgeTone: "",
        title: "Monthly Revenue",
        value: "1,089",
        subtitle: "growth",
    }
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
                    showTrendIcon={false}
                />
            ))}
        </div>
    );
}
