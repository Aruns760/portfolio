import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../../data/animations";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "⬡",
    accent: "#22d3ee",
    glow: "rgba(34,211,238,0.18)",
    border: "rgba(34,211,238,0.3)",
    bg: "rgba(34,211,238,0.06)",
    skills: [
      { name: "HTML",       level: 95, icon: "🌐" },
      { name: "CSS",        level: 90, icon: "🎨" },
      { name: "JavaScript", level: 85, icon: "⚡" },
      { name: "React",      level: 82, icon: "⚛️" },
      { name: "Next.js",    level: 75, icon: "▲" },
      { name: "Tailwind",   level: 80, icon: "💨" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "◈",
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.18)",
    border: "rgba(167,139,250,0.3)",
    bg: "rgba(167,139,250,0.06)",
    skills: [
      { name: "Node.js",    level: 82, icon: "🟢" },
      { name: "Express.js", level: 80, icon: "🚂" },
      { name: "REST APIs",  level: 85, icon: "🔗" },
      { name: "JWT Auth",   level: 75, icon: "🔐" },
      { name: "Middleware", level: 75, icon: "⚙️" },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: "◎",
    accent: "#34d399",
    glow: "rgba(52,211,153,0.18)",
    border: "rgba(52,211,153,0.3)",
    bg: "rgba(52,211,153,0.06)",
    skills: [
      { name: "MongoDB",    level: 80, icon: "🍃" },
      { name: "PostgreSQL", level: 72, icon: "🐘" },
      { name: "MySQL",      level: 70, icon: "🐬" },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    icon: "◆",
    accent: "#fb923c",
    glow: "rgba(251,146,60,0.18)",
    border: "rgba(251,146,60,0.3)",
    bg: "rgba(251,146,60,0.06)",
    skills: [
      { name: "Python",     level: 82, icon: "🐍" },
      { name: "JavaScript", level: 85, icon: "⚡" },
      { name: "Java",       level: 68, icon: "☕" },
      { name: "R",          level: 60, icon: "📊" },
    ],
  },
  {
    id: "ai",
    title: "AI / ML",
    icon: "◉",
    accent: "#f472b6",
    glow: "rgba(244,114,182,0.18)",
    border: "rgba(244,114,182,0.3)",
    bg: "rgba(244,114,182,0.06)",
    skills: [
      { name: "Scikit-Learn", level: 75, icon: "🤖" },
      { name: "Streamlit",    level: 78, icon: "🌊" },
      { name: "Pandas",       level: 72, icon: "🐼" },
      { name: "Matplotlib",   level: 68, icon: "📈" },
    ],
  },
  {
    id: "tools",
    title: "Dev Tools",
    icon: "⬟",
    accent: "#facc15",
    glow: "rgba(250,204,21,0.18)",
    border: "rgba(250,204,21,0.3)",
    bg: "rgba(250,204,21,0.06)",
    skills: [
      { name: "Git",     level: 85, icon: "🌿" },
      { name: "GitHub",  level: 88, icon: "🐙" },
      { name: "VS Code", level: 92, icon: "💻" },
      { name: "Postman", level: 80, icon: "📬" },
      { name: "Figma",   level: 60, icon: "🎭" },
    ],
  },
];

// ─── Hook: detect mobile ──────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ skill, accent, glow, delay = 0, visible }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{ fontSize: "14px" }}>{skill.icon}</span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "13px", fontWeight: 600, color: "#e2e8f0",
          }}>
            {skill.name}
          </span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px", color: accent, fontWeight: 500,
        }}>
          {skill.level}%
        </span>
      </div>
      <div style={{
        height: "6px", borderRadius: "3px",
        background: "rgba(255,255,255,0.07)", overflow: "hidden",
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: visible ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%", borderRadius: "3px",
            background: `linear-gradient(90deg, ${accent}88, ${accent})`,
            boxShadow: `0 0 8px ${glow}`, position: "relative", overflow: "hidden",
          }}
        >
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.8, delay: delay + 0.5, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.32), transparent)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─── Radar chart ──────────────────────────────────────────────────────────────
function RadarChart({ visible, size = 220 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.36;
  const cats = skillCategories.map((c) => ({
    label: c.title,
    value: Math.round(c.skills.reduce((a, s) => a + s.level, 0) / c.skills.length),
    accent: c.accent,
  }));
  const n = cats.length;

  const pt = (i, radius) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
  };

  const polyPts = cats.map((c, i) => pt(i, (c.value / 100) * r).join(",")).join(" ");
  const rings   = [0.25, 0.5, 0.75, 1];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {rings.map((ring, ri) => (
          <polygon key={ri}
            points={cats.map((_, i) => pt(i, ring * r).join(",")).join(" ")}
            fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
          />
        ))}
        {cats.map((_, i) => {
          const [x, y] = pt(i, r);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
        })}
        <motion.polygon
          points={polyPts}
          fill="rgba(34,211,238,0.1)" stroke="#22d3ee" strokeWidth="1.5"
          initial={{ scale: 0, transformOrigin: `${cx}px ${cy}px` }}
          animate={{ scale: visible ? 1 : 0, transformOrigin: `${cx}px ${cy}px` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {cats.map((cat, i) => {
          const [x, y] = pt(i, (cat.value / 100) * r);
          return (
            <motion.circle key={i} cx={x} cy={y} r="4"
              fill={cat.accent} stroke="#040d18" strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.4 }}
              style={{ filter: `drop-shadow(0 0 4px ${cat.accent})` }}
            />
          );
        })}
        {cats.map((cat, i) => {
          const [x, y] = pt(i, r + (size < 200 ? 18 : 22));
          return (
            <text key={i} x={x} y={y}
              textAnchor="middle" dominantBaseline="middle"
              fill={cat.accent} fontSize={size < 200 ? "8" : "9"}
              fontFamily="'JetBrains Mono', monospace"
            >
              {cat.label}
            </text>
          );
        })}
      </svg>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center", maxWidth: "280px" }}>
        {cats.map((cat) => (
          <div key={cat.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: cat.accent, boxShadow: `0 0 5px ${cat.accent}`,
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "8.5px", color: "rgba(148,163,184,0.65)",
            }}>
              {cat.label} {cat.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab pill ─────────────────────────────────────────────────────────────────
function TabPill({ cat, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px", borderRadius: "100px",
        border: `1px solid ${isActive ? cat.border : "rgba(255,255,255,0.08)"}`,
        background: isActive ? cat.bg : "transparent",
        color: isActive ? cat.accent : "rgba(148,163,184,0.6)",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "12px", fontWeight: 600,
        cursor: "pointer", transition: "all 0.22s",
        letterSpacing: "0.3px",
        boxShadow: isActive ? `0 0 14px ${cat.glow}` : "none",
        whiteSpace: "nowrap", flexShrink: 0,
      }}
    >
      <span style={{ marginRight: "5px" }}>{cat.icon}</span>
      {cat.title}
    </button>
  );
}

// ─── Category panel ───────────────────────────────────────────────────────────
function CategoryPanel({ cat, visible }) {
  return (
    <motion.div
      key={cat.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32 }}
      style={{
        background: "rgba(0,0,0,0.28)",
        border: `1px solid ${cat.border}`,
        borderRadius: "20px", padding: "24px",
        backdropFilter: "blur(12px)",
        boxShadow: `0 0 36px ${cat.glow}`,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px", flexWrap: "wrap" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "10px",
          background: cat.bg, border: `1px solid ${cat.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "17px", color: cat.accent, flexShrink: 0,
        }}>
          {cat.icon}
        </div>
        <div>
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "15px", fontWeight: 700,
            color: cat.accent, letterSpacing: "1px",
          }}>
            {cat.title}
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px", color: "rgba(148,163,184,0.5)",
            letterSpacing: "1.5px", marginTop: "2px",
          }}>
            {cat.skills.length} skills
          </div>
        </div>
        <div style={{
          marginLeft: "auto",
          padding: "4px 12px", borderRadius: "100px",
          background: cat.bg, border: `1px solid ${cat.border}`,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px", color: cat.accent,
        }}>
          avg {Math.round(cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length)}%
        </div>
      </div>

      {cat.skills.map((skill, i) => (
        <SkillBar
          key={skill.name} skill={skill}
          accent={cat.accent} glow={cat.glow}
          delay={i * 0.08} visible={visible}
        />
      ))}
    </motion.div>
  );
}

// ─── Stats mini cards ─────────────────────────────────────────────────────────
function StatCards() {
  const allSkills = skillCategories.flatMap((c) => c.skills);
  const avgMastery = Math.round(allSkills.reduce((a, s) => a + s.level, 0) / allSkills.length);

  const stats = [
    { label: "Categories",   value: skillCategories.length,      accent: "#22d3ee" },
    { label: "Total Skills", value: allSkills.length,             accent: "#a78bfa" },
    { label: "Avg Mastery",  value: `${avgMastery}%`,            accent: "#34d399" },
    { label: "Top Domain",   value: "Full Stack",                 accent: "#facc15" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      {stats.map((s) => (
        <div key={s.label} style={{
          padding: "14px 10px", borderRadius: "12px",
          background: `${s.accent}09`, border: `1px solid ${s.accent}30`,
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "15px", fontWeight: 700, color: s.accent,
          }}>
            {s.value}
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px", color: "rgba(148,163,184,0.5)",
            letterSpacing: "1px", marginTop: "3px", textTransform: "uppercase",
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── All-skills chip cloud ────────────────────────────────────────────────────
function ChipCloud() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      style={{ marginTop: "52px" }}
    >
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px", letterSpacing: "3px",
        color: "rgba(148,163,184,0.4)", textTransform: "uppercase",
        marginBottom: "18px", textAlign: "center",
      }}>
        // all technologies
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "9px", justifyContent: "center" }}>
        {skillCategories.flatMap((cat) =>
          cat.skills.map((skill) => (
            <motion.div
              key={`${cat.id}-${skill.name}`}
              whileHover={{ scale: 1.08, y: -3 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "6px 13px", borderRadius: "100px",
                background: cat.bg, border: `1px solid ${cat.border}`,
                cursor: "default", transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 14px ${cat.glow}`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              <span style={{ fontSize: "12px" }}>{skill.icon}</span>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "12px", fontWeight: 600, color: cat.accent,
              }}>
                {skill.name}
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px", color: `${cat.accent}88`, marginLeft: "1px",
              }}>
                {skill.level}
              </span>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Skills ──────────────────────────────────────────────────────────────
function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const [visible,   setVisible]   = useState(false);
  const [radarOpen, setRadarOpen] = useState(false); // mobile accordion
  const sectionRef  = useRef(null);
  const tabBarRef   = useRef(null);
  const isMobile    = useIsMobile();

  const activeCat = skillCategories.find((c) => c.id === activeTab);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleTabChange = (id) => {
    setVisible(false);
    setActiveTab(id);
    setTimeout(() => setVisible(true), 80);
  };

  // Scroll active tab into view on mobile
  useEffect(() => {
    if (!isMobile || !tabBarRef.current) return;
    const active = tabBarRef.current.querySelector("[data-active='true']");
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeTab, isMobile]);

  return (
    <>
      <style>{`
        .skills-tab-bar::-webkit-scrollbar { display: none; }
        .skills-tab-bar { -ms-overflow-style: none; scrollbar-width: none; }

        @media (max-width: 899px) {
          .skills-main-grid { grid-template-columns: 1fr !important; }
          .skills-radar-sticky { position: static !important; }
        }

        @media (max-width: 480px) {
          .skills-section-pad {
            padding-left: 14px !important;
            padding-right: 14px !important;
          }
          .skills-panel-pad { padding: 18px !important; }
          .skills-header-h2 { font-size: clamp(24px, 7vw, 40px) !important; }
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        id="skills"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="skills-section-pad"
        style={{
          padding: "80px 24px",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "48px", position: "relative", zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px", letterSpacing: "4px",
              textTransform: "uppercase", color: "#22d3ee", marginBottom: "12px",
            }}
          >
            // what i know
          </motion.p>
          <motion.h2
            className="skills-header-h2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 900, color: "#f1f5f9",
              letterSpacing: "-1px", margin: 0, lineHeight: 1.1,
            }}
          >
            Tech{" "}
            <span style={{
              background: "linear-gradient(90deg, #22d3ee, #a78bfa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Arsenal
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(13px, 2vw, 15px)",
              color: "rgba(148,163,184,0.65)",
              marginTop: "14px", maxWidth: "480px",
              margin: "14px auto 0", lineHeight: 1.65,
            }}
          >
            Skills, tools, and technologies I've built real projects with —
            each bar reflects hands-on experience.
          </motion.p>
        </div>

        {/* ── Tab scrollbar ── */}
        <motion.div
          ref={tabBarRef}
          className="skills-tab-bar"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{
            display: "flex", gap: "8px",
            overflowX: "auto", paddingBottom: "4px",
            marginBottom: "24px",
          }}
        >
          {skillCategories.map((cat) => (
            <div key={cat.id} data-active={activeTab === cat.id ? "true" : "false"}>
              <TabPill
                cat={cat}
                isActive={activeTab === cat.id}
                onClick={() => handleTabChange(cat.id)}
              />
            </div>
          ))}
        </motion.div>

        {/* ── Main grid: skills left, radar right ── */}
        <div
          className="skills-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 320px",
            gap: isMobile ? "20px" : "36px",
            alignItems: "start",
          }}
        >
          {/* Left: skill bars panel */}
          <div>
            <AnimatePresence mode="wait">
              <CategoryPanel key={activeTab} cat={activeCat} visible={visible} />
            </AnimatePresence>
          </div>

          {/* Right: radar + stats (desktop always visible, mobile accordion) */}
          <div className="skills-radar-sticky" style={{ position: isMobile ? "static" : "sticky", top: "100px" }}>

            {/* Mobile: accordion toggle */}
            {isMobile && (
              <button
                onClick={() => setRadarOpen((v) => !v)}
                style={{
                  width: "100%", padding: "12px 18px",
                  borderRadius: "14px",
                  background: "rgba(34,211,238,0.06)",
                  border: "1px solid rgba(34,211,238,0.22)",
                  color: "#22d3ee",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px", letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <span>// skill radar & stats</span>
                <motion.span
                  animate={{ rotate: radarOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ fontSize: "14px" }}
                >
                  ▼
                </motion.span>
              </button>
            )}

            <AnimatePresence>
              {(!isMobile || radarOpen) && (
                <motion.div
                  key="radar-block"
                  initial={isMobile ? { opacity: 0, height: 0 } : false}
                  animate={isMobile ? { opacity: 1, height: "auto" } : { opacity: 1 }}
                  exit={isMobile ? { opacity: 0, height: 0 } : undefined}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  {/* Radar card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.55 }}
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "20px", padding: "24px 16px",
                      backdropFilter: "blur(12px)",
                      textAlign: "center", marginBottom: "12px",
                    }}
                  >
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px", letterSpacing: "2.5px",
                      color: "rgba(148,163,184,0.45)",
                      textTransform: "uppercase", marginBottom: "18px",
                    }}>
                      // skill radar
                    </div>
                    {/* Smaller radar on mobile */}
                    <RadarChart visible={visible} size={isMobile ? 200 : 220} />
                  </motion.div>

                  {/* Stats cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <StatCards />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Chip cloud ── */}
        <ChipCloud />
      </motion.section>
    </>
  );
}

export default Skills;