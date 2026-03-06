import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './About.module.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column slide in
      gsap.fromTo(`.${styles.aboutLeft}`,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      // Right column slide in
      gsap.fromTo(`.${styles.aboutRight}`,
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      )
      // Center image scale
      gsap.fromTo(`.${styles.profileImageContainer}`,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="about" ref={sectionRef}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTag}>About</span>
        <h2 className={styles.sectionTitle}>
          Who I <span className={styles.accent}>Am</span>
        </h2>
      </div>

      <div className={styles.aboutGrid}>
        <div className={styles.aboutLeft}>
          <div className={styles.card}>
            <h3>Education</h3>
            <ul>
              <li>
                <strong>IIIT Vadodara</strong> — B.Tech CSE
              </li>
              <li>Expected Graduation: 2028</li>
              <li>📍 India</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Experience</h3>
            <p>
              2+ years of project-based development<br />
              Backend systems & APIs with Python/FastAPI<br />
              DSA problem solving with C++
            </p>
          </div>

          <div className={styles.card}>
            <h3>Focus Areas</h3>
            <div className={styles.focusTags}>
              <span>Backend Engineering</span>
              <span>DSA</span>
              <span>System Design</span>
              <span>Web Scraping</span>
            </div>
          </div>
        </div>

        <div className={styles.profileImageContainer}>
          <div className={styles.photoFrame}>
            <img src="/images/profile.jpg" alt="Ronak Rathod" className={styles.profileImage} />
          </div>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.resumeBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Resume
          </a>
        </div>

        <div className={styles.aboutRight}>
          <div className={styles.card}>
            <h3>Languages</h3>
            <ul>
              <li>C++</li>
              <li>Python</li>
              <li>SQL</li>
              <li>JavaScript</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Concepts</h3>
            <div className={styles.focusTags}>
              <span>DSA</span>
              <span>DBMS</span>
              <span>OOP</span>
              <span>REST APIs</span>
              <span>NLP</span>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Contact</h3>
            <p>
              <a href="mailto:rathodronakiiitv@gmail.com">rathodronakiiitv@gmail.com</a>
            </p>
          </div>

          <div className={styles.card}>
            <h3>Interests</h3>
            <p>Problem Solving • Open Source • AI/ML</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
