import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "../../data/animations";
import chatbotResponses from "../../data/chatbotData";

// ─────────────────────────────────────────────────────────────────────────────
// now() MUST be outside the component — used during useState initialisation
// ─────────────────────────────────────────────────────────────────────────────
function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Response resolver ────────────────────────────────────────────────────────
function getResponse(raw) {
  const t = raw.toLowerCase().trim();

  if (t.includes("who") || t.includes("about") || t.includes("arun"))
    return chatbotResponses.about;

  if (
    t.includes("personal") ||
    t.includes("native") ||
    t.includes("language") ||
    t.includes("location") ||
    t.includes("born") ||
    t.includes("dob") ||
    t.includes("nationality")
  )
    return chatbotResponses.personal;

  if (
    t.includes("education") ||
    t.includes("study") ||
    t.includes("college") ||
    t.includes("school") ||
    t.includes("mca") ||
    t.includes("bca") ||
    t.includes("sathyabama") ||
    t.includes("guru nanak")
  )
    return chatbotResponses.education;

  if (
    t.includes("skill") ||
    t.includes("technology") ||
    t.includes("tech") ||
    t.includes("stack") ||
    t.includes("know") ||
    t.includes("language")
  )
    return chatbotResponses.skills;

  if (
    t.includes("project") ||
    t.includes("built") ||
    t.includes("portfolio") ||
    t.includes("app") ||
    t.includes("build")
  )
    return chatbotResponses.projects;

  if (t.includes("furniture") || t.includes("furnituremart") || t.includes("ecommerce"))
    return chatbotResponses.furnituremart;

  if (
    t.includes("level up") ||
    t.includes("levelup") ||
    t.includes("level-up") ||
    t.includes("nexus")
  )
    return chatbotResponses.levelup;

  if (
    t.includes("internship") ||
    t.includes("experience") ||
    t.includes("intern") ||
    t.includes("job") ||
    t.includes("work")
  )
    return chatbotResponses.internship;

  if (
    t.includes("certificate") ||
    t.includes("certification") ||
    t.includes("certified") ||
    t.includes("course")
  )
    return chatbotResponses.certifications;

  if (
    t.includes("learn") ||
    t.includes("learning") ||
    t.includes("how do you") ||
    t.includes("study")
  )
    return chatbotResponses.learning;

  if (
    t.includes("goal") ||
    t.includes("future") ||
    t.includes("plan") ||
    t.includes("aspir") ||
    t.includes("dream")
  )
    return chatbotResponses.goals;

  if (
    t.includes("strength") ||
    t.includes("strong") ||
    t.includes("best at") ||
    t.includes("good at")
  )
    return chatbotResponses.strengths;

  if (
    t.includes("contact") ||
    t.includes("email") ||
    t.includes("phone") ||
    t.includes("reach") ||
    t.includes("gmail") ||
    t.includes("number")
  )
    return chatbotResponses.contact;

  if (
    t.includes("hire") ||
    t.includes("why should") ||
    t.includes("why hire") ||
    t.includes("recruit")
  )
    return chatbotResponses.hire;

  if (t.includes("github") || t.includes("git hub") || t.includes("repo"))
    return "🐙 GitHub Profile:\nhttps://github.com/Aruns760\n\nYou can find all of Arun's open source projects and code repositories there!";

  if (t.includes("resume") || t.includes("cv") || t.includes("curriculum"))
    return "📄 Resume\n\nYou can view or download Arun's resume using the Resume buttons in the Hero section at the top of the page.";

  if (t.includes("react") || t.includes("reactjs"))
    return "⚛️ React.js\n\nArun builds modern, responsive UIs using React, Vite, Next.js, and Tailwind CSS — enhanced with animation libraries like Framer Motion.";

  if (t.includes("node") || t.includes("nodejs") || t.includes("express"))
    return "🟢 Node.js & Express.js\n\nArun uses Node.js and Express.js for backend development — building REST APIs, JWT authentication systems, and server-side logic.";

  if (t.includes("mongodb") || t.includes("mongo") || t.includes("database") || t.includes("db"))
    return "🍃 MongoDB\n\nArun has hands-on experience with MongoDB, MongoDB Atlas, and database schema design — used in both FurnitureMart and LEVEL UP projects.";

  if (
    t.includes("machine learning") ||
    t.includes("ml") ||
    t.includes("ai") ||
    t.includes("artificial intelligence") ||
    t.includes("scikit") ||
    t.includes("pandas")
  )
    return "🤖 Machine Learning & AI\n\nArun has built ML projects including an RF Prediction & Monitoring System using Scikit-Learn, Streamlit, Pandas, and MongoDB Atlas. He also completed an ML internship at Retech Solutions Pvt. Ltd.";

  if (t.includes("python"))
    return "🐍 Python\n\nArun uses Python for machine learning, data analysis, and automation — working with libraries like Scikit-Learn, Pandas, NumPy, and Streamlit.";

  if (t.includes("tenkasi") || t.includes("chennai") || t.includes("tamil") || t.includes("india"))
    return "📍 Location\n\nArun is originally from Tenkasi, Tamil Nadu, India. He is currently based in Chennai, Tamil Nadu, studying MCA at Sathyabama Institute of Science and Technology.";

  if (t.includes("hello") || t.includes("hi") || t.includes("hey") || t.includes("greet"))
    return "👋 Hello there!\n\nI'm Arun's assistant. Ask me anything about Arun's skills, projects, education, or career journey. What would you like to know?";

  if (t.includes("thank") || t.includes("thanks") || t.includes("ty"))
    return "😊 You're welcome!\n\nFeel free to ask anything else about Arun. I'm here to help!";

  if (t.includes("age") || t.includes("old") || t.includes("year"))
    return "🎂 Age\n\nArun was born on 03 December 2004, making him 20 years old. He's a young and driven developer building his career in full-stack development and AI.";

  // ── Fallback help message
  return null;
}

const HELP_TEXT = `🤖 I can answer questions about:

👤  Who is Arun / About
🎓  Education & College
💻  Skills & Technologies
🚀  Projects & Portfolio
🛒  FurnitureMart App
🎮  LEVEL UP Platform
💼  Internship & Experience
🏆  Certifications
📚  Learning Journey
🎯  Career Goals
⭐  Strengths
📞  Contact Info
📄  Resume / CV
🐙  GitHub Profile
🤖  AI / ML & Python

Try asking: "What are his skills?" or "Tell me about FurnitureMart"`;

// ─── Quick chips ──────────────────────────────────────────────────────────────
const CHIPS = [
  { label: "About",         emoji: "👤", q: "Who is Arun?" },
  { label: "Skills",        emoji: "💻", q: "What are his skills?" },
  { label: "Projects",      emoji: "🚀", q: "Tell me about his projects" },
  { label: "Education",     emoji: "🎓", q: "Education background" },
  { label: "Internship",    emoji: "💼", q: "Internship experience" },
  { label: "Certificates",  emoji: "🏆", q: "Certifications" },
  { label: "Goals",         emoji: "🎯", q: "Career goals" },
  { label: "Contact",       emoji: "📞", q: "Contact details" },
  { label: "GitHub",        emoji: "🐙", q: "GitHub profile" },
  { label: "Resume",        emoji: "📄", q: "View resume" },
  { label: "FurnitureMart", emoji: "🛒", q: "Tell me about FurnitureMart" },
  { label: "LEVEL UP",      emoji: "🎮", q: "Tell me about LEVEL UP" },
  { label: "AI / ML",       emoji: "🤖", q: "Machine learning projects" },
  { label: "Personal",      emoji: "🧑", q: "Personal details" },
];

// ─── Typing dots ──────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 2px" }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22d3ee" }}
        />
      ))}
    </div>
  );
}

// ─── Chat bubble ─────────────────────────────────────────────────────────────
function Bubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: "10px",
        marginBottom: "16px",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "15px",
          background: isUser
            ? "linear-gradient(135deg, #0891b2, #7c3aed)"
            : "linear-gradient(135deg, #0f172a, #1e293b)",
          border: isUser ? "none" : "1px solid rgba(34,211,238,0.35)",
          boxShadow: isUser ? "none" : "0 0 12px rgba(34,211,238,0.2)",
        }}
      >
        {isUser ? "🧑" : "🤖"}
      </div>

      {/* Bubble */}
      <div
        style={{
          maxWidth: "74%",
          padding: "13px 16px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser
            ? "linear-gradient(135deg, rgba(8,145,178,0.28), rgba(124,58,237,0.28))"
            : "rgba(0,0,0,0.32)",
          border: isUser
            ? "1px solid rgba(34,211,238,0.3)"
            : "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(10px)",
          boxShadow: isUser ? "0 4px 20px rgba(34,211,238,0.08)" : "none",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "13.5px",
            lineHeight: 1.8,
            color: isUser ? "#e2e8f0" : "#cbd5e1",
            margin: 0,
            whiteSpace: "pre-line",
          }}
        >
          {msg.text}
        </p>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            color: "rgba(148,163,184,0.35)",
            marginTop: "6px",
            textAlign: isUser ? "right" : "left",
          }}
        >
          {msg.time}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "bot",
      text: "Hey! 👋 I'm Arun's assistant.\n\nAsk me anything about Arun — his skills, projects, education, or career journey.\n\nOr tap a chip below to get started!",
      time: now(),   // ✅ safe — now() is defined outside component
    },
  ]);
  const [input, setInput]       = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);
  const msgId     = useRef(1);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Core send function ─────────────────────────────────────────────────────
  const sendMessage = useCallback(
    (textArg) => {
      // textArg is provided when a chip is clicked
      // otherwise fall back to the input field value
      const q = (textArg !== undefined ? textArg : input).trim();
      if (!q || isTyping) return;

      // Clear input immediately
      setInput("");

      // Add user bubble
      const userMsg = { id: msgId.current++, role: "user", text: q, time: now() };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      // Resolve response
      const response = getResponse(q) ?? HELP_TEXT;

      // Delay proportional to response length (feels natural)
      const delay = Math.min(2000, Math.max(700, response.length * 12));

      setTimeout(() => {
        setIsTyping(false);
        const botMsg = { id: msgId.current++, role: "bot", text: response, time: now() };
        setMessages((prev) => [...prev, botMsg]);
      }, delay);
    },
    [input, isTyping]
  );

  const handleChip    = (chip) => sendMessage(chip.q);   // ✅ passes text directly
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();   // no arg → reads from `input` state
    }
  };

  const clearChat = () => {
    msgId.current++;
    setMessages([{
      id: msgId.current++,
      role: "bot",
      text: "Chat cleared! 🔄\n\nAsk me anything about Arun.",
      time: now(),
    }]);
  };

  return (
    <>
      <style>{`
        .aichat-scroll::-webkit-scrollbar        { width: 4px; }
        .aichat-scroll::-webkit-scrollbar-track  { background: transparent; }
        .aichat-scroll::-webkit-scrollbar-thumb  { background: rgba(34,211,238,0.2); border-radius: 2px; }
        .chips-row::-webkit-scrollbar            { height: 0; }
        .ac-input::placeholder                   { color: rgba(148,163,184,0.4); }
        .ac-input:focus                          { outline: none; }
        @keyframes onlinePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

      <motion.section
        id="assistant"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 24px 80px" }}
      >
        {/* ── Section header ── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
            // ai assistant
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(26px, 4vw, 46px)",
              fontWeight: 900,
              color: "#f1f5f9",
              letterSpacing: "-1px",
              margin: "0 0 14px",
              lineHeight: 1.1,
            }}
          >
            Ask{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #22d3ee, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Arun's ASSIST
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
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Ask anything about Arun's skills, projects, education, or career journey.
          </motion.p>
        </div>

        {/* ── Chat box ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            background: "rgba(4,13,24,0.75)",
            border: "1px solid rgba(34,211,238,0.15)",
            borderRadius: "24px",
            overflow: "hidden",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 80px rgba(34,211,238,0.06), 0 32px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* ── Top chrome bar ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              background: "rgba(0,0,0,0.35)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* macOS dots */}
              <div style={{ display: "flex", gap: "6px" }}>
                {["rgba(255,95,86,0.85)", "rgba(255,189,46,0.85)", "rgba(39,201,63,0.85)"].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
              </div>

              <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.08)" }} />

              {/* Bot identity */}
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(167,139,250,0.2))",
                    border: "1px solid rgba(34,211,238,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                  }}
                >
                  🤖
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#e2e8f0",
                      letterSpacing: "0.5px",
                    }}
                  >
                    ARUN'S ASSIST
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 6px #22c55e",
                        animation: "onlinePulse 2s ease infinite",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "9px",
                        color: "#22c55e",
                        letterSpacing: "0.5px",
                      }}
                    >
                      online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clear chat */}
            <button
              onClick={clearChat}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(148,163,184,0.6)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239,68,68,0.12)";
                e.currentTarget.style.color = "#f87171";
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                e.currentTarget.style.color = "rgba(148,163,184,0.6)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              clear chat
            </button>
          </div>

          {/* ── Chip row ── */}
          <div
            className="chips-row"
            style={{
              display: "flex",
              gap: "8px",
              padding: "12px 20px",
              overflowX: "auto",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              scrollbarWidth: "none",
            }}
          >
            {CHIPS.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleChip(chip)}
                style={{
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "6px 13px",
                  borderRadius: "100px",
                  border: "1px solid rgba(34,211,238,0.2)",
                  background: "rgba(34,211,238,0.05)",
                  color: "#94a3b8",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "11.5px",
                  fontWeight: 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(34,211,238,0.14)";
                  e.currentTarget.style.color = "#22d3ee";
                  e.currentTarget.style.borderColor = "rgba(34,211,238,0.45)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(34,211,238,0.05)";
                  e.currentTarget.style.color = "#94a3b8";
                  e.currentTarget.style.borderColor = "rgba(34,211,238,0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>{chip.emoji}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          {/* ── Messages area ── */}
          <div
            className="aichat-scroll"
            style={{ height: "400px", overflowY: "auto", padding: "24px 20px 8px" }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <Bubble key={msg.id} msg={msg} />
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #0f172a, #1e293b)",
                      border: "1px solid rgba(34,211,238,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>
                  <div
                    style={{
                      padding: "13px 16px",
                      borderRadius: "18px 18px 18px 4px",
                      background: "rgba(0,0,0,0.32)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={bottomRef} />
          </div>

          {/* ── Input row ── */}
          <div
            style={{
              padding: "14px 20px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(0,0,0,0.22)",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <input
              ref={inputRef}
              className="ac-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about skills, projects, education, goals..."
              style={{
                flex: 1,
                padding: "13px 16px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(34,211,238,0.2)",
                color: "#e2e8f0",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "14px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(34,211,238,0.55)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,211,238,0.08)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(34,211,238,0.2)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />

            {/* Send button */}
            <button
              onClick={() => sendMessage()}
              disabled={isTyping || !input.trim()}
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "12px",
                flexShrink: 0,
                background:
                  isTyping || !input.trim()
                    ? "rgba(34,211,238,0.07)"
                    : "linear-gradient(135deg, #0891b2, #7c3aed)",
                border: "1px solid rgba(34,211,238,0.25)",
                color: isTyping || !input.trim() ? "rgba(34,211,238,0.3)" : "#fff",
                cursor: isTyping || !input.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                boxShadow:
                  isTyping || !input.trim()
                    ? "none"
                    : "0 4px 16px rgba(34,211,238,0.25)",
              }}
              onMouseEnter={(e) => {
                if (!isTyping && input.trim()) e.currentTarget.style.transform = "scale(1.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Footer tag */}
        <p
          style={{
            textAlign: "center",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            letterSpacing: "1.5px",
            color: "hsla(0, 23%, 92%, 0.25)",
            marginTop: "18px",
          }}
        >
          local keyword bot · instant responses · no external API
        </p>
      </motion.section>
    </>
  );
}

export default AIChat;