import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading → reveal → exit

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setPhase('reveal')
            setTimeout(() => {
              setPhase('exit')
              setTimeout(() => onComplete(), 1000)
            }, 600)
          }, 400)
          return 100
        }
        return prev + Math.random() * 12 + 4
      })
    }, 60)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`${styles.preloader} ${styles[phase]}`}>
      {/* Split panels for exit animation */}
      <div className={styles.splitTop} />
      <div className={styles.splitBottom} />

      <div className={styles.content}>
        {/* Pulsing ring */}
        <div className={styles.ring}>
          <svg viewBox="0 0 100 100" className={styles.ringSvg}>
            <circle
              cx="50" cy="50" r="45"
              className={styles.ringTrack}
            />
            <circle
              cx="50" cy="50" r="45"
              className={styles.ringProgress}
              style={{
                strokeDashoffset: 283 - (283 * Math.min(progress, 100) / 100)
              }}
            />
          </svg>
          <div className={styles.initials}>RR</div>
        </div>

        {/* Progress text */}
        <div className={styles.progressInfo}>
          <span className={styles.progressNum}>
            {String(Math.min(Math.round(progress), 100)).padStart(3, '0')}
          </span>
          <span className={styles.progressLabel}>LOADING</span>
        </div>
      </div>
    </div>
  )
}

export default Preloader
