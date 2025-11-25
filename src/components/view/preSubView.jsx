// SubscriptionTiersRow.jsx
import SubscriptionTierCard from "@/components/ui/superAdmin/Subscription/PremiumSubscriptionCard";
import { Zap, Medal, Package } from "lucide-react";

const subscriptionTiers = [
    {
        icon: <Zap className="h-6 w-6" />,
        iconBg: "bg-[#9654FF] text-white",
        name: "Premium",
        subscriptions: "456",
        price: "$45,600",
        period: "/month",
        share: 51.1,
        barColor: "bg-[#9654FF]",
    },
    {
        icon: <Medal className="h-6 w-6" />,
        iconBg: "bg-[#2F7BFF] text-white",
        name: "Business",
        subscriptions: "289",
        price: "$28,900",
        period: "/month",
        share: 32.4,
        barColor: "bg-[#2F7BFF]",
    },
    {
        icon: <Package className="h-6 w-6" />,
        iconBg: "bg-[#5F6472] text-white",
        name: "Standard",
        subscriptions: "147",
        price: "$14,700",
        period: "/month",
        share: 16.5,
        barColor: "bg-[#5F6472]",
    },
];

export default function SubscriptionTiersRow() {
    return (
        <div className="mt-6 w-full grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {subscriptionTiers.map((tier, index) => (
                <SubscriptionTierCard key={index} {...tier} />
            ))}
        </div>
    );
}
