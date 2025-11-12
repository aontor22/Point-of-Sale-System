import React from "react";
import PropTypes from "prop-types";
import {
    ChevronRight,
    ChevronUp,
    FileText,
    FileSpreadsheet,
    RefreshCw,
    Plus,
    Download,
} from "lucide-react";



export default function ProductsHeader({
    title = "Products",
    breadcrumbs = [
        { label: "Dashboard" },
        { label: "Products", active: true },
    ],
    className = "",
}) {
    return (
        <div className={`w-full ${className}`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h2 className="text-[22px] font-bold tracking-tight text-slate-800">
                        {title}
                    </h2>

                    {Array.isArray(breadcrumbs) && breadcrumbs.length > 0 && (
                        <div className="flex items-center text-sm flex-wrap">
                            {breadcrumbs.map((bc, idx) => {
                                const isLast = idx === breadcrumbs.length - 1;
                                return (
                                    <React.Fragment key={`${bc.label}-${idx}`}>
                                        <span
                                            className={`${bc.active || isLast ? "font-medium text-slate-800" : "font-semibold text-slate-600"}`}
                                        >
                                            {bc.label}
                                        </span>
                                        {!isLast && (
                                            <ChevronRight className="mx-1 h-4 w-4 text-slate-400" />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

ProductsHeader.propTypes = {
    title: PropTypes.string,
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            active: PropTypes.bool,
        })
    ),
};
