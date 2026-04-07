import { Link } from 'react-router-dom';
import styles from './GetStartedSlide.module.css';
import Icon from '../common/Icon';
import stats from '../../data/stats.json';

const ENTRY_CARDS = [
  { icon: 'tutorial', title: '新手教程', count: '5 分钟入门', path: '/tutorial' },
  { icon: 'cases', title: '真实案例', count: '4 个案例', path: '/cases' },
  { icon: 'skills', title: '技能库', count: `${stats.totalSkills} 个技能`, path: '/skills' },
  { icon: 'roles', title: '角色分工', count: `${stats.totalRoles} 个角色`, path: '/roles' },
];

export default function GetStartedSlide() {
  return (
    <section className={styles.slide} aria-label="开始使用">
      <h2 className={styles.title}>开始使用</h2>

      <div className={styles.cards}>
        {ENTRY_CARDS.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            className={styles.card}
          >
            <span className={styles.icon}><Icon name={card.icon as 'tutorial' | 'cases' | 'skills' | 'roles'} size={32} label={card.title} /></span>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardCount}>{card.count}</p>
            <span className={styles.cardArrow}><Icon name="arrow-right" size={16} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}