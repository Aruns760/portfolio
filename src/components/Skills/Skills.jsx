import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../../data/animations";

// ── Fonts needed in public/index.html ────────────────────────────────────────
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

// ─── Skill data with levels & icons ──────────────────────────────────────────
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
      { name: "Scikit-Learn",  level: 75, icon: "🤖" },
      { name: "Streamlit",     level: 78, icon: "🌊" },
      { name: "Pandas",        level: 72, icon: "🐼" },
      { name: "Matplotlib",    level: 68, icon: "📈" },
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
      { name: "Git",      level: 85, icon: "🌿" },
      { name: "GitHub",   level: 88, icon: "🐙" },
      { name: "VS Code",  level: 92, icon: "💻" },
      { name: "Postman",  level: 80, icon: "📬" },
      { name: "Figma",    level: 60, icon: "🎭" },
    ],
  },
];

// ─── Animated progress bar ────────────────────────────────────────────────────
function SkillBar({ skill, accent, glow, delay = 0, visible }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span style={{ fontSize: "14px" }}>{skill.icon}</span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#e2e8f0",
            }}
          >
            {skill.name}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: accent,
            fontWeight: 500,
          }}
        >
          {skill.level}%
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          height: "6px",
          borderRadius: "3px",
          background: "rgba(255,255,255,0.07)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: visible ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.1, delay: delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%",
            borderRadius: "3px",
            background: `linear-gradient(90deg, ${accent}aa, ${accent})`,
            boxShadow: `0 0 8px ${glow}`,
            position: "relative",
          }}
        >
          {/* Shimmer */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.8, delay: delay + 0.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ─── SVG Radar / Spider chart ─────────────────────────────────────────────────
function RadarChart({ visible }) {
  const size = 220;
  const cx = size / 2, cy = size / 2;
  const r = 80;
  const categories = skillCategories.map((c) => ({
    label: c.title,
    value: Math.round(c.skills.reduce((a, s) => a + s.level, 0) / c.skills.length),
    accent: c.accent,
  }));
  const n = categories.length;

  const getPoint = (i, radius) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  };

  const polygonPoints = categories
    .map((cat, i) => getPoint(i, (cat.value / 100) * r).join(","))
    .join(" ");

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid rings */}
        {rings.map((ring, ri) => (
          <polygon
            key={ri}
            points={categories.map((_, i) => getPoint(i, ring * r).join(",")).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {categories.map((_, i) => {
          const [x, y] = getPoint(i, r);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
        })}

        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="rgba(34,211,238,0.12)"
          stroke="#22d3ee"
          strokeWidth="1.5"
          initial={{ scale: 0, transformOrigin: `${cx}px ${cy}px` }}
          animate={{ scale: visible ? 1 : 0, transformOrigin: `${cx}px ${cy}px` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Data dots */}
        {categories.map((cat, i) => {
          const [x, y] = getPoint(i, (cat.value / 100) * r);
          return (
            <motion.circle
              key={i}
              cx={x} cy={y} r="4"
              fill={cat.accent}
              stroke="#040d18"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.4 }}
              style={{ filter: `drop-shadow(0 0 4px ${cat.accent})` }}
            />
          );
        })}

        {/* Labels */}
        {categories.map((cat, i) => {
          const [x, y] = getPoint(i, r + 22);
          return (
            <text
              key={i}
              x={x} y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={cat.accent}
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.5"
            >
              {cat.label}
            </text>
          );
        })}
      </svg>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxWidth: "280px" }}>
        {categories.map((cat) => (
          <div key={cat.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: cat.accent, boxShadow: `0 0 6px ${cat.accent}` }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(148,163,184,0.7)", letterSpacing: "0.5px" }}>
              {cat.label} {cat.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Category tab pill ────────────────────────────────────────────────────────
function TabPill({ cat, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 18px",
        borderRadius: "100px",
        border: `1px solid ${isActive ? cat.border : "rgba(255,255,255,0.08)"}`,
        background: isActive ? cat.bg : "transparent",
        color: isActive ? cat.accent : "rgba(148,163,184,0.6)",
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.25s",
        letterSpacing: "0.3px",
        boxShadow: isActive ? `0 0 14px ${cat.glow}` : "none",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ marginRight: "5px", fontFamily: "monospace" }}>{cat.icon}</span>
      {cat.title}
    </button>
  );
}

// ─── Single category panel ────────────────────────────────────────────────────
function CategoryPanel({ cat, visible }) {
  return (
    <motion.div
      key={cat.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      style={{
        background: "rgba(0,0,0,0.25)",
        border: `1px solid ${cat.border}`,
        borderRadius: "20px",
        padding: "28px",
        backdropFilter: "blur(12px)",
        boxShadow: `0 0 40px ${cat.glow}`,
      }}
    >
      {/* Panel header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: cat.bg,
            border: `1px solid ${cat.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontFamily: "monospace",
            color: cat.accent,
          }}
        >
          {cat.icon}
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "16px",
              fontWeight: 700,
              color: cat.accent,
              letterSpacing: "1px",
            }}
          >
            {cat.title}
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "rgba(148,163,184,0.5)",
              letterSpacing: "1.5px",
              marginTop: "2px",
            }}
          >
            {cat.skills.length} skills
          </div>
        </div>
        {/* Avg level badge */}
        <div
          style={{
            marginLeft: "auto",
            padding: "4px 12px",
            borderRadius: "100px",
            background: cat.bg,
            border: `1px solid ${cat.border}`,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: cat.accent,
          }}
        >
          avg {Math.round(cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length)}%
        </div>
      </div>

      {/* Skill bars */}
      {cat.skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          skill={skill}
          accent={cat.accent}
          glow={cat.glow}
          delay={i * 0.08}
          visible={visible}
        />
      ))}
    </motion.div>
  );
}

// ─── Floating hex background decoration ──────────────────────────────────────
function HexGrid() {
  const hexes = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: (i % 6) * 110 + (Math.floor(i / 6) % 2 === 0 ? 0 : 55),
    y: Math.floor(i / 6) * 96,
    delay: i * 0.15,
    accent: ["rgba(34,211,238,0.06)", "rgba(167,139,250,0.06)", "rgba(244,114,182,0.06)"][i % 3],
  }));

  return (
    <div style={{ position: "absolute", right: "-40px", top: "-40px", opacity: 0.4, pointerEvents: "none", zIndex: 0 }}>
      <svg width="660" height="300" viewBox="0 0 660 300">
        {hexes.map((h) => (
          <motion.polygon
            key={h.id}
            points="30,0 60,18 60,54 30,72 0,54 0,18"
            fill={h.accent}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            transform={`translate(${h.x}, ${h.y})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: h.delay, duration: 0.5 }}
          />
        ))}
      </svg>
    </div>
  );
}

// ─── Main Skills component ────────────────────────────────────────────────────
function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  const activeCat = skillCategories.find((c) => c.id === activeTab);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset bars when tab changes
  const handleTabChange = (id) => {
    setVisible(false);
    setActiveTab(id);
    setTimeout(() => setVisible(true), 80);
  };

  return (
    <>
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        id="skills"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          padding: "10px 24px 80px",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <HexGrid />
        {/* ── Header */}
        <div style={{ textAlign: "center", marginBottom: "56px", position: "relative", zIndex: 1 }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#22d3ee",
              marginBottom: "12px",
            }}
          >
            // what i know
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 900,
              color: "#f1f5f9",
              letterSpacing: "-1px",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Tech{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #22d3ee, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
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
              fontSize: "15px",
              color: "rgba(148,163,184,0.65)",
              marginTop: "14px",
              maxWidth: "480px",
              margin: "14px auto 0",
              lineHeight: 1.6,
            }}
          >
            Skills, tools, and technologies I've built real projects with —
            each bar reflects hands-on experience.
          </motion.p>
        </div>

        {/* ── Main layout: left panel + right radar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* ── LEFT: tab bar + active panel */}
          <div>
            {/* Scrollable tab row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                paddingBottom: "4px",
                marginBottom: "24px",
                scrollbarWidth: "none",
              }}
            >
              {skillCategories.map((cat) => (
                <TabPill
                  key={cat.id}
                  cat={cat}
                  isActive={activeTab === cat.id}
                  onClick={() => handleTabChange(cat.id)}
                />
              ))}
            </motion.div>

            {/* Active category panel */}
            <AnimatePresence mode="wait">
              <CategoryPanel key={activeTab} cat={activeCat} visible={visible} />
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Radar chart */}
          <div style={{ position: "sticky", top: "100px" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "28px 20px",
                backdropFilter: "blur(12px)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "2.5px",
                  color: "rgba(148,163,184,0.5)",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                // skill radar
              </div>
              <RadarChart visible={visible} />
            </motion.div>

            {/* Overall stats cards */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}
            >
              {[
                { label: "Categories",    value: skillCategories.length,                                                                          accent: "#22d3ee" },
                { label: "Total Skills",  value: skillCategories.reduce((a, c) => a + c.skills.length, 0),                                        accent: "#a78bfa" },
                { label: "Avg Mastery",   value: Math.round(skillCategories.flatMap(c => c.skills).reduce((a, s) => a + s.level, 0) / skillCategories.flatMap(c => c.skills).length) + "%", accent: "#34d399", raw: true },
                { label: "Top Skill",     value: "Full Stack Dev",                                                                                        accent: "#facc15", raw: true },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "14px",
                    borderRadius: "12px",
                    background: `${stat.accent}09`,
                    border: `1px solid ${stat.accent}30`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "16px", fontWeight: 700, color: stat.accent }}>
                    {stat.raw ? stat.value : stat.value}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(148,163,184,0.5)", letterSpacing: "1px", marginTop: "3px", textTransform: "uppercase" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Bottom: all skill chips grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: "52px" }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "3px",
              color: "rgba(148,163,184,0.4)",
              textTransform: "uppercase",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            // all technologies
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {skillCategories.flatMap((cat) =>
              cat.skills.map((skill) => (
                <motion.div
                  key={`${cat.id}-${skill.name}`}
                  whileHover={{ scale: 1.08, y: -3 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 14px",
                    borderRadius: "100px",
                    background: cat.bg,
                    border: `1px solid ${cat.border}`,
                    cursor: "default",
                    transition: "box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 14px ${cat.glow}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                >
                  <span style={{ fontSize: "12px" }}>{skill.icon}</span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: cat.accent,
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      color: `${cat.accent}99`,
                      marginLeft: "2px",
                    }}
                  >
                    {skill.level}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}

export default Skills;