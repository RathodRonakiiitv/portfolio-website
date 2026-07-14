import { useScroll, useSpring, motion } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #00d4ff, #8b5cf6)",
        transformOrigin: "left",
        scaleX,
        zIndex: 9999,
      }}
    />
  );
}
