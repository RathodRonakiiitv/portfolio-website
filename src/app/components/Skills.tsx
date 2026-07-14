import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

const stats = [
  { value: 500, suffix: "+", label: "Problems Solved", desc: "LeetCode & CodeForces" },
  { value: 2, suffix: "+", label: "Years Experience", desc: "Project-based development" },
  { value: 10, suffix: "+", label: "Projects Built", desc: "APIs to Full-Stack" },
  { value: 4, suffix: "+", label: "Core Technologies", desc: "C++, Python, React, SQL" },
];

const services = [
  { index: "01", category: "BACKEND", skills: ["FastAPI", "REST APIs", "Authentication", "Web Scraping", "Microservices"] },
  { index: "02", category: "ALGORITHMS", skills: ["Data Structures", "C++", "Problem Solving", "Optimization", "Logic"] },
  { index: "03", category: "DATABASES", skills: ["PostgreSQL", "MySQL", "Database Design", "Query Optimization", "ORMs"] },
  { index: "04", category: "SYSTEMS", skills: ["Git", "Docker", "Linux", "Deployment", "System Design"] },
];

const tools = [
  { name: "C++", icon: "https://cdn.simpleicons.org/cplusplus/00d4ff" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/00d4ff" },
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/00d4ff" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/00d4ff" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/00d4ff" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/00d4ff" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/00d4ff" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/00d4ff" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        const start = Date.now(); const duration = 1800;
        const tick = () => { const elapsed = Date.now() - start; const progress = Math.min(elapsed / duration, 1); const eased = 1 - Math.pow(1 - progress, 3); setCount(Math.round(eased * value)); if (progress < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el); return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Skills() {
  const [activeService, setActiveService] = useState(0);
  return (
    <section id="skills" style={{ padding: "120px 24px", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "80px" }}>
          <div style={{ width: "40px", height: "1px", background: "#00d4ff" }} />
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00d4ff", fontWeight: 500 }}>Skills & Capabilities</span>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "12px", overflow: "hidden", marginBottom: "100px" }}>
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }} style={{ padding: "48px 32px", background: "#0c0c0c", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#00d4ff", lineHeight: 1 }}><AnimatedCounter value={stat.value} suffix={stat.suffix} /></div>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#fff" }}>{stat.label}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{stat.desc}</div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "80px", marginBottom: "100px" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.9, color: "#fff", marginBottom: "24px" }}>CAPA<span style={{ color: "#00d4ff" }}>BILITIES</span></h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.8, color: "rgba(255,255,255,0.45)", maxWidth: "360px" }}>Building high-performance, scalable applications with a focus on clean architecture and algorithmic efficiency.</p>
          </motion.div>
          <div>
            {services.map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <button onClick={() => setActiveService(activeService === i ? -1 : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: activeService === i ? "#00d4ff" : "rgba(255,255,255,0.25)", fontWeight: 500, transition: "color 0.3s" }}>{service.index}</span>
                    <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700, letterSpacing: "-0.01em", color: activeService === i ? "#00d4ff" : "#fff", transition: "color 0.3s" }}>{service.category}</span>
                  </div>
                  <motion.span animate={{ rotate: activeService === i ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: "24px", fontWeight: 300, color: activeService === i ? "#00d4ff" : "rgba(255,255,255,0.3)", lineHeight: 1, flexShrink: 0 }}>+</motion.span>
                </button>
                <motion.div animate={{ height: activeService === i ? "auto" : 0, opacity: activeService === i ? 1 : 0 }} initial={false} transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", paddingBottom: "24px" }}>
                    {service.skills.map((skill, j) => (
                      <motion.span key={j} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: j * 0.06 }} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "6px 12px", textTransform: "uppercase" }}>{skill}</motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
            <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>Tech Stack & Tools</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "16px" }}>
            {tools.map((tool, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} whileHover={{ scale: 1.08 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "24px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", cursor: "default" }}>
                <img src={tool.icon} alt={tool.name} style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.05em", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
