import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './Contact.module.css'

const Contact = () => {
  const fluidContainerRef = useRef(null)

  useEffect(() => {
    const container = fluidContainerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const width = container.clientWidth
    const height = container.clientHeight
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 3)
    dirLight.position.set(2, 5, 5)
    scene.add(dirLight)

    const pointLight = new THREE.PointLight(0xffffff, 2)
    pointLight.position.set(-2, -2, 5)
    scene.add(pointLight)

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0,
      transmission: 1,
      thickness: 5,
      ior: 1.15,
      clearcoat: 1,
      clearcoatRoughness: 0
    })

    const geometry = new THREE.TorusKnotGeometry(2.1, 0.7, 100, 16)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const animate = () => {
      requestAnimationFrame(animate)
      mesh.rotation.x += 0.005
      mesh.rotation.y += 0.005
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.gridContainer}>
        {/* Header Bar */}
        <div className={styles.headerBar}>
          <Link to="/" className={styles.backLink}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
        </div>

        {/* Hero Title */}
        <div className={styles.heroTitle}>
          <h1>Let's Connect</h1>
        </div>

        {/* Name Card */}
        <div className={styles.detailCard}>
          <div className={styles.labelRow}>
            <span>Name</span>
            <span className={styles.arrow}>→</span>
          </div>
          <div className={styles.contentMain}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 9.6H22L15.8 14.4L18.2 22L12 17.2L5.8 22L8.2 14.4L2 9.6H9.6L12 2Z" />
            </svg>
            <p className={styles.detailText} style={{ fontSize: '1.43rem' }}>
              Ronak Rathod
            </p>
          </div>
        </div>

        {/* Email Card */}
        <div className={styles.detailCard}>
          <div className={styles.labelRow}>
            <span>Email</span>
            <span className={styles.arrow}>→</span>
          </div>
          <div className={styles.contentMain}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <a
              href="mailto:rathodronakiiitv@gmail.com"
              className={styles.detailText}
              style={{ fontSize: '0.9rem', wordBreak: 'break-all', textDecoration: 'none' }}
            >
              rathodronakiiitv@gmail.com
            </a>
            <p className={styles.subText}>
              For professional correspondence, kindly reach out via email.
            </p>
          </div>
        </div>

        {/* Status Card */}
        <div className={styles.detailCard}>
          <div className={styles.labelRow}>
            <span>Status</span>
            <span className={styles.arrow}>→</span>
          </div>
          <div className={styles.contentMain}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="5" height="5"></rect>
              <rect x="9.5" y="3" width="5" height="5"></rect>
              <rect x="16" y="3" width="5" height="5"></rect>
              <rect x="3" y="9.5" width="5" height="5"></rect>
              <rect x="9.5" y="9.5" width="5" height="5"></rect>
              <rect x="16" y="9.5" width="5" height="5"></rect>
              <rect x="3" y="16" width="5" height="5"></rect>
              <rect x="9.5" y="16" width="5" height="5"></rect>
              <rect x="16" y="16" width="5" height="5"></rect>
            </svg>
            <p className={styles.detailText}>Open to Opportunities</p>
            <p className={styles.subText}>
              Currently seeking internship and full-time opportunities.
            </p>
          </div>
        </div>

        {/* Location Card */}
        <div className={styles.detailCard}>
          <div className={styles.labelRow}>
            <span>Location</span>
            <span className={styles.arrow}>→</span>
          </div>
          <div className={styles.contentMain}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <p className={styles.subText} style={{ marginTop: '2rem' }}>
              IIIT Vadodara, Gujarat, India
            </p>
          </div>
        </div>

        {/* Socials */}
        <div className={`${styles.gridItem} ${styles.bottomLeft}`}>
          <span className={styles.sectionTitle}>SOCIALS</span>
          <div className={styles.socialList}>
            <span style={{ fontSize: '0.6rem', color: '#888', marginBottom: '0.5rem' }}>
              JANUARY 2026
            </span>
            <a
              href="https://www.linkedin.com/in/ronak-rathod-5a47a2325/"
              className={styles.socialLink}
            >
              LINKEDIN: <span>/ronak-rathod</span>
            </a>
            <a href="https://github.com/RathodRonakiiitv" className={styles.socialLink}>
              GITHUB: <span>/RathodRonakiiitv</span>
            </a>
            <a href="https://leetcode.com/u/ronak_2506/" className={styles.socialLink}>
              LEETCODE: <span>/ronak_2506</span>
            </a>
            <a href="mailto:rathodronakiiitv@gmail.com" className={styles.socialLink}>
              EMAIL: <span>rathodronakiiitv@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Right */}
        <div className={`${styles.gridItem} ${styles.bottomRight}`}>
          <div style={{ maxWidth: '200px' }}>
            <p className={styles.sectionTitle} style={{ marginBottom: '0.5rem' }}>
              Currently
            </p>
            <p style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>
              B.Tech CSE @ IIIT Vadodara
            </p>
          </div>

          <div className={styles.addressBlock}>
            <p
              style={{
                fontSize: '0.6rem',
                textAlign: 'right',
                marginBottom: '0.5rem',
                color: '#888'
              }}
            >
              2024 - 2028
            </p>
            <div className={styles.serifDisplay}>
              Building <br />
              Scalable Code
            </div>
            <div className={styles.creditRow}>
              <span>
                Designed by
                <br />
                Ronak Rathod
              </span>
              <span>Problem Solver</span>
            </div>
          </div>

          {/* Fluid Glass Container */}
          <div className={styles.fluidGlassContainer} ref={fluidContainerRef}></div>
        </div>
      </div>
    </div>
  )
}

export default Contact
