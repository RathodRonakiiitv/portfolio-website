import styles from './Categories.module.css'

const Categories = () => {
  const categories = [
    {
      title: 'Resume Matcher',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
      link: 'https://github.com/RathodRonakiiitv/resume-matching-project'
    },
    {
      title: 'Live Demo',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      link: 'https://resume-matching-project.vercel.app/'
    },
    {
      title: 'Backend & APIs',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
      link: 'https://github.com/RathodRonakiiitv'
    },
    {
      title: 'DSA & Algorithms',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
      link: 'https://github.com/RathodRonakiiitv'
    }
  ]

  return (
    <section className={styles.categoriesSection} id="projects">
      {categories.map((category, index) => (
        <a
          key={index}
          href={category.link}
          className={styles.categoryCard}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={category.image}
            alt={category.title}
            className={styles.categoryThumb}
          />
          <div className={styles.categoryTitle}>{category.title}</div>
        </a>
      ))}
    </section>
  )
}

export default Categories
