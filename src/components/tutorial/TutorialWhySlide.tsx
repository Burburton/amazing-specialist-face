import styles from './TutorialWhySlide.module.css';

const COMPARISONS = [
  { without: '不知道从哪里开始', with: '架构师帮你设计方案', number: '01' },
  { without: '写完不知道对不对', with: '测试员帮你验证', number: '02' },
  { without: '不知道代码质量如何', with: '审查员帮你检查', number: '03' },
  { without: '忘记写文档', with: '文档员帮你记录', number: '04' },
  { without: '担心安全漏洞', with: '安全员帮你把关', number: '05' },
];

export default function TutorialWhySlide() {
  return (
    <section className={styles.slide} aria-label="它能帮你做什么">
      <div className={styles.header}>
        <h2 className={styles.title}>它能帮你做什么？</h2>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <p className={styles.subtitle}>What can it do for you?</p>
      </div>

      <div className={styles.comparisonGrid}>
        {COMPARISONS.map((item) => (
          <div key={item.number} className={styles.comparisonRow}>
            <div className={styles.withoutColumn}>
              <span className={styles.itemNumber}>{item.number}</span>
              <span className={styles.itemText}>{item.without}</span>
            </div>
            <span className={styles.arrow}>→</span>
            <div className={styles.withColumn}>
              <span className={styles.itemText}>{item.with}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>40%</span>
          <span className={styles.statLabel}>TIME SAVED</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>60%</span>
          <span className={styles.statLabel}>FEWER BUGS</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>100%</span>
          <span className={styles.statLabel}>REVIEWED</span>
        </div>
      </div>
    </section>
  );
}