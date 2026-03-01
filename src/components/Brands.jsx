import styles from './Brands.module.css'

const Brands = () => {
  const technologies = [
    { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/white' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python/white' },
    { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/white' },
    { name: 'React', icon: 'https://cdn.simpleicons.org/react/white' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/white' },
    { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/white' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/white' },
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git/white' }
  ]

  // Duplicate for seamless infinite scroll
  const marqueeItems = [...technologies, ...technologies]

  return (
    <section className={styles.section}>
      <div className={styles.marqueeTrack}>
        <div className={styles.marquee}>
          {marqueeItems.map((tech, index) => (
            <div key={index} className={styles.item}>
              <img src={tech.icon} alt={tech.name} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands
