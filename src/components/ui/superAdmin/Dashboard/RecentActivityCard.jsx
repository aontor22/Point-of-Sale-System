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
        <Card
            className="
        h-full rounded-2xl border p-0 shadow-md
        border-slate-100 bg-white
        dark:border-slate-700 dark:bg-slate-900/95
        dark:shadow-[0_18px_40px_rgba(0,0,0,0.6)]
      "
        >
            <CardHeader className="flex flex-row items-center justify-between px-7 pt-7 pb-4">
                <div>
                    <CardTitle className="text-lg font-normal text-slate-900 dark:text-slate-50">
                        Recent Activity
                    </CardTitle>
                    <CardDescription className="text-base text-slate-500 dark:text-slate-400">
                        Latest system activities
                    </CardDescription>
                </div>

                <Button
                    variant="outline"
                    className="
                        h-9 rounded-lg px-3.5 text-sm font-medium
                        border-black/10 text-slate-700
                        hover:bg-slate-100
                        dark:border-slate-600 dark:text-slate-100
                        dark:hover:bg-slate-800
          "
                >
                    View All
                </Button>
            </CardHeader>

            <CardContent className="space-y-4 px-7 pb-7">
                {activities.map((item) => {
                    const [bgClass, textClass] = item.badgeClass.split(" ");

                    return (
                        <div
                            key={item.id}
                            className="
                                flex items-center justify-between rounded-2xl px-5 py-4
                                bg-slate-50
                                dark:bg-slate-800/30 dark:border dark:border-slate-800
                            "
                        >
                            <div className="flex items-center gap-5">
                                {/* colored icon square */}
                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgClass} dark:bg-slate-700`}
                                >
                                    <span className={`text-base font-semibold ${textClass}`}>
                                        {item.company.charAt(0)}
                                    </span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-base text-slate-900 dark:text-slate-50">
                                        {item.company}
                                    </span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {item.action}
                                    </span>
                                </div>
                            </div>

                            <span className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                {item.time}
                            </span>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
