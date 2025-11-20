import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    RiFacebookFill,
    RiTwitterFill,
    RiInstagramLine,
    RiLinkedinBoxFill,
} from "react-icons/ri";
import { LiaPinterestP } from "react-icons/lia";
import logo from "@/assets/image1.png";
import tickSound from "@/assets/tick.mp3";

const TARGET_DATE = new Date("2026-01-01T00:00:00");

function TimeBox({ value, label }) {
    const display = String(value).padStart(2, "0");
    return (
        <div className="w-16 h-16 bg-white rounded-[5px] border border-slate-100 flex flex-col items-center justify-center gap-0.5">
            <div className="text-xl font-bold text-slate-900 leading-none">
                {display}
            </div>
            <div className="text-[10px] font-medium text-slate-500 tracking-[0.03em]">
                {label}
            </div>
        </div>
    );
}

export default function ComingSoon() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const audioRef = useRef(null);

    useEffect(() => {
        const audioEl = new Audio(tickSound);
        audioEl.volume = 0.4;
        audioRef.current = audioEl;

        audioEl.play().catch(() => {
        });
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date().getTime();
            const diff = TARGET_DATE.getTime() - now;

            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateTime();
        const timerId = setInterval(updateTime, 1000);
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        const audioEl = audioRef.current;
        if (!audioEl) return;

        try {
            audioEl.currentTime = 0;
            audioEl.play().catch(() => {
            });
        } catch {
        }
    }, [timeLeft.seconds]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f6f8]">
            <Card className="w-full max-w-xl rounded-md border-5 border-sky-200 shadow-[0_4px_30px_rgba(0,0,0,0.04)] bg-white">
                <CardContent className="px-8 py-8 flex flex-col items-center gap-5">
                    <img
                        src={logo}
                        alt="Zensoft Lab"
                        className="h-12 w-auto object-contain mb-1"
                    />

                    <div className="flex flex-col items-center gap-1.5">
                        <p className="text-[13px] font-semibold text-slate-500">
                            Our Website is
                        </p>

                        <div className="text-center leading-tight">
                            <span className="text-3xl font-bold text-sky-900">
                                COMING{" "}
                            </span>
                            <span className="text-3xl font-bold text-sky-500">
                                SOON
                            </span>
                        </div>

                        <p className="mt-1 text-[11px] text-slate-500 text-center leading-relaxed">
                            Please check back later, We are working hard to get
                            <br />
                            everything just right.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <TimeBox value={timeLeft.days} label="Days" />
                        <span className="text-sm font-medium text-slate-500">:</span>
                        <TimeBox value={timeLeft.hours} label="Hrs" />
                        <span className="text-sm font-medium text-slate-500">:</span>
                        <TimeBox value={timeLeft.minutes} label="Min" />
                        <span className="text-sm font-medium text-slate-500">:</span>
                        <TimeBox value={timeLeft.seconds} label="Sec" />
                    </div>

                    <div className="w-full flex flex-col items-center gap-1 mt-2">
                        <p className="text-[11px] font-semibold text-slate-700">
                            Subscribe to get notified!
                        </p>

                        <div className="w-full h-10 bg-white border border-slate-200 rounded-[5px] flex items-center px-1">
                            <Input
                                type="email"
                                placeholder="Enter Your Email"
                                className="flex-1 border-none shadow-none h-full rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xs text-slate-600"
                            />
                            <Button className="h-9 px-4 rounded-[5px] bg-[#2f8dfc] text-white text-xs font-medium hover:bg-[#2376d3]">
                                Subscribe
                            </Button>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-1">
                        <button className="w-7 h-7 rounded-[5px] bg-[#0f172a] flex items-center justify-center text-white">
                            <RiFacebookFill className="w-3 h-3" />
                        </button>
                        <button className="w-7 h-7 rounded-[5px] bg-[#0f172a] flex items-center justify-center text-white">
                            <RiInstagramLine className="w-3 h-3" />
                        </button>
                        <button className="w-7 h-7 rounded-[5px] bg-[#0f172a] flex items-center justify-center text-white">
                            <RiTwitterFill className="w-3 h-3" />
                        </button>
                        <button className="w-7 h-7 rounded-[5px] bg-[#0f172a] flex items-center justify-center text-white">
                            <LiaPinterestP className="w-3 h-3" />
                        </button>
                        <button className="w-7 h-7 rounded-[5px] bg-[#0f172a] flex items-center justify-center text-white">
                            <RiLinkedinBoxFill className="w-3 h-3" />
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
