import type { Task } from '../../types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  index: number;
  onClick?: () => void;
}

function TaskCard({ task, index, onClick }: TaskCardProps) {
  const number = String(index + 1).padStart(2, '0');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`${styles.card}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.numberSection}>
        <span className={styles.numberBadge}>{number}</span>
        <span className={styles.statusBadge}>{task.status}</span>
      </div>

      <div className={styles.contentSection}>
        <code className={styles.taskId}>{task.task_id}</code>
        <h3 className={styles.title}>{task.title}</h3>
        <div className={styles.decorativeLine} />
        
        <div className={styles.metadata}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Role:</span>
            <span className={styles.metaValue}>{task.role}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Risk:</span>
            <span className={`${styles.metaValue} ${styles[`risk-${task.risk_level}`]}`}>
              {task.risk_level}
            </span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Milestone:</span>
            <span className={styles.metaValue}>{task.milestone}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.updated}>{formatDate(task.updated_at)}</span>
          <a
            href={task.issue_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.issueLink}
            onClick={(e) => e.stopPropagation()}
          >
            #{task.issue_number}
          </a>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;