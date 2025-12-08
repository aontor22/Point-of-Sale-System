import { useState } from "react";
import warranties from "@/data/WarrantyData";

export const WARRANTY_VIEW_FIELDS = [
    { key: "name", label: "Warranty Name" },
    { key: "description", label: "Description" },
    { key: "durationValue", label: "Duration Value" },
    { key: "durationUnit", label: "Duration Unit" },
    { key: "status", label: "Status" },
];

export const WARRANTY_FORM_FIELDS = [
    { name: "name", label: "Warranty Name", type: "text", required: true },
    { name: "description", label: "Description", type: "text" },
    { name: "durationValue", label: "Duration Value", type: "number" },
    { name: "durationUnit", label: "Duration Unit", type: "text" },
    { name: "status", label: "Status", type: "text" },
];

export function useWarranties() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [store, setStore] = useState("all");
    const [loading] = useState(false);

    const filtered = warranties.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch = r.name.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = store === "all" || r.status === store;
        return matchSearch && matchCat && matchBrand;
    });

    // pagination
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = filtered.slice(startIndex, endIndex);

    // selection state (by id)
    const [selectedIds, setSelectedIds] = useState([]);

    const allSelectedOnPage =
        paginatedRows.length > 0 &&
        paginatedRows.every((r) => selectedIds.includes(r.id));

    const someSelectedOnPage =
        paginatedRows.some((r) => selectedIds.includes(r.id)) &&
        !allSelectedOnPage;

    // modal state
    const [selectedWarranty, setSelectedWarranty] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const viewFields = WARRANTY_VIEW_FIELDS;
    const formFields = WARRANTY_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated warranty", updated);
        // here I'll later plug API / state update
    };

    const [deletingId, setDeletingId] = useState(null);
    const [rows, setRows] = useState(warranties);

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

    return {
        // filters
        search,
        setSearch,
        category,
        setCategory,
        store,
        setStore,
        loading,
        filtered,

        // pagination
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        currentPage,
        totalPages,
        pageItems,
        paginatedRows,

        // selection
        selectedIds,
        setSelectedIds,
        allSelectedOnPage,
        someSelectedOnPage,

        // modals
        selectedWarranty,
        setSelectedWarranty,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,

        // configs / form
        viewFields,
        formFields,
        handleEditSave,
        // delete
        handleDelete,
        deletingId,
    };
}
