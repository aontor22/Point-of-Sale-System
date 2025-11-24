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
    { month: "Jan", companies: 220, subscriptions: 720 },
    { month: "Feb", companies: 230, subscriptions: 740 },
    { month: "Mar", companies: 240, subscriptions: 760 },
    { month: "Apr", companies: 250, subscriptions: 780 },
    { month: "May", companies: 260, subscriptions: 800 },
    { month: "Jun", companies: 270, subscriptions: 830 },
    { month: "Jul", companies: 280, subscriptions: 860 },
];

export function GrowthMetricsCard() {
    return (
        <Card className="h-full p-0 rounded-2xl shadow-md border border-slate-100">
            <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-lg font-normal text-slate-900">
                    Growth Metrics
                </CardTitle>
                <CardDescription className="text-base text-slate-500">
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
                        <span className="flex gap-1 text-emerald-600"><GitCommitHorizontal /> companies</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="flex gap-1 text-amber-500"><GitCommitHorizontal /> subscriptions</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
