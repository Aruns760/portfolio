import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",     href: "#home",     id: "home",     icon: "⌂" },
  { label: "About",    href: "#about",    id: "about",    icon: "◈" },
  { label: "Skills",   href: "#skills",   id: "skills",   icon: "⬡" },
  { label: "Projects", href: "#projects", id: "projects", icon: "◻" },
  { label: "Contact",  href: "#contact",  id: "contact",  icon: "◎" },
];

// ── Animated typing cursor for logo ──────────────────────────────────────────
function LogoText() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setShow((v) => !v), 600);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ display: "flex", alignItems: "center", gap: "1px" }}>
      <span style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "17px", fontWeight: 900,
        background: "linear-gradient(90deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", letterSpacing: "1.5px",
      }}>
        Arun S
      </span>
      <span style={{
        display: "inline-block", width: "2px", height: "16px",
        background: "#22d3ee", marginLeft: "2px",
        opacity: show ? 1 : 0, transition: "opacity 0.1s",
        borderRadius: "1px",
      }} />
    </span>
  );
}

// ── Status pill ───────────────────────────────────────────────────────────────
function StatusPill() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "6px",
      padding: "4px 10px", borderRadius: "100px",
      background: "rgba(31,216,138,0.08)",
      border: "1px solid rgba(31,216,138,0.2)",
    }}>
      <span style={{
        width: "6px", height: "6px", borderRadius: "50%",
        background: "#1fd88a",
        boxShadow: "0 0 6px #1fd88a",
        animation: "pulse-status 1.8s ease-in-out infinite",
        display: "inline-block",
      }} />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "8.5px", color: "#1fd88a",
        letterSpacing: "1px", whiteSpace: "nowrap",
      }}>
        OPEN TO WORK
      </span>
    </div>
  );
}

function Navbar() {
  const [activeSection, setActiveSection]   = useState("home");
  const [scrolled, setScrolled]             = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen]             = useState(false);
  const [hoveredLink, setHoveredLink]       = useState(null);
  const [mouseX, setMouseX]                 = useState(0);
  const navRef  = useRef(null);
  const menuRef = useRef(null);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 40);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (sy / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse parallax on navbar
  useEffect(() => {
    const onMouse = (e) => setMouseX((e.clientX / window.innerWidth - 0.5) * 30);
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  // Active section tracking
  useEffect(() => {
    const observers = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Close menu + lock scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (id) => activeSection === id;

  return (
    <>
      <style>{`
        @keyframes pulse-status {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glitch-1 {
          0%,100% { clip-path: none; transform: none; }
          92%     { clip-path: inset(30% 0 50% 0); transform: translate(-3px, 0); }
          94%     { clip-path: inset(60% 0 20% 0); transform: translate(3px, 0); }
          96%     { clip-path: none; transform: none; }
        }
        @keyframes glitch-2 {
          0%,100% { clip-path: none; transform: none; }
          93%     { clip-path: inset(10% 0 70% 0); transform: translate(3px, 0); }
          95%     { clip-path: inset(70% 0 10% 0); transform: translate(-3px, 0); }
          97%     { clip-path: none; transform: none; }
        }
        .logo-wrap { position: relative; }
        .logo-wrap::before, .logo-wrap::after {
          content: "Arun S";
          position: absolute; inset: 0;
          font-family: 'Orbitron', monospace;
          font-size: 17px; font-weight: 900;
          pointer-events: none;
          background-size: 200% auto;
        }
        .logo-wrap::before {
          background: linear-gradient(90deg, #f0abfc, #f0abfc);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glitch-1 8s infinite;
          left: 2px;
        }
        .logo-wrap::after {
          background: linear-gradient(90deg, #67e8f9, #67e8f9);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glitch-2 8s infinite;
          left: -2px;
        }
        .nav-pill {
          position: relative;
          overflow: hidden;
        }
        .nav-pill::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.06), transparent);
          transform: translateX(-100%);
          transition: transform 0.4s;
        }
        .nav-pill:hover::before { transform: translateX(100%); }
        .resume-btn {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .hamburger   { display: none !important; }
        }
      `}</style>

      {/* ── Main navbar ──────────────────────────────────────────────────────── */}
      <motion.nav
        ref={navRef}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100,
          background: scrolled
            ? "rgba(2,6,14,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(1.8)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.8)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(34,211,238,0.1)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 4px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(34,211,238,0.05)"
            : "none",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{
            position: "absolute", bottom: 0, left: 0,
            height: "2px",
            background: "linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6)",
            boxShadow: "0 0 10px rgba(34,211,238,0.7)",
          }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Ambient glow that follows mouse */}
        <div style={{
          position: "absolute", top: "-30px",
          left: `calc(50% + ${mouseX}px)`,
          transform: "translateX(-50%)",
          width: "300px", height: "80px",
          background: "radial-gradient(ellipse, rgba(34,211,238,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          transition: "left 0.3s ease",
        }} />

        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 clamp(16px,3vw,32px)",
          height: "66px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "relative",
        }}>

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Hex badge */}
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))",
              border: "1px solid rgba(34,211,238,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 16px rgba(34,211,238,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
              position: "relative", overflow: "hidden",
            }}>
              {/* Shine */}
              <div style={{
                position: "absolute", top: 0, left: "-50%",
                width: "30%", height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                transform: "skewX(-20deg)",
              }} />
              <span style={{
                fontFamily: "'Orbitron', monospace", fontSize: "14px", fontWeight: 900,
                background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>A</span>
            </div>

            <div className="logo-wrap">
              <LogoText />
            </div>

            {/* Status pill — hidden on small screens */}
            <div style={{ display: "none" }} className="status-pill-desktop">
              <StatusPill />
            </div>
          </a>

          {/* ── Desktop nav ───────────────────────────────────────────────── */}
          <ul className="desktop-nav" style={{
            alignItems: "center", gap: "2px",
            listStyle: "none", margin: 0, padding: 0,
          }}>
            {NAV_LINKS.map((link) => {
              const active = isActive(link.id);
              const hovered = hoveredLink === link.id;
              return (
                <li key={link.id} style={{ position: "relative" }}>
                  {/* Hover/active background pill */}
                  <AnimatePresence>
                    {(active || hovered) && (
                      <motion.div
                        layoutId={active ? "activeNavBg" : undefined}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "absolute", inset: 0,
                          borderRadius: "10px",
                          background: active
                            ? "rgba(34,211,238,0.1)"
                            : "rgba(255,255,255,0.04)",
                          border: active
                            ? "1px solid rgba(34,211,238,0.22)"
                            : "1px solid rgba(255,255,255,0.06)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <a
                    href={link.href}
                    className="nav-pill"
                    onMouseEnter={() => setHoveredLink(link.id)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      position: "relative", zIndex: 1,
                      display: "inline-flex", alignItems: "center", gap: "5px",
                      padding: "8px 15px",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "13.5px",
                      fontWeight: active ? 700 : 500,
                      color: active ? "#22d3ee" : "rgba(148,163,184,0.75)",
                      textDecoration: "none",
                      borderRadius: "10px",
                      transition: "color 0.2s",
                      letterSpacing: "0.2px",
                    }}
                  >
                    {/* Active dot */}
                    {active && (
                      <motion.span
                        layoutId="navDot"
                        style={{
                          display: "inline-block",
                          width: "4px", height: "4px", borderRadius: "50%",
                          background: "#22d3ee",
                          boxShadow: "0 0 8px #22d3ee",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}

            {/* Resume CTA */}
            <li style={{ marginLeft: "6px" }}>
              <a
                href="/Arun S-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="resume-btn"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  padding: "9px 20px", borderRadius: "11px",
                  background: "linear-gradient(135deg, #0891b2 0%, #7c3aed 50%, #0891b2 100%)",
                  backgroundSize: "200% auto",
                  color: "#fff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "13px", fontWeight: 700,
                  textDecoration: "none", letterSpacing: "0.3px",
                  boxShadow: "0 0 20px rgba(34,211,238,0.18)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  border: "1px solid rgba(34,211,238,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 28px rgba(34,211,238,0.32)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(34,211,238,0.18)";
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Resume
              </a>
            </li>
          </ul>

          {/* ── Hamburger ─────────────────────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="hamburger"
            style={{
              display: "none",
              width: "44px", height: "44px", borderRadius: "12px",
              border: `1px solid ${menuOpen ? "rgba(34,211,238,0.4)" : "rgba(34,211,238,0.18)"}`,
              background: menuOpen ? "rgba(34,211,238,0.1)" : "rgba(34,211,238,0.05)",
              color: "#22d3ee", cursor: "pointer",
              flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "5px", padding: "11px",
              transition: "all 0.2s",
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 7 }
                    : i === 1 ? { opacity: 0, scaleX: 0 }
                    : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.22 }}
                style={{
                  display: "block",
                  width: i === 1 ? "14px" : "20px",
                  height: "2px",
                  borderRadius: "2px",
                  background: "linear-gradient(90deg, #22d3ee, #a78bfa)",
                  transformOrigin: "center",
                  alignSelf: i === 1 ? "flex-end" : "center",
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile menu ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 98,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Drawer */}
            <motion.div
              ref={menuRef}
              key="mobile-menu"
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed", top: "76px", left: "12px", right: "12px",
                zIndex: 99,
                background: "rgba(3,9,20,0.97)",
                border: "1px solid rgba(34,211,238,0.16)",
                borderRadius: "20px", padding: "12px",
                backdropFilter: "blur(28px)",
                boxShadow: "0 24px 70px rgba(0,0,0,0.7), 0 0 60px rgba(34,211,238,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Menu header */}
              <div style={{
                padding: "10px 12px 14px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <StatusPill />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px", color: "rgba(148,163,184,0.3)",
                  letterSpacing: "1.5px",
                }}>
                  MENU
                </span>
              </div>

              {/* Links */}
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.id);
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", gap: "14px",
                          padding: "12px 14px", borderRadius: "13px",
                          textDecoration: "none", marginBottom: "3px",
                          background: active ? "rgba(34,211,238,0.09)" : "transparent",
                          border: `1px solid ${active ? "rgba(34,211,238,0.2)" : "transparent"}`,
                          transition: "all 0.18s",
                        }}
                        onMouseEnter={(e) => {
                          if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                          if (!active) e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {/* Icon box */}
                        <div style={{
                          width: "34px", height: "34px", borderRadius: "9px", flexShrink: 0,
                          background: active ? "rgba(34,211,238,0.12)" : "rgba(255,255,255,0.04)",
                          border: `1px solid ${active ? "rgba(34,211,238,0.25)" : "rgba(255,255,255,0.06)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "13px",
                          color: active ? "#22d3ee" : "rgba(148,163,184,0.4)",
                          transition: "all 0.18s",
                        }}>
                          {link.icon}
                        </div>

                        <span style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "15px",
                          fontWeight: active ? 700 : 500,
                          color: active ? "#22d3ee" : "rgba(148,163,184,0.8)",
                          flex: 1,
                          transition: "color 0.18s",
                        }}>
                          {link.label}
                        </span>

                        {active ? (
                          <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "8px", color: "rgba(34,211,238,0.5)",
                            letterSpacing: "1.5px", padding: "3px 8px",
                            borderRadius: "100px",
                            background: "rgba(34,211,238,0.08)",
                            border: "1px solid rgba(34,211,238,0.15)",
                          }}>
                            NOW
                          </span>
                        ) : (
                          <span style={{ color: "rgba(148,163,184,0.2)", fontSize: "14px" }}>›</span>
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Divider */}
              <div style={{
                height: "1px", margin: "10px 4px",
                background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.12), transparent)",
              }} />

              {/* Resume button */}
              <motion.a
                href="/Arun S-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "14px", borderRadius: "13px",
                  background: "linear-gradient(135deg, #0891b2, #7c3aed)",
                  color: "#fff",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "14px", fontWeight: 700,
                  textDecoration: "none", letterSpacing: "0.3px",
                  boxShadow: "0 4px 24px rgba(34,211,238,0.2)",
                  border: "1px solid rgba(34,211,238,0.15)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </motion.a>

              {/* Footer */}
              <div style={{
                textAlign: "center", marginTop: "12px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px", color: "rgba(148,163,184,0.2)",
                letterSpacing: "1.5px",
              }}>
                arunajay9790@gmail.com
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;