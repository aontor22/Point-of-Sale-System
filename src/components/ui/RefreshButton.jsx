import React from 'react'
import { Button } from './button'
import { ChevronUp, FileSpreadsheet, FileText, RefreshCw } from 'lucide-react'

const ExportsButtons = (
    onRefresh) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-md border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                    onClick={onRefresh}
                    title="Refresh"
                >
                    <RefreshCw className="h-5 w-5 text-slate-700" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-md border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                    title="Collapse"
                >
                    <ChevronUp className="h-5 w-5 text-slate-700" />
                </Button>
            </div>
        </div>
    )
}

export default ExportsButtons
