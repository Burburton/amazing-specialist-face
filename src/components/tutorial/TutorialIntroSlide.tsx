import styles from './TutorialIntroSlide.module.css';

const ROLES = [
  { number: '01', label: 'ARCHITECT', name: '架构师', action: '帮你设计方案' },
  { number: '02', label: 'DEVELOPER', name: '开发者', action: '帮你写代码' },
  { number: '03', label: 'TESTER', name: '测试员', action: '帮你写测试' },
  { number: '04', label: 'REVIEWER', name: '审查员', action: '帮你检查代码' },
  { number: '05', label: 'DOCS', name: '文档员', action: '帮你写文档' },
  { number: '06', label: 'SECURITY', name: '安全员', action: '帮你把关安全' },
];

export default function TutorialIntroSlide() {
  return (
    <section className={styles.slide} aria-label="什么是专家包">
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.titleLine}>什么是</span>
          <span className={styles.titleLine}>专家包？</span>
        </div>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <p className={styles.subtitle}>What is Expert Pack?</p>
      </div>

      <p className={styles.quote}>
        "想象你有一个经验丰富的开发团队，随时帮你设计方案、编写代码、测试验证"
      </p>

      <div className={styles.roleGrid}>
        {ROLES.map((role) => (
          <div key={role.number} className={styles.roleCard}>
            <span className={styles.roleNumber}>{role.number}</span>
            <span className={styles.roleLabel}>{role.label}</span>
            <div className={styles.roleLine} aria-hidden="true" />
            <span className={styles.roleName}>{role.name}</span>
            <span className={styles.roleAction}>{role.action}</span>
          </div>
        ))}
      </div>

      <p className={styles.conclusion}>
        专家包就是这样一个 AI 团队！
      </p>
    </section>
  );
}