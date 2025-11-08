import { Bell, CirclePlus, Filter, Mail, Maximize, Menu, Monitor, Plus, Search, Settings, Sun } from 'lucide-react'
import React from 'react'
import user from '../../assets/image.png'

const header = ({sidebarCollapsed, onToggleSidebar}) => {
    return (
        <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl border-b border-s-gray-400 dark:border-slate-700/50 px-6 py-3">
            <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-4">

                    <div className="relative mr-4">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder='Search' className='w-full pl-10 pr-10 py-2 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-200 dark:border-slate-700 rounded-sm text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue500 focus:border-transparent transition-all' />
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="border-r border-slate-200 dark:border-slate-700 px-4">
                        <button className="hidden lg:flex items-center space-x-2 py-2 px-4 bg-blue-300 text-blue-950 rounded hover:shadow-lg transition-all">
                        <CirclePlus className="w-4 h-4" />
                        <span className="text-sm font-medium">Add New</span>
                    </button>
                    </div>
                    <button className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Sun className="w-5 h-5"/>
                    </button>

                    <button className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Maximize className="w-5 h-5"/>
                    </button>

                    <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Mail className="w-5 h-5"/>
                        <span className="absolute -top-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">1</span>
                    </button>
                    <button className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Bell className="w-5 h-5"/>
                    </button>

                    <button className="p-2.5 flex gap-1 items-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Monitor className="w-5 h-5"/> POS
                    </button>

                    <button className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Settings className="w-5 h-5"/>
                    </button>

                    <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
                        <img src={user} alt="user" className='w-8 h-8 rounded-full ring-2 ring-blue-500'/>
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Udoy Chowdhury</p>
                            <p className='text-xs text-slate-500 dark:text-slate-400'>Administrator</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default header
