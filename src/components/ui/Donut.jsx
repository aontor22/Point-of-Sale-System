export default function Donut({ size = 210, thickness = 14 }) {
    const r = (size - thickness) / 2;
    const cx = size / 2;
    const cy = size / 2;

    const gap = 2;
    const pPeach = 50 - gap;
    const pBlue = 18 - gap;
    const pGreen = 32 - gap;

    const startPeach = 60;
    const startBlue = startPeach + 50;
    const startGreen = startBlue + 18;

    const Arc = ({ color, value, start }) => (
        <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray={`${value} ${100 - value}`}
            strokeDashoffset={100 - start}
            transform={`rotate(-90 ${cx} ${cy})`}
        />
    );

    const midAngleDeg = (start, value) => ((start + value / 2) / 100) * 360 - 90;

    const bubbleStyle = (start, value, offsetPx = 8, sizePx = 42) => {
        const ang = (midAngleDeg(start, value) * Math.PI) / 180;
        const radius = r + thickness / 2 + offsetPx;
        const x = cx + radius * Math.cos(ang);
        const y = cy + radius * Math.sin(ang);
        return {
            left: `${x - sizePx / 2}px`,
            top: `${y - sizePx / 2}px`,
            width: `${sizePx}px`,
            height: `${sizePx}px`,
        };
    };

    const bubbleClass =
        "absolute rounded-full bg-white shadow-md text-slate-700 text-xs font-semibold flex items-center justify-center";

    return (
        <div className="relative aspect-square gap-5" style={{ width: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fee7cc" strokeWidth={thickness} />
                <Arc color="#f59e0b" value={pPeach} start={startPeach} />
                <Arc color="#0f4784" value={pBlue} start={startBlue} />
                <Arc color="#22c55e" value={pGreen} start={startGreen} />
                <circle cx={cx} cy={cy} r={r - thickness / 2} fill="white" />
            </svg>

            {/* ---------- REPLACED: dynamic bubbles ---------- */}
            <div className={bubbleClass} style={bubbleStyle(startPeach, pPeach)}>50%</div>
            <div className={bubbleClass} style={bubbleStyle(startBlue, pBlue)}>18%</div>
            <div className={bubbleClass} style={bubbleStyle(startGreen, pGreen)}>32%</div>
        </div>
    );
}
