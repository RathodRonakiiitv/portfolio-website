import { useState } from "react";
import { motion } from "motion/react";

const socials = [
  { label: "GitHub", short: "GH", href: "https://github.com/RathodRonakiiitv" },
  { label: "LinkedIn", short: "IN", href: "https://www.linkedin.com/in/ronak-rathod-5a47a2325/" },
  { label: "LeetCode", short: "LC", href: "https://leetcode.com/u/ronak_2506/" },
];

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true); setEmailInput("Thanks for connecting!");
    setTimeout(() => { setSubmitted(false); setEmailInput(""); }, 2500);
  };

  return (
    <footer id="contact" style={{ background: "#040404", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "120px 24px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "80px", marginBottom: "100px" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ width: "40px", height: "1px", background: "#00d4ff" }} />
              <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00d4ff", fontWeight: 500 }}>Get in Touch</span>
            </div>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: "24px" }}>Let's build<br /><span style={{ color: "#00d4ff" }}>something great</span></h2>
            <motion.a href="mailto:rathodronakiiitv@gmail.com" whileHover={{ color: "#00d4ff", x: 4 }} transition={{ duration: 0.2 }} style={{ display: "block", fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 400, color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "40px", transition: "color 0.2s ease", wordBreak: "break-all" }}>rathodronakiiitv@gmail.com</motion.a>
            <div style={{ display: "flex", gap: "16px" }}>
              {socials.map((social) => (
                <motion.a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.08, borderColor: "rgba(0,212,255,0.5)", color: "#00d4ff" }} whileTap={{ scale: 0.95 }} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: "8px", fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em", color: "rgba(255,255,255,0.5)", textDecoration: "none" }} title={social.label}>{social.short}</motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
            <div style={{ marginBottom: "48px" }}>
              <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontWeight: 500, display: "block", marginBottom: "20px" }}>Stay Connected</span>
              <form onSubmit={handleSubmit} style={{ display: "flex" }}>
                <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Enter your email" required={!submitted} readOnly={submitted} style={{ flex: 1, fontFamily: "Inter, sans-serif", fontSize: "14px", color: submitted ? "#00d4ff" : "#fff", background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.1)", borderRight: "none", borderRadius: "6px 0 0 6px", padding: "14px 18px", outline: "none" }} />
                <motion.button type="submit" whileHover={{ backgroundColor: "#00bbe5" }} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "18px", fontWeight: 500, color: "#070707", background: "#00d4ff", border: "none", borderRadius: "0 6px 6px 0", padding: "14px 22px", cursor: "pointer" }}>→</motion.button>
              </form>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              <div>
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "16px" }}>Sitemap</span>
                {[{ label: "Hero", id: "hero" }, { label: "About", id: "about" }, { label: "Skills", id: "skills" }, { label: "Projects", id: "projects" }].map((link) => (
                  <motion.button key={link.id} whileHover={{ x: 4, color: "#fff" }} onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "Space Grotesk, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", textAlign: "left", marginBottom: "10px", padding: 0 }}>{link.label}</motion.button>
                ))}
              </div>
              <div>
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", display: "block", marginBottom: "16px" }}>Details</span>
                {["IIIT Vadodara", "B.Tech CSE", "Class of 2028", "India"].map((item) => (
                  <div key={item} style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.35)", marginBottom: "10px" }}>{item}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "40px", overflow: "hidden" }}>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(60px, 16vw, 220px)", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.85, color: "rgba(255,255,255,0.04)", userSelect: "none", whiteSpace: "nowrap" }}>RONAK RATHOD</h1>
        </motion.div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", padding: "24px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>© {new Date().getFullYear()} Ronak Rathod</span>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>India · All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
