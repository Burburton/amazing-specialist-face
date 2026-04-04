import styles from './WorkflowDiagram.module.css';

const ROLES = [
  { id: 'architect', name: 'Architect', mission: '规划与设计', color: '#2563eb' },
  { id: 'developer', name: 'Developer', mission: '实现与编码', color: '#22c55e' },
  { id: 'tester', name: 'Tester', mission: '验证与测试', color: '#f59e0b' },
  { id: 'reviewer', name: 'Reviewer', mission: '审查与反馈', color: '#8b5cf6' },
  { id: 'docs', name: 'Docs', mission: '文档与记录', color: '#06b6d4' },
  { id: 'security', name: 'Security', mission: '安全与合规', color: '#ef4444' },
];

const WORKFLOW_STEPS = [
  { from: 'architect', to: 'developer', label: 'spec → plan' },
  { from: 'developer', to: 'tester', label: 'code → test' },
  { from: 'tester', to: 'reviewer', label: 'test results' },
  { from: 'reviewer', to: 'developer', label: 'feedback' },
  { from: 'developer', to: 'docs', label: 'implementation' },
  { from: 'security', to: 'reviewer', label: 'audit' },
];

export default function WorkflowDiagram() {
  return (
    <div className={styles.diagram}>
      <div className={styles.rolesGrid}>
        {ROLES.map((role) => (
          <div key={role.id} className={styles.roleCard} style={{ borderColor: role.color }}>
            <div className={styles.roleIcon} style={{ backgroundColor: role.color }}>
              {role.name.charAt(0)}
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
            return (
              <div key={idx} className={styles.connection}>
                <span className={styles.connectionFrom} style={{ color: fromRole?.color }}>
                  {fromRole?.name}
                </span>
                <span className={styles.connectionArrow}>→</span>
                <span className={styles.connectionTo} style={{ color: toRole?.color }}>
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
    </div>
  );
}