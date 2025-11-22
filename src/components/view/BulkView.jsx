import React from "react";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProductBulkUploadView({
    className,
    isDragging,
    onDrop,
    onDragOver,
    onDragLeave,
    onInputChange,
}) {
    const inputId = "product-bulk-upload";

    return (
        <div className={cn("space-y-3", className)}>
            <p className="text-sm font-medium text-slate-500">
                Upload multiple products at once using Excel or CSV files.
            </p>

            <Card className="border border-slate-200 dark:border-slate-500 p-8 bg-slate-100 dark:bg-slate-800 shadow-none">
                <label
                    htmlFor={inputId}
                    className={cn(
                        "flex h-48 w-full cursor-pointer items-center justify-center rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 text-center transition",
                        isDragging && "border-blue-500 bg-blue-50/60"
                    )}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                >
                    <div>
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 text-blue-500">
                            <Upload className="h-6 w-6" />
                        </div>

                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            Drop your file here or click to browse
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Accepted file types: .xls, .xlsx, .csv
                        </p>
                    </div>
                </label>

                <input
                    id={inputId}
                    type="file"
                    className="hidden"
                    accept=".xls,.xlsx,.csv"
                    onChange={onInputChange}
                />
            </Card>
        </div>
    );
}
