// src/components/products/ProductsHeader.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    ChevronRight,
    ChevronUp,
    FileText,
    FileSpreadsheet,
    RefreshCw,
    Plus,
    Download,
    Calendar,
} from "lucide-react";

export default function ProductsHeader({
    onAdd,
    onImport,
    onExportPdf,
    onExportXls,
    onRefresh
}) {
    return (
        <div className="w-full">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h2 className="text-[22px] font-bold tracking-tight text-slate-800">Products</h2>
                    <div className="flex items-center text-sm">
                        <span className="font-semibold text-slate-600">Dashboard</span>
                        <ChevronRight className="mx-1 h-4 w-4 text-slate-400" />
                        <span className="font-medium text-slate-800">Products</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-md border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                            onClick={onExportPdf}
                            title="Export PDF"
                        >
                            <FileText className="h-5 w-5 text-red-600" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-md border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                            onClick={onExportXls}
                            title="Export XLS"
                        >
                            <FileSpreadsheet className="h-5 w-5 text-green-700" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-md border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                            onClick={onRefresh}
                            title="Refresh"
                        >
                            <RefreshCw className="h-5 w-5 text-slate-700" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-md border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                            title="Collapse"
                        >
                            <ChevronUp className="h-5 w-5 text-slate-700" />
                        </Button>
                    </div>

                    <Separator orientation="vertical" className="hidden h-6 sm:block" />

                    <Button
                        size="sm"
                        className="h-10 rounded-md bg-[#0b5ed7] px-4 font-semibold text-white hover:bg-[#0a58ca]"
                        onClick={onAdd}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>

                    <Button
                        size="sm"
                        className="h-10 rounded-md bg-[#28a745] px-4 font-semibold text-white hover:bg-[#218838]"
                        onClick={onImport}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Import Product
                    </Button>
                </div>
            </div>
        </div>
    );
}
