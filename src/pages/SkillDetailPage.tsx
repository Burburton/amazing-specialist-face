import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import SkillCard from '../components/cards/SkillCard';
import SkillDemoPanel from '../components/skills/SkillDemoPanel';
import { useSkillDemo } from '../hooks/useSkillDemo';
import skillsData from '../data/skills.json';
import styles from './SkillDetailPage.module.css';

const ROLE_LABELS: Record<string, string> = {
  architect: 'ARCHITECT',
  developer: 'DEVELOPER',
  tester: 'TESTER',
  reviewer: 'REVIEWER',
  docs: 'DOCS',
  security: 'SECURITY',
  common: 'COMMON',
};

export default function SkillDetailPage() {
  const { id } = useParams();
  const decodedId = id ? decodeURIComponent(id) : '';
  const skill = skillsData.skills.find(s => s.id === decodedId);
  const { demo, loading } = useSkillDemo(decodedId);

  const skillIndex = skillsData.skills.findIndex(s => s.id === decodedId);
  const number = skillIndex >= 0 ? String(skillIndex + 1).padStart(2, '0') : '00';
  const label = skill?.name.split(' ').slice(0, 2).join(' ').toUpperCase() || '';

  if (!skill) {
    return <Navigate to="/skills" replace />;
  }

  const relatedSkills = skillsData.skills.filter(
    s => s.role === skill.role && s.id !== skill.id
  ).slice(0, 4);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <BackButton to="/skills" label="返回技能库" />

        <section className={styles.headerSection}>
          <div className={styles.numberBadge}>{number}</div>
          
          <div className={styles.titleBlock}>
            <span className={styles.label}>{label}</span>
            <div className={styles.decorativeLine} aria-hidden="true" />
            <h1 className={styles.title}>{skill.name}</h1>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.role}>{ROLE_LABELS[skill.role] || skill.role.toUpperCase()}</span>
            <span className={styles.divider}>·</span>
            <span className={styles.category}>{skill.category}</span>
          </div>

          <p className={styles.quote}>{skill.description}</p>

          <div className={styles.pathBlock}>
            <span className={styles.pathLabel}>PATH</span>
            <code className={styles.path}>{skill.path}</code>
          </div>
        </section>

        {!loading && demo && (
          <section className={styles.demoSection}>
            <h2 className={styles.sectionTitle}>TRY IT</h2>
            <div className={styles.sectionLine} aria-hidden="true" />
            <SkillDemoPanel demo={demo} />
          </section>
        )}

        {relatedSkills.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.sectionTitle}>RELATED SKILLS</h2>
            <div className={styles.sectionLine} aria-hidden="true" />
            <div className={styles.relatedGrid}>
              {relatedSkills.map((s) => (
                <SkillCard 
                  key={s.id} 
                  skill={s} 
                  index={skillsData.skills.findIndex(sk => sk.id === s.id)}
                  href={`/skills/${encodeURIComponent(s.id)}`} 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}