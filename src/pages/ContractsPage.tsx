import { useMemo } from 'react';
import styles from './ContractsPage.module.css';
import contractsData from '../data/contracts.json';
import ContractCard from '../components/cards/ContractCard';

const ROLE_ORDER = ['architect', 'developer', 'tester', 'reviewer', 'docs', 'security'];

const ROLE_LABELS_EN: Record<string, string> = {
  architect: 'ARCHITECT',
  developer: 'DEVELOPER',
  tester: 'TESTER',
  reviewer: 'REVIEWER',
  docs: 'DOCS',
  security: 'SECURITY',
};

const ROLE_LABELS_CN: Record<string, string> = {
  architect: '架构师',
  developer: '开发者',
  tester: '测试员',
  reviewer: '审查员',
  docs: '文档员',
  security: '安全员',
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
    
    return ROLE_ORDER.map((role, idx) => ({
      role,
      index: idx,
      contracts: grouped[role] || [],
    }));
  }, []);

  const totalContracts = contractsData.contracts.length;

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <p className={styles.heroLabel}>CONTRACTS</p>
        <h1 className={styles.heroTitle}>Artifact Contracts</h1>
        <p className={styles.heroSubtitle}>
          {totalContracts} 个契约 · 角色间交付物规范
        </p>
        <div className={styles.heroDecorativeLine} />
      </section>

      <section className={styles.overviewSection}>
        <div className={styles.overviewContent}>
          <h2 className={styles.overviewTitle}>角色概览</h2>
          <p className={styles.overviewSubtitle}>ROLES OVERVIEW</p>
          <div className={styles.roleBadges}>
            {contractsByRole.map(({ role, contracts }) => {
              const count = contracts.length;
              if (count === 0) return null;
              const number = String(contractsByRole.findIndex(r => r.role === role) + 1).padStart(2, '0');
              return (
                <div key={role} className={styles.roleBadge}>
                  <span className={styles.badgeNumber}>{number}</span>
                  <span className={styles.badgeName}>{ROLE_LABELS_CN[role]}</span>
                  <span className={styles.badgeCount}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        {contractsByRole.map(({ role, index, contracts }) => (
          contracts.length > 0 && (
            <div key={role} className={styles.roleGroup}>
              <div className={styles.roleGroupHeader}>
                <span className={styles.roleGroupNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className={styles.roleGroupLabel}>{ROLE_LABELS_EN[role]}</p>
                  <h3 className={styles.roleGroupTitle}>
                    {ROLE_LABELS_CN[role]} ({contracts.length})
                  </h3>
                </div>
              </div>
              <div className={styles.contractsGrid}>
                {contracts.map((contract, cIdx) => (
                  <ContractCard
                    key={contract.contract_id}
                    contract={contract}
                    index={cIdx}
                    roleLabel={ROLE_LABELS_EN[role]}
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