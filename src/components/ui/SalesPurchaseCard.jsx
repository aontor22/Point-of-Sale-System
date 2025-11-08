import * as React from "react";
import {
    Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    BarChart as ReBarChart, Bar, CartesianGrid, XAxis, YAxis,
    Tooltip, ResponsiveContainer,
} from "recharts";
import { ShoppingCart, ChevronDown } from "lucide-react";

const DATA = [
    { name: "Jan", purchase: 8, sales: 28 },
    { name: "Feb", purchase: 12, sales: 18 },
    { name: "Mar", purchase: 10, sales: 12 },
    { name: "Apr", purchase: 14, sales: 30 },
    { name: "May", purchase: 9, sales: 20 },
    { name: "Jun", purchase: 16, sales: 31 },
    { name: "Jul", purchase: 6, sales: 11 },
    { name: "Aug", purchase: 5, sales: 26 },
    { name: "Sep", purchase: 18, sales: 34 },
    { name: "Oct", purchase: 7, sales: 24 },
    { name: "Nov", purchase: 9, sales: 19 },
    { name: "Dec", purchase: 6, sales: 16 },
];

export default function SalesPurchaseCard() {
    const [range, setRange] = React.useState("1Y");

    const totalPurchase = DATA.reduce((a, b) => a + b.purchase, 0); // -> 120K
    const totalSales = DATA.reduce((a, b) => a + b.sales, 0);    // -> 269K

    return (
        <Card className="rounded-2xl border-slate-200 shadow-sm">
            <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-amber-100">
                            <ShoppingCart size={14} className="text-amber-600" />
                        </span>
                        <CardTitle className="text-slate-800">Sales &amp; Purchase</CardTitle>
                    </div>

                    <Tabs value={range} onValueChange={setRange} className="hidden md:block">
                        <TabsList className="h-8">
                            {["1D", "1W", "1M", "3M", "6M", "1Y"].map(v => (
                                <TabsTrigger
                                    key={v}
                                    value={v}
                                    className="px-2.5 text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-white"
                                >
                                    {v}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="md:hidden">
                                {range} <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-28">
                            <DropdownMenuLabel>Range</DropdownMenuLabel>
                            {["1D", "1W", "1M", "3M", "6M", "1Y"].map(v => (
                                <DropdownMenuItem key={v} onClick={() => setRange(v)}>
                                    {v}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="relative">
                    {/* mini summary boxes inside chart (top-left) */}
                    <div className="absolute z-10 top-2 left-2 flex gap-2">
                        <div className="rounded-md border border-slate-200 bg-white/95 px-2.5 py-1 shadow-sm">
                            <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                                Total Purchase
                            </div>
                            <div className="text-slate-800 font-semibold text-sm">
                                {totalPurchase}K
                            </div>
                        </div>
                        <div className="rounded-md border border-slate-200 bg-white/95 px-2.5 py-1 shadow-sm">
                            <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                                Total Sales
                            </div>
                            <div className="text-slate-800 font-semibold text-sm">
                                {totalSales}K
                            </div>
                        </div>
                    </div>

                    {/* chart */}
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart data={DATA} barCategoryGap={18}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#64748B", fontSize: 12 }}
                                />
                                <YAxis
                                    domain={[0, 60]} // 0..60K like the screenshot
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#64748B", fontSize: 12 }}
                                    tickFormatter={(v) => `${v}K`}
                                />
                                <Tooltip
                                    cursor={{ fill: "rgba(2, 6, 23, 0.03)" }}
                                    contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }}
                                    formatter={(val, name) => [`${val}K`, name === "purchase" ? "Purchase" : "Sales"]}
                                />
                                {/* stacked: green bottom, blue top */}
                                <Bar dataKey="purchase" stackId="a" name="purchase" fill="#22C55E" radius={[0, 0, 0, 0]} barSize={35} />
                                <Bar dataKey="sales" stackId="a" name="sales" fill="#93C5FD" radius={[0, 0, 0, 0]} barSize={35}/>
                            </ReBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
