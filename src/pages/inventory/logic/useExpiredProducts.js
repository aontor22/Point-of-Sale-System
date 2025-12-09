import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import CATALOG_ROWS from "@/data/ProductData";
import { useEntityModals } from "@/hooks/useEntityModals";

export function useExpiredProducts() {
    const [search, setSearch] = useState("");
    const [loading] = useState(false);
    
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const filtered = CATALOG_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.brand.toLowerCase().includes(s);
        return matchSearch;
    });

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedRows = filtered.slice(startIndex, endIndex);

    const {
        selectedItem: selectedProduct,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        openView,
        openEdit,
    } = useEntityModals();

    const viewFields = [
        { key: "sku", label: "SKU" },
        { key: "name", label: "Product Name" },
        { key: "manufacturedDate", label: "Manufactured Date" },
        { key: "expiredDate", label: "Expired Date" },
    ];

    const formFields = [
        { name: "name", label: "Product Name", type: "text", required: true },
        { name: "sku", label: "SKU", type: "text", required: true },
        { name: "manufacturedDate", label: "Manufactured Date", type: "text" },
        { name: "expiredDate", label: "Expired Date", type: "text" },
    ];

    const handleEditSave = (updated) => {
        console.log("Updated product", updated);
    };

    const [deletingId, setDeletingId] = useState(null);
    const [rows, setRows] = useState(CATALOG_ROWS);

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


    // selection state
    const [selectedSkus, setSelectedSkus] = useState([]);

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

    // filtered export data (all filtered rows)
    const fullFilteredRows = filtered;

    // filtered export handlers
    const handleExportPdf = () => {
        const doc = new jsPDF();

        const tableColumn = ["SKU", "Name", "Manufactured Date", "Expired Date"];
        const tableRows = [];

        fullFilteredRows.forEach((item) => {
            tableRows.push([
                item.sku,
                item.name,
                item.manufacturedDate,
                item.expiredDate,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Expired Products Export (${fullFilteredRows.length} items)`,
            14,
            15
        );
        doc.save("expired-products.pdf");
    };

    const handleExportXls = () => {
        const data = fullFilteredRows.map((item) => ({
            SKU: item.sku,
            Name: item.name,
            ManufacturedDate: item.manufacturedDate,
            ExpiredDate: item.expiredDate,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ExpiredProducts");

        XLSX.writeFile(workbook, "expired-products.xlsx");
    };

    // paginated export handlers (current page)
    const handleExportCurrentCsv = () => {
        const data = paginatedRows.map((item) => ({
            SKU: item.sku,
            Name: item.name,
            ManufacturedDate: item.manufacturedDate,
            ExpiredDate: item.expiredDate,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `expired-products_page_${currentPage}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExportCurrentPdf = () => {
        const doc = new jsPDF();

        const tableColumn = ["SKU", "Name", "Manufactured Date", "Expired Date"];
        const tableRows = [];

        paginatedRows.forEach((item) => {
            tableRows.push([
                item.sku,
                item.name,
                item.manufacturedDate,
                item.expiredDate,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Expired Products Export - Page ${currentPage} (${paginatedRows.length} items)`,
            14,
            15
        );
        doc.save(`expired-products_page_${currentPage}.pdf`);
    };

    const handleExportCurrentXls = () => {
        const data = paginatedRows.map((item) => ({
            SKU: item.sku,
            Name: item.name,
            ManufacturedDate: item.manufacturedDate,
            ExpiredDate: item.expiredDate,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ExpiredProductsPage");

        XLSX.writeFile(workbook, `expired-products_page_${currentPage}.xlsx`);
    };

    const handleRefresh = () => {
        setSearch("");
        setPage(1);
        setSelectedSkus([]);
    };

    return {
        search,
        setSearch,
        loading,
        filtered,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        totalPages,
        currentPage,
        paginatedRows,
        selectedSkus,
        setSelectedSkus,
        allSelectedOnPage,
        someSelectedOnPage,
        pageItems,
        handleExportPdf,
        handleExportXls,
        handleExportCurrentCsv,
        handleExportCurrentPdf,
        handleExportCurrentXls,
        handleRefresh,
        // modals
        selectedProduct,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        openView,
        openEdit,
        // form/meta
        viewFields,
        formFields,
        handleEditSave,
        // delete
        handleDelete,
        deletingId,

        // dates
        startDate,
        endDate,
        setDateRange,
    };
}
