import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const activities = [
    {
        id: 1,
        company: "TechCorp Inc.",
        action: "Upgraded to Premium",
        time: "2 mins ago",
        badgeClass: "bg-purple-100 text-purple-600",
    },
    {
        id: 2,
        company: "Retail Solutions",
        action: "New Registration",
        time: "15 mins ago",
        badgeClass: "bg-emerald-100 text-emerald-600",
    },
    {
        id: 3,
        company: "Global Traders",
        action: "Domain Registered",
        time: "32 mins ago",
        badgeClass: "bg-blue-100 text-blue-600",
    },
    {
        id: 4,
        company: "Food Mart Ltd",
        action: "Payment Received",
        time: "1 hour ago",
        badgeClass: "bg-orange-100 text-orange-600",
    },
    {
        id: 5,
        company: "Fashion Hub",
        action: "Subscription Renewed",
        time: "2 hours ago",
        badgeClass: "bg-teal-100 text-teal-600",
    },
];

export function RecentActivityCard() {
    return (
        <Card className="h-full p-0 rounded-2xl shadow-md border border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between px-7 pt-7 pb-4">
                <div>
                    <CardTitle className="text-lg font-normal text-slate-900">
                        Recent Activity
                    </CardTitle>
                    <CardDescription className="text-base text-slate-500">
                        Latest system activities
                    </CardDescription>
                </div>

                <Button
                    variant="outline"
                    className="h-9 px-3.5 rounded-lg border-black/10 text-sm font-medium"
                >
                    View All
                </Button>
            </CardHeader>

            <CardContent className="px-7 pb-7 space-y-4">
                {activities.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4"
                    >
                        <div className="flex items-center gap-5">
                            {/* colored icon square */}
                            <div
                                className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.badgeClass.replace(
                                    "text-",
                                    ""
                                )}`}
                            >
                                <span className={`text-base font-semibold ${item.badgeClass.split(" ")[1]}`}>
                                    {item.company.charAt(0)}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-base text-slate-900">{item.company}</span>
                                <span className="text-sm text-slate-500">{item.action}</span>
                            </div>
                        </div>

                        <span className="text-sm text-slate-500 whitespace-nowrap">
                            {item.time}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
