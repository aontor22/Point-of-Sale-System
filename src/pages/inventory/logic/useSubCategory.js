import { useState } from "react";
import CATALOG_ROWS from "@/data/ProductData";
import { useEntityModals } from "@/hooks/useEntityModals";

export const SUBCATEGORY_VIEW_FIELDS = [
    { key: "subCategory", label: "Sub Category" },
    { key: "category", label: "Category" },
    { key: "categoryCode", label: "Category Code" },
    { key: "description", label: "Description" },
    { key: "status", label: "Status" },
];

export const SUBCATEGORY_FORM_FIELDS = [
    {
        name: "subCategory",
        label: "Sub Category",
        type: "text",
        required: true,
    },
    { name: "category", label: "Category", type: "text", required: true },
    { name: "categoryCode", label: "Category Code", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "status", label: "Status", type: "text" },
];

export function useSubCategory() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [store, setStore] = useState("all");
    const [loading] = useState(false);

    const filtered = CATALOG_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.category.toLowerCase().includes(s) ||
            r.subCategory.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = store === "all" || r.status === store;
        return matchSearch && matchCat && matchBrand;
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
        selectedItem: selectedSubCategory,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        openView,
        openEdit,
    } = useEntityModals();

    // use exported configs
    const viewFields = SUBCATEGORY_VIEW_FIELDS;
    const formFields = SUBCATEGORY_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated sub category", updated);
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
        currentPage,
        totalPages,
        pageItems,
        setPage,
        paginatedRows,

        // selection
        selectedSkus,
        setSelectedSkus,
        allSelectedOnPage,
        someSelectedOnPage,

        // modals
        selectedSubCategory,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        openView,
        openEdit,

        // configs / form
        viewFields,
        formFields,
        handleEditSave,
    };
}
