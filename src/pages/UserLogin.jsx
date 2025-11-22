import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import { EyeOff } from "lucide-react";
import logo from "@/assets/image1.png";
import user from "@/assets/user.svg";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#f5f6f8]">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[#e9f9ee]" />
            <div className="pointer-events-none absolute -left-20 bottom-40 h-24 w-72 -skew-x-12 bg-[#2f8dfc]" />
            <div className="pointer-events-none absolute -right-20 bottom-64 h-24 w-72 -skew-x-12 bg-[#2f8dfc]" />

            <header className="relative z-10 flex items-center justify-center pt-16">
                <img
                    src={logo}
                    alt="Zensoft Lab"
                    className="h-16 w-auto"
                />
            </header>

            <main className="relative z-10 flex items-center justify-center py-10">
                <Card className="w-full p-0 max-w-md rounded-md shadow-[0_4px_60px_rgba(0,0,0,0.04)]">
                    <CardContent className="flex flex-col items-center gap-6 p-6">
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-xs font-semibold text-muted-foreground">
                                Welcome back!
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <Avatar className="h-24 w-24 ring-2 ring-sky-100">
                                <AvatarImage
                                    src={user}
                                    alt="Udoy Chowdhury"
                                />
                                <AvatarFallback>UC</AvatarFallback>
                            </Avatar>
                            <p className="text-lg font-bold text-slate-900 dark:text-slate-300">
                                Udoy Chowdhury
                            </p>
                        </div>

                        <form
                            className="flex w-full flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="relative">
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="h-10 rounded-md border border-neutral-300 pr-10 text-sm"
                                />
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                                    <EyeOff className="h-4 w-4" />
                                </span>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 h-9 w-full rounded-md bg-[#2f8dfc] text-xs font-medium text-white hover:bg-[#2376d3]"
                            >
                                Log In
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </main>

            <footer className="relative z-10 flex flex-col items-center gap-1 pb-6 text-[11px] text-slate-500">
                <div className="flex items-center gap-5">
                    <button type="button" className="hover:underline">
                        Terms &amp; Condition
                    </button>
                    <button type="button" className="hover:underline">
                        Privacy
                    </button>
                    <button type="button" className="hover:underline">
                        Help
                    </button>
                    <div className="flex items-center gap-1">
                        <span>English</span>
                        <span className="h-[3px] w-3 border-t border-slate-500" />
                    </div>
                </div>
                <p>Copyrights © 2025 - Zensoftlab</p>
            </footer>
        </div>
    );
}
