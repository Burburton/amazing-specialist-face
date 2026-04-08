import { Link } from 'react-router-dom';
import styles from './HowItWorksSlide.module.css';
import Icon from '../common/Icon';

const WORKFLOW_STEPS = [
  { number: '01', label: 'DESIGN', name: '需求设计', role: 'architect' },
  { number: '02', label: 'CODE', name: '代码实现', role: 'developer' },
  { number: '03', label: 'TEST', name: '测试验证', role: 'tester' },
  { number: '04', label: 'REVIEW', name: '代码审查', role: 'reviewer' },
  { number: '05', label: 'SECURE', name: '安全审计', role: 'security' },
  { number: '06', label: 'DOCS', name: '文档编写', role: 'docs' },
];

export default function HowItWorksSlide() {
  return (
    <section className={styles.slide} aria-label="它怎么工作">
      <div className={styles.numberBadge}>03</div>

      <div className={styles.header}>
        <div className={styles.titleRow}>
          <span className={styles.titleLine}>HOW IT</span>
          <span className={styles.titleLine}>WORKS</span>
        </div>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <p className={styles.chineseTitle}>工作流程</p>
      </div>

      <div className={styles.workflow}>
        <div className={styles.workflowRow}>
          {WORKFLOW_STEPS.slice(0, 3).map((step, index) => (
            <div key={step.number} className={styles.stepWrapper}>
              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.number}</span>
                <span className={styles.stepLabel}>{step.label}</span>
                <span className={styles.stepName}>{step.name}</span>
              </div>
              {index < 2 && <span className={styles.arrow}>→</span>}
            </div>
          ))}
        </div>

        <div className={styles.connector} aria-hidden="true">
          <div className={styles.connectorLine} />
        </div>

        <div className={styles.workflowRow}>
          {WORKFLOW_STEPS.slice(3, 6).map((step, index) => (
            <div key={step.number} className={styles.stepWrapper}>
              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.number}</span>
                <span className={styles.stepLabel}>{step.label}</span>
                <span className={styles.stepName}>{step.name}</span>
              </div>
              {index < 2 && <span className={styles.arrow}>→</span>}
            </div>
          ))}
        </div>
      </div>

      <Link to="/skills" className={styles.cta}>
        <span className={styles.ctaText}>浏览技能库</span>
        <Icon name="arrow-right" size={16} />
      </Link>
    </section>
  );
}