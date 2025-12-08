import { useState } from "react";

import CATALOG_ROWS from "@/data/ProductData";
import { useEntityModals } from "@/hooks/useEntityModals";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const CATEGORY_VIEW_FIELDS = [
    { key: "category", label: "Category" },
    { key: "categorySlug", label: "Category Slug" },
    { key: "manufacturedDate", label: "Created On" },
    { key: "status", label: "Status" },
];

export const CATEGORY_FORM_FIELDS = [
    { name: "category", label: "Category", type: "text", required: true },
    {
        name: "categorySlug",
        label: "Category Slug",
        type: "text",
        required: true,
    },
    { name: "manufacturedDate", label: "Created On", type: "text" },
    { name: "status", label: "Status", type: "text" },
];

export function useCategory() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [store, setStore] = useState("all");
    const [warehouse, setWarehouse] = useState("all");
    const [loading] = useState(false);

    const filtered = CATALOG_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.category.toLowerCase().includes(s) ||
            r.categorySlug.toLowerCase().includes(s);
        const matchCat = category === "all" || r.status === category;
        return matchSearch && matchCat;
    });

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = filtered.slice(startIndex, endIndex);

    const [selectedSkus, setSelectedSkus] = useState([]);

    const allSelectedOnPage =
        paginatedRows.length > 0 &&
        paginatedRows.every((r) => selectedSkus.includes(r.sku));

    const someSelectedOnPage =
        paginatedRows.some((r) => selectedSkus.includes(r.sku)) &&
        !allSelectedOnPage;

    const {
        selectedItem: selectedCategory,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        openView,
        openEdit,
    } = useEntityModals();

    const viewFields = CATEGORY_VIEW_FIELDS;
    const formFields = CATEGORY_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated category", updated);
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

    // filtered export data
    const fullFilteredRows = filtered;

    const handleExportPdf = () => {
        const doc = new jsPDF();

        const tableColumn = ["Category", "Category Slug", "Created On", "Status"];
        const tableRows = [];

        fullFilteredRows.forEach((item) => {
            tableRows.push([
                item.category,
                item.categorySlug,
                item.manufacturedDate,
                item.status,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Categories Export (${fullFilteredRows.length} items)`,
            14,
            15
        );
        doc.save("categories.pdf");
    };

    const handleExportXls = () => {
        const data = fullFilteredRows.map((item) => ({
            Category: item.category,
            CategorySlug: item.categorySlug,
            CreatedOn: item.manufacturedDate,
            Status: item.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");

        XLSX.writeFile(workbook, "categories.xlsx");
    };

    // paginated exports
    const handleExportCurrentCsv = () => {
        const data = paginatedRows.map((item) => ({
            Category: item.category,
            CategorySlug: item.categorySlug,
            CreatedOn: item.manufacturedDate,
            Status: item.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `categories_page_${currentPage}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExportCurrentPdf = () => {
        const doc = new jsPDF();

        const tableColumn = ["Category", "Category Slug", "Created On", "Status"];
        const tableRows = [];

        paginatedRows.forEach((item) => {
            tableRows.push([
                item.category,
                item.categorySlug,
                item.manufacturedDate,
                item.status,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Categories Export - Page ${currentPage} (${paginatedRows.length} items)`,
            14,
            15
        );
        doc.save(`categories_page_${currentPage}.pdf`);
    };

    const handleExportCurrentXls = () => {
        const data = paginatedRows.map((item) => ({
            Category: item.category,
            CategorySlug: item.categorySlug,
            CreatedOn: item.manufacturedDate,
            Status: item.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "CategoriesPage");

        XLSX.writeFile(workbook, `categories_page_${currentPage}.xlsx`);
    };

    const handleRefresh = () => {
        setSearch("");
        setCategory("all");
        setStore("all");
        setWarehouse("all");
        setPage(1);
        setSelectedSkus([]);
    };

    return {
        // filters and basic state
        search,
        setSearch,
        category,
        setCategory,
        store,
        setStore,
        warehouse,
        setWarehouse,
        loading,
        filtered,

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
        selectedSkus,
        setSelectedSkus,
        allSelectedOnPage,
        someSelectedOnPage,

        // modals
        selectedCategory,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        openView,
        openEdit,
        viewFields,
        formFields,
        handleEditSave,

        // exports
        handleExportPdf,
        handleExportXls,
        handleExportCurrentCsv,
        handleExportCurrentPdf,
        handleExportCurrentXls,
        handleRefresh,
    };
}
