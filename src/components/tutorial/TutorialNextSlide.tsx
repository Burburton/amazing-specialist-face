import { Link } from 'react-router-dom';
import styles from './TutorialNextSlide.module.css';

const LEARNING_PATHS = [
  { number: '01', title: '查看真实案例', description: '了解专家包如何解决实际问题', link: '/cases' },
  { number: '02', title: '深入了解角色', description: '了解 6 个角色各自负责什么', link: '/roles' },
  { number: '03', title: '浏览所有技能', description: '查看 40 个技能的完整列表', link: '/skills' },
  { number: '04', title: '阅读开发文档', description: '了解专家包的设计理念', link: 'https://github.com/Burburton/amazing-specialists' },
];

export default function TutorialNextSlide() {
  return (
    <section className={styles.slide} aria-label="下一步学什么">
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.titleLine}>下一步</span>
          <span className={styles.titleLine}>学什么？</span>
        </div>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <p className={styles.subtitle}>What's next?</p>
      </div>
      
      <div className={styles.pathsGrid}>
        {LEARNING_PATHS.map((path) => (
          path.link.startsWith('http') ? (
            <a
              key={path.number}
              href={path.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pathCard}
            >
              <span className={styles.pathNumber}>{path.number}</span>
              <h3 className={styles.pathTitle}>{path.title}</h3>
              <p className={styles.pathDescription}>{path.description}</p>
              <span className={styles.pathArrow}>→</span>
            </a>
          ) : (
            <Link
              key={path.number}
              to={path.link}
              className={styles.pathCard}
            >
              <span className={styles.pathNumber}>{path.number}</span>
              <h3 className={styles.pathTitle}>{path.title}</h3>
              <p className={styles.pathDescription}>{path.description}</p>
              <span className={styles.pathArrow}>→</span>
            </Link>
          )
        ))}
      </div>
      
      <div className={styles.footer}>
        <p className={styles.footerText}>
          🎉 恭喜你完成教程！现在开始探索专家包吧！
        </p>
        <Link to="/skills" className={styles.footerLink}>
          进入技能库 →
        </Link>
      </div>
    </section>
  );
}