import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Carousel.module.css'

gsap.registerPlugin(ScrollTrigger)

const Carousel = () => {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)

  const projects = [
    {
      img: 'https://img.icons8.com/fluency/400/combo-chart.png',
      title: 'Review Analyzer',
      desc: 'AI-powered Flipkart review analysis with sentiment detection & fake review flagging',
      tags: ['FastAPI', 'React', 'NLP', 'Groq AI'],
      link: 'https://e-commerce-review-analysis.vercel.app',
      github: 'https://github.com/RathodRonakiiitv/E-commerce-review-analysis'
    },
    {
      img: 'https://img.icons8.com/fluency/400/resume.png',
      title: 'Resume Matcher',
      desc: 'Smart resume-job matching with NLP-powered scoring',
      tags: ['Python', 'NLP', 'React'],
      link: 'https://resume-matching-project.vercel.app/',
      github: 'https://github.com/RathodRonakiiitv/resume-matching-project'
    },
    {
      img: 'https://img.icons8.com/fluency/400/source-code.png',
      title: 'DSA Solutions',
      desc: '500+ problems solved across LeetCode & competitive platforms',
      tags: ['C++', 'Algorithms', 'Data Structures'],
      link: 'https://leetcode.com/u/ronak_2506/',
      github: 'https://github.com/RathodRonakiiitv'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger cards
      gsap.fromTo(`.${styles.projectCard}`,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
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
        <div className={styles.headerLeft}>
          <span className={styles.sectionTag}>Portfolio</span>
          <h2 className={styles.title}>
            Featured <span className={styles.accent}>Projects</span>
          </h2>
        </div>
        <p className={styles.description}>
          Real-world projects built with a focus on backend engineering,
          algorithmic efficiency, and clean architecture.
        </p>
      </div>

      <div className={styles.carouselTrack} ref={carouselRef}>
        {projects.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <div className={styles.cardImageWrap}>
              <img src={project.img} alt={project.title} />
            </div>
            <div className={styles.cardContent}>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className={styles.tags}>
                {project.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.cardLinks}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>
                  Live ↗
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Carousel
