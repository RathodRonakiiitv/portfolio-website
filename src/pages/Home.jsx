import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import ParticleBackground from '../components/ParticleBackground'
import Navbar from '../components/Navbar'
import LateralNav from '../components/LateralNav'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Categories from '../components/Categories'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const mainRef = useRef(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Handle routing to sections
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else if (pathname === '/contact') {
      setTimeout(() => {
        const element = document.getElementById('contact')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General fade up for un-animated sections
      const revealSections = gsap.utils.toArray('.reveal-up')
      revealSections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef}>
      {/* Immersive Background */}
      <ParticleBackground />

      {/* Navigation Layer */}
      <Navbar />
      <LateralNav />

      {/* Main Content Flow - Seamless Sidewave Style */}
      <main>
        <Hero />
        <About />
        <Services />
        <Categories />
      </main>

      {/* Footer / Contact */}
      <Footer />
    </div>
  )
}

export default Home
