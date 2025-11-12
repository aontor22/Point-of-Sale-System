import React from "react";

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
import { Checkbox } from "@/components/ui/checkbox";

import {
    MoreHorizontal,
    Search,
    Loader2,
    Edit,
    Eye,
    Trash2,
    ArrowUpDown,
} from "lucide-react";

import CATALOG_ROWS from "@/data/ProductData";
import ProductHeader from "@/components/ui/ProductHeader";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ExportsButtons from "@/components/ui/ExportsButtons";

export default function ExpiredProducts() {
    const [search, setSearch] = React.useState("");
    const [loading] = React.useState(false);

    const filtered = CATALOG_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.brand.toLowerCase().includes(s);
        return matchSearch;
    });

    return (
        <div className="space-y-4">
            <ProductsDate />
            <div className="flex">
                <ProductHeader
                    title="Expired Products"
                    breadcrumbs={[
                        { label: "Dashboard" },
                        { label: "Expired Products", active: true },
                    ]}
                />
                <ExportsButtons />
            </div>


            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-background p-3">
                <div className="flex min-w-[260px] flex-1 items-center gap-2">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search product, SKU, brand"
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>


            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-200">
                            <TableHead className="w-10">
                                <Checkbox aria-label="Select all" />
                            </TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead className="inline-flew gap-1 justify-center items-center"><ArrowUpDown size={14} /> Manufactured Date</TableHead>
                            <TableHead className="inline-flex justify-center items-center gap-1 "><ArrowUpDown size={14} /> Expired Date</TableHead>
                            <TableHead className="w-[60px] text-right">Actions</TableHead>
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
                                <TableRow key={r.sku}>
                                    <TableCell>
                                        <Checkbox aria-label={`Select ${r.name}`} />
                                    </TableCell>
                                    <TableCell className="font-medium">{r.sku}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <span className="bg-slate-100">
                                                #
                                            </span>
                                            <span className="font-medium">{r.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{r.manufacturedDate}</TableCell>
                                    <TableCell>${r.expiredDate}</TableCell>
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
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* ===== PAGINATION ===== */}
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
}
