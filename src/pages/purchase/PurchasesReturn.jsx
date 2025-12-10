// PurchasesReturn.jsx
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
    Upload,
} from "lucide-react";

import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ButtonComponent from "@/components/ui/ChangeButton";
import PurchasesOverview from "@/components/view/PurchasesReturnView";

// Modals
import DynamicViewModal from "@/components/common/DynamicViewModal";
import DynamicFormModal from "@/components/common/DynamicFormModal";
import ProductsHeader from "@/components/ui/ProductHeader";

import usePurchasesReturn from "./logic/usePurchasesReturn";

const RETURN_VIEW_FIELDS = [
    { key: "returnCode", label: "Return ID" },
    { key: "purchaseOrderCode", label: "Purchase Order" },
    { key: "supplier", label: "Supplier" },
    { key: "returnDate", label: "Return Date" },
    { key: "product", label: "Product" },
    { key: "qtyReturned", label: "Qty Returned" },
    { key: "refundAmount", label: "Refund Amount" },
    { key: "reason", label: "Reason" },
    { key: "status", label: "Status" },
];

const RETURN_FORM_FIELDS = [
    { name: "returnCode", label: "Return ID", type: "text", required: true },
    { name: "purchaseOrderCode", label: "Purchase Order Code", type: "text", required: true },
    { name: "supplier", label: "Supplier", type: "text", required: true },
    { name: "returnDate", label: "Return Date", type: "text", required: true },
    { name: "product", label: "Product", type: "text", required: true },
    { name: "qtyReturned", label: "Qty Returned", type: "number", required: true },
    { name: "refundAmount", label: "Refund Amount", type: "number", required: true },
    { name: "reason", label: "Reason", type: "text" },
    { name: "status", label: "Status", type: "text" },
];

export default function PurchasesReturn() {
    const {
        // state
        search,
        setSearch,
        category,
        setCategory,
        reasons,
        setReason,
        status,
        setStatus,
        loading,
        selectedReturn,
        setSelectedReturn,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        addOpen,
        setAddOpen,
        dateRange,
        setDateRange,
        deletingId,
        isInventoryReportVisible,
        setInventoryReportVisible,
        rowsPerPage,
        setRowsPerPage,
        currentPage,
        totalPages,
        pageItems,
        paginatedRows,
        selectedIds,
        allSelectedOnPage,
        someSelectedOnPage,

        // derived
        filtered,
        totalReturns,
        totalItemsReturned,
        pendingReturns,
        completedReturns,
        totalRefund,

        // handlers
        handleToggleAllOnPage,
        handleToggleRow,
        handleEditSave,
        handleAddSave,
        handleDelete,
        handleExportCurrentCsv,
        handleExportCurrentPdf,
        handleExportCurrentXls,
        setPage,
    } = usePurchasesReturn();

    const [startDate, endDate] = dateRange;

    const viewFields = RETURN_VIEW_FIELDS;
    const formFields = RETURN_FORM_FIELDS;

    return (
        <div className="space-y-4">
            <ProductsDate
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => setDateRange(dates)}
            />

            <ProductsHeader
                title="Purchase Return"
                breadcrumbs={[
                    { label: "Dashboard" },
                    { label: "Purchase Return", active: true },
                ]}
            />

            <PurchasesOverview
                totalReturns={totalReturns}
                totalItemsReturned={totalItemsReturned}
                pendingReturns={pendingReturns}
                completedReturns={completedReturns}
                totalRefund={totalRefund}
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
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-42.5">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                                <SelectItem value="Processing">Processing</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={reasons} onValueChange={setReason}>
                            <SelectTrigger className="w-42.5">
                                <SelectValue placeholder="Select Reason" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Reasons</SelectItem>
                                <SelectItem value="Defective Units">Defective Units</SelectItem>
                                <SelectItem value="Wrong Model">Wrong Model</SelectItem>
                                <SelectItem value="Damaged in Transit">Damaged in Transit</SelectItem>
                                <SelectItem value="Customer Order Cancelled">Customer Order Cancelled</SelectItem>
                                <SelectItem value="Excess Stock">Excess Stock</SelectItem>
                                <SelectItem value="Wrong Specifications">Wrong Specifications</SelectItem>
                                <SelectItem value="Quality Issues">Quality Issues</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-42.5">
                                <SelectValue placeholder="All Supplier" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Suppliers</SelectItem>
                                <SelectItem value="Tech Supplies Co.">Tech Supplies Co.</SelectItem>
                                <SelectItem value="Apple Distributors Inc.">Apple Distributors Inc.</SelectItem>
                                <SelectItem value="Audio Excellence Ltd.">Audio Excellence Ltd.</SelectItem>
                                <SelectItem value="Dell Technologies">Dell Technologies</SelectItem>
                                <SelectItem value="Logitech International">Logitech International</SelectItem>
                                <SelectItem value="LG Electronics">LG Electronics</SelectItem>
                                <SelectItem value="Canon Inc.">Canon Inc.</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>

                    {/* PAGINATED EXPORT DROPDOWN (CURRENT PAGE) */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 h-10 bg-green-500 dark:bg-green-500 text-white"
                            >
                                <Upload className="h-4 w-4" />
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

                    <ButtonComponent
                        title="New Return"
                        isVisible={isInventoryReportVisible}
                        onClick={() => setAddOpen(true)}
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

                                <TableHead>Return ID</TableHead>
                                <TableHead>Purchase Order</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Return Date</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Qty Returned</TableHead>
                                <TableHead>Refund Amount</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
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
                                    <TableRow key={r.returnID}>
                                        <TableCell>
                                            <Checkbox
                                                aria-label={`Select ${r.returnID}`}
                                                checked={selectedIds.includes(r.returnID)}
                                                onCheckedChange={(checked) =>
                                                    handleToggleRow(
                                                        r.returnID,
                                                        checked
                                                    )
                                                }
                                            />
                                        </TableCell>

                                        <TableCell>{r.returnCode}</TableCell>

                                        <TableCell className="whitespace-nowrap">
                                            {r.purchaseOrderCode}
                                        </TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            {r.supplier}
                                        </TableCell>

                                        <TableCell>{r.returnDate}</TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            {r.product}
                                        </TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            {r.qtyReturned}
                                        </TableCell>

                                        <TableCell className="whitespace-normal wrap-break-words">
                                            ${r.refundAmount}
                                        </TableCell>

                                        <TableCell>
                                            <div
                                                className={`
                                                    inline-flex items-center justify-center
                                                    px-3 py-1 min-w-20 h-7
                                                    rounded-full text-xs font-medium
                                                    ${r.reason === "Excess Stock"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : r.reason ===
                                                            "Wrong Specifications"
                                                            ? "bg-purple-100 text-purple-600"
                                                            : r.reason ===
                                                                "Defective Units"
                                                                ? "bg-red-100 text-red-600"
                                                                : r.reason ===
                                                                    "Wrong Model"
                                                                    ? "bg-purple-100 text-purple-600"
                                                                    : r.reason ===
                                                                        "Damaged in Transit"
                                                                        ? "bg-orange-100 text-orange-600"
                                                                        : r.reason ===
                                                                            "Quality Issues"
                                                                            ? "bg-pink-100 text-pink-600"
                                                                            : "bg-slate-200 text-slate-600"
                                                    }
                                                `}
                                            >
                                                {r.reason}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div
                                                className={`
                                                    inline-flex items-center justify-center
                                                    px-3 py-1 min-w-20 h-7
                                                    rounded-full text-xs font-medium
                                                    ${r.status === "Approved"
                                                        ? "bg-blue-600 text-white"
                                                        : r.status === "Pending"
                                                            ? "bg-amber-500 text-white"
                                                            : r.status === "Completed"
                                                                ? "bg-green-600 text-white"
                                                                : r.status === "Processing"
                                                                    ? "bg-orange-600 text-white"
                                                                    : r.status === "Rejected"
                                                                        ? "bg-red-600 text-white"
                                                                        : "bg-slate-200 text-slate-600"
                                                    }
                                                `}
                                            >
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
                                                        onClick={() => {
                                                            setSelectedReturn(r);
                                                            setViewOpen(true);
                                                        }}
                                                    >
                                                        <Eye className="h-4 w-4" /> View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-2"
                                                        onClick={() => {
                                                            setSelectedReturn(r);
                                                            setEditOpen(true);
                                                        }}
                                                    >
                                                        <Edit className="h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="gap-2 text-destructive"
                                                        onClick={() =>
                                                            handleDelete(
                                                                r.returnID,
                                                                r.returnCode
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId === r.returnID
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        {deletingId === r.returnID
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
                            onClick={() =>
                                setPage((p) => Math.max(1, p - 1))
                            }
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
                title="Return details"
                description="Quick view of the return information."
                data={selectedReturn}
                fields={viewFields}
            />

            {/* Edit modal */}
            <DynamicFormModal
                open={editOpen}
                onOpenChange={setEditOpen}
                title="Edit return"
                description="Update the return information."
                initialData={selectedReturn || {}}
                fields={formFields}
                onSubmit={handleEditSave}
            />

            {/* Add modal */}
            <DynamicFormModal
                open={addOpen}
                onOpenChange={setAddOpen}
                title="Add return"
                description="Create a new return entry."
                initialData={{}}
                fields={formFields}
                onSubmit={handleAddSave}
            />

            <Footer />
        </div>
    );
}
