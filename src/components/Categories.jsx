import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Categories.module.css'

gsap.registerPlugin(ScrollTrigger)

const Categories = () => {
  const sectionRef = useRef(null)

  const categories = [
    {
      title: 'Review Analyzer',
      subtitle: 'AI-Powered Analysis',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      link: 'https://e-commerce-review-analysis.vercel.app',
      tags: ['FastAPI', 'React', 'NLP']
    },
    {
      title: 'Resume Matcher',
      subtitle: 'Smart Job Matching',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
      link: 'https://resume-matching-project.vercel.app/',
      tags: ['Python', 'NLP', 'ML']
    },
    {
      title: 'Backend & APIs',
      subtitle: 'Scalable Systems',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
      link: 'https://github.com/RathodRonakiiitv',
      tags: ['FastAPI', 'PostgreSQL']
    },
    {
      title: 'DSA & Algorithms',
      subtitle: '500+ Problems Solved',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
      link: 'https://leetcode.com/u/ronak_2506/',
      tags: ['C++', 'Algorithms']
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(`.${styles.categoryCard}`,
        { opacity: 0, y: 80, rotateY: -10 },
        {
          opacity: 1, y: 0, rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
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
    <section className={styles.section} id="projects" ref={sectionRef}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTag}>Explore</span>
        <h2 className={styles.title}>
          Project <span className={styles.accent}>Showcase</span>
        </h2>
      </div>

      <div className={styles.grid}>
        {categories.map((category, index) => (
          <a
            key={index}
            href={category.link}
            className={styles.categoryCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={category.image}
              alt={category.title}
              className={styles.cardBg}
            />
            <div className={styles.cardOverlay}></div>
            <div className={styles.cardInfo}>
              <div className={styles.cardTags}>
                {category.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
              <h3>{category.title}</h3>
              <p>{category.subtitle}</p>
              <span className={styles.viewLink}>View Project →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Categories
