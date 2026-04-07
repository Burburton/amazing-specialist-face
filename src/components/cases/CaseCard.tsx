import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import styles from './CaseCard.module.css';

interface CaseSkill {
  step: number;
  skillId: string;
  skillName: string;
  role: string;
  action: string;
}

interface Case {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: CaseSkill[];
  estimatedTime: string;
  timeSaved: string;
}

interface CaseCardProps {
  case: Case;
}

const CATEGORY_LABELS: Record<string, string> = {
  auth: '用户认证',
  data: '数据处理',
  api: 'API开发',
  optimization: '性能优化',
};

const ROLE_COLORS: Record<string, string> = {
  architect: 'var(--color-role-architect-400)',
  developer: 'var(--color-role-developer-400)',
  tester: 'var(--color-role-tester-400)',
  reviewer: 'var(--color-role-reviewer-400)',
  docs: 'var(--color-role-docs-400)',
  security: 'var(--color-role-security-400)',
};

export default function CaseCard({ case: caseItem }: CaseCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <span className={styles.categoryBadge}>
          {CATEGORY_LABELS[caseItem.category] || caseItem.category}
        </span>
        <h2 className={styles.cardTitle}>{caseItem.title}</h2>
        <p className={styles.cardDescription}>{caseItem.description}</p>
      </header>

      <div className={styles.flowSection}>
        <h3 className={styles.flowTitle}>开发流程</h3>
        <div className={styles.flowGrid}>
          {caseItem.skills.map((skill, index) => (
            <div key={skill.step} className={styles.flowRow}>
              <Link
                to={`/skills/${encodeURIComponent(skill.skillId)}`}
                className={styles.skillCard}
              >
                <span className={styles.stepNumber}>{skill.step}</span>
                <span className={styles.skillName}>{skill.skillName}</span>
                <span 
                  className={styles.roleBadge}
                  style={{ backgroundColor: ROLE_COLORS[skill.role] || 'var(--color-accent-primary)' }}
                >
                  {skill.role}
                </span>
                <span className={styles.skillAction}>{skill.action}</span>
              </Link>
              {index < caseItem.skills.length - 1 && index % 3 !== 2 && (
                <span className={styles.arrow}><Icon name="arrow-right" size={16} /></span>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className={styles.cardFooter}>
        <div className={styles.stat}>
          <span className={styles.statIcon}>⏱️</span>
          <span className={styles.statLabel}>预计: {caseItem.estimatedTime}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon}>💰</span>
          <span className={styles.statLabel}>节省: {caseItem.timeSaved}</span>
        </div>
      </footer>
    </article>
  );
}