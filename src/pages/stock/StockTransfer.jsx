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
    Download,
    PlusCircle,
} from "lucide-react";

import ProductHeader from "@/components/ui/ProductHeader";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ExportsButtons from "@/components/ui/ExportsButtons";
import ButtonComponent from "@/components/ui/ChangeButton";

// dynamic modals
import DynamicViewModal from "@/components/common/DynamicViewModal";
import DynamicFormModal from "@/components/common/DynamicFormModal";

import {
    useStockTransfer,
    STOCK_TRANSFER_VIEW_FIELDS,
    STOCK_TRANSFER_FORM_FIELDS,
} from "./logic/useStockTransfer";

export { STOCK_TRANSFER_VIEW_FIELDS, STOCK_TRANSFER_FORM_FIELDS };

export default function ProductsPage() {
    const {
        search,
        setSearch,
        loading,

        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        totalPages,
        currentPage,
        paginatedRows,
        pageItems,

        selectedIds,
        allSelectedOnPage,
        someSelectedOnPage,
        handleToggleAllOnPage,
        handleToggleRow,

        selectedItem,
        setSelectedItem,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        addOpen,
        setAddOpen,

        viewFields,
        transferFormFields,
        handleEditSave,
        handleAddSave,

        handleExportPdf,
        handleExportXls,
        handleExportCurrentCsv,
        handleExportCurrentPdf,
        handleExportCurrentXls,
        handleRefresh,

        fileInputRef,
        handleImportClick,
        handleFileChange,
        handleAddClick,
        handleDelete,
        deletingId,
    } = useStockTransfer();

    return (
        <div className="space-y-4">
            <ProductsDate />

            <div className="flex">
                <ProductHeader
                    title="Stock Transfer"
                    breadcrumbs={[
                        { label: "Dashboard" },
                        { label: "Stock Transfer", active: true },
                    ]}
                />

                <div className="flex gap-2">
                    <ExportsButtons
                        onExportPdf={handleExportPdf}
                        onExportXls={handleExportXls}
                        onRefresh={handleRefresh}
                    />

                    <ButtonComponent
                        title="Add Transfer"
                        icon={<PlusCircle className="mr-2 h-4 w-4" />}
                        onClick={handleAddClick}
                        className="bg-[#0b5ed7] mt-2.5 text-white hover:bg-[#0a58ca]"
                    />

                    <ButtonComponent
                        title="Import Transfer"
                        icon={<Download className="mr-2 h-4 w-4" />}
                        onClick={handleImportClick}
                        className="bg-[#28a745] mt-2.5 text-white hover:bg-[#218838]"
                    />
                </div>
            </div>

            {/* Hidden file input for Import */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xls,.xlsx,.pdf"
                multiple
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-white dark:bg-slate-800 p-3">
                <div className="flex w-full flex-1 items-center gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search warehouse, reference, SKU"
                            className="pl-8 bg-slate-100 dark:bg-slate-900"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
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
                                    onCheckedChange={handleToggleAllOnPage}
                                />
                            </TableHead>

                            <TableHead>From Warehouse</TableHead>
                            <TableHead>To Warehouse</TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>No of Products</span>
                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>Quantity Transfer</span>
                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>Reference Number</span>
                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>Date</span>
                                    <ArrowUpDown className="h-3.5 w-3.5" />
                                </div>
                            </TableHead>
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
                        ) : paginatedRows.length === 0 ? (
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
                                    <TableCell>{r.warehouse}</TableCell>
                                    <TableCell>{r.toWareHouse}</TableCell>
                                    <TableCell>{r.locationQty}</TableCell>
                                    <TableCell>{r.qtyAlert}</TableCell>
                                    <TableCell>{r.refNumber}</TableCell>
                                    <TableCell>{r.manufacturedDate}</TableCell>
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
                                                    onClick={() => {
                                                        setSelectedItem(r);
                                                        setViewOpen(true);
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4" /> View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2"
                                                    onClick={() => {
                                                        setSelectedItem(r);
                                                        setEditOpen(true);
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="gap-2 text-destructive"
                                                    onClick={() => handleDelete(r.id, r.warehouse)}
                                                    disabled={deletingId === r.id}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    {deletingId === r.id ? "Deleting..." : "Delete"}
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

            {/* View modal */}
            <DynamicViewModal
                open={viewOpen}
                onOpenChange={setViewOpen}
                title="Stock transfer details"
                description="Quick view of the stock transfer information."
                data={selectedItem}
                fields={viewFields}
            />

            {/* Add modal */}
            <DynamicFormModal
                open={addOpen}
                onOpenChange={setAddOpen}
                title="Add transfer"
                description="Create a new stock transfer entry."
                initialData={{}}
                fields={transferFormFields}
                onSubmit={handleAddSave}
            />

            {/* Edit modal */}
            <DynamicFormModal
                open={editOpen}
                onOpenChange={setEditOpen}
                title="Edit transfer"
                description="Update the stock transfer information."
                initialData={selectedItem || {}}
                fields={transferFormFields}
                onSubmit={handleEditSave}
            />

            <Footer />
        </div>
    );
}
