import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import tc1 from '../../assets/products/tc1.svg'
import tc2 from '../../assets/products/tc2.svg'
import tc3 from '../../assets/products/tc3.svg'
import tc4 from '../../assets/products/tc4.svg'
import tc5 from '../../assets/products/tc5.svg'
import { ChevronRight } from "lucide-react";

const ITEMS = [
  { name: "Lobar Handy", price: "1020 BDT", sales: 987, img: tc1 },
  { name: "Bold V3.2", price: "4790 BDT", sales: 6547, img: tc2 },
  { name: "Lenovo 3rd Generation", price: "3290 BDT", sales: 1487, img: tc3 },
  { name: "Apple Series 5 Watch", price: "1240 BDT", sales: 947, img: tc4 },
  { name: "Lenovo 3rd Generation", price: "597 BDT", sales: 744, img: tc5 },
];

export default function BestSellerCard() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center border-b -pb-0 justify-between space-y-0">
        <CardTitle className="text-sm font-semibold">Best Seller</CardTitle>
        <Button variant="ghost" size="sm" className="h-7 border px-2 text-xs">View All <ChevronRight className="h-3.5 w-3.5" /></Button>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="divide-y">
          {ITEMS.map((it, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={it.img} alt={it.name} />
                  <AvatarFallback className="text-[10px]">PR</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight truncate">{it.name}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{it.price}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">Sales</p>
                <p className="text-sm font-semibold">{it.sales}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
