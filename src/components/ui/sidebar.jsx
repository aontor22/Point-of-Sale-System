import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronsLeft, ChevronsRight, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo1 from "../../assets/image1.png";
import logo2 from "../../assets/image.png";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`relative shrink-0 border-r ${expanded ? "w-55" : "w-17.5"} h-screen flex flex-col bg-white dark:bg-gray-800`}
    >
      <button
        onClick={() => setExpanded((c) => !c)}
        className="absolute -right-2.5 top-5 z-60 grid h-5 w-5 place-items-center rounded-full bg-[#0e1074] dark:bg-orange-600 text-white shadow-lg ring-1 ring-black/5 hover:bg-[#0e3070] transition"
        aria-label="Toggle sidebar"
      >
        {expanded ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
      </button>

      <nav className="flex-1 flex flex-col min-h-0 transition-all duration-300 relative overflow-visible z-50">
        <div className="p-4 pb-2 flex items-center shrink-0">
          <img
            src={expanded ? logo1 : logo2}
            alt="Company Logo"
            className={`overflow-hidden transition-all duration-200 ${expanded ? "w-[120px] h-9" : "w-10"}`}
          />
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 overflow-y-auto no-scrollbar">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

/* ===========================
    TooltipPortal - renders tooltip into body & positions it
   =========================== */
function TooltipPortal({ anchorRect, visible, text }) {
  const elRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const handleScrollOrResize = () => {
      if (elRef.current && anchorRect) {
      }
    };
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [visible, anchorRect]);

  if (!visible || !anchorRect) return null;

  const gap = 8;
  const left = Math.min(anchorRect.right + gap, window.innerWidth - 10);
  const top = Math.max(8, anchorRect.top + anchorRect.height / 2);

  const tooltip = (
    <div
      ref={elRef}
      style={{
        position: "fixed",
        left: left,
        top: top,
        transform: "translateY(-50%)",
        zIndex: 2147483647,
        pointerEvents: "none",
      }}
      className="whitespace-nowrap rounded-md bg-indigo-100 text-indigo-800 text-sm px-2 py-1 drop-shadow-lg select-none"
      role="tooltip"
    >
      {text}
    </div>
  );

  return createPortal(tooltip, document.body);
}

/* ===========================
    SidebarItem (with portal tooltip when collapsed)
   =========================== */
export function SidebarItem({
  icon,
  text,
  active,
  alert,
  className = "",
  onClick,
  isParent = false,
  open = false,
  to,
}) {
  const { expanded } = useContext(SidebarContext);
  const sizedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon, { size: 20, ...icon.props })
    : null;

  // base class
  const base = `
    relative flex items-center max-h-10 py-2 px-3 my-1 font-medium rounded-md transition-colors group min-w-0
    ${active
      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 dark:from-indigo-200 dark:to-indigo-100 dark:text-indigo-800"
      : "hover:bg-gradient-to-tr hover:from-indigo-200 hover:to-indigo-100 hover:text-indigo-800"
    }
    ${className || ""}
  `.trim().replace(/\s+/g, " ");

  // ref + hover state for portal
  const anchorRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);

  const showPortal = !expanded && hovering;

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setAnchorRect(rect);
    } else {
      setAnchorRect(null);
    }
  }, [hovering, anchorRef, expanded, text]);

  const onEnter = () => {
    setHovering(true);
    if (anchorRef.current) {
      setAnchorRect(anchorRef.current.getBoundingClientRect());
    }
  };
  const onLeave = () => {
    setHovering(false);
  };

  const Label = (
    <div
      ref={anchorRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="relative flex items-center group w-full min-w-0"
    >
      {sizedIcon}

      <span
        className={`
          transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis
          ${expanded ? " flex-1 text-left ml-3 min-w-0 opacity-100" : "w-0 max-w-0 opacity-0"}
        `}
      >
        {text}
      </span>

      {isParent && expanded && (
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      )}

      {alert && <span className="absolute right-2 w-2 h-2 rounded-full bg-indigo-400" />}
    </div>
  );

  if (isParent) {
    return (
      <li className="min-w-0">
        <button type="button" onClick={onClick} className={`w-full min-w-0 ${base}`} aria-expanded={open}>
          {Label}
        </button>

        {/* portal tooltip (when collapsed + hover) */}
        <TooltipPortal anchorRect={anchorRect} visible={showPortal} text={text} />
      </li>
    );
  }

  return (
    <li className="min-w-0">
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `w-full block min-w-0 ${base} ${isActive ? "bg-indigo-100 text-indigo-800" : ""}`
          }
        >
          {Label}
        </NavLink>
      ) : (
        <div className={`w-full min-w-0 ${base}`}>{Label}</div>
      )}

      {/* portal tooltip (when collapsed + hover) */}
      <TooltipPortal anchorRect={anchorRect} visible={showPortal} text={text} />
    </li>
  );
}

export function SidebarSectionTitle({ children }) {
  const { expanded } = useContext(SidebarContext);
  if (!expanded) return null;
  return (
    <p className="px-3 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-300">
      {children}
    </p>
  );
}
