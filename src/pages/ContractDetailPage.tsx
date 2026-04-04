import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import contractsData from '../data/contracts.json';
import styles from './ContractDetailPage.module.css';

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

export default function ContractDetailPage() {
  const { id } = useParams();
  const contract = contractsData.contracts.find(c => c.contract_id === id);

  if (!contract) {
    return <Navigate to="/contracts" replace />;
  }

  const producerColor = ROLE_COLORS[contract.producer_role] || '#71717a';

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <BackButton to="/contracts" label="返回契约" />

        <section className={styles.headerSection}>
          <span className={styles.contractId}>{contract.contract_id}</span>
          <h1 className={styles.title}>{contract.contract_name}</h1>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>描述</h2>
          <p className={styles.description}>{contract.description}</p>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Producer</h2>
          <div className={styles.roleBadge} style={{ backgroundColor: producerColor }}>
            {ROLE_LABELS[contract.producer_role] || contract.producer_role}
          </div>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Consumers</h2>
          <div className={styles.consumersList}>
            {contract.consumer_roles.map((role, idx) => (
              <span key={idx} className={styles.consumerBadge}>
                {ROLE_LABELS[role] || role}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}