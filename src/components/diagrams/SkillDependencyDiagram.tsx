import { Link } from 'react-router-dom';
import styles from './SkillDependencyDiagram.module.css';

interface Skill {
  id: string;
  name: string;
  role: string;
  category: string;
  description: string;
}

interface SkillDependencyDiagramProps {
  skills: Skill[];
}

const ROLE_COLORS_400: Record<string, string> = {
  architect: 'var(--color-role-architect-400)',
  developer: 'var(--color-role-developer-400)',
  tester: 'var(--color-role-tester-400)',
  reviewer: 'var(--color-role-reviewer-400)',
  docs: 'var(--color-role-docs-400)',
  security: 'var(--color-role-security-400)',
  common: 'var(--color-role-common-400)',
};

const ROLE_LABELS: Record<string, string> = {
  architect: '架构师',
  developer: '开发者',
  tester: '测试员',
  reviewer: '审查员',
  docs: '文档员',
  security: '安全员',
  common: '通用',
};

const ROLE_ORDER = ['architect', 'developer', 'tester', 'reviewer', 'docs', 'security', 'common'];

export default function SkillDependencyDiagram({ skills }: SkillDependencyDiagramProps) {
  const skillsByRole: Record<string, Skill[]> = {};
  ROLE_ORDER.forEach(role => {
    skillsByRole[role] = skills.filter(s => s.role === role);
  });

  const mvpCount = skills.filter(s => s.category === 'MVP').length;
  const m4Count = skills.filter(s => s.category === 'M4').length;

  return (
    <div className={styles.diagram}>
      <div className={styles.header}>
        <div className={styles.heroStat}>
          <span className={styles.heroNumber}>{skills.length}</span>
          <span className={styles.heroLabel}>Total Skills</span>
        </div>
        <div className={styles.subStats}>
          <div className={styles.subStat}>
            <span className={styles.subValue}>{mvpCount}</span>
            <span className={styles.subLabel}>MVP</span>
          </div>
          <div className={styles.subStat}>
            <span className={styles.subValue}>{m4Count}</span>
            <span className={styles.subLabel}>M4</span>
          </div>
          <div className={styles.subStat}>
            <span className={styles.subValue}>6</span>
            <span className={styles.subLabel}>Roles</span>
          </div>
        </div>
      </div>

      <div className={styles.roleGrid}>
        {ROLE_ORDER.filter(role => skillsByRole[role]?.length > 0).map((role, idx) => (
          <div key={role} className={styles.roleColumn}>
            <div className={styles.roleHeader}>
              <span className={styles.roleNumber}>{String(idx + 1).padStart(2, '0')}</span>
              <span 
                className={styles.roleDot}
                style={{ backgroundColor: ROLE_COLORS_400[role] }}
              />
              <span className={styles.roleName}>{ROLE_LABELS[role]}</span>
              <span className={styles.roleCount}>{skillsByRole[role].length}</span>
            </div>
            <div className={styles.skillList}>
              {skillsByRole[role].slice(0, 5).map(skill => (
                <Link
                  key={skill.id}
                  to={`/skills/${encodeURIComponent(skill.id)}`}
                  className={`${styles.skillItem} ${skill.category === 'M4' ? styles.m4 : ''}`}
                >
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillBadge}>{skill.category}</span>
                </Link>
              ))}
              {skillsByRole[role].length > 5 && (
                <Link to={`/skills?role=${role}`} className={styles.moreLink}>
                  +{skillsByRole[role].length - 5} more
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}