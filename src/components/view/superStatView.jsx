import StatCard from "@/components/ui/superStat";
import {
    Building2,
    CreditCard,
    Globe,
    DollarSign,
    Server,
    AlertCircle,
    UserCheck,
    Package,
} from "lucide-react";

const statsData = [
    {
        icon: <Building2 className="h-6 w-6" />,
        iconBg: "bg-blue-500 text-white",
        badgeText: "+12.5%",
        badgeTone: "success",
        title: "Total Companies",
        value: "1,247",
        subtitle: "vs last month",
    },
    {
        icon: <CreditCard className="h-6 w-6" />,
        iconBg: "bg-green-500 text-white",
        badgeText: "+8.2%",
        badgeTone: "success",
        title: "Active Subscriptions",
        value: "892",
        subtitle: "vs last month",
    },
    {
        icon: <Package className="h-6 w-6" />,
        iconBg: "bg-purple-500 text-white",
        badgeText: "+2",
        badgeTone: "success",
        title: "Total Packages",
        value: "24",
        subtitle: "vs last month",
    },
    {
        icon: <Globe className="h-6 w-6" />,
        iconBg: "bg-orange-500 text-white",
        badgeText: "+15.3%",
        badgeTone: "success",
        title: "Registered Domains",
        value: "1,089",
        subtitle: "vs last month",
    },
    {
        icon: <DollarSign className="h-6 w-6" />,
        iconBg: "bg-teal-500 text-white",
        badgeText: "+18.7%",
        badgeTone: "success",
        title: "Total Revenue",
        value: "$284,590",
        subtitle: "vs last month",
    },
    {
        icon: <UserCheck className="h-6 w-6" />,
        iconBg: "bg-pink-500 text-white",
        badgeText: "+5.4%",
        badgeTone: "success",
        title: "Active Users",
        value: "3,456",
        subtitle: "vs last month",
    },
    {
        icon: <Server className="h-6 w-6" />,
        iconBg: "bg-indigo-500 text-white",
        badgeText: "Excellent",
        badgeTone: "success",
        title: "System Uptime",
        value: "99.9%",
        subtitle: "vs last month",
    },
    {
        icon: <AlertCircle className="h-6 w-6" />,
        iconBg: "bg-red-500 text-white",
        badgeText: "-12.3%",
        badgeTone: "danger",
        title: "Support Tickets",
        value: "127",
        subtitle: "vs last month",
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
