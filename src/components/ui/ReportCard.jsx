import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StatCard({
    icon,
    iconBg = "bg-indigo-500 text-white",
    border,
    badgeTone = "success",
    title = "Total Orders",
    value = "8690",
}) {
    const badgeClass = {
        success: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
        danger: "bg-red-100 text-red-700 hover:bg-red-100",
        default: "bg-slate-100 text-slate-700 hover:bg-slate-100",
    }[badgeTone];

    return (
        <Card className={`h-full rounded-lg shadow-md p-0 ${border}`}>
            <CardContent className="">
                <div className="flex items-center gap-3 py-5">
                    <div className={`h-12 w-12 flex items-center justify-center rounded-md ${iconBg}`}>
                        {icon}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">{title}</span>
                        <span className="text-xl font-bold">{value}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
