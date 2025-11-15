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
import { Switch } from "@/components/ui/switch";
import {
    ChevronUpCircle,
    Info,
    Printer,
    QrCode,
    RotateCcw,
    Search,
} from "lucide-react";

function Req({ children }) {
    return (
        <span className="inline-flex items-center gap-1 text-sm font-medium">
            {children}
            <span className="text-red-500">*</span>
        </span>
    );
}

export default function BarcodeGeneratorCard({
    onCollapse,
    onGenerateQr,
    onResetBarcode,
    onPrintBarcode,
}) {
    const [collapsed, setCollapsed] = React.useState(false);
    const [showStoreName, setShowStoreName] = React.useState(true);
    const [showProductName, setShowProductName] = React.useState(true);
    const [showPrice, setShowPrice] = React.useState(true);

    const toggle = () => {
        setCollapsed((v) => !v);
        onCollapse?.();
    };

    return (
        <div className="rounded-md border bg-white">
            <div className="flex items-center justify-between px-4 py-2">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-blue-800">
                    <Info size={16} />
                    Barcode / QR Generator
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
                <div className="space-y-4 p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="warehouse">
                                <Req>Warehouse</Req>
                            </Label>
                            <Select>
                                <SelectTrigger id="warehouse" className="h-10 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="wh-main">Main Warehouse</SelectItem>
                                    <SelectItem value="wh-2">Secondary Warehouse</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="store">
                                <Req>Store</Req>
                            </Label>
                            <Select>
                                <SelectTrigger id="store" className="h-10 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="store-a">Store A</SelectItem>
                                    <SelectItem value="store-b">Store B</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="product">
                            <Req>Product</Req>
                        </Label>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                                <Search size={16} />
                            </span>
                            <Input
                                id="product"
                                placeholder="Search Product by Code"
                                className="pl-9"
                            />
                        </div>
                    </div>

                    <div className="bg-slate-50 p-5">
                        <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50">
                            <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
                                <div>Product</div>
                                <div>SKU</div>
                                <div>Code</div>
                                <div>Qty</div>
                            </div>

                            <div className="flex flex-col items-center bg-white justify-center px-4 py-8 text-xs text-slate-400">
                                <span className="mb-1 text-lg" role="img" aria-label="no-data">
                                    📄
                                </span>
                                <span>No Data Available</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <Label htmlFor="paperSize">
                            <Req>Paper Size</Req>
                        </Label>

                        <div className="mt-1 flex items-center justify-around gap-6">
                            <div className="w-full max-w-md">
                                <Select>
                                    <SelectTrigger id="paperSize" className="h-10 w-full">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="a4">A4</SelectItem>
                                        <SelectItem value="a5">A5</SelectItem>
                                        <SelectItem value="label">Label Sheet</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-8">
                                <ToggleInline
                                    label="Show Store Name"
                                    checked={showStoreName}
                                    onCheckedChange={setShowStoreName}
                                />
                                <ToggleInline
                                    label="Show Product Name"
                                    checked={showProductName}
                                    onCheckedChange={setShowProductName}
                                />
                                <ToggleInline
                                    label="Show Price"
                                    checked={showPrice}
                                    onCheckedChange={setShowPrice}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-wrap justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onGenerateQr}
                            className="flex items-center gap-2"
                        >
                            <QrCode className="h-4 w-4" />
                            Generate QR Code
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onResetBarcode}
                            className="flex items-center gap-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Reset Barcode
                        </Button>

                        <Button
                            type="button"
                            onClick={onPrintBarcode}
                            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                        >
                            <Printer className="h-4 w-4" />
                            Print Barcode
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function ToggleInline({ label, checked, onCheckedChange }) {
    return (
        <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="whitespace-nowrap text-slate-700">{label}</span>
            <Switch
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="data-[state=checked]:bg-green-700"
            />
        </div>
    );
}


