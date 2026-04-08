import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SkillsPage.module.css';
import skillsData from '../data/skills.json';
import SkillCard from '../components/cards/SkillCard';

const ROLES = ['all', 'common', 'architect', 'developer', 'tester', 'reviewer', 'docs', 'security'];
const ROLE_LABELS: Record<string, string> = {
  all: 'ALL',
  common: 'COMMON',
  architect: 'ARCHITECT',
  developer: 'DEVELOPER',
  tester: 'TESTER',
  reviewer: 'REVIEWER',
  docs: 'DOCS',
  security: 'SECURITY',
};

export default function SkillsPage() {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const initialRole = ROLES.includes(roleParam || '') ? roleParam! : 'all';
  
  const [selectedRole, setSelectedRole] = useState(initialRole);
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

  let globalIndex = 0;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.englishTitle}>SKILLS</h1>
            <div className={styles.decorativeLine} aria-hidden="true" />
            <p className={styles.chineseTitle}>技能库</p>
          </div>
          <div className={styles.statsSection}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{skillsData.skills.length}</span>
              <span className={styles.statLabel}>TOTAL</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.mvp}</span>
              <span className={styles.statLabel}>MVP</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.m4}</span>
              <span className={styles.statLabel}>M4</span>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.filterSection}>
        <div className={styles.tabBar}>
          {ROLES.map(role => (
            <button
              key={role}
              className={selectedRole === role ? `${styles.tabButton} ${styles.active}` : styles.tabButton}
              onClick={() => setSelectedRole(role)}
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

      <section className={styles.gridSection}>
        {Object.entries(groupedSkills).map(([role, skills]) => (
          <div key={role} className={styles.roleGroup}>
            <h3 className={styles.roleGroupTitle}>
              {ROLE_LABELS[role] || role.toUpperCase()} ({skills.length})
            </h3>
            <div className={styles.skills}>
              {skills.map(skill => {
                const currentIndex = globalIndex++;
                return (
                  <SkillCard 
                    key={skill.id} 
                    skill={skill} 
                    index={currentIndex}
                    href={`/skills/${encodeURIComponent(skill.id)}`} 
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}