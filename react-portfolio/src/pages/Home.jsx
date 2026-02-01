import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Brands from '../components/Brands'
import Carousel from '../components/Carousel'
import About from '../components/About'
import Tools from '../components/Tools'
import Categories from '../components/Categories'
import ConnectButton from '../components/ConnectButton'
import Footer from '../components/Footer'

const Home = () => {
  useEffect(() => {
    // Reveal animation observer
    const revealElements = document.querySelectorAll('.reveal')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <>
      <section className="reveal">
        <Navbar />
        <Hero />
      </section>
      <Brands />
      <div className="reveal">
        <Carousel />
      </div>
      <div className="reveal">
        <About />
      </div>
      <div className="reveal">
        <Tools />
      </div>
      <div className="reveal">
        <Categories />
      </div>
      <ConnectButton />
      <Footer />
    </>
  )
}

export default Home
