import styles from './Brands.module.css'

const Brands = () => {
  const technologies = [
    { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus/white' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python/white' },
    { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/white' },
    { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/white' },
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git/white' }
  ]

  return (
    <section className={styles.brandsSection}>
      <div className={styles.brandsTitle}>Core Technologies</div>
      <div className={styles.brandsGrid}>
        {technologies.map((tech, index) => (
          <div key={index} className={styles.brandItem}>
            <img className={styles.brandLogo} src={tech.icon} alt={tech.name} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Brands
