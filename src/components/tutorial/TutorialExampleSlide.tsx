import { Link } from 'react-router-dom';
import styles from './TutorialExampleSlide.module.css';

const STEPS = [
  { step: 1, keyword: 'DESIGN', title: 'REQUIREMENT', role: 'architect', action: '设计方案', skill: 'architect/requirement-to-design' },
  { step: 2, keyword: 'CODE', title: 'DEVELOPMENT', role: 'developer', action: '实现代码', skill: 'developer/feature-implementation' },
  { step: 3, keyword: 'TEST', title: 'TESTING', role: 'tester', action: '编写测试', skill: 'tester/unit-test-design' },
  { step: 4, keyword: 'REVIEW', title: 'CODE REVIEW', role: 'reviewer', action: '检查代码', skill: 'reviewer/code-review-checklist' },
  { step: 5, keyword: 'AUDIT', title: 'SECURITY', role: 'security', action: '安全审计', skill: 'security/auth-and-permission-review' },
  { step: 6, keyword: 'DOCS', title: 'DOCUMENTATION', role: 'docs', action: '编写文档', skill: 'docs/user-guide-update' },
];

const ROLE_COLORS: Record<string, string> = {
  architect: '#2563eb',
  developer: '#059669',
  tester: '#7c3aed',
  reviewer: '#dc2626',
  docs: '#0891b2',
  security: '#ea580c',
};

export default function TutorialExampleSlide() {
  return (
    <section className={styles.slide} aria-label="实战案例">
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.label}>EXAMPLE</h2>
          <div className={styles.titleGroup}>
            <h3 className={styles.title}>用户登录系统</h3>
            <p className={styles.subtitle}>User Authentication System</p>
          </div>
        </div>

        <blockquote className={styles.quote}>
          "你的网站需要添加用户登录功能，支持邮箱和手机号登录"
        </blockquote>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {STEPS.map((step, index) => (
            <div key={step.step} className={styles.stepItem}>
              <div className={styles.stepNumber}>
                <span className={styles.numberText}>{String(step.step).padStart(2, '0')}</span>
              </div>
              <Link
                to={`/skills/${encodeURIComponent(step.skill)}`}
                className={styles.stepCard}
              >
                <div className={styles.stepKeyword}>{step.keyword}</div>
                <div className={styles.stepDivider} />
                <div className={styles.stepTitle}>{step.title}</div>
                <span 
                  className={styles.roleTag}
                  style={{ backgroundColor: ROLE_COLORS[step.role] }}
                >
                  {step.role}
                </span>
                <div className={styles.stepAction}>{step.action}</div>
              </Link>
              {index < STEPS.length - 1 && (
                <div className={styles.connector}>
                  <span className={styles.arrow}>▼</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.decorLine} />
          <p className={styles.hint}>
            点击任意步骤查看详情
          </p>
        </div>
      </div>
    </section>
  );
}