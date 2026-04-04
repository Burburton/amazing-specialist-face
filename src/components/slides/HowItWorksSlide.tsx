import { Link } from 'react-router-dom';
import styles from './HowItWorksSlide.module.css';

const FLOW_STEPS = [
  { id: 'spec', title: 'Spec', subtitle: '需求定义', role: 'architect' },
  { id: 'plan', title: 'Plan', subtitle: '方案设计', role: 'architect' },
  { id: 'implement', title: 'Implement', subtitle: '代码实现', role: 'developer' },
  { id: 'test', title: 'Test', subtitle: '验证测试', role: 'tester' },
  { id: 'review', title: 'Review', subtitle: '审查反馈', role: 'reviewer' },
  { id: 'deploy', title: 'Deploy', subtitle: '部署上线', role: 'developer' },
];

export default function HowItWorksSlide() {
  return (
    <section className={styles.slide} aria-label="它怎么工作">
      <h2 className={styles.title}>它怎么工作</h2>

      <div className={styles.flowContainer}>
        <div className={styles.flowSteps}>
          {FLOW_STEPS.map((step, index) => (
            <div key={step.id} className={styles.stepWrapper}>
              <div className={styles.stepCard} tabIndex={0}>
                <span className={styles.stepTitle}>{step.title}</span>
                <span className={styles.stepSubtitle}>{step.subtitle}</span>
              </div>
              {index < FLOW_STEPS.length - 1 && (
                <span className={styles.arrow} aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className={styles.description}>
        从需求定义到部署上线，完整的软件研发闭环
      </p>

      <Link to="/skills" className={styles.cta}>
        浏览技能库 →
      </Link>
    </section>
  );
}