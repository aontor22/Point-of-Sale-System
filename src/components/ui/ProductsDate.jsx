import React from 'react'
import { Button } from './button'
import { Calendar } from 'lucide-react'

const ProductsDate = ({
    dateLabel = "21 Oct 2025 - 30 Oct 2025",
}) => {
    return (
        <div className="w-full">
            <div className="mb-2 flex items-center justify-end">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-10 rounded-lg border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                    title="Date range"
                >
                    <Calendar className="mr-2 h-4 w-4 text-slate-600" />
                    {dateLabel}
                </Button>
            </div>
        </div>
    )
}

export default ProductsDate
