import styles from './Tools.module.css'

const Tools = () => {
  const tools = [
    { name: 'C++', icon: 'https://cdn.simpleicons.org/cplusplus' },
    { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
    { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi' },
    { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql' },
    { name: 'Git', icon: 'https://cdn.simpleicons.org/git' },
    { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/white' },
    { name: 'Linux', icon: 'https://cdn.simpleicons.org/linux/white' }
  ]

  return (
    <section className={styles.toolsSection}>
      <div className={styles.toolsContainer}>
        <div className={styles.toolsLeft}>
          <div className={styles.toolsTitle}>Technical Stack</div>
          <div className={styles.toolsGrid}>
            {tools.map((tool, index) => (
              <div key={index} className={styles.toolItem}>
                <img src={tool.icon} alt={tool.name} className={styles.toolIcon} />
                <span className={styles.toolName}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.toolsRight}>
          <p className={styles.toolsDescription}>
            I leverage <b>modern backend frameworks</b> and <b>robust database systems</b> 
            to build high-performance, scalable applications with a focus on clean architecture and algorithmic efficiency.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Tools
