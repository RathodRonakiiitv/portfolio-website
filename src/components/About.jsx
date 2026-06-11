import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    word: 'PRECISION',
    description: 'Every line of code matters. Clean architecture and algorithmic efficiency are non-negotiable.',
  },
  {
    word: 'LOGIC',
    description: '500+ DSA problems solved. I think in data structures, patterns, and optimized solutions.',
  },
  {
    word: 'CURIOSITY',
    description: 'From NLP pipelines to web scraping systems — I build to learn and learn to build better.',
  },
  {
    word: 'IMPACT',
    description: 'Backend systems that serve real users. APIs that scale. Code that solves actual problems.',
  },
  {
    word: 'GROWTH',
    description: 'B.Tech CSE at IIIT Vadodara. 2+ years of project-based development and counting.',
  },
]

const About = () => {
  const sectionRef = useRef(null)
  const [activeValue, setActiveValue] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(
        `.${styles.bigHeading}`,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.headingBlock}`,
            start: 'top 75%',
          },
        }
      )

      // Descriptive text block
      gsap.fromTo(
        `.${styles.descBlock}`,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.descBlock}`,
            start: 'top 80%',
          },
        }
      )

      // Profile photo parallax
      gsap.fromTo(
        `.${styles.photoWrapper}`,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.photoWrapper}`,
            start: 'top 80%',
          },
        }
      )

      // Parallax on scroll for photo
      gsap.to(`.${styles.photoWrapper}`, {
        y: -40,
        scrollTrigger: {
          trigger: `.${styles.photoWrapper}`,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Values stagger
      gsap.fromTo(
        `.${styles.valueItem}`,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.valuesGrid}`,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="about" ref={sectionRef}>
      {/* Big heading block */}
      <div className={styles.headingBlock}>
        <h2 className={styles.bigHeading}>
          <span className={styles.headingLine}>BEYOND</span>
          <span className={`${styles.headingLine} ${styles.headingAccent}`}>
            THE
          </span>
          <span className={styles.headingLine}>SURFACE</span>
        </h2>
      </div>

      {/* Descriptive text */}
      <div className={styles.descBlock}>
        <div className={styles.descTag}>
          <span className={styles.tagLine} />
          <span>About</span>
        </div>
        <h3 className={styles.descTitle}>EVOLVING THROUGH CLARITY</h3>
        <p className={styles.descText}>
          I'm a passionate Software Developer and CS student at IIIT Vadodara
          who thrives at the intersection of logic and creativity. I enjoy
          building reliable, scalable backend systems and solving complex
          algorithmic challenges — turning abstract problems into clean,
          working code.
        </p>
        <div className={styles.descMeta}>
          <span>IIIT Vadodara</span>
          <span className={styles.metaDot}>·</span>
          <span>B.Tech CSE</span>
          <span className={styles.metaDot}>·</span>
          <span>Class of 2028</span>
        </div>
      </div>

      {/* Profile photo */}
      <div className={styles.photoWrapper}>
        <div className={styles.photoFrame}>
          <img
            src="/images/profile.jpg"
            alt="Ronak Rathod"
            className={styles.profileImage}
          />
          <div className={styles.photoGlow} />
        </div>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeBtn}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="14"
            height="14"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Resume
        </a>
      </div>

      {/* Values — clickable list */}
      <div className={styles.valuesGrid}>
        <div className={styles.valuesLabel}>
          <span className={styles.tagLine} />
          <span>Core Values</span>
        </div>
        <div className={styles.valuesList}>
          {values.map((v, i) => (
            <button
              key={i}
              className={`${styles.valueItem} ${
                activeValue === i ? styles.valueActive : ''
              }`}
              onClick={() => setActiveValue(activeValue === i ? null : i)}
            >
              <span className={styles.valueWord}>{v.word}</span>
              <span className={styles.valueDash}>—</span>
              <div
                className={styles.valueDesc}
                style={{
                  maxHeight: activeValue === i ? '100px' : '0',
                  opacity: activeValue === i ? 1 : 0,
                }}
              >
                {v.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
