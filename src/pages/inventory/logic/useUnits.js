import { useState } from "react";
import CATALOG_ROWS from "@/data/ProductData";

export const UNITS_VIEW_FIELDS = [
    { key: "unitName", label: "Unit" },
    { key: "unitShortName", label: "Short Name" },
    { key: "qty", label: "Number of Products" },
    { key: "manufacturedDate", label: "Created Date" },
    { key: "status", label: "Status" },
];

export const UNITS_FORM_FIELDS = [
    { name: "unitName", label: "Unit Name", type: "text", required: true },
    { name: "unitShortName", label: "Unit Short Name", type: "text", required: true },
    { name: "qty", label: "Number of Products", type: "number" },
    { name: "manufacturedDate", label: "Created Date", type: "text" },
    { name: "status", label: "Status", type: "text" },
];

export function useUnits() {
    const [search, setSearch] = useState("");
    const [store, setStore] = useState("all");
    const [loading] = useState(false);

    const filtered = CATALOG_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.unitName.toLowerCase().includes(s) ||
            r.unit.toLowerCase().includes(s);
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
    const [selectedSkus, setSelectedSkus] = useState([]);

    const allSelectedOnPage =
        paginatedRows.length > 0 &&
        paginatedRows.every((r) => selectedSkus.includes(r.sku));

    const someSelectedOnPage =
        paginatedRows.some((r) => selectedSkus.includes(r.sku)) &&
        !allSelectedOnPage;

    // modal state
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const viewFields = UNITS_VIEW_FIELDS;
    const formFields = UNITS_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated unit", updated);
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
        currentPage,
        totalPages,
        pageItems,
        paginatedRows,
        selectedSkus,
        setSelectedSkus,
        allSelectedOnPage,
        someSelectedOnPage,
        selectedUnit,
        setSelectedUnit,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        viewFields,
        formFields,
        handleEditSave,
    };
}
