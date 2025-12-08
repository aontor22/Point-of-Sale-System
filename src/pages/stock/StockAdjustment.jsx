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
    Download,
} from "lucide-react";

import CATALOG_ROWS from "@/data/ProductData";
import ProductHeader from "@/components/ui/ProductHeader";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ExportsButtons from "@/components/ui/ExportsButtons";
import AddBrand from "@/components/ui/AddBrand";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [warehouse, setWarehouse] = useState("all");
    const [loading] = useState(false);

    const filtered = CATALOG_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.warehouse.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.store.toLowerCase().includes(s);
        const matchWarehouse = warehouse === "all" || r.warehouse === warehouse;
        return matchSearch && matchWarehouse;
    });

    // pagination
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

    // selection
    const [selectedIds, setSelectedIds] = useState([]);
    const currentPageIds = paginatedRows.map((r) => r.sku);

    const allSelectedOnPage =
        currentPageIds.length > 0 &&
        currentPageIds.every((id) => selectedIds.includes(id));

    const someSelectedOnPage =
        currentPageIds.some((id) => selectedIds.includes(id)) &&
        !allSelectedOnPage;

    const handleToggleAllOnPage = (checked) => {
        if (checked) {
            setSelectedIds((prev) =>
                Array.from(new Set([...prev, ...currentPageIds]))
            );
        } else {
            const pageSet = new Set(currentPageIds);
            setSelectedIds((prev) => prev.filter((id) => !pageSet.has(id)));
        }
    };

    const handleToggleRow = (id, checked) => {
        setSelectedIds((prev) => {
            if (checked) {
                if (prev.includes(id)) return prev;
                return [...prev, id];
            }
            return prev.filter((item) => item !== id);
        });
    };

    /** ---------- FILTERED EXPORT (all filtered rows) ---------- */
    const fullFilteredRows = filtered;

    const handleExportPdf = () => {
        const doc = new jsPDF();

        const tableColumn = [
            "Warehouse",
            "Store",
            "Product",
            "Date",
            "Person",
            "Qty",
        ];
        const tableRows = [];

        fullFilteredRows.forEach((item) => {
            tableRows.push([
                item.warehouse,
                item.store,
                item.name,
                item.manufacturedDate,
                item.person,
                item.qty,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Stock Adjustment Export (${fullFilteredRows.length} items)`,
            14,
            15
        );
        doc.save("stock_adjustment.pdf");
    };

    const handleExportXls = () => {
        const data = fullFilteredRows.map((item) => ({
            Warehouse: item.warehouse,
            Store: item.store,
            Product: item.name,
            Date: item.manufacturedDate,
            Person: item.person,
            Qty: item.qty,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "StockAdjustment");

        XLSX.writeFile(workbook, "stock_adjustment.xlsx");
    };

    /** ---------- CURRENT PAGE EXPORT (paginated rows) ---------- */
    const handleExportCurrentCsv = () => {
        const data = paginatedRows.map((item) => ({
            Warehouse: item.warehouse,
            Store: item.store,
            Product: item.name,
            Date: item.manufacturedDate,
            Person: item.person,
            Qty: item.qty,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            `stock_adjustment_page_${currentPage}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExportCurrentPdf = () => {
        const doc = new jsPDF();

        const tableColumn = [
            "Warehouse",
            "Store",
            "Product",
            "Date",
            "Person",
            "Qty",
        ];
        const tableRows = [];

        paginatedRows.forEach((item) => {
            tableRows.push([
                item.warehouse,
                item.store,
                item.name,
                item.manufacturedDate,
                item.person,
                item.qty,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Stock Adjustment - Page ${currentPage} (${paginatedRows.length} items)`,
            14,
            15
        );
        doc.save(`stock_adjustment_page_${currentPage}.pdf`);
    };

    const handleExportCurrentXls = () => {
        const data = paginatedRows.map((item) => ({
            Warehouse: item.warehouse,
            Store: item.store,
            Product: item.name,
            Date: item.manufacturedDate,
            Person: item.person,
            Qty: item.qty,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "StockAdjustment_Page");

        XLSX.writeFile(
            workbook,
            `stock_adjustment_page_${currentPage}.xlsx`
        );
    };

    const handleRefresh = () => {
        setSearch("");
        setWarehouse("all");
        setPage(1);
    };

    return (
        <div className="space-y-4">
            <ProductsDate />
            <div className="flex">
                <ProductHeader
                    title="Stock Adjustment"
                    breadcrumbs={[
                        { label: "Dashboard" },
                        { label: "Stock Adjustment", active: true },
                    ]}
                />
                <div className="flex gap-2">
                    <ExportsButtons
                        onExportPdf={handleExportPdf}
                        onExportXls={handleExportXls}
                        onRefresh={handleRefresh}
                    />
                    <AddBrand />
                </div>
            </div>

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
                        <Select value={warehouse} onValueChange={setWarehouse}>
                            <SelectTrigger className="w-42.5 dark:bg-slate-900">
                                <SelectValue placeholder="Warehouse" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Warehouse</SelectItem>
                                <SelectItem value="Lavish Warehouse">
                                    Lavish Warehouse
                                </SelectItem>
                                <SelectItem value="Quaint Warehouse">
                                    Quaint Warehouse
                                </SelectItem>
                                <SelectItem value="Traditional Warehouse">
                                    Traditional Warehouse
                                </SelectItem>
                                <SelectItem value="Cool Warehouse">
                                    Cool Warehouse
                                </SelectItem>
                                <SelectItem value="Overflow Warehouse">
                                    Overflow Warehouse
                                </SelectItem>
                                <SelectItem value="Nova Storage Hub">
                                    Nova Storage Hub
                                </SelectItem>
                                <SelectItem value="Retail Supply Hub">
                                    Retail Supply Hub
                                </SelectItem>
                                <SelectItem value="EdgeWare Solutions">
                                    EdgeWare Solutions
                                </SelectItem>
                                <SelectItem value="North Zone Warehouse">
                                    North Zone Warehouse
                                </SelectItem>
                                <SelectItem value="Fulfillment Hub">
                                    Fulfillment Hub
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* current-page export dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="gap-2 dark:bg-slate-900"
                                >
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem onClick={handleExportCurrentCsv}>
                                    CSV (this page)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExportCurrentXls}>
                                    Excel (this page)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExportCurrentPdf}>
                                    PDF (this page)
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
                                    onCheckedChange={handleToggleAllOnPage}
                                />
                            </TableHead>

                            <TableHead>Warehouse</TableHead>
                            <TableHead>Store</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead className="inline-flex justify-center items-center gap-1 ">
                                Date
                                <ArrowUpDown size={14} />
                            </TableHead>
                            <TableHead>Person Name</TableHead>
                            <TableHead>Qty</TableHead>
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
                                            aria-label={`Select ${r.sku}`}
                                            checked={selectedIds.includes(r.sku)}
                                            onCheckedChange={(checked) =>
                                                handleToggleRow(r.sku, checked)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {r.warehouse}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {r.store}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-sm bg-slate-100">
                                                <img
                                                    src={r.image}
                                                    alt={r.name}
                                                    className="h-6 w-6 object-contain"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <span className="text-sm text-slate-800 dark:text-slate-400">
                                                {r.name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>{r.manufacturedDate}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={r.personImg}
                                                alt={r.person}
                                                className="h-8 w-8 rounded-sm bg-slate-200 object-cover"
                                                loading="lazy"
                                            />
                                            {r.person}
                                        </div>
                                    </TableCell>
                                    <TableCell>{r.qty}</TableCell>
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
