import { Button } from "@/components/ui/button";

export default function WelcomeBanner({
  name = "Fahad",
  newCompanies = 14,
  active = "companies",
  onChange = () => {},
}) {
  const isCompanies = active === "companies";

  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-gradient-to-r from-sky-500 to-cyan-500 p-10 text-white shadow-sm">
      <span className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-white/20 blur-[2px]" />
      <span className="pointer-events-none absolute -right-8 -top-6 h-24 w-24 rounded-full bg-white/15 blur-[2px]" />
      <span className="pointer-events-none absolute -right-10 bottom-0 h-24 w-40 rounded-tl-[80px] bg-white/20 blur-[2px]" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold leading-none">
            Welcome Back, {name}
          </h2>
          <p className="mt-1 text-xs text-white/90">
            {newCompanies} New Companies Subscribed Today !!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => onChange("companies")}
            className={`h-8 rounded-md px-3 text-xs ${
              isCompanies
                ? "bg-black text-white hover:bg-black/90"
                : "bg-white/20 text-white hover:bg-white/25"
            }`}
          >
            Companies
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onChange("packages")}
            className={`h-8 rounded-md px-3 text-xs border-white/50 bg-white/90 text-slate-800 hover:bg-white ${
              !isCompanies ? "ring-1 ring-white/60" : ""
            }`}
          >
            All Packages
          </Button>
        </div>
      </div>
    </div>
  );
}
