import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './LateralNav.module.css'

gsap.registerPlugin(ScrollTrigger)

const sections = [
  { id: 'origin', label: 'ORIGIN', description: 'The beginning' },
  { id: 'about', label: 'ABOUT', description: 'Who I am' },
  { id: 'services', label: 'SERVICES', description: 'What I do' },
  { id: 'projects', label: 'PROJECTS', description: 'My work' },
  { id: 'contact', label: 'CONTACT', description: 'Reach me' },
]

const LateralNav = () => {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    // Show lateral nav after scrolling past hero
    const showTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top -200',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    })

    // Track which section is active
    const triggers = sections.map((section, index) => {
      const el = document.getElementById(section.id)
      if (!el) return null

      return ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
      })
    })

    return () => {
      showTrigger.kill()
      triggers.forEach(t => t?.kill())
    }
  }, [])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`${styles.lateralNav} ${visible ? styles.visible : ''}`}
      ref={navRef}
      aria-label="Section navigation"
    >
      {/* Section label */}
      <div className={styles.sectionLabel}>
        <span className={styles.labelText}>{sections[active]?.label}</span>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {sections.map((section, i) => (
          <button
            key={section.id}
            className={`${styles.dot} ${i === active ? styles.active : ''}`}
            onClick={() => handleClick(section.id)}
            aria-label={`Go to ${section.label}`}
            title={section.description}
          >
            <span className={styles.dotInner} />
            <span className={styles.dotLabel}>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Progress indicator */}
      <div className={styles.progress}>
        <span className={styles.progressCurrent}>
          {String(active + 1).padStart(2, '0')}
        </span>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ height: `${((active + 1) / sections.length) * 100}%` }}
          />
        </div>
        <span className={styles.progressTotal}>
          {String(sections.length).padStart(2, '0')}
        </span>
      </div>
    </nav>
  )
}

export default LateralNav
