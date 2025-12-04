// src/components/common/DynamicViewModal.jsx
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

export default function DynamicViewModal({
    open,
    onOpenChange,
    title,
    description,
    data,
    fields = [],
    imageSrc,
    imageAlt,
}) {
    if (!data) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] no-scrollbar dark:bg-slate-900 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>

                {imageSrc && (
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-40 w-40 items-center justify-center rounded-md bg-slate-100">
                            <img
                                src={imageSrc}
                                alt={imageAlt || title}
                                className="h-38 w-38 object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>
                )}

                <div className="mt-2 space-y-3 text-sm">
                    {fields.map((field) => {
                        const value = data[field.key];
                        return (
                            <div
                                key={field.key}
                                className="flex items-center justify-between gap-4"
                            >
                                <span className="font-medium text-muted-foreground">
                                    {field.label}
                                </span>
                                <span className="text-right wrap-break-words">
                                    {field.render
                                        ? field.render(value, data)
                                        : value ?? "-"}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
