import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollRef = useRef(null)
  const overlaysRef = useRef(null)

  // Split text into characters for animation
  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="char"
        style={{
          display: 'inline-block',
          perspective: '800px',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Animate name letters with 3D rotate
      tl.fromTo(
        nameRef.current.querySelectorAll('.char'),
        { opacity: 0, y: 100, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.04,
        },
        0.5
      )

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        1.2
      )

      // Animate scroll indicator
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.8 },
        1.8
      )

      // --- Scroll-driven text overlays ---
      // As user scrolls past hero, reveal text overlay blocks
      const overlayItems = overlaysRef.current?.querySelectorAll(
        `.${styles.overlayBlock}`
      )

      if (overlayItems) {
        overlayItems.forEach((overlay, i) => {
          gsap.fromTo(
            overlay,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: overlay,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1,
              },
            }
          )

          // Fade out as user scrolls further
          gsap.to(overlay, {
            opacity: 0,
            y: -40,
            scrollTrigger: {
              trigger: overlay,
              start: 'bottom 40%',
              end: 'bottom 10%',
              scrub: 1,
            },
          })
        })
      }

      // Parallax hero text on scroll
      gsap.to(nameRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(subtitleRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '60% top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.hero} id="origin" ref={heroRef}>
      {/* Aurora Background Elements */}
      <div className={styles.auroraContainer}>
        <div className={styles.auroraOrb1} />
        <div className={styles.auroraOrb2} />
        <div className={styles.auroraOrb3} />
      </div>

      {/* Main hero content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroName} ref={nameRef}>
          <span className={styles.firstName}>{splitText('RONAK')}</span>
          <span className={styles.lastName}>{splitText('RATHOD')}</span>
        </h1>

        <p className={styles.heroSubtitle} ref={subtitleRef}>
          SOFTWARE DEVELOPER BEYOND THE ORDINARY
        </p>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} ref={scrollRef}>
        <div className={styles.scrollLine} />
        <span>scroll to discover</span>
      </div>

      {/* Scroll-driven overlay text blocks */}
      <div className={styles.overlays} ref={overlaysRef}>
        <div className={styles.overlayBlock}>
          <h2>FEEL BEFORE</h2>
          <h2 className={styles.overlayAccent}>YOU CODE</h2>
          <p>
            Building software isn't just logic — it's understanding
            the problem deeply before writing a single line.
          </p>
        </div>

        <div className={`${styles.overlayBlock} ${styles.overlayRight}`}>
          <h2>LOGIC</h2>
          <h2 className={styles.overlayAccent}>WITH GRAVITY</h2>
          <p>
            Grounded in algorithms and system design.
            500+ problems solved. Clean architecture, always.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
