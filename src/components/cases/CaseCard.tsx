import { Link } from 'react-router-dom';
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
  index: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  auth: 'AUTHENTICATION',
  data: 'DATA PROCESSING',
  api: 'API DEVELOPMENT',
  optimization: 'OPTIMIZATION',
};

const ROLE_COLORS: Record<string, string> = {
  architect: '#2563eb',
  developer: '#059669',
  tester: '#7c3aed',
  reviewer: '#dc2626',
  docs: '#0891b2',
  security: '#ea580c',
};

export default function CaseCard({ case: caseItem, index }: CaseCardProps) {
  const number = String(index + 1).padStart(2, '0');
  
  return (
    <article className={styles.card}>
      <div className={styles.numberSection}>
        <span className={styles.number}>{number}</span>
      </div>
      
      <div className={styles.contentSection}>
        <header className={styles.header}>
          <span className={styles.category}>
            {CATEGORY_LABELS[caseItem.category] || caseItem.category.toUpperCase()}
          </span>
          <h2 className={styles.title}>{caseItem.title.toUpperCase()}</h2>
        </header>
        
        <p className={styles.description}>"{caseItem.description}"</p>
        
        <div className={styles.flowSection}>
          <h3 className={styles.flowLabel}>WORKFLOW</h3>
          <div className={styles.flowGrid}>
            {caseItem.skills.map((skill, idx) => (
              <div key={skill.step} className={styles.flowRow}>
                <Link
                  to={`/skills/${encodeURIComponent(skill.skillId)}`}
                  className={styles.stepCard}
                >
                  <span className={styles.stepNumber}>{String(skill.step).padStart(2, '0')}</span>
                  <span className={styles.stepName}>{skill.skillName}</span>
                  <span 
                    className={styles.roleTag}
                    style={{ backgroundColor: ROLE_COLORS[skill.role] || '#6b7280' }}
                  >
                    {skill.role}
                  </span>
                  <span className={styles.stepAction}>{skill.action}</span>
                </Link>
                {idx < caseItem.skills.length - 1 && idx % 2 === 0 && idx !== caseItem.skills.length - 2 && (
                  <span className={styles.connector}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <footer className={styles.footer}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>TIME</span>
            <span className={styles.statValue}>{caseItem.estimatedTime}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>SAVED</span>
            <span className={styles.statValue}>{caseItem.timeSaved}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>SKILLS</span>
            <span className={styles.statValue}>{caseItem.skills.length}</span>
          </div>
        </footer>
      </div>
    </article>
  );
}