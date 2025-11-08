import { X, Info } from "lucide-react";
import React from "react";

export default function AlertBar({
    product,
    stockNote,
    onAddStock = () => { },
    onClose = () => { },
}) {
    return (
        <div className="w-full">
            <div
                className="flex items-center justify-between gap-3 rounded-md  bg-red-50 px-3 py-2 text-[13px] leading-tight
        "
            >
                <div className="flex items-center gap-2 min-w-0">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full ">
                        <Info className="h-3 w-3 text-red-500" strokeWidth={2} />
                    </span>

                    <p className="truncate text-slate-700">
                        <span className="text-slate-600">Your Product</span>{" "}
                        <a href="#" className="text-slate-700 underline decoration-slate-400/60 underline-offset-[3px] hover:text-slate-900" onClick={(e) => e.preventDefault()} title={product} >
                            {` ${product} `}
                        </a>
                        <span className="text-red-600">{` ${stockNote}`}</span>,{" "}
                        <button onClick={onAddStock} className="text-blue-600 hover:text-blue-700 underline underline-offset-[3px]">
                            Add Stock
                        </button>
                    </p>
                </div>

                <button onClick={onClose} className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded hover:bg-red-100" aria-label="Close" title="Close">
                    <X className="h-3.5 w-3.5 text-slate-500" />
                </button>
            </div>
        </div>
    );
}
