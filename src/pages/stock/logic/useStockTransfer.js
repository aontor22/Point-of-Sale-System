import { useState, useRef } from "react";
import PRODUCT_ROWS from "@/data/ProductData";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const STOCK_TRANSFER_VIEW_FIELDS = [
    { key: "warehouse", label: "From Warehouse" },
    { key: "toWareHouse", label: "To Warehouse" },
    { key: "locationQty", label: "No of Products" },
    { key: "qtyAlert", label: "Quantity Transfer" },
    { key: "refNumber", label: "Reference Number" },
    { key: "manufacturedDate", label: "Date" },
];

export const STOCK_TRANSFER_FORM_FIELDS = [
    {
        name: "warehouse",
        label: "From Warehouse",
        type: "text",
        required: true,
    },
    {
        name: "toWareHouse",
        label: "To Warehouse",
        type: "text",
        required: true,
    },
    {
        name: "locationQty",
        label: "No of Products",
        type: "number",
        required: true,
    },
    {
        name: "qtyAlert",
        label: "Quantity Transfer",
        type: "number",
        required: true,
    },
    {
        name: "refNumber",
        label: "Reference Number",
        type: "text",
    },
    {
        name: "manufacturedDate",
        label: "Date",
        type: "date",
    },
];

export function useStockTransfer() {
    const [search, setSearch] = useState("");
    const [loading] = useState(false);

    const fileInputRef = useRef(null);

    // pagination
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    // selection
    const [selectedIds, setSelectedIds] = useState([]);

    // modals
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const viewFields = STOCK_TRANSFER_VIEW_FIELDS;
    const transferFormFields = STOCK_TRANSFER_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated stock transfer:", updated);
    };

    const handleAddSave = (data) => {
        console.log("New stock transfer:", data);
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


    /** ---------- FILTER ---------- */
    const filtered = PRODUCT_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.warehouse.toLowerCase().includes(s) ||
            r.toWareHouse.toLowerCase().includes(s) ||
            r.refNumber.toLowerCase().includes(s);
        return matchSearch;
    });

    /** ---------- PAGINATION ---------- */
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

    const currentPageIds = paginatedRows.map((r) => r.sku);

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
            "From Warehouse",
            "To Warehouse",
            "No of Products",
            "Quantity Transfer",
            "Reference Number",
            "Date",
        ];
        const tableRows = [];

        fullFilteredRows.forEach((item) => {
            tableRows.push([
                item.warehouse,
                item.toWareHouse,
                item.locationQty,
                item.qtyAlert,
                item.refNumber,
                item.manufacturedDate,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Stock Transfer Export (${fullFilteredRows.length} items)`,
            14,
            15
        );
        doc.save("stock_transfer.pdf");
    };

    const handleExportXls = () => {
        const data = fullFilteredRows.map((item) => ({
            FromWarehouse: item.warehouse,
            ToWarehouse: item.toWareHouse,
            NoOfProducts: item.locationQty,
            QuantityTransfer: item.qtyAlert,
            ReferenceNumber: item.refNumber,
            Date: item.manufacturedDate,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "StockTransfer");

        XLSX.writeFile(workbook, "stock_transfer.xlsx");
    };

    /** ---------- CURRENT PAGE EXPORT ---------- */
    const handleExportCurrentCsv = () => {
        const data = paginatedRows.map((item) => ({
            FromWarehouse: item.warehouse,
            ToWarehouse: item.toWareHouse,
            NoOfProducts: item.locationQty,
            QuantityTransfer: item.qtyAlert,
            ReferenceNumber: item.refNumber,
            Date: item.manufacturedDate,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
            "download",
            `stock_transfer_page_${currentPage}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExportCurrentPdf = () => {
        const doc = new jsPDF();

        const tableColumn = [
            "From Warehouse",
            "To Warehouse",
            "No of Products",
            "Quantity Transfer",
            "Reference Number",
            "Date",
        ];
        const tableRows = [];

        paginatedRows.forEach((item) => {
            tableRows.push([
                item.warehouse,
                item.toWareHouse,
                item.locationQty,
                item.qtyAlert,
                item.refNumber,
                item.manufacturedDate,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Stock Transfer - Page ${currentPage} (${paginatedRows.length} items)`,
            14,
            15
        );
        doc.save(`stock_transfer_page_${currentPage}.pdf`);
    };

    const handleExportCurrentXls = () => {
        const data = paginatedRows.map((item) => ({
            FromWarehouse: item.warehouse,
            ToWarehouse: item.toWareHouse,
            NoOfProducts: item.locationQty,
            QuantityTransfer: item.qtyAlert,
            ReferenceNumber: item.refNumber,
            Date: item.manufacturedDate,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "StockTransfer_Page"
        );

        XLSX.writeFile(workbook, `stock_transfer_page_${currentPage}.xlsx`);
    };

    const handleRefresh = () => {
        setSearch("");
        setPage(1);
    };

    const handleAddClick = () => {
        setSelectedItem(null);
        setAddOpen(true);
    };

    const handleImportClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
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

        console.log("Files selected for stock transfer import:", files);

        e.target.value = "";
    };

    return {
        search,
        setSearch,
        loading,

        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        totalPages,
        currentPage,
        paginatedRows,
        pageItems,

        selectedIds,
        allSelectedOnPage,
        someSelectedOnPage,
        handleToggleAllOnPage,
        handleToggleRow,

        selectedItem,
        setSelectedItem,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        addOpen,
        setAddOpen,

        viewFields,
        transferFormFields,
        handleEditSave,
        handleAddSave,

        handleExportPdf,
        handleExportXls,
        handleExportCurrentCsv,
        handleExportCurrentPdf,
        handleExportCurrentXls,
        handleRefresh,

        fileInputRef,
        handleImportClick,
        handleFileChange,
        handleAddClick,
        handleDelete,
        deletingId,
    };
}
