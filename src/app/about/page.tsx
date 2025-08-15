import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.authorInfo}>
        <h3>Maria Parinova</h3>
        <p className={styles.description}>
          Junior Frontend Developer with solid web development fundamentals and English proficiency. Skilled in building
          responsive interfaces and single-page applications using React. Familiar with Jest testing and basic UX/UI
          design principles. Eager to grow professionally and contribute to a collaborative team.
        </p>
      </div>
      <div>
        <p className={styles.description}>
          This project is part of the{' '}
          <a href="https://rs.school/courses/reactjs" target="_blank" rel="noopener noreferrer">
            React course
          </a>{' '}
          from The Rolling Scopes School — an open, community-driven educational program for self-motivated learners.
          The course covers the fundamentals and advanced concepts of React, including hooks, routing, state management,
          testing, Next.js, and more. It’s fully free and open-source, with a focus on hands-on practice and teamwork.
          <br />
          This page was created as part of my learning journey — and there’s more to come!
        </p>
      </div>
    </div>
  );
}
