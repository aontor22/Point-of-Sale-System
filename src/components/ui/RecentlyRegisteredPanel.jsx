import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ITEMS = [
    { name: "Pitch", plan: "Basic (Monthly)", users: 150, img: "/images/r1.png" },
    { name: "Initech", plan: "Enterprise (Yearly)", users: 200, img: "/images/r2.png" },
    { name: "Umbrella Corp", plan: "Advanced (Monthly)", users: 108, img: "/images/r3.png" },
    { name: "Capital Partners", plan: "Enterprise (Monthly)", users: 110, img: "/images/r4.png" },
    { name: "Massive Dynamic", plan: "Premium (Yearly)", users: 120, img: "/images/r5.png" },
];

export default function RecentlyRegisteredPanel() {
    return (
        <Card className="w-full rounded-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[15px] font-semibold">Recently Registered</CardTitle>
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
                                    <p className="text-xs text-muted-foreground">{it.plan}</p>
                                </div>
                            </div>
                            <div className="shrink-0 text-right text-sm font-medium">
                                {it.users} <span className="text-muted-foreground">Users</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
