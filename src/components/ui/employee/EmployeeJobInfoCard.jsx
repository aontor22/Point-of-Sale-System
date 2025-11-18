// src/components/employee/EmployeeJobInfoCard.jsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ChevronUpCircle, Info, BriefcaseBusiness } from "lucide-react";
import { Req } from "./Req";

export default function EmployeeJobInfoCard() {
    const [collapsed, setCollapsed] = React.useState(false);
    const toggle = () => setCollapsed((v) => !v);

    return (
        <div className="rounded-md border bg-white">
            <div className="flex items-center justify-between px-4 py-2">
                <p className="text-sm flex font-semibold text-blue-800 items-center gap-1.5">
                    <Info size={16} />
                    Job Information
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
                            <Label htmlFor="department">
                                <Req>Department</Req>
                            </Label>
                            <Select>
                                <SelectTrigger id="department" className="h-10 w-full">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sales">Sales</SelectItem>
                                    <SelectItem value="hr">Human Resources</SelectItem>
                                    <SelectItem value="it">IT</SelectItem>
                                    <SelectItem value="finance">Finance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="position">
                                <Req>Position / Job Title</Req>
                            </Label>
                            <div className="flex items-center gap-2">
                                <BriefcaseBusiness className="h-4 w-4 text-slate-400" />
                                <Input id="position" placeholder="Select position" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="salary">
                                <Req>Monthly Salary</Req>
                            </Label>
                            <Input id="salary" type="number" placeholder="0.00" />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="employmentType">
                                <Req>Employment Type</Req>
                            </Label>
                            <Select defaultValue="fulltime">
                                <SelectTrigger id="employmentType" className="h-10 w-full">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fulltime">Full Time</SelectItem>
                                    <SelectItem value="parttime">Part Time</SelectItem>
                                    <SelectItem value="contract">Contract</SelectItem>
                                    <SelectItem value="intern">Intern</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
