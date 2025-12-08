import React from "react";
import { Button } from "./button";
import { Download, PlusCircle } from "lucide-react";

const AddImport = ({ onAddClick, onImportClick }) => {
    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                className="h-10 rounded-md bg-[#0b5ed7] px-4 font-semibold text-white hover:bg-[#0a58ca]"
                onClick={onAddClick}
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
            </Button>

            <Button
                size="sm"
                className="h-10 rounded-md bg-[#28a745] px-4 font-semibold text-white hover:bg-[#218838]"
                onClick={onImportClick}
            >
                <Download className="mr-2 h-4 w-4" />
                Import Product
            </Button>
        </div>
    );
};

export default AddImport;
