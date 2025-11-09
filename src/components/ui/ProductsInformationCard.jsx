import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"; PiTelegramLogo
import { PiTelegramLogo } from "react-icons/pi";
import { LiaQuoteLeftSolid } from "react-icons/lia";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUpCircle, CodeXml, Info, Link, List, ListOrdered, Paperclip, Plus, Smile, Trash2, Wand2 } from "lucide-react";

function Req({ children }) {
    return (
        <span className="inline-flex items-center gap-1 text-sm font-medium">
            {children}
            <span className="text-red-500">*</span>
        </span>
    );
}

export default function ProductInformationCard({
    onCollapse,
    onGenerateSku,
    onGenerateItemCode,
    onAddCategory,
}) {
    const [collapsed, setCollapsed] = React.useState(false);

    const toggle = () => {
        setCollapsed((v) => !v);
        onCollapse?.();
    };

    return (
        <div className="rounded-md border bg-white">
            <div className="flex items-center justify-between px-4 py-2">
                <p className="text-sm flex font-semibold text-blue-800 items-center gap-1.5"> <Info size={16} /> Product Information</p>
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
                        <div className="space-y-1.5 w-full">
                            <Label htmlFor="store">
                                <Req>Store</Req>
                            </Label>
                            <Select>
                                <SelectTrigger id="store" className="h-10 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="main">Main Store</SelectItem>
                                    <SelectItem value="outlet-1">Outlet 1</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="warehouse">
                                <Req>Warehouse</Req>
                            </Label>
                            <Select>
                                <SelectTrigger id="warehouse" className="h-10 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dhk">Dhaka WH</SelectItem>
                                    <SelectItem value="ctg">Chattogram WH</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="name">
                                <Req>Product Name</Req>
                            </Label>
                            <Input id="name" placeholder="" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="slug">
                                <Req>Slug</Req>
                            </Label>
                            <Input id="slug" placeholder="" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="sku">
                                <Req>SKU</Req>
                            </Label>
                            <div className="flex gap-2">
                                <Input id="sku" placeholder="" />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={onGenerateSku}
                                    className="shrink-0"
                                >
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Generate
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="sellingType">
                                <Req>Selling Type</Req>
                            </Label>
                            <Select>
                                <SelectTrigger id="sellingType" className="h-10 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="bundle">Bundle</SelectItem>
                                    <SelectItem value="variant">Variant</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="category">
                                    <Req>Category</Req>
                                </Label>
                                <Button
                                    type="button"
                                    variant="link"
                                    className="h-auto p-0 text-sm"
                                    onClick={onAddCategory}
                                >
                                    <Plus className="mr-1 h-4 w-4" />
                                    Add New
                                </Button>
                            </div>
                            <Select>
                                <SelectTrigger id="category" className="h-10 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="computers">Computers</SelectItem>
                                    <SelectItem value="electronics">Electronics</SelectItem>
                                    <SelectItem value="bags">Bags</SelectItem>
                                    <SelectItem value="furniture">Furniture</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="subCategory">Sub Category</Label>
                            <Select>
                                <SelectTrigger id="subCategory" className="h-10 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="laptop">Laptop</SelectItem>
                                    <SelectItem value="watch">Watch</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="brand">
                                <Req>Brand</Req>
                            </Label>
                            <Select>
                                <SelectTrigger id="brand" className="h-10 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="lenovo">Lenovo</SelectItem>
                                    <SelectItem value="nike">Nike</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="unit">
                                <Req>Unit</Req>
                            </Label>
                            <Select>
                                <SelectTrigger id="unit" className="h-10 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pc">Pc</SelectItem>
                                    <SelectItem value="box">Box</SelectItem>
                                    <SelectItem value="kg">Kg</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="itemCode">
                                <Req>Item Code</Req>
                            </Label>
                            <div className="flex gap-2">
                                <Input id="itemCode" placeholder="" />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={onGenerateItemCode}
                                    className="shrink-0"
                                >
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Generate
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="barcode">
                                <Req>Barcode Symbology</Req>
                            </Label>
                            <Select>
                                <SelectTrigger id="barcode" className="h-10 w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ean13">EAN-13</SelectItem>
                                    <SelectItem value="code128">Code 128</SelectItem>
                                    <SelectItem value="upca">UPC-A</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="desc">Description</Label>

                        <div className="flex-1 items-center rounded-md border bg-white text-sm text-slate-600">
                            <div className="border-b flex p-4 gap-2">
                                <span className="text-lg px-1.5 py-0.5">B</span>
                                <span className="text-lg px-1.5 py-0.5 italic">I</span>
                                <span className="text-lg px-1.5 py-0.5 underline">U</span>
                                <span className="text-lg px-1.5 py-0.5">S</span>
                                <span className="text-lg px-1.5 py-0.5"><Link /></span>
                                <span className="text-lg px-1.5 py-0.5"><ListOrdered /></span>
                                <span className="text-lg px-1.5 py-0.5"><List /></span>
                                <span className="text-lg px-1.5 py-0.5"><LiaQuoteLeftSolid size={22} /></span>
                                <span className="text-lg px-1.5 py-0.5"><CodeXml /></span>
                            </div>
                            <Textarea id="desc" placeholder="Type your message" className="mt-4 border-none shadow-none min-h-[110px]" />
                            <div className="flex p-4 gap-2">
                                <div className="flex gap-2 items-center">
                                    <span className="text-lg px-1.5 py-0.5"><Paperclip /></span>
                                    <span className="text-lg px-1.5 py-0.5"><Smile /></span>
                                    <span className="text-lg px-1.5 py-0.5"><Trash2 /></span>
                                </div>
                                <div className=" flex pl-200 gap-2 items-center">
                                    <span className="text-lg px-1.5 py-0.5"><PiTelegramLogo /></span>
                                    <span className="text-lg border-l px-3 py-0.5"><ChevronDown size={18} /></span>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500">Maximum 60 Words</p>
                    </div>
                </div>
            )}
        </div>
    );
}
