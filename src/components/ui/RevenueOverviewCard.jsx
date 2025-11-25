import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const revenueData = [
    { month: "Jan", revenue: 32000 },
    { month: "Feb", revenue: 30000 },
    { month: "Mar", revenue: 36000 },
    { month: "Apr", revenue: 41000 },
    { month: "May", revenue: 39000 },
    { month: "Jun", revenue: 45000 },
    { month: "Jul", revenue: 48000 },
    { month: "Aug", revenue: 39000 },
    { month: "Sep", revenue: 45000 },
    { month: "Oct", revenue: 48000 },
    { month: "Nov", revenue: 45000 },
    { month: "Dec", revenue: 48000 },
];

export function RevenueOverviewCard() {
    const [range, setRange] = React.useState("7m");

    const filteredData = React.useMemo(() => {
        if (range === "7m") {
            return revenueData.slice(-7);
        }
        if (range === "12m") {
            return revenueData.slice(-12);
        }
        if (range === "year") {
            return revenueData;
        }
        return revenueData;
    }, [range]);

    return (
        <Card
            className="
        h-full rounded-2xl border p-0 shadow-md
        border-slate-100 bg-white
        dark:border-slate-700 dark:bg-slate-900/95
        dark:shadow-[0_18px_40px_rgba(0,0,0,0.6)]
      "
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pt-6 pb-4">
                <div>
                    <CardTitle className="text-lg font-normal text-slate-900 dark:text-slate-50">
                        Revenue Overview
                    </CardTitle>
                    <CardDescription className="text-base text-slate-500 dark:text-slate-400">
                        Monthly revenue and growth metrics
                    </CardDescription>
                </div>

                <Select value={range} onValueChange={setRange}>
                    <SelectTrigger className="h-11 w-44 rounded-xl border-slate-200 text-sm font-medium dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100">
                        <SelectValue placeholder="Last 7 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-900">
                        <SelectItem value="7m">Last 7 months</SelectItem>
                        <SelectItem value="12m">Last 12 months</SelectItem>
                        <SelectItem value="year">This year</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent className="px-6 pb-6">
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={filteredData}
                            margin={{ left: -20, right: 10 }}
                        >
                            <defs>
                                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.04} />
                                </linearGradient>
                            </defs>

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
                            />

                            <Tooltip
                                cursor={{ stroke: "#93C5FD", strokeWidth: 1 }}
                                contentStyle={{
                                    borderRadius: 12,
                                    borderColor: "#E5E7EB",
                                    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.12)",
                                    backgroundColor: "rgba(255,255,255,0.98)",
                                }}
                            />

                            {/* gradient area under line */}
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="none"
                                fill="url(#revenueFill)"
                            />

                            {/* main line */}
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#3B82F6"
                                strokeWidth={2.4}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
