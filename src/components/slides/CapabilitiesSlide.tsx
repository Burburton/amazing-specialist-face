import { Link } from 'react-router-dom';
import styles from './CapabilitiesSlide.module.css';
import stats from '../../data/stats.json';

export default function CapabilitiesSlide() {
  return (
    <section className={styles.slide} aria-label="能力统计">
      <div className={styles.heroStat}>
        <span className={styles.heroValue}>{stats.totalSkills}</span>
        <span className={styles.heroLabel}>专业技能</span>
        <span className={styles.heroDesc}>覆盖开发、测试、安全等全流程</span>
      </div>

      <div className={styles.subStats}>
        <div className={styles.subStat}>
          <span className={styles.subValue}>{stats.totalRoles}</span>
          <span className={styles.subLabel}>核心角色</span>
        </div>
        <div className={styles.subStat}>
          <span className={styles.subValue}>{stats.totalContracts}</span>
          <span className={styles.subLabel}>Artifact 契约</span>
        </div>
        <div className={styles.subStat}>
          <span className={styles.subValue}>{stats.totalCommands}</span>
          <span className={styles.subLabel}>核心命令</span>
        </div>
      </div>

      <Link to="/skills" className={styles.cta}>
        浏览技能库 →
      </Link>
    </section>
  );
}