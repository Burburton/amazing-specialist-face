import type { Task } from '../../types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

function TaskCard({ task, onClick }: TaskCardProps) {
  const statusClass = styles[task.status] || styles.pending;

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
      className={`${styles.taskCard} ${statusClass}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.header}>
        <span className={styles.taskId}>{task.task_id}</span>
        <span className={styles.status}>{task.status}</span>
      </div>

      <h3 className={styles.title}>{task.title}</h3>

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
  );
}

export default TaskCard;