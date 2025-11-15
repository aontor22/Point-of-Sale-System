import React from 'react'
import { Button } from './button'
import { Download } from 'lucide-react'

const DownloadFile = (onDownload
) => {
    return (
        <div className="items-center">
            <Button
                size="sm"
                className="h-10 cursor-pointer rounded-md bg-blue-500 px-4 font-semibold text-white hover:bg-blue-800"
                onClick={onDownload}
            >
                <Download className="mr-2 h-4 w-4" />
                Download Sample File
            </Button>
        </div>
    )
}

export default DownloadFile
