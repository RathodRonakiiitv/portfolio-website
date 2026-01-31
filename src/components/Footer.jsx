import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerName}>Ronak Rathod</div>

        <div className={styles.footerLeft}>
          <p className={`${styles.footerTagline} ttcommons`}>
            Software Developer • Problem Solver<br />
            Turning Ideas into Scalable Code
          </p>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.footerColumn}>
            <span className={styles.footerTitle}>Navigate</span>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <Link to="/contact">Contact</Link>
          </div>

          <div className={styles.footerColumn}>
            <span className={styles.footerTitle}>Connect</span>
            <a href="https://github.com/RathodRonakiiitv" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/ronak-rathod-5a47a2325/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://leetcode.com/u/ronak_2506/" target="_blank" rel="noopener noreferrer">
              LeetCode
            </a>
            <a href="mailto:rathodronakiiitv@gmail.com">Email</a>
          </div>
        </div>
      </div>

      <div className={`${styles.footerBottom} ttcommons`}>
        © 2026 Ronak Rathod • Built with passion for code
      </div>
    </footer>
  )
}

export default Footer
