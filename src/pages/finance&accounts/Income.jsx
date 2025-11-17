import IncomeView from '@/components/view/IncomeView'
import React, { useState } from 'react'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Loader2,
    ArrowUpDown,
    Search,
    Dot,
    PlusCircle,
    Download,
    Plus,
} from "lucide-react";

import incomes from "@/data/IncomeData";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ButtonComponent from '@/components/ui/ChangeButton'

export default function SaleReports() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [brand, setBrand] = React.useState("all");
    const [status, setStatus] = React.useState("all");
    const [loading] = React.useState(false);

    const filtered = incomes.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.inDate.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = brand === "all" || r.brand === brand;
        return matchSearch && matchCat && matchBrand;
    });

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    const [isStockHistoryVisible, setStockHistoryVisible] = useState(true);
    const [isSoldStockVisible, setSoldStockVisible] = useState(true);

    const categoryColors = {
        "Office Supplies": "bg-purple-100 text-purple-600",
        Utilities: "bg-sky-100 text-sky-600",
        Marketing: "bg-pink-100 text-pink-600",
        Transportation: "bg-orange-100 text-orange-600",
        "Equipment Maintenance": "bg-red-100 text-red-600",
        Rent: "bg-indigo-100 text-indigo-600",
        "Professional Services": "bg-cyan-100 text-cyan-700",
        "Software Subscription": "bg-teal-100 text-teal-700",
        "Employee Benefits": "bg-emerald-100 text-emerald-700",
        Travel: "bg-amber-100 text-amber-700",

        "Sales Revenue": "bg-sky-100 text-sky-600",
        "Service Revenue": "bg-purple-100 text-purple-600",
        "Recurring Revenue": "bg-emerald-100 text-emerald-700",
        "Investment Income": "bg-indigo-100 text-indigo-600",
        "Rental Income": "bg-orange-100 text-orange-600",
        Commission: "bg-pink-100 text-pink-600",
        "Licensing Revenue": "bg-teal-100 text-teal-700",
    };


    return (
        <div className="space-y-4">
            <ProductsDate />
            <IncomeView />

            <div className="flex-1 flex-wrap items-center justify-between gap-3 rounded-md border bg-background">
                <div className="flex w-full items-center p-3 gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search product, SKU, brand"
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="ml-auto gap-3 flex">
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-42.5">
                                <SelectValue placeholder="Brand" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Electro Mart">Electro Mart</SelectItem>
                                <SelectItem value="Quantum Gadgets">Quantum Gadgets</SelectItem>
                                <SelectItem value="Prime Bazaar">Prime Bazaar</SelectItem>
                                <SelectItem value="Gadget World">Gadget World</SelectItem>
                                <SelectItem value="Volt Vault">Volt Vault</SelectItem>
                                <SelectItem value="Elite Retail">Elite Retail</SelectItem>
                                <SelectItem value="Prime Mart">Prime Mart</SelectItem>
                                <SelectItem value="Neo Tech">Neo Tech</SelectItem>
                                <SelectItem value="Urban Mart">Urban Mart</SelectItem>
                                <SelectItem value="Travel Mart">Travel Mart</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-42.5">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Electro Mart">Paid</SelectItem>
                                <SelectItem value="Quantum Gadgets">Pending</SelectItem>
                                <SelectItem value="Prime Bazaar">Unpaid</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <ProductsDate />
                    <ButtonComponent
                        title="Export"
                        isVisible={isInventoryReportVisible}
                        // onClick={handleInventoryReportClick}
                        className="bg-green-600 text-white gap-2 hover:bg-orange-600"
                        icon={<Download size={16} />}
                    ><PlusCircle size={20} /></ButtonComponent>

                    <ButtonComponent
                        title="Add Income"
                        isVisible={isInventoryReportVisible}
                        // onClick={handleInventoryReportClick}
                        className="bg-blue-600 text-white gap-2 hover:bg-orange-600"
                        icon={<Plus size={16} />}
                    ><PlusCircle size={20} /></ButtonComponent>
                </div>

                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-200">
                                <TableHead className="w-10">
                                    <Checkbox aria-label="Select all" />
                                </TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Source</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Payment Method</TableHead>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="h-24 text-center">
                                        <div className="inline-flex items-center gap-2 text-muted-foreground">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Loading products…
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No products found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((r) => (
                                    <TableRow key={r.inSource}>
                                        <TableCell>
                                            <Checkbox aria-label={`Select ${r.inStatus}`} />
                                        </TableCell>
                                        <TableCell>{r.inDate}</TableCell>
                                        <TableCell>{r.inSource}</TableCell>
                                        <TableCell className="text-right">${r.inAmount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <div className={`
                                                inline-flex items-center justify-center
                                                px-3 py-1 min-w-[120px] h-7
                                                rounded-full text-xs font-medium
                                                ${categoryColors[r.inCategory || r.exCategory] || "bg-slate-100 text-slate-700"}
                                                `}>
                                                {r.inCategory || r.exCategory}
                                            </div>

                                        </TableCell>
                                        <TableCell>{r.inPaymentMethod}</TableCell>
                                        <TableCell>{r.inInvoice}</TableCell>
                                        <TableCell>
                                            <div
                                                className={`
                                                    inline-flex items-center justify-center
                                                    px-3 py-1 min-w-[80px] h-7
                                                    rounded-full text-xs font-medium
                                                    ${r.inStatus === "Received"
                                                        ? "bg-emerald-500 text-white"
                                                        : r.inStatus === "Processing"
                                                            ? "bg-blue-500 text-white"
                                                            : r.inStatus === "Pending"
                                                                ? "bg-amber-400 text-white"
                                                                : "bg-slate-200 text-slate-700"
                                                    }
    `}
                                            >
                                                {r.inStatus}
                                            </div>
                                        </TableCell>
                                        <TableCell></TableCell>

                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* ===== PAGINATION ===== */}
                <div className="flex flex-wrap items-center justify-between border-t gap-3 p-3">
                    <div className="text-sm text-muted-foreground">
                        Row per page:
                        <Select defaultValue="10">
                            <SelectTrigger className="ml-2 inline-flex h-8 w-[72px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm">
                            1
                        </Button>
                        <Button variant="ghost" size="sm">
                            2
                        </Button>
                        <Button variant="ghost" size="sm">
                            3
                        </Button>
                        <Button variant="ghost" size="sm">
                            …
                        </Button>
                        <Button variant="ghost" size="sm">
                            10
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
