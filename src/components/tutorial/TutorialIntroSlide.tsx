import styles from './TutorialIntroSlide.module.css';

export default function TutorialIntroSlide() {
  return (
    <section className={styles.slide} aria-label="什么是专家包">
      <div className={styles.content}>
        <h2 className={styles.title}>什么是 OpenCode 专家包？</h2>
        
        <div className={styles.analogy}>
          <p className={styles.analogyText}>
            想象你有一个经验丰富的开发团队，随时帮你：
          </p>
          
          <div className={styles.roleGrid}>
            <div className={styles.roleItem}>
              <span className={styles.roleEmoji}>🏗️</span>
              <span className={styles.roleName}>架构师</span>
              <span className={styles.roleAction}>帮你设计方案</span>
            </div>
            <div className={styles.roleItem}>
              <span className={styles.roleEmoji}>💻</span>
              <span className={styles.roleName}>开发者</span>
              <span className={styles.roleAction}>帮你写代码</span>
            </div>
            <div className={styles.roleItem}>
              <span className={styles.roleEmoji}>🧪</span>
              <span className={styles.roleName}>测试员</span>
              <span className={styles.roleAction}>帮你写测试</span>
            </div>
            <div className={styles.roleItem}>
              <span className={styles.roleEmoji}>✅</span>
              <span className={styles.roleName}>审查员</span>
              <span className={styles.roleAction}>帮你检查代码</span>
            </div>
            <div className={styles.roleItem}>
              <span className={styles.roleEmoji}>📚</span>
              <span className={styles.roleName}>文档员</span>
              <span className={styles.roleAction}>帮你写文档</span>
            </div>
            <div className={styles.roleItem}>
              <span className={styles.roleEmoji}>🔒</span>
              <span className={styles.roleName}>安全员</span>
              <span className={styles.roleAction}>帮你把关安全</span>
            </div>
          </div>
          
          <p className={styles.conclusion}>
            <strong>专家包就是这样一个 AI 团队！</strong>
          </p>
        </div>
      </div>
    </section>
  );
}