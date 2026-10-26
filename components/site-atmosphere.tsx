/** Shared, decorative blueprint layers that continue behind every page. */
export default function SiteAtmosphere() {
  const points = [[6, 22], [14, 62], [23, 13], [35, 83], [44, 39], [55, 7], [64, 71], [73, 29], [82, 86], [92, 16], [96, 57], [7, 90]];
  return <div className="site-atmosphere" aria-hidden="true">
    <div className="ambient-glow ambient-glow-left" />
    <div className="ambient-glow ambient-glow-right" />
    <div className="ambient-grid" />
    <div className="ambient-orbit ambient-orbit-left" />
    <div className="ambient-orbit ambient-orbit-right" />
    <div className="ambient-particles">{points.map(([left, top], i) =>
      <span key={i} style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${-i * 1.3}s` }} />
    )}</div>
    <div className="ambient-pointer" />
  </div>;
}
