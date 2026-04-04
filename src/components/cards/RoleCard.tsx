import { Link } from 'react-router-dom';
import styles from './RoleCard.module.css';

interface Role {
  name: string;
  mission: string;
  inScope: string[];
  outOfScope: string[];
  triggerConditions: string[];
  skills: string[];
}

interface RoleCardProps {
  role: Role;
  color: string;
  expanded: boolean;
  onToggle: () => void;
  href?: string;
}

const ROLE_LABELS: Record<string, string> = {
  architect: '架构师',
  developer: '开发者',
  tester: '测试员',
  reviewer: '审查员',
  docs: '文档员',
  security: '安全员',
};

const ROLE_EMOJIS: Record<string, string> = {
  architect: '🏛️',
  developer: '💻',
  tester: '🔍',
  reviewer: '✅',
  docs: '📝',
  security: '🔐',
};

export default function RoleCard({ role, color, expanded, onToggle, href }: RoleCardProps) {
  const headerContent = (
    <>
      <div className={styles.roleIcon} style={{ backgroundColor: color }}>
        {ROLE_EMOJIS[role.name] || role.name.charAt(0).toUpperCase()}
      </div>
      <div className={styles.roleInfo}>
        <h3 className={styles.roleName}>{ROLE_LABELS[role.name] || role.name}</h3>
        <span className={styles.roleId}>{role.name}</span>
      </div>
      <span className={styles.skillCount}>{role.skills.length} skills</span>
      {!href && <span className={styles.expandIcon}>{expanded ? '▼' : '▶'}</span>}
    </>
  );

  const detailsContent = expanded && !href && (
    <div className={styles.roleDetails}>
      <div className={styles.detailSection}>
        <h4 className={styles.detailTitle}>In Scope</h4>
        <ul className={styles.detailList}>
          {role.inScope.map((item, idx) => (
            <li key={idx} className={styles.inScopeItem}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.detailSection}>
        <h4 className={styles.detailTitle}>Out of Scope</h4>
        <ul className={styles.detailList}>
          {role.outOfScope.map((item, idx) => (
            <li key={idx} className={styles.outScopeItem}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.detailSection}>
        <h4 className={styles.detailTitle}>Trigger Conditions</h4>
        <ul className={styles.detailList}>
          {role.triggerConditions.map((item, idx) => (
            <li key={idx} className={styles.triggerItem}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.detailSection}>
        <h4 className={styles.detailTitle}>Skills</h4>
        <div className={styles.skillsList}>
          {role.skills.map((skill, idx) => (
            <span key={idx} className={styles.skillTag} style={{ borderColor: color }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link to={href} className={styles.roleCard} style={{ borderColor: color }}>
        <div className={styles.roleHeader}>
          {headerContent}
        </div>
        <div className={styles.roleMission}>
          <strong>Mission:</strong> {role.mission}
        </div>
        <div className={styles.viewLink}>
          查看详情 →
        </div>
      </Link>
    );
  }

  return (
    <div className={styles.roleCard} style={{ borderColor: color }}>
      <div className={styles.roleHeader} onClick={onToggle}>
        {headerContent}
      </div>

      <div className={styles.roleMission}>
        <strong>Mission:</strong> {role.mission}
      </div>

      {detailsContent}
    </div>
  );
}