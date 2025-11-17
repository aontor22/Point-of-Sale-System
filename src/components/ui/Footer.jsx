import React from 'react'

const Footer = () => {
    return (
        <div className="w-full h-9 px-6 py-2 bg-Brand-White dark:border-slate-700/50 border-t border-Transparent-Secondry-Transparent inline-flex justify-start items-center gap-4">
            <div className="flex-1 justify-start text-slate-500 dark:text-slate-300 text-xs font-normal font-['Nunito_Sans'] leading-5">2014-2025 © ZensoftPOS. All Right Reserved</div>
            <div className="justify-start"><span className="text-slate-500 dark:text-slate-300 text-sm font-normal font-['Nunito_Sans'] leading-5">Designed & Developed By </span><span className="text-blue-500 text-sm font-normal font-['Nunito_Sans'] leading-5">Zensoft</span></div>
        </div>
    )
}

export default Footer
