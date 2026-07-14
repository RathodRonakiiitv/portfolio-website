const items = [
  "C++", "★", "Python", "★", "FastAPI", "★", "React", "★",
  "PostgreSQL", "★", "Docker", "★", "REST APIs", "★", "NLP",
  "★", "Machine Learning", "★", "Data Structures", "★", "System Design",
  "★", "Web Scraping", "★", "Git", "★", "Algorithms", "★",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "20px 0", background: "rgba(0,212,255,0.025)", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to right, #070707, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(to left, #070707, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ display: "flex", gap: "32px", animation: "marquee 28s linear infinite", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "13px", fontWeight: item === "★" ? 400 : 600, letterSpacing: item === "★" ? "0" : "0.12em", textTransform: "uppercase", color: item === "★" ? "#00d4ff" : "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>{item}</span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
