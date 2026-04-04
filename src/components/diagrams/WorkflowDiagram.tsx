import { useState, useCallback, useEffect, useRef } from 'react';
import styles from './WorkflowDiagram.module.css';
import skillsData from '../../data/skills.json';
import rolesData from '../../data/roles.json';

const ROLE_COLORS_400: Record<string, string> = {
  architect: 'var(--color-role-architect-400)',
  developer: 'var(--color-role-developer-400)',
  tester: 'var(--color-role-tester-400)',
  reviewer: 'var(--color-role-reviewer-400)',
  docs: 'var(--color-role-docs-400)',
  security: 'var(--color-role-security-400)',
};

const ROLES = [
  { id: 'architect', name: 'Architect', mission: '规划与设计', emoji: '🏛️' },
  { id: 'developer', name: 'Developer', mission: '实现与编码', emoji: '💻' },
  { id: 'tester', name: 'Tester', mission: '验证与测试', emoji: '🔍' },
  { id: 'reviewer', name: 'Reviewer', mission: '审查与反馈', emoji: '✅' },
  { id: 'docs', name: 'Docs', mission: '文档与记录', emoji: '📝' },
  { id: 'security', name: 'Security', mission: '安全与合规', emoji: '🔐' },
];

const WORKFLOW_STEPS = [
  { from: 'architect', to: 'developer', label: 'spec → plan' },
  { from: 'developer', to: 'tester', label: 'code → test' },
  { from: 'tester', to: 'reviewer', label: 'test results' },
  { from: 'reviewer', to: 'developer', label: 'feedback' },
  { from: 'developer', to: 'docs', label: 'implementation' },
  { from: 'security', to: 'reviewer', label: 'audit' },
];

interface RoleDetailPanelProps {
  selectedRole: string | null;
  onClose: () => void;
}

function RoleDetailPanel({ selectedRole, onClose }: RoleDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (selectedRole && panelRef.current) {
      panelRef.current.focus();
    }
  }, [selectedRole]);

  if (!selectedRole) return null;

  const roleInfo = rolesData.roles.find(r => r.name === selectedRole);
  const roleSkills = skillsData.skills.filter(s => s.role === selectedRole);
  const roleColor = ROLE_COLORS_400[selectedRole] || 'var(--color-text-secondary)';
  const roleData = ROLES.find(r => r.id === selectedRole);

  return (
    <div
      ref={panelRef}
      className={styles.detailPanel}
      role="dialog"
      aria-modal="true"
      aria-label={`${selectedRole} 角色详情`}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      style={{ borderColor: roleColor }}
    >
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="关闭详情面板"
        type="button"
      >
        ✕
      </button>

      <div className={styles.detailHeader}>
        <span className={styles.detailEmoji}>{roleData?.emoji}</span>
        <h3 className={styles.detailTitle} style={{ color: roleColor }}>
          {roleData?.name}
        </h3>
        <p className={styles.detailMission}>{roleData?.mission}</p>
      </div>

      <div className={styles.detailSection}>
        <h4 className={styles.detailSectionTitle}>职责范围</h4>
        <ul className={styles.detailList}>
          {roleInfo?.inScope.slice(0, 4).map((item, idx) => (
            <li key={idx} className={styles.detailListItem}>
              {typeof item === 'string' ? item : item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.detailSection}>
        <h4 className={styles.detailSectionTitle}>
          技能列表
          <span className={styles.skillCount}>({roleSkills.length})</span>
        </h4>
        <ul className={styles.skillList}>
          {roleSkills.map(skill => (
            <li key={skill.id} className={styles.skillItem}>
              <a
                href={`/skills#${skill.id}`}
                className={styles.skillLink}
                style={{ '--skill-color': roleColor } as React.CSSProperties}
              >
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillCategory}>{skill.category}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {selectedRole !== 'docs' && selectedRole !== 'security' && (
        <div className={styles.collaborationSection}>
          <h4 className={styles.detailSectionTitle}>协作流程</h4>
          <div className={styles.collaborationFlow}>
            {WORKFLOW_STEPS.filter(s => s.from === selectedRole || s.to === selectedRole).map((step, idx) => (
              <span key={idx} className={styles.flowStep}>
                <span style={{ color: ROLE_COLORS_400[step.from] }}>
                  {ROLES.find(r => r.id === step.from)?.name}
                </span>
                <span className={styles.flowArrow}>→</span>
                <span style={{ color: ROLE_COLORS_400[step.to] }}>
                  {ROLES.find(r => r.id === step.to)?.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorkflowDiagram() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<number | null>(null);

  const handleRoleClick = useCallback((roleId: string) => {
    setSelectedRole(roleId);
  }, []);

  const handleRoleKeyDown = useCallback((e: React.KeyboardEvent, roleId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedRole(roleId);
    }
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedRole(null);
  }, []);

  return (
    <div className={styles.diagram} id="workflow">
      <div className={styles.rolesGrid}>
        {ROLES.map((role) => (
          <div
            key={role.id}
            className={`${styles.roleCard} ${selectedRole === role.id ? styles.roleCardActive : ''}`}
            style={{ borderColor: ROLE_COLORS_400[role.id] }}
            role="button"
            tabIndex={0}
            aria-label={`${role.name} 角色 - 点击展开详情`}
            onClick={() => handleRoleClick(role.id)}
            onKeyDown={(e) => handleRoleKeyDown(e, role.id)}
          >
            <div
              className={styles.roleIcon}
              style={{ backgroundColor: ROLE_COLORS_400[role.id] }}
            >
              {role.emoji}
            </div>
            <div className={styles.roleName}>{role.name}</div>
            <div className={styles.roleMission}>{role.mission}</div>
          </div>
        ))}
      </div>

      <div className={styles.workflowConnections}>
        <h3 className={styles.connectionsTitle}>协作流程</h3>
        <div className={styles.connectionsList}>
          {WORKFLOW_STEPS.map((step, idx) => {
            const fromRole = ROLES.find(r => r.id === step.from);
            const toRole = ROLES.find(r => r.id === step.to);
            const isHovered = hoveredConnection === idx;
            return (
              <div
                key={idx}
                className={`${styles.connection} ${isHovered ? styles.connectionHovered : ''}`}
                onMouseEnter={() => setHoveredConnection(idx)}
                onMouseLeave={() => setHoveredConnection(null)}
              >
                <span
                  className={styles.connectionFrom}
                  style={{ color: ROLE_COLORS_400[step.from] }}
                >
                  {fromRole?.name}
                </span>
                <span className={`${styles.connectionArrow} ${isHovered ? styles.connectionArrowPulse : ''}`}>
                  →
                </span>
                <span
                  className={styles.connectionTo}
                  style={{ color: ROLE_COLORS_400[step.to] }}
                >
                  {toRole?.name}
                </span>
                <span className={styles.connectionLabel}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.workflowCycle}>
        <h3 className={styles.cycleTitle}>闭环执行</h3>
        <div className={styles.cycleFlow}>
          <span className={styles.cycleStep}>Spec</span>
          <span className={styles.cycleArrow}>→</span>
          <span className={styles.cycleStep}>Plan</span>
          <span className={styles.cycleArrow}>→</span>
          <span className={styles.cycleStep}>Implement</span>
          <span className={styles.cycleArrow}>→</span>
          <span className={styles.cycleStep}>Test</span>
          <span className={styles.cycleArrow}>→</span>
          <span className={styles.cycleStep}>Review</span>
          <span className={styles.cycleArrow}>→</span>
          <span className={styles.cycleStep}>Deploy</span>
        </div>
      </div>

      <RoleDetailPanel selectedRole={selectedRole} onClose={handleClosePanel} />

      {selectedRole && (
        <div
          className={styles.overlay}
          onClick={handleClosePanel}
          aria-hidden="true"
        />
      )}
    </div>
  );
}