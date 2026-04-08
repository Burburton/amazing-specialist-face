import { Link } from 'react-router-dom';
import styles from './RoleCard.module.css';

interface Role {
  name: string;
  mission: string;
  inScope: string[];
  outOfScope: string[];
  triggerConditions: string[];
  skills: string[];
}

interface RoleCardProps {
  role: Role;
  index: number;
  label: string;
  href?: string;
}

export default function RoleCard({ role, index, label, href }: RoleCardProps) {
  const number = String(index + 1).padStart(2, '0');

  const content = (
    <>
      <div className={styles.numberSection}>
        <span className={styles.number}>{number}</span>
      </div>
      <div className={styles.contentSection}>
        <span className={styles.label}>{label}</span>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <h3 className={styles.name}>{role.name}</h3>
        <p className={styles.mission}>{role.mission}</p>
        <div className={styles.meta}>
          <span className={styles.skillCount}>{role.skills.length} SKILLS</span>
          <span className={styles.arrow}>→</span>
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
    <article className={styles.card}>
      {content}
    </article>
  );
}