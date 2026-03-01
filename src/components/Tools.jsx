import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Tools.module.css'

gsap.registerPlugin(ScrollTrigger)

const Tools = () => {
  const sectionRef = useRef(null)

  const tools = [
    { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
    { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi' },
    { name: 'React', icon: 'https://cdn.simpleicons.org/react' },
    { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git' },
    { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/white' }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(`.${styles.toolItem}`,
        { opacity: 0, y: 40, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.header}>
        <div>
          <span className={styles.sectionTag}>Skills</span>
          <h2 className={styles.title}>
            Technical <span className={styles.accent}>Stack</span>
          </h2>
        </div>
        <p className={styles.description}>
          I leverage <b>modern backend frameworks</b> and <b>robust database systems</b> to build
          high-performance, scalable applications with a focus on clean architecture and algorithmic efficiency.
        </p>
      </div>

      <div className={styles.toolsGrid}>
        {tools.map((tool, index) => (
          <div key={index} className={styles.toolItem}>
            <img src={tool.icon} alt={tool.name} className={styles.toolIcon} />
            <span className={styles.toolName}>{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Tools
