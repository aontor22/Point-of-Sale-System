import React, { useState } from 'react'

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
    Trash2,
    Edit,
    Eye,
    MoreHorizontal,
} from "lucide-react";

import purchases from "@/data/PurchaseData";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ButtonComponent from '@/components/ui/ChangeButton'
import { useNavigate } from 'react-router-dom';
import PurchasesOverview from '@/components/view/PurchaseView';

export default function SaleReports() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [status, setStatus] = React.useState("all");
    const [loading] = React.useState(false);

    const filtered = purchases.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.poSupplier.toLowerCase().includes(s);
        const matchCat = category === "all" || r.poSupplier === category;
        const matchBrand = status === "all" || r.poDeliveryStatus === status;
        return matchSearch && matchCat && matchBrand;
    });

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    const [isStockHistoryVisible, setStockHistoryVisible] = useState(true);
    const [isSoldStockVisible, setSoldStockVisible] = useState(true);

    const navigate = useNavigate();

    const handleAddEmployeeClick = () => {
        navigate("/user/users/add");
    };

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

        "Manager": "bg-blue-100 text-blue-600",
        "Admin": "bg-purple-100 text-purple-600",
        "Staff": "bg-emerald-100 text-emerald-700",
        "Supervisor": "bg-sky-100 text-sky-600",
        "Cashier": "bg-orange-100 text-orange-600",
        Finance: "bg-green-100 text-green-600",
    };

    return (
        <div className="space-y-4">
            <ProductsDate />
            <PurchasesOverview />

            <div className="flex-1 flex-wrap items-center justify-between gap-3 rounded-md border bg-background">
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
                                <SelectItem value="Store Operations">Store Operations</SelectItem>
                                <SelectItem value="POS Operations">POS Operations</SelectItem>
                                <SelectItem value="Inventory">Inventory</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="Customer Service">Customer Service</SelectItem>
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
                    <ProductsDate />
                    <ButtonComponent
                        title="Export"
                        isVisible={isInventoryReportVisible}
                        // onClick={handleInventoryReportClick}
                        className="bg-green-600 text-white gap-2 hover:bg-orange-600"
                        icon={<Download size={16} />}
                    ><PlusCircle size={20} /></ButtonComponent>

                    <ButtonComponent
                        title="Add User"
                        isVisible={isInventoryReportVisible}
                        onClick={handleAddEmployeeClick}
                        className="bg-blue-600 text-white gap-2 hover:bg-orange-600"
                        icon={<Plus size={16} />}
                    ><PlusCircle size={20} /></ButtonComponent>
                </div>

                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-200 dark:bg-slate-800">
                                <TableHead className="w-10">
                                    <Checkbox aria-label="Select all" />
                                </TableHead>
                                <TableHead>Purchase ID</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit Price</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Delivery</TableHead>
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
                                filtered.map((r) => (
                                    <TableRow key={r.poID}>
                                        <TableCell>
                                            <Checkbox aria-label={`Select ${r.poID}`} />
                                        </TableCell>

                                        <TableCell>{r.poCode}</TableCell>

                                        <TableCell className="whitespace-nowrap">
                                            {r.poSupplier}
                                        </TableCell>

                                        <TableCell className="whitespace-normal break-words">{r.poDate}</TableCell>

                                        <TableCell>{r.poProduct}</TableCell>

                                        <TableCell className="whitespace-normal break-words">
                                            {r.poQuantity}
                                        </TableCell>

                                        <TableCell className="whitespace-normal break-words">
                                            {r.poUnitPrice}
                                        </TableCell>

                                        <TableCell className="whitespace-normal break-words">
                                            {r.poTotalAmount}
                                        </TableCell>

                                        <TableCell className="whitespace-normal break-words">
                                            <div
                                                className={`
                                                    inline-flex items-center justify-center
                                                    px-3 py-1 min-w-[80px] h-7
                                                    rounded-full text-xs font-medium
                                                    ${r.poPaymentStatus === "Paid"
                                                        ? "bg-emerald-600 text-white"
                                                        : r.poPaymentStatus === "Partial"
                                                            ? "bg-blue-600 text-white"
                                                            : r.poPaymentStatus === "Overdue"
                                                            ? "bg-red-600 text-white"
                                                            : r.poPaymentStatus === "Pending"
                                                                ? "bg-amber-600 text-white"
                                                                : "bg-slate-200 text-slate-600"
                                                    }
            `}
                                            >
                                                {r.poPaymentStatus}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div
                                                className={`
                                                    inline-flex items-center justify-center
                                                    px-3 py-1 min-w-[80px] h-7
                                                    rounded-full text-xs font-medium
                                                    ${r.poDeliveryStatus === "Delivered"
                                                        ? "bg-emerald-100 text-green-600"
                                                        : r.poDeliveryStatus === "In Transit"
                                                            ? "bg-blue-100 text-blue-600"
                                                            : r.poDeliveryStatus === "Processing"
                                                                ? "bg-amber-100 text-amber-600"
                                                                : "bg-slate-200 text-slate-600"
                                                    }
            `}
                                            >
                                                {r.poDeliveryStatus}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
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

                {/* ===== PAGINATION ===== */}
                <div className="flex flex-wrap items-center justify-between border-t gap-3 p-3">
                    <div className="text-sm text-muted-foreground">
                        Row per page:
                        <Select defaultValue="10">
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
                        <Button variant="outline" size="sm">
                            1
                        </Button>
                        <Button variant="ghost" size="sm">
                            2
                        </Button>
                        <Button variant="ghost" size="sm">
                            3
                        </Button>
                        <Button variant="ghost" size="sm">
                            …
                        </Button>
                        <Button variant="ghost" size="sm">
                            10
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
