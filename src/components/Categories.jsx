import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Categories.module.css'

gsap.registerPlugin(ScrollTrigger)

const Categories = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  const categories = [
    {
      title: 'Review Analyzer',
      subtitle: 'AI-Powered Analysis',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      link: 'https://e-commerce-review-analysis.vercel.app',
      tags: ['FastAPI', 'React', 'NLP'],
      number: '01'
    },
    {
      title: 'Resume Matcher',
      subtitle: 'Smart Job Matching',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
      link: 'https://resume-matching-project.vercel.app/',
      tags: ['Python', 'NLP', 'ML'],
      number: '02'
    },
    {
      title: 'Backend & APIs',
      subtitle: 'Scalable Systems',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
      link: 'https://github.com/RathodRonakiiitv',
      tags: ['FastAPI', 'PostgreSQL'],
      number: '03'
    },
    {
      title: 'DSA & Algorithms',
      subtitle: '500+ Problems Solved',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
      link: 'https://leetcode.com/u/ronak_2506/',
      tags: ['C++', 'Algorithms'],
      number: '04'
    }
  ]

  useEffect(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    const ctx = gsap.context(() => {
      // For each card except the last, animate scale-down and brightness
      // as the NEXT card scrolls over it
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return // last card doesn't shrink

        const nextCard = cards[index + 1]

        ScrollTrigger.create({
          trigger: nextCard,
          start: 'top bottom',
          end: 'top center',
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress
            // Scale down the card as the next one covers it
            const scale = 1 - (progress * 0.05)
            const brightness = 1 - (progress * 0.4)
            const borderOpacity = progress * 0.3

            gsap.set(card, {
              scale: scale,
              filter: `brightness(${brightness})`,
              borderColor: `rgba(0, 212, 255, ${borderOpacity})`,
            })
          }
        })
      })

      // Entrance animation — stagger cards sliding up
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        )
      })
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
        <p className={styles.sectionSubtitle}>
          Scroll through my featured work — each card stacks as you explore
        </p>
      </div>

      <div className={styles.stackContainer}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={styles.stickyCardWrapper}
            style={{ top: `${80 + index * 40}px` }}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <a
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

              {/* Card number watermark */}
              <span className={styles.cardNumber}>{category.number}</span>

              <div className={styles.cardInfo}>
                <div className={styles.cardTags}>
                  {category.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
                <h3>{category.title}</h3>
                <p>{category.subtitle}</p>
                <span className={styles.viewLink}>
                  View Project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories
