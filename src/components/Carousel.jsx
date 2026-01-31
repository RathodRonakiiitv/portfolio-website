import { useEffect, useRef } from 'react'
import styles from './Carousel.module.css'

const Carousel = () => {
  const projects = [
    { img: 'https://img.icons8.com/fluency/400/resume.png', alt: 'Resume Matcher Project', link: 'https://github.com/RathodRonakiiitv/resume-matching-project' },
    { img: 'https://img.icons8.com/fluency/400/api-settings.png', alt: 'API Development', link: 'https://github.com/RathodRonakiiitv' },
    { img: 'https://img.icons8.com/fluency/400/database.png', alt: 'Database Projects', link: 'https://github.com/RathodRonakiiitv' },
    { img: 'https://img.icons8.com/fluency/400/source-code.png', alt: 'DSA Solutions', link: 'https://github.com/RathodRonakiiitv' },
    { img: 'https://img.icons8.com/fluency/400/python.png', alt: 'Python Projects', link: 'https://github.com/RathodRonakiiitv' }
  ]

  // Duplicate for infinite scroll
  const allProjects = [...projects, ...projects]

  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutGrid}>
        <div className={styles.aboutLeft}>
          <h2 className={styles.aboutTitle}>
            <span className={styles.initialPart}>Featured</span>{' '}
            <span className={styles.portfolioPart}>Projects</span>
          </h2>
        </div>

        <div className={styles.aboutDivider}></div>

        <div className={styles.aboutRight}>
          <p className={styles.aboutDescription}>
            Real-world projects built with a focus on backend engineering, algorithmic efficiency, 
            and clean architecture. Each project demonstrates my problem-solving approach and 
            passion for building reliable, logic-driven applications.
          </p>
        </div>
      </div>

      <div className={styles.portfolioCarousel}>
        <div className={styles.carouselContainer}>
          {allProjects.map((project, index) => (
            <div key={index} className={styles.portfolioItem}>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <img src={project.img} alt={project.alt} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Carousel
