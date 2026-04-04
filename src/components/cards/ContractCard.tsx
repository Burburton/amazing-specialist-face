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
  producerColor: string;
}

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

export default function ContractCard({ contract, producerColor }: ContractCardProps) {
  return (
    <div className={styles.contractCard} style={{ borderColor: producerColor }}>
      <div className={styles.contractHeader}>
        <span className={styles.contractId}>{contract.contract_id}</span>
        <span className={styles.contractName}>{contract.contract_name}</span>
      </div>
      
      <p className={styles.contractDescription}>{contract.description}</p>
      
      <div className={styles.contractMeta}>
        <div className={styles.producerSection}>
          <span className={styles.metaLabel}>Producer:</span>
          <span className={styles.producerRole} style={{ backgroundColor: producerColor }}>
            {ROLE_LABELS[contract.producer_role] || contract.producer_role}
          </span>
        </div>
        
        <div className={styles.consumersSection}>
          <span className={styles.metaLabel}>Consumers:</span>
          <div className={styles.consumersList}>
            {contract.consumer_roles.map((role, idx) => (
              <span key={idx} className={styles.consumerRole}>
                {ROLE_LABELS[role] || role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}