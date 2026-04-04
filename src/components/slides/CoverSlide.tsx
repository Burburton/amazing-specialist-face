import { Link } from 'react-router-dom';
import styles from './CoverSlide.module.css';

export default function CoverSlide() {
  return (
    <section className={styles.slide} aria-label="封面">
      <div className={styles.content}>
        <h1 className={styles.logo}>
          <span className={styles.logoText}>OpenCode</span>
          <span className={styles.logoSubtext}>专家包</span>
        </h1>
        
        <div className={styles.divider} aria-hidden="true" />
        
        <p className={styles.tagline}>全自动产品研发闭环执行层</p>
        
        <p className={styles.description}>
          极客 · 专业 · 可靠
        </p>

        <Link to="/skills" className={styles.cta}>
          开始探索
        </Link>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollText}>↓ 滚动继续</span>
      </div>
    </section>
  );
}