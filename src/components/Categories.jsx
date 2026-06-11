import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Categories.module.css'

gsap.registerPlugin(ScrollTrigger)

const Categories = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const projects = [
    {
      title: 'Review Analyzer',
      subtitle: 'AI-Powered E-Commerce Analysis',
      desc: 'An intelligent system that processes and analyzes customer reviews to extract meaningful insights, sentiment, and product trends.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      link: 'https://e-commerce-review-analysis.vercel.app',
      tags: ['FastAPI', 'React', 'NLP', 'Python'],
      number: '01'
    },
    {
      title: 'Resume Matcher',
      subtitle: 'Smart Job Matching Engine',
      desc: 'A machine learning powered tool that intelligently matches candidate resumes with job descriptions using natural language processing.',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80',
      link: 'https://resume-matching-project.vercel.app/',
      tags: ['Python', 'NLP', 'Machine Learning'],
      number: '02'
    },
    {
      title: 'Backend & APIs',
      subtitle: 'Scalable Architecture',
      desc: 'Various robust backend systems, RESTful APIs, and microservices built with a focus on performance, security, and clean code.',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&q=80',
      link: 'https://github.com/RathodRonakiiitv',
      tags: ['FastAPI', 'PostgreSQL', 'Docker'],
      number: '03'
    },
    {
      title: 'DSA Solutions',
      subtitle: '500+ Problems Solved',
      desc: 'Extensive collection of optimized algorithmic solutions across LeetCode, showcasing strong problem-solving capabilities.',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1200&q=80',
      link: 'https://leetcode.com/u/ronak_2506/',
      tags: ['C++', 'Algorithms', 'Data Structures'],
      number: '04'
    }
  ]

  useEffect(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(`.${styles.headingBlock}`,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.headingBlock}`,
            start: 'top 80%',
          }
        }
      )

      // Stacking effect for cards
      cards.forEach((card, index) => {
        // Entrance animation
        gsap.fromTo(card,
          { opacity: 0, y: 100 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        )

        // Parallax image within card
        const img = card.querySelector(`.${styles.cardImg}`)
        if (img) {
          gsap.fromTo(img,
            { yPercent: -15, scale: 1.1 },
            {
              yPercent: 15, scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          )
        }

        // Scale down effect as next card covers it (except last card)
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1]

          ScrollTrigger.create({
            trigger: nextCard,
            start: 'top bottom',
            end: 'top center',
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress
              const scale = 1 - (progress * 0.05)
              const brightness = 1 - (progress * 0.4)
              const yOffset = progress * -20

              gsap.set(card, {
                scale: scale,
                y: yOffset,
                filter: `brightness(${brightness})`,
              })
            }
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id="projects" ref={sectionRef}>
      <div className={styles.headingBlock}>
        <div className={styles.tagWrapper}>
          <span className={styles.tagLine} />
          <span className={styles.tagText}>Use Cases</span>
        </div>
        <h2 className={styles.title}>
          PERSPECTIVE,
          <br />
          <span className={styles.accent}>PERCEPTION,</span>
          <br />
          FUTURE
        </h2>
      </div>

      <div className={styles.stackContainer}>
        {projects.map((project, index) => (
          <div
            key={index}
            className={styles.stickyCardWrapper}
            style={{ top: `calc(10vh + ${index * 30}px)`, zIndex: index }}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className={styles.card}>
              {/* Image Side */}
              <div className={styles.imageContainer}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.cardImg}
                />
                <div className={styles.imageOverlay} />
                <span className={styles.cardNumber}>{project.number}</span>
              </div>

              {/* Content Side */}
              <div className={styles.contentContainer}>
                <div className={styles.cardInfo}>
                  <div className={styles.tags}>
                    {project.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </div>
                  <h3>{project.title}</h3>
                  <p className={styles.subtitle}>{project.subtitle}</p>
                  <p className={styles.desc}>{project.desc}</p>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.exploreBtn}
                >
                  <span className={styles.btnText}>Explore Details</span>
                  <div className={styles.btnIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories
