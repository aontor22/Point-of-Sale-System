import React, { useState } from "react";
import { ProductBulkUploadView } from "@/components/view/BulkView";

export function ProductBulkUpload({ className, onFilesSelected }) {
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (files) => {
        if (!files) return;

        const validFiles = Array.from(files).filter((file) =>
            /\.(xlsx?|csv)$/i.test(file.name)
        );

        if (onFilesSelected) {
            onFilesSelected(validFiles);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleInputChange = (e) => {
        handleFiles(e.target.files);
    };

    return (
        <ProductBulkUploadView
            className={className}
            isDragging={isDragging}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onInputChange={handleInputChange}
        />
    );
}
