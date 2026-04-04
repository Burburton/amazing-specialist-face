const fs = require('fs');

const content = `import { useState } from 'react';
import styles from './RolesPage.module.css';
import rolesData from '../data/roles.json';
import contractsData from '../data/contracts.json';
import RoleCard from '../components/cards/RoleCard';
import RoleCollaborationDiagram from '../components/diagrams/RoleCollaborationDiagram';

const ROLE_COLORS: Record<string, string> = {
  architect: '#2563eb',
  developer: '#22c55e',
  tester: '#f59e0b',
  reviewer: '#8b5cf6',
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

export default function RolesPage() {
  const [expandedRole, setExpandedRole] = useState<string | null>('architect');

  const handleToggle = (roleName: string) => {
    setExpandedRole(expandedRole === roleName ? null : roleName);
  };

  const totalSkills = rolesData.roles.reduce((sum, role) => sum + role.skills.length, 0);

  return (
    <div className={styles.rolesPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>核心角色</h1>
        <p className={styles.subtitle}>
          6 个专业角色 · {totalSkills} 个技能 · 完整协作闭环
        </p>
      </header>

      <section className={styles.overview}>
        <h2 className={styles.sectionTitle}>角色概览</h2>
        <div className={styles.roleBadges}>
          {rolesData.roles.map(role => (
            <div
              key={role.name}
              className={styles.roleBadge}
              style={{ borderColor: ROLE_COLORS[role.name] }}
              onClick={() => setExpandedRole(role.name)}
            >
              <span
                className={styles.badgeIcon}
                style={{ backgroundColor: ROLE_COLORS[role.name] }}
              >
                {role.name.charAt(0).toUpperCase()}
              </span>
              <span className={styles.badgeName}>{ROLE_LABELS[role.name]}</span>
              <span className={styles.badgeCount}>{role.skills.length} skills</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.collaboration}>
        <h2 className={styles.sectionTitle}>协作关系</h2>
        <RoleCollaborationDiagram contracts={contractsData.contracts} />
      </section>

      <section className={styles.roleDetails}>
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
`;

fs.writeFileSync('src/pages/RolesPage.tsx', content);
console.log('Updated RolesPage.tsx');