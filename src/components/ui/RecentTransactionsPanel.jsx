import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import rts1 from "../../assets/recents/rts1.svg"
import rts2 from "../../assets/recents/rts2.svg"
import rts3 from "../../assets/recents/rts3.svg"
import rts4 from "../../assets/recents/rts4.svg"
import rts5 from "../../assets/recents/rts5.svg"

const ITEMS = [
    { name: "Stellar Dynamics", order: "#12457", date: "14 Jan 2025", plan: "Basic", change: "+4245", img: rts1 },
    { name: "Quantum Nexus", order: "#65974", date: "10 Jan 2025", plan: "Enterprise", change: "+8395", img: rts2 },
    { name: "Aurora Technologies", order: "#22457", date: "08 Jan 2025", plan: "Advanced", change: "+10145", img: rts3 },
    { name: "TerraFusion Energy", order: "#43412", date: "06 Jan 2025", plan: "Enterprise", change: "+1758", img: rts4 },
    { name: "Epicurean Delights", order: "#43567", date: "03 Jan 2025", plan: "Premium", change: "+12977", img: rts5 },
];

export default function RecentTransactionsPanel() {
    return (
        <Card className="w-full rounded-sm pt-4 pb-0">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[15px] font-semibold">Recent Transactions</CardTitle>
                <a href="#" className="text-xs text-slate-600 underline">View All</a>
            </CardHeader>
            <Separator />
            <CardContent className="p-4 pb-0 pt-0">
                <ul className="space-y-3">
                    {ITEMS.map((it, i) => (
                        <li key={i} className="flex items-center justify-between rounded-lg">
                            <div className="flex items-center gap-3 min-w-0">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={it.img} alt={it.name} />
                                    <AvatarFallback>{it.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">{it.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="text-blue-600">{it.order}</span> • {it.date}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-sm font-semibold">{it.change}</div>
                                <div className="text-[11px] pt-1 text-muted-foreground">{it.plan}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
