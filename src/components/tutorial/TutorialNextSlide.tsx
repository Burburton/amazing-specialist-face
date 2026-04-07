import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import styles from './TutorialNextSlide.module.css';

const LEARNING_PATHS = [
  { 
    icon: 'cases', 
    title: '查看真实案例', 
    description: '了解专家包如何解决实际问题',
    link: '/cases'
  },
  { 
    icon: 'roles', 
    title: '深入了解角色', 
    description: '了解 6 个角色各自负责什么',
    link: '/roles'
  },
  { 
    icon: 'skills', 
    title: '浏览所有技能', 
    description: '查看 40 个技能的完整列表',
    link: '/skills'
  },
  { 
    icon: 'github', 
    title: '阅读开发文档', 
    description: '了解专家包的设计理念',
    link: 'https://github.com/Burburton/amazing-specialists'
  },
];

export default function TutorialNextSlide() {
  return (
    <section className={styles.slide} aria-label="下一步学什么">
      <div className={styles.content}>
        <h2 className={styles.title}>下一步学什么？</h2>
        
        <div className={styles.pathsGrid}>
          {LEARNING_PATHS.map((path) => (
            path.link.startsWith('http') ? (
              <a
                key={path.title}
                href={path.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pathCard}
              >
                <span className={styles.pathIcon}><Icon name={path.icon as 'cases' | 'roles' | 'skills' | 'github'} size={32} /></span>
                <h3 className={styles.pathTitle}>{path.title}</h3>
                <p className={styles.pathDescription}>{path.description}</p>
                <span className={styles.pathArrow}><Icon name="arrow-right" size={16} /></span>
              </a>
            ) : (
              <Link
                key={path.title}
                to={path.link}
                className={styles.pathCard}
              >
                <span className={styles.pathIcon}><Icon name={path.icon as 'cases' | 'roles' | 'skills' | 'github'} size={32} /></span>
                <h3 className={styles.pathTitle}>{path.title}</h3>
                <p className={styles.pathDescription}>{path.description}</p>
                <span className={styles.pathArrow}><Icon name="arrow-right" size={16} /></span>
              </Link>
            )
          ))}
        </div>
        
        <div className={styles.footer}>
          <p className={styles.footerText}>
            🎉 恭喜你完成教程！现在开始探索专家包吧！
          </p>
          <Link to="/skills" className={styles.footerLink}>
            进入技能库 <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}