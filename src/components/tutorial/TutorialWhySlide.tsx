import styles from './TutorialWhySlide.module.css';

const COMPARISONS = [
  { without: '不知道从哪里开始', with: '架构师帮你设计方案' },
  { without: '写完不知道对不对', with: '测试员帮你验证' },
  { without: '不知道代码质量如何', with: '审查员帮你检查' },
  { without: '忘记写文档', with: '文档员帮你记录' },
  { without: '担心安全漏洞', with: '安全员帮你把关' },
];

export default function TutorialWhySlide() {
  return (
    <section className={styles.slide} aria-label="它能帮你做什么">
      <div className={styles.content}>
        <h2 className={styles.title}>它能帮你做什么？</h2>
        
        <div className={styles.comparisonContainer}>
          <div className={styles.comparisonColumn}>
            <h3 className={styles.columnTitle}>❌ 没有专家包</h3>
            <div className={styles.items}>
              {COMPARISONS.map((item, index) => (
                <div key={index} className={styles.item}>
                  <span className={styles.itemText}>{item.without}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.arrow}>→</div>
          
          <div className={styles.comparisonColumn}>
            <h3 className={`${styles.columnTitle} ${styles.withTitle}`}>✅ 有专家包</h3>
            <div className={styles.items}>
              {COMPARISONS.map((item, index) => (
                <div key={index} className={`${styles.item} ${styles.withItem}`}>
                  <span className={styles.itemText}>{item.with}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>40%</span>
            <span className={styles.statLabel}>节省开发时间</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>60%</span>
            <span className={styles.statLabel}>减少 Bug</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>100%</span>
            <span className={styles.statLabel}>代码经过审查</span>
          </div>
        </div>
      </div>
    </section>
  );
}