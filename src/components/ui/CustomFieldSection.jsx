import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronUpCircle, List } from "lucide-react";

export default function CustomFieldsSection({ values, onCollapse, onChange }) {
    const [tabs, setTabs] = useState({
        warranties: true,
        manufacturer: true,
        expiry: true,
    });

    const toggle = (key) => setTabs({ ...tabs, [key]: !tabs[key] });
    const set = (key, val) => onChange({ ...values, [key]: val });
    const [collapsed, setCollapsed] = React.useState(false);
    const toggle1 = () => {
        setCollapsed((v) => !v);
        onCollapse?.();
    };

    return (
        <Card className="border rounded-md p-0">
            <div className="flex items-center border-b justify-between px-4 py-2">
                <p className="text-sm flex font-semibold text-green-700 items-center gap-1.5"> <List size={16} /> Custom Fields</p>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggle1}
                >
                    <ChevronUpCircle
                        className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </div>


            {!collapsed && (
                <CardContent className="space-y-4 pb-4">
                    <div className="flex items-center gap-4 bg-indigo-50 rounded-md p-4">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="warranties"
                                checked={tabs.warranties}
                                onCheckedChange={() => toggle("warranties")}
                            />
                            <Label htmlFor="warranties" className="text-sm font-medium">
                                Warranties
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="manufacturer"
                                checked={tabs.manufacturer}
                                onCheckedChange={() => toggle("manufacturer")}
                            />
                            <Label htmlFor="manufacturer" className="text-sm font-medium">
                                Manufacturer
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="expiry"
                                checked={tabs.expiry}
                                onCheckedChange={() => toggle("expiry")}
                            />
                            <Label htmlFor="expiry" className="text-sm font-medium">
                                Expiry
                            </Label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tabs.warranties && (
                            <div className="space-y-2">
                                <Label>Warranty <span className="text-red-500">*</span></Label>
                                <Select
                                    value={values.warranty}
                                    onValueChange={(v) => set("warranty", v)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="no_warranty">No Warranty</SelectItem>
                                        <SelectItem value="brand_warranty">Brand Warranty</SelectItem>
                                        <SelectItem value="seller_warranty">Seller Warranty</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {tabs.manufacturer && (
                            <div className="space-y-2">
                                <Label>Manufacturer <span className="text-red-500">*</span></Label>
                                <Input
                                    placeholder="Enter manufacturer name"
                                    value={values.manufacturer}
                                    onChange={(e) => set("manufacturer", e.target.value)}
                                />
                            </div>
                        )}

                        {tabs.expiry && (
                            <>
                                <div className="space-y-2">
                                    <Label>Manufactured Date <span className="text-red-500">*</span></Label>
                                    <Input
                                        type="date"
                                        value={values.mfgDate}
                                        onChange={(e) => set("mfgDate", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Expiry On <span className="text-red-500">*</span></Label>
                                    <Input
                                        type="date"
                                        value={values.expDate}
                                        onChange={(e) => set("expDate", e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
