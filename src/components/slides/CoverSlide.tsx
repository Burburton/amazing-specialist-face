import { Link } from 'react-router-dom';
import styles from './CoverSlide.module.css';
import Icon from '../common/Icon';

export default function CoverSlide() {
  return (
    <section className={styles.slide} aria-label="封面">
      {/* Number Badge */}
      <div className={styles.numberBadge}>01</div>

      <div className={styles.content}>
        {/* English Title */}
        <div className={styles.englishTitle}>
          <span className={styles.titleLine}>OPEN</span>
          <span className={styles.titleLine}>CODE</span>
        </div>

        {/* Decorative Line */}
        <div className={styles.decorativeLine} aria-hidden="true" />

        {/* Chinese Title */}
        <h1 className={styles.chineseTitle}>专家包</h1>
        <p className={styles.englishSubtitle}>Expert Pack</p>

        {/* Stats Decoration */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>6</span>
            <span className={styles.statLabel}>ROLES</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>40</span>
            <span className={styles.statLabel}>SKILLS</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>19</span>
            <span className={styles.statLabel}>CONTRACTS</span>
          </div>
        </div>

        {/* Tagline */}
        <p className={styles.tagline}>
          "想象你有一个经验丰富的开发团队，随时帮你设计方案、编写代码、测试验证"
        </p>

        {/* CTA */}
        <Link to="/skills" className={styles.cta}>
          <span className={styles.ctaText}>开始探索</span>
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>

      {/* Scroll Hint */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollText}>SCROLL</span>
        <Icon name="arrow-down" size={16} />
      </div>
    </section>
  );
}