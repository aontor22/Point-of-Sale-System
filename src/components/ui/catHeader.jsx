import { Boxes, ChevronDown } from 'lucide-react'
import React from 'react'

const catHeader = () => {
    return (
        <div className="self-stretch px-5 py-3.5 bg-White rounded-tl-lg rounded-tr-lg border-b inline-flex justify-start items-center gap-2">
            <div className="size- p-2 bg-Transparent-Pink-Transparent rounded-lg flex justify-start items-center gap-2.5">
                <Boxes/>
            </div>
            <div className="flex-1 justify-center text-Grey-Grey-900 text-lg font-bold font-['Nunito_Sans'] leading-7">Top Categories</div>
            <div className="size- px-3 py-1.5 bg-Brand-White rounded-sm outline outline-1 outline-Transparent-Secondry-Transparent flex justify-start items-center gap-2">
                <div className="size- flex justify-start items-center gap-1">
                    <div className="justify-center text-Grey-Grey-900 text-xs font-semibold font-['Nunito_Sans'] leading-4">Weekly</div>
                </div>
                <div className="w-1.5 h-1 "/> <ChevronDown />
            </div>
        </div>
    )
}

export default catHeader
