import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ITEMS = [
    { name: "Silicon Corp", expired: "10 Apr 2025", img: "/images/e1.png" },
    { name: "Hubspot", expired: "12 Jun 2025", img: "/images/e2.png" },
    { name: "Licon Industries", expired: "16 Jun 2025", img: "/images/e3.png" },
    { name: "TerraFusion Energy", expired: "12 May 2025", img: "/images/e4.png" },
    { name: "Epicurean Delights", expired: "15 May 2025", img: "/images/e5.png" },
];

export default function RecentPlanExpiredPanel() {
    return (
        <Card className="w-full rounded-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-md font-semibold">Recent Plan Expired</CardTitle>
                <a href="#" className="text-xs text-slate-600 underline">View All</a>
            </CardHeader>
            <Separator />
            <CardContent className="p-4">
                <ul className="space-y-3">
                    {ITEMS.map((it, i) => (
                        <li key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={it.img} alt={it.name} />
                                    <AvatarFallback>{it.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{it.name}</p>
                                    <p className="text-xs text-muted-foreground">Expired : {it.expired}</p>
                                </div>
                            </div>
                            <a href="#" className="shrink-0 text-xs font-medium text-blue-600 underline">
                                Send Reminder
                            </a>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
