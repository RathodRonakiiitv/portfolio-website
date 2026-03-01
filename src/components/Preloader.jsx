import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0)
    const [hiding, setHiding] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setHiding(true)
                        setTimeout(() => onComplete(), 800)
                    }, 300)
                    return 100
                }
                return prev + Math.random() * 15 + 5
            })
        }, 80)

        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <div className={`${styles.preloader} ${hiding ? styles.hide : ''}`}>
            <div className={styles.content}>
                <div className={styles.name}>RR</div>
                <div className={styles.barWrap}>
                    <div className={styles.bar} style={{ width: `${Math.min(progress, 100)}%` }}></div>
                </div>
                <div className={styles.percent}>{Math.min(Math.round(progress), 100)}%</div>
            </div>
        </div>
    )
}

export default Preloader
