import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RolesPage.module.css';
import rolesData from '../data/roles.json';
import contractsData from '../data/contracts.json';
import RoleCard from '../components/cards/RoleCard';
import RoleCollaborationDiagram from '../components/diagrams/RoleCollaborationDiagram';
import PageHeader from '../components/shared/PageHeader';

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

export default function RolesPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const handleToggle = (roleName: string) => {
    setExpandedRole(expandedRole === roleName ? null : roleName);
  };

  const totalSkills = rolesData.roles.reduce((sum, role) => sum + role.skills.length, 0);

  return (
    <div className={styles.page}>
      <PageHeader 
        title="核心角色" 
        subtitle={`${rolesData.total} 个专业角色 · ${totalSkills} 个技能 · 完整协作闭环`} 
      />

      <section className={styles.overviewSection}>
        <div className={styles.roleGrid}>
          {rolesData.roles.map(role => (
            <Link 
              key={role.name}
              to={`/roles/${role.name}`}
              className={styles.roleCard}
              style={{ borderColor: ROLE_COLORS[role.name] }}
            >
              <div className={styles.roleIcon} style={{ backgroundColor: ROLE_COLORS[role.name] }}>
                {ROLE_EMOJIS[role.name]}
              </div>
              <h3 className={styles.roleName}>{ROLE_LABELS[role.name]}</h3>
              <p className={styles.roleMission}>{role.mission.slice(0, 50)}...</p>
              <div className={styles.roleStats}>
                <span className={styles.skillCount}>{role.skills.length} 技能</span>
                <span className={styles.viewLink}>查看 →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.collaborationSection}>
        <h2 className={styles.sectionTitle}>协作关系</h2>
        <RoleCollaborationDiagram contracts={contractsData.contracts} />
      </section>

      <section className={styles.detailsSection}>
        <h2 className={styles.sectionTitle}>角色详情</h2>
        <p className={styles.sectionDesc}>
          点击角色卡片展开查看详细信息，包括职责范围、触发条件和技能列表
        </p>
        <div className={styles.roleCards}>
          {rolesData.roles.map(role => (
            <RoleCard
              key={role.name}
              role={role}
              color={ROLE_COLORS[role.name]}
              expanded={expandedRole === role.name}
              onToggle={() => handleToggle(role.name)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}