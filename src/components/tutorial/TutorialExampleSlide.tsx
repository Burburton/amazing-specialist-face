import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import styles from './TutorialExampleSlide.module.css';

const STEPS = [
  { step: 1, emoji: '📝', title: '需求', action: '设计方案', skill: 'architect/requirement-to-design', role: '架构师' },
  { step: 2, emoji: '💻', title: '开发', action: '实现代码', skill: 'developer/feature-implementation', role: '开发者' },
  { step: 3, emoji: '🧪', title: '测试', action: '编写测试', skill: 'tester/unit-test-design', role: '测试员' },
  { step: 4, emoji: '✅', title: '审查', action: '检查代码', skill: 'reviewer/code-review-checklist', role: '审查员' },
  { step: 5, emoji: '🔒', title: '安全', action: '安全审计', skill: 'security/auth-and-permission-review', role: '安全员' },
  { step: 6, emoji: '📚', title: '文档', action: '编写文档', skill: 'docs/user-guide-update', role: '文档员' },
];

export default function TutorialExampleSlide() {
  return (
    <section className={styles.slide} aria-label="实战案例">
      <div className={styles.content}>
        <h2 className={styles.title}>实战案例：开发用户登录功能</h2>
        
        <p className={styles.subtitle}>
          你想给网站添加用户登录功能，但不知道怎么开始...
        </p>
        
        <div className={styles.flowContainer}>
          {STEPS.map((item, index) => (
            <div key={item.step} className={styles.flowItem}>
              <Link 
                to={`/skills/${encodeURIComponent(item.skill)}`}
                className={styles.flowCard}
              >
                <span className={styles.stepNumber}>{item.step}</span>
                <span className={styles.stepEmoji}>{item.emoji}</span>
                <span className={styles.stepTitle}>{item.title}</span>
                <span className={styles.stepAction}>{item.action}</span>
                <span className={styles.stepRole}>{item.role}</span>
              </Link>
              {index < STEPS.length - 1 && (
                <span className={styles.arrow}><Icon name="arrow-right" size={20} /></span>
              )}
            </div>
          ))}
        </div>
        
        <p className={styles.hint}>
          💡 点击每个步骤查看对应的技能详情
        </p>
      </div>
    </section>
  );
}