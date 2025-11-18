import React from "react";

export function Req({ children }) {
    return (
        <span className="inline-flex items-center gap-1 text-sm font-medium">
            {children}
            <span className="text-red-500">*</span>
        </span>
    );
}
