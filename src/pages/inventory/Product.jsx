// src/pages/inventory/Product.jsx
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

// new: dynamic modals
import DynamicViewModal from "@/components/common/DynamicViewModal";
import DynamicFormModal from "@/components/common/DynamicFormModal";

export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [brand, setBrand] = useState("all");
    const [loading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    // track selected rows by SKU
    const [selectedSkus, setSelectedSkus] = useState([]);

    // modal state
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    // which fields to show in the view modal
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

    // which fields to show in the edit modal
    const formFields = [
        { name: "name", label: "Product Name", type: "text", required: true },
        { name: "sku", label: "SKU", type: "text", required: true },
        { name: "category", label: "Category", type: "text" },
        { name: "brand", label: "Brand", type: "text" },
        { name: "price", label: "Price", type: "number" },
        { name: "unit", label: "Unit", type: "text" },
        { name: "qty", label: "Quantity", type: "number" },
    ];

    // handle save from edit modal
    const handleEditSave = (updated) => {
        // here you can call API or update local PRODUCT_ROWS state
        console.log("Updated product", updated);
    };

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

    // pagination logic
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // rows for current page only
    const paginatedRows = filtered.slice(startIndex, endIndex);

    // selection status for the current page
    const allSelectedOnPage =
        paginatedRows.length > 0 &&
        paginatedRows.every((r) => selectedSkus.includes(r.sku));

    const someSelectedOnPage =
        paginatedRows.some((r) => selectedSkus.includes(r.sku)) &&
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
            <div className="flex">
                <ProductHeader
                    title="Products"
                    breadcrumbs={[
                        { label: "Dashboard" },
                        { label: "Products", active: true },
                    ]}
                />
                <div className="flex gap-2">
                    <ExportsButtons />
                    <AddImport />
                </div>
            </div>

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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-2 dark:bg-slate-900">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>CSV</DropdownMenuItem>
                            <DropdownMenuItem>Excel</DropdownMenuItem>
                            <DropdownMenuItem>PDF</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-200 dark:bg-slate-800">
                            <TableHead className="w-10">
                                {/* HEADER CHECKBOX: select/unselect all on current page */}
                                <Checkbox
                                    aria-label="Select all on this page"
                                    checked={
                                        allSelectedOnPage
                                            ? true
                                            : someSelectedOnPage
                                                ? "indeterminate"
                                                : false
                                    }
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            // add all current page SKUs
                                            const pageSkus = paginatedRows.map((r) => r.sku);
                                            setSelectedSkus((prev) =>
                                                Array.from(new Set([...prev, ...pageSkus]))
                                            );
                                        } else {
                                            // remove current page SKUs only
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
                                        {/* ROW CHECKBOX: bound to selectedSkus */}
                                        <Checkbox
                                            aria-label={`Select ${r.id}`}
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
                                                <AvatarImage
                                                    src={r.user?.avatar}
                                                    alt={r.user?.name}
                                                />
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
                    <span>Row per page:</span>
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

            {/* dynamic modals */}
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


            <DynamicFormModal
                open={editOpen}
                onOpenChange={setEditOpen}
                title="Edit product"
                description="Update the product information."
                initialData={selectedProduct || {}}
                fields={formFields}
                onSubmit={handleEditSave}
            />

            <Footer />
        </div>
    );
}
