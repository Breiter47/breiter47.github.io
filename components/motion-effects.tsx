"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function MotionEffects() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(true);
  const [reduced, setReduced] = useState(true);
  const progress = useRef<HTMLDivElement>(null);
  const running = enabled && !reduced;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduced(preference.matches);
    syncPreference();
    try { setEnabled(localStorage.getItem("academic-motion") !== "off"); } catch { /* Storage is optional. */ }
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = running ? "on" : "off";
    const syncVisibility = () => {
      document.documentElement.dataset.pageHidden = String(document.hidden);
    };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, [running]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const amount = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${amount})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!running) return;
    const animations: Animation[] = [];
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        // Content stays readable even before JavaScript runs or if effects are disabled.
        animations.push(entry.target.animate([
          { opacity: 0, transform: "translateY(22px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" }));
        reveal.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".hero-copy, .profile-panel, .section-heading, .research-item, .record, .empty-state, .document-banner, .page-heading, .content-section").forEach(el => reveal.observe(el));

    const hero = document.querySelector<HTMLElement>(".hero");
    const atmosphere = document.querySelector<HTMLElement>(".site-atmosphere");
    const visibility = new IntersectionObserver(entries => {
      if (hero) hero.dataset.inView = String(entries[0].isIntersecting);
    });
    if (hero) visibility.observe(hero);
    let pointerFrame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        atmosphere?.style.setProperty("--pointer-x", `${event.clientX}px`);
        atmosphere?.style.setProperty("--pointer-y", `${event.clientY}px`);
        if (hero) {
          const rect = hero.getBoundingClientRect();
          hero.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
          hero.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
        }
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      reveal.disconnect();
      visibility.disconnect();
      animations.forEach(animation => animation.cancel());
      window.removeEventListener("pointermove", move);
      atmosphere?.style.removeProperty("--pointer-x");
      atmosphere?.style.removeProperty("--pointer-y");
      hero?.style.removeProperty("--pointer-x");
      hero?.style.removeProperty("--pointer-y");
      cancelAnimationFrame(pointerFrame);
    };
  }, [pathname, running]);

  function toggleMotion() {
    const next = !enabled;
    setEnabled(next);
    try { localStorage.setItem("academic-motion", next ? "on" : "off"); } catch { /* Keep the control usable without storage. */ }
  }

  return <>
    <div className="reading-progress" aria-hidden="true"><div ref={progress} /></div>
    <button className="motion-toggle" type="button" aria-label="动态效果" aria-pressed={running}
      disabled={reduced} title={reduced ? "系统已启用减少动态效果" : running ? "关闭动态效果" : "开启动态效果"}
      onClick={toggleMotion}>
      <span className="motion-icon" aria-hidden="true">✧</span>
      <span>动效 <span>{running ? "开" : "关"}</span></span>
    </button>
  </>;
}
