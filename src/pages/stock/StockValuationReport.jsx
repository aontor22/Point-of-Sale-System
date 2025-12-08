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
} from "lucide-react";

import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import AddImport from "@/components/ui/AddImport";
import InventoryCard from "@/components/ui/stockValuationHeader";

import DynamicViewModal from "@/components/common/DynamicViewModal";
import DynamicFormModal from "@/components/common/DynamicFormModal";

import {
    useStockValuation,
    STOCK_VALUATION_VIEW_FIELDS,
    STOCK_VALUATION_FORM_FIELDS,
} from "./logic/useStockValuation";

export { STOCK_VALUATION_VIEW_FIELDS, STOCK_VALUATION_FORM_FIELDS };

export default function ProductsPage() {
    const {
        // filters
        search,
        setSearch,
        category,
        setCategory,
        store,
        setStore,
        // warehouse, setWarehouse, // currently unused in UI
        loading,

        // inventory summary
        inventoryValue,
        currentDate,

        // pagination
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        totalPages,
        currentPage,
        paginatedRows,
        pageItems,

        // selection
        selectedIds,
        allSelectedOnPage,
        someSelectedOnPage,
        handleToggleAllOnPage,
        handleToggleRow,

        // modals + current item
        selectedItem,
        setSelectedItem,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        addOpen,
        setAddOpen,

        // delete
        deletingId,
        handleDelete,

        // field configs + handlers
        viewFields,
        formFields,
        handleEditSave,
        handleAddSave,

        // import
        fileInputRef,
        handleImportClick,
        handleFileChange,
    } = useStockValuation();

    return (
        <div className="space-y-4">
            <ProductsDate />
            <InventoryCard inventoryValue={inventoryValue} date={currentDate} />

            {/* Hidden file input for Import */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xls,.xlsx,.pdf"
                multiple
                className="hidden"
                onChange={handleFileChange}
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
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-42.5 dark:bg-slate-900">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Computers">Computers</SelectItem>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Shoe">Shoe</SelectItem>
                                <SelectItem value="Furniture">Furniture</SelectItem>
                                <SelectItem value="Bags">Bags</SelectItem>
                                <SelectItem value="Phone">Phone</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={store} onValueChange={setStore}>
                            <SelectTrigger className="w-42.5 dark:bg-slate-900">
                                <SelectValue placeholder="Store" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        <AddImport
                            onAddClick={() => {
                                setSelectedItem(null);
                                setAddOpen(true);
                            }}
                            onImportClick={handleImportClick}
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
                            <TableHead>Product Name</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Cost Price</TableHead>
                            <TableHead>Total Value</TableHead>
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
                                    <TableCell>{r.name}</TableCell>
                                    <TableCell>{r.sku}</TableCell>
                                    <TableCell>{r.category}</TableCell>
                                    <TableCell>{r.qty}</TableCell>
                                    <TableCell>{r.costPrice.toFixed(2)}</TableCell>
                                    <TableCell>{r.totalPrice.toFixed(2)}</TableCell>
                                    <TableCell>{r.status}</TableCell>
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
                                                    onClick={() => handleDelete(r)}
                                                    disabled={deletingId === r.sku}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    {deletingId === r.sku
                                                        ? "Deleting..."
                                                        : "Delete"}
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
                title="Stock valuation details"
                description="Quick view of the stock valuation item."
                data={selectedItem}
                fields={viewFields}
                imageSrc={selectedItem?.image}
                imageAlt={selectedItem?.name}
            />

            {/* Add modal */}
            <DynamicFormModal
                open={addOpen}
                onOpenChange={setAddOpen}
                title="Add stock valuation item"
                description="Create a new stock valuation entry."
                initialData={{}}
                fields={formFields}
                onSubmit={handleAddSave}
            />

            {/* Edit modal */}
            <DynamicFormModal
                open={editOpen}
                onOpenChange={setEditOpen}
                title="Edit stock valuation item"
                description="Update the stock valuation information."
                initialData={selectedItem || {}}
                fields={formFields}
                onSubmit={handleEditSave}
            />

            <Footer />
        </div>
    );
}
