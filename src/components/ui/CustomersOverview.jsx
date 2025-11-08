import { ChevronDown } from "lucide-react";
import donutImg from '../../assets/Customers Overview Chart Container.svg';
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React from "react";

const Kpi = ({ value, label, badge, up = true }) => (
    <div className="flex flex-col items-start border-r p-5">
        <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {value}
        </div>
        <div className="text-sm text-slate-500">{label}</div>
        {badge && (
            <span
                className={[
                    "mt-2 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
                    up
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300",
                ].join(" ")}
            >
                {up ? "▲" : "▼"} {badge}
            </span>
        )}
    </div>
);

export default function CustomersOverview({
    firstTime = { value: "6.5K", badge: "2.5%" },
    returning = { value: "4.5K", badge: "2.1%" },
    donut = donutImg,
}) {

    const [menu, setMenu] = React.useState("Today");

    return (
        <div className=" bg-white  dark:bg-slate-900">
            <div className="flex items-center justify-between p-5">
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Customers Overview
                </h3>
                <div className="mt-3 flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="text-sm">
                                {menu} <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                            {["Today", "This Week", "This Month", "This Year"].map((v) => (
                                <DropdownMenuItem key={v} onClick={() => setMenu(v)}>
                                    {v}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="px-4 pb-4">
                <div className="flex items-center gap-6">
                    <div className="shrink-0">
                        <img src={donut} alt="Donut Chart" className="w-[120px] h-[120px]" />
                    </div>

                    <div className="flex items-start justify-between gap-6">
                        <Kpi value={firstTime.value} label="First Time" badge={firstTime.badge} up />
                        <Kpi value={returning.value} label="Return" badge={returning.badge} up />
                    </div>
                </div>
            </div>
        </div>
    );
}
