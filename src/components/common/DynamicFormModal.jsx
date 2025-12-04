// src/components/common/DynamicFormModal.jsx
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DynamicFormModal({
    open,
    onOpenChange,
    title,
    description,
    initialData = {},
    fields = [],
    onSubmit,
}) {
    const [formData, setFormData] = React.useState(initialData);

    React.useEffect(() => {
        setFormData(initialData || {});
    }, [initialData, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (onSubmit) onSubmit(formData);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] dark:bg-slate-900 no-scrollbar overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>

                <div className="mt-2 space-y-4">
                    {fields.map((field) => {
                        const value = formData[field.name] ?? "";

                        if (field.renderInput) {
                            return (
                                <div key={field.name} className="space-y-1">
                                    <label className="text-sm font-medium">
                                        {field.label}
                                        {field.required && (
                                            <span className="text-red-500"> *</span>
                                        )}
                                    </label>
                                    {field.renderInput(value, (newVal) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [field.name]: newVal,
                                        }))
                                    )}
                                </div>
                            );
                        }

                        return (
                            <div key={field.name} className="space-y-1">
                                <label className="text-sm font-medium">
                                    {field.label}
                                    {field.required && (
                                        <span className="text-red-500"> *</span>
                                    )}
                                </label>
                                <Input
                                    name={field.name}
                                    type={field.type || "text"}
                                    value={value}
                                    onChange={handleChange}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
