import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <span className={styles.brandName}>Ronak Rathod</span>
          <p className="ttcommons">
            Software Developer • Problem Solver<br />
            Turning Ideas into Scalable Code
          </p>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.column}>
            <span className={styles.columnTitle}>Navigate</span>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <Link to="/contact">Contact</Link>
          </div>

          <div className={styles.column}>
            <span className={styles.columnTitle}>Connect</span>
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

          <div className={styles.column}>
            <span className={styles.columnTitle}>Projects</span>
            <a href="https://e-commerce-review-analysis.vercel.app" target="_blank" rel="noopener noreferrer">
              Review Analyzer
            </a>
            <a href="https://resume-matching-project.vercel.app/" target="_blank" rel="noopener noreferrer">
              Resume Matcher
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© 2026 Ronak Rathod</span>
        <span>Built with passion for code</span>
      </div>
    </footer>
  )
}

export default Footer
