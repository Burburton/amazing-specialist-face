import type { ExecutionStats } from '../../types';
import styles from './StatsOverview.module.css';

interface StatsOverviewProps {
  stats: ExecutionStats;
}

function StatsOverview({ stats }: StatsOverviewProps) {
  const mainStats = [
    { key: 'total', label: 'Total', value: stats.total },
    { key: 'inProgress', label: 'Active', value: stats.inProgress },
    { key: 'success', label: 'Done', value: stats.success },
  ];

  const statusStats = [
    { key: 'pending', label: 'Pending', value: stats.pending, color: 'pending' },
    { key: 'failed', label: 'Failed', value: stats.failed, color: 'failed' },
    { key: 'blocked', label: 'Blocked', value: stats.blocked, color: 'blocked' },
  ];

  return (
    <div className={styles.statsOverview}>
      <div className={styles.mainStats}>
        {mainStats.map((item) => (
          <div key={item.key} className={styles.mainStat}>
            <div className={styles.mainValue}>{item.value}</div>
            <div className={styles.mainLabel}>{item.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.statusStats}>
        {statusStats.map((item) => (
          <div key={item.key} className={`${styles.statusStat} ${styles[item.color]}`}>
            <span className={styles.statusValue}>{item.value}</span>
            <span className={styles.statusLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsOverview;