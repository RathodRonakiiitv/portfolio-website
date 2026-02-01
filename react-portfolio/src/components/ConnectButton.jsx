import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import styles from './ConnectButton.module.css'

const ConnectButton = () => {
  const containerRef = useRef(null)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const width = container.clientWidth
    const height = container.clientHeight
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 2)
    pointLight.position.set(2, 3, 4)
    scene.add(pointLight)

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0,
      metalness: 0.1,
      transmission: 0.95,
      thickness: 0.5,
      ior: 1.5,
      opacity: 0.8,
      transparent: true,
      clearcoat: 1
    })

    const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const animate = () => {
      requestAnimationFrame(animate)
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.015
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      container.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    // Show popup after 3 seconds, then every 30 seconds
    const initialTimeout = setTimeout(() => {
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 5000)

      const interval = setInterval(() => {
        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 5000)
      }, 30000)

      return () => clearInterval(interval)
    }, 3000)

    return () => clearTimeout(initialTimeout)
  }, [])

  return (
    <>
      <Link to="/contact" className={styles.glassButtonContainer} ref={containerRef}>
        <span className={styles.glassButtonText}>Connect</span>
      </Link>

      <div className={`${styles.glassPopup} ${showPopup ? styles.show : ''}`}>
        <div className={styles.popupContent}>
          <p>
            Check out my projects on{' '}
            <a href="https://github.com/RathodRonakiiitv" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            !
          </p>
          <button className={styles.closePopup} onClick={() => setShowPopup(false)}>
            ×
          </button>
        </div>
      </div>
    </>
  )
}

export default ConnectButton
