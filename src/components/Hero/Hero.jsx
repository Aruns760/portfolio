import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fadeUp } from "../../data/animations";
import arunImg from "../../assets/images/arun.png";
import arunImg2 from "../../assets/images/arun2.png"; // ← add your second photo here

// ── Add to public/index.html <head> ──────────────────────────────────────────
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

// ─── Particle canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H, particles = [];

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * (W || 1000), y: Math.random() * (H || 1000),
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.45 + 0.08,
        hue: Math.random() > 0.5 ? 185 : 265,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${particles[i].hue},80%,60%,${0.1 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,70%,${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0,
      width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0,
    }} />
  );
}

// ─── Animated counter card ────────────────────────────────────────────────────
function StatCard({ value, label, accent, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        const end = parseInt(value);
        const dur = 1400;
        const step = Math.max(1, Math.floor(dur / end));
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + 1, end);
          setCount(cur);
          if (cur >= end) clearInterval(t);
        }, step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "14px 18px", borderRadius: "14px",
      border: `1px solid ${accent}35`,
      background: `linear-gradient(145deg, ${accent}0a, ${accent}04)`,
      backdropFilter: "blur(12px)",
      minWidth: "76px", position: "relative", overflow: "hidden",
      boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 ${accent}15`,
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "40px", height: "40px",
        background: `radial-gradient(circle at top right, ${accent}18, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <span style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "22px", fontWeight: 900,
        color: accent, lineHeight: 1,
        textShadow: `0 0 20px ${accent}60`,
      }}>
        {count}{suffix}
      </span>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "8.5px", letterSpacing: "1.5px",
        color: "rgba(148,163,184,0.6)",
        textTransform: "uppercase", marginTop: "5px", textAlign: "center",
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── Terminal bio block ───────────────────────────────────────────────────────
function TerminalBio() {
  const lines = [
    { label: "role",     value: "Full Stack Developer & MCA Student",       color: "#67e8f9" },
    { label: "stack",    value: "React · Node.js · MongoDB · PostgreSQL",    color: "#a78bfa" },
    { label: "learning", value: "AI · Machine Learning · Full Stack",         color: "#fb923c" },
    { label: "status",   value: "Open to internships & opportunities",        color: "#4ade80" },
  ];
  return (
    <div style={{
      padding: "16px 18px", borderRadius: "14px",
      background: "rgba(0,0,0,0.4)",
      border: "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(14px)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
        {["rgba(255,95,86,0.8)", "rgba(255,189,46,0.8)", "rgba(39,201,63,0.8)"].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
        ))}
        <span style={{
          marginLeft: "6px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "9px", color: "rgba(148,163,184,0.35)", letterSpacing: "1px",
        }}>
          arun@portfolio ~ info.sh
        </span>
      </div>
      {lines.map((l, i) => (
        <motion.div
          key={l.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 + i * 0.14, duration: 0.4 }}
          style={{
            display: "flex", gap: "10px", alignItems: "baseline",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px", lineHeight: "1.95",
          }}
        >
          <span style={{ color: "rgba(34,211,238,0.4)", userSelect: "none" }}>$</span>
          <span style={{ color: "rgba(148,163,184,0.5)", flexShrink: 0 }}>{l.label}:</span>
          <span style={{ color: l.color }}>{l.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Coin Flip Photo Frame ────────────────────────────────────────────────────
function CoinPhotoFrame() {
  const [flipped, setFlipped]       = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const frameRef = useRef(null);

  // 3D tilt on mouse move (only when not flipping)
  const rotX = useSpring(useMotionValue(0), { stiffness: 100, damping: 18 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 100, damping: 18 });
  const glowX = useTransform(rotY, [-15, 15], ["0%", "100%"]);
  const glowY = useTransform(rotX, [-15, 15], ["0%", "100%"]);

  const onMove = (e) => {
    if (isFlipping) return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    rotX.set(((e.clientY - cy) / (rect.height / 2)) * -10);
    rotY.set(((e.clientX - cx) / (rect.width  / 2)) *  10);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };

  // Coin flip trigger
  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    rotX.set(0);
    rotY.set(0);
    setTimeout(() => {
      setFlipped((f) => !f);
      setIsFlipping(false);
    }, 700); // halfway through flip animation
  };

  // The Y rotation drives the flip: 0 → front, 180 → back (or 360 → front again)
  const coinRotateY = useSpring(useMotionValue(flipped ? 180 : 0), {
    stiffness: 60,
    damping: 16,
  });

  useEffect(() => {
    coinRotateY.set(flipped ? 180 : 0);
  }, [flipped]);                          // eslint-disable-line

  return (
    <motion.div
      ref={frameRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rotX, transformStyle: "preserve-3d", perspective: 900 }}
      className="hero-float"
    >
      <div style={{
        position: "relative", width: "340px", height: "340px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>

        {/* ── Orbit rings (unchanged from original) ── */}
        <div style={{
          position: "absolute", inset: "-28px", borderRadius: "50%",
          border: "1px solid rgba(34,211,238,0.15)",
          animation: "heroSpinRing 22s linear infinite reverse",
        }} />
        <div style={{
          position: "absolute", inset: "-14px", borderRadius: "50%",
          border: "2px dashed rgba(167,139,250,0.25)",
          animation: "heroSpinRing 14s linear infinite",
        }} />
        {/* Orbit dot cyan */}
        <div style={{
          position: "absolute", inset: "-16px", borderRadius: "50%",
          animation: "heroSpinRing 5s linear infinite",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: 0,
            transform: "translate(-50%, -50%)",
            width: "12px", height: "12px", borderRadius: "50%",
            background: "#22d3ee",
            boxShadow: "0 0 18px 4px rgba(34,211,238,0.7)",
          }} />
        </div>
        {/* Orbit dot purple */}
        <div style={{
          position: "absolute", inset: "-16px", borderRadius: "50%",
          animation: "heroSpinRing 7s linear infinite reverse",
        }}>
          <div style={{
            position: "absolute", bottom: "0%", right: "12%",
            transform: "translate(50%, 50%)",
            width: "9px", height: "9px", borderRadius: "50%",
            background: "#a78bfa",
            boxShadow: "0 0 14px 3px rgba(167,139,250,0.7)",
          }} />
        </div>

        {/* Dynamic tilt glow */}
        <motion.div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(34,211,238,0.22) 0%, transparent 70%)`,
          filter: "blur(18px)", pointerEvents: "none",
        }} />

        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 65%)",
          filter: "blur(24px)", pointerEvents: "none",
        }} />

        {/* ─────────────────────────────────────────────────────────────────
            COIN — the whole flip wrapper
        ───────────────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            position: "relative", zIndex: 1,
            width: "300px", height: "300px",
            transformStyle: "preserve-3d",
            rotateY: coinRotateY,
            cursor: isFlipping ? "wait" : "pointer",
          }}
          onClick={handleFlip}
          title="Click to flip"
        >
          {/* ── FRONT FACE (your main photo) ── */}
          <div style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "50%",
            border: "2.5px solid rgba(34,211,238,0.55)",
            boxShadow: `
              0 0 0 6px rgba(34,211,238,0.08),
              0 0 40px rgba(34,211,238,0.22),
              0 0 80px rgba(34,211,238,0.08),
              inset 0 0 30px rgba(34,211,238,0.05)
            `,
            overflow: "hidden",
            background: "linear-gradient(145deg, #0a1628, #071220)",
          }}>
            <img
              src={arunImg}
              alt="Arun S"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                display: "block",
                filter: "contrast(1.05) saturate(1.1) brightness(1.02)",
              }}
            />
            {/* Holographic overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(160deg, rgba(34,211,238,0.10) 0%, transparent 40%, rgba(167,139,250,0.08) 80%, transparent 100%)`,
              mixBlendMode: "screen", pointerEvents: "none",
            }} />
            {/* Scanlines */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0px, rgba(0,0,0,0.07) 1px, transparent 1px, transparent 3px)",
            }} />
            {/* Scan sweep */}
            <div style={{
              position: "absolute", left: 0, right: 0, height: "3px",
              background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.6), transparent)",
              animation: "heroScan 3s linear infinite",
              opacity: 0.6, pointerEvents: "none",
            }} />
            {/* Bottom fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
              background: "linear-gradient(to top, rgba(4,10,20,0.85), transparent)",
              pointerEvents: "none",
            }} />

            {/* Flip hint label — only on front, disappears after first flip */}
            {!flipped && (
              <div style={{
                position: "absolute", top: "12px", left: "50%",
                transform: "translateX(-50%)",
                padding: "4px 12px", borderRadius: "100px",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(34,211,238,0.3)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px", color: "rgba(34,211,238,0.8)",
                letterSpacing: "1px", whiteSpace: "nowrap",
                pointerEvents: "none",
                animation: "coinHintPulse 2.5s ease infinite",
              }}>
                ↻ click to flip
              </div>
            )}
          </div>

          {/* ── COIN EDGE (metallic rim visible mid-flip) ── */}
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            background: "linear-gradient(180deg, #1a3a4a, #0a1220, #1a3a4a)",
            transform: "translateZ(-1px) scaleX(0.02)",
            pointerEvents: "none",
          }} />

          {/* ── BACK FACE (second photo / alternate look) ── */}
          <div style={{
            position: "absolute", inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "50%",
            border: "2.5px solid rgba(167,139,250,0.55)",
            boxShadow: `
              0 0 0 6px rgba(167,139,250,0.08),
              0 0 40px rgba(167,139,250,0.22),
              0 0 80px rgba(167,139,250,0.08),
              inset 0 0 30px rgba(167,139,250,0.05)
            `,
            overflow: "hidden",
            background: "linear-gradient(145deg, #160a28, #0e0718)",
          }}>
            <img
              src={arunImg2}
              alt="Arun S"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                display: "block",
                filter: "contrast(1.05) saturate(1.1) brightness(1.02)",
              }}
            />
            {/* Purple holographic overlay on back */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(160deg, rgba(167,139,250,0.12) 0%, transparent 40%, rgba(244,114,182,0.08) 80%, transparent 100%)`,
              mixBlendMode: "screen", pointerEvents: "none",
            }} />
            {/* Scanlines */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0px, rgba(0,0,0,0.07) 1px, transparent 1px, transparent 3px)",
            }} />
            {/* Purple scan sweep */}
            <div style={{
              position: "absolute", left: 0, right: 0, height: "3px",
              background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)",
              animation: "heroScan 2.5s linear infinite",
              opacity: 0.6, pointerEvents: "none",
            }} />
            {/* Bottom fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
              background: "linear-gradient(to top, rgba(10,4,22,0.85), transparent)",
              pointerEvents: "none",
            }} />
            {/* Flip-back hint */}
            <div style={{
              position: "absolute", top: "12px", left: "50%",
              transform: "translateX(-50%)",
              padding: "4px 12px", borderRadius: "100px",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(167,139,250,0.3)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px", color: "rgba(167,139,250,0.8)",
              letterSpacing: "1px", whiteSpace: "nowrap",
              pointerEvents: "none",
            }}>
              ↺ click to flip back
            </div>
          </div>
        </motion.div>
        {/* ── end coin ── */}

        {/* ── Available badge ── */}
        <div style={{
          position: "absolute", bottom: "16px", right: "4px", zIndex: 3,
          display: "flex", alignItems: "center", gap: "7px",
          padding: "6px 14px", borderRadius: "100px",
          background: "rgba(0,18,10,0.88)",
          border: "1px solid rgba(34,197,94,0.45)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 0 18px rgba(34,197,94,0.25), inset 0 1px 0 rgba(34,197,94,0.1)",
        }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#22c55e", display: "block",
            boxShadow: "0 0 8px #22c55e",
            animation: "heroPulse 1.8s ease infinite",
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9.5px", color: "#22c55e", letterSpacing: "0.8px",
          }}>
            Available for Work
          </span>
        </div>

        {/* ── Floating tech chips ── */}
        {[
          { label: "React",   color: "#61dafb", top: "-8px",  left: "30px",   delay: "0s" },
          { label: "Node.js", color: "#68a063", top: "20px",  right: "-20px", delay: "0.4s" },
          { label: "MongoDB", color: "#4db33d", bottom: "40px", left: "-28px", delay: "0.8s" },
          { label: "Python",  color: "#ffd43b", bottom: "-4px", left: "80px",  delay: "1.2s" },
        ].map((chip) => (
          <div key={chip.label} style={{
            position: "absolute",
            top: chip.top, bottom: chip.bottom,
            left: chip.left, right: chip.right,
            padding: "4px 10px", borderRadius: "100px",
            background: "rgba(4,13,24,0.85)",
            border: `1px solid ${chip.color}50`,
            backdropFilter: "blur(10px)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px", color: chip.color,
            letterSpacing: "0.5px", whiteSpace: "nowrap",
            boxShadow: `0 0 10px ${chip.color}25`,
            animation: `heroFloat 4s ease-in-out infinite ${chip.delay}`,
            zIndex: 4,
          }}>
            {chip.label}
          </div>
        ))}

        {/* ── Flip indicator dots (like face A / face B) ── */}
        <div style={{
          position: "absolute", bottom: "-30px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: "8px", alignItems: "center",
          zIndex: 4,
        }}>
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: !flipped ? "#22d3ee" : "rgba(255,255,255,0.15)",
            boxShadow: !flipped ? "0 0 8px #22d3ee" : "none",
            transition: "all 0.4s",
          }} />
          <div style={{
            width: "8px", height: "8px", borderRadius: "50%",
            background: flipped ? "#a78bfa" : "rgba(255,255,255,0.15)",
            boxShadow: flipped ? "0 0 8px #a78bfa" : "none",
            transition: "all 0.4s",
          }} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <>
      <style>{`
        @keyframes heroSpinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes heroPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.55; transform: scale(1.4); }
        }
        @keyframes heroFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes heroScan {
          0%   { top: -3px; }
          100% { top: 103%; }
        }
        @keyframes heroGradShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes coinHintPulse {
          0%,100% { opacity: 0.8; }
          50%      { opacity: 0.3; }
        }
        .hero-float { animation: heroFloat 5.5s ease-in-out infinite; }
        .hero-gradient-text {
          background: linear-gradient(90deg, #22d3ee, #a78bfa, #f472b6, #22d3ee);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: heroGradShift 7s ease infinite;
        }
        .hero-btn {
          position: relative; overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .hero-btn::after {
          content: '';
          position: absolute; top: 0; left: -120%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
        }
        .hero-btn:hover::after { left: 160%; }
        .hero-btn:hover { transform: translateY(-3px); }
        .hero-grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px);
          background-size: 56px 56px;
        }
      `}</style>

      <section id="home" style={{
        position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 clamp(16px, 4vw, 40px)",
        overflow: "hidden",
        background: "linear-gradient(155deg, #020817 0%, #040d1a 45%, #05091a 100%)",
      }}>
        <ParticleCanvas />
        <div className="hero-grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />

        <div style={{ position: "absolute", top: "8%",   left: "3%",  width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)",  pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "8%", right: "3%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "50%", left: "40%", transform: "translate(-50%,-50%)", width: "700px", height: "350px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

        {/* ── Main grid ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            maxWidth: "1240px", width: "100%", margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
            position: "relative", zIndex: 1,
            paddingTop: "80px", paddingBottom: "60px",
          }}
        >
          {/* ── LEFT ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ease: [0.22,1,0.36,1] }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 16px", borderRadius: "100px",
                border: "1px solid rgba(34,211,238,0.28)",
                background: "rgba(34,211,238,0.06)",
                backdropFilter: "blur(10px)", marginBottom: "22px",
              }}
            >
              <span style={{ fontSize: "13px" }}>👋</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", letterSpacing: "2.5px", color: "#67e8f9", textTransform: "uppercase" }}>
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, ease: [0.22,1,0.36,1] }}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(15px, 2vw, 22px)", fontWeight: 700,
                color: "rgba(148,163,184,0.7)",
                margin: "0 0 4px 0", letterSpacing: "4px", textTransform: "uppercase",
              }}
            >
              Hi, I'm
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, ease: [0.22,1,0.36,1] }}
              className="hero-gradient-text"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 900,
                lineHeight: 1.0, letterSpacing: "-1px", margin: "0 0 20px 0",
              }}
            >
              Arun S
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px", minHeight: "36px" }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#22d3ee", letterSpacing: "1px", flexShrink: 0 }}>
                &gt;_
              </span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(16px, 2.2vw, 22px)", fontWeight: 600, color: "#cbd5e1" }}>
                <TypeAnimation
                  sequence={["Full Stack Developer", 2200, "MCA Student", 2000, "AI / ML Enthusiast", 2000, "React Developer", 2000, "Node.js Developer", 2000]}
                  wrapper="span" speed={54} repeat={Infinity}
                />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{ color: "#94a3b8", fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.85, maxWidth: "560px", marginBottom: "26px", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Passionate about building modern web applications, full-stack systems,
              machine learning solutions, and interactive user experiences that solve real‑world problems.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} style={{ marginBottom: "26px" }}>
              <TerminalBio />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.82 }} style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "30px" }}>
              <StatCard value="4"  label="Projects"     accent="#22d3ee" />
              <StatCard value="12" label="Technologies" accent="#a78bfa" />
              <StatCard value="8"  label="Certificates" accent="#f472b6" />
              <StatCard value="81" label="BCA %"        accent="#fb923c" suffix="%" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a href="#projects" className="hero-btn" style={{ padding: "13px 28px", borderRadius: "13px", background: "linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 24px rgba(34,211,238,0.28)", letterSpacing: "0.3px", border: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(34,211,238,0.42)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 24px rgba(34,211,238,0.28)"; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                View Projects
              </a>
              <a href="/Arun S-Resume.pdf" target="_blank" rel="noopener noreferrer" className="hero-btn" style={{ padding: "13px 28px", borderRadius: "13px", background: "rgba(255,255,255,0.04)", color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(34,211,238,0.28)", backdropFilter: "blur(12px)", letterSpacing: "0.3px" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.65)"; e.currentTarget.style.boxShadow = "0 0 22px rgba(34,211,238,0.15)"; e.currentTarget.style.background = "rgba(34,211,238,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(34,211,238,0.28)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View Resume
              </a>
              <a href="/Arun S-Resume.pdf" download className="hero-btn" style={{ padding: "13px 28px", borderRadius: "13px", background: "rgba(34,211,238,0.07)", color: "#22d3ee", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(34,211,238,0.32)", backdropFilter: "blur(12px)", letterSpacing: "0.3px" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(34,211,238,0.14)"; e.currentTarget.style.boxShadow = "0 0 22px rgba(34,211,238,0.22)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(34,211,238,0.07)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download CV
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT — Coin Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <CoinPhotoFrame />
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
          style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2 }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "3px", color: "rgba(148,163,184,0.35)", textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: "22px", height: "36px", borderRadius: "11px", border: "1.5px solid rgba(148,163,184,0.2)", display: "flex", justifyContent: "center", paddingTop: "7px" }}>
            <motion.div
              animate={{ y: [0, 11, 0] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "4px", height: "8px", borderRadius: "2px", background: "rgba(34,211,238,0.55)" }}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default Hero;