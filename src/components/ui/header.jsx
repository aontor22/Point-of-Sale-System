import {
    Bell,
    CirclePlus,
    Mail,
    Maximize,
    Minimize,
    Monitor,
    Search,
    Settings,
    Sun,
    Moon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import user from "../../assets/image.png";
import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = ({ sidebarCollapsed, onToggleSidebar }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "dark" || stored === "light") {
            setTheme(stored);
        } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () =>
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const navigate = useNavigate();

    const handleComingSoon = (e) => {
        e.preventDefault();
        navigate("/coming-soon");
    };

    const handleMaintenance = (e) => {
        e.preventDefault();
        navigate("/maintenance");
    };

    const handleDashboard = (e) => {
        e.preventDefault();
        navigate("/");
    };

    const handleSettings = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="bg-white dark:bg-gray-800 backdrop-blur-xl border-b border-s-gray-400 dark:border-slate-700/50 px-6 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative mr-4">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-300" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-10 py-2 bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-300 rounded-sm text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="border-r border-slate-200 dark:border-slate-300 px-4">
                        <button className="hidden lg:flex items-center space-x-2 py-2 px-4 bg-blue-300 text-blue-950 rounded hover:shadow-lg transition-all">
                            <CirclePlus className="w-4 h-4" />
                            <span className="text-sm font-medium">Add New</span>
                        </button>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title={
                            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
                        }
                    >
                        {theme === "dark" ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title={isFullscreen ? "Exit full screen" : "Enter full screen"}
                    >
                        {isFullscreen ? (
                            <Minimize className="w-5 h-5" />
                        ) : (
                            <Maximize className="w-5 h-5" />
                        )}
                    </button>

                    <button onClick={handleMaintenance} title="Mail" className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Mail className="w-5 h-5" />
                        <span className="absolute -top-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            1
                        </span>
                    </button>

                    <button onClick={handleComingSoon} title="Notification" className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Bell className="w-5 h-5" />
                    </button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="p-2.5 flex gap-1 items-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <Monitor className="w-5 h-5" />
                                <span>POS</span>
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                                onClick={() => navigate("/sales/pos/pos-1")}
                            >
                                POS 1
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate("/sales/pos/pos-2")}
                            >
                                POS 2
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate("/sales/pos/pos-3")}
                            >
                                POS 3
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button title="Settings" className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                                onClick={() => navigate("/settings/general")}
                            >
                                General Setting
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate("/settings/")}
                            >
                                Website Settings
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div onClick={handleDashboard} className="flex items-center cursor-pointer space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700">
                        <img
                            src={user}
                            alt="user"
                            className="w-8 h-8 rounded-full ring-2 ring-blue-500"
                        />
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Udoy Chowdhury
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Administrator
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
