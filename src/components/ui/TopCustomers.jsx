import { Users2, ChevronRight, ChevronDown, MapPin } from "lucide-react";

const CustomerRow = ({ avatar, name, city, orders, amount }) => (
  <div className="px-4 py-3 flex items-center justify-between gap-3">
    <div className="flex items-center gap-3 min-w-0">
      <img src={avatar} alt={name} className="h-9 w-9 rounded object-cover ring-1 ring-slate-200" />
      <div className="min-w-0">
        <div className="text-sm font-medium text-slate-800 truncate">{name}</div>
        <div className="text-xs text-slate-500 flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {city} • {orders} Orders
        </div>
      </div>
    </div>
    <div className="text-sm font-semibold text-slate-800">{amount} BDT</div>
  </div>
);

export default function TopCustomers({
  onViewAll,
  customers = [
    { name: "Carlos Curran", city: "Dhaka",  orders: 20, amount: "8965", avatar: "/img/u1.jpg" },
    { name: "Stan Gaunter",  city: "Dhaka",  orders: 25, amount: "6985", avatar: "/img/u2.jpg" },
    { name: "Richard Wilson",city: "Gazipur",orders: 15, amount: "5366", avatar: "/img/u3.jpg" },
    { name: "Mary Bronson",  city: "Rangpur",orders: 9,  amount: "4569", avatar: "/img/u4.jpg" },
    { name: "Annie Tremblay",city: "Khulna", orders: 17, amount: "35698", avatar: "/img/u5.jpg" },
  ],
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100">
            <Users2 className="h-4 w-4 text-slate-700" />
          </span>
          <h3 className="text-sm font-medium text-slate-800 dark:text-slate-100">Top Customers</h3>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onViewAll} className="text-xs text-slate-600 inline-flex items-center gap-1 hover:text-slate-800">
            View All <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="divide-y">
        {customers.map((c, i) => (
          <CustomerRow key={i} {...c} />
        ))}
      </div>
    </div>
  );
}
