import { Link } from 'react-router-dom';
import styles from './ContractCard.module.css';

interface Contract {
  contract_id: string;
  contract_name: string;
  producer_role: string;
  consumer_roles: string[];
  description: string;
}

interface ContractCardProps {
  contract: Contract;
  index: number;
  roleLabel: string;
  href?: string;
}

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

export default function ContractCard({ 
  contract, 
  index, 
  roleLabel,
  href 
}: ContractCardProps) {
  const cardNumber = String(index + 1).padStart(2, '0');

  const content = (
    <>
      <div className={styles.numberSection}>
        <span className={styles.numberBadge}>{cardNumber}</span>
        <p className={styles.roleLabel}>{roleLabel}</p>
      </div>
      
      <div className={styles.contentSection}>
        <code className={styles.contractId}>{contract.contract_id}</code>
        <h3 className={styles.contractName}>{contract.contract_name}</h3>
        <div className={styles.decorativeLine} />
        <p className={styles.contractDescription}>{contract.description}</p>
        
        <div className={styles.flowSection}>
          <span className={styles.flowLabel}>PRODUCER</span>
          <span className={styles.producerRole}>
            {ROLE_LABELS_CN[contract.producer_role] || contract.producer_role}
          </span>
          <span className={styles.flowArrow}>→</span>
          <span className={styles.flowLabel}>CONSUMERS</span>
          <div className={styles.consumersList}>
            {contract.consumer_roles.slice(0, 3).map((role, idx) => (
              <span key={idx} className={styles.consumerRole}>
                {ROLE_LABELS_CN[role] || role}
              </span>
            ))}
            {contract.consumer_roles.length > 3 && (
              <span className={styles.consumerRole}>
                +{contract.consumer_roles.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link to={href} className={styles.card}>
        {content}
      </Link>
    );
  }

  return (
    <article className={styles.card}>
      {content}
    </article>
  );
}