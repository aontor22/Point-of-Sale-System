import { useState, useRef } from "react";
import PRODUCT_ROWS from "@/data/ProductData";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const STOCK_ADJUSTMENT_VIEW_FIELDS = [
    { key: "warehouse", label: "Warehouse" },
    { key: "store", label: "Store" },
    { key: "name", label: "Product Name" },
    { key: "manufacturedDate", label: "Date" },
    { key: "person", label: "Person Name" },
    { key: "qty", label: "Quantity" },
];

export const STOCK_ADJUSTMENT_FORM_FIELDS = [
    { name: "warehouse", label: "Warehouse", type: "text", required: true },
    { name: "store", label: "Store", type: "text", required: true },
    {
        name: "name",
        label: "Product Name",
        type: "text",
        required: true,
    },
    { name: "manufacturedDate", label: "Date", type: "date" },
    { name: "person", label: "Person Name", type: "text" },
    { name: "qty", label: "Quantity", type: "number", required: true },
    {
        name: "type",
        label: "Adjustment Type (Increase/Decrease)",
        type: "text",
    },
    { name: "reason", label: "Reason", type: "text" },
];

export function useStockAdjustment() {
    const [search, setSearch] = useState("");
    const [warehouse, setWarehouse] = useState("all");
    const [loading] = useState(false);

    const fileInputRef = useRef(null);

    // pagination
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    // selection
    const [selectedIds, setSelectedIds] = useState([]);

    // modal states
    const [addOpen, setAddOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const viewFields = STOCK_ADJUSTMENT_VIEW_FIELDS;
    const adjustmentFormFields = STOCK_ADJUSTMENT_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated stock adjustment:", updated);
    };

    const handleAddSave = (data) => {
        console.log("New stock adjustment:", data);
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


    /** ---------- FILTER + PAGINATION ---------- */
    const filtered = PRODUCT_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.warehouse.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.store.toLowerCase().includes(s);
        const matchWarehouse = warehouse === "all" || r.warehouse === warehouse;
        return matchSearch && matchWarehouse;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = filtered.slice(startIndex, endIndex);

    const currentPageIds = paginatedRows.map((r) => r.sku);

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

    /** ---------- FILTERED EXPORT (all filtered rows) ---------- */
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
            `Stock Adjustment Export (${fullFilteredRows.length} items)`,
            14,
            15
        );
        doc.save("stock_adjustment.pdf");
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "StockAdjustment");

        XLSX.writeFile(workbook, "stock_adjustment.xlsx");
    };

    const handleRefresh = () => {
        setSearch("");
        setWarehouse("all");
        setPage(1);
    };

    const handleAddClick = () => {
        setSelectedItem(null);
        setAddOpen(true);
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

        console.log("Files selected for stock adjustment import:", files);

        e.target.value = "";
    };

    return {
        // filters
        search,
        setSearch,
        warehouse,
        setWarehouse,
        loading,

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
        addOpen,
        setAddOpen,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,

        // view / form config
        viewFields,
        adjustmentFormFields,
        handleEditSave,
        handleAddSave,

        // export / refresh
        handleExportPdf,
        handleExportXls,
        handleRefresh,

        // file import
        fileInputRef,
        handleFileChange,
        handleAddClick,
        handleDelete,
        deletingId,
    };
}
