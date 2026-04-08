import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import SkillCard from '../components/cards/SkillCard';
import rolesData from '../data/roles.json';
import skillsData from '../data/skills.json';
import styles from './RoleDetailPage.module.css';

const ROLE_LABELS: Record<string, string> = {
  architect: 'ARCHITECT',
  developer: 'DEVELOPER',
  tester: 'TESTER',
  reviewer: 'REVIEWER',
  docs: 'DOCS',
  security: 'SECURITY',
};

export default function RoleDetailPage() {
  const { name } = useParams();
  const role = rolesData.roles.find(r => r.name === name);
  const roleIndex = rolesData.roles.findIndex(r => r.name === name);
  const number = roleIndex >= 0 ? String(roleIndex + 1).padStart(2, '0') : '00';

  if (!role) {
    return <Navigate to="/roles" replace />;
  }

  const roleSkills = skillsData.skills.filter(s => s.role === role.name);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <BackButton to="/roles" label="返回角色" />

        <section className={styles.headerSection}>
          <div className={styles.numberBadge}>{number}</div>
          
          <div className={styles.titleBlock}>
            <span className={styles.label}>{ROLE_LABELS[role.name] || role.name.toUpperCase()}</span>
            <div className={styles.decorativeLine} aria-hidden="true" />
            <h1 className={styles.title}>{role.name}</h1>
          </div>

          <p className={styles.quote}>{role.mission}</p>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{roleSkills.length}</span>
              <span className={styles.statLabel}>SKILLS</span>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>IN SCOPE</h2>
          <div className={styles.sectionLine} aria-hidden="true" />
          <ul className={styles.list}>
            {role.inScope.map((item, idx) => (
              <li key={idx} className={styles.listItem}>
                <span className={styles.itemNumber}>{String(idx + 1).padStart(2, '0')}</span>
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>OUT OF SCOPE</h2>
          <div className={styles.sectionLine} aria-hidden="true" />
          <ul className={styles.list}>
            {role.outOfScope.map((item, idx) => (
              <li key={idx} className={styles.listItem}>
                <span className={styles.itemNumber}>{String(idx + 1).padStart(2, '0')}</span>
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>TRIGGER CONDITIONS</h2>
          <div className={styles.sectionLine} aria-hidden="true" />
          <ul className={styles.list}>
            {role.triggerConditions.map((item, idx) => (
              <li key={idx} className={styles.listItem}>
                <span className={styles.itemNumber}>{String(idx + 1).padStart(2, '0')}</span>
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {roleSkills.length > 0 && (
          <section className={styles.skillsSection}>
            <h2 className={styles.sectionTitle}>SKILLS ({roleSkills.length})</h2>
            <div className={styles.sectionLine} aria-hidden="true" />
            <div className={styles.skillsGrid}>
              {roleSkills.map((s) => (
                <SkillCard 
                  key={s.id} 
                  skill={s} 
                  index={skillsData.skills.findIndex(sk => sk.id === s.id)}
                  href={`/skills/${s.id}`} 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}