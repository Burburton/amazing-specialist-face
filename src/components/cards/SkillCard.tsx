import styles from './SkillCard.module.css';

interface Skill {
  id: string;
  name: string;
  role: string;
  category: string;
  description: string;
  path: string;
}

interface SkillCardProps {
  skill: Skill;
  roleColor?: string;
  onClick?: (skill: Skill) => void;
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

export default function SkillCard({ skill, roleColor, onClick }: SkillCardProps) {
  const isMvp = skill.category === 'MVP';
  const roleColorValue = roleColor || ROLE_COLORS_400[skill.role] || 'var(--color-role-common-400)';

  const cardClassName = [
    styles.skillCard,
    isMvp ? styles.mvp : '',
  ].filter(Boolean).join(' ');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(skill);
    }
  };

  return (
    <article
      className={cardClassName}
      onClick={() => onClick?.(skill)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="article"
      aria-labelledby={`${skill.id}-title`}
      aria-describedby={`${skill.id}-desc`}
      aria-label={`技能: ${skill.name}, 类别: ${skill.category}, 角色: ${skill.role}`}
    >
      <div className={styles.skillHeader}>
        <h3
          id={`${skill.id}-title`}
          className={styles.skillName}
        >
          {skill.name}
        </h3>
        <span className={`${styles.skillCategory} ${isMvp ? styles.mvp : styles.m4}`}>
          {skill.category}
        </span>
      </div>

      <p
        id={`${skill.id}-desc`}
        className={styles.skillDescription}
      >
        {skill.description}
      </p>

      <div className={styles.skillMeta}>
        <span
          className={styles.skillRole}
          style={{ backgroundColor: roleColorValue }}
        >
          {skill.role}
        </span>
        <span className={styles.skillId}>
          {skill.id}
        </span>
      </div>
    </article>
  );
}