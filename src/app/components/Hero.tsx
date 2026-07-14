import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*[]{}";

function useScramble(target: string, active: boolean, delay = 0) {
  const [display, setDisplay] = useState(() => target.split("").map(() => " "));

  useEffect(() => {
    if (!active) return;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    target.split("").forEach((char, i) => {
      if (char === " ") return;
      let iterations = 0;
      const maxIterations = 10 + i * 2;
      const startDelay = delay + i * 40;

      const t = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplay((prev) => {
            const next = [...prev];
            if (iterations >= maxIterations) {
              next[i] = char;
              clearInterval(interval);
            } else {
              next[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
            iterations++;
            return next;
          });
        }, 35);
      }, startDelay);

      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [active, target, delay]);

  return display.join("");
}

function ScrambleWord({ text, active, delay = 0, style }: {
  text: string; active: boolean; delay?: number; style?: React.CSSProperties;
}) {
  const scrambled = useScramble(text, active, delay);
  return <span style={style}>{scrambled}</span>;
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.8], [0, -80]);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" ref={heroRef} style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", padding: "0 24px",
    }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)", animation: "orb1 8s ease-in-out infinite", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", animation: "orb2 10s ease-in-out infinite", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", top: "60%", left: "50%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)", animation: "orb3 12s ease-in-out infinite", filter: "blur(60px)" }} />
      </div>

      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "200px", background: "linear-gradient(to bottom, #070707 0%, transparent 100%)", pointerEvents: "none", zIndex: 1 }} />

      <motion.div style={{ y: nameY, opacity: nameOpacity, textAlign: "center", zIndex: 2, position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "40px", padding: "6px 16px", border: "1px solid rgba(0,212,255,0.3)", borderRadius: "100px", color: "#00d4ff", fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00d4ff", animation: "pulse 2s ease-in-out infinite" }} />
          Available for opportunities
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={started ? { opacity: 1 } : {}}
          transition={{ duration: 0.1 }}
          style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(60px, 14vw, 180px)", fontWeight: 700, lineHeight: 0.88, letterSpacing: "-0.04em", userSelect: "none" }}
        >
          <div><ScrambleWord text="RONAK" active={started} delay={0} style={{ color: "#fff" }} /></div>
          <div style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.5)", color: "transparent" }}>
            <ScrambleWord text="RATHOD" active={started} delay={300} />
          </div>
        </motion.div>

        <motion.div style={{ y: subtitleY, opacity: subtitleOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(12px, 1.4vw, 16px)", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: "32px", fontWeight: 400 }}
          >
            Software Developer &nbsp;·&nbsp; Backend Systems &nbsp;·&nbsp; IIIT Vadodara
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "48px", flexWrap: "wrap" }}
          >
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#070707", background: "#00d4ff", border: "none", borderRadius: "6px", padding: "16px 36px", cursor: "pointer" }}
            >View Projects</motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "transparent", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: "6px", padding: "16px 36px", cursor: "pointer" }}
            >Get in Touch</motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={started ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.8 }}
        style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2 }}
      >
        <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)", animation: "scrollLine 2s ease-in-out infinite" }} />
      </motion.div>

      <style>{`
        @keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-40px) scale(1.1)}66%{transform:translate(-20px,20px) scale(0.9)}}
        @keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-40px,-30px) scale(1.15)}}
        @keyframes orb3{0%,100%{transform:translate(-50%,0) scale(1)}50%{transform:translate(-50%,-20px) scale(1.2)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}
        @keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top;opacity:1}50%{transform:scaleY(1);transform-origin:top;opacity:1}100%{transform:scaleY(1);transform-origin:bottom;opacity:0}}
      `}</style>
    </section>
  );
}
