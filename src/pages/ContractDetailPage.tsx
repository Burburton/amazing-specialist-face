import { useParams, Navigate } from 'react-router-dom';
import BackButton from '../components/shared/BackButton';
import contractsData from '../data/contracts.json';
import styles from './ContractDetailPage.module.css';

const ROLE_LABELS_CN: Record<string, string> = {
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

  const contractsInRole = contractsData.contracts.filter(c => c.producer_role === contract.producer_role);
  const cardIndex = contractsInRole.findIndex(c => c.contract_id === id);
  const cardNumber = String(cardIndex + 1).padStart(2, '0');

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <BackButton to="/contracts" label="返回契约" />

        <section className={styles.headerSection}>
          <div className={styles.headerTop}>
            <span className={styles.numberBadge}>{cardNumber}</span>
            <div className={styles.headerContent}>
              <code className={styles.contractId}>{contract.contract_id}</code>
              <h1 className={styles.title}>{contract.contract_name}</h1>
            </div>
          </div>
          <div className={styles.decorativeLine} />
        </section>

        <section className={styles.contentSection}>
          <p className={styles.sectionLabel}>DESCRIPTION</p>
          <h2 className={styles.sectionTitle}>描述</h2>
          <p className={styles.description}>{contract.description}</p>
        </section>

        <section className={styles.contentSection}>
          <p className={styles.sectionLabel}>FLOW</p>
          <h2 className={styles.sectionTitle}>交付流向</h2>
          <div className={styles.flowSection}>
            <span className={styles.flowLabel}>PRODUCER</span>
            <span className={styles.producerBadge}>
              {ROLE_LABELS_CN[contract.producer_role] || contract.producer_role}
            </span>
            <span className={styles.flowArrow}>→</span>
            <span className={styles.flowLabel}>CONSUMERS</span>
            <div className={styles.consumersList}>
              {contract.consumer_roles.map((role, idx) => (
                <span key={idx} className={styles.consumerBadge}>
                  {ROLE_LABELS_CN[role] || role}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}