import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const revenueData = [
    { month: "Jan", value: 76000 },
    { month: "Feb", value: 79000 },
    { month: "Mar", value: 82000 },
    { month: "Apr", value: 84000 },
    { month: "May", value: 88000 },
    { month: "Jun", value: 91000 },
];

export function RevenueGrowthCard() {
    return (
        <Card
            className="
        h-auto w-full p-0 rounded-2xl border
        bg-white shadow-[0_4px_6px_rgba(0,0,0,0.08),0_10px_18px_rgba(0,0,0,0.10)]
        dark:bg-slate-900/95 dark:border-slate-700
        dark:shadow-[0_18px_40px_rgba(0,0,0,0.6)]
      "
        >
            <CardHeader className="px-7 pt-7 pb-3">
                <CardTitle className="text-lg text-slate-900 dark:text-slate-50">
                    Revenue Growth
                </CardTitle>
                <CardDescription className="text-base text-slate-500 dark:text-slate-400">
                    Monthly recurring revenue
                </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-6">
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={revenueData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid
                                stroke="#E5E7EB"
                                vertical={false}
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
                                tickFormatter={(v) => v.toLocaleString()}
                            />
                            <Bar
                                dataKey="value"
                                radius={[8, 8, 0, 0]}
                                fill="#10B981"
                                barSize={46}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
