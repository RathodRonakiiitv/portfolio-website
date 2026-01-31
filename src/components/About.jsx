import styles from './About.module.css'

const About = () => {
  return (
    <section className={styles.profileAboutSection} id="about">
      <div className={styles.aboutDetails}>
        <h3>Education</h3>
        <ul>
          <li>IIIT Vadodara — B.Tech CSE</li>
          <li>Expected Graduation: 2028</li>
          <li>📍 India</li>
        </ul>

        <h3>Experience</h3>
        <p>
          2+ years of project-based development<br />
          Backend systems & APIs with Python/FastAPI<br />
          DSA problem solving with C++
        </p>

        <h3>Focus Areas</h3>
        <p>Backend Engineering • DSA • System Design</p>
      </div>

      <div className={styles.profileImageContainer}>
        <img src="https://cdn.simpleicons.org/codersrank/ffffff" alt="Developer Icon" />
      </div>

      <div className={`${styles.aboutDetails} ${styles.aboutRight}`}>
        <h3>Languages</h3>
        <ul>
          <li>C++</li>
          <li>Python</li>
          <li>SQL</li>
        </ul>

        <h3>Concepts</h3>
        <p>DSA • DBMS • OOP • REST APIs</p>

        <h3>Contact</h3>
        <p>
          <a href="mailto:rathodronakiiitv@gmail.com">rathodronakiiitv@gmail.com</a>
        </p>

        <h3>Interests</h3>
        <p>Problem Solving • Open Source</p>
      </div>
    </section>
  )
}

export default About
