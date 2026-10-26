/** A decorative bridge-inspection sketch; deliberately independent of research data. */
export default function EngineeringScene() {
  return <div className="engineering-scene" aria-hidden="true">
    <div className="hero-aurora" />
    <div className="blueprint-grid" />
    <svg className="bridge-scene" viewBox="0 0 1100 400" fill="none" focusable="false">
      <defs>
        <linearGradient id="bridge-ink" x1="0" y1="0" x2="1100" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#72e5ed" stopOpacity="0" />
          <stop offset=".4" stopColor="#72e5ed" stopOpacity=".55" />
          <stop offset="1" stopColor="#91b9ff" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="scan-light" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#63f1df" stopOpacity=".3" />
          <stop offset="1" stopColor="#63f1df" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g stroke="url(#bridge-ink)" strokeWidth="1.2">
        <path d="M40 294H1090M40 302H1090M340 150V358M360 150V358M800 108V358M820 108V358" />
        <path d="M80 294 350 150 570 294 810 108 1090 294M120 302 350 164 570 302 810 122 1050 302" />
        {[180, 230, 280, 410, 460, 510, 630, 680, 730, 870, 920, 970, 1020].map((x, i) =>
          <path key={x} d={`M${x} ${[241, 214, 188, 189, 222, 255, 248, 209, 170, 148, 181, 214, 247][i]}V294`} />
        )}
        <path d="M250 358H450M710 358H910M40 375H1090" strokeDasharray="3 8" />
      </g>
      <path className="flight-path" d="M560 215Q800 140 1020 225" stroke="#6ae4df" strokeOpacity=".35" strokeDasharray="4 10" />
      <g className="inspection-drone">
        <path d="M0 12 -65 172H65Z" fill="url(#scan-light)" />
        <ellipse className="scan-target" cy="160" rx="56" ry="9" stroke="#6ae4df" strokeOpacity=".6" />
        <g stroke="#b8fff4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m-21-9 42 18m-42 0 42-18M-7-4H7V7H-7ZM-3 7v6h6V7" />
          <ellipse cx="-23" cy="-10" rx="13" ry="3" /><ellipse cx="23" cy="-10" rx="13" ry="3" />
          <ellipse cx="-23" cy="10" rx="13" ry="3" /><ellipse cx="23" cy="10" rx="13" ry="3" />
        </g>
        <circle className="drone-beacon" r="3" fill="#6fffe2" />
      </g>
      {[[350, 150], [810, 108], [570, 294]].map(([cx, cy]) =>
        <g key={cx} className="blueprint-node"><circle cx={cx} cy={cy} r="4" fill="#85f4e6" /><circle cx={cx} cy={cy} r="12" stroke="#85f4e6" strokeOpacity=".4" /></g>
      )}
    </svg>
    <span className="scene-coordinate">UAV VISION / BRIDGE INSPECTION</span>
  </div>;
}
