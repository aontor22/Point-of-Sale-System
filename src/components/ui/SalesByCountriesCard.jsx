import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function SalesByCountriesCard({
  label = "Africa",
  sales = 3455,
}) {
  const blue = "rgb(30 64 175)";       // tailwind blue-800-ish for dark patches
  const primary = "rgb(37 99 235)";    // blue-600 for the pill
  const base = "rgb(226 232 240)";     // slate-200
  const baseDim = "rgb(241 245 249)";  // slate-100
  const stroke = "rgba(15, 23, 42, 0.06)";

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-[15px] font-semibold">Sales by Countries</CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="h-8 gap-2">
              This Week
              <ChevronDown className="h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>This Week</DropdownMenuItem>
            <DropdownMenuItem>Last Week</DropdownMenuItem>
            <DropdownMenuItem>This Month</DropdownMenuItem>
            <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="rounded-xl border bg-background p-4">
          <div className="relative mx-auto w-full">
            {/* Map: stylized world with highlighted Africa + a few dark patches */}
            <svg
              viewBox="0 0 860 430"
              className="mx-auto block h-[260px] w-full"
              role="img"
              aria-label="World map with Africa highlighted"
            >
              {/* backdrop blob for subtle depth */}
              <path
                d="M80 250c-28-76 24-150 110-190 92-45 196-22 266 3 78 28 148 32 212 6 77-31 141 7 171 87 33 86-15 163-108 193-68 22-135 10-207 22-126 20-209 63-311 24-67-26-103-70-123-145z"
                fill={baseDim}
                opacity="0.9"
              />

              {/* continents (single pale silhouette) */}
              <path
                d="M120 210c30-44 92-76 150-84 45-6 80 12 116 26 33 13 71 15 105 7 44-10 79-33 116-18 49 21 81 76 56 121-20 34-60 49-121 53-43 3-86-4-136 6-58 11-108 33-166 36-43 2-77-11-102-33-41-35-54-92-32-151z"
                fill={base}
                opacity="0.95"
                stroke={stroke}
                strokeWidth="1"
              />

              {/* dark patches to mimic countries/regions in screenshot */}
              <g opacity="0.95">
                {/* N. America west */}
                <path d="M150 155c22-18 55-27 86-22 8 1 15 5 20 10 8 7 9 15 2 22-18 18-60 27-98 21-10-2-14-12-10-20z" fill={blue} />
                {/* Europe area */}
                <path d="M410 150c18-10 36-10 52-2 9 4 13 10 11 18-3 11-18 20-35 24-20 5-40 2-46-9-5-9 7-22 18-31z" fill={blue} />
                {/* East Asia */}
                <path d="M650 170c20-12 47-11 63 3 8 6 10 14 7 23-5 13-22 22-44 26-18 3-34 0-40-9-7-11 2-29 14-43z" fill={blue} />
                {/* Oceania */}
                <path d="M760 250c10-7 25-6 34 2 5 4 6 9 3 15-4 8-15 13-28 15-10 1-19-1-22-5-4-6 2-16 13-27z" fill={blue} />
                {/* S. America east */}
                <path d="M250 265c10-15 28-24 45-24 10 0 18 4 21 10 4 9-3 20-16 28-16 10-36 13-49 8-9-3-9-13-1-22z" fill={blue} />
                {/* AFRICA highlight shape */}
                <path
                  d="M520 210c20-12 48-11 65 2 13 10 22 28 19 44-3 16-14 26-24 38-6 7-8 17-14 24-13 14-38 19-58 11-17-7-26-23-30-39-5-19-12-38-7-56 4-13 20-21 49-24z"
                  fill={primary}
                />
              </g>

              {/* placeholder for a tiny dot inside Africa */}
              <circle cx="560" cy="248" r="3.8" fill="#fff" stroke={primary} strokeWidth="2" />
            </svg>

            {/* Overlay pill + stat card (centered around Africa) */}
            <div className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2">
              <div className="mx-auto w-max rounded-md bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                {label}
              </div>
              <div className="mt-2 mx-auto w-max rounded-lg bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-black/5">
                {sales} Sales
              </div>
            </div>
          </div>

          {/* footer like the mock */}
          <div className="mt-3 border-t pt-3 text-center text-xs">
            <span className="font-semibold text-emerald-600">▲ 48%</span>{" "}
            increase compare to last week
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
