import { Link } from 'react-router-dom';
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
  index?: number;
  onClick?: (skill: Skill) => void;
  href?: string;
}

export default function SkillCard({ skill, index = 0, onClick, href }: SkillCardProps) {
  const number = String(index + 1).padStart(2, '0');
  const label = skill.name.split(' ').slice(0, 2).join(' ').toUpperCase();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(skill);
    }
  };

  const content = (
    <>
      <div className={styles.numberSection}>
        <span className={styles.number}>{number}</span>
      </div>
      <div className={styles.contentSection}>
        <span className={styles.label}>{label}</span>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <h3 className={styles.name}>{skill.name}</h3>
        <p className={styles.description}>{skill.description}</p>
        <div className={styles.meta}>
          <span className={styles.role}>{skill.role}</span>
          <span className={styles.category}>{skill.category}</span>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={styles.card}>
        {content}
      </Link>
    );
  }

  return (
    <article
      className={styles.card}
      onClick={() => onClick?.(skill)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="article"
    >
      {content}
    </article>
  );
}