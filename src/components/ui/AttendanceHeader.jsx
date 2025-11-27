import { useState } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AttendanceHeader({ attendanceRate = 0.6 }) {
    const [date, setDate] = useState(new Date());

    const handlePrevDay = () => {
        const d = new Date(date);
        d.setDate(d.getDate() - 1);
        setDate(d);
    };

    const handleNextDay = () => {
        const d = new Date(date);
        d.setDate(d.getDate() + 1);
        setDate(d);
    };

    const handleToday = () => setDate(new Date());

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value) return;
        setDate(new Date(value));
    };

    const inputValue = date.toISOString().split("T")[0];
    const formattedDate = format(date, "EEEE, MMMM d, yyyy");

    return (
        <div className="w-full mb-6">
            <Card className="rounded-2xl shadow-md border border-slate-100 bg-white dark:bg-slate-800">
                <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4 px-6">
                    {/* Left section */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-9 w-9 shadow-sm"
                            onClick={handlePrevDay}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {/* Date pill with custom formatted text over real input */}
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white shadow-sm relative">
                            <CalendarIcon className="h-4 w-4 text-slate-500" />
                            <div className="relative">
                                <input
                                    type="date"
                                    value={inputValue}
                                    onChange={handleChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />

                                {/* Visible formatted text */}
                                <span className="text-sm text-slate-700 pointer-events-none whitespace-nowrap">
                                    {formattedDate}
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full h-9 w-9 shadow-sm"
                            onClick={handleNextDay}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>

                        <Button
                            className="h-9 rounded-full px-5 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                            onClick={handleToday}
                        >
                            Today
                        </Button>
                    </div>

                    {/* Right section */}
                    <div className="text-right">
                        <p className="text-xs font-medium text-slate-500">Attendance Rate</p>
                        <p className="text-2xl font-semibold text-emerald-500">
                            {(attendanceRate * 100).toFixed(1)}%
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
