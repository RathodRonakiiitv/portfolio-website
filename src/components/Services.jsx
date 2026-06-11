import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Services.module.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 500, suffix: '+', label: 'Problems Solved', desc: 'Across LeetCode & CodeForces' },
  { value: 2, suffix: '+', label: 'Years Experience', desc: 'Project-based development' },
  { value: 10, suffix: '+', label: 'Projects Built', desc: 'From APIs to Full-Stack' },
  { value: 4, suffix: '+', label: 'Core Technologies', desc: 'C++, Python, React, SQL' },
]

const services = [
  {
    category: 'BACKEND',
    skills: ['FastAPI', 'REST APIs', 'Authentication', 'Web Scraping', 'Microservices'],
  },
  {
    category: 'ALGORITHMS',
    skills: ['Data Structures', 'C++', 'Problem Solving', 'Optimization', 'Logic'],
  },
  {
    category: 'DATABASES',
    skills: ['PostgreSQL', 'MySQL', 'Database Design', 'Query Optimization', 'ORMs'],
  },
  {
    category: 'SYSTEMS',
    skills: ['Git', 'Docker', 'Linux', 'Deployment', 'System Design'],
  },
]

const tools = [
  { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/00d4ff' },
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/00d4ff' },
  { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/00d4ff' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/00d4ff' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/00d4ff' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/00d4ff' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/00d4ff' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/00d4ff' },
]

const Services = () => {
  const sectionRef = useRef(null)
  const [counts, setCounts] = useState([0, 0, 0, 0])
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Stats Counters
      ScrollTrigger.create({
        trigger: `.${styles.statsGrid}`,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          stats.forEach((stat, index) => {
            gsap.to(
              { val: 0 },
              {
                val: stat.value,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () {
                  setCounts((prev) => {
                    const next = [...prev]
                    next[index] = Math.round(this.targets()[0].val)
                    return next
                  })
                },
              }
            )
          })
        },
      })

      // Services List items entrance
      gsap.fromTo(
        `.${styles.serviceCategory}`,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.servicesList}`,
            start: 'top 75%',
          },
        }
      )

      // Tools grid entrance
      gsap.fromTo(
        `.${styles.toolIcon}`,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: `.${styles.toolsSection}`,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="services" ref={sectionRef}>
      {/* STATS SECTION */}
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statNumber}>
              {counts[i]}
              <span className={styles.statSuffix}>{stat.suffix}</span>
            </div>
            <div className={styles.statInfo}>
              <h4 className={styles.statLabel}>{stat.label}</h4>
              <p className={styles.statDesc}>{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      {/* SERVICES SECTION */}
      <div className={styles.servicesLayout}>
        <div className={styles.servicesHeader}>
          <span className={styles.sectionTag}>Services</span>
          <h2 className={styles.title}>
            CAPA<span className={styles.accent}>BILITIES</span>
          </h2>
          <p className={styles.subtitle}>
            Building high-performance, scalable applications with a focus on clean
            architecture and algorithmic efficiency.
          </p>
        </div>

        <div className={styles.servicesList}>
          {services.map((service, i) => (
            <div
              key={i}
              className={`${styles.serviceCategory} ${
                activeService === i ? styles.activeCategory : ''
              }`}
              onMouseEnter={() => setActiveService(i)}
              onClick={() => setActiveService(i)}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIndex}>0{i + 1}</span>
                <h3 className={styles.categoryName}>{service.category}</h3>
              </div>
              <div
                className={styles.skillsWrapper}
                style={{
                  height: activeService === i ? 'auto' : '0px',
                  opacity: activeService === i ? 1 : 0,
                }}
              >
                <div className={styles.skillsList}>
                  {service.skills.map((skill, j) => (
                    <span key={j} className={styles.skillItem}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOOLS GRID */}
      <div className={styles.toolsSection}>
        <p className={styles.toolsLabel}>TECH STACK & TOOLS</p>
        <div className={styles.toolsGrid}>
          {tools.map((tool, i) => (
            <div key={i} className={styles.toolIcon} title={tool.name}>
              <img src={tool.icon} alt={tool.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
