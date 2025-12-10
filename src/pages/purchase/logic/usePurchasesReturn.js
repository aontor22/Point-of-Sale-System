// usePurchasesReturn.js
import { useState } from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import purchaseReturns from "@/data/PurchaseOrderData";

export default function usePurchasesReturn() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [reasons, setReason] = useState("all");
    const [status, setStatus] = useState("all");
    const [loading] = useState(false);

    // modal + selected row
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const [dateRange, setDateRange] = useState([null, null]);

    const [deletingId, setDeletingId] = useState(null);
    const [rows, setRows] = useState(purchaseReturns);

    const handleEditSave = (updated) => {
        console.log("Updated return", updated);
        // TODO: PATCH / PUT API call + local state update
    };

    const handleAddSave = (data) => {
        console.log("New return", data);
        // TODO: POST API call + local state update
    };

    const handleDelete = async (rowId, labelForConfirm = "") => {
        const ok = window.confirm(
            labelForConfirm
                ? `Are you sure you want to delete "${labelForConfirm}"?`
                : "Are you sure you want to delete this item?"
        );
        if (!ok) return;

        try {
            setDeletingId(rowId);
            console.log("Delete request sent for id:", rowId);
            setRows((prev) => prev.filter((row) => row.returnID !== rowId));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete item. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    // use rows instead of original dataset so delete/add can affect table
    const filtered = rows.filter((r) => {
        const s = search.toLowerCase();

        const matchSearch = r.supplier.toLowerCase().includes(s);
        const matchCat = category === "all" || r.supplier === category;
        const matchBrand = status === "all" || r.status === status;
        const matchReason = reasons === "all" || r.reason === reasons;

        let matchDate = true;
        const [startDate, endDate] = dateRange;

        if (startDate || endDate) {
            const recordDate = new Date(r.returnDate);

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
        return matchSearch && matchCat && matchBrand && matchReason && matchDate;
    });

    // summary values for the top cards based on filtered rows
    const totalReturns = filtered.length;

    const totalItemsReturned = filtered.reduce((sum, r) => {
        const qty = Number(r.qtyReturned) || 0;
        return sum + qty;
    }, 0);

    const pendingReturns = filtered.filter(
        (r) => r.status === "Pending"
    ).length;

    const completedReturns = filtered.filter(
        (r) => r.status === "Completed"
    ).length;

    const totalRefund = filtered.reduce((sum, r) => {
        const raw =
            typeof r.refundAmount === "string"
                ? r.refundAmount.replace(/[$,]/g, "")
                : r.refundAmount;
        const value = Number(raw) || 0;
        return sum + value;
    }, 0);

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);

    // pagination logic
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
    const currentPageIds = paginatedRows.map((r) => r.returnID);
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

    /** -----------------------------------------
     * EXPORT CURRENT PAGE (PAGINATED DATA)
     * ----------------------------------------- */

    const handleExportCurrentCsv = () => {
        const data = paginatedRows.map((item) => ({
            ReturnID: item.returnCode,
            PurchaseOrder: item.purchaseOrderCode,
            Supplier: item.supplier,
            ReturnDate: item.returnDate,
            Product: item.product,
            QtyReturned: item.qtyReturned,
            RefundAmount: item.refundAmount,
            Reason: item.reason,
            Status: item.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `purchase_return_page_${currentPage}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExportCurrentPdf = () => {
        const doc = new jsPDF();

        const tableColumn = [
            "Return ID",
            "Purchase Order",
            "Supplier",
            "Return Date",
            "Product",
            "Qty Returned",
            "Refund Amount",
            "Reason",
            "Status",
        ];
        const tableRows = [];

        paginatedRows.forEach((item) => {
            tableRows.push([
                item.returnCode,
                item.purchaseOrderCode,
                item.supplier,
                item.returnDate,
                item.product,
                item.qtyReturned,
                `$${item.refundAmount}`,
                item.reason,
                item.status,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Purchase Return Export - Page ${currentPage} (${paginatedRows.length} items)`,
            14,
            15
        );
        doc.save(`purchase_return_page_${currentPage}.pdf`);
    };

    const handleExportCurrentXls = () => {
        const data = paginatedRows.map((item) => ({
            ReturnID: item.returnCode,
            PurchaseOrder: item.purchaseOrderCode,
            Supplier: item.supplier,
            ReturnDate: item.returnDate,
            Product: item.product,
            QtyReturned: item.qtyReturned,
            RefundAmount: item.refundAmount,
            Reason: item.reason,
            Status: item.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase_Return_Page");

        XLSX.writeFile(workbook, `purchase_return_page_${currentPage}.xlsx`);
    };

    return {
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
        rows,
        setRows,
        isInventoryReportVisible,
        setInventoryReportVisible,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,

        // derived
        filtered,
        totalReturns,
        totalItemsReturned,
        pendingReturns,
        completedReturns,
        totalRefund,
        totalPages,
        currentPage,
        paginatedRows,
        pageItems,
        selectedIds,
        allSelectedOnPage,
        someSelectedOnPage,

        // handlers
        handleToggleAllOnPage,
        handleToggleRow,
        handleEditSave,
        handleAddSave,
        handleDelete,
        handleExportCurrentCsv,
        handleExportCurrentPdf,
        handleExportCurrentXls,
    };
}
