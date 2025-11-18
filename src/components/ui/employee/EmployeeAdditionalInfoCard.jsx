// src/components/employee/EmployeeAdditionalInfoCard.jsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ChevronUpCircle, Info, FileText } from "lucide-react";

export default function EmployeeAdditionalInfoCard() {
    const [collapsed, setCollapsed] = React.useState(false);
    const toggle = () => setCollapsed((v) => !v);

    return (
        <div className="rounded-md border bg-white">
            <div className="flex items-center justify-between px-4 py-2">
                <p className="text-sm flex font-semibold text-blue-800 items-center gap-1.5">
                    <Info size={16} />
                    Additional Information
                </p>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggle}
                >
                    <ChevronUpCircle
                        className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </div>
            <Separator />

            {!collapsed && (
                <div className="space-y-3 p-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="notes" className="flex items-center gap-1.5">
                            <FileText className="h-4 w-4 text-slate-500" />
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="Add any additional notes or comments..."
                            className="min-h-[110px]"
                        />
                    </div>
                    <p className="text-xs text-slate-500">
                        You can note probation details, special instructions, medical alerts, etc.
                    </p>
                </div>
            )}
        </div>
    );
}
