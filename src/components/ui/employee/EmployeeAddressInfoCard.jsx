// src/components/employee/EmployeeAddressInfoCard.jsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronUpCircle, Info, MapPin } from "lucide-react";
import { Req } from "./Req";

export default function EmployeeAddressInfoCard() {
    const [collapsed, setCollapsed] = React.useState(false);
    const toggle = () => setCollapsed((v) => !v);

    return (
        <div className="rounded-md border bg-white">
            <div className="flex items-center justify-between px-4 py-2">
                <p className="text-sm flex font-semibold text-blue-800 items-center gap-1.5">
                    <Info size={16} />
                    Address Information
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
                    <div className="space-y-1.5">
                        <Label htmlFor="street">
                            <Req>Street Address</Req>
                        </Label>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <Input id="street" placeholder="Enter street address" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="city">
                                <Req>City</Req>
                            </Label>
                            <Input id="city" placeholder="Enter city" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="state">
                                <Req>State / Province</Req>
                            </Label>
                            <Input id="state" placeholder="Enter state" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="zip">
                                <Req>Zip Code</Req>
                            </Label>
                            <Input id="zip" placeholder="Enter zip code" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="country">
                                <Req>Country</Req>
                            </Label>
                            <Input id="country" defaultValue="United States" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
