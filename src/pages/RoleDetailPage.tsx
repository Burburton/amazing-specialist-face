import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import SkillCard from '../components/cards/SkillCard';
import rolesData from '../data/roles.json';
import skillsData from '../data/skills.json';
import styles from './RoleDetailPage.module.css';

const ROLE_COLORS: Record<string, string> = {
  architect: '#8b5cf6',
  developer: '#3b82f6',
  tester: '#22c55e',
  reviewer: '#f59e0b',
  docs: '#06b6d4',
  security: '#ef4444',
};

const ROLE_LABELS: Record<string, string> = {
  architect: '架构师',
  developer: '开发者',
  tester: '测试员',
  reviewer: '审查员',
  docs: '文档员',
  security: '安全员',
};

const ROLE_EMOJIS: Record<string, string> = {
  architect: '🏛️',
  developer: '💻',
  tester: '🔍',
  reviewer: '✅',
  docs: '📝',
  security: '🔐',
};

export default function RoleDetailPage() {
  const { name } = useParams();
  const role = rolesData.roles.find(r => r.name === name);

  if (!role) {
    return <Navigate to="/roles" replace />;
  }

  const roleColor = ROLE_COLORS[role.name] || '#71717a';
  const roleSkills = skillsData.skills.filter(s => s.role === role.name);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <BackButton to="/roles" label="返回角色" />

        <section className={styles.headerSection}>
          <div className={styles.roleIcon} style={{ backgroundColor: roleColor }}>
            {ROLE_EMOJIS[role.name] || role.name.charAt(0).toUpperCase()}
          </div>
          <h1 className={styles.title}>{ROLE_LABELS[role.name]}</h1>
          <p className={styles.roleId}>{role.name}</p>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Mission</h2>
          <p className={styles.description}>{role.mission}</p>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>In Scope</h2>
          <ul className={styles.list}>
            {role.inScope.map((item, idx) => (
              <li key={idx} className={styles.inScopeItem}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Out of Scope</h2>
          <ul className={styles.list}>
            {role.outOfScope.map((item, idx) => (
              <li key={idx} className={styles.outScopeItem}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Trigger Conditions</h2>
          <ul className={styles.list}>
            {role.triggerConditions.map((item, idx) => (
              <li key={idx} className={styles.triggerItem}>{item}</li>
            ))}
          </ul>
        </section>

        {roleSkills.length > 0 && (
          <section className={styles.skillsSection}>
            <h2 className={styles.sectionTitle}>
              技能 ({roleSkills.length})
            </h2>
            <div className={styles.skillsGrid}>
              {roleSkills.map(s => (
                <SkillCard key={s.id} skill={s} href={`/skills/${s.id}`} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}