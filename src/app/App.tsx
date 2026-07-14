import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import Marquee from "./components/Marquee";
import FloatingDock from "./components/FloatingDock";

function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#070707",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "32px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "clamp(40px, 8vw, 72px)",
          fontWeight: 700, letterSpacing: "-0.04em", color: "#fff",
        }}
      >
        RR<span style={{ color: "#00d4ff" }}>.</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          width: "180px", height: "1px",
          background: "rgba(255,255,255,0.08)",
          position: "relative", overflow: "hidden", borderRadius: "1px",
        }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0, background: "#00d4ff", transformOrigin: "left" }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.6 }}
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: "11px", letterSpacing: "0.25em",
          textTransform: "uppercase", color: "#fff",
        }}
      >
        Loading
      </motion.p>
    </motion.div>
  );
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);

    const updateHover = () => {
      const interactives = document.querySelectorAll("a, button");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };
    updateHover();
    const observer = new MutationObserver(updateHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      setTrail((prev) => ({
        x: lerp(prev.x, pos.x, 0.12),
        y: lerp(prev.y, pos.y, 0.12),
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  return (
    <>
      <div style={{
        position: "fixed", left: pos.x, top: pos.y,
        width: "6px", height: "6px", borderRadius: "50%",
        background: "#00d4ff", transform: "translate(-50%, -50%)",
        pointerEvents: "none", zIndex: 9998,
      }} />
      <div style={{
        position: "fixed", left: trail.x, top: trail.y,
        width: hovered ? "48px" : "28px",
        height: hovered ? "48px" : "28px",
        borderRadius: "50%",
        border: `1.5px solid ${hovered ? "#00d4ff" : "rgba(0,212,255,0.4)"}`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none", zIndex: 9997,
        transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
      }} />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      background: "#070707", color: "#fff",
      minHeight: "100vh", fontFamily: "Inter, sans-serif",
      cursor: "none",
    }}>
      <AnimatePresence>{!loaded && <Preloader />}</AnimatePresence>

      <ScrollProgress />
      <CustomCursor />
      <FloatingDock />

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Marquee />
          <Skills />
          <Projects />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
