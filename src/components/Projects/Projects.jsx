import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../data/animations";

// ── Import your project screenshots ──────────────────────────────────────────
// Place PNG/JPG files in: src/assets/images/
import furnituremartImg from "../../assets/images/furnituremart.png";
import levelupImg       from "../../assets/images/levelup.png";
import rfpredictionImg  from "../../assets/images/rfprediction.png";
import todoImg          from "../../assets/images/todoapp.png";

// ── Add these fonts to your public/index.html <head> ─────────────────────────
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

// ─────────────────────────────────────────────────────────────────────────────
const projects = [
  {
    title: "FurnitureMart",
    image: furnituremartImg,          // ← real screenshot used here
    description:
      "Full-stack furniture e-commerce platform with user authentication, shopping cart, product management, order processing, admin dashboard, REST APIs, and MongoDB integration.",
    tech: ["Node.js", "Express.js", "MongoDB", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/Aruns760/FurnitureMart.git",
    demo: "https://guileless-semolina-df0159.netlify.app/",
    category: "Full Stack",
    featured: true,
    year: "2025",
    theme: {
      bg:           "linear-gradient(145deg, #12061e 0%, #1e0845 50%, #0d0318 100%)",
      border:       "rgba(181,122,251,0.25)",
      glow:         "rgba(181,122,251,0.12)",
      glowStrong:   "rgba(181,122,251,0.35)",
      accent:       "#b57afb",
      accentDim:    "rgba(181,122,251,0.15)",
      accentBorder: "rgba(181,122,251,0.4)",
      text:         "#f0e6ff",
      subtext:      "rgba(240,230,255,0.65)",
      techBg:       "rgba(181,122,251,0.1)",
      techColor:    "#c89dfc",
      techBorder:   "rgba(181,122,251,0.3)",
      ghBg:         "rgba(181,122,251,0.08)",
      ghColor:      "#c89dfc",
      ghBorder:     "rgba(181,122,251,0.3)",
      demoBg:       "#b57afb",
      demoColor:    "#0d0318",
      scanLine:     "rgba(181,122,251,0.04)",
      number:       "rgba(181,122,251,0.08)",
    },
  },
  {
    title: "LEVEL UP",
    image: levelupImg,
    description:
      "Gamified portfolio platform featuring XP systems, achievements, streaks, levels, progress tracking, authentication, and modern dashboard UI.",
    tech: ["Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/Aruns760/Level-Up.git",
    demo: "https://level-up-git-main-aruns760s-projects.vercel.app",
    category: "Portfolio Platform",
    featured: true,
    year: "2026",
    theme: {
      bg:           "linear-gradient(145deg, #001a10 0%, #002d1e 50%, #000f09 100%)",
      border:       "rgba(31,216,138,0.25)",
      glow:         "rgba(31,216,138,0.10)",
      glowStrong:   "rgba(31,216,138,0.32)",
      accent:       "#1fd88a",
      accentDim:    "rgba(31,216,138,0.15)",
      accentBorder: "rgba(31,216,138,0.4)",
      text:         "#ccfde8",
      subtext:      "rgba(204,253,232,0.65)",
      techBg:       "rgba(31,216,138,0.08)",
      techColor:    "#5eeaaa",
      techBorder:   "rgba(31,216,138,0.3)",
      ghBg:         "rgba(31,216,138,0.08)",
      ghColor:      "#5eeaaa",
      ghBorder:     "rgba(31,216,138,0.3)",
      demoBg:       "#1fd88a",
      demoColor:    "#001a10",
      scanLine:     "rgba(31,216,138,0.03)",
      number:       "rgba(31,216,138,0.07)",
    },
  },
  {
    title: "RF Prediction",
    image: rfpredictionImg,
    description:
      "AI-powered Radio Frequency Monitoring & Prediction platform with machine learning, anomaly detection, heatmaps, monitoring dashboard, and cloud integration.",
    tech: ["Python", "Machine Learning", "Streamlit", "MongoDB Atlas", "Scikit-Learn"],
    github: "https://github.com/Aruns760/RadioFrequencyPrediction.git",
    demo: "https://radiofrequencyprediction-xuqlegylpabpm7xhqyndmr.streamlit.app/",
    category: "AI / ML",
    featured: true,
    year: "2024",
    theme: {
      bg:           "linear-gradient(145deg, #150800 0%, #2a1000 50%, #0f0400 100%)",
      border:       "rgba(255,140,66,0.25)",
      glow:         "rgba(255,140,66,0.10)",
      glowStrong:   "rgba(255,140,66,0.32)",
      accent:       "#ff8c42",
      accentDim:    "rgba(255,140,66,0.15)",
      accentBorder: "rgba(255,140,66,0.4)",
      text:         "#ffe8cc",
      subtext:      "rgba(255,232,204,0.65)",
      techBg:       "rgba(255,140,66,0.08)",
      techColor:    "#ffb07a",
      techBorder:   "rgba(255,140,66,0.3)",
      ghBg:         "rgba(255,140,66,0.08)",
      ghColor:      "#ffb07a",
      ghBorder:     "rgba(255,140,66,0.3)",
      demoBg:       "#ff8c42",
      demoColor:    "#150800",
      scanLine:     "rgba(255,140,66,0.03)",
      number:       "rgba(255,140,66,0.07)",
    },
  },
  {
    title: "Smart To-Do",
    image: todoImg,
    description:
      "Modern task manager with local storage, task filtering, calendar support, responsive design, and a productivity-focused user experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Aruns760/todo-app",
    demo: "https://aruns760.github.io/todo-app/",
    category: "Frontend",
    featured: false,
    year: "2024",
    theme: {
      bg:           "linear-gradient(145deg, #001018 0%, #001e2e 50%, #000a10 100%)",
      border:       "rgba(41,212,245,0.25)",
      glow:         "rgba(41,212,245,0.10)",
      glowStrong:   "rgba(41,212,245,0.32)",
      accent:       "#29d4f5",
      accentDim:    "rgba(41,212,245,0.15)",
      accentBorder: "rgba(41,212,245,0.4)",
      text:         "#c8f4ff",
      subtext:      "rgba(200,244,255,0.65)",
      techBg:       "rgba(41,212,245,0.08)",
      techColor:    "#7ee8fa",
      techBorder:   "rgba(41,212,245,0.3)",
      ghBg:         "rgba(41,212,245,0.08)",
      ghColor:      "#7ee8fa",
      ghBorder:     "rgba(41,212,245,0.3)",
      demoBg:       "#29d4f5",
      demoColor:    "#001018",
      scanLine:     "rgba(41,212,245,0.03)",
      number:       "rgba(41,212,245,0.07)",
    },
  },
];

// ─── BrowserMockup — shows the real screenshot inside a browser chrome ────────
function BrowserMockup({ project }) {
  const { theme } = project;
  return (
    <div
      style={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${theme.border}`,
        boxShadow: `0 0 24px ${theme.glow}`,
        marginBottom: "18px",
        flexShrink: 0,
      }}
    >
      {/* ── Chrome bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "8px 12px",
          background: "rgba(0,0,0,0.55)",
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        {/* Traffic lights */}
        {["rgba(255,95,86,0.85)", "rgba(255,189,46,0.85)", "rgba(39,201,63,0.85)"].map((c, i) => (
          <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, flexShrink: 0 }} />
        ))}

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            margin: "0 8px",
            padding: "3px 9px",
            borderRadius: "5px",
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${theme.border}`,
            display: "flex",
            alignItems: "center",
            gap: "5px",
            minWidth: 0,
          }}
        >
          <span style={{ fontSize: "9px", flexShrink: 0 }}>🔒</span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: theme.subtext,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {project.demo.replace("https://", "")}
          </span>
        </div>

        {/* LIVE badge */}
        <div
          style={{
            padding: "2px 7px",
            borderRadius: "100px",
            background: theme.accentDim,
            border: `1px solid ${theme.accentBorder}`,
            fontSize: "8px",
            color: theme.accent,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "1px",
            flexShrink: 0,
          }}
        >
          LIVE
        </div>
      </div>

      {/* ── Screenshot image ── THIS is where the real image renders */}
      <div style={{ height: "165px", overflow: "hidden", position: "relative" }}>
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",       // fills the box, crops edges
            objectPosition: "top",    // show the top of the page (most important part)
            display: "block",
          }}
        />
        {/* Subtle color tint overlay matching the card theme */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 60%, ${theme.bg} 100%)`,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
function ProjectCard({ project, offset, isDragging, dragDelta }) {
  const { theme } = project;
  const isActive = offset === 0;

  const CARD_WIDTH = 400;
  const spacing    = 440;

  const tx      = offset * spacing + (isDragging && isActive ? dragDelta * 0.3 : 0);
  const tz      = isActive ? 60 : -Math.abs(offset) * 120;
  const rotateY = offset * 15 + (isDragging && isActive ? dragDelta * 0.05 : 0);
  const scale   = isActive ? 1 : Math.max(0.78, 1 - Math.abs(offset) * 0.11);
  const opacity = Math.abs(offset) === 0 ? 1 : Math.abs(offset) === 1 ? 0.42 : 0;
  const zIndex  = 20 - Math.abs(offset) * 5;

  return (
    <div
      style={{
        position: "absolute",
        width: `${CARD_WIDTH}px`,
        left: `calc(50% - ${CARD_WIDTH / 2}px)`,
        top: 0,
        height: "100%",
        borderRadius: "22px",
        background: theme.bg,
        border: `1px solid ${isActive ? theme.glowStrong : theme.border}`,
        boxShadow: isActive
          ? `0 0 0 1px ${theme.border}, 0 28px 70px rgba(0,0,0,0.75), 0 0 50px ${theme.glow}`
          : `0 10px 35px rgba(0,0,0,0.5)`,
        transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        zIndex,
        transition: isDragging
          ? "opacity 0.1s"
          : "transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease, box-shadow 0.4s ease",
        pointerEvents: isActive ? "auto" : "none",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        willChange: "transform, opacity",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      {/* Scanlines texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, ${theme.scanLine} 0px, ${theme.scanLine} 1px, transparent 1px, transparent 4px)`,
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: "22px",
        }}
      />

      {/* Big watermark number */}
      <div
        style={{
          position: "absolute",
          bottom: "-24px",
          right: "12px",
          fontSize: "130px",
          fontFamily: "'Orbitron', monospace",
          fontWeight: 900,
          color: theme.number,
          pointerEvents: "none",
          zIndex: 0,
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {String(projects.indexOf(project) + 1).padStart(2, "0")}
      </div>

      {/* ── Card body */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        {/* Browser mockup with real screenshot */}
        <BrowserMockup project={project} />

        {/* Category + Year row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: theme.accent,
            }}
          >
            {project.category}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: theme.subtext }}>
            {project.year}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginBottom: "8px",
              padding: "3px 10px",
              borderRadius: "100px",
              background: theme.accentDim,
              color: theme.accent,
              border: `1px solid ${theme.accentBorder}`,
              fontSize: "10px",
              fontFamily: "'JetBrains Mono', monospace",
              width: "fit-content",
            }}
          >
            ⭐ Featured Project
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "19px",
            fontWeight: 900,
            letterSpacing: "0.5px",
            color: theme.text,
            margin: "0 0 8px 0",
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12.5px",
            lineHeight: 1.7,
            color: theme.subtext,
            margin: 0,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tech pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginTop: "14px" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                padding: "3px 9px",
                borderRadius: "100px",
                background: theme.techBg,
                color: theme.techColor,
                border: `1px solid ${theme.techBorder}`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
          {/* GitHub */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              padding: "11px",
              borderRadius: "11px",
              background: theme.ghBg,
              color: theme.ghColor,
              border: `1px solid ${theme.ghBorder}`,
              fontSize: "12px",
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "transform 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = theme.accentDim; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.background = theme.ghBg; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>

          {/* Live Demo */}
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              padding: "11px",
              borderRadius: "11px",
              background: theme.demoBg,
              color: theme.demoColor,
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "transform 0.15s, opacity 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.opacity = "1"; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Projects Section ────────────────────────────────────────────────────
function Projects() {
  const [current, setCurrent]     = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDelta, setDragDelta]   = useState(0);
  const dragStartX  = useRef(0);
  const committed   = useRef(false);
  const n = projects.length;

  const getOffset = useCallback(
    (i) => {
      let diff = i - current;
      if (diff > n / 2) diff -= n;
      if (diff < -n / 2) diff += n;
      return diff;
    },
    [current, n]
  );

  const goTo = useCallback(
    (idx) => {
      setCurrent(((idx % n) + n) % n);
      setDragDelta(0);
      committed.current = false;
    },
    [n]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // ── Mouse drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    committed.current  = false;
    setDragDelta(0);
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartX.current;
      setDragDelta(delta);
      if (!committed.current && Math.abs(delta) > 80) {
        committed.current = true;
        delta < 0 ? next() : prev();
      }
    };
    const onUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      setDragDelta(0);
      committed.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, next, prev]);

  // ── Touch
  const onTouchStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    committed.current  = false;
    setDragDelta(0);
  };
  const onTouchMove = (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStartX.current;
    setDragDelta(delta);
    if (!committed.current && Math.abs(delta) > 60) {
      committed.current = true;
      delta < 0 ? next() : prev();
    }
  };
  const onTouchEnd = () => {
    setIsDragging(false);
    setDragDelta(0);
    committed.current = false;
  };

  // ── Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const { theme } = projects[current];

  return (
    <>
      <style>{`
        @keyframes scanline {
          0%   { top: -2px; }
          100% { top: 102%; }
        }
      `}</style>

      <motion.section
        id="projects"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ padding: "10px 0 50px", width: "100%", overflowX: "hidden", position: "relative" }}
      >
        {/* Ambient glow behind cards */}
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "350px",
            borderRadius: "50%",
            background: `radial-gradient(ellipse, ${theme.glow} 0%, transparent 70%)`,
            transition: "background 0.8s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── Header */}
        <div style={{ textAlign: "center", marginBottom: "40px", position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: theme.accent,
              marginBottom: "10px",
              transition: "color 0.6s",
            }}
          >
            // my work
          </p>
          <h2
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(26px, 4.5vw, 48px)",
              fontWeight: 900,
              color: "#f1f5f9",
              letterSpacing: "-1px",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Featured{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, rgba(255,80,80,0.95), rgba(139,0,0,0.95))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow:
                "0 0 10px rgba(255,0,0,0.5), 0 0 20px rgba(139,0,0,0.4)",
              transition: "all 0.6s ease",
            }}
          >
            Projects
          </span>     
               </h2>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "rgba(148,163,184,0.5)",
              marginTop: "10px",
              letterSpacing: "2px",
            }}
          >
            {String(current + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
        </div>

        {/* ── Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "32px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <button
            onClick={prev}
            aria-label="Previous project"
            style={{
              width: "46px", height: "46px", borderRadius: "50%",
              border: `1px solid ${theme.border}`, background: theme.accentDim,
              color: theme.accent, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = theme.accentBorder; e.currentTarget.style.transform = "scale(1.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = theme.accentDim;    e.currentTarget.style.transform = "scale(1)"; }}
          >
            ←
          </button>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to ${p.title}`}
                style={{
                  width: i === current ? "28px" : "9px",
                  height: "9px",
                  borderRadius: i === current ? "5px" : "50%",
                  background: i === current ? p.theme.accent : "rgba(255,255,255,0.15)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                  boxShadow: i === current ? `0 0 8px ${p.theme.glowStrong}` : "none",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next project"
            style={{
              width: "46px", height: "46px", borderRadius: "50%",
              border: `1px solid ${theme.border}`, background: theme.accentDim,
              color: theme.accent, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = theme.accentBorder; e.currentTarget.style.transform = "scale(1.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = theme.accentDim;    e.currentTarget.style.transform = "scale(1)"; }}
          >
            →
          </button>
        </div>

        {/* ── 3D Stage */}
        <div
          style={{
            position: "relative",
            height: "600px",
            width: "100%",
            perspective: "1400px",
            perspectiveOrigin: "50% 40%",
            zIndex: 1,
            overflow: "hidden",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Left fade mask */}
          <div
            style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: "200px",
              background: "linear-gradient(to right, #040d18 0%, transparent 100%)",
              zIndex: 10, pointerEvents: "none",
            }}
          />
          {/* Right fade mask */}
          <div
            style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: "200px",
              background: "linear-gradient(to left, #040d18 0%, transparent 100%)",
              zIndex: 10, pointerEvents: "none",
            }}
          />

          {/* Cards */}
          <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
            {projects.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                offset={getOffset(i)}
                isDragging={isDragging}
                dragDelta={dragDelta}
              />
            ))}
          </div>
        </div>

        {/* ── Hint */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            letterSpacing: "2px",
            color: "rgba(148,163,184,0.4)",
            marginTop: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          ← drag · swipe · keyboard →
        </p>
      </motion.section>
    </>
  );
}

export default Projects;