import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const weeklyTransactions = [
    { day: "Mon", value: 140 },
    { day: "Tue", value: 180 },
    { day: "Wed", value: 130 },
    { day: "Thu", value: 190 },
    { day: "Fri", value: 230 },
    { day: "Sat", value: 175 },
    { day: "Sun", value: 120 },
];

export function TransactionTrendsCard() {
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
                    Transaction Trends
                </CardTitle>
                <CardDescription className="text-base text-slate-500 dark:text-slate-400">
                    Weekly transaction volume
                </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-6">
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyTransactions} margin={{ left: -20, right: 10 }}>
                            <CartesianGrid
                                stroke="#E5E7EB"
                                strokeDasharray="0"
                                vertical={true}
                                horizontal={true}
                                className="dark:stroke-slate-700"
                            />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={{ stroke: "#D1D5DB" }}
                                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={{ stroke: "#D1D5DB" }}
                                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                                domain={[0, 240]}
                            />
                            <Tooltip
                                cursor={{ fill: "rgba(139,92,246,0.08)" }}
                                contentStyle={{
                                    borderRadius: 12,
                                    borderColor: "#E5E7EB",
                                    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.12)",
                                    backgroundColor: "rgba(255,255,255,0.98)",
                                }}
                            />
                            <Bar
                                dataKey="value"
                                radius={[8, 8, 0, 0]}
                                barSize={32}
                                fill="#8B5CF6"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
