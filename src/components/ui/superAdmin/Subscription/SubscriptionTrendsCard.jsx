import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { GitCommitHorizontal } from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const trendsData = [
    { month: "Jan", business: 660, premium: 400, standard: 800 },
    { month: "Feb", business: 700, premium: 430, standard: 835 },
    { month: "Mar", business: 725, premium: 445, standard: 855 },
    { month: "Apr", business: 735, premium: 455, standard: 875 },
    { month: "May", business: 745, premium: 460, standard: 880 },
    { month: "Jun", business: 770, premium: 470, standard: 900 },
];

export function SubscriptionTrendsCard() {
    return (
        <Card
            className="
        h-auto w-full p-0 rounded-2xl border
        bg-white shadow-[0_4px_6px_rgba(0,0,0,0.08),0_10px_18px_rgba(0,0,0,0.10)]
        overflow-hidden
        dark:bg-slate-900/95 dark:border-slate-700
        dark:shadow-[0_18px_40px_rgba(0,0,0,0.6)]
      "
        >
            <CardHeader className="px-7 pt-7 pb-3">
                <CardTitle className="text-lg text-slate-900 dark:text-slate-50">
                    Subscription Trends
                </CardTitle>
                <CardDescription className="text-base text-slate-500 dark:text-slate-400">
                    Growth by plan type
                </CardDescription>
            </CardHeader>

            <CardContent className="px-7 pb-6">
                <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={trendsData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                        >
                            <CartesianGrid
                                stroke="#E5E7EB"
                                strokeDasharray="3 3"
                                className="dark:stroke-slate-700"
                            />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={{ stroke: "#D1D5DB" }}
                                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={{ stroke: "#D1D5DB" }}
                                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            />

                            {/* standard */}
                            <Area
                                type="monotone"
                                dataKey="standard"
                                stroke="#9CA3AF"
                                fill="#9CA3AF"
                                fillOpacity={0.15}
                                strokeWidth={2}
                            />

                            {/* business */}
                            <Area
                                type="monotone"
                                dataKey="business"
                                stroke="#3B82F6"
                                fill="#3B82F6"
                                fillOpacity={0.15}
                                strokeWidth={2}
                            />

                            {/* premium */}
                            <Area
                                type="monotone"
                                dataKey="premium"
                                stroke="#8B5CF6"
                                fill="#8B5CF6"
                                fillOpacity={0.15}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom Legend */}
                <div className="mt-4 flex justify-center gap-4 text-sm">
                    <LegendItem colorClass="text-blue-500" label="Business" />
                    <LegendItem colorClass="text-violet-500" label="Premium" />
                    <LegendItem
                        colorClass="text-slate-400 dark:text-slate-300"
                        label="Standard"
                    />
                </div>
            </CardContent>
        </Card>
    );
}

function LegendItem({ colorClass, label }) {
    return (
        <span className="flex items-center gap-1">
            <GitCommitHorizontal className={`h-4 w-4 ${colorClass}`} />
            <span className="capitalize text-slate-600 dark:text-slate-200">
                {label}
            </span>
        </span>
    );
}
