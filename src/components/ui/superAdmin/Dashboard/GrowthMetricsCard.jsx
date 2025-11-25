import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import { GitCommitHorizontal } from "lucide-react";

const growthData = [
    { month: "Jan", companies: 200, subscriptions: 710 },
    { month: "Feb", companies: 215, subscriptions: 755 },
    { month: "Mar", companies: 220, subscriptions: 745 },
    { month: "Apr", companies: 230, subscriptions: 790 },
    { month: "May", companies: 225, subscriptions: 770 },
    { month: "Jun", companies: 235, subscriptions: 830 },
    { month: "Jul", companies: 240, subscriptions: 880 },
];

export function GrowthMetricsCard() {
    return (
        <Card
            className="
        h-full rounded-2xl border p-0 shadow-md
        border-slate-100 bg-white
        dark:border-slate-700 dark:bg-slate-900/95
        dark:shadow-[0_18px_40px_rgba(0,0,0,0.6)]
      "
        >
            <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-lg font-normal text-slate-900 dark:text-slate-50">
                    Growth Metrics
                </CardTitle>
                <CardDescription className="text-base text-slate-500 dark:text-slate-400">
                    Companies and subscriptions growth
                </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-6">
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthData} margin={{ left: -20, right: 10 }}>
                            <CartesianGrid
                                stroke="#E5E7EB"
                                strokeDasharray="0"
                                vertical={true}
                                horizontal={true}
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
                                domain={[0, 1000]}
                            />
                            <Tooltip
                                cursor={{ stroke: "#E5E7EB", strokeWidth: 1 }}
                                contentStyle={{
                                    borderRadius: 12,
                                    borderColor: "#E5E7EB",
                                    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.12)",
                                    backgroundColor: "rgba(255,255,255,0.98)",
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="companies"
                                name="Companies"
                                stroke="#10B981"
                                strokeWidth={2.2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />

                            <Line
                                type="monotone"
                                dataKey="subscriptions"
                                name="Subscriptions"
                                stroke="#F59E0B"
                                strokeWidth={2.2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                            <GitCommitHorizontal className="h-4 w-4" /> companies
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                            <GitCommitHorizontal className="h-4 w-4" /> subscriptions
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
