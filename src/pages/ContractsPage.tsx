import { useMemo } from 'react';
import styles from './ContractsPage.module.css';
import contractsData from '../data/contracts.json';
import ContractCard from '../components/cards/ContractCard';
import PageHeader from '../components/shared/PageHeader';

const ROLE_COLORS: Record<string, string> = {
  architect: '#8b5cf6',
  developer: '#3b82f6',
  tester: '#22c55e',
  reviewer: '#f59e0b',
  docs: '#06b6d4',
  security: '#ef4444',
  management: '#64748b',
  acceptance: '#94a3b8',
  release: '#78716c',
  OpenClaw: '#a8a29e',
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

export default function ContractsPage() {
  const contractsByRole = useMemo(() => {
    const grouped: Record<string, typeof contractsData.contracts> = {};
    
    for (const contract of contractsData.contracts) {
      const role = contract.producer_role;
      if (!grouped[role]) {
        grouped[role] = [];
      }
      grouped[role].push(contract);
    }
    
    return ROLE_ORDER.map(role => ({
      role,
      contracts: grouped[role] || [],
    }));
  }, []);

  return (
    <div className={styles.page}>
      <PageHeader 
        title="Artifact Contracts" 
        subtitle={`${contractsData.contracts.length} 个契约 · 角色间交付物规范`} 
      />

      <section className={styles.overviewSection}>
        <div className={styles.roleBadges}>
          {ROLE_ORDER.map(role => {
            const count = contractsData.contracts.filter(c => c.producer_role === role).length;
            return (
              <div
                key={role}
                className={styles.roleBadge}
                style={{ borderColor: ROLE_COLORS[role] }}
              >
                <span
                  className={styles.badgeIcon}
                  style={{ backgroundColor: ROLE_COLORS[role] }}
                >
                  {role.charAt(0).toUpperCase()}
                </span>
                <span className={styles.badgeName}>{ROLE_LABELS[role]}</span>
                <span className={styles.badgeCount}>{count} 契约</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.gridSection}>
        {contractsByRole.map(({ role, contracts }) => (
          contracts.length > 0 && (
            <div key={role} className={styles.roleGroup}>
              <h3 
                className={styles.roleGroupTitle} 
                style={{ color: ROLE_COLORS[role] }}
              >
                {ROLE_LABELS[role]} ({contracts.length})
              </h3>
              <div className={styles.contractsGrid}>
                {contracts.map(contract => (
                  <ContractCard
                    key={contract.contract_id}
                    contract={contract}
                    producerColor={ROLE_COLORS[role]}
                    href={`/contracts/${contract.contract_id}`}
                  />
                ))}
              </div>
            </div>
          )
        ))}
      </section>
    </div>
  );
}