import { useEffect, useRef } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    
    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const handleMouseEnter = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.8)'
    }

    const handleMouseLeave = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    document.addEventListener('mousemove', moveCursor)
    
    const interactiveElements = document.querySelectorAll('a, button')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return <div className="custom-cursor" ref={cursorRef}></div>
}

export default CustomCursor
