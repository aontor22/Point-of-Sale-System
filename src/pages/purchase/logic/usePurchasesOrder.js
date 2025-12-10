import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import users from "@/data/PurchaseReturnData";

export default function useSaleReports() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [priority, setPriority] = useState("all");
    const [loading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [deletingId, setDeletingId] = useState(null);
    const [rows, setRows] = useState(users);

    const handleEditSave = (updated) => {
        console.log("Updated product", updated);
        // TODO: PATCH / PUT API call here
    };

    const handleAddSave = (data) => {
        console.log("New product", data);
        // TODO: POST API call here
    };

    const handleDelete = async (rowId) => {
        const ok = window.confirm("Are you sure you want to delete this item?");
        if (!ok) return;

        try {
            setDeletingId(rowId);
            setRows((prev) => prev.filter((row) => row.prID !== rowId));
        } catch (err) {
            console.error("Delete failed:", err);
        } finally {
            setDeletingId(null);
        }
    };

    const filtered = users.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch = r.prSupplier.toLowerCase().includes(s);
        const matchCat = category === "all" || r.prSupplier === category;
        const matchPriority = priority === "all" || r.prPriority === priority;
        const matchBrand = status === "all" || r.prStatus === status;

        let matchDate = true;
        const [startDate, endDate] = dateRange;
        if (startDate || endDate) {
            const recordDate = new Date(r.prOrderDate);
            if (isNaN(recordDate.getTime())) matchDate = false;
            if (startDate && recordDate < startDate) matchDate = false;
            if (endDate && recordDate > new Date(endDate).setHours(23, 59, 59, 999)) matchDate = false;
        }
        return matchSearch && matchCat && matchBrand && matchPriority && matchDate;
    });

    const totalOrders = filtered.length;
    const activeOrders = filtered.filter((r) => r.prStatus !== "Canceled").length;
    const totalValue = filtered.reduce((sum, r) => sum + (Number(r.prTotalAmount) || 0), 0);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const paginatedRows = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const handleExportCurrentCsv = () => {
        const data = paginatedRows.map((item) => ({
            prID: item.prID,
            prCode: item.prCode,
            prSupplier: item.prSupplier,
            prOrderDate: item.prOrderDate,
            prExpectedDelivery: item.prExpectedDelivery,
            prTotalItems: item.prTotalItems,
            prTotalAmount: item.prTotalAmount,
            prPriority: item.prPriority,
            prStatus: item.prStatus,
            prCreatedBy: item.prCreatedBy?.name || "-",
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `purchase_order_page_${page}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return {
        search, setSearch, category, setCategory, status, setStatus, priority, setPriority, loading,
        selectedProduct, setSelectedProduct, viewOpen, setViewOpen, editOpen, setEditOpen, addOpen, setAddOpen,
        dateRange, setDateRange, deletingId, rows, setRows, filtered, totalOrders, activeOrders, totalValue,
        paginatedRows, rowsPerPage, setRowsPerPage, page, setPage, totalPages, handleExportCurrentCsv,
        handleExportCurrentPdf: () => { }, handleExportCurrentXls, handleEditSave, handleAddSave, handleDelete,
        handleToggleAllOnPage: () => { }, handleToggleRow: () => { },
    };
}
