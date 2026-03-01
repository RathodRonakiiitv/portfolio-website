import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Stats.module.css'

gsap.registerPlugin(ScrollTrigger)

const Stats = () => {
    const sectionRef = useRef(null)
    const [counts, setCounts] = useState([0, 0])

    const stats = [
        { value: 500, suffix: '+', label: 'DSA Problems Solved' },
        { value: 2, suffix: '+', label: 'Years Experience' }
    ]

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
                onEnter: () => {
                    stats.forEach((stat, index) => {
                        gsap.to({ val: 0 }, {
                            val: stat.value,
                            duration: 2,
                            ease: 'power2.out',
                            onUpdate: function () {
                                setCounts(prev => {
                                    const next = [...prev]
                                    next[index] = Math.round(this.targets()[0].val)
                                    return next
                                })
                            }
                        })
                    })
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.grid}>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statItem}>
                        <div className={styles.number}>
                            {counts[index]}{stat.suffix}
                        </div>
                        <div className={styles.label}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Stats
