import { useState } from "react";
import { motion } from "motion/react";

const values = [
  { word: "PRECISION", description: "Every line of code matters. Clean architecture and algorithmic efficiency are non-negotiable." },
  { word: "LOGIC", description: "500+ DSA problems solved. I think in data structures, patterns, and optimized solutions." },
  { word: "CURIOSITY", description: "From NLP pipelines to web scraping systems — I build to learn and learn to build better." },
  { word: "IMPACT", description: "Backend systems that serve real users. APIs that scale. Code that solves actual problems." },
  { word: "GROWTH", description: "B.Tech CSE at IIIT Vadodara. 2+ years of project-based development and counting." },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } } };

export default function About() {
  const [activeValue, setActiveValue] = useState<number | null>(null);

  return (
    <section id="about" style={{ padding: "120px 24px", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "80px" }}>
        <div style={{ width: "40px", height: "1px", background: "#00d4ff" }} />
        <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00d4ff", fontWeight: 500 }}>About</span>
      </motion.div>

      <div style={{ marginBottom: "80px", overflow: "hidden" }}>
        {["BEYOND", "THE", "SURFACE"].map((word, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <motion.span initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(48px, 10vw, 120px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.04em", color: i === 1 ? "#00d4ff" : "#fff" }}>
              {word}
            </motion.span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "80px", alignItems: "start" }}>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <motion.h3 variants={fadeUp} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 600, letterSpacing: "-0.02em", color: "#fff", marginBottom: "24px" }}>EVOLVING THROUGH CLARITY</motion.h3>
          <motion.p variants={fadeUp} style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.55)", marginBottom: "32px" }}>
            I'm a passionate Software Developer and CS student at IIIT Vadodara who thrives at the intersection of logic and creativity. I enjoy building reliable, scalable backend systems and solving complex algorithmic challenges — turning abstract problems into clean, working code.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "40px" }}>
            {["IIIT Vadodara", "B.Tech CSE", "Class of 2028"].map((item) => (
              <span key={item} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.25)", borderRadius: "4px", padding: "6px 14px", fontWeight: 500 }}>{item}</span>
            ))}
          </motion.div>
          <motion.a variants={fadeUp} href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#00d4ff", textDecoration: "none", border: "1.5px solid rgba(0,212,255,0.4)", borderRadius: "6px", padding: "14px 28px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Download Resume
          </motion.a>
        </motion.div>

        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.3)" }} />
            <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Core Values</span>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {values.map((v, i) => (
              <motion.button key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                onClick={() => setActiveValue(activeValue === i ? null : i)}
                style={{ background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "20px 0", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, letterSpacing: "-0.02em", color: activeValue === i ? "#00d4ff" : "#fff", transition: "color 0.3s ease" }}>{v.word}</span>
                  <motion.span animate={{ rotate: activeValue === i ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: "24px", fontWeight: 300, color: activeValue === i ? "#00d4ff" : "rgba(255,255,255,0.3)", lineHeight: 1 }}>+</motion.span>
                </div>
                <motion.div animate={{ height: activeValue === i ? "auto" : 0, opacity: activeValue === i ? 1 : 0 }} initial={false} transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", paddingBottom: "8px" }}>{v.description}</p>
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
