import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../data/animations";

// ─── Add to your index.html if not already present ───────────────────────────
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

const stats = [
  { value: "4+",  label: "Projects Built",   icon: "⚡", color: "#b57afb", glow: "rgba(181,122,251,0.25)" },
  { value: "12+",  label: "Technologies",     icon: "🛠",  color: "#1fd88a", glow: "rgba(31,216,138,0.25)"  },
  { value: "MCA", label: "Currently Pursuing", icon: "🎓", color: "#29d4f5", glow: "rgba(41,212,245,0.25)"  },
  { value: "8.1", label: "BCA CGPA",         icon: "🏆", color: "#ff8c42", glow: "rgba(255,140,66,0.25)"  },
];

const education = [
  {
    degree: "Master of Computer Applications",
    short: "MCA",
    institution: "Sathyabama University",
    status: "Pursuing",
    year: "2025 – 2027",
    color: "#b57afb",
    glow: "rgba(181,122,251,0.15)",
    border: "rgba(181,122,251,0.3)",
    icon: "🎓",
  },
  {
    degree: "Bachelor of Computer Applications",
    short: "BCA",
    institution: "Guru Nanak College",
    status: "Completed",
    year: "2022 – 2025",
    color: "#1fd88a",
    glow: "rgba(31,216,138,0.12)",
    border: "rgba(31,216,138,0.3)",
    icon: "📘",
    grade: "CGPA 8.1",
  },
];

const skills = [
  { label: "React / Next.js",  pct: 82, color: "#29d4f5" },
  { label: "Node.js / Express", pct: 80, color: "#1fd88a" },
  { label: "MongoDB / SQL",    pct: 82, color: "#b57afb" },
  { label: "Python / ML",      pct: 75, color: "#ff8c42" },
];

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ label, pct, color, delay }) {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.width = `${pct}%`;
          }, delay);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el.parentElement);
    return () => obs.disconnect();
  }, [pct, delay]);

  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "rgba(200,220,255,0.7)", letterSpacing: "0.5px" }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "11px", fontWeight: 700, color }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: "6px", borderRadius: "100px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "0%",
            borderRadius: "100px",
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 10px ${color}66`,
            transition: "width 1.1s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        background: "linear-gradient(145deg, #0d1520, #111d2e)",
        border: `1px solid ${stat.glow}`,
        borderRadius: "18px",
        padding: "24px 16px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        boxShadow: `0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "60px", height: "60px",
        background: `radial-gradient(circle at top right, ${stat.glow}, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ fontSize: "24px", marginBottom: "10px" }}>{stat.icon}</div>

      <div style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "clamp(22px, 3vw, 30px)",
        fontWeight: 900,
        color: stat.color,
        letterSpacing: "-0.5px",
        textShadow: `0 0 20px ${stat.glow}`,
        lineHeight: 1,
        marginBottom: "8px",
      }}>
        {stat.value}
      </div>

      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        color: "rgba(148,163,184,0.7)",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

// ─── Education card ───────────────────────────────────────────────────────────
function EduCard({ edu, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "linear-gradient(145deg, #0a1220, #0f1a2e)",
        border: `1px solid ${edu.border}`,
        borderRadius: "20px",
        padding: "28px",
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.02)`,
      }}
    >
      {/* Glow blob */}
      <div style={{
        position: "absolute", top: "-30px", right: "-30px",
        width: "120px", height: "120px", borderRadius: "50%",
        background: `radial-gradient(circle, ${edu.glow}, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Degree badge */}
          <div style={{
            width: "46px", height: "46px", borderRadius: "12px",
            background: `${edu.color}18`,
            border: `1px solid ${edu.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px", flexShrink: 0,
          }}>
            {edu.icon}
          </div>
          <div>
            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "13px", fontWeight: 900,
              color: edu.color, letterSpacing: "1px",
              marginBottom: "2px",
            }}>
              {edu.short}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px", color: "rgba(148,163,184,0.5)",
              letterSpacing: "1px",
            }}>
              {edu.year}
            </div>
          </div>
        </div>

        {/* Status pill */}
        <div style={{
          padding: "4px 12px", borderRadius: "100px",
          background: `${edu.color}18`,
          border: `1px solid ${edu.border}`,
          fontSize: "9px", fontFamily: "'JetBrains Mono', monospace",
          color: edu.color, letterSpacing: "1px",
          whiteSpace: "nowrap",
        }}>
          {edu.status}
        </div>
      </div>

      {/* Degree name */}
      <h4 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "17px", fontWeight: 700,
        color: "#e2eaf6", margin: "0 0 6px 0",
        lineHeight: 1.3,
      }}>
        {edu.degree}
      </h4>

      {/* Institution */}
      <p style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "11px",
        color: "rgba(148,163,184,0.6)",
        margin: 0,
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <span style={{ color: edu.color, opacity: 0.7 }}>▸</span>
        {edu.institution}
        {edu.grade && (
          <>
            <span style={{ color: "rgba(148,163,184,0.3)" }}>•</span>
            <span style={{ color: edu.color }}>{edu.grade}</span>
          </>
        )}
      </p>
    </motion.div>
  );
}

// ─── Main About component ─────────────────────────────────────────────────────
function About() {
  return (
    <>
      <style>{`
        @keyframes float-orb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <motion.section
        id="about"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          padding: "100px 0 80px",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "clamp(16px, 4vw, 48px)",
          paddingRight: "clamp(16px, 4vw, 48px)",
          position: "relative",
        }}
      >
        {/* ── Background decorations ── */}
        <div style={{
          position: "absolute", top: "0%", left: "-100px",
          width: "350px", height: "350px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(181,122,251,0.07) 0%, transparent 70%)",
          animation: "float-orb 8s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", bottom: "20%", right: "-80px",
          width: "280px", height: "280px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(41,212,245,0.06) 0%, transparent 70%)",
          animation: "float-orb 11s ease-in-out infinite reverse",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "64px", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px", letterSpacing: "4px",
            textTransform: "uppercase", color: "#29d4f5",
            marginBottom: "12px",
          }}>
            // get to know me
          </p>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 900, letterSpacing: "-1px",
            color: "#f1f5f9", margin: 0, lineHeight: 1.1,
          }}>
            About{" "}
            <span style={{ color: "#29d4f5", textShadow: "0 0 30px rgba(41,212,245,0.4)" }}>
              Me
            </span>
          </h2>
        </div>

        {/* ── Top section: Bio + Stats ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "48px",
          alignItems: "start",
          marginBottom: "72px",
          position: "relative", zIndex: 1,
        }}>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Terminal-style name card */}
            <div style={{
              background: "linear-gradient(145deg, #080e18, #0d1624)",
              border: "1px solid rgba(41,212,245,0.2)",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "28px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
            }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
                {["rgba(255,95,86,0.8)", "rgba(255,189,46,0.8)", "rgba(39,201,63,0.8)"].map((c, i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
                ))}
                <span style={{ marginLeft: "6px", color: "rgba(148,163,184,0.4)", fontSize: "10px" }}>
                  arun@portfolio ~ about.sh
                </span>
              </div>
              <div style={{ color: "rgba(148,163,184,0.5)" }}>
                <span style={{ color: "#1fd88a" }}>➤</span>
                <span style={{ color: "#29d4f5" }}> who am i</span>
              </div>
              <div style={{ color: "#f0e6ff", marginTop: "6px", lineHeight: 1.6 }}>
                Arun S — Full Stack Developer
                <span style={{
                  display: "inline-block", width: "8px", height: "14px",
                  background: "#29d4f5", marginLeft: "2px", verticalAlign: "middle",
                  animation: "blink-cursor 1s step-end infinite",
                }} />
              </div>
            </div>

            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 700, color: "#e2eaf6",
              margin: "0 0 18px 0", lineHeight: 1.3,
            }}>
              Full Stack Developer &amp;{" "}
              <span style={{ color: "#84fecb" }}>MCA Student</span>
            </h3>

            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "14px", lineHeight: 1.85,
              color: "rgba(148,163,184,0.8)", margin: "0 0 16px 0",
            }}>
              I'm Arun S, a Full Stack Developer and MCA student passionate about building modern web applications, scalable backend systems, and machine learning solutions. I enjoy solving real-world problems through clean code and innovative technology.
            </p>

            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "14px", lineHeight: 1.85,
              color: "rgba(148,163,184,0.8)", margin: "0 0 28px 0",
            }}>
              Currently pursuing MCA while levelling up my expertise in React, Node.js,
              MongoDB, Python, and Artificial Intelligence.
            </p>

            {/* Skill bars */}
            <div style={{
              background: "linear-gradient(145deg, #080e18, #0d1624)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "22px",
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px", letterSpacing: "2px",
                color: "rgba(148,163,184,0.4)", marginBottom: "18px",
                textTransform: "uppercase",
              }}>
                // core skills
              </p>
              {skills.map((s, i) => (
                <SkillBar key={s.label} {...s} delay={i * 150} />
              ))}
            </div>
          </motion.div>

          {/* Stats grid */}
          <div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px", letterSpacing: "2px",
              color: "rgba(148,163,184,0.4)", marginBottom: "18px",
              textTransform: "uppercase", textAlign: "right",
            }}>
              // by the numbers
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
            }}>
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>

            {/* Decorative ring */}
            <div style={{
              margin: "32px auto 0",
              width: "160px", height: "160px",
              position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg
                viewBox="0 0 160 160"
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  animation: "spin-slow 20s linear infinite",
                }}
              >
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(41,212,245,0.12)" strokeWidth="1" strokeDasharray="6 8" />
                <circle cx="80" cy="80" r="55" fill="none" stroke="rgba(181,122,251,0.08)" strokeWidth="1" strokeDasharray="3 12" />
              </svg>
              <div style={{
                width: "90px", height: "90px", borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(41,212,245,0.15), rgba(181,122,251,0.15))",
                border: "1px solid rgba(41,212,245,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column",
                boxShadow: "0 0 30px rgba(41,212,245,0.1)",
              }}>
                <span style={{ fontSize: "28px" }}>👨‍💻</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "8px", color: "rgba(41,212,245,0.7)",
                  letterSpacing: "1px", marginTop: "4px",
                }}>ARUN S</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Education Timeline ── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px", letterSpacing: "4px",
              textTransform: "uppercase", color: "#b57afb",
              marginBottom: "10px",
            }}>
              // academic path
            </p>
            <h3 style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(22px, 3.5vw, 36px)",
              fontWeight: 900, color: "#f1f5f9",
              margin: 0, letterSpacing: "-0.5px",
            }}>
              Education
            </h3>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}>
            {education.map((edu, i) => (
              <EduCard key={edu.degree} edu={edu} index={i} />
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default About;