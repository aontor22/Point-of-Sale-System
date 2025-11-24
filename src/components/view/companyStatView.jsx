import StatCard from "@/components/ui/superStat";
import {
    Building2,
    Ban,
    Clock4,
    CircleCheckBig,
} from "lucide-react";

const statsData = [
    {
        icon: <Building2 className="h-6 w-6" />,
        iconBg: "bg-blue-500 text-white",
        badgeText: "+45",
        badgeTone: "",
        title: "Total Companies",
        value: "1,247",
        subtitle: "this month",
    },
    {
        icon: <CircleCheckBig className="h-6 w-6" />,
        iconBg: "bg-green-500 text-white",
        badgeText: "71.5%%",
        badgeTone: "",
        title: "Active Companies",
        value: "892",
        subtitle: "of total",
    },
    {
        icon: <Clock4 className="h-6 w-6" />,
        iconBg: "bg-orange-500 text-white",
        badgeText: "",
        badgeTone: "",
        title: "Pending Approval",
        value: "23",
        subtitle: "needs review",
    },
    {
        icon: <Ban className="h-6 w-6" />,
        iconBg: "bg-red-500 text-white",
        badgeText: "",
        badgeTone: "",
        title: "Suspended",
        value: "18",
        subtitle: "Payment issues",
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
                    showTrendIcon={false}
                />
            ))}
        </div>
    );
}
