import { motion } from "framer-motion";

// ── Fonts needed in public/index.html ────────────────────────────────────────
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#assistant" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Aruns760",
    accent: "#a78bfa",
    glow: "rgba(167,139,250,0.3)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arun-s-8559952b3",
    accent: "#22d3ee",
    glow: "rgba(34,211,238,0.3)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:arunajay9790@gmail.com",
    accent: "#fb923c",
    glow: "rgba(251,146,60,0.3)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com/ARUN11112119",
    accent: "#e2e8f0",
    glow: "rgba(226,232,240,0.2)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917604868815?text=Hi%20Arun,%20I%20visited%20your%20portfolio.",
    accent: "#25D366",
    glow: "rgba(37,211,102,0.3)",
    icon: (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.52 3.48A11.82 11.82 0 0 0 12.06 0C5.5 0 .15 5.35.15 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.88 11.88 0 0 0 5.79 1.48h.01c6.57 0 11.93-5.35 11.93-11.94 0-3.19-1.24-6.19-3.48-8.42ZM12.07 21.8h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.72.98.99-3.62-.24-.37a9.83 9.83 0 0 1-1.53-5.27c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.13 1.03 7 2.9a9.81 9.81 0 0 1 2.9 7c0 5.44-4.43 9.86-9.9 9.86Zm5.42-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.44-1.49-.9-.8-1.5-1.8-1.68-2.1-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.08 2.89 1.23 3.09c.15.2 2.13 3.26 5.16 4.57.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
  </svg>
),
  }
];

const TECH_TAGS = [
  "React.js", "Next.js", "Node.js", "Express.js",
  "MongoDB", "PostgreSQL", "Python", "Machine Learning",
  "Tailwind CSS", "Framer Motion",
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @keyframes borderGlow {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        .footer-social-btn:hover .social-label {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

      <footer
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, transparent 0%, rgba(4,13,24,0.8) 30%, #020810 100%)",
          borderTop: "1px solid rgba(34,211,238,0.12)",
        }}
      >
        {/* Animated top border glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #22d3ee, #a78bfa, #22d3ee, transparent)",
            animation: "borderGlow 3s ease infinite",
          }}
        />

        {/* Ambient glow blobs */}
        <div style={{ position: "absolute", bottom: 0, left: "15%", width: "300px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: "15%", width: "260px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 24px 40px", position: "relative", zIndex: 1 }}>

          {/* ── TOP ROW: Brand left, Nav right ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "48px",
              alignItems: "start",
              marginBottom: "52px",
            }}
          >
            {/* Brand block */}
            <div style={{ maxWidth: "420px" }}>
              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: "12px" }}
              >
                <span
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "clamp(22px, 3vw, 32px)",
                    fontWeight: 900,
                    background: "linear-gradient(90deg, #22d3ee 0%, #a78bfa 50%, #f472b6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "1px",
                  }}
                >
                  Arun S
                </span>
              </motion.div>

              {/* Role */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 12px",
                  borderRadius: "100px",
                  border: "1px solid rgba(34,211,238,0.25)",
                  background: "rgba(34,211,238,0.06)",
                  marginBottom: "16px",
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "1.5px", color: "#22d3ee" }}>
                  Full Stack Developer · MCA Student
                </span>
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  color: "rgba(148,163,184,0.65)",
                  margin: "0 0 24px",
                }}
              >
                Building futuristic web apps and AI-powered systems from Chennai, India.
                Passionate about turning ideas into elegant digital products.
              </motion.p>

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
              >
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "9px 14px",
                      borderRadius: "10px",
                      border: `1px solid ${s.accent}30`,
                      background: `${s.accent}09`,
                      color: s.accent,
                      textDecoration: "none",
                      transition: "all 0.25s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${s.accent}18`;
                      e.currentTarget.style.borderColor = `${s.accent}60`;
                      e.currentTarget.style.boxShadow = `0 0 20px ${s.glow}`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${s.accent}09`;
                      e.currentTarget.style.borderColor = `${s.accent}30`;
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {s.icon}
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.3px",
                      }}
                    >
                      {s.label}
                    </span>
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Nav links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "rgba(148,163,184,0.4)",
                  marginBottom: "18px",
                }}
              >
                // navigate
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <a
                      href={link.href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "rgba(148,163,184,0.6)",
                        textDecoration: "none",
                        transition: "color 0.2s, gap 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#22d3ee";
                        e.currentTarget.style.gap = "12px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(148,163,184,0.6)";
                        e.currentTarget.style.gap = "8px";
                      }}
                    >
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#22d3ee", opacity: 0.5 }}>›</span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ── Tech tags row ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            style={{
              padding: "24px 0",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "2.5px",
                color: "rgba(148,163,184,0.3)",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              // built with
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {TECH_TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  style={{
                    padding: "4px 11px",
                    borderRadius: "100px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    color: "rgba(148,163,184,0.5)",
                    letterSpacing: "0.3px",
                    cursor: "default",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(34,211,238,0.35)";
                    e.currentTarget.style.color = "#22d3ee";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(148,163,184,0.5)";
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ── Bottom row: copyright + terminal line ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* Copyright */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: "rgba(148,163,184,0.35)",
                letterSpacing: "0.5px",
              }}
            >
              © {year}{" "}
              <span style={{ color: "rgba(34,211,238,0.6)", fontWeight: 500 }}>Arun S</span>
              {" "}· All Rights Reserved
            </div>

            {/* Terminal credit */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color: "rgba(148,163,184,0.25)",
                letterSpacing: "1px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span style={{ color: "rgba(34,211,238,0.3)" }}>&gt;_</span>
              Designed &amp; Built by Arun S · Chennai, India
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ color: "#22d3ee", fontWeight: 700 }}
              >
                |
              </motion.span>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
}

export default Footer;