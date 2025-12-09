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
    Download,
    Plus,
    Mail,
    PhoneCall,
    Trash2,
    Edit,
    Eye,
    MoreHorizontal,
} from "lucide-react";

import users from "@/data/PurchaseReturnData";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ButtonComponent from "@/components/ui/ChangeButton";
import { useNavigate } from "react-router-dom";
import PurchasesOverview from "@/components/view/PurchasesOrderView";

// Modal Components
import DynamicViewModal from "@/components/common/DynamicViewModal";
import DynamicFormModal from "@/components/common/DynamicFormModal";

export const PRODUCT_VIEW_FIELDS = [
    { key: "prCode", label: "Order ID" },
    { key: "prSupplier", label: "Supplier" },
    { key: "prOrderDate", label: "Order Date" },
    { key: "prExpectedDelivery", label: "Expected Delivery" },
    { key: "prTotalItems", label: "Total Items" },
    { key: "prTotalAmount", label: "Total Amount" },
    { key: "prPriority", label: "Priority" },
    { key: "prStatus", label: "Status" },
    {
        key: "prCreatedBy",
        label: "Created By",
        render: (val) => (val?.name ? val.name : "-"),
    },
];

export const PRODUCT_FORM_FIELDS = [
    { name: "prCode", label: "Order ID", type: "text", required: true },
    { name: "prSupplier", label: "Supplier", type: "text", required: true },
    { name: "prOrderDate", label: "Order Date", type: "text" },
    { name: "prExpectedDelivery", label: "Expected Delivery", type: "text" },
    { name: "prTotalItems", label: "Total Items", type: "number" },
    { name: "prTotalAmount", label: "Total Amount", type: "number" },
    { name: "prPriority", label: "Priority", type: "text" },
    { name: "prStatus", label: "Status", type: "text" },
    { name: "prCreatedBy", label: "Created By", type: "text" },
];

export default function SaleReports() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [status, setStatus] = React.useState("all");
    const [loading] = React.useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [deletingId, setDeletingId] = useState(null);
    const [rows, setRows] = useState(users);

    const viewFields = PRODUCT_VIEW_FIELDS;
    const formFields = PRODUCT_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated product", updated);
        // TODO: PATCH / PUT API call here
    };

    const handleAddSave = (data) => {
        console.log("New product", data);
        // TODO: POST API call here
    };

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

            // TODO: replace with real API call
            console.log("Delete request sent for id:", rowId);

            setRows((prev) => prev.filter((row) => row.id !== rowId));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete item. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = users.filter((r) => {
        const s = search.toLowerCase();

        const matchSearch = r.prSupplier.toLowerCase().includes(s);
        const matchCat = category === "all" || r.prSupplier === category;
        const matchBrand = status === "all" || r.prStatus === status;

        // ----- date range filter -----
        let matchDate = true;

        if (startDate || endDate) {
            const recordDate = new Date(r.prOrderDate);

            if (isNaN(recordDate.getTime())) {
                matchDate = false;
            } else {
                if (startDate && recordDate < startDate) {
                    matchDate = false;
                }
                if (endDate) {
                    const inclusiveEnd = new Date(endDate);
                    inclusiveEnd.setHours(23, 59, 59, 999);
                    if (recordDate > inclusiveEnd) {
                        matchDate = false;
                    }
                }
            }
        }
        return matchSearch && matchCat && matchBrand && matchDate;
    });

    // --------- SUMMARY FOR TOP CARDS (BASED ON FILTERED ROWS) ----------
    const totalOrders = filtered.length;

    const activeOrders = filtered.filter(
        (r) => r.prStatus !== "Canceled"
    ).length;

    const draftOrders = filtered.filter(
        (r) => r.prStatus === "Draft"
    ).length;

    const pendingApproval = filtered.filter(
        (r) => r.prStatus === "Pending Approval"
    ).length;

    const approvedOrders = filtered.filter(
        (r) => r.prStatus === "Approved"
    ).length;

    const totalValue = filtered.reduce((sum, r) => {
        const raw =
            typeof r.prTotalAmount === "string"
                ? r.prTotalAmount.replace(/[$,]/g, "")
                : r.prTotalAmount;
        const value = Number(raw) || 0;
        return sum + value;
    }, 0);
    // -------------------------------------------------------------------

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    const [isStockHistoryVisible, setStockHistoryVisible] = useState(true);
    const [isSoldStockVisible, setSoldStockVisible] = useState(true);

    const navigate = useNavigate();

    const handleAddEmployeeClick = () => {
        navigate("/user/users/add");
    };

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

    const [selectedIds, setSelectedIds] = useState([]);
    const currentPageIds = paginatedRows.map((r) => r.prID);
    const allSelectedOnPage =
        currentPageIds.length > 0 &&
        currentPageIds.every((id) => selectedIds.includes(id));

    const someSelectedOnPage =
        currentPageIds.some((id) => selectedIds.includes(id)) &&
        !allSelectedOnPage;

    // Toggle all rows on current page
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

    // Toggle single row
    const handleToggleRow = (id, checked) => {
        setSelectedIds((prev) => {
            if (checked) {
                if (prev.includes(id)) return prev;
                return [...prev, id];
            }
            return prev.filter((item) => item !== id);
        });
    };

    return (
        <div className="space-y-4">
            <ProductsDate
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => setDateRange(dates)}
            />

            {/* cards now get dynamic props */}
            <PurchasesOverview
                totalOrders={totalOrders}
                activeOrders={activeOrders}
                draftOrders={draftOrders}
                pendingApproval={pendingApproval}
                approvedOrders={approvedOrders}
                totalValue={totalValue}
            />

            <div className="flex-1 flex-wrap items-center justify-between gap-3 rounded-md border bg-white dark:bg-slate-900">
                <div className="flex w-full items-center p-3 gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search product, SKU, brand"
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="ml-auto gap-3 flex">
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-42.5">
                                <SelectValue placeholder="Brand" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Department</SelectItem>
                                <SelectItem value="Store Operations">
                                    Store Operations
                                </SelectItem>
                                <SelectItem value="POS Operations">
                                    POS Operations
                                </SelectItem>
                                <SelectItem value="Inventory">Inventory</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="Customer Service">
                                    Customer Service
                                </SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-42.5">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Draft">Draft</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <ButtonComponent
                        title="Export"
                        isVisible={isInventoryReportVisible}
                        className="bg-green-600 text-white gap-2 hover:bg-orange-600"
                        icon={<Download size={16} />}
                    >
                        <PlusCircle size={20} />
                    </ButtonComponent>

                    <ButtonComponent
                        title="Add User"
                        isVisible={isInventoryReportVisible}
                        onClick={() => setAddOpen(true)} // Open add modal
                        className="bg-blue-600 text-white gap-2 hover:bg-orange-600"
                        icon={<Plus size={16} />}
                    >
                        <PlusCircle size={20} />
                    </ButtonComponent>
                </div>

                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-200 dark:bg-slate-800">
                                <TableHead className="w-10">
                                    <Checkbox
                                        aria-label="Select all"
                                        checked={allSelectedOnPage ? true : someSelectedOnPage ? "indeterminate" : false}
                                        onCheckedChange={handleToggleAllOnPage}
                                    />
                                </TableHead>

                                <TableHead>Order ID</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Expected Delivery</TableHead>
                                <TableHead>Total Items</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created By</TableHead>
                                <TableHead>Action</TableHead>
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
                                    <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
                                        No products found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedRows.map((r) => (
                                    <TableRow key={r.prID}>
                                        <TableCell>
                                            <Checkbox
                                                aria-label={`Select ${r.prID}`}
                                                checked={selectedIds.includes(r.prID)}
                                                onCheckedChange={(checked) =>
                                                    handleToggleRow(r.prID, checked)
                                                }
                                            />
                                        </TableCell>

                                        <TableCell>{r.prCode}</TableCell>

                                        <TableCell className="whitespace-nowrap">
                                            {r.prSupplier}
                                        </TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            {r.prOrderDate}
                                        </TableCell>

                                        <TableCell>{r.prExpectedDelivery}</TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            {r.prTotalItems}
                                        </TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            ${r.prTotalAmount}
                                        </TableCell>

                                        <TableCell>
                                            <div
                                                className={`inline-flex items-center justify-center px-3 py-1 min-w-20 h-7 rounded-full text-xs font-medium ${r.prPriority === "Low" ? "bg-blue-100 text-blue-600" : r.prPriority === "Medium" ? "bg-amber-100 text-amber-600" : r.prPriority === "High" ? "bg-red-100 text-red-600" : "bg-slate-200 text-slate-600"}`}
                                            >
                                                {r.prPriority}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div
                                                className={`inline-flex items-center justify-center px-3 py-1 min-w-20 h-7 rounded-full text-xs font-medium ${r.prStatus === "Approved" ? "bg-blue-600 text-white" : r.prStatus === "Pending Approval" ? "bg-amber-500 text-white" : r.prStatus === "Completed" ? "bg-green-600 text-white" : r.prStatus === "Draft" ? "bg-slate-500 text-white" : r.prStatus === "Canceled" ? "bg-slate-200 text-slate-600" : "bg-red-600 text-white"}`}
                                            >
                                                {r.prStatus}
                                            </div>
                                        </TableCell>

                                        <TableCell className="whitespace-nowrap">{r.prCreatedBy}</TableCell>

                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="gap-2" onClick={() => {
                                                        setSelectedProduct(r);
                                                        setViewOpen(true);
                                                    }}>
                                                        <Eye className="h-4 w-4" /> View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2" onClick={() => {
                                                        setSelectedProduct(r);
                                                        setEditOpen(true);
                                                    }}>
                                                        <Edit className="h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-2 text-destructive"
                                                        onClick={() =>
                                                            handleDelete(r.prID, r.prCode)
                                                        }
                                                        disabled={deletingId === r.prID}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        {deletingId === r.prID
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
                        <Select value={String(rowsPerPage)} onValueChange={(value) => {
                            const num = Number(value);
                            setRowsPerPage(num);
                            setPage(1); // reset when rows per page changes
                        }}>
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
                                <Button
                                    key={idx}
                                    variant="ghost"
                                    size="sm"
                                    disabled
                                >
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
