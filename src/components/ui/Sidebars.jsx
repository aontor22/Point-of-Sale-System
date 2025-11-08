import { Zap } from 'lucide-react'
import React from 'react'

const Sidebars = () => {
  return (
    <div className='transition duration-300 ease-in-out bg-white dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10'>
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-400 rounded-sm flex items-center justify-center shadow-lg">
                <Zap className='w-5 h-5 text-white'/>
            </div>

            <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                    Nexus
                </h1>
                <p className='text-xs text-slate-500 dark:text-slate-400'>
                    Admin Panel
                </p>
            </div>
        </div>
      </div>

      <nav className='flex-1 p-4 space-y-2 overflow-y-auto'></nav>

      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3 rounded-sm bg-slate-50 dark:bg-slate-800/50">
            <img src="" alt="user" className='w-10 h-10 rounded-sm ring-2 ring-blue-500'/>
        </div>
      </div>
    </div>
  )
}

export default Sidebars
