"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User2, ChevronUpCircle, Info } from "lucide-react";
import { Req } from "./Req";

export default function EmployeePhotoCard() {
    const [collapsed, setCollapsed] = React.useState(false);
    const fileInputRef = React.useRef(null);

    const toggle = () => setCollapsed((v) => !v);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        // You can handle the file here (preview, upload, etc.)
        console.log("Selected file:", file);
    };

    return (
        <div className="rounded-md border bg-white">
            <div className="flex items-center justify-between px-4 py-2">
                <p className="text-sm flex font-semibold text-blue-800 items-center gap-1.5">
                    <Info size={16} />
                    Employee Photo
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
                <div className="p-4 space-y-4">
                    <div className="flex flex-col items-center justify-center rounded-2xl border bg-slate-50 px-6 py-10">
                        <div className="flex items-center justify-center h-24 w-24 rounded-full bg-slate-100 text-slate-400 mb-4">
                            <User2 size={40} />
                        </div>
                        <p className="text-xs text-slate-500 mb-2">No image uploaded</p>

                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        {/* Visible upload button */}
                        <Button
                            type="button"
                            onClick={handleUploadClick}
                            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Upload Photo
                        </Button>

                        <p className="mt-2 text-[11px] text-slate-500 text-center">
                            Recommended size: 400 x 400 px. Max 2MB.
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="empStatus">
                            <Req>Employee Status</Req>
                        </Label>
                        <Select defaultValue="active">
                            <SelectTrigger id="empStatus" className="h-10 w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="probation">On Probation</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}
        </div>
    );
}
