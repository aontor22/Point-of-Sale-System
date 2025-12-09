import React from "react";

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
    Download,
} from "lucide-react";

import ProductHeader from "@/components/ui/ProductHeader";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ExportsButtons from "@/components/ui/ExportsButtons";

import DynamicViewModal from "@/components/common/DynamicViewModal";
import DynamicFormModal from "@/components/common/DynamicFormModal";

import { useCategory, CATEGORY_VIEW_FIELDS, CATEGORY_FORM_FIELDS } from "./logic/useCategory";

export { CATEGORY_VIEW_FIELDS, CATEGORY_FORM_FIELDS };

export default function Category() {
    const {
        search,
        setSearch,
        category,
        setCategory,
        loading,
        filtered,

        rowsPerPage,
        setRowsPerPage,
        currentPage,
        totalPages,
        pageItems,
        setPage,
        paginatedRows,

        selectedSkus,
        setSelectedSkus,
        allSelectedOnPage,
        someSelectedOnPage,

        selectedCategory,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        openView,
        openEdit,
        viewFields,
        formFields,
        handleEditSave,

        handleExportPdf,
        handleExportXls,
        handleExportCurrentCsv,
        handleExportCurrentPdf,
        handleExportCurrentXls,
        handleRefresh,

        // delete
        handleDelete,
        deletingId,

        // dates
        startDate,
        endDate,
        setDateRange,
    } = useCategory();

    return (
        <div className="space-y-4">
            <ProductsDate
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => setDateRange(dates)}
            />
            <div className="flex">
                <ProductHeader
                    title="Category"
                    breadcrumbs={[
                        { label: "Dashboard" },
                        { label: "Category", active: true },
                    ]}
                />
                <div className="flex gap-2">
                    <ExportsButtons
                        onExportPdf={handleExportPdf}
                        onExportXls={handleExportXls}
                        onRefresh={handleRefresh}
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-white dark:bg-slate-800 p-3">
                <div className="flex w-full flex-1 items-center gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search product category, category slug "
                            className="pl-8 bg-slate-100 dark:bg-slate-900"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="ml-auto">
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-42.5 dark:bg-slate-900">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* paginated export dropdown */}
                <div className="flex items-center gap-2">
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

            {/* Table */}
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
                                            const pageSkus = paginatedRows.map((r) => r.sku);
                                            setSelectedSkus((prev) =>
                                                Array.from(new Set([...prev, ...pageSkus]))
                                            );
                                        } else {
                                            const pageSet = new Set(
                                                paginatedRows.map((r) => r.sku)
                                            );
                                            setSelectedSkus((prev) =>
                                                prev.filter((sku) => !pageSet.has(sku))
                                            );
                                        }
                                    }}
                                />
                            </TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Category Slug</TableHead>
                            <TableHead className="inline-flex justify-center items-center gap-1 ">
                                Created On <ArrowUpDown size={14} />
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
                                            aria-label={`Select ${r.category}`}
                                            checked={selectedSkus.includes(r.sku)}
                                            onCheckedChange={(checked) => {
                                                setSelectedSkus((prev) => {
                                                    if (checked) {
                                                        if (prev.includes(r.sku)) return prev;
                                                        return [...prev, r.sku];
                                                    }
                                                    return prev.filter(
                                                        (sku) => sku !== r.sku
                                                    );
                                                });
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {r.category}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {r.categorySlug}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{r.manufacturedDate}</TableCell>
                                    <TableCell>
                                        <div className="bg-green-600 w-18 items-center rounded-lg text-white flex text-center h-5">
                                            <Dot className="-mr-3 -ml-2" size={40} />{" "}
                                            {r.status}
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
                                                <DropdownMenuItem
                                                    className="gap-2"
                                                    onClick={() => openView(r)}
                                                >
                                                    <Eye className="h-4 w-4" /> View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2"
                                                    onClick={() => openEdit(r)}
                                                >
                                                    <Edit className="h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2 text-destructive"
                                                    onClick={() => handleDelete(r.sku, r.category)}
                                                    disabled={deletingId === r.sku}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    {deletingId === r.sku ? "Deleting..." : "Delete"}
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

            {/* Modals */}
            <DynamicViewModal
                open={viewOpen}
                onOpenChange={setViewOpen}
                title="Category details"
                description="Quick view of the category information."
                data={selectedCategory}
                fields={viewFields}
            />

            <DynamicFormModal
                open={editOpen}
                onOpenChange={setEditOpen}
                title="Edit category"
                description="Update the category information."
                initialData={selectedCategory || {}}
                fields={formFields}
                onSubmit={handleEditSave}
            />

            <Footer />
        </div>
    );
}
