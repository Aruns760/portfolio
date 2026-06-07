import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../../data/animations";

// ─── To enable real email sending, install EmailJS: ──────────────────────────
// npm install @emailjs/browser
// Then uncomment the emailjs lines below and add your credentials.
// import emailjs from "@emailjs/browser";

const contactInfo = [
  {
  icon: "✉",
  label: "Email",
  value: "arunajay9790@gmail.com",
  href: "mailto:arunajay9790@gmail.com",
  color: "#b57afb",
  glow: "rgba(181,122,251,0.18)",
  border: "rgba(181,122,251,0.28)",
  desc: "Open for internships & opportunities",
},
{
  icon: "📱",
  label: "Phone",
  value: "+91 76048 68815",
  href: "tel:+917604868815",
  color: "#1fd88a",
  glow: "rgba(31,216,138,0.15)",
  border: "rgba(31,216,138,0.28)",
  desc: "Available for calls & WhatsApp",
},
  {
    icon: "📍",
    label: "Location",
    value: "Chennai, Tamil Nadu, India",
    href: "https://maps.google.com/?q=Chennai,India",
    color: "#29d4f5",
    glow: "rgba(41,212,245,0.14)",
    border: "rgba(41,212,245,0.28)",
    desc: "Open to remote & hybrid",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/arun-s-8559952b3",
    href: "https://www.linkedin.com/in/arun-s-8559952b3",
    color: "#ff8c42",
    glow: "rgba(255,140,66,0.14)",
    border: "rgba(255,140,66,0.28)",
    desc: "Let's connect professionally",
  },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Aruns760",
    color: "#b57afb",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arun-s-8559952b3",
    color: "#29d4f5",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:arunajay9790@gmail.com",
    color: "#1fd88a",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

// ─── Input field ──────────────────────────────────────────────────────────────
function Field({ label, type = "text", name, placeholder, value, onChange, multiline, accent = "#29d4f5" }) {
  const [focused, setFocused] = useState(false);
  const Tag = multiline ? "textarea" : "input";

  return (
    <div style={{ position: "relative" }}>
      <label style={{
        display: "block",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: focused ? accent : "rgba(148,163,184,0.55)",
        marginBottom: "8px",
        transition: "color 0.2s",
      }}>
        {label}
      </label>
      <Tag
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={multiline ? 5 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        style={{
          width: "100%",
          background: focused ? "rgba(41,212,245,0.04)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${focused ? accent : "rgba(255,255,255,0.08)"}`,
          borderRadius: "12px",
          padding: "13px 16px",
          color: "#e2eaf6",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "13px",
          outline: "none",
          resize: multiline ? "vertical" : undefined,
          transition: "border 0.2s, background 0.2s, box-shadow 0.2s",
          boxShadow: focused ? `0 0 0 3px ${accent}18` : "none",
          boxSizing: "border-box",
          display: "block",
        }}
      />
    </div>
  );
}

// ─── Contact info card ────────────────────────────────────────────────────────
function InfoCard({ info, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={info.href}
      target={info.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "18px 20px",
        background: hovered
          ? `linear-gradient(135deg, ${info.glow}, rgba(255,255,255,0.02))`
          : "linear-gradient(145deg, #090f1c, #0d1526)",
        border: `1px solid ${hovered ? info.border : "rgba(255,255,255,0.06)"}`,
        borderRadius: "16px",
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
        boxShadow: hovered ? `0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px ${info.border}` : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Icon */}
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
        background: `${info.color}14`,
        border: `1px solid ${info.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "18px",
        transition: "transform 0.2s",
        transform: hovered ? "scale(1.1)" : "scale(1)",
      }}>
        {info.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px", letterSpacing: "2px",
          textTransform: "uppercase",
          color: info.color, marginBottom: "3px",
        }}>
          {info.label}
        </div>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "13px", fontWeight: 600,
          color: "#e2eaf6", marginBottom: "2px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {info.value}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px", color: "rgba(148,163,184,0.45)",
          letterSpacing: "0.5px",
        }}>
          {info.desc}
        </div>
      </div>

      {/* Arrow */}
      <div style={{
        color: info.color, opacity: hovered ? 1 : 0,
        transition: "opacity 0.2s, transform 0.2s",
        transform: hovered ? "translateX(0)" : "translateX(-6px)",
        fontSize: "16px", flexShrink: 0,
      }}>
        →
      </div>
    </motion.a>
  );
}

// ─── Main Contact ─────────────────────────────────────────────────────────────
function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // ── EmailJS integration (uncomment after installing @emailjs/browser) ──
    // try {
    //   await emailjs.sendForm(
    //     "YOUR_SERVICE_ID",
    //     "YOUR_TEMPLATE_ID",
    //     formRef.current,
    //     "YOUR_PUBLIC_KEY"
    //   );
    //   setStatus("success");
    //   setForm({ name: "", email: "", subject: "", message: "" });
    // } catch {
    //   setStatus("error");
    // }

    // ── Simulated response (remove once EmailJS is set up) ──
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1600);
  };

  return (
    <>
      <style>{`
        @keyframes spin-ring {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes float-blob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-16px); }
        }
      `}</style>

      <motion.section
        id="contact"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          padding: "10px 0 80px",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "clamp(16px, 4vw, 48px)",
          paddingRight: "clamp(16px, 4vw, 48px)",
          position: "relative",
        }}
      >
        {/* Background blobs */}
        <div style={{
          position: "absolute", top: "5%", right: "-60px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(41,212,245,0.06) 0%, transparent 70%)",
          animation: "float-blob 9s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-60px",
          width: "240px", height: "240px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(181,122,251,0.06) 0%, transparent 70%)",
          animation: "float-blob 12s ease-in-out infinite reverse",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px", letterSpacing: "4px",
            textTransform: "uppercase", color: "#29d4f5", marginBottom: "12px",
          }}>
            // get in touch
          </p>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 900, color: "#f1f5f9",
            letterSpacing: "-1px", margin: "0 0 16px 0", lineHeight: 1.1,
          }}>
            Contact{" "}
            <span style={{ color: "#29d4f5", textShadow: "0 0 30px rgba(41,212,245,0.4)" }}>Me</span>
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "14px", color: "rgba(148,163,184,0.65)",
            maxWidth: "480px", margin: "0 auto", lineHeight: 1.7,
          }}>
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>

          {/* Availability badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            marginTop: "20px", padding: "7px 18px", borderRadius: "100px",
            background: "rgba(31,216,138,0.08)", border: "1px solid rgba(31,216,138,0.25)",
          }}>
            <div style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#1fd88a",
              animation: "pulse-dot 1.6s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px", letterSpacing: "1.5px",
              color: "#1fd88a",
            }}>
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>
        </div>

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
          position: "relative", zIndex: 1,
        }}>

          {/* Left — contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px", letterSpacing: "2px",
              color: "rgba(148,163,184,0.4)", marginBottom: "6px",
              textTransform: "uppercase",
            }}>
              // reach me at
            </p>

            {contactInfo.map((info, i) => (
              <InfoCard key={info.label} info={info} index={i} />
            ))}

            {/* Socials row */}
            <div style={{ marginTop: "8px" }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px", letterSpacing: "2px",
                color: "rgba(148,163,184,0.4)", marginBottom: "12px",
                textTransform: "uppercase",
              }}>
                // find me online
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: `${s.color}12`,
                      border: `1px solid ${s.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: s.color, textDecoration: "none",
                      transition: "transform 0.2s, background 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.background = `${s.color}22`;
                      e.currentTarget.style.boxShadow = `0 8px 20px ${s.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.background = `${s.color}12`;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: "linear-gradient(145deg, #080e1a, #0c1422)",
              border: "1px solid rgba(41,212,245,0.14)",
              borderRadius: "22px",
              padding: "32px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Corner glow */}
            <div style={{
              position: "absolute", top: "-40px", right: "-40px",
              width: "160px", height: "160px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(41,212,245,0.08), transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Form header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "rgba(41,212,245,0.12)", border: "1px solid rgba(41,212,245,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px",
              }}>💬</div>
              <div>
                <div style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "14px", fontWeight: 900, color: "#e2eaf6",
                }}>
                  Send a Message
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px", color: "rgba(148,163,184,0.4)",
                  letterSpacing: "1px",
                }}>
                  // I'll respond within 24 hours
                </div>
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <Field label="Name" name="name" placeholder="Arun S" value={form.name} onChange={handleChange} />
                <Field label="Email" type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} />
              </div>
              <Field label="Subject" name="subject" placeholder="Project inquiry..." value={form.subject} onChange={handleChange} />
              <Field label="Message" name="message" placeholder="Tell me about your project..." value={form.message} onChange={handleChange} multiline />

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "13px",
                  border: "none",
                  background: status === "success"
                    ? "linear-gradient(135deg, #1fd88a, #0fb870)"
                    : status === "error"
                    ? "linear-gradient(135deg, #ff4444, #cc2222)"
                    : "linear-gradient(135deg, #29d4f5, #1ab8d8)",
                  color: status === "success" ? "#001a10" : "#030d14",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  cursor: status === "sending" || status === "success" ? "not-allowed" : "pointer",
                  transition: "transform 0.15s, box-shadow 0.15s, background 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 20px rgba(41,212,245,0.25)",
                }}
                onMouseEnter={(e) => {
                  if (status === "idle") {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(41,212,245,0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(41,212,245,0.25)";
                }}
              >
                {status === "sending" && (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin-ring 0.8s linear infinite" }}>
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Sending...
                  </>
                )}
                {status === "success" && <>✓ Message Sent!</>}
                {status === "error" && <>✗ Failed — Try Again</>}
                {status === "idle" && (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              {/* Success message */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{
                      textAlign: "center",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      color: "#1fd88a",
                      letterSpacing: "1px",
                      padding: "10px",
                      borderRadius: "10px",
                      background: "rgba(31,216,138,0.08)",
                      border: "1px solid rgba(31,216,138,0.2)",
                    }}
                  >
                    🚀 Thanks! I'll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}

export default Contact;