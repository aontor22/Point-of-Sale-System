import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Line,
} from "recharts";

const DATA = [
    { m: "Jan", v: 22_000 },
    { m: "Feb", v: 29_000 },
    { m: "Mar", v: 14_000 },
    { m: "Apr", v: 16_500 },
    { m: "May", v: 18_500 },
    { m: "Jun", v: 27_500 },
    { m: "Jul", v: 23_000 },
    { m: "Aug", v: 12_000 },
    { m: "Sep", v: 13_500 },
];

export default function SalesAnalyticsCard() {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-[15px] font-semibold">Sales Analytics</CardTitle>
                <Button size="sm" variant="outline" className="h-8 gap-2">
                    <Calendar className="h-4 w-4" />
                    2023
                </Button>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DATA} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                            <defs>
                                <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgb(37 99 235)" stopOpacity={0.35} />
                                    <stop offset="100%" stopColor="rgb(37 99 235)" stopOpacity={0.04} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeOpacity={0.2} />
                            <XAxis
                                dataKey="m"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12, fill: "rgb(100 116 139)" }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                width={32}
                                tick={{ fontSize: 12, fill: "rgb(100 116 139)" }}
                                tickFormatter={(n) => `${n / 1000}k`}
                                domain={[0, 60_000]}
                            />
                            <Tooltip
                                cursor={{ strokeOpacity: 0.15 }}
                                formatter={(v) => [`${Number(v).toLocaleString()}`, "Sales"]}
                                labelFormatter={(l) => `Month: ${l}`}
                            />
                            <Area
                                type="monotone"
                                dataKey="v"
                                stroke="rgb(37 99 235)"
                                strokeWidth={2}
                                fill="url(#salesFill)"
                                activeDot={{ r: 4 }}
                                connectNulls
                            />

                            <Line
                                type="monotone"
                                dataKey="v"
                                stroke="transparent"
                                dot={{
                                    r: 4,
                                    strokeWidth: 2,
                                    stroke: "rgb(37 99 235)",
                                    fill: "rgb(37 99 235)",
                                    filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.15))",
                                }}
                                activeDot={{ r: 5 }}
                                connectNulls
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
