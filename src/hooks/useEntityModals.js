import { useState } from "react";

export function useEntityModals() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const openView = (item) => {
        setSelectedItem(item);
        setViewOpen(true);
    };

    const openEdit = (item) => {
        setSelectedItem(item);
        setEditOpen(true);
    };

    return {
        selectedItem,
        setSelectedItem,
        viewOpen,
        setViewOpen,
        editOpen,
        setEditOpen,
        openView,
        openEdit,
    };
}
