// src/pages/inventory/useStockValuation.js
import { useState, useRef } from "react";
import CATALOG_ROWS from "@/data/ProductData";

export const STOCK_VALUATION_VIEW_FIELDS = [
    { key: "name", label: "Product Name" },
    { key: "sku", label: "SKU" },
    { key: "category", label: "Category" },
    { key: "qty", label: "Quantity" },
    { key: "costPrice", label: "Cost Price" },
    { key: "totalPrice", label: "Total Value" },
    { key: "status", label: "Status" },
];

export const STOCK_VALUATION_FORM_FIELDS = [
    { name: "name", label: "Product Name", type: "text", required: true },
    { name: "sku", label: "SKU", type: "text", required: true },
    { name: "category", label: "Category", type: "text", required: true },
    { name: "qty", label: "Quantity", type: "number", required: true },
    { name: "costPrice", label: "Cost Price", type: "number", required: true },
    { name: "totalPrice", label: "Total Value", type: "number" },
    { name: "status", label: "Status", type: "text" },
];

export function useStockValuation() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [store, setStore] = useState("all");
    const [warehouse, setWarehouse] = useState("all"); // reserved for future filter
    const [loading] = useState(false);

    const fileInputRef = useRef(null);

    // modal state
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    // local delete-loading state
    const [deletingId, setDeletingId] = useState(null);

    const viewFields = STOCK_VALUATION_VIEW_FIELDS;
    const formFields = STOCK_VALUATION_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated stock valuation item:", updated);
        // TODO: call PUT/PATCH API here later
    };

    const handleAddSave = (data) => {
        console.log("New stock valuation item:", data);
        // TODO: call POST API here later
    };

    const handleImportClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
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

        console.log("Files selected for stock valuation import:", files);
        // TODO: send files to backend import API here

        e.target.value = "";
    };

    // DELETE HANDLER
    const handleDelete = async (item) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${item.name} (${item.sku})?`
        );
        if (!confirmDelete) return;

        try {
            setDeletingId(item.sku);

            // TODO: replace console.log with real API call
            // await api.delete(`/stock-valuation/${item.id}`);
            console.log("Delete request for stock valuation item:", {
                sku: item.sku,
                id: item.id,
            });

            // When you have real data in state, remove it here
            // setRows(prev => prev.filter(r => r.id !== item.id));
        } catch (err) {
            console.error("Error deleting item:", err);
            alert("Failed to delete item. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    /** ---------- FILTERING ---------- */
    const filtered = CATALOG_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.store.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = store === "all" || r.status === store;
        return matchSearch && matchCat && matchBrand;
    });

    const inventoryValue = CATALOG_ROWS.reduce(
        (sum, product) => sum + product.totalPrice,
        0
    ).toFixed(2);

    const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    /** ---------- PAGINATION ---------- */
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

    /** ---------- SELECTION ---------- */
    const [selectedIds, setSelectedIds] = useState([]);
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

    return {
        // filters
        search,
        setSearch,
        category,
        setCategory,
        store,
        setStore,
        warehouse,
        setWarehouse,
        loading,

        // inventory summary
        inventoryValue,
        currentDate,

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

        // modals
        selectedItem,
        setSelectedItem,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        addOpen,
        setAddOpen,

        // delete state
        deletingId,
        handleDelete,

        // fields + handlers
        viewFields,
        formFields,
        handleEditSave,
        handleAddSave,

        // import
        fileInputRef,
        handleImportClick,
        handleFileChange,
    };
}
