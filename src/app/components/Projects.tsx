import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const projects = [
  { number: "01", title: "Review Analyzer", subtitle: "AI-Powered E-Commerce Analysis", desc: "An intelligent system that processes and analyzes customer reviews to extract meaningful insights, sentiment, and product trends using NLP pipelines.", link: "https://e-commerce-review-analysis.vercel.app", tags: ["FastAPI", "React", "NLP", "Python"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", accent: "#00d4ff" },
  { number: "02", title: "Resume Matcher", subtitle: "Smart Job Matching Engine", desc: "A machine learning powered tool that intelligently matches candidate resumes with job descriptions using natural language processing techniques.", link: "https://resume-matching-project.vercel.app/", tags: ["Python", "NLP", "Machine Learning"], image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80", accent: "#8b5cf6" },
  { number: "03", title: "LangChat", subtitle: "Real-Time Multilingual Chat App", desc: "A full-stack real-time chat application with multilingual support, enabling seamless conversations across language barriers with live messaging and user authentication.", link: "https://lang-chat-three.vercel.app", tags: ["React", "Node.js", "Real-Time", "WebSocket"], image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80", accent: "#ec4899" },
  { number: "04", title: "Backend & APIs", subtitle: "Scalable Architecture", desc: "Robust backend systems, RESTful APIs and microservices with a focus on performance, security, and clean code principles.", link: "https://github.com/RathodRonakiiitv", tags: ["FastAPI", "PostgreSQL", "Docker"], image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&q=80", accent: "#10b981" },
  { number: "05", title: "DSA Solutions", subtitle: "500+ Problems Solved", desc: "Extensive collection of optimized algorithmic solutions across LeetCode, showcasing strong problem-solving capabilities in C++.", link: "https://leetcode.com/u/ronak_2506/", tags: ["C++", "Algorithms", "Data Structures"], image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80", accent: "#f59e0b" },
];

function TiltCard({ project, index, hoveredIndex, setHoveredIndex }: { project: typeof projects[0]; index: number; hoveredIndex: number | null; setHoveredIndex: (i: number | null) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const isHovered = hoveredIndex === index;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current; if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = e.clientX - rect.left; const cy = e.clientY - rect.top;
    setTilt({ x: ((cy / rect.height) - 0.5) * 12, y: ((cx / rect.width) - 0.5) * -12 });
    setGlowPos({ x: (cx / rect.width) * 100, y: (cy / rect.height) * 100 });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay: index * 0.08 }} style={{ perspective: "1000px" }}>
      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
        <div ref={cardRef} onMouseEnter={() => setHoveredIndex(index)} onMouseMove={handleMouseMove} onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHoveredIndex(null); }}
          style={{ border: `1px solid ${isHovered ? project.accent + "44" : "rgba(255,255,255,0.07)"}`, borderRadius: "16px", padding: "40px", display: "grid", gridTemplateColumns: "80px 1fr auto", gap: "32px", alignItems: "center", cursor: "pointer", overflow: "hidden", position: "relative", transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.15s ease, border-color 0.3s ease", background: isHovered ? "rgba(255,255,255,0.025)" : "transparent" }}>
          {isHovered && <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(200px circle at ${glowPos.x}% ${glowPos.y}%, ${project.accent}18, transparent 70%)`, borderRadius: "16px" }} />}
          <AnimatePresence>{isHovered && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ position: "absolute", inset: 0, backgroundImage: `url(${project.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.06)", borderRadius: "16px" }} />}</AnimatePresence>
          <div style={{ position: "relative" }}><span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: isHovered ? project.accent : "rgba(255,255,255,0.15)", transition: "color 0.3s ease" }}>{project.number}</span></div>
          <div style={{ position: "relative", minWidth: 0 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>{project.tags.map((tag, j) => <span key={j} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: isHovered ? project.accent + "cc" : "rgba(255,255,255,0.35)", border: `1px solid ${isHovered ? project.accent + "44" : "rgba(255,255,255,0.1)"}`, borderRadius: "3px", padding: "3px 8px", transition: "color 0.3s, border-color 0.3s" }}>{tag}</span>)}</div>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "8px", color: isHovered ? "#fff" : "rgba(255,255,255,0.85)", transition: "color 0.3s" }}>{project.title}</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, maxWidth: "600px" }}>{project.desc}</p>
          </div>
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "48px", height: "48px", borderRadius: "50%", border: `1.5px solid ${isHovered ? project.accent : "rgba(255,255,255,0.15)"}`, flexShrink: 0, transform: isHovered ? "translateX(0) scale(1.1)" : "translateX(-8px)", opacity: isHovered ? 1 : 0.35, transition: "all 0.3s ease" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isHovered ? project.accent : "rgba(255,255,255,0.6)"} strokeWidth="2" style={{ transition: "stroke 0.3s" }}><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section id="projects" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "80px" }}>
          <div style={{ width: "40px", height: "1px", background: "#00d4ff" }} />
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00d4ff", fontWeight: 500 }}>Projects</span>
        </motion.div>
        <div style={{ marginBottom: "80px" }}>
          {["PERSPECTIVE,", "PERCEPTION,", "FUTURE"].map((word, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.span initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} style={{ display: "inline-block", fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(40px, 8vw, 96px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.04em", color: i === 1 ? "#00d4ff" : "#fff" }}>{word}</motion.span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {projects.map((project, i) => <TiltCard key={i} project={project} index={i} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />)}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} style={{ textAlign: "center", marginTop: "64px" }}>
          <a href="https://github.com/RathodRonakiiitv" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", background: "transparent", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: "6px", padding: "16px 40px", cursor: "pointer" }}>View All on GitHub →</motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
