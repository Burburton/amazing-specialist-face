import { Link } from 'react-router-dom';
import styles from './GetStartedSlide.module.css';

const STEPS = [
  { number: '01', title: '浏览技能库', desc: '探索 40 个专业技能' },
  { number: '02', title: '选择技能', desc: '根据任务选择对应技能' },
  { number: '03', title: '查看输入输出', desc: '了解技能的工作方式' },
  { number: '04', title: '开始使用', desc: '填写参数执行任务' },
];

const ENTRY_POINTS = [
  { label: '浏览技能库', path: '/skills' },
  { label: '查看教程', path: '/tutorial' },
  { label: '查看案例', path: '/cases' },
];

export default function GetStartedSlide() {
  return (
    <section className={styles.slide} aria-label="开始使用">
      <div className={styles.numberBadge}>05</div>

      <div className={styles.header}>
        <h2 className={styles.englishTitle}>GET STARTED</h2>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <p className={styles.chineseTitle}>开始使用</p>
      </div>

      <div className={styles.steps}>
        {STEPS.map((step) => (
          <div key={step.number} className={styles.stepItem}>
            <span className={styles.stepNumber}>{step.number}</span>
            <span className={styles.stepTitle}>{step.title}</span>
            <span className={styles.stepDesc}>{step.desc}</span>
          </div>
        ))}
      </div>

      <div className={styles.ctaGroup}>
        {ENTRY_POINTS.map((entry) => (
          <Link key={entry.path} to={entry.path} className={styles.cta}>
            {entry.label}
          </Link>
        ))}
      </div>
    </section>
  );
}