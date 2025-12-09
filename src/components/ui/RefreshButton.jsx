import React from "react";
import { Button } from "./button";
import { ChevronUp, RefreshCw } from "lucide-react";

const ExportsButtons = ({ onRefresh }) => {
    const handleRefreshClick = () => {
        if (onRefresh) {
            onRefresh();
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-md border-slate-200 bg-white dark:bg-slate-700 shadow-sm hover:bg-slate-50"
                    onClick={handleRefreshClick}
                    title="Refresh"
                >
                    <RefreshCw className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-md border-slate-200 bg-white dark:bg-slate-700 shadow-sm hover:bg-slate-50"
                    title="Collapse"
                >
                    <ChevronUp className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </Button>
            </div>
        </div>
    );
};

export default ExportsButtons;
