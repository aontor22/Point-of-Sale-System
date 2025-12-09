import StatView from "@/components/view/repStatView";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { Loader2, ArrowUpDown } from "lucide-react";

import PRODUCT_ROWS from "@/data/ProductData";
import SalesCat from "@/components/ui/SalesCat";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ExportsButtonSale from "@/components/ui/ExportButtonSale";
import ProductsHeader from "@/components/ui/ProductHeader";
import RefreshButtons from "@/components/ui/RefreshButton";

export default function SaleReports() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [brand, setBrand] = React.useState("all");
    const [loading] = React.useState(false);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [salesFilter, setSalesFilter] = useState({
        startDate: null,
        endDate: null,
        store: "All",
        product: "All",
    });

    const handleGenerateReport = ({ startDate, endDate, store, product }) => {
        setSalesFilter({
            startDate,
            endDate,
            store,
            product,
        });

        setDateRange([startDate, endDate]);
    };

    // -------------------------------------------
    //              MAIN FILTER LOGIC
    // -------------------------------------------

    const filtered = PRODUCT_ROWS.filter((r) => {
        const s = search.toLowerCase();

        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.brand.toLowerCase().includes(s);

        const matchCat = category === "all" || r.category === category;
        const matchBrand = brand === "all" || r.brand === brand;

        let matchStore = true;
        if (salesFilter.store !== "All") {
            const storeValue = r.store || r.brand;
            matchStore = storeValue === salesFilter.store;
        }

        let matchProduct = true;
        if (salesFilter.product !== "All") {
            matchProduct =
                r.name === salesFilter.product || r.sku === salesFilter.product;
        }
        let matchDate = true;

        const rowDate = r.date ? new Date(r.date) : null;

        const start = salesFilter.startDate || startDate;
        const end = salesFilter.endDate || endDate;

        if (rowDate && (start || end)) {
            let record = new Date(rowDate);

            if (isNaN(record.getTime())) matchDate = false;

            if (start && record < new Date(start)) matchDate = false;

            if (end) {
                const inclusiveEnd = new Date(end);
                inclusiveEnd.setHours(23, 59, 59, 999);
                if (record > inclusiveEnd) matchDate = false;
            }
        }

        return (
            matchSearch &&
            matchCat &&
            matchBrand &&
            matchStore &&
            matchProduct &&
            matchDate
        );
    });

    // -------------------------------------------
    //                 PAGINATION
    // -------------------------------------------
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedRows = filtered.slice(startIndex, endIndex);

    const makePageList = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (start > 2) pages.push("ellipsis-start");
            for (let i = start; i <= end; i++) pages.push(i);
            if (end < totalPages - 1) pages.push("ellipsis-end");

            pages.push(totalPages);
        }

        return pages;
    };

    const pageItems = makePageList();

    const handleRefreshAll = () => {
        setSearch("");
        setCategory("all");
        setBrand("all");
        setDateRange([null, null]);
        setRowsPerPage(10);
        setPage(1);

        setSalesFilter({
            startDate: null,
            endDate: null,
            store: "All",
            product: "All",
        });
    };

    // -------------------------------------------
    //            COMPONENT RENDER
    // -------------------------------------------

    return (
        <div className="space-y-4">
            <ProductsDate
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => setDateRange(dates)}
            />

            <div className="flex">
                <ProductsHeader
                    title="Sales Report"
                    breadcrumbs={[
                        { label: "Dashboard" },
                        { label: "Sales Report", active: true },
                    ]}
                />
                <RefreshButtons onRefresh={handleRefreshAll} />
            </div>

            {/* Stat cards */}
            <div className="space-y-4">
                <StatView />
            </div>

            {/* SalesCat filter */}
            <div className="space-y-4">
                <SalesCat onGenerate={handleGenerateReport} />
            </div>

            {/* Table */}
            <div className="flex-1 items-center justify-between gap-3 overflow-hidden rounded-md border bg-background dark:bg-slate-900 p-5">
                <div className="flex items-center gap-2 pb-4 w-full">
                    <h3 className="text-lg font-semibold">Sales Report</h3>

                    <div className="ml-auto flex items-center gap-2">
                        <ExportsButtonSale />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-200 dark:bg-slate-800">
                            <TableHead>SKU</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>Sold Qty</span>
                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>Sold Amount</span>
                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>Instock Qty</span>
                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                </div>
                            </TableHead>
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

                                    <TableCell>{r.brand}</TableCell>

                                    <TableCell>
                                        <Badge variant="secondary" className="font-normal">
                                            {r.category}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>{r.soldQty}</TableCell>
                                    <TableCell>{r.soldAmount}</TableCell>
                                    <TableCell>{r.instockQty}</TableCell>
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
                        onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
