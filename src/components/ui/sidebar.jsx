import { ChevronsLeft, ChevronsRight, MoreHorizontal } from "lucide-react";
import logo1 from "../../assets/image1.png";
import logo2 from "../../assets/image.png";
import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  const width = expanded ? 220 : 70;

  return (
    <>
      <button
        onClick={() => setExpanded((c) => !c)}
        className="absolute top-5 z-[60] grid h-5 w-5 place-items-center rounded-full
                   bg-[#0e1074] text-white shadow-lg ring-1 ring-black/5
                   hover:bg-[#0e3070] transition"
        style={{ left: `${width - 10}px` }}
        aria-label="Toggle sidebar"
      >
        {expanded ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
      </button>

      <aside
        className={`shrink-0 border-r border-s-gray-400 ${
          expanded ? "w-[220px]" : "w-[70px]"
        } h-screen flex flex-col`}
      >
        <nav className="flex-1 flex flex-col min-h-0 bg-white transition-all duration-300">
          <div className="p-4 pb-2 flex items-center shrink-0">
            <img
              src={expanded ? logo1 : logo2}
              alt="Company Logo"
              className={`overflow-hidden transition-all duration-200 ${
                expanded ? "w-[120px] h-9" : "w-10"
              }`}
            />
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 overflow-y-auto no-scrollbar">{children}</ul>
          </SidebarContext.Provider>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  const sizedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, { size: 20, ...icon.props })
    : null;

  return (
    <li
      className={`relative flex items-center max-h-10 py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
      ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}
    >
      {sizedIcon}

      <span className={`overflow-hidden transition-all ${expanded ? "flex-1 ms-3" : "w-0"}`}>
        {text}
      </span>

      {alert && <span className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />}

      {!expanded && (
        <div
          className="absolute left-full rounded-md px-2 py-1 ms-6 bg-indigo-100 text-indigo-800 text-sm
                     invisible opacity-20 -translate-x-3 transition-all group-hover:visible
                     group-hover:opacity-100 group-hover:translate-x-0 z-50"
        >
          {text}
        </div>
      )}
    </li>
  );
}
