import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Footer.module.css'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal footer content
      gsap.fromTo(
        `.${styles.footerContent}`,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        }
      )

      // Animate large text
      gsap.fromTo(
        `.${styles.massiveText}`,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: `.${styles.massiveText}`,
            start: 'top 90%',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    // Visual only
    const input = e.target.querySelector('input')
    if (input) {
      const originalVal = input.value
      input.value = 'Thanks for connecting!'
      setTimeout(() => (input.value = originalVal), 2000)
    }
  }

  return (
    <footer className={styles.footer} id="contact" ref={footerRef}>
      <div className={styles.footerContent}>
        {/* Top section: Info & Form */}
        <div className={styles.topSection}>
          <div className={styles.contactInfo}>
            <span className={styles.label}>GET IN TOUCH</span>
            <a href="mailto:rathodronakiiitv@gmail.com" className={styles.emailLink}>
              rathodronakiiitv@gmail.com
            </a>
            
            <div className={styles.socials}>
              <a href="https://github.com/RathodRonakiiitv" target="_blank" rel="noopener noreferrer">GH</a>
              <a href="https://www.linkedin.com/in/ronak-rathod-5a47a2325/" target="_blank" rel="noopener noreferrer">IN</a>
              <a href="https://leetcode.com/u/ronak_2506/" target="_blank" rel="noopener noreferrer">LC</a>
            </div>
          </div>

          <div className={styles.newsletter}>
            <span className={styles.label}>STAY CONNECTED</span>
            <form className={styles.emailForm} onSubmit={handleEmailSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required 
              />
              <button type="submit">→</button>
            </form>
          </div>
        </div>

        {/* Middle section: Links grid */}
        <div className={styles.middleSection}>
          <div className={styles.navCol}>
            <span className={styles.colTitle}>Sitemap</span>
            <a href="#origin">Origin</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
          </div>
          
          <div className={styles.navCol}>
            <span className={styles.colTitle}>Details</span>
            <span>IIIT Vadodara</span>
            <span>B.Tech CSE</span>
            <span>Class of 2028</span>
          </div>

          <div className={styles.ctaBox}>
            <a href="mailto:rathodronakiiitv@gmail.com" className={styles.ctaBtn}>
              <div className={styles.btnDot} />
              REACH ME
            </a>
          </div>
        </div>

        {/* Bottom section: Massive Text */}
        <div className={styles.bottomSection}>
          <h1 className={styles.massiveText}>RONAK RATHOD</h1>
          
          <div className={styles.copyright}>
            <span>© {new Date().getFullYear()}</span>
            <span>INDIA</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
