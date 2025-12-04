import React, { useState } from "react";

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
import { Checkbox } from "@/components/ui/checkbox";

import {
    MoreHorizontal,
    Search,
    Loader2,
    Edit,
    Eye,
    Trash2,
    ArrowUpDown,
    Dot,
} from "lucide-react";

import warranties from "@/data/WarrantyData";
import ProductHeader from "@/components/ui/ProductHeader";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";

export default function Units() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [store, setStore] = React.useState("all");
    const [loading] = React.useState(false);

    const filtered = warranties.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.name.toLowerCase().includes(s) || r.store.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = store === "all" || r.store === store;
        return matchSearch && matchCat && matchBrand;
    });

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedRows = filtered.slice(startIndex, endIndex);

    // NEW: selection state (using r.sku or some unique key; adjust if needed)
    const [selectedKeys, setSelectedKeys] = useState([]);

    const allSelectedOnPage =
        paginatedRows.length > 0 &&
        paginatedRows.every((r) => selectedKeys.includes(r.sku));

    const someSelectedOnPage =
        paginatedRows.some((r) => selectedKeys.includes(r.sku)) &&
        !allSelectedOnPage;

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
            <ProductHeader
                title="Warranties"
                breadcrumbs={[
                    { label: "Dashboard" },
                    { label: "Warranties", active: true },
                ]}
            />

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-white dark:bg-slate-800 p-3">
                <div className="flex w-full flex-1 items-center gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search product, SKU, brand"
                            className="pl-8 bg-slate-100 dark:bg-slate-900"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="ml-auto gap-3 flex">
                        <Select value={store} onValueChange={setStore}>
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
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-200 dark:bg-slate-800">
                            <TableHead className="w-10">
                                <Checkbox
                                    aria-label="Select all"
                                    checked={
                                        allSelectedOnPage
                                            ? true
                                            : someSelectedOnPage
                                                ? "indeterminate"
                                                : false
                                    }
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            const pageKeys = paginatedRows.map((r) => r.sku);
                                            setSelectedKeys((prev) =>
                                                Array.from(new Set([...prev, ...pageKeys]))
                                            );
                                        } else {
                                            const pageSet = new Set(paginatedRows.map((r) => r.sku));
                                            setSelectedKeys((prev) =>
                                                prev.filter((id) => !pageSet.has(id))
                                            );
                                        }
                                    }}
                                />
                            </TableHead>
                            <TableHead>Warranty</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="inline-flex justify-center items-center gap-1 ">
                                Duration
                                <ArrowUpDown size={14} />
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
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
                                <TableRow key={r.sku}>
                                    <TableCell>
                                        <Checkbox
                                            aria-label={`Select ${r.status}`}
                                            checked={selectedKeys.includes(r.sku)}
                                            onCheckedChange={(checked) => {
                                                setSelectedKeys((prev) => {
                                                    if (checked) {
                                                        if (prev.includes(r.sku)) return prev;
                                                        return [...prev, r.sku];
                                                    }
                                                    return prev.filter((id) => id !== r.sku);
                                                });
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{r.name}</TableCell>
                                    <TableCell className="text-slate-500">
                                        {r.description}
                                    </TableCell>
                                    <TableCell className="text-slate-500">
                                        {r.durationValue} {r.durationUnit}
                                    </TableCell>
                                    <TableCell>
                                        <div className="bg-green-600 w-18 items-center rounded-lg text-white flex text-center h-5">
                                            <Dot className="-mr-3 -ml-2" size={40} /> {r.status}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="gap-2">
                                                    <Eye className="h-4 w-4" /> View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2">
                                                    <Edit className="h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="gap-2 text-destructive">
                                                    <Trash2 className="h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center text-sm text-muted-foreground">
                    <span className="p-4">Row per page:</span>
                    <Select
                        value={String(rowsPerPage)}
                        onValueChange={(value) => {
                            const num = Number(value);
                            setRowsPerPage(num);
                            setPage(1);
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
                                className={
                                    item === currentPage
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
            <Footer />
        </div>
    );
}
