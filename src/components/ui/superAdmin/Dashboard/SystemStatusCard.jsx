import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const services = [
    {
        name: "API Server",
        status: "Operational",
        uptime: "99.98%",
        tone: "ok",
    },
    {
        name: "Database",
        status: "Operational",
        uptime: "99.99%",
        tone: "ok",
    },
    {
        name: "Payment Gateway",
        status: "Operational",
        uptime: "99.95%",
        tone: "ok",
    },
    {
        name: "Email Service",
        status: "Degraded",
        uptime: "98.50%",
        tone: "warn",
    },
];

function statusClasses(tone) {
    if (tone === "warn") {
        return {
            pill: "bg-amber-100 text-amber-700",
        };
    }
    return {
        pill: "bg-emerald-100 text-emerald-700",
    };
}

export function SystemStatusCard({ onViewReport }) {
    const navigate = useNavigate();

    const handleViewReport = () => {
        if (typeof onViewReport === "function") {
            onViewReport();
        } else {
            navigate("/admin/reports/system-status");
        }
    };

    return (
        <Card className="h-full p-0 rounded-2xl shadow-md border border-slate-100">
            <CardHeader className="px-7 pt-7 pb-4">
                <CardTitle className="text-lg font-normal text-slate-900">
                    System Status
                </CardTitle>
                <CardDescription className="text-base text-slate-500">
                    Service health monitoring
                </CardDescription>
            </CardHeader>

            <CardContent className="px-7 pb-7 flex flex-col gap-5">
                {/* status list */}
                <div className="flex flex-col gap-4">
                    {services.map((svc) => {
                        const { pill } = statusClasses(svc.tone);
                        return (
                            <div
                                key={svc.name}
                                className="flex flex-col gap-2 rounded-2xl border border-slate-100 px-5 pt-5 pb-1.5"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-base text-slate-900">{svc.name}</span>
                                    <span
                                        className={`inline-flex items-center rounded-lg px-2.5 py-0.5 text-sm font-medium ${pill}`}
                                    >
                                        {svc.status}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">Uptime</span>
                                    <span className="text-slate-900">{svc.uptime}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA button */}
                <Button
                    className="mt-2 h-10 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-base font-medium"
                    type="button"
                    onClick={handleViewReport}
                >
                    View Full Report
                </Button>
            </CardContent>
        </Card>
    );
}
