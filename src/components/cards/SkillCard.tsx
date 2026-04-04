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
  roleColor: string;
}

export default function SkillCard({ skill, roleColor }: SkillCardProps) {
  const categoryClass = skill.category === 'MVP' 
    ? styles.skillCategory + ' ' + styles.mvp 
    : styles.skillCategory + ' ' + styles.m4;

  return (
    <div className={styles.skillCard} style={{ borderColor: roleColor }}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{skill.name}</span>
        <span className={categoryClass}>
          {skill.category}
        </span>
      </div>
      <p className={styles.skillDescription}>{skill.description}</p>
      <div className={styles.skillMeta}>
        <span className={styles.skillRole} style={{ backgroundColor: roleColor }}>
          {skill.role}
        </span>
        <span className={styles.skillId}>{skill.id}</span>
      </div>
    </div>
  );
}
