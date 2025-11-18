// src/components/employee/EmployeeBasicInfoCard.jsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronUpCircle, Info, Calendar, Phone, Mail } from "lucide-react";
import { Req } from "./Req";

export default function EmployeeBasicInfoCard() {
    const [collapsed, setCollapsed] = React.useState(false);
    const toggle = () => setCollapsed((v) => !v);

    return (
        <div className="rounded-md border bg-white">
            <div className="flex items-center justify-between px-4 py-2">
                <p className="text-sm flex font-semibold text-blue-800 items-center gap-1.5">
                    <Info size={16} />
                    Basic Information
                </p>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggle}
                >
                    <ChevronUpCircle
                        className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
                    />
                </Button>
            </div>
            <Separator />

            {!collapsed && (
                <div className="space-y-4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="fullName">
                                <Req>Full Name</Req>
                            </Label>
                            <Input id="fullName" placeholder="Enter full name" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="empId">
                                <Req>Employee ID</Req>
                            </Label>
                            <Input id="empId" placeholder="EMP-001" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="email">
                                <Req>Email Address</Req>
                            </Label>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-400" />
                                <Input id="email" type="email" placeholder="email@company.com" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="phone">
                                <Req>Phone Number</Req>
                            </Label>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-slate-400" />
                                <Input id="phone" placeholder="+1 (555) 123-4567" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="startDate">
                                <Req>Start Date</Req>
                            </Label>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <Input id="startDate" type="date" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="otherId">Other ID (optional)</Label>
                            <Input id="otherId" placeholder="Optional" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
