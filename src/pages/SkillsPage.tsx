import { useState, useMemo } from 'react';
import styles from './SkillsPage.module.css';
import skillsData from '../data/skills.json';
import SkillCard from '../components/cards/SkillCard';
import SkillDependencyDiagram from '../components/diagrams/SkillDependencyDiagram';
import PageHeader from '../components/shared/PageHeader';

const ROLES = ['all', 'common', 'architect', 'developer', 'tester', 'reviewer', 'docs', 'security'];
const ROLE_LABELS: Record<string, string> = {
  all: '全部',
  common: '通用',
  architect: '架构师',
  developer: '开发者',
  tester: '测试员',
  reviewer: '审查员',
  docs: '文档员',
  security: '安全员',
};

const ROLE_COLORS_400: Record<string, string> = {
  all: 'var(--color-primary)',
  common: 'var(--color-role-common-400)',
  architect: 'var(--color-role-architect-400)',
  developer: 'var(--color-role-developer-400)',
  tester: 'var(--color-role-tester-400)',
  reviewer: 'var(--color-role-reviewer-400)',
  docs: 'var(--color-role-docs-400)',
  security: 'var(--color-role-security-400)',
};

export default function SkillsPage() {
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredSkills = useMemo(() => {
    return skillsData.skills.filter(skill => {
      const matchesRole = selectedRole === 'all' || skill.role === selectedRole;
      const matchesSearch = searchQuery === '' || 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || skill.category === categoryFilter;
      return matchesRole && matchesSearch && matchesCategory;
    });
  }, [selectedRole, searchQuery, categoryFilter]);

  const groupedSkills = useMemo(() => {
    const groups: Record<string, typeof skillsData.skills> = {};
    filteredSkills.forEach(skill => {
      if (!groups[skill.role]) groups[skill.role] = [];
      groups[skill.role].push(skill);
    });
    return groups;
  }, [filteredSkills]);

  const stats = {
    total: filteredSkills.length,
    mvp: filteredSkills.filter(s => s.category === 'MVP').length,
    m4: filteredSkills.filter(s => s.category === 'M4').length,
  };

  return (
    <div className={styles.page}>
      <PageHeader 
        title="技能库" 
        subtitle={`${skillsData.skills.length} 个技能 · ${skillsData.skills.filter(s => s.category === 'MVP').length} MVP 核心 · ${skillsData.skills.filter(s => s.category === 'M4').length} M4 扩展`} 
      />
      
      <section className={styles.filterSection}>
        <div className={styles.tabBar}>
          {ROLES.map(role => (
            <button
              key={role}
              className={selectedRole === role ? styles.tabButton + ' ' + styles.active : styles.tabButton}
              onClick={() => setSelectedRole(role)}
              style={selectedRole === role ? { backgroundColor: ROLE_COLORS_400[role] } : {}}
            >
              {ROLE_LABELS[role]}
            </button>
          ))}
        </div>

        <div className={styles.filterRow}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="搜索技能..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <span className={styles.searchCount}>
                {stats.total} 个结果
              </span>
            )}
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="all">全部类别</option>
            <option value="MVP">MVP 核心</option>
            <option value="M4">M4 扩展</option>
          </select>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.total}</span>
          <span className={styles.statLabel}>当前显示</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.mvp}</span>
          <span className={styles.statLabel}>MVP</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{stats.m4}</span>
          <span className={styles.statLabel}>M4</span>
        </div>
      </section>

      <section className={styles.diagramSection}>
        <SkillDependencyDiagram skills={skillsData.skills} />
      </section>

      <section className={styles.gridSection}>
        {Object.entries(groupedSkills).map(([role, skills]) => (
          <div key={role} className={styles.roleGroup}>
            <h3 className={styles.roleGroupTitle} style={{ borderColor: ROLE_COLORS_400[role] }}>
              {ROLE_LABELS[role]} ({skills.length})
            </h3>
            <div className={styles.skills}>
              {skills.map(skill => (
                <SkillCard key={skill.id} skill={skill} href={`/skills/${encodeURIComponent(skill.id)}`} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}