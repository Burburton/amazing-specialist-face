const fs = require('fs');

const content = `import { useState, useMemo } from 'react';
import styles from './SkillsPage.module.css';
import skillsData from '../data/skills.json';
import SkillCard from '../components/cards/SkillCard';
import SkillDependencyDiagram from '../components/diagrams/SkillDependencyDiagram';

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

  return (
    <div className={styles.skillsPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>技能库</h1>
        <p className={styles.subtitle}>
          {skillsData.total} 个技能 · {skillsData.mvpCount} MVP 核心 · {skillsData.m4Count} M4 扩展
        </p>
      </header>

      <section className={styles.filters}>
        <div className={styles.roleButtons}>
          {ROLES.map(role => (
            <button
              key={role}
              className={getRoleButtonClass(role)}
              onClick={() => setSelectedRole(role)}
              style={selectedRole === role ? { backgroundColor: ROLE_COLORS[role] || '#6366f1' } : {}}
            >
              {ROLE_LABELS[role]}
            </button>
          ))}
        </div>
        
        <div className={styles.filterRow}>
          <input
            type="text"
            placeholder="搜索技能..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          
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

      <section className={styles.stats}>
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

      <SkillDependencyDiagram skills={skillsData.skills} />

      <section className={styles.skillGrid}>
        {Object.entries(groupedSkills).map(([role, skills]) => (
          <div key={role} className={styles.roleGroup}>
            <h3 className={styles.roleGroupTitle} style={{ color: ROLE_COLORS[role] }}>
              {ROLE_LABELS[role]} ({skills.length})
            </h3>
            <div className={styles.skills}>
              {skills.map(skill => (
                <SkillCard key={skill.id} skill={skill} roleColor={ROLE_COLORS[role]} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/SkillsPage.tsx', content);
console.log('Fixed SkillsPage.tsx');