import React, { useState } from 'react'

import { Button } from "@/components/ui/button";
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
} from "lucide-react";

import suppliers from "@/data/SupplierData";
import SalesCat from "@/components/ui/SalesCat";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ExportsButtonSale from "@/components/ui/ExportButtonSale";
import ProductsHeader from '@/components/ui/ProductHeader';
import RefreshButtons from '@/components/ui/RefreshButton';
import ButtonComponent from '@/components/ui/ChangeButton'

export default function SaleReports() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [brand, setBrand] = React.useState("all");
    const [loading] = React.useState(false);

    const filtered = suppliers.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.suRef.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = brand === "all" || r.brand === brand;
        return matchSearch && matchCat && matchBrand;
    });

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    const [isStockHistoryVisible, setStockHistoryVisible] = useState(true);

    const totalAmount = suppliers.reduce(
        (sum, r) => sum + Number(r.suAmount.replace(/[$,]/g, "")),
        0
    );


    return (
        <div className="space-y-4">
            <ProductsDate />
            <div className="flex">
                <ProductsHeader
                    title="Supplier Report" breadcrumbs={
                        [
                            { label: "Dashboard" },
                            { label: "Supplier Report", active: true },
                        ]
                    } />
                <RefreshButtons />
            </div>
            <div className="flex gap-4">
                <ButtonComponent
                    title="Supplier Report"
                    isVisible={isInventoryReportVisible}
                    // onClick={handleInventoryReportClick}
                    className="bg-orange-500 text-white"
                />
                <ButtonComponent
                    title="Supplier Due"
                    isVisible={isStockHistoryVisible}
                    // onClick={handleStockHistoryClick}
                    className="bg-white border text-gray-700"
                />
            </div>
            <div className="space-y-4">
                <SalesCat />
            </div>

            <div className="flex-1 items-center justify-between gap-3 overflow-hidden rounded-md border bg-background p-5">
                <div className="flex items-center gap-2 pb-4 w-full">
                    <h3 className="text-lg font-semibold">Supplier Report</h3>
                    <div className="ml-auto flex items-center gap-2">
                        <ExportsButtonSale />
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-200">
                            <TableHead>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>Reference</span>
                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>ID</span>
                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                </div>
                            </TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Total Items</TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>Amount</span>
                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                </div>
                            </TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Status</TableHead>
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
                                <TableRow key={r.suRef}>
                                    <TableCell className="font-medium">{r.suRef}</TableCell>
                                    <TableCell>{r.suID}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-sm overflow-hidden flex items-center justify-center bg-slate-100">
                                                <img
                                                    src={r.suImg}
                                                    alt={r.suName}
                                                    className="h-full w-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="font-medium">{r.suName}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>{r.suTotalItems}</TableCell>
                                    <TableCell>{r.suAmount}</TableCell>
                                    <TableCell>{r.suPaymentMethod}</TableCell>
                                    <TableCell>
                                        <div
                                            className={`inline-flex items-center justify-center px-3 py-1
                                                rounded-lg text-xs font-medium
                                                ${r.suStatus === "Received"
                                                    ? "bg-emerald-500 text-white"
                                                    : r.suStatus === "Pending"
                                                        ? "bg-sky-500 text-white"
                                                        : r.suStatus === "Order Placed"
                                                            ? "bg-yellow-400 text-white"
                                                            : "bg-yellow-400 text-white"
                                                }`}
                                        >
                                            {r.suStatus}
                                        </div>
                                    </TableCell>

                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter className="bg-slate-200">
                        <TableRow>
                            <TableCell colSpan={4} className="font-semibold">
                                Total
                            </TableCell>
                            <TableCell className="font-semibold">
                                {totalAmount.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </TableCell>
                            <TableCell />
                            <TableCell />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            {/* ===== PAGINATION ===== */}
            <div className="flex flex-wrap items-center justify-between gap-3">
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
            <Footer />
        </div>
    )
}
