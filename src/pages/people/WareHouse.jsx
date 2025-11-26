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
} from "lucide-react";

import warehouses from "@/data/WareHouseData";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ProductsHeader from '@/components/ui/ProductHeader';
import ButtonComponent from '@/components/ui/ChangeButton'
import ExportsButtons from '@/components/ui/ExportsButtons';

export default function SaleReports() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [brand, setBrand] = React.useState("all");
    const [status, setStatus] = React.useState("all");
    const [loading] = React.useState(false);

    const filtered = warehouses.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.warehouseName.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = brand === "all" || r.brand === brand;
        return matchSearch && matchCat && matchBrand;
    });

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    const [isStockHistoryVisible, setStockHistoryVisible] = useState(true);
    const [isSoldStockVisible, setSoldStockVisible] = useState(true);

    // pagination logic remains correct

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // This is the array that holds only the items for the current page
    const paginatedRows = filtered.slice(startIndex, endIndex);

    const makePageList = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i += 1) pages.push(i);
        } else {
            pages.push(1);
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (start > 2) pages.push("ellipsis-start");
            for (let i = start; i <= end; i += 1) pages.push(i);
            if (end < totalPages - 1) pages.push("ellipsis-end");

            pages.push(totalPages);
        }

        return pages;
    };

    const pageItems = makePageList();

    return (
        <div className="space-y-4">
            <ProductsDate />
            <div className="flex">
                <ProductsHeader
                    title="Warehouses" breadcrumbs={
                        [
                            { label: "Dashboard" },
                            { label: "Warehouses", active: true },
                        ]
                    } />
                <div className="flex gap-4 items-center">
                    <ExportsButtons />
                    <ButtonComponent
                        title="Add Warehouse"
                        isVisible={isInventoryReportVisible}
                        // onClick={handleInventoryReportClick}
                        className="bg-orange-500 text-white gap-2 hover:bg-orange-600"
                        icon={<PlusCircle size={16} />}
                    ><PlusCircle size={20} /></ButtonComponent>
                </div>
            </div>

            <div className="flex-1 flex-wrap items-center justify-between gap-3 rounded-md border bg-background dark:bg-slate-900">
                <div className="flex w-full flex-1 items-center dark:bg-slate-800 p-3 gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search product, SKU, brand"
                            className="pl-8 dark:bg-slate-900"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="ml-auto gap-3 flex">
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-42.5 dark:bg-slate-900">
                                <SelectValue placeholder="Brand" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Status</SelectItem>
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
                    </div>
                </div>

                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-200 dark:bg-slate-800">
                                <TableHead className="w-10">
                                    <Checkbox aria-label="Select all" />
                                </TableHead>
                                <TableHead>Warehouse</TableHead>
                                <TableHead>Contact Person</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-1 whitespace-nowrap">
                                        <span>Total Product</span>
                                        <ArrowUpDown className="h-3.5 w-3.5" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-1 whitespace-nowrap">
                                        <span>Stock</span>
                                        <ArrowUpDown className="h-3.5 w-3.5" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-1 whitespace-nowrap">
                                        <span>Qty</span>
                                        <ArrowUpDown className="h-3.5 w-3.5" />
                                    </div>
                                </TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-1 whitespace-nowrap">
                                        <span>Created On</span>
                                        <ArrowUpDown className="h-3.5 w-3.5" />
                                    </div>
                                </TableHead>
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
                                paginatedRows.map((r) => (
                                    <TableRow key={r.status}>
                                        <TableCell>
                                            <Checkbox aria-label={`Select ${r.status}`} />
                                        </TableCell>
                                        <TableCell>{r.warehouseName}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-sm overflow-hidden flex items-center justify-center bg-slate-100">
                                                    <img
                                                        src={r.avatar}
                                                        alt={r.contactPerson}
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{r.contactPerson}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{r.phone}</TableCell>
                                        <TableCell>{r.totalProducts}</TableCell>
                                        <TableCell>{r.stock}</TableCell>
                                        <TableCell>{r.qty}</TableCell>
                                        <TableCell>{r.createdOn}</TableCell>
                                        <TableCell><div className="bg-green-600 w-18 items-center rounded-lg text-white flex text-center h-5.5"><Dot className="-mr-3 -ml-2  " size={40} /> {r.status}</div></TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <span className='p-4'>Row per page:</span>
                        <Select
                            value={String(rowsPerPage)}
                            onValueChange={(value) => {
                                const num = Number(value);
                                setRowsPerPage(num);
                                setPage(1); // Crucial: Reset to page 1 when rowsPerPage changes
                            }}
                        >
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
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            Prev
                        </Button>

                        {pageItems.map((item, idx) =>
                            typeof item === "number" ? (
                                <Button
                                    key={idx}
                                    // FIX: Ensure both dark and light mode styling work for the active button
                                    className={item === currentPage
                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                        : "bg-white dark:bg-slate-700 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600 text-slate-800"
                                    }
                                    size="sm"
                                    onClick={() => setPage(item)}
                                >
                                    {item}
                                </Button>
                            ) : (
                                <Button key={idx} variant="ghost" size="sm" disabled>
                                    …
                                </Button>
                            )
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
