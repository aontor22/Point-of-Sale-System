import EmployeeView from "@/components/view/AttendanceView";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Loader2,
    ArrowUpDown,
    Search,
    Dot,
    PlusCircle,
    Download,
    Plus,
    Mail,
    PhoneCall,
    Clock,
    Map,
    MapPin,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
} from "lucide-react";

import employee from "@/data/EmployeeData";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ButtonComponent from "@/components/ui/ChangeButton";
import { AttendanceHeader } from "@/components/ui/AttendanceHeader";

export default function SaleReports() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [status, setStatus] = React.useState("all");
    const [loading] = React.useState(false);

    const filtered = employee.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch = r.empName.toLowerCase().includes(s);
        const matchCat = category === "all" || r.empDepartment === category;
        const matchBrand = status === "all" || r.empStatus === status;
        return matchSearch && matchCat && matchBrand;
    });

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    const [isStockHistoryVisible, setStockHistoryVisible] = useState(true);
    const [isSoldStockVisible, setSoldStockVisible] = useState(true);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    // pagination logic remains correct
    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // This is the array that holds only the items for the current page
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

    const categoryColors = {
        "Office Supplies": "bg-purple-100 text-purple-600",
        Utilities: "bg-sky-100 text-sky-600",
        Marketing: "bg-pink-100 text-pink-600",
        Transportation: "bg-orange-100 text-orange-600",
        "Equipment Maintenance": "bg-red-100 text-red-600",
        Rent: "bg-indigo-100 text-indigo-600",
        "Professional Services": "bg-cyan-100 text-cyan-700",
        "Software Subscription": "bg-teal-100 text-teal-700",
        "Employee Benefits": "bg-emerald-100 text-emerald-700",
        Travel: "bg-amber-100 text-amber-700",

        "Sales Revenue": "bg-sky-100 text-sky-600",
        "Service Revenue": "bg-purple-100 text-purple-600",
        "Recurring Revenue": "bg-emerald-100 text-emerald-700",
        "Investment Income": "bg-indigo-100 text-indigo-600",
        "Rental Income": "bg-orange-100 text-orange-600",
        Commission: "bg-pink-100 text-pink-600",
        "Licensing Revenue": "bg-teal-100 text-teal-700",

        "Store Operations": "bg-blue-100 text-blue-600",
        "POS Operations": "bg-purple-100 text-purple-600",
        Inventory: "bg-emerald-100 text-emerald-700",
        Sales: "bg-sky-100 text-sky-600",
        "Customer Service": "bg-orange-100 text-orange-600",
        Finance: "bg-green-100 text-green-600",
    };

    return (
        <div className="space-y-4">
            <ProductsDate />

            <div className="w-full">
                <AttendanceHeader attendanceRate={0.6} />
                <EmployeeView />
            </div>

            <div className="w-full flex flex-col flex-wrap items-center justify-between gap-3 rounded-md border bg-white dark:bg-slate-900">
                <div className="flex w-full items-center p-3 gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search product, SKU, brand"
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="ml-auto gap-3 flex">
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="w-42.5">
                                <SelectValue placeholder="Brand" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Department</SelectItem>
                                <SelectItem value="Store Operations">
                                    Store Operations
                                </SelectItem>
                                <SelectItem value="POS Operations">
                                    POS Operations
                                </SelectItem>
                                <SelectItem value="Inventory">Inventory</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="Customer Service">
                                    Customer Service
                                </SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-42.5">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Electro Mart">Active</SelectItem>
                                <SelectItem value="Quantum Gadgets">Inactive</SelectItem>
                                <SelectItem value="Prime Bazaar">On Leave</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <ButtonComponent
                        title="Export"
                        isVisible={isInventoryReportVisible}
                        className="bg-green-600 text-white gap-2 hover:bg-orange-600"
                        icon={<Download size={16} />}
                    >
                        <PlusCircle size={20} />
                    </ButtonComponent>

                    <ButtonComponent
                        title="Mark Attendance"
                        isVisible={isInventoryReportVisible}
                        className="bg-blue-600 text-white gap-2 hover:bg-orange-600"
                        icon={<Clock size={16} />}
                    >
                        <PlusCircle size={20} />
                    </ButtonComponent>
                </div>

                <div className="w-full overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow className="bg-slate-200 dark:bg-slate-800">
                                <TableHead className="w-10">
                                    <Checkbox aria-label="Select all" />
                                </TableHead>
                                <TableHead>Employee</TableHead>
                                <TableHead>Employee ID</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Check In</TableHead>
                                <TableHead>Check Out</TableHead>
                                <TableHead>Work Hours</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="h-24 text-center">
                                        <div className="inline-flex items-center gap-2 text-muted-foreground">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Loading products…
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={10}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No products found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedRows.map((r) => (
                                    <TableRow key={r.empID}>
                                        <TableCell>
                                            <Checkbox aria-label={`Select ${r.empStatus}`} />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shrink-0">
                                                    <img
                                                        src={r.empImage}
                                                        alt={r.empName}
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {r.empName}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{r.empCode}</TableCell>
                                        <TableCell>
                                            <div
                                                className={`
                                                inline-flex items-center justify-center
                                                px-3 py-1 min-w-[120px] h-7
                                                rounded-full text-xs font-medium
                                                ${categoryColors[
                                                    r.empDepartment || r.empDepartment
                                                    ] ||
                                                    "bg-slate-100 text-slate-700"
                                                    }
                                                `}
                                            >
                                                {r.empDepartment || r.empDepartment}
                                            </div>
                                        </TableCell>
                                        <TableCell>{r.empRole}</TableCell>
                                        <TableCell>
                                            {r.empCheckIn && r.empCheckIn !== "-" ? (
                                                <div className="flex items-center gap-1">
                                                    <Clock
                                                        className="text-green-500"
                                                        size={14}
                                                    />
                                                    {r.empCheckIn}
                                                </div>
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            {r.empCheckOut && r.empCheckOut !== "-" ? (
                                                <div className="flex items-center gap-1">
                                                    <Clock
                                                        className="text-red-500"
                                                        size={14}
                                                    />
                                                    {r.empCheckOut}
                                                </div>
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </TableCell>

                                        <TableCell>{r.empWorkHours}</TableCell>
                                        <TableCell>
                                            {r.empLocation && r.empLocation !== "-" ? (
                                                <div className="flex items-center gap-1">
                                                    <MapPin
                                                        className="text-gray-500"
                                                        size={14}
                                                    />
                                                    {r.empLocation}
                                                </div>
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div
                                                className={`
                                                    inline-flex items-center justify-center
                                                    px-3 py-1 min-w-20 h-7
                                                    rounded-full text-xs font-medium
                                                    ${r.empAttendanceStatus === "Present"
                                                        ? "bg-emerald-500 text-white"
                                                        : r.empAttendanceStatus === "Late"
                                                            ? "bg-orange-500 text-white"
                                                            : r.empAttendanceStatus ===
                                                                "On Leave"
                                                                ? "bg-blue-400 text-white"
                                                                : r.empAttendanceStatus ===
                                                                    "Half Day"
                                                                    ? "bg-purple-600 text-white"
                                                                    : r.empAttendanceStatus ===
                                                                        "Absent"
                                                                        ? "bg-red-600 text-white"
                                                                        : ""
                                                    }
                                                `}
                                            >
                                                {r.empAttendanceStatus}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="gap-2">
                                                        <Eye className="h-4 w-4" /> View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2">
                                                        <Edit className="h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 text-destructive">
                                                        <Trash2 className="h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex w-full -mt-3 flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <span className="p-4">Row per page:</span>
                        <Select
                            value={String(rowsPerPage)}
                            onValueChange={(value) => {
                                const num = Number(value);
                                setRowsPerPage(num);
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="ml-2 inline-flex h-8 w-[72px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            Prev
                        </Button>

                        {pageItems.map((item, idx) =>
                            typeof item === "number" ? (
                                <Button
                                    key={idx}
                                    className={
                                        item === currentPage
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-white dark:bg-slate-700 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600 text-slate-800"
                                    }
                                    size="sm"
                                    onClick={() => setPage(item)}
                                >
                                    {item}
                                </Button>
                            ) : (
                                <Button key={idx} variant="ghost" size="sm" disabled>
                                    …
                                </Button>
                            )
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </Button>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}
