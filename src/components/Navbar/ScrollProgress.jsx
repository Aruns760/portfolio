import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";

const SECTIONS = [
  { id: "home",     label: "Home",     color: "#22d3ee", icon: "⌂" },
  { id: "about",    label: "About",    color: "#a78bfa", icon: "◈" },
  { id: "skills",   label: "Skills",   color: "#34d399", icon: "⬡" },
  { id: "projects", label: "Projects", color: "#fb923c", icon: "◻" },
  { id: "contact",  label: "Contact",  color: "#f472b6", icon: "◎" },
];

function getSectionPercents() {
  const total =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  if (total <= 0) return [];
  return SECTIONS.map((s) => {
    const el = document.getElementById(s.id);
    if (!el) return { ...s, pct: 0 };
    return { ...s, pct: (el.offsetTop / total) * 100 };
  });
}

function ScrollProgress() {
  const [progress, setProgress]       = useState(0);
  const [showBack, setShowBack]       = useState(false);
  const [activeSection, setActive]    = useState("home");
  const [sectionDots, setSectionDots] = useState([]);
  const [barHovered, setBarHovered]   = useState(false);
  const [dotHover, setDotHover]       = useState(null);
  const [sidePanelHovered, setSidePanelHovered] = useState(false);

  // Single spring for smooth progress — drives width directly via motion value
  const rawProgress   = useMotionValue(0);
  const springProgress = useSpring(rawProgress, { stiffness: 130, damping: 26, mass: 0.6 });
  const barWidth       = useTransform(springProgress, (v) => `${v}%`);

  const onScroll = useCallback(() => {
    const total =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    if (total <= 0) return;

    const pct = Math.min(100, (window.scrollY / total) * 100);
    setProgress(pct);
    rawProgress.set(pct);
    setShowBack(window.scrollY > 300);

    let current = SECTIONS[0].id;
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el && window.scrollY >= el.offsetTop - 140) current = s.id;
    }
    setActive(current);
  }, [rawProgress]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    const calc = () => setSectionDots(getSectionPercents());
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const scrollToTop     = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const activeColor = SECTIONS.find((s) => s.id === activeSection)?.color ?? "#22d3ee";

  return (
    <>
      <style>{`
        @keyframes sp-shimmer {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(400%);  }
        }
        @keyframes sp-orb-pulse {
          0%,100% { box-shadow: 0 0 0 0 ${activeColor}55, 0 0 10px ${activeColor}; }
          50%      { box-shadow: 0 0 0 7px ${activeColor}00, 0 0 20px ${activeColor}; }
        }
        @keyframes sp-tick {
          0%   { opacity: 0; transform: scale(0.6); }
          60%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* ── TOP PROGRESS BAR ────────────────────────────────────────────────── */}
      <div
        onMouseEnter={() => setBarHovered(true)}
        onMouseLeave={() => setBarHovered(false)}
        style={{
          position: "fixed", top: 0, left: 0,
          width: "100%", height: barHovered ? "6px" : "3px",
          zIndex: 200, cursor: "default",
          transition: "height 0.25s ease",
        }}
      >
        {/* Track */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.04)" }} />

        {/* ── Single spring-driven fill bar (no duplicate) ── */}
        <motion.div
          style={{
            position: "absolute", top: 0, left: 0, height: "100%",
            width: barWidth,   // driven by spring motion value — no JS state loop
            background: "linear-gradient(90deg, #22d3ee 0%, #a78bfa 55%, #f472b6 100%)",
            boxShadow: "0 0 14px rgba(34,211,238,0.5)",
            overflow: "hidden",
          }}
        >
          {/* Shimmer sweep */}
          <div style={{
            position: "absolute", inset: 0, width: "40%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            animation: "sp-shimmer 2.4s linear infinite",
          }} />
        </motion.div>

        {/* Glowing orb tip */}
        <motion.div
          style={{
            position: "absolute", top: "50%",
            left: barWidth,   // follows the same spring
            width: barHovered ? "14px" : "10px",
            height: barHovered ? "14px" : "10px",
            borderRadius: "50%",
            background: activeColor,
            translateX: "-50%",
            translateY: "-50%",
            animation: "sp-orb-pulse 1.8s ease infinite",
            zIndex: 201,
            transition: "width 0.25s, height 0.25s, background 0.5s",
          }}
        />

        {/* Section dots */}
        {sectionDots.map((dot) => (
          <div
            key={dot.id}
            onClick={() => scrollToSection(dot.id)}
            onMouseEnter={() => setDotHover(dot.id)}
            onMouseLeave={() => setDotHover(null)}
            style={{
              position: "absolute", top: "50%",
              left: `${dot.pct}%`,
              width: dotHover === dot.id ? "11px" : "7px",
              height: dotHover === dot.id ? "11px" : "7px",
              borderRadius: "50%",
              background: progress >= dot.pct ? dot.color : "rgba(255,255,255,0.15)",
              border: `1.5px solid ${dot.color}`,
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              transition: "all 0.22s",
              zIndex: 202,
              boxShadow: progress >= dot.pct ? `0 0 8px ${dot.color}` : "none",
            }}
          >
            {/* Dot tooltip */}
            <div style={{
              position: "absolute", top: "14px", left: "50%",
              transform: `translateX(-50%) translateY(${dotHover === dot.id ? 0 : -5}px)`,
              opacity: dotHover === dot.id ? 1 : 0,
              transition: "opacity 0.18s, transform 0.18s",
              background: "rgba(3,9,20,0.94)",
              border: `1px solid ${dot.color}50`,
              borderRadius: "7px", padding: "3px 9px",
              whiteSpace: "nowrap",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px", letterSpacing: "1px",
              color: dot.color,
              boxShadow: `0 4px 14px rgba(0,0,0,0.5), 0 0 10px ${dot.color}20`,
              pointerEvents: "none",
              backdropFilter: "blur(8px)",
            }}>
              {dot.icon} {dot.label}
            </div>
          </div>
        ))}

        {/* Hover % badge */}
        <AnimatePresence>
          {barHovered && (
            <motion.div
              key="pct"
              initial={{ opacity: 0, y: -6, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.85 }}
              transition={{ duration: 0.18 }}
              style={{
                position: "absolute", top: "10px",
                left: `${Math.min(progress, 92)}%`,
                transform: "translateX(-50%)",
                background: "rgba(3,9,20,0.94)",
                border: `1px solid ${activeColor}50`,
                borderRadius: "7px", padding: "3px 10px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px", letterSpacing: "0.5px",
                color: activeColor, whiteSpace: "nowrap",
                zIndex: 203,
                boxShadow: `0 4px 14px rgba(0,0,0,0.5), 0 0 12px ${activeColor}20`,
                backdropFilter: "blur(10px)",
              }}
            >
              {Math.round(progress)}%
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── SIDE SECTION RAIL ───────────────────────────────────────────────── */}
      <div
        onMouseEnter={() => setSidePanelHovered(true)}
        onMouseLeave={() => setSidePanelHovered(false)}
        style={{
          position: "fixed", right: "18px", top: "50%",
          transform: "translateY(-50%)",
          zIndex: 150,
          display: "flex", flexDirection: "column",
          alignItems: "flex-end", gap: "8px",
          padding: "12px 8px",
          borderRadius: "20px",
          background: sidePanelHovered
            ? "rgba(3,9,20,0.75)"
            : "transparent",
          border: sidePanelHovered
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          backdropFilter: sidePanelHovered ? "blur(16px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Vertical connector line */}
        <div style={{
          position: "absolute", top: "20px", bottom: "20px",
          right: "19px", width: "1px",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
          pointerEvents: "none",
        }} />

        {SECTIONS.map((s) => {
          const isAct = activeSection === s.id;
          const hov   = dotHover === "side-" + s.id;
          return (
            <div
              key={s.id}
              style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px" }}
              onMouseEnter={() => setDotHover("side-" + s.id)}
              onMouseLeave={() => setDotHover(null)}
            >
              {/* Label tooltip */}
              <AnimatePresence>
                {hov && (
                  <motion.div
                    key={"lbl-" + s.id}
                    initial={{ opacity: 0, x: 10, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0,  scale: 1 }}
                    exit={{ opacity: 0, x: 8,   scale: 0.92 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: "rgba(3,9,20,0.94)",
                      border: `1px solid ${s.color}50`,
                      borderRadius: "8px", padding: "4px 10px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px", letterSpacing: "1px",
                      color: s.color, whiteSpace: "nowrap",
                      boxShadow: `0 4px 16px rgba(0,0,0,0.5), 0 0 12px ${s.color}18`,
                      backdropFilter: "blur(10px)",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}
                  >
                    <span style={{ opacity: 0.7 }}>{s.icon}</span>
                    {s.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pill dot */}
              <motion.button
                onClick={() => scrollToSection(s.id)}
                animate={{
                  width:        isAct ? "22px" : "8px",
                  height:       "8px",
                  borderRadius: isAct ? "4px" : "50%",
                  background:   isAct ? s.color : hov ? `${s.color}50` : "rgba(255,255,255,0.14)",
                  boxShadow:    isAct ? `0 0 10px ${s.color}, 0 0 20px ${s.color}40` : "none",
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  border: `1.5px solid ${isAct ? s.color : hov ? `${s.color}60` : "rgba(255,255,255,0.18)"}`,
                  cursor: "pointer",
                  padding: 0, outline: "none",
                  transition: "border-color 0.25s",
                  flexShrink: 0,
                }}
              />
            </div>
          );
        })}

        {/* Progress % label at bottom of rail */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "8px", letterSpacing: "1px",
          color: activeColor, opacity: sidePanelHovered ? 0.7 : 0,
          transition: "opacity 0.3s", textAlign: "right",
          marginTop: "2px",
        }}>
          {Math.round(progress)}%
        </div>
      </div>

      {/* ── SCROLL-TO-TOP BUTTON ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBack && (
          <motion.button
            key="scrolltop"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title={`Back to top · ${Math.round(progress)}%`}
            style={{
              position: "fixed", bottom: "28px", right: "18px",
              width: "48px", height: "48px", borderRadius: "14px",
              border: "1px solid rgba(34,211,238,0.28)",
              background: "rgba(3,9,20,0.88)",
              backdropFilter: "blur(14px)",
              color: "#22d3ee", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 150,
              boxShadow: "0 6px 28px rgba(0,0,0,0.45), 0 0 16px rgba(34,211,238,0.1)",
              transition: "background 0.2s, box-shadow 0.2s, transform 0.2s, border-color 0.2s",
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background    = "rgba(34,211,238,0.1)";
              e.currentTarget.style.boxShadow     = "0 8px 32px rgba(0,0,0,0.5), 0 0 28px rgba(34,211,238,0.25)";
              e.currentTarget.style.transform     = "translateY(-3px)";
              e.currentTarget.style.borderColor   = "rgba(34,211,238,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background    = "rgba(3,9,20,0.88)";
              e.currentTarget.style.boxShadow     = "0 6px 28px rgba(0,0,0,0.45), 0 0 16px rgba(34,211,238,0.1)";
              e.currentTarget.style.transform     = "translateY(0)";
              e.currentTarget.style.borderColor   = "rgba(34,211,238,0.28)";
            }}
          >
            {/* Circular progress ring */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" }} viewBox="0 0 48 48">
              {/* Track */}
              <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(34,211,238,0.07)" strokeWidth="2" />
              {/* Fill */}
              <circle
                cx="24" cy="24" r="21" fill="none"
                stroke="url(#sp-ring-grad)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 21}`}
                strokeDashoffset={`${2 * Math.PI * 21 * (1 - progress / 100)}`}
                style={{ transition: "stroke-dashoffset 0.35s ease" }}
              />
              <defs>
                <linearGradient id="sp-ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#22d3ee" />
                  <stop offset="50%"  stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Arrow icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: "relative", zIndex: 1 }}
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default ScrollProgress;