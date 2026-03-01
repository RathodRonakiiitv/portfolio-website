import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import styles from './Navbar.module.css'

const Navbar = () => {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )

    // Glassmorphism on scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} ref={navRef}>
      <div className={styles.logo}>
        <span className={styles.logoText}>RR</span>
      </div>
      <ul className={styles.navLinks}>
        <li><a href="#home">home</a></li>
        <li><a href="#about">about</a></li>
        <li><a href="#projects">projects</a></li>
      </ul>
      <Link to="/contact" className={styles.ctaButton}>
        Get in touch
        <span className={styles.arrow}>→</span>
      </Link>
    </nav>
  )
}

export default Navbar
