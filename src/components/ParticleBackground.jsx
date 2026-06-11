import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ParticleBackground = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // --- Setup ---
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 50

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // --- Particle System ---
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 800 : 2000
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const colors = new Float32Array(particleCount * 3)

    const colorPalette = [
      new THREE.Color(0x00d4ff), // accent cyan
      new THREE.Color(0x5ae8ff), // light cyan
      new THREE.Color(0x3adf7f), // teal green
      new THREE.Color(0x1a6b3c), // dark teal
      new THREE.Color(0x7a8fa8), // muted blue-gray
    ]

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Spread particles in a sphere/cloud formation
      const radius = 40 + Math.random() * 60
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi) - 30

      // Slow drift velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01

      sizes[i] = Math.random() * 2.5 + 0.5

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Custom shader material for glowing particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uScrollProgress;

        void main() {
          vColor = color;
          vec3 pos = position;

          // Gentle floating motion
          pos.x += sin(uTime * 0.3 + position.y * 0.05) * 0.5;
          pos.y += cos(uTime * 0.2 + position.x * 0.05) * 0.5;
          pos.z += sin(uTime * 0.15 + position.z * 0.03) * 0.3;

          // Scroll parallax depth
          pos.z += uScrollProgress * 15.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          // Distance-based alpha
          float dist = length(mvPosition.xyz);
          vAlpha = clamp(1.0 - dist / 120.0, 0.05, 0.8);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Soft circular particle
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // --- Geometric accent: a slow-rotating wireframe icosahedron ---
    const icoGeom = new THREE.IcosahedronGeometry(8, 1)
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    })
    const ico = new THREE.Mesh(icoGeom, icoMat)
    ico.position.set(0, 0, -10)
    scene.add(ico)

    // --- Mouse tracking ---
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // --- Scroll tracking ---
    let scrollProgress = 0
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // --- Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // --- Animation Loop ---
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      material.uniforms.uTime.value = elapsed
      material.uniforms.uScrollProgress.value = scrollProgress

      // Subtle camera movement following mouse
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      // Rotate icosahedron
      ico.rotation.x = elapsed * 0.05
      ico.rotation.y = elapsed * 0.08

      // Slowly rotate entire particle system
      particles.rotation.y = elapsed * 0.02

      renderer.render(scene, camera)
    }
    animate()

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)

      geometry.dispose()
      material.dispose()
      icoGeom.dispose()
      icoMat.dispose()
      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="particle-bg-fixed" ref={containerRef}>
      <div className="particle-overlay" />
    </div>
  )
}

export default ParticleBackground
