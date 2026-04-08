import { useMemo } from 'react';
import styles from './RoleCollaborationDiagram.module.css';
import Icon from '../common/Icon';

interface Contract {
  contract_id: string;
  contract_name: string;
  producer_role: string;
  consumer_roles: string[];
  description: string;
}

interface RoleCollaborationDiagramProps {
  contracts: Contract[];
}

const ROLE_COLORS: Record<string, string> = {
  architect: '#2563eb',
  developer: '#22c55e',
  tester: '#f59e0b',
  reviewer: '#8b5cf6',
  docs: '#06b6d4',
  security: '#ef4444',
  management: '#6b7280',
  acceptance: '#ec4899',
  release: '#14b8a6',
  OpenClaw: '#8b5cf6',
};

const ROLE_LABELS: Record<string, string> = {
  architect: '架构师',
  developer: '开发者',
  tester: '测试员',
  reviewer: '审查员',
  docs: '文档员',
  security: '安全员',
  management: '管理层',
  acceptance: '验收层',
  release: '发布',
  OpenClaw: 'OpenClaw',
};

const ROLE_ORDER = ['architect', 'developer', 'tester', 'reviewer', 'docs', 'security'];

export default function RoleCollaborationDiagram({ contracts }: RoleCollaborationDiagramProps) {
  const roleStats = useMemo(() => {
    const stats: Record<string, { produces: number; consumes: number }> = {};
    
    ROLE_ORDER.forEach(role => {
      stats[role] = { produces: 0, consumes: 0 };
    });
    
    contracts.forEach(contract => {
      if (stats[contract.producer_role]) {
        stats[contract.producer_role].produces++;
      }
      contract.consumer_roles.forEach(consumer => {
        if (stats[consumer]) {
          stats[consumer].consumes++;
        }
      });
    });
    
    return stats;
  }, [contracts]);

  const collaborationMatrix = useMemo(() => {
    const matrix: Record<string, Record<string, string[]>> = {};
    
    ROLE_ORDER.forEach(producer => {
      matrix[producer] = {};
      ROLE_ORDER.forEach(consumer => {
        matrix[producer][consumer] = [];
      });
    });
    
    contracts.forEach(contract => {
      if (ROLE_ORDER.includes(contract.producer_role)) {
        contract.consumer_roles.forEach(consumer => {
          if (ROLE_ORDER.includes(consumer)) {
            matrix[contract.producer_role][consumer].push(contract.contract_name);
          }
        });
      }
    });
    
    return matrix;
  }, [contracts]);

  return (
    <div className={styles.diagram}>
      <h3 className={styles.diagramTitle}>角色协作关系</h3>
      <p className={styles.diagramSubtitle}>ROLE COLLABORATION</p>
      
      <div className={styles.roleCards}>
        {ROLE_ORDER.map((role, idx) => (
          <div
            key={role}
            className={styles.roleCard}
            style={{ borderColor: ROLE_COLORS[role] }}
          >
            <span className={styles.roleNumber}>{String(idx + 1).padStart(2, '0')}</span>
            <div className={styles.roleName}>{ROLE_LABELS[role]}</div>
            <div className={styles.roleStats}>
              <span className={styles.statProduces}>
                <Icon name="arrow-up" size={16} /> {roleStats[role].produces}
              </span>
              <span className={styles.statConsumes}>
                <Icon name="arrow-down" size={16} /> {roleStats[role].consumes}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.flowSection}>
        <h4 className={styles.sectionTitle}>契约流向</h4>
        <div className={styles.flowList}>
          {ROLE_ORDER.map(producer => (
            collaborationMatrix[producer] &&
            Object.entries(collaborationMatrix[producer]).map(([consumer, contractNames]) => (
              contractNames.length > 0 && (
                <div key={`${producer}-${consumer}`} className={styles.flowItem}>
                  <div className={styles.flowProducer} style={{ color: ROLE_COLORS[producer] }}>
                    {ROLE_LABELS[producer]}
                  </div>
                  <div className={styles.flowArrow}>
                    <span className={styles.arrowLine}><Icon name="arrow-right" size={16} /></span>
                    <span className={styles.contractCount}>{contractNames.length}</span>
                  </div>
                  <div className={styles.flowConsumer} style={{ color: ROLE_COLORS[consumer] }}>
                    {ROLE_LABELS[consumer]}
                  </div>
                  <div className={styles.contractNames}>
                    {contractNames.join(', ')}
                  </div>
                </div>
              )
            ))
          )).flat().filter(Boolean).slice(0, 12)}
        </div>
      </div>
    </div>
  );
}