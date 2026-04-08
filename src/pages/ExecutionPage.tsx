import { useState, useMemo } from 'react';
import StatsOverview from '../components/execution/StatsOverview';
import TaskCard from '../components/execution/TaskCard';
import Timeline from '../components/execution/Timeline';
import LogViewer from '../components/execution/LogViewer';
import PayloadViewer from '../components/execution/PayloadViewer';
import mockTasks from '../data/mock-executions';
import type { Task, ExecutionStats, TaskFilter } from '../types';
import styles from './ExecutionPage.module.css';

function ExecutionPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<TaskFilter>({});

  const stats: ExecutionStats = useMemo(() => {
    return {
      total: mockTasks.length,
      pending: mockTasks.filter((t) => t.status === 'pending').length,
      inProgress: mockTasks.filter((t) => t.status === 'in-progress').length,
      success: mockTasks.filter((t) => t.status === 'success').length,
      failed: mockTasks.filter((t) => t.status === 'failed').length,
      blocked: mockTasks.filter((t) => t.status === 'blocked').length,
    };
  }, []);

  const filteredTasks = useMemo(() => {
    return mockTasks.filter((task) => {
      if (filter.status && task.status !== filter.status) return false;
      if (filter.role && task.role !== filter.role) return false;
      if (filter.milestone && task.milestone !== filter.milestone) return false;
      if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
      return true;
    });
  }, [filter]);

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <p className={styles.heroLabel}>EXECUTION</p>
        <h1 className={styles.heroTitle}>Execution</h1>
        <p className={styles.heroSubtitle}>Real-time Task Monitor</p>
        <div className={styles.heroDecorativeLine} />
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statsContent}>
          <p className={styles.statsLabel}>STATISTICS OVERVIEW</p>
          <StatsOverview stats={stats} />
        </div>
      </section>

      <section className={styles.tasksSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionNumber}>01</span>
          <div>
            <p className={styles.sectionLabel}>TASKS</p>
            <h2 className={styles.sectionTitle}>Tasks</h2>
          </div>
        </div>

        <div className={styles.filterBar}>
          <select
            value={filter.status || ''}
            onChange={(e) => setFilter({ ...filter, status: e.target.value as TaskFilter['status'] || undefined })}
            className={styles.filterSelect}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="blocked">Blocked</option>
          </select>
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.search || ''}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.taskGrid}>
          {filteredTasks.map((task, idx) => (
            <TaskCard
              key={task.id}
              task={task}
              index={idx}
              onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
            />
          ))}
        </div>
      </section>

      {selectedTask && (
        <section className={styles.detailSection}>
          <div className={styles.detailHeader}>
            <h2 className={styles.detailTitle}>
              {selectedTask.task_id}: {selectedTask.title}
            </h2>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedTask(null)}
              type="button"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {selectedTask.phases.length > 0 && (
            <div className={styles.detailBlock}>
              <p className={styles.detailLabel}>EXECUTION TIMELINE</p>
              <Timeline phases={selectedTask.phases} currentPhase="developer" />
            </div>
          )}

          {selectedTask.dispatch_payload && (
            <div className={styles.detailBlock}>
              <p className={styles.detailLabel}>DISPATCH PAYLOAD</p>
              <PayloadViewer payload={selectedTask.dispatch_payload} />
            </div>
          )}

          {selectedTask.logs.length > 0 && (
            <div className={styles.detailBlock}>
              <p className={styles.detailLabel}>EXECUTION LOGS</p>
              <LogViewer logs={selectedTask.logs} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default ExecutionPage;