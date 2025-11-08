import { CreditCard, DollarSign, Receipt, ShoppingCart, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import sum1 from "../../assets/SummaryCard/icon.svg";
import sum2 from "../../assets/SummaryCard/icon1.svg";
import sum3 from "../../assets/SummaryCard/icon2.svg";
import sum4 from "../../assets/SummaryCard/icon3.svg";

const stats = [
    {
        key: "salesBalance",
        icon: DollarSign,
        title: "Total Sales Balance",
        value: "248,389,078",
        trendText: "+48% vs Last Month",
        trend: "up",
        cardBg: "bg-green-50",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        path: sum4,
    },
    {
        key: "salesReturn",
        icon: Receipt,
        title: "Total Sales Return",
        value: "248,478,145",
        trendText: "-18% vs Last Month",
        trend: "down",
        cardBg: "bg-blue-50",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        path: sum3,
    },
    {
        key: "salesPayment",
        icon: CreditCard,
        title: "Total Sales Payment",
        value: "8,980,097",
        trendText: "+31% vs Last Month",
        trend: "up",
        cardBg: "bg-purple-50",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        path: sum2,
    },
    {
        key: "purchaseReturn",
        icon: ShoppingCart,
        title: "Total Purchase Return",
        value: "78,456,798",
        trendText: "+26% vs Last Month",
        trend: "up",
        cardBg: "bg-orange-50",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        path: sum1,
    },
];

const StatsGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((s) => {
                const Icon = s.icon;
                const up = s.trend === "up";
                const pillBg = up ? "bg-emerald-100" : "bg-rose-100";
                const pillText = up ? "text-emerald-700" : "text-rose-700";
                const arrowClr = up ? "text-emerald-600" : "text-rose-600";

                return (
                    <div
                        key={s.key}
                        className={`${s.cardBg} rounded-2xl p-6 border border-slate-200/60 shadow-md hover:shadow-lg transition-all`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.iconBg}`}>
                                <Icon size={20} className={s.iconColor} />
                            </div>
                            <div className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full whitespace-nowrap ${pillBg} ${pillText}`}>
                                {up ? <TrendingUp size={14} className={arrowClr} /> : <TrendingDown size={14} className={arrowClr} />}
                                <span className="text-xs leading-none font-medium">{s.trendText}</span>
                            </div>
                        </div>

                        <p className="text-sm font-medium text-slate-600 mb-2">{s.title}</p>
                        <p className="text-3xl font-extrabold text-slate-900 mb-4">{s.value}</p>

                        <div className="mt-2 h-20 relative rounded-md overflow-hidden">
                            <img
                                src={s.path}
                                alt=""
                                draggable={false}
                                className="absolute inset-0 w-full h-full object-cover pointer-events-none [image-rendering:-webkit-optimize-contrast]"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsGrid;
