import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { ChevronUpCircle, LifeBuoy } from "lucide-react";
import { Button } from "../button";

export default function PricingStocksSection({
    values, onCollapse,
    onChange,
}) {
    const [collapsed, setCollapsed] = React.useState(false);
    const set = (key, val) => onChange({ ...values, [key]: val });

    const toggle = () => {
        setCollapsed((v) => !v);
        onCollapse?.();
    };

    return (
        <Card className="border rounded-md dark:bg-slate-800 p-0">
            <div className="flex items-center border-b justify-between px-4 py-2">
                <p className="text-sm flex font-semibold text-blue-800 items-center gap-1.5"> <LifeBuoy size={16} /> Pricing & Stocks</p>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={toggle}
                >
                    <ChevronUpCircle
                        className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </div>
            {!collapsed && (
                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Label className="text-sm">Product Type <span className="text-red-500">*</span></Label>
                        <RadioGroup
                            value={values.productType}
                            onValueChange={(v) => set("productType", v)}
                            className="flex items-center gap-6"
                        >
                            <div className="flex items-center gap-2">
                                <RadioGroupItem id="single" value="single" />
                                <Label htmlFor="single" className="font-normal">Single Product</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem id="variable" value="variable" />
                                <Label htmlFor="variable" className="font-normal">Variable Product</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="qty">Quantity</Label>
                            <Input
                                id="qty"
                                type="number"
                                min="0"
                                placeholder="e.g., 50"
                                value={values.quantity}
                                onChange={(e) => set("quantity", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price <span className="text-red-500">*</span></Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="e.g., 999.00"
                                value={values.price}
                                onChange={(e) => set("price", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Tax Type <span className="text-red-500">*</span></Label>
                            <Select
                                value={values.taxType}
                                onValueChange={(v) => set("taxType", v)}
                            >
                                <SelectTrigger
                                    className="w-full"
                                    style={{ ["--radix-select-trigger-width"]: "100%" }}
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="w-(--radix-select-trigger-width)">
                                    <SelectItem value="vat_inclusive">VAT Inclusive</SelectItem>
                                    <SelectItem value="vat_exclusive">VAT Exclusive</SelectItem>
                                    <SelectItem value="no_tax">No Tax</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 pb-2 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label>Discount Type <span className="text-red-500">*</span></Label>
                            <Select
                                value={values.discountType}
                                onValueChange={(v) => set("discountType", v)}
                            >
                                <SelectTrigger
                                    className="w-full"
                                    style={{ ["--radix-select-trigger-width"]: "100%" }}
                                >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent className="w-(--radix-select-trigger-width)">
                                    <SelectItem value="percent">Percent</SelectItem>
                                    <SelectItem value="flat">Flat</SelectItem>
                                    <SelectItem value="none">None</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="discountValue">Discount Value</Label>
                            <Input
                                id="discountValue"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="e.g., 10 or 150"
                                value={values.discountValue}
                                onChange={(e) => set("discountValue", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="qtyAlert">Quantity Alert <span className="text-red-500">*</span></Label>
                            <Input
                                id="qtyAlert"
                                type="number"
                                min="0"
                                placeholder="e.g., 5"
                                value={values.quantityAlert}
                                onChange={(e) => set("quantityAlert", e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
