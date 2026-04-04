import type { ExecutionStats } from '../../types';
import styles from './StatsOverview.module.css';

interface StatsOverviewProps {
  stats: ExecutionStats;
}

function StatsOverview({ stats }: StatsOverviewProps) {
  const statItems = [
    { key: 'total', label: 'Total', value: stats.total, color: 'default' },
    { key: 'pending', label: 'Pending', value: stats.pending, color: 'pending' },
    { key: 'inProgress', label: 'In Progress', value: stats.inProgress, color: 'inProgress' },
    { key: 'success', label: 'Success', value: stats.success, color: 'success' },
    { key: 'failed', label: 'Failed', value: stats.failed, color: 'failed' },
    { key: 'blocked', label: 'Blocked', value: stats.blocked, color: 'blocked' },
  ] as const;

  return (
    <div className={styles.statsOverview}>
      <h2 className={styles.title}>Execution Statistics</h2>
      <div className={styles.statsGrid}>
        {statItems.map((item) => (
          <div key={item.key} className={`${styles.statCard} ${styles[item.color]}`}>
            <div className={styles.statValue}>{item.value}</div>
            <div className={styles.statLabel}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsOverview;