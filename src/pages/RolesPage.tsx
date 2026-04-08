import styles from './RolesPage.module.css';
import rolesData from '../data/roles.json';
import RoleCard from '../components/cards/RoleCard';
import RoleCollaborationDiagram from '../components/diagrams/RoleCollaborationDiagram';

const ROLE_LABELS: Record<string, string> = {
  architect: 'ARCHITECT',
  developer: 'DEVELOPER',
  tester: 'TESTER',
  reviewer: 'REVIEWER',
  docs: 'DOCS',
  security: 'SECURITY',
};

export default function RolesPage() {
  const totalSkills = rolesData.roles.reduce((sum, role) => sum + role.skills.length, 0);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.englishTitle}>ROLES</h1>
            <div className={styles.decorativeLine} aria-hidden="true" />
            <p className={styles.chineseTitle}>角色分工</p>
          </div>
          <div className={styles.statsSection}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{rolesData.total}</span>
              <span className={styles.statLabel}>ROLES</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{totalSkills}</span>
              <span className={styles.statLabel}>SKILLS</span>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.gridSection}>
        {rolesData.roles.map((role, index) => (
          <RoleCard
            key={role.name}
            role={role}
            index={index}
            label={ROLE_LABELS[role.name] || role.name.toUpperCase()}
            href={`/roles/${role.name}`}
          />
        ))}
      </section>

      <section className={styles.collaborationSection}>
        <h2 className={styles.sectionTitle}>COLLABORATION</h2>
        <div className={styles.sectionLine} aria-hidden="true" />
        <RoleCollaborationDiagram contracts={[]} />
      </section>
    </div>
  );
}