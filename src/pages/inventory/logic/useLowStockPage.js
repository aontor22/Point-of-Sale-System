import { useState } from "react";
import CATALOG_ROWS from "@/data/ProductData";
import { useEntityModals } from "@/hooks/useEntityModals";

export function useProductsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [store, setStore] = useState("all");
    const [warehouse, setWarehouse] = useState("all");
    const [loading] = useState(false);

    const filtered = CATALOG_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.store.toLowerCase().includes(s) ||
            r.category.toLowerCase().includes(s) ||
            r.warehouse.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = store === "all" || r.store === store;
        const matchWarehouse = warehouse === "all" || r.warehouse === warehouse;
        return matchSearch && matchCat && matchBrand && matchWarehouse;
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
        selectedItem: selectedProduct,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        openView,
        openEdit,
    } = useEntityModals();

    const viewFields = [
        { key: "warehouse", label: "Warehouse" },
        { key: "store", label: "Store" },
        { key: "name", label: "Product Name" },
        { key: "category", label: "Category" },
        { key: "sku", label: "SKU" },
        { key: "qty", label: "Quantity" },
        { key: "qtyAlert", label: "Qty Alert" },
    ];

    const formFields = [
        { name: "warehouse", label: "Warehouse", type: "text" },
        { name: "store", label: "Store", type: "text" },
        { name: "name", label: "Product Name", type: "text", required: true },
        { name: "category", label: "Category", type: "text" },
        { name: "sku", label: "SKU", type: "text", required: true },
        { name: "qty", label: "Quantity", type: "number" },
        { name: "qtyAlert", label: "Qty Alert", type: "number" },
    ];

    const handleEditSave = (updated) => {
        console.log("Updated low stock product", updated);
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
        warehouse,
        setWarehouse,
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
        selectedProduct,
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
