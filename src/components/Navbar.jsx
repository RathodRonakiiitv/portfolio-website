import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Navbar.module.css'

const Navbar = () => {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuItemsRef = useRef([])

  const sections = [
    { name: 'ORIGIN', href: '#origin' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SERVICES', href: '#services' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
  ]

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    )

    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      // Animate menu items in
      gsap.fromTo(menuItemsRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      )
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        ref={navRef}
      >
        <a href="#origin" className={styles.logo}>
          <span className={styles.logoText}>RR</span>
        </a>

        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
          <span>Scroll to discover</span>
        </div>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>
        </button>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div className={`${styles.menuOverlay} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.menuContent}>
          <ul className={styles.menuList}>
            {sections.map((section, i) => (
              <li
                key={section.name}
                ref={el => menuItemsRef.current[i] = el}
              >
                <a
                  href={section.href}
                  className={styles.menuLink}
                  onClick={(e) => handleNavClick(e, section.href)}
                >
                  <span className={styles.menuNumber}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.menuName}>{section.name}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.menuFooter}>
            <div className={styles.menuSocials}>
              <span className={styles.socialLabel}>CONNECT</span>
              <a href="https://github.com/RathodRonakiiitv" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/ronak-rathod-5a47a2325/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://leetcode.com/u/ronak_2506/" target="_blank" rel="noopener noreferrer">LeetCode</a>
            </div>
            <div className={styles.menuEmail}>
              <a href="mailto:rathodronakiiitv@gmail.com">rathodronakiiitv@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
