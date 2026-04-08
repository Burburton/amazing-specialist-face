import { useState, useCallback } from 'react';
import styles from './WhatIsSlide.module.css';
import skillsData from '../../data/skills.json';
import rolesData from '../../data/roles.json';
import Icon, { roleIconMap } from '../common/Icon';

const ROLE_NAMES: Record<string, string> = {
  architect: '架构师',
  developer: '开发者',
  tester: '测试员',
  reviewer: '审查员',
  docs: '文档员',
  security: '安全员',
};

interface RoleDetailPanelProps {
  selectedRole: string | null;
  onClose: () => void;
}

function RoleDetailPanel({ selectedRole, onClose }: RoleDetailPanelProps) {
  if (!selectedRole) return null;

  const roleInfo = rolesData.roles.find(r => r.name === selectedRole);
  const roleSkills = skillsData.skills.filter(s => s.role === selectedRole);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${ROLE_NAMES[selectedRole]} 详情`}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="关闭"
          type="button"
        >
          <Icon name="close" size={16} />
        </button>

        <div className={styles.panelHeader}>
          <span className={styles.panelNumber}>
            {String(['architect', 'developer', 'tester', 'reviewer', 'docs', 'security'].indexOf(selectedRole) + 1).padStart(2, '0')}
          </span>
          <Icon name={roleIconMap[selectedRole]} size={24} label={ROLE_NAMES[selectedRole]} />
          <h3 className={styles.panelTitle}>
            {ROLE_NAMES[selectedRole]}
          </h3>
          <p className={styles.panelCount}>{roleSkills.length} SKILLS</p>
        </div>

        <div className={styles.panelSection}>
          <h4 className={styles.panelSectionTitle}>IN SCOPE</h4>
          <ul className={styles.panelList}>
            {roleInfo?.inScope?.slice(0, 5).map((item, idx) => (
              <li key={idx} className={styles.panelListItem}>
                {typeof item === 'string' ? item : JSON.stringify(item)}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.panelSection}>
          <h4 className={styles.panelSectionTitle}>SKILLS</h4>
          <ul className={styles.skillList}>
            {roleSkills.map(skill => (
              <li key={skill.id} className={styles.skillItem}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillCategory}>{skill.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default function WhatIsSlide() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleClick = useCallback((role: string) => {
    setSelectedRole(role);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedRole(null);
  }, []);

  const getSkillCount = (role: string) => 
    skillsData.skills.filter(s => s.role === role).length;

  const roles = ['architect', 'developer', 'tester', 'reviewer', 'docs', 'security'];

  return (
    <section className={styles.slide} aria-label="它是什么">
      <div className={styles.numberBadge}>02</div>

      <div className={styles.header}>
        <h2 className={styles.englishTitle}>WHAT IS</h2>
        <div className={styles.decorativeLine} aria-hidden="true" />
        <p className={styles.chineseTitle}>什么是专家包？</p>
      </div>

      <p className={styles.quote}>
        "想象你有一个经验丰富的开发团队，随时帮你设计方案、编写代码、测试验证"
      </p>

      <div className={styles.roleGrid}>
        {roles.map((role, index) => (
          <button
            key={role}
            className={styles.roleCard}
            onClick={() => handleRoleClick(role)}
            type="button"
          >
            <span className={styles.roleNumber}>{String(index + 1).padStart(2, '0')}</span>
            <Icon name={roleIconMap[role]} size={32} label={ROLE_NAMES[role]} />
            <span className={styles.roleName}>{ROLE_NAMES[role]}</span>
            <span className={styles.roleCount}>{getSkillCount(role)} SKILLS</span>
          </button>
        ))}
      </div>

      <p className={styles.hint}>点击角色查看详情</p>

      <RoleDetailPanel selectedRole={selectedRole} onClose={handleClosePanel} />
    </section>
  );
}