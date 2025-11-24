import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "@/components/ui/Footer";
import ProductsDate from "@/components/ui/ProductsDate";
import StatView from "@/components/view/companyStatView";
import PRODUCT_ROWS from "@/data/CompaniesData";

import {
    MoreHorizontal,
    Filter,
    Download,
    Search,
    Loader2,
    Edit,
    Eye,
    Trash2,
    Plus,
    Building2,
    User,
    Users,
    DollarSign,
} from "lucide-react";

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
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import ButtonComponent from "@/components/ui/ChangeButton";

const DashBoard = () => {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [brand, setBrand] = React.useState("all");
    const [loading] = React.useState(false);

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    const navigate = useNavigate();

    const handleAddEmployeeClick = () => {
        navigate("/user/users/add");
    };

    const filtered = PRODUCT_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.company.toLowerCase().includes(s) ||
            r.owner.toLowerCase().includes(s) ||
            r.domain.toLowerCase().includes(s);
        const matchCat = category === "all" || r.status === category;
        const matchBrand = brand === "all" || r.subscription === brand;
        return matchSearch && matchCat && matchBrand;
    });

    return (
        <div className="space-y-6">
            <div className="w-full">
                <ProductsDate />
            </div>

            <div className="flex-1">
                <h1 className="text-xl font-semibold text-slate-800">
                    Companies Management
                </h1>
                <span className="text-slate-500">
                    Monitor and control all registered companies
                </span>
            </div>

            <div className="space-y-4">
                <StatView />
            </div>

            {/* Top filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-white dark:bg-slate-800 p-3">
                <div className="flex min-w-[260px] flex-1 items-center gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search companies, owned"
                            className="pl-8 dark:bg-slate-900"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-38 dark:bg-slate-900">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Expired">Expired</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={brand} onValueChange={setBrand}>
                        <SelectTrigger className="w-38 dark:bg-slate-900">
                            <SelectValue placeholder="Plan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Plans</SelectItem>
                            <SelectItem value="Standard">Standard</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-2 dark:bg-slate-900">
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 dark:bg-slate-900"
                            >
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>CSV</DropdownMenuItem>
                            <DropdownMenuItem>Excel</DropdownMenuItem>
                            <DropdownMenuItem>PDF</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <ButtonComponent
                        title="Add Company"
                        isVisible={isInventoryReportVisible}
                        onClick={handleAddEmployeeClick}
                        className="bg-blue-600 text-white gap-2 hover:bg-orange-600"
                        icon={<Plus size={16} />}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-200 dark:bg-slate-800">
                            <TableHead className="w-10">
                                <Checkbox aria-label="Select all" />
                            </TableHead>
                            <TableHead>Company Info</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Domain</TableHead>
                            <TableHead>Subscription</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Users</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Registered</TableHead>
                            <TableHead>Expiry</TableHead>
                            <TableHead className="w-15 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={11} className="h-24 text-center">
                                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Loading products…
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={11}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No products found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((r) => {

                                return (
                                    <TableRow key={r.id}>
                                        <TableCell>
                                            <Checkbox aria-label={`Select ${r.company}`} />
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="size-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-[0px_2.1207828521728516px_4.241565704345703px_-2.1207828521728516px_rgba(0,0,0,0.10)] shadow-[0px_4.241565704345703px_6.3623480796813965px_-1.0603914260864258px_rgba(0,0,0,0.10)] inline-flex justify-center items-center">
                                                    <Building2 className="h-5 w-5 text-white" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{r.company}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {r.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="font-medium">{r.owner}</TableCell>

                                        <TableCell className="text-blue-500 font-semibold">{r.domain}</TableCell>

                                        <TableCell>
                                            <div
                                                className={`
                                                    inline-flex items-center justify-center
                                                    px-3 py-1 min-w-20 h-7
                                                    rounded-full text-xs font-medium
                                                    ${r.subscription === "Business"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : r.subscription === "Premium"
                                                            ? "bg-purple-100 text-purple-600"
                                                            : "bg-slate-200 text-slate-700"
                                                    }
                                            `}
                                            >
                                                {r.subscription}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div
                                                className={`
                                                    inline-flex items-center justify-center
                                                    px-3 py-1 min-w-20 h-7
                                                    rounded-full text-xs font-medium
                                                    ${r.status === "Active"
                                                        ? "bg-emerald-100 text-emerald-600"
                                                        : r.status === "Suspended"
                                                            ? "bg-red-100 text-red-600"
                                                            : r.status === "Pending"
                                                                ? "bg-orange-100 text-orange-600"
                                                                : "bg-slate-200 text-slate-700"
                                                    }
                                            `}
                                            >
                                                {r.status}
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <div className="flex items-center gap-1 justify-center">
                                                <Users size={14} />
                                                {r.users}
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <div className="flex items-center gap-1 justify-center">
                                                <DollarSign size={14} />
                                                {r.revenue}
                                            </div>
                                        </TableCell>


                                        <TableCell>
                                            <span className="text-sm">{r.registered}</span>
                                        </TableCell>

                                        <TableCell className="text-right">{r.expiry}</TableCell>

                                        <TableCell className="text-right">
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
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3">
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

            <Footer />
        </div>
    );
};

export default DashBoard;
