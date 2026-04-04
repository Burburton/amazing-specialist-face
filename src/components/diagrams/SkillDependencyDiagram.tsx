import { useMemo } from 'react';
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

const ROLE_COLORS: Record<string, string> = {
  architect: '#2563eb',
  developer: '#22c55e',
  tester: '#f59e0b',
  reviewer: '#8b5cf6',
  docs: '#06b6d4',
  security: '#ef4444',
  common: '#6b7280',
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
  const skillsByRole = useMemo(() => {
    const grouped: Record<string, Skill[]> = {};
    
    ROLE_ORDER.forEach(role => {
      grouped[role] = skills.filter(s => s.role === role);
    });
    
    return grouped;
  }, [skills]);

  const categoryStats = useMemo(() => {
    const mvp = skills.filter(s => s.category === 'MVP').length;
    const m4 = skills.filter(s => s.category === 'M4').length;
    return { mvp, m4, total: skills.length };
  }, [skills]);

  return (
    <div className={styles.diagram}>
      <h3 className={styles.title}>技能分布图</h3>
      
      <div className={styles.categoryStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>MVP 核心</span>
          <span className={styles.statValue}>{categoryStats.mvp}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>M4 扩展</span>
          <span className={styles.statValue}>{categoryStats.m4}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>总计</span>
          <span className={styles.statValue}>{categoryStats.total}</span>
        </div>
      </div>

      <div className={styles.roleSections}>
        {ROLE_ORDER.map(role => (
          skillsByRole[role] && skillsByRole[role].length > 0 && (
            <div key={role} className={styles.roleSection}>
              <div className={styles.roleHeader}>
                <div
                  className={styles.roleDot}
                  style={{ backgroundColor: ROLE_COLORS[role] }}
                />
                <span className={styles.roleTitle}>
                  {ROLE_LABELS[role]}
                </span>
                <span className={styles.roleCount}>
                  {skillsByRole[role].length}
                </span>
              </div>
              
              <div className={styles.skillGrid}>
                {skillsByRole[role].map(skill => (
                  <div
                    key={skill.id}
                    className={skill.category === 'M4' ? styles.skillNode + ' ' + styles.skillM4 : styles.skillNode}
                    title={skill.description}
                  >
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillCategory}>{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot + ' ' + styles.legendMVP} />
          <span>MVP 核心技能</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot + ' ' + styles.legendM4} />
          <span>M4 扩展技能</span>
        </div>
      </div>
    </div>
  );
}
