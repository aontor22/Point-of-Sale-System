import StatCard from "./StatCard";
import { Building2, ShieldCheck, UsersRound, DollarSign } from "lucide-react";

export default function StatsRow() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        icon={<Building2 className="h-4 w-4" />}
        iconBg="bg-slate-900 text-white"
        badgeText="+19.03%"
        badgeTone="success"
        title="Total Companies"
        value="5468"
        spark={{ values: [3,7,5,6,7,6,8], color: "rgb(59 130 246)" }}
      />

      <StatCard
        icon={<ShieldCheck className="h-4 w-4" />}
        iconBg="bg-slate-900 text-white"
        badgeText="-12%"
        badgeTone="danger"
        title="Active Companies"
        value="4598"
        spark={{ values: [2,4,6,5,7,8,7], color: "rgb(234 179 8)" }}
      />

      <StatCard
        icon={<UsersRound className="h-4 w-4" />}
        iconBg="bg-slate-900 text-white"
        badgeText="+6%"
        badgeTone="success"
        title="Total Subscribers"
        value="3698"
        spark={{ values: [3,3,4,6,6,7,6], color: "rgb(37 99 235)" }}
      />

      <StatCard
        icon={<DollarSign className="h-4 w-4" />}
        iconBg="bg-slate-900 text-white"
        badgeText="-16%"
        badgeTone="danger"
        title="Total Earnings"
        value="89,878,58"
        spark={{ values: [4,6,7,8,7,9,10], color: "rgb(16 185 129)" }}
      />
    </div>
  );
}
