import { useMemo } from 'react';
import styles from './ContractsPage.module.css';
import contractsData from '../data/contracts.json';
import ContractCard from '../components/cards/ContractCard';

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

const ROLE_ORDER = ['architect', 'developer', 'tester', 'reviewer', 'docs', 'security'];

const ROLE_CONTRACT_COUNT: Record<string, number> = {
  architect: 4,
  developer: 3,
  tester: 3,
  reviewer: 3,
  docs: 2,
  security: 2,
};

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
    
    // Sort by predefined order
    return ROLE_ORDER.map(role => ({
      role,
      contracts: grouped[role] || [],
    }));
  }, []);

  return (
    <div className={styles.contractsPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Artifact Contracts</h1>
        <p className={styles.subtitle}>
          {contractsData.total} 个契约 · 6 个生产者角色 · 定义角色间交付物规范
        </p>
      </header>

      <section className={styles.overview}>
        <h2 className={styles.sectionTitle}>契约概览</h2>
        <div className={styles.roleBadges}>
          {ROLE_ORDER.map(role => (
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
              <span className={styles.badgeCount}>{ROLE_CONTRACT_COUNT[role]} 契约</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contractGroups}>
        <h2 className={styles.sectionTitle}>按生产者角色分组</h2>
        <p className={styles.sectionDesc}>
          每个契约由一个角色生产，被多个角色消费。契约定义了交付物的规范和内容要求。
        </p>
        
        {contractsByRole.map(({ role, contracts }) => (
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
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
