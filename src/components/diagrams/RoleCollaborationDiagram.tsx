import styles from './RoleCollaborationDiagram.module.css';

const ROLES = [
  { id: 'architect', name: 'Architect', color: '#2563eb' },
  { id: 'developer', name: 'Developer', color: '#22c55e' },
  { id: 'tester', name: 'Tester', color: '#f59e0b' },
  { id: 'reviewer', name: 'Reviewer', color: '#8b5cf6' },
  { id: 'docs', name: 'Docs', color: '#06b6d4' },
  { id: 'security', name: 'Security', color: '#ef4444' },
];

const COLLABORATION_FLOWS = [
  { from: 'architect', to: 'developer', label: 'design note', desc: '技术方案' },
  { from: 'developer', to: 'tester', label: 'code', desc: '代码实现' },
  { from: 'tester', to: 'reviewer', label: 'test report', desc: '测试报告' },
  { from: 'reviewer', to: 'developer', label: 'feedback', desc: '审查反馈' },
  { from: 'developer', to: 'docs', label: 'implementation', desc: '实现完成' },
  { from: 'security', to: 'reviewer', label: 'security gate', desc: '安全检查' },
];

const ROLE_LABELS: Record<string, string> = {
  architect: '架构师',
  developer: '开发者',
  tester: '测试员',
  reviewer: '审查员',
  docs: '文档员',
  security: '安全员',
};

export default function RoleCollaborationDiagram() {
  return (
    <div className={styles.diagram}>
      <h3 className={styles.diagramTitle}>角色协作流程</h3>
      
      <div className={styles.rolesRow}>
        {ROLES.map(role => (
          <div key={role.id} className={styles.roleNode} style={{ backgroundColor: role.color }}>
            <span className={styles.roleInitial}>{role.name.charAt(0)}</span>
            <span className={styles.roleLabel}>{ROLE_LABELS[role.id]}</span>
          </div>
        ))}
      </div>

      <div className={styles.flowsSection}>
        <h4 className={styles.flowsTitle}>协作关系</h4>
        <div className={styles.flowsList}>
          {COLLABORATION_FLOWS.map((flow, idx) => {
            const fromRole = ROLES.find(r => r.id === flow.from);
            const toRole = ROLES.find(r => r.id === flow.to);
            return (
              <div key={idx} className={styles.flowItem}>
                <div className={styles.flowFrom} style={{ borderColor: fromRole?.color }}>
                  <span style={{ color: fromRole?.color }}>{ROLE_LABELS[flow.from]}</span>
                </div>
                <div className={styles.flowArrow}>
                  <span className={styles.flowLabel}>{flow.label}</span>
                  <span className={styles.arrowIcon}>→</span>
                </div>
                <div className={styles.flowTo} style={{ borderColor: toRole?.color }}>
                  <span style={{ color: toRole?.color }}>{ROLE_LABELS[flow.to]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.workflowCycle}>
        <h4 className={styles.cycleTitle}>完整工作流</h4>
        <div className={styles.cycleFlow}>
          <div className={styles.cycleStep} style={{ backgroundColor: '#2563eb' }}>Architect</div>
          <span className={styles.cycleArrow}>→</span>
          <div className={styles.cycleStep} style={{ backgroundColor: '#22c55e' }}>Developer</div>
          <span className={styles.cycleArrow}>→</span>
          <div className={styles.cycleStep} style={{ backgroundColor: '#f59e0b' }}>Tester</div>
          <span className={styles.cycleArrow}>→</span>
          <div className={styles.cycleStep} style={{ backgroundColor: '#8b5cf6' }}>Reviewer</div>
          <span className={styles.cycleArrow}>→</span>
          <div className={styles.cycleStep} style={{ backgroundColor: '#06b6d4' }}>Docs</div>
        </div>
        <p className={styles.cycleNote}>
          Security 角色在高风险任务（认证、权限、敏感数据）中触发
        </p>
      </div>
    </div>
  );
}