import { useState, useCallback } from 'react';
import styles from './WhatIsSlide.module.css';
import skillsData from '../../data/skills.json';
import rolesData from '../../data/roles.json';
import Icon, { roleIconMap } from '../common/Icon';

const ROLE_COLORS: Record<string, string> = {
  architect: 'var(--color-role-architect-400)',
  developer: 'var(--color-role-developer-400)',
  tester: 'var(--color-role-tester-400)',
  reviewer: 'var(--color-role-reviewer-400)',
  docs: 'var(--color-role-docs-400)',
  security: 'var(--color-role-security-400)',
};

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
  const roleColor = ROLE_COLORS[selectedRole];

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

        <div className={styles.panelHeader} style={{ borderColor: roleColor }}>
          <Icon name={roleIconMap[selectedRole]} size={24} label={ROLE_NAMES[selectedRole]} />
          <h3 className={styles.panelTitle} style={{ color: roleColor }}>
            {ROLE_NAMES[selectedRole]}
          </h3>
          <p className={styles.panelCount}>{roleSkills.length} 个技能</p>
        </div>

        <div className={styles.panelSection}>
          <h4 className={styles.panelSectionTitle}>职责范围</h4>
          <ul className={styles.panelList}>
            {roleInfo?.inScope?.slice(0, 5).map((item, idx) => (
              <li key={idx} className={styles.panelListItem}>
                {typeof item === 'string' ? item : JSON.stringify(item)}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.panelSection}>
          <h4 className={styles.panelSectionTitle}>技能列表</h4>
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

  return (
    <section className={styles.slide} aria-label="它是什么">
      <h2 className={styles.title}>这是一个 6 角色协作的 AI 代理团队</h2>

      <div className={styles.roleTree}>
        <div className={styles.roleRow}>
          <button
            className={styles.roleNode}
            style={{ borderColor: ROLE_COLORS.architect }}
            onClick={() => handleRoleClick('architect')}
            type="button"
          >
            <span className={styles.roleEmoji}><Icon name="architect" size={24} label="架构师" /></span>
            <span className={styles.roleName}>{ROLE_NAMES.architect}</span>
            <span className={styles.roleCount}>{getSkillCount('architect')} 技能</span>
          </button>
        </div>

        <div className={styles.connector} aria-hidden="true">
          <div className={styles.connectorLine} />
        </div>

        <div className={styles.roleRow}>
          <button
            className={styles.roleNode}
            style={{ borderColor: ROLE_COLORS.developer }}
            onClick={() => handleRoleClick('developer')}
            type="button"
          >
            <span className={styles.roleEmoji}><Icon name="developer" size={24} label="开发者" /></span>
            <span className={styles.roleName}>{ROLE_NAMES.developer}</span>
            <span className={styles.roleCount}>{getSkillCount('developer')} 技能</span>
          </button>

          <div className={styles.arrow} aria-hidden="true"><Icon name="arrow-right" size={20} /></div>

          <button
            className={styles.roleNode}
            style={{ borderColor: ROLE_COLORS.tester }}
            onClick={() => handleRoleClick('tester')}
            type="button"
          >
            <span className={styles.roleEmoji}><Icon name="tester" size={24} label="测试员" /></span>
            <span className={styles.roleName}>{ROLE_NAMES.tester}</span>
            <span className={styles.roleCount}>{getSkillCount('tester')} 技能</span>
          </button>
        </div>

        <div className={styles.connector} aria-hidden="true">
          <div className={styles.connectorLine} />
        </div>

        <div className={styles.roleRow}>
          <button
            className={styles.roleNode}
            style={{ borderColor: ROLE_COLORS.reviewer }}
            onClick={() => handleRoleClick('reviewer')}
            type="button"
          >
            <span className={styles.roleEmoji}><Icon name="reviewer" size={24} label="审查员" /></span>
            <span className={styles.roleName}>{ROLE_NAMES.reviewer}</span>
            <span className={styles.roleCount}>{getSkillCount('reviewer')} 技能</span>
          </button>

          <div className={styles.arrowLeft} aria-hidden="true"><Icon name="arrow-left" size={20} /></div>

          <button
            className={styles.roleNode}
            style={{ borderColor: ROLE_COLORS.docs }}
            onClick={() => handleRoleClick('docs')}
            type="button"
          >
            <span className={styles.roleEmoji}><Icon name="docs" size={24} label="文档员" /></span>
            <span className={styles.roleName}>{ROLE_NAMES.docs}</span>
            <span className={styles.roleCount}>{getSkillCount('docs')} 技能</span>
          </button>
        </div>

        <div className={styles.connectorUp} aria-hidden="true">
          <div className={styles.connectorLine} />
        </div>

        <div className={styles.roleRow}>
          <button
            className={styles.roleNode}
            style={{ borderColor: ROLE_COLORS.security }}
            onClick={() => handleRoleClick('security')}
            type="button"
          >
            <span className={styles.roleEmoji}><Icon name="security" size={24} label="安全员" /></span>
            <span className={styles.roleName}>{ROLE_NAMES.security}</span>
            <span className={styles.roleCount}>{getSkillCount('security')} 技能</span>
          </button>
        </div>
      </div>

      <p className={styles.hint}>[ 点击角色查看详情 ]</p>

      <RoleDetailPanel selectedRole={selectedRole} onClose={handleClosePanel} />
    </section>
  );
}