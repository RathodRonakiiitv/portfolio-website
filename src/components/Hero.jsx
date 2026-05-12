import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Hero.module.css'

const Hero = () => {
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const subtitleRef = useRef(null)
  const servicesRef = useRef(null)
  const rightRef = useRef(null)

  const services = [
    {
      name: 'Backend Dev',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      name: 'DSA',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      )
    },
    {
      name: 'Databases',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      )
    },
    {
      name: 'REST APIs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6m-7-7h6m6 0h6"></path>
        </svg>
      )
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Animate name letters
      tl.fromTo(nameRef.current.querySelectorAll('.char'),
        { opacity: 0, y: 80, rotateX: -90 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.06 },
        0.3
      )

      // Animate subtitle
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      )

      // Animate service items
      tl.fromTo(servicesRef.current.querySelectorAll(`.${styles.serviceItem}`),
        { opacity: 0, y: 40, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
        1
      )

      // Animate right section
      tl.fromTo(rightRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1 },
        0.6
      )

      // Floating animation for service icons
      gsap.utils.toArray(`.${styles.serviceIcon}`).forEach((icon, i) => {
        gsap.to(icon, {
          y: -8,
          duration: 2 + i * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.2
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Split text into characters for animation
  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section className={styles.heroSection} id="home" ref={heroRef}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={styles.badge}>Available for opportunities</div>
          <h1 ref={nameRef}>
            <span className={styles.firstName}>{splitText('Ronak')}</span>
            <br />
            <span className={styles.lastName}>{splitText('Rathod')}</span>
          </h1>

          <div className={styles.services} ref={servicesRef}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceItem}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <div className={styles.serviceName}>{service.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroRight} ref={rightRef}>
          {/* Profile Photo */}
          <div className={styles.photoContainer}>
            <img src="/images/profile.jpg" alt="Ronak Rathod" className={styles.profilePhoto} />
          </div>
          <h3 ref={subtitleRef}>Software Developer | Problem Solver | Turning Ideas into Scalable Code</h3>
          <p className="ttcommons">
            I'm a passionate Software Developer and CS student who enjoys solving problems and building reliable,
            logic-driven applications. I focus on backend development, databases, and algorithms — turning complex
            ideas into clean, working code.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine}></div>
        <span>scroll</span>
      </div>
    </section>
  )
}

export default Hero
