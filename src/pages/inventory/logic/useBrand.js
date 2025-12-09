import { useState } from "react";
import BRAND_ROWS from "@/data/BrandData";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const BRAND_VIEW_FIELDS = [
    { key: "name", label: "Brand Name" },
    { key: "createdDate", label: "Created Date" },
    { key: "status", label: "Status" },
];

export const BRAND_FORM_FIELDS = [
    { name: "name", label: "Brand Name", type: "text", required: true },
    { name: "createdDate", label: "Created Date", type: "text" },
    { name: "status", label: "Status", type: "text" },
];

export function useBrand() {
    const [search, setSearch] = useState("");
    const [store, setStore] = useState("all");
    const [loading] = useState(false);

    const filtered = BRAND_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.name.toLowerCase().includes(s) ||
            r.status.toLowerCase().includes(s);
        const matchBrand = store === "all" || r.status === store;
        return matchSearch && matchBrand;
    });

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = filtered.slice(startIndex, endIndex);

    // selection state
    const [selectedNames, setSelectedNames] = useState([]);

    const allSelectedOnPage =
        paginatedRows.length > 0 &&
        paginatedRows.every((r) => selectedNames.includes(r.name));

    const someSelectedOnPage =
        paginatedRows.some((r) => selectedNames.includes(r.name)) &&
        !allSelectedOnPage;

    // modal state
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const viewFields = BRAND_VIEW_FIELDS;
    const formFields = BRAND_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated brand", updated);
    };

    const [deletingId, setDeletingId] = useState(null);
    const [rows, setRows] = useState(BRAND_ROWS);

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

    // filtered export
    const fullFilteredRows = filtered;

    const handleExportPdf = () => {
        const doc = new jsPDF();

        const tableColumn = ["Brand", "Created Date", "Status"];
        const tableRows = [];

        fullFilteredRows.forEach((item) => {
            tableRows.push([item.name, item.createdDate, item.status]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Brands Export (${fullFilteredRows.length} items)`,
            14,
            15
        );
        doc.save("brands.pdf");
    };

    const handleExportXls = () => {
        const data = fullFilteredRows.map((item) => ({
            Brand: item.name,
            CreatedDate: item.createdDate,
            Status: item.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Brands");

        XLSX.writeFile(workbook, "brands.xlsx");
    };

    // paginated exports
    const handleExportCurrentCsv = () => {
        const data = paginatedRows.map((item) => ({
            Brand: item.name,
            CreatedDate: item.createdDate,
            Status: item.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `brands_page_${currentPage}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExportCurrentPdf = () => {
        const doc = new jsPDF();

        const tableColumn = ["Brand", "Created Date", "Status"];
        const tableRows = [];

        paginatedRows.forEach((item) => {
            tableRows.push([item.name, item.createdDate, item.status]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Brands Export - Page ${currentPage} (${paginatedRows.length} items)`,
            14,
            15
        );
        doc.save(`brands_page_${currentPage}.pdf`);
    };

    const handleExportCurrentXls = () => {
        const data = paginatedRows.map((item) => ({
            Brand: item.name,
            CreatedDate: item.createdDate,
            Status: item.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "BrandsPage");

        XLSX.writeFile(workbook, `brands_page_${currentPage}.xlsx`);
    };

    const handleRefresh = () => {
        setSearch("");
        setStore("all");
        setPage(1);
        setSelectedNames([]);
    };

    return {
        search,
        setSearch,
        store,
        setStore,
        loading,
        filtered,

        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        totalPages,
        currentPage,
        paginatedRows,
        pageItems,

        selectedNames,
        setSelectedNames,
        allSelectedOnPage,
        someSelectedOnPage,

        selectedBrand,
        setSelectedBrand,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,

        viewFields,
        formFields,
        handleEditSave,
        // delete
        handleDelete,
        deletingId,

        handleExportPdf,
        handleExportXls,
        handleExportCurrentCsv,
        handleExportCurrentPdf,
        handleExportCurrentXls,
        handleRefresh,

        // dates
        startDate,
        endDate,
        setDateRange,
    };
}
