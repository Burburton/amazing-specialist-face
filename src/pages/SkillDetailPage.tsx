import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import SkillCard from '../components/cards/SkillCard';
import skillsData from '../data/skills.json';
import styles from './SkillDetailPage.module.css';

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

export default function SkillDetailPage() {
  const { id } = useParams();
  const skill = skillsData.skills.find(s => s.id === id);

  if (!skill) {
    return <Navigate to="/skills" replace />;
  }

  const roleColor = ROLE_COLORS_400[skill.role] || 'var(--color-role-common-400)';
  const relatedSkills = skillsData.skills.filter(
    s => s.role === skill.role && s.id !== skill.id
  ).slice(0, 6);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <BackButton to="/skills" label="返回技能库" />

        <section className={styles.headerSection}>
          <span className={styles.skillId}>{skill.id}</span>
          <h1 className={styles.title}>{skill.name}</h1>
          <div className={styles.meta}>
            <span 
              className={styles.roleBadge}
              style={{ backgroundColor: roleColor }}
            >
              {ROLE_LABELS[skill.role]}
            </span>
            <span className={`${styles.categoryBadge} ${skill.category === 'MVP' ? styles.mvp : styles.m4}`}>
              {skill.category}
            </span>
          </div>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>描述</h2>
          <p className={styles.description}>{skill.description}</p>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>文件路径</h2>
          <code className={styles.path}>{skill.path}</code>
        </section>

        {relatedSkills.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.sectionTitle}>相关技能</h2>
            <div className={styles.relatedGrid}>
              {relatedSkills.map(s => (
                <SkillCard key={s.id} skill={s} href={`/skills/${s.id}`} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}