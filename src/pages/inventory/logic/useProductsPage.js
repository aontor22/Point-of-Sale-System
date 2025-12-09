import { useRef, useState } from "react";
import PRODUCT_ROWS from "@/data/ProductData";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const PRODUCT_VIEW_FIELDS = [
    { key: "sku", label: "SKU" },
    { key: "name", label: "Product Name" },
    { key: "category", label: "Category" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Price" },
    { key: "unit", label: "Unit" },
    { key: "qty", label: "Quantity" },
    {
        key: "user",
        label: "Created By",
        render: (val) => (val?.name ? val.name : "-"),
    },
];

export const PRODUCT_FORM_FIELDS = [
    { name: "name", label: "Product Name", type: "text", required: true },
    { name: "sku", label: "SKU", type: "text", required: true },
    { name: "category", label: "Category", type: "text" },
    { name: "brand", label: "Brand", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "unit", label: "Unit", type: "text" },
    { name: "qty", label: "Quantity", type: "number" },
];

export function useProductsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [brand, setBrand] = useState("all");
    const [loading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const [selectedSkus, setSelectedSkus] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const [deletingId, setDeletingId] = useState(null);
    const [rows, setRows] = useState(PRODUCT_ROWS);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const fileInputRef = useRef(null);

    const viewFields = PRODUCT_VIEW_FIELDS;
    const formFields = PRODUCT_FORM_FIELDS;

    const handleEditSave = (updated) => {
        console.log("Updated product", updated);
        // TODO: PATCH / PUT API call here
    };

    const handleAddSave = (data) => {
        console.log("New product", data);
        // TODO: POST API call here
    };

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

            // TODO: replace with real API call
            console.log("Delete request sent for id:", rowId);

            setRows((prev) => prev.filter((row) => row.id !== rowId));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete item. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    /** ------------------------------
     * FILTER LOGIC (Table + Export)
     * ------------------------------ */
    const filtered = rows.filter((r) => {
        const s = search.toLowerCase();

        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.brand.toLowerCase().includes(s);

        const matchCategory = category === "all" || r.category === category;
        const matchBrand = brand === "all" || r.brand === brand;

        return matchSearch && matchCategory && matchBrand;
    });

    /** ------------------------------
     * PAGINATION
     * ------------------------------ */
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedRows = filtered.slice(startIndex, endIndex);

    const allSelectedOnPage =
        paginatedRows.length > 0 &&
        paginatedRows.every((r) => selectedSkus.includes(r.sku));

    const someSelectedOnPage =
        paginatedRows.some((r) => selectedSkus.includes(r.sku)) &&
        !allSelectedOnPage;

    const handleToggleAllOnPage = (checked) => {
        if (checked) {
            const pageSkus = paginatedRows.map((r) => r.sku);
            setSelectedSkus((prev) =>
                Array.from(new Set([...prev, ...pageSkus]))
            );
        } else {
            const pageSet = new Set(paginatedRows.map((r) => r.sku));
            setSelectedSkus((prev) => prev.filter((sku) => !pageSet.has(sku)));
        }
    };

    const handleToggleRow = (sku, checked) => {
        setSelectedSkus((prev) => {
            if (checked) {
                if (prev.includes(sku)) return prev;
                return [...prev, sku];
            }
            return prev.filter((item) => item !== sku);
        });
    };

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

    /** IMPORT HANDLERS */
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
        // TODO: send files to backend import API here

        e.target.value = "";
    };

    /** -----------------------------------------
     * EXPORT FILTERED ROWS (WITHOUT PAGINATION)
     * ----------------------------------------- */
    const fullFilteredRows = filtered;

    const handleExportPdf = () => {
        const doc = new jsPDF();

        const tableColumn = [
            "SKU",
            "Name",
            "Category",
            "Brand",
            "Price",
            "Unit",
            "Qty",
        ];
        const tableRows = [];

        fullFilteredRows.forEach((item) => {
            tableRows.push([
                item.sku,
                item.name,
                item.category,
                item.brand,
                `$${item.price}`,
                item.unit,
                item.qty,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(`Products Export (${fullFilteredRows.length} items)`, 14, 15);
        doc.save("products.pdf");
    };

    const handleExportXls = () => {
        const data = fullFilteredRows.map((item) => ({
            SKU: item.sku,
            Name: item.name,
            Category: item.category,
            Brand: item.brand,
            Price: item.price,
            Unit: item.unit,
            Qty: item.qty,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

        XLSX.writeFile(workbook, "products.xlsx");
    };

    /** -----------------------------------------
     * EXPORT CURRENT PAGE (PAGINATED DATA)
     * ----------------------------------------- */

    const handleExportCurrentCsv = () => {
        const data = paginatedRows.map((item) => ({
            SKU: item.sku,
            Name: item.name,
            Category: item.category,
            Brand: item.brand,
            Price: item.price,
            Unit: item.unit,
            Qty: item.qty,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `products_page_${currentPage}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleExportCurrentPdf = () => {
        const doc = new jsPDF();

        const tableColumn = [
            "SKU",
            "Name",
            "Category",
            "Brand",
            "Price",
            "Unit",
            "Qty",
        ];
        const tableRows = [];

        paginatedRows.forEach((item) => {
            tableRows.push([
                item.sku,
                item.name,
                item.category,
                item.brand,
                `$${item.price}`,
                item.unit,
                item.qty,
            ]);
        });

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.text(
            `Products Export - Page ${currentPage} (${paginatedRows.length} items)`,
            14,
            15
        );
        doc.save(`products_page_${currentPage}.pdf`);
    };

    const handleExportCurrentXls = () => {
        const data = paginatedRows.map((item) => ({
            SKU: item.sku,
            Name: item.name,
            Category: item.category,
            Brand: item.brand,
            Price: item.price,
            Unit: item.unit,
            Qty: item.qty,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products_Page");

        XLSX.writeFile(workbook, `products_page_${currentPage}.xlsx`);
    };

    const handleRefresh = () => {
        setSearch("");
        setCategory("all");
        setBrand("all");
        setPage(1);
    };

    return {
        // filters
        search,
        setSearch,
        category,
        setCategory,
        brand,
        setBrand,
        loading,

        // rows + pagination
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
        allSelectedOnPage,
        someSelectedOnPage,
        handleToggleAllOnPage,
        handleToggleRow,

        // modals + selected
        selectedProduct,
        setSelectedProduct,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        addOpen,
        setAddOpen,

        // delete
        deletingId,
        handleDelete,

        // fields + CRUD handlers
        viewFields,
        formFields,
        handleEditSave,
        handleAddSave,

        // import + export
        fileInputRef,
        handleImportButtonClick,
        handleFileChange,
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
