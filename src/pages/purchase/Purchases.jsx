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

import purchases from "@/data/PurchaseData";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ButtonComponent from "@/components/ui/ChangeButton";
import { useNavigate } from "react-router-dom";
import PurchasesOverview from "@/components/view/PurchaseView";

export default function SaleReports() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [status, setStatus] = React.useState("all");
    const [loading] = React.useState(false);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const filtered = purchases.filter((r) => {
        const s = search.toLowerCase();

        const matchSearch = r.poSupplier.toLowerCase().includes(s);
        const matchCat = category === "all" || r.poSupplier === category;
        const matchBrand = status === "all" || r.poDeliveryStatus === status;

        // ---------- DATE RANGE FILTER ----------
        let matchDate = true;

        if (startDate || endDate) {
            const recordDate = new Date(r.poDate);
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


    // ---------- SUMMARY VALUES FOR CARDS (BASED ON FILTERED ROWS) ----------
    const totalPurchasesAmount = filtered.reduce((sum, r) => {
        const raw =
            typeof r.poTotalAmount === "string"
                ? r.poTotalAmount.replace(/[$,]/g, "")
                : r.poTotalAmount;
        const value = Number(raw) || 0;
        return sum + value;
    }, 0);

    const paidAmount = filtered.reduce((sum, r) => {
        const raw =
            typeof r.poTotalAmount === "string"
                ? r.poTotalAmount.replace(/[$,]/g, "")
                : r.poTotalAmount;
        const value = Number(raw) || 0;
        return r.poPaymentStatus === "Paid" ? sum + value : sum;
    }, 0);

    const pendingPaymentAmount = filtered.reduce((sum, r) => {
        const raw =
            typeof r.poTotalAmount === "string"
                ? r.poTotalAmount.replace(/[$,]/g, "")
                : r.poTotalAmount;
        const value = Number(raw) || 0;
        return r.poPaymentStatus === "Paid" ? sum : sum + value;
    }, 0);

    const paidOrders = filtered.filter(
        (r) => r.poPaymentStatus === "Paid"
    ).length;

    const pendingOrders = filtered.filter(
        (r) => r.poPaymentStatus !== "Paid"
    ).length;
    // ----------------------------------------------------------------------

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

    // This is the array that holds only the items for the current page
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
    const currentPageIds = paginatedRows.map((r) => r.poID);
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

            {/* cards get dynamic values */}
            <PurchasesOverview
                totalPurchasesAmount={totalPurchasesAmount}
                paidAmount={paidAmount}
                pendingPaymentAmount={pendingPaymentAmount}
                paidOrders={paidOrders}
                pendingOrders={pendingOrders}
            />

            <div className="flex-1 flex-wrap items-center justify-between gap-3 rounded-md border bg-white dark:bg-slate-900">
                <div className="flex w-full items-center p-3 gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search product, SKU, brand"
                            className="pl-8 dark:bg-slate-900"
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
                                <SelectItem value="Electro Mart">Active</SelectItem>
                                <SelectItem value="Quantum Gadgets">
                                    Inactive
                                </SelectItem>
                                <SelectItem value="Prime Bazaar">On Leave</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* You had an extra ProductsDate here, leaving it as-is */}
                    <ProductsDate />

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
                        onClick={handleAddEmployeeClick}
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

                                <TableHead>Purchase ID</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit Price</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Delivery</TableHead>
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
                                    <TableCell
                                        colSpan={10}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No products found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedRows.map((r) => (
                                    <TableRow key={r.poID}>
                                        <TableCell>
                                            <Checkbox
                                                aria-label={`Select ${r.poID}`}
                                                checked={selectedIds.includes(r.poID)}
                                                onCheckedChange={(checked) =>
                                                    handleToggleRow(r.poID, checked)
                                                }
                                            />
                                        </TableCell>

                                        <TableCell>{r.poCode}</TableCell>

                                        <TableCell className="whitespace-nowrap">
                                            {r.poSupplier}
                                        </TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            {r.poDate}
                                        </TableCell>

                                        <TableCell>{r.poProduct}</TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            {r.poQuantity}
                                        </TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            ${r.poUnitPrice}
                                        </TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            ${r.poTotalAmount}
                                        </TableCell>

                                        <TableCell className="whitespace-normal wrap-break-word">
                                            <div
                                                className={`
                                                    inline-flex items-center justify-center
                                                    px-3 py-1 min-w-20 h-7
                                                    rounded-full text-xs font-medium
                                                    ${r.poPaymentStatus === "Paid"
                                                        ? "bg-emerald-600 text-white"
                                                        : r.poPaymentStatus === "Partial"
                                                            ? "bg-blue-600 text-white"
                                                            : r.poPaymentStatus === "Overdue"
                                                                ? "bg-red-600 text-white"
                                                                : r.poPaymentStatus === "Pending"
                                                                    ? "bg-amber-600 text-white"
                                                                    : "bg-slate-200 text-slate-600"
                                                    }
                                                `}
                                            >
                                                {r.poPaymentStatus}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div
                                                className={`
                                                    inline-flex items-center justify-center
                                                    px-3 py-1 min-w-20 h-7
                                                    rounded-full text-xs font-medium
                                                    ${r.poDeliveryStatus === "Delivered"
                                                        ? "bg-emerald-100 text-green-600"
                                                        : r.poDeliveryStatus ===
                                                            "In Transit"
                                                            ? "bg-blue-100 text-blue-600"
                                                            : r.poDeliveryStatus ===
                                                                "Processing"
                                                                ? "bg-amber-100 text-amber-600"
                                                                : "bg-slate-200 text-slate-600"
                                                    }
                                                `}
                                            >
                                                {r.poDeliveryStatus}
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
                                setPage(1); // Crucial: Reset to page 1 when rowsPerPage changes
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
            <Footer />
        </div>
    );
}
