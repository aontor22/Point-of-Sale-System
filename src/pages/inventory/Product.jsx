// src/pages/inventory/Product.jsx
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    MoreHorizontal,
    Filter,
    Download,
    Search,
    Loader2,
    Edit,
    Eye,
    Trash2,
} from "lucide-react";

import PRODUCT_ROWS from "@/data/ProductData";
import ProductHeader from "@/components/ui/ProductHeader";
import ProductsDate from "@/components/ui/ProductsDate";
import Footer from "@/components/ui/Footer";
import ExportsButtons from "@/components/ui/ExportsButtons";
import AddImport from "@/components/ui/AddImport";

export default function ProductsPage() {
    const [search, setSearch] = React.useState("");
    const [category, setCategory] = React.useState("all");
    const [brand, setBrand] = React.useState("all");
    const [loading] = React.useState(false);

    const filtered = PRODUCT_ROWS.filter((r) => {
        const s = search.toLowerCase();
        const matchSearch =
            r.sku.toLowerCase().includes(s) ||
            r.name.toLowerCase().includes(s) ||
            r.brand.toLowerCase().includes(s);
        const matchCat = category === "all" || r.category === category;
        const matchBrand = brand === "all" || r.brand === brand;
        return matchSearch && matchCat && matchBrand;
    });

    return (
        <div className="space-y-4">
            <ProductsDate />
            <div className="flex">
                <ProductHeader
                    title="Products"
                    breadcrumbs={[
                        { label: "Dashboard" },
                        { label: "Products", active: true },
                    ]}
                />
                <div className="flex gap-2">
                    <ExportsButtons />
                    <AddImport />
                </div>
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

                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-[170px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Computers">Computers</SelectItem>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Shoe">Shoe</SelectItem>
                            <SelectItem value="Furniture">Furniture</SelectItem>
                            <SelectItem value="Bags">Bags</SelectItem>
                            <SelectItem value="Phone">Phone</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={brand} onValueChange={setBrand}>
                        <SelectTrigger className="w-[170px]">
                            <SelectValue placeholder="Brand" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Brands</SelectItem>
                            <SelectItem value="Lenovo">Lenovo</SelectItem>
                            <SelectItem value="Beats">Beats</SelectItem>
                            <SelectItem value="Nike">Nike</SelectItem>
                            <SelectItem value="Apple">Apple</SelectItem>
                            <SelectItem value="Amazon">Amazon</SelectItem>
                            <SelectItem value="Modern Wave">Modern Wave</SelectItem>
                            <SelectItem value="Berry">Berry</SelectItem>
                            <SelectItem value="Anime">Anime</SelectItem>
                            <SelectItem value="The North Face">The North Face</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-2">
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
                            <TableHead>Category</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead className="text-right">Qty</TableHead>
                            <TableHead>Created By</TableHead>
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
                                        <div className="flex flex-col">
                                            <span className="font-medium">{r.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                #{r.sku}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-normal">
                                            {r.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{r.brand}</TableCell>
                                    <TableCell className="text-right">${r.price}</TableCell>
                                    <TableCell>{r.unit}</TableCell>
                                    <TableCell className="text-right">{r.qty}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={r.user.avatar} alt={r.user.name} />
                                                <AvatarFallback>
                                                    {r.user.name
                                                        .split(" ")
                                                        .map((w) => w[0])
                                                        .join("")
                                                        .slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{r.user.name}</span>
                                        </div>
                                    </TableCell>
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
