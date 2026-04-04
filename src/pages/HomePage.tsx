import styles from './HomePage.module.css';
import stats from '../data/stats.json';
import WorkflowDiagram from '../components/diagrams/WorkflowDiagram';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>OpenCode 专家包</h1>
        <p className={styles.heroSubtitle}>全自动产品研发闭环执行层</p>
        <p className={styles.heroDescription}>
          {stats.totalRoles} 个核心角色 · {stats.totalSkills} 个专业技能 · {stats.totalContracts} 个 Artifact Contracts
        </p>
        <div className={styles.heroHighlights}>
          <span className={styles.highlight}>MVP Skills: {stats.mvpSkills}</span>
          <span className={styles.highlight}>M4 Skills: {stats.m4Skills}</span>
          <span className={styles.highlight}>Commands: {stats.totalCommands}</span>
        </div>
      </section>

      <section className={styles.stats}>
        <h2 className={styles.sectionTitle}>核心能力统计</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.totalSkills}</div>
            <div className={styles.statLabel}>专业技能</div>
            <div className={styles.statDesc}>覆盖开发、测试、安全等全流程</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.totalRoles}</div>
            <div className={styles.statLabel}>核心角色</div>
            <div className={styles.statDesc}>Architect, Developer, Tester 等</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.totalContracts}</div>
            <div className={styles.statLabel}>Artifact Contracts</div>
            <div className={styles.statDesc}>标准化交付物契约</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{stats.totalCommands}</div>
            <div className={styles.statLabel}>核心命令</div>
            <div className={styles.statDesc}>/spec-start, /spec-plan 等</div>
          </div>
        </div>
      </section>

      <section className={styles.workflow}>
        <h2 className={styles.sectionTitle}>六角色协作流程</h2>
        <p className={styles.sectionDesc}>
          专家包采用 6-role 正式执行层语义，各角色分工明确、协作紧密
        </p>
        <WorkflowDiagram />
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>已交付功能</h2>
        <div className={styles.featuresContent}>
          <div className={styles.featuresCount}>
            <span className={styles.featuresNumber}>{stats.totalFeatures}</span>
            <span className={styles.featuresLabel}>Features Delivered</span>
          </div>
          <ul className={styles.featuresList}>
            <li>Platform Adapter 跨平台适配</li>
            <li>GitHub Issue Workflow 集成</li>
            <li>6-role Skill Pack 完整体系</li>
            <li>Artifact Contracts 标准化</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
