import { useState, useRef } from "react";
import CATALOG_ROWS from "@/data/ProductData";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const MANAGE_STOCK_VIEW_FIELDS = [
    { key: "warehouse", label: "Warehouse" },
    { key: "store", label: "Store" },
    { key: "name", label: "Product Name" },
    { key: "manufacturedDate", label: "Date" },
    { key: "person", label: "Person Name" },
    { key: "qty", label: "Quantity" },
];

export const MANAGE_STOCK_FORM_FIELDS = [
    { name: "warehouse", label: "Warehouse", type: "text" },
    { name: "store", label: "Store", type: "text" },
    { name: "name", label: "Product Name", type: "text", required: true },
    { name: "manufacturedDate", label: "Date", type: "text" },
    { name: "person", label: "Person Name", type: "text" },
    { name: "qty", label: "Quantity", type: "number" },
];

export function useManageStock() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [store, setStore] = useState("all");
    const [warehouse, setWarehouse] = useState("all");
    const [loading] = useState(false);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const [selectedSkus, setSelectedSkus] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const [addOpen, setAddOpen] = useState(false);

    const fileInputRef = useRef(null);

    const viewFields = MANAGE_STOCK_VIEW_FIELDS;
    const formFields = MANAGE_STOCK_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated manage stock item", updated);
    };

    const handleAddSave = (data) => {
        console.log("New manage stock item", data);
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


    const handleImportButtonClick = () => {
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
        console.log("Files selected for import:", files);

        e.target.value = "";
    };

    // filter logic
    const filtered = CATALOG_ROWS.filter((r) => {
        const s = search.toLowerCase();

        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.store.toLowerCase().includes(s);

        const matchStore = store === "all" || r.store === store;
        const matchWarehouse = warehouse === "all" || r.warehouse === warehouse;

        return matchSearch && matchStore && matchWarehouse;
    });

    // pagination
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = filtered.slice(startIndex, endIndex);

    // selection
    const allSelectedOnPage =
        paginatedRows.length > 0 &&
        paginatedRows.every((r) => selectedSkus.includes(r.sku));

    const someSelectedOnPage =
        paginatedRows.some((r) => selectedSkus.includes(r.sku)) &&
        !allSelectedOnPage;

    // page list
    const makePageList = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (start > 2) pages.push("ellipsis-start");
            for (let i = start; i <= end; i++) pages.push(i);
            if (end < totalPages - 1) pages.push("ellipsis-end");

            pages.push(totalPages);
        }
        return pages;
    };

    const pageItems = makePageList();

    // export full filtered
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
            `Manage Stock Export (${fullFilteredRows.length} items)`,
            14,
            15
        );
        doc.save("manage_stock.pdf");
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "ManageStock");

        XLSX.writeFile(workbook, "manage_stock.xlsx");
    };

    const handleRefresh = () => {
        setSearch("");
        setCategory("all");
        setStore("all");
        setWarehouse("all");
        setPage(1);
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

        // current item + modals
        selectedItem,
        setSelectedItem,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        addOpen,
        setAddOpen,

        // fields + submit handlers
        viewFields,
        formFields,
        handleEditSave,
        handleAddSave,

        // exports
        handleExportPdf,
        handleExportXls,
        handleRefresh,

        // import
        fileInputRef,
        handleImportButtonClick,
        handleFileChange,
        handleDelete,
        deletingId,
    };
}
