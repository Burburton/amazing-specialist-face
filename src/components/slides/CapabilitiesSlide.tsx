import { Link } from 'react-router-dom';
import styles from './CapabilitiesSlide.module.css';
import Icon from '../common/Icon';

const CAPABILITIES = [
  { number: '40', label: 'SKILLS', desc: '6 个角色 × 专业技能' },
  { number: '19', label: 'CONTRACTS', desc: '标准化输入输出契约' },
  { number: '5', label: 'COMMANDS', desc: '规范化执行命令' },
  { number: '100%', label: 'TRACEABLE', desc: '从需求到代码可追溯' },
];

export default function CapabilitiesSlide() {
  return (
    <section className={styles.slide} aria-label="能力统计">
      <div className={styles.numberBadge}>04</div>

      <div className={styles.header}>
        <h2 className={styles.englishTitle}>CAPABILITIES</h2>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <p className={styles.chineseTitle}>核心能力</p>
      </div>

      <div className={styles.grid}>
        {CAPABILITIES.map((cap) => (
          <div key={cap.label} className={styles.card}>
            <span className={styles.cardNumber}>{cap.number}</span>
            <span className={styles.cardLabel}>{cap.label}</span>
            <div className={styles.cardLine} aria-hidden="true" />
            <p className={styles.cardDesc}>{cap.desc}</p>
          </div>
        ))}
      </div>

      <Link to="/skills" className={styles.cta}>
        <span className={styles.ctaText}>浏览技能库</span>
        <Icon name="arrow-right" size={16} />
      </Link>
    </section>
  );
}