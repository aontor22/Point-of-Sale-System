import React from 'react'
import { Button } from './button'
import { PlusCircle } from 'lucide-react'

const AddImport = (onAdd,
) => {
    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                className="h-10 rounded-md bg-[#0b5ed7] px-4 font-semibold text-white hover:bg-[#0a58ca]"
                onClick={onAdd}
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Brand
            </Button>
        </div>
    )
}

export default AddImport
