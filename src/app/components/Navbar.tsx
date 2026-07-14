import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["about", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 32px", height: "72px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(7,7,7,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
            fontFamily: "Space Grotesk, sans-serif", fontSize: "22px",
            fontWeight: 700, color: "#fff", letterSpacing: "-0.02em",
          }}
        >
          RR<span style={{ color: "#00d4ff" }}>.</span>
        </button>

        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "Space Grotesk, sans-serif", fontSize: "13px",
                fontWeight: 500, letterSpacing: "0.1em",
                color: activeSection === link.href.replace("#", "") ? "#00d4ff" : "rgba(255,255,255,0.6)",
                textTransform: "uppercase", transition: "color 0.3s ease",
                padding: "4px 0", position: "relative",
              }}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <motion.div
                  layoutId="nav-indicator"
                  style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: "1px", background: "#00d4ff" }}
                />
              )}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            style={{
              fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: 500,
              letterSpacing: "0.08em", color: "#070707", background: "#00d4ff",
              border: "none", borderRadius: "4px", padding: "10px 20px",
              cursor: "pointer", textTransform: "uppercase",
            }}
          >
            Hire Me
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", top: "72px", left: 0, right: 0, zIndex: 99,
              background: "rgba(7,7,7,0.97)", backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "24px 32px", display: "flex", flexDirection: "column", gap: "24px",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "Space Grotesk, sans-serif", fontSize: "24px",
                  fontWeight: 600, color: "#fff", textAlign: "left",
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
