import React, { useState, useRef } from "react";

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

import CATALOG_ROWS from "@/data/ProductData";
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
    const [store, setStore] = useState("all");
    const [warehouse, setWarehouse] = useState("all");
    const [loading] = useState(false);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const [selectedSkus, setSelectedSkus] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    // NEW: add-product modal
    const [addOpen, setAddOpen] = useState(false);

    const fileInputRef = useRef(null);

    const viewFields = [
        { key: "warehouse", label: "Warehouse" },
        { key: "store", label: "Store" },
        { key: "name", label: "Product Name" },
        { key: "category", label: "Category" },
        { key: "sku", label: "SKU" },
        { key: "manufacturedDate", label: "Date" },
        { key: "person", label: "Person Name" },
        { key: "qty", label: "Quantity" },
    ];

    const formFields = [
        { name: "warehouse", label: "Warehouse", type: "text" },
        { name: "store", label: "Store", type: "text" },
        { name: "name", label: "Product Name", type: "text", required: true },
        { name: "category", label: "Category", type: "text" },
        { name: "sku", label: "SKU", type: "text" },
        { name: "manufacturedDate", label: "Date", type: "text" },
        { name: "person", label: "Person Name", type: "text" },
        { name: "qty", label: "Quantity", type: "number" },
    ];

    const handleEditSave = (updated) => {
        console.log("Updated manage stock item", updated);
    };

    const handleAddSave = (data) => {
        console.log("New manage stock item", data);
    };

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

    /** ------------------------------
     * FILTER LOGIC (Table + Export)
     * ------------------------------ */
    const filtered = CATALOG_ROWS.filter((r) => {
        const s = search.toLowerCase();

        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.store.toLowerCase().includes(s);

        const matchStore = store === "all" || r.store === store;
        const matchWarehouse = warehouse === "all" || r.warehouse === warehouse;

        return matchSearch && matchStore && matchWarehouse;
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

    /** -----------------------------------------
     * EXPORT FILTERED ROWS (WITHOUT PAGINATION)
     * ----------------------------------------- */
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
            `Manage Stock Export (${fullFilteredRows.length} items)`,
            14,
            15
        );
        doc.save("manage_stock.pdf");
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "ManageStock");

        XLSX.writeFile(workbook, "manage_stock.xlsx");
    };

    /** REFRESH — reset filters only */
    const handleRefresh = () => {
        setSearch("");
        setCategory("all");
        setStore("all");
        setWarehouse("all");
        setPage(1);
    };

    return (
        <div className="space-y-4">
            <ProductsDate />

            <div className="flex">
                <ProductHeader
                    title="Manage Stock"
                    breadcrumbs={[
                        { label: "Dashboard" },
                        { label: "Manage Stock", active: true },
                    ]}
                />

                <div className="flex gap-2">
                    <ExportsButtons
                        onExportPdf={handleExportPdf}
                        onExportXls={handleExportXls}
                        onRefresh={handleRefresh}
                    />

                    {/* Add / Import buttons */}
                    <AddImport
                        onAddClick={() => {
                            setSelectedItem(null);
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
                                <SelectItem value="Cool Warehouse">Cool Warehouse</SelectItem>
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

                        <Select value={store} onValueChange={setStore}>
                            <SelectTrigger className="w-42.5 dark:bg-slate-900">
                                <SelectValue placeholder="Store" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Store</SelectItem>
                                <SelectItem value="Electro Mart">Electro Mart</SelectItem>
                                <SelectItem value="Quantum Gadgets">
                                    Quantum Gadgets
                                </SelectItem>
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

                            <TableHead>Warehouse</TableHead>
                            <TableHead>Store</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Person Name</TableHead>
                            <TableHead>Qty</TableHead>
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

                                    <TableCell className="font-medium">
                                        {r.warehouse}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{r.store}</span>
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
                                            <span className="text-sm dark:text-slate-400 text-slate-800">
                                                {r.name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>{r.manufacturedDate}</TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7">
                                                <AvatarImage src={r.personImg} alt={r.person} />
                                                <AvatarFallback>
                                                    {r.person
                                                        ? r.person
                                                            .split(" ")
                                                            .map((w) => w[0])
                                                            .join("")
                                                            .slice(0, 2)
                                                        : "UN"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{r.person}</span>
                                        </div>
                                    </TableCell>

                                    <TableCell>{r.qty}</TableCell>

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
                title="Manage stock details"
                description="Quick view of the manage stock information."
                data={selectedItem}
                fields={viewFields}
                imageSrc={selectedItem?.image}
                imageAlt={selectedItem?.name}
            />

            {/* Add modal */}
            <DynamicFormModal
                open={addOpen}
                onOpenChange={setAddOpen}
                title="Add manage stock"
                description="Create a new manage stock entry."
                initialData={{}}
                fields={formFields}
                onSubmit={handleAddSave}
            />

            {/* Edit modal */}
            <DynamicFormModal
                open={editOpen}
                onOpenChange={setEditOpen}
                title="Edit manage stock"
                description="Update the manage stock information."
                initialData={selectedItem || {}}
                fields={formFields}
                onSubmit={handleEditSave}
            />

            <Footer />
        </div>
    );
}
