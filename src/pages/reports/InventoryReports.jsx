import StatView from '@/components/view/repStatView'
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

import PRODUCT_ROWS from "@/data/ProductData";
import SalesCat from "@/components/ui/SalesCat";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ExportsButtonSale from "@/components/ui/ExportButtonSale";
import ProductsHeader from '@/components/ui/ProductHeader';
import RefreshButtons from '@/components/ui/RefreshButton';
import ButtonComponent from '@/components/ui/ChangeButton';

export default function SaleReports() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [brand, setBrand] = React.useState("all");
    const [loading] = React.useState(false);

    const filtered = PRODUCT_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.brand.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = brand === "all" || r.brand === brand;
        return matchSearch && matchCat && matchBrand;
    });

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    const [isStockHistoryVisible, setStockHistoryVisible] = useState(true);
    const [isSoldStockVisible, setSoldStockVisible] = useState(true);

    // const handleExportPdf = () => {
    //     console.log('Export PDF clicked');
    // };

    // const handleExportXls = () => {
    //     console.log('Export XLS clicked');
    // };

    // const handleRefresh = () => {
    //     console.log('Refresh clicked');
    // };
    return (
        <div className="space-y-4">
            <ProductsDate />
            <div className="flex">
                <ProductsHeader
                    title="Inventory Report" breadcrumbs={
                        [
                            { label: "Dashboard" },
                            { label: "Inventory Report", active: true },
                        ]
                    } />
                <RefreshButtons />
            </div>

            <div className="flex gap-4">
                <ButtonComponent
                    title="Inventory Report"
                    isVisible={isInventoryReportVisible}
                    // onClick={handleInventoryReportClick}
                    className="bg-orange-500 text-white"
                />
                <ButtonComponent
                    title="Stock History"
                    isVisible={isStockHistoryVisible}
                    // onClick={handleStockHistoryClick}
                    className="bg-white border text-gray-700"
                />
                <ButtonComponent
                    title="Sold Stock"
                    isVisible={isSoldStockVisible}
                    // onClick={handleSoldStockClick}
                    className="bg-white border text-gray-700"
                />
            </div>

            <div className="space-y-4">
                <SalesCat />
            </div>

            <div className="flex-1 items-center justify-between gap-3 overflow-hidden rounded-md border bg-background p-5">
                <div className="flex items-center gap-2 pb-4 w-full">
                    <h3 className="text-lg font-semibold">Inventory Report</h3>
                    <div className="ml-auto flex items-center gap-2">
                        <ExportsButtonSale />
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-200">
                            <TableHead>SKU</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Instock</TableHead>
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
                                <TableRow key={r.sku}>
                                    <TableCell className="font-medium">{r.sku}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-100">
                                                <img
                                                    src={r.image}
                                                    alt={r.name}
                                                    className="h-6 w-6 object-contain"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{r.name}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{r.category}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-normal">
                                            {r.unit}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${r.instockQty}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
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
