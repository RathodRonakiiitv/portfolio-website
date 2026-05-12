import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Brands from '../components/Brands'
import Carousel from '../components/Carousel'
import About from '../components/About'
import Stats from '../components/Stats'
import Tools from '../components/Tools'
import Categories from '../components/Categories'
import ConnectButton from '../components/ConnectButton'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const mainRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each section with ScrollTrigger
      const sections = gsap.utils.toArray('.reveal')
      sections.forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 50%',
              toggleActions: 'play none none none',
            }
          }
        )
      })

      // Parallax effect for section dividers
      gsap.utils.toArray('.section-divider').forEach((divider) => {
        gsap.fromTo(divider,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: divider,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef}>
      {/* Fixed Video Background — persists across entire page */}
      <div className="video-bg-fixed">
        <video
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4"
            type="video/mp4"
          />
        </video>
        <div className="video-overlay-fixed"></div>
      </div>

      <Navbar />
      <Hero />
      <div className="section-divider" />
      <Brands />
      <div className="section-divider" />
      <div className="reveal">
        <Carousel />
      </div>
      <div className="section-divider" />
      <div className="reveal">
        <About />
      </div>
      <div className="section-divider" />
      <Stats />
      <div className="section-divider" />
      <div className="reveal">
        <Tools />
      </div>
      <div className="section-divider" />
      <div className="reveal">
        <Categories />
      </div>
      <ConnectButton />
      <Footer />
    </div>
  )
}

export default Home
