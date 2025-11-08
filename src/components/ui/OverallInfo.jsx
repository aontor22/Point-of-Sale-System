import { Users, UserCircle2, ShoppingCart, UserCheck } from "lucide-react";

const Stat = ({ icon: Icon, iconClass = "", title, value, noDivider }) => (
    <div className={["flex", !noDivider].filter(Boolean).join(" ")}
    >
        <div className="flex-1 items-center g-2 p-4 border border-slate-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 rounded-sm space-y-2">
            <div className={["flex items-center justify-center h-9 w-9 rounded-lg bg-slate-100 dark:bg-slate-800", iconClass,].join(" ")}>
                <Icon className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-sm text-slate-500  dark:text-slate-400">
                    {title}
                </span>
                <span className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {value}
                </span>
            </div>
        </div>
    </div>
);

export default function OverallInfo({ suppliers, customers, orders }) {
    return (
        <div className="p-5 bg-white dark:bg-slate-900">
            <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x-0 gap-4">
                <Stat
                    icon={UserCheck}
                    iconClass="text-sky-600"
                    title="Suppliers"
                    value={suppliers}
                    noDivider
                />
                <Stat
                    icon={Users}
                    iconClass="text-orange-600"
                    title="Customer"
                    value={customers}
                />
                <Stat
                    icon={ShoppingCart}
                    iconClass="text-emerald-600"
                    title="Orders"
                    value={orders}
                />
            </div>
        </div>
    );
}
