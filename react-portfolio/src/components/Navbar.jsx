import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
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
