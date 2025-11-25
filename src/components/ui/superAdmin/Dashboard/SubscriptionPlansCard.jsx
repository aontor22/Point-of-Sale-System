import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const subscriptionData = [
    { name: "Premium", value: 456, color: "#8B5CF6" },
    { name: "Business", value: 289, color: "#3B82F6" },
    { name: "Standard", value: 147, color: "#10B981" },
];

export function SubscriptionPlansCard() {
    const total = subscriptionData.reduce((sum, item) => sum + item.value, 0);

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
                    Subscription Plans
                </CardTitle>

                <CardDescription className="text-base text-slate-500 dark:text-slate-400">
                    Distribution by package
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-8 px-6 pb-6">
                <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={subscriptionData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="60%"
                                outerRadius="85%"
                                paddingAngle={3}
                            >
                                {subscriptionData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full space-y-3">
                    {subscriptionData.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between text-sm"
                        >
                            <div className="flex items-center gap-2.5">
                                <span
                                    className="h-3.5 w-3.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-base text-slate-700 dark:text-slate-200">
                                    {item.name}
                                </span>
                            </div>

                            <span className="text-base font-medium text-slate-900 dark:text-slate-50">
                                {item.value}
                            </span>
                        </div>
                    ))}

                    <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Total: {total.toLocaleString()}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
