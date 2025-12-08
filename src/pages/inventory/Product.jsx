import React, { useRef, useState } from "react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    MoreHorizontal,
    Filter,
    Download,
    Search,
    Loader2,
    Edit,
    Eye,
    Trash2,
} from "lucide-react";

import PRODUCT_ROWS from "@/data/ProductData";
import ProductHeader from "@/components/ui/ProductHeader";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ExportsButtons from "@/components/ui/ExportsButtons";
import AddImport from "@/components/ui/AddImport";

// dynamic modals
import DynamicViewModal from "@/components/common/DynamicViewModal";
import DynamicFormModal from "@/components/common/DynamicFormModal";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [brand, setBrand] = useState("all");
    const [loading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const [selectedSkus, setSelectedSkus] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const fileInputRef = useRef(null);

    const viewFields = [
        { key: "sku", label: "SKU" },
        { key: "name", label: "Product Name" },
        { key: "category", label: "Category" },
        { key: "brand", label: "Brand" },
        { key: "price", label: "Price" },
        { key: "unit", label: "Unit" },
        { key: "qty", label: "Quantity" },
        {
            key: "user",
            label: "Created By",
            render: (val) => (val?.name ? val.name : "-"),
        },
    ];

    const formFields = [
        { name: "name", label: "Product Name", type: "text", required: true },
        { name: "sku", label: "SKU", type: "text", required: true },
        { name: "category", label: "Category", type: "text" },
        { name: "brand", label: "Brand", type: "text" },
        { name: "price", label: "Price", type: "number" },
        { name: "unit", label: "Unit", type: "text" },
        { name: "qty", label: "Quantity", type: "number" },
    ];

    const handleEditSave = (updated) => {
        console.log("Updated product", updated);
    };

    const handleAddSave = (data) => {
        console.log("New product", data);
    };

    const [deletingId, setDeletingId] = useState(null);
    const [rows, setRows] = useState(PRODUCT_ROWS);

    // reusable delete handler
    const handleDelete = async (rowId, labelForConfirm = "") => {
        const ok = window.confirm(
            labelForConfirm
                ? `Are you sure you want to delete "${labelForConfirm}"?`
                : "Are you sure you want to delete this item?"
        );
        if (!ok) return;

        try {
            setDeletingId(rowId);

            // TODO: replace with the real API call
            // example:
            // await api.delete(`/-endpoint/${rowId}`);
            console.log("Delete request sent for id:", rowId);

            setRows((prev) => prev.filter((row) => row.id !== rowId));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete item. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };


    /** ------------------------------
     * FILTER LOGIC (Table + Export)
     * ------------------------------ */
    const filtered = PRODUCT_ROWS.filter((r) => {
        const s = search.toLowerCase();

        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.brand.toLowerCase().includes(s);

        const matchCategory = category === "all" || r.category === category;

        const matchBrand = brand === "all" || r.brand === brand;

        return matchSearch && matchCategory && matchBrand;
    });

    /** ------------------------------
     * PAGINATION
     * ------------------------------ */
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = filtered.slice(startIndex, endIndex);

    /** Checkbox selection */
    const allSelectedOnPage =
        paginatedRows.length > 0 &&
        paginatedRows.every((r) => selectedSkus.includes(r.sku));

    const someSelectedOnPage =
        paginatedRows.some((r) => selectedSkus.includes(r.sku)) &&
        !allSelectedOnPage;

    /** page list */
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

    /** IMPORT HANDLERS */
    const handleImportButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const allowedExt = /\.(csv|xls|xlsx|pdf)$/i;
        const invalid = files.some((file) => !allowedExt.test(file.name));

        if (invalid) {
            alert("Only CSV, XLS, XLSX and PDF files are allowed.");
            e.target.value = "";
            return;
        }

        console.log("Files selected for import:", files);

        e.target.value = "";
    };

    /** -----------------------------------------
     * EXPORT FILTERED ROWS (WITHOUT PAGINATION)
     * ----------------------------------------- */
    const fullFilteredRows = filtered;

    /** PDF Export (FILTERED) */
    const handleExportPdf = () => {
        const doc = new jsPDF();

        const tableColumn = ["SKU", "Name", "Category", "Brand", "Price", "Unit", "Qty"];
        const tableRows = [];

        fullFilteredRows.forEach((item) => {
            tableRows.push([
                item.sku,
                item.name,
                item.category,
                item.brand,
                `$${item.price}`,
                item.unit,
                item.qty,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(`Products Export (${fullFilteredRows.length} items)`, 14, 15);
        doc.save("products.pdf");
    };

    /** Excel Export (FILTERED) */
    const handleExportXls = () => {
        const data = fullFilteredRows.map((item) => ({
            SKU: item.sku,
            Name: item.name,
            Category: item.category,
            Brand: item.brand,
            Price: item.price,
            Unit: item.unit,
            Qty: item.qty,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

        XLSX.writeFile(workbook, "products.xlsx");
    };

    /** -----------------------------------------
     * EXPORT CURRENT PAGE (PAGINATED DATA)
     * ----------------------------------------- */

    /** CSV Export (CURRENT PAGE) */
    const handleExportCurrentCsv = () => {
        const data = paginatedRows.map((item) => ({
            SKU: item.sku,
            Name: item.name,
            Category: item.category,
            Brand: item.brand,
            Price: item.price,
            Unit: item.unit,
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
        link.setAttribute("download", `products_page_${currentPage}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    /** PDF Export (CURRENT PAGE) */
    const handleExportCurrentPdf = () => {
        const doc = new jsPDF();

        const tableColumn = ["SKU", "Name", "Category", "Brand", "Price", "Unit", "Qty"];
        const tableRows = [];

        paginatedRows.forEach((item) => {
            tableRows.push([
                item.sku,
                item.name,
                item.category,
                item.brand,
                `$${item.price}`,
                item.unit,
                item.qty,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Products Export - Page ${currentPage} (${paginatedRows.length} items)`,
            14,
            15
        );
        doc.save(`products_page_${currentPage}.pdf`);
    };

    /** Excel Export (CURRENT PAGE) */
    const handleExportCurrentXls = () => {
        const data = paginatedRows.map((item) => ({
            SKU: item.sku,
            Name: item.name,
            Category: item.category,
            Brand: item.brand,
            Price: item.price,
            Unit: item.unit,
            Qty: item.qty,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products_Page");

        XLSX.writeFile(workbook, `products_page_${currentPage}.xlsx`);
    };

    const handleRefresh = () => {
        setSearch("");
        setCategory("all");
        setBrand("all");
        setPage(1);
    };

    return (
        <div className="space-y-4">
            <ProductsDate />

            <div className="flex">
                <ProductHeader
                    title="Products"
                    breadcrumbs={[
                        { label: "Dashboard" },
                        { label: "Products", active: true },
                    ]}
                />

                <div className="flex gap-2">
                    <ExportsButtons
                        onExportPdf={handleExportPdf}
                        onExportXls={handleExportXls}
                        onRefresh={handleRefresh}
                    />

                    <AddImport
                        onAddClick={() => {
                            setSelectedProduct(null);
                            setAddOpen(true);
                        }}
                        onImportClick={handleImportButtonClick}
                    />
                </div>
            </div>

            {/* Hidden file input for Import Product */}
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
                <div className="flex min-w-[260px] flex-1 items-center gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="Search product, SKU, brand"
                            className="pl-8 dark:bg-slate-900"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Category */}
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

                    {/* Brand */}
                    <Select value={brand} onValueChange={setBrand}>
                        <SelectTrigger className="w-42.5 dark:bg-slate-900">
                            <SelectValue placeholder="Brand" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Brands</SelectItem>
                            <SelectItem value="Lenovo">Lenovo</SelectItem>
                            <SelectItem value="Beats">Beats</SelectItem>
                            <SelectItem value="Nike">Nike</SelectItem>
                            <SelectItem value="Apple">Apple</SelectItem>
                            <SelectItem value="Amazon">Amazon</SelectItem>
                            <SelectItem value="Modern Wave">Modern Wave</SelectItem>
                            <SelectItem value="Berry">Berry</SelectItem>
                            <SelectItem value="Anime">Anime</SelectItem>
                            <SelectItem value="The North Face">The North Face</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-2 dark:bg-slate-900">
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>

                    {/* PAGINATED EXPORT DROPDOWN (CURRENT PAGE) */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-2 dark:bg-slate-900">
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
                                            const pageSet = new Set(paginatedRows.map((r) => r.sku));
                                            setSelectedSkus((prev) =>
                                                prev.filter((sku) => !pageSet.has(sku))
                                            );
                                        }
                                    }}
                                />
                            </TableHead>

                            <TableHead>SKU</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead className="text-right">Qty</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead className="w-15 text-right">Actions</TableHead>
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
                                            checked={selectedSkus.includes(r.sku)}
                                            onCheckedChange={(checked) => {
                                                setSelectedSkus((prev) => {
                                                    if (checked) {
                                                        if (prev.includes(r.sku)) return prev;
                                                        return [...prev, r.sku];
                                                    }
                                                    return prev.filter((sku) => sku !== r.sku);
                                                });
                                            }}
                                        />
                                    </TableCell>

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
                                                <span className="text-xs text-muted-foreground">
                                                    #{r.sku}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <Badge variant="secondary" className="font-normal">
                                            {r.category}
                                        </Badge>
                                    </TableCell>

                                    <TableCell>{r.brand}</TableCell>

                                    <TableCell className="text-right">${r.price}</TableCell>

                                    <TableCell>{r.unit}</TableCell>

                                    <TableCell className="text-right">{r.qty}</TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={r.user?.avatar} alt={r.user?.name} />
                                                <AvatarFallback>
                                                    {r.user?.name
                                                        ? r.user.name
                                                            .split(" ")
                                                            .map((w) => w[0])
                                                            .join("")
                                                            .slice(0, 2)
                                                        : "UN"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{r.user?.name}</span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-right">
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
                                                        setSelectedProduct(r);
                                                        setViewOpen(true);
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4" /> View
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    className="gap-2"
                                                    onClick={() => {
                                                        setSelectedProduct(r);
                                                        setEditOpen(true);
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" /> Edit
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    className="gap-2 text-destructive"
                                                    onClick={() => handleDelete(r.sku, r.name)}
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
                    <span>Row per page:</span>

                    <Select
                        value={String(rowsPerPage)}
                        onValueChange={(value) => {
                            setRowsPerPage(Number(value));
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
                title="Product details"
                description="Quick view of the product information."
                data={selectedProduct}
                fields={viewFields}
                imageSrc={selectedProduct?.image}
                imageAlt={selectedProduct?.name}
            />

            {/* Edit modal */}
            <DynamicFormModal
                open={editOpen}
                onOpenChange={setEditOpen}
                title="Edit product"
                description="Update the product information."
                initialData={selectedProduct || {}}
                fields={formFields}
                onSubmit={handleEditSave}
            />

            {/* Add modal */}
            <DynamicFormModal
                open={addOpen}
                onOpenChange={setAddOpen}
                title="Add product"
                description="Create a new product entry."
                initialData={{}}
                fields={formFields}
                onSubmit={handleAddSave}
            />

            <Footer />
        </div>
    );
}
