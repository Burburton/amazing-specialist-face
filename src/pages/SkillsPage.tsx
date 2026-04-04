import { useState, useMemo } from 'react';
import styles from './SkillsPage.module.css';
import skillsData from '../data/skills.json';
import SkillCard from '../components/cards/SkillCard';

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

const ROLE_COLORS: Record<string, string> = {
  common: '#64748b',
  architect: '#2563eb',
  developer: '#22c55e',
  tester: '#f59e0b',
  reviewer: '#8b5cf6',
  docs: '#06b6d4',
  security: '#ef4444',
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

  const getRoleButtonClass = (role: string) => 
    selectedRole === role ? styles.roleButton + ' ' + styles.active : styles.roleButton;

  const getCategoryButtonClass = (cat: string) =>
    categoryFilter === cat ? styles.categoryButton + ' ' + styles.active : styles.categoryButton;

  return (
    <div className={styles.skillsPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>专业技能</h1>
        <p className={styles.subtitle}>
          共 {skillsData.total} 个技能 - {skillsData.mvpCount} MVP - {skillsData.m4Count} M4
        </p>
      </header>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="搜索技能名称或描述..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className={styles.clearButton}>x</button>
          )}
        </div>

        <div className={styles.roleFilters}>
          {ROLES.map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={getRoleButtonClass(role)}
              style={role !== 'all' ? { borderColor: ROLE_COLORS[role] } : {}}
            >
              {ROLE_LABELS[role]}
              {role !== 'all' && (
                <span className={styles.roleCount}>
                  {skillsData.skills.filter(s => s.role === role).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className={styles.categoryFilters}>
          <button onClick={() => setCategoryFilter('all')} className={getCategoryButtonClass('all')}>
            全部类别
          </button>
          <button onClick={() => setCategoryFilter('MVP')} className={getCategoryButtonClass('MVP')}>
            MVP (核心)
          </button>
          <button onClick={() => setCategoryFilter('M4')} className={getCategoryButtonClass('M4')}>
            M4 (扩展)
          </button>
        </div>
      </div>

      <div className={styles.resultsInfo}>
        显示 {stats.total} 个技能
        {stats.mvp > 0 && <span className={styles.mvpBadge}>MVP: {stats.mvp}</span>}
        {stats.m4 > 0 && <span className={styles.m4Badge}>M4: {stats.m4}</span>}
      </div>

      <div className={styles.skillsList}>
        {selectedRole === 'all' ? (
          Object.entries(groupedSkills).map(([role, skills]) => (
            <section key={role} className={styles.roleGroup}>
              <h2 className={styles.roleGroupTitle} style={{ color: ROLE_COLORS[role] }}>
                {ROLE_LABELS[role]} ({skills.length})
              </h2>
              <div className={styles.skillsGrid}>
                {skills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} roleColor={ROLE_COLORS[skill.role]} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className={styles.skillsGrid}>
            {filteredSkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} roleColor={ROLE_COLORS[skill.role]} />
            ))}
          </div>
        )}
      </div>

      {filteredSkills.length === 0 && (
        <div className={styles.noResults}>
          <p>未找到匹配的技能</p>
          <button onClick={() => { setSearchQuery(''); setSelectedRole('all'); setCategoryFilter('all'); }}>
            清除筛选
          </button>
        </div>
      )}
    </div>
  );
}
