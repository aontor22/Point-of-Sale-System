import StatView from '@/components/view/repStatView'
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
} from "lucide-react";

import stores from "@/data/StoreData";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ProductsHeader from '@/components/ui/ProductHeader';
import ButtonComponent from '@/components/ui/ChangeButton'
import ExportsButtons from '@/components/ui/ExportsButtons';

export default function SaleReports() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [brand, setBrand] = React.useState("all");
    const [status, setStatus] = React.useState("all");
    const [loading] = React.useState(false);

    const filtered = stores.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.storeName.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = brand === "all" || r.brand === brand;
        return matchSearch && matchCat && matchBrand;
    });

    const [isInventoryReportVisible, setInventoryReportVisible] = useState(true);
    const [isStockHistoryVisible, setStockHistoryVisible] = useState(true);
    const [isSoldStockVisible, setSoldStockVisible] = useState(true);

    return (
        <div className="space-y-4">
            <ProductsDate />
            <div className="flex">
                <ProductsHeader
                    title="Stores" breadcrumbs={
                        [
                            { label: "Dashboard" },
                            { label: "Stores", active: true },
                        ]
                    } />
                <div className="flex gap-4">
                    <ExportsButtons />
                    <ButtonComponent
                        title="Add Store"
                        isVisible={isInventoryReportVisible}
                        // onClick={handleInventoryReportClick}
                        className="bg-orange-500 text-white"
                    ><PlusCircle size={20} /></ButtonComponent>
                </div>
            </div>

            <div className="flex-1 flex-wrap items-center justify-between gap-3 rounded-md border bg-background">
                <div className="flex w-full flex-1 items-center p-3 gap-2">
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
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-42.5">
                                <SelectValue placeholder="Brand" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Status</SelectItem>
                                <SelectItem value="Electro Mart">Electro Mart</SelectItem>
                                <SelectItem value="Quantum Gadgets">Quantum Gadgets</SelectItem>
                                <SelectItem value="Prime Bazaar">Prime Bazaar</SelectItem>
                                <SelectItem value="Gadget World">Gadget World</SelectItem>
                                <SelectItem value="Volt Vault">Volt Vault</SelectItem>
                                <SelectItem value="Elite Retail">Elite Retail</SelectItem>
                                <SelectItem value="Prime Mart">Prime Mart</SelectItem>
                                <SelectItem value="Neo Tech">Neo Tech</SelectItem>
                                <SelectItem value="Urban Mart">Urban Mart</SelectItem>
                                <SelectItem value="Travel Mart">Travel Mart</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-200">
                                <TableHead className="w-10">
                                    <Checkbox aria-label="Select all" />
                                </TableHead>
                                <TableHead>Store</TableHead>
                                <TableHead>User Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Status</TableHead>
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
                                    <TableRow key={r.status}>
                                        <TableCell>
                                            <Checkbox aria-label={`Select ${r.status}`} />
                                        </TableCell>
                                        <TableCell>{r.storeName}</TableCell>
                                        <TableCell>{r.userName}</TableCell>
                                        <TableCell>{r.email}</TableCell>
                                        <TableCell>{r.phone}</TableCell>
                                        <TableCell><div className="bg-green-600 w-18 items-center rounded-lg text-white flex text-center h-5.5"><Dot className="-mr-3 -ml-2  " size={40} /> {r.status}</div></TableCell>
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
